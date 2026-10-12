importScripts('providers.js','workbook-sites.js');
const sessions = new Map();
const locks = new Map();
const originProvider = url => {
  try { const u = new URL(url); return u.protocol === 'https:' && Object.entries(BRIDGE_PROVIDERS).find(([,p]) => p.hosts.includes(u.hostname))?.[0]; } catch { return null; }
};
chrome.action.onClicked.addListener(async tab=>{
  const tabs=await chrome.tabs.query({});
  const workbook=isWorkbookURL(tab?.url)?tab:tabs.find(t=>isWorkbookURL(t.url));
  if(workbook){
    await chrome.tabs.update(workbook.id,{active:true});
    try{await chrome.tabs.sendMessage(workbook.id,{type:'workbook:open-assistant'},{frameId:0});}
    catch{await chrome.scripting.executeScript({target:{tabId:workbook.id,frameIds:[0]},files:['workbook-sites.js','site-bridge.js']});await chrome.tabs.sendMessage(workbook.id,{type:'workbook:open-assistant'},{frameId:0});}
  }else await chrome.tabs.create({url:'https://zhouwu97.github.io/web-kaifa/?assistant=1#/home'});
});
function post(port, value) { try { port.postMessage(value); } catch {} }
function timed(promise,ms,message) {
  let timer;
  return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error(message)),ms);})]).finally(()=>clearTimeout(timer));
}
// Injection acknowledgement and content-script availability are independent signals.
async function connectBridge(tab, live, stage) {
  const version=chrome.runtime.getManifest().version;
  const hello=async()=>{
    try {
      const r=await timed(chrome.tabs.sendMessage(tab.id,{type:'workbook:hello'},{frameId:0}),300,'握手等待');
      return r?.ok && r.version===version;
    } catch { return false; }
  };
  stage('检查站点访问权限');
  const granted=await timed(chrome.permissions.contains({origins:[new URL(tab.url).origin+'/*']}),600,'权限检查未返回');
  if(!granted) throw Error('缺少官网访问权限。请点击“授权并查找标签页”；没有注入或发送消息。');
  stage('检查现有桥接脚本');
  if(await hello()) { stage('现有脚本握手成功，无需重复注入'); return; }
  if(!live()) throw Error('连接操作已取消');
  stage('注入脚本，并行等待官网握手');
  let injectionError=null, acknowledged=false, previous=null, woke=false;
  // Always consume rejection, even if the handshake finishes first.
  Promise.resolve().then(()=>chrome.scripting.executeScript({target:{tabId:tab.id,frameIds:[0]},injectImmediately:true,files:['providers.js','bridge.js']}))
    .then(()=>{acknowledged=true;},error=>{injectionError=error;});
  try {
    for(let attempt=0;attempt<8;attempt++) {
      const probeStarted=Date.now();
      if(!live()) throw Error('连接操作已取消');
      if(await hello()) { stage('官网脚本握手成功'+(acknowledged?'':'（注入回执尚未返回）')); return; }
      if(injectionError) throw Error('浏览器拒绝注入：'+injectionError.message);
      // A background tab can be frozen/discarded. Wake it once, without reloading it.
      if(attempt===2 && !tab.active) {
        stage('官网未回应，临时唤醒所选标签页（不刷新）');
        previous=(await timed(chrome.tabs.query({active:true,windowId:tab.windowId}),400,'读取活动标签页超时'))[0];
        await timed(chrome.tabs.update(tab.id,{active:true}),400,'唤醒官网标签页超时');
        woke=true;
      }
      await new Promise(resolve=>setTimeout(resolve,Math.max(0,450-(Date.now()-probeStarted))));
    }
    throw Error(acknowledged?'注入已完成，但官网握手未回应；尚未检查输入框。':'浏览器未返回注入回执，官网握手也未回应；唤醒后仍不可用。');
  } finally {
    // Do not steal focus back if the user has switched elsewhere in the meantime.
    if(woke && previous && previous.id!==tab.id) {
      try {
        const current=await timed(chrome.tabs.get(tab.id),300,'读取标签页超时');
        if(current.active) await timed(chrome.tabs.update(previous.id,{active:true}),300,'恢复工作台超时');
      } catch {}
    }
  }
}
async function release(s) {
  const tabId=s.tabId, request=s.request;
  s.request=null;
  if (tabId && locks.get(tabId) === s) {
    locks.delete(tabId);
    await timed(chrome.tabs.sendMessage(tabId, {type:'workbook:cancel', id:request}),2000,'停止同步超时').catch(() => {});
  }
}
function isPanelSender(value){
  try{const actual=new URL(value),expected=new URL(chrome.runtime.getURL('panel.html'));return actual.protocol===expected.protocol && actual.origin===expected.origin && actual.host===expected.host && actual.pathname===expected.pathname;}catch{return false;}
}
chrome.runtime.onConnect.addListener(port => {
  if (port.name !== 'workbook' || !isPanelSender(port.sender?.url)) { port.disconnect(); return; }
  const s = {port, tabId:null, provider:null, request:null, connections:new Map()};
  sessions.set(port,s);
  port.onDisconnect.addListener(() => { sessions.delete(port); release(s); });
  port.onMessage.addListener(async m => {
    try {
      if (m.type === 'ping') { post(port,{type:'pong'}); if(s.tabId && !s.ready && !s.navCheck && !s.connecting)recover(s); return; }
      if (m.type === 'list') {
        const p = BRIDGE_PROVIDERS[m.provider];
        if (!p) throw Error('未知服务');
        const tabs = (await chrome.tabs.query({})).filter(t => originProvider(t.url) === m.provider);
        post(port,{type:'tabs',provider:m.provider,tabs:tabs.map(t => ({id:t.id,title:t.title,url:t.url}))});
      } else if (m.type === 'bind' || m.type === 'ensure') {
        if(s.request) throw Error('请先停止同步再切换标签页');
        s.navCheck=null;s.bindOperation=m.operation;
        const provider=BRIDGE_PROVIDERS[m.provider];if(!provider)throw Error('未知服务');
        const live=()=>sessions.has(port) && s.bindOperation===m.operation;
        const previous=s.connections.get(m.provider);
        let created=false;
        const targetId=m.tabId || previous?.tabId;
        let tab=Number.isInteger(targetId) && targetId>0?await chrome.tabs.get(targetId).catch(()=>null):null;
        if(!live())return;
        if(!tab && m.type==='ensure' && m.create){
          const granted=await chrome.permissions.contains({origins:provider.hosts.map(h=>'https://'+h+'/*')});
          if(!granted)throw Error('首次使用需要授予所选 AI 的访问权限。');
          tab=await chrome.tabs.create({url:provider.url,active:false});
          tab={...tab,url:tab.pendingUrl || tab.url || provider.url};created=true;
          if(!live())return;
          post(port,{type:'session-tab',operation:m.operation,provider:m.provider,tabId:tab.id,title:provider.name+' · 工作台新对话'});
        }
        if(!tab)throw Error('之前的 AI 标签页已关闭，聊天记录保留；输入问题后可自动打开新对话。');
        if (originProvider(tab.url) !== m.provider) throw Error('官网标签页与所选服务不符');
        if (locks.has(tab.id) && locks.get(tab.id) !== s) throw Error('这个官网标签页正在被另一个工作台使用');
        await release(s);
        if(!live())return;
        s.tabId=null; s.provider=null;
        s.trace=[];
        const started=Date.now();
        const stage=message=>{
          s.trace.push({ms:Date.now()-started,message});
          if(live()) post(port,{type:'stage',operation:m.operation,message,trace:s.trace});
        };
        stage(`扩展 ${chrome.runtime.getManifest().version}；标签页状态 ${tab.status || 'unknown'}；休眠 ${!!tab.discarded}；冻结 ${!!tab.frozen}`);
        if(m.type==='ensure' && previous?.tabId===tab.id && previous.ready && JSON.stringify(previous.overrides || {})===JSON.stringify(m.overrides || {})){
          const hello=await timed(chrome.tabs.sendMessage(tab.id,{type:'workbook:hello'},{frameId:0}),700,'检查原会话超时').catch(()=>null);
          if(!live())return;
          if(hello?.version===chrome.runtime.getManifest().version && hello?.documentId===previous.documentId && hello?.bindingToken===previous.bindingToken && !hello.requestId){
            Object.assign(s,previous);s.pendingInterruption=false;s.awaitLogin=false;
            post(port,{type:'bound',operation:m.operation,provider:m.provider,tabId:tab.id,ready:true,reused:true,counts:previous.counts});return;
          }
        }
        s.tabId=tab.id;s.provider=m.provider;s.overrides=m.overrides;s.ready=false;s.awaitLogin=created;s.connecting=true;
        await connectBridge(tab,live,stage);
        if(!live()) return;
        stage('握手成功，正在检查输入框与发送按钮');
        let result;
        for(let attempt=0;attempt<(m.type==='ensure'?5:1);attempt++){
          result=await timed(chrome.tabs.sendMessage(tab.id,{type:'workbook:inspect',provider:m.provider,overrides:m.overrides},{frameId:0}),1800,'脚本握手正常，但官网元素检查未回应。请保留诊断结果；没有发送消息。');
          if(!live())return;
          if(!result?.ok || result.ready)break;
          if(attempt<4 && m.type==='ensure')await new Promise(resolve=>setTimeout(resolve,300));
        }
        if(!result?.ok) throw Error(result?.error || '检查失败');
        if(!sessions.has(port) || s.bindOperation!==m.operation) return;
        s.tabId=tab.id; s.provider=m.provider; s.bindingToken=result.bindingToken;s.documentId=result.documentId;s.overrides=m.overrides;s.ready=result.ready;s.pendingInterruption=false;
        s.connecting=false;s.counts=result.counts;if(s.ready)s.awaitLogin=false;cacheConnection(s);
        post(port,{type:'bound',operation:m.operation,tabId:tab.id,provider:m.provider,...result});
      } else if(m.type==='detach'){
        s.navCheck=null;s.bindOperation=null;s.connecting=false;await release(s);s.tabId=null;s.provider=null;
      } else if (m.type === 'send') {
        if(s.navCheck) throw Error('正在恢复连接，请稍后发送');
        if(s.request) throw Error('已有请求正在同步，未重复发送');
        if(!s.tabId) throw Error('请先绑定官网标签页');
        if (locks.has(s.tabId) && locks.get(s.tabId) !== s) throw Error('官网标签页忙');
        const tab=await chrome.tabs.get(s.tabId);
        if(!sessions.has(port)) return;
        if(originProvider(tab.url)!==s.provider) throw Error('官网已跳转，请重新绑定');
        if(typeof m.text !== 'string' || !m.text.trim() || m.text.length>12000) throw Error('消息需要在 1–12000 字之间');
        s.request=crypto.randomUUID(); locks.set(s.tabId,s);
        post(port,{type:'started',id:s.request,text:m.text});
        try {
          const result=await chrome.tabs.sendMessage(s.tabId,{type:'workbook:send',id:s.request,text:m.text,bindingToken:s.bindingToken});
          if(!result?.ok) throw Error(result?.error || '发送失败，请检查官网，勿直接重复发送');
        } catch(error) { await release(s); throw error; }
      } else if(m.type==='cancel') {
        s.navCheck=null;await release(s); post(port,{type:'ended',reason:'已停止同步；官网可能仍在生成，请到官网查看。'});
      } else if(m.type==='focus') {
        if(s.tabId) { const t=await chrome.tabs.update(s.tabId,{active:true}); await chrome.windows.update(t.windowId,{focused:true}); }
      }
    } catch(error) { if(s.bindOperation===m.operation)s.connecting=false;post(port,{type:'error',operation:m.operation,message:error.message,trace:['bind','ensure'].includes(m.type)?s.trace:undefined}); }
  });
});
chrome.runtime.onMessage.addListener((m,sender) => {
  const s=locks.get(sender.tab?.id);
  if(!s || sender.frameId!==0 || originProvider(sender.url)!==s.provider || m.id!==s.request || m.type!=='update') return;
  post(s.port,{type:'update',id:m.id,text:typeof m.text==='string'?m.text.slice(0,200000):'',status:m.status,terminal:!!m.terminal,error:!!m.error});
  if(m.terminal) { locks.delete(s.tabId); s.request=null; }
});
function cacheConnection(s){
  s.connections?.set(s.provider,{provider:s.provider,tabId:s.tabId,bindingToken:s.bindingToken,documentId:s.documentId,overrides:s.overrides,ready:s.ready,counts:s.counts});
}
function invalidate(tabId,message='AI 标签页已关闭。聊天记录已保留；重新打开对话页后可继续。') {
  for(const s of sessions.values()) if(s.tabId===tabId) {
    s.navCheck=null;release(s);s.tabId=null;
    post(s.port,{type:'invalidated',provider:s.provider,message});
  }
}
async function recover(s) {
  const marker={},tabId=s.tabId;s.navCheck=marker;
  const live=()=>sessions.has(s.port) && s.navCheck===marker && s.tabId===tabId;
  post(s.port,{type:'recovering',provider:s.provider,message:'正在检查会话连接，不会重新发送问题…'});
  try {
    const tab=await timed(chrome.tabs.get(tabId),1000,'标签页检查超时');
    if(!live())return;
    if(originProvider(tab.url)!==s.provider && s.awaitLogin){s.ready=false;post(s.port,{type:'waiting-login',provider:s.provider,message:'请在新打开的 AI 页面完成登录，返回对话页后会自动继续。'});return;}
    if(originProvider(tab.url)!==s.provider){invalidate(tabId,'页面已离开所选 AI，连接已停止；聊天记录保留。');return;}
    const hello=await timed(chrome.tabs.sendMessage(tabId,{type:'workbook:hello'},{frameId:0}),700,'会话握手超时').catch(()=>null);
    if(!live())return;
    // History API URL changes can emit loading without replacing the content script.
    if(s.ready && !s.pendingInterruption && hello?.documentId && hello.documentId===s.documentId && (!s.request || hello.requestId===s.request)) {
      post(s.port,{type:'reconnected',provider:s.provider,ready:true,busy:!!s.request,interrupted:false});return;
    }
    s.pendingInterruption ||= !!s.request;
    await release(s);
    if(!live())return;
    await connectBridge(tab,live,()=>{});
    if(!live())return;
    let result;
    for(let i=0;i<5;i++){
      result=await timed(chrome.tabs.sendMessage(tabId,{type:'workbook:inspect',provider:s.provider,overrides:s.overrides},{frameId:0}),1500,'恢复后元素检查超时');
      if(!live())return;
      if(result?.ok && result.ready)break;
      if(i<4)await new Promise(resolve=>setTimeout(resolve,300));
    }
    if(!result?.ok || !result.ready)throw Error(result?.error || '页面尚未出现可用输入框；聊天记录保留。');
    s.documentId=result.documentId;s.bindingToken=result.bindingToken;s.ready=true;s.awaitLogin=false;
    const interrupted=!!s.pendingInterruption;s.pendingInterruption=false;cacheConnection(s);
    post(s.port,{type:'reconnected',provider:s.provider,ready:true,busy:false,interrupted});
  }catch(error){
    if(live()){
      s.pendingInterruption ||= !!s.request;await release(s);s.ready=false;
      if(live())post(s.port,{type:'reconnect-failed',provider:s.provider,message:'自动恢复连接未完成：'+error.message});
    }
  }finally{if(live())s.navCheck=null;}
}
chrome.tabs.onRemoved.addListener(id=>invalidate(id));
chrome.tabs.onUpdated.addListener((id,change) => {
  if(change.status!=='loading' && change.status!=='complete' && !change.url)return;
  return Promise.all([...sessions.values()].filter(s=>s.tabId===id && !s.connecting).map(recover));
});
