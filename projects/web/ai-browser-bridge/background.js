importScripts('providers.js');
const sessions = new Map();
const locks = new Map();
const originProvider = url => {
  try { const u = new URL(url); return u.protocol === 'https:' && Object.entries(BRIDGE_PROVIDERS).find(([,p]) => p.hosts.includes(u.hostname))?.[0]; } catch { return null; }
};
chrome.action.onClicked.addListener(() => chrome.tabs.create({url:chrome.runtime.getURL('panel.html')}));
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
  if (s.tabId && locks.get(s.tabId) === s) {
    locks.delete(s.tabId);
    await timed(chrome.tabs.sendMessage(s.tabId, {type:'workbook:cancel', id:s.request}),2000,'停止同步超时').catch(() => {});
  }
  s.request = null;
}
chrome.runtime.onConnect.addListener(port => {
  if (port.name !== 'workbook' || port.sender?.url !== chrome.runtime.getURL('panel.html')) { port.disconnect(); return; }
  const s = {port, tabId:null, provider:null, request:null};
  sessions.set(port,s);
  port.onDisconnect.addListener(() => { sessions.delete(port); release(s); });
  port.onMessage.addListener(async m => {
    try {
      if (m.type === 'ping') { post(port,{type:'pong'}); return; }
      if (m.type === 'list') {
        const p = BRIDGE_PROVIDERS[m.provider];
        if (!p) throw Error('未知服务');
        const tabs = (await chrome.tabs.query({})).filter(t => originProvider(t.url) === m.provider);
        post(port,{type:'tabs',provider:m.provider,tabs:tabs.map(t => ({id:t.id,title:t.title,url:t.url}))});
      } else if (m.type === 'bind') {
        if(s.request) throw Error('请先停止同步再切换标签页');
        s.bindOperation=m.operation;
        const tab = await chrome.tabs.get(m.tabId).catch(()=>{throw Error('无法访问之前的 AI 标签页。聊天记录已保留，请打开对话页后重新连接。');});
        if (originProvider(tab.url) !== m.provider) throw Error('官网标签页与所选服务不符');
        if (locks.has(tab.id) && locks.get(tab.id) !== s) throw Error('这个官网标签页正在被另一个工作台使用');
        await release(s);
        s.tabId=null; s.provider=null;
        const live=()=>sessions.has(port) && s.bindOperation===m.operation;
        s.trace=[];
        const started=Date.now();
        const stage=message=>{
          s.trace.push({ms:Date.now()-started,message});
          if(live()) post(port,{type:'stage',operation:m.operation,message,trace:s.trace});
        };
        stage(`扩展 ${chrome.runtime.getManifest().version}；标签页状态 ${tab.status || 'unknown'}；休眠 ${!!tab.discarded}；冻结 ${!!tab.frozen}`);
        await connectBridge(tab,live,stage);
        if(!live()) return;
        stage('握手成功，正在检查输入框与发送按钮');
        const result = await timed(chrome.tabs.sendMessage(tab.id,{type:'workbook:inspect',provider:m.provider,overrides:m.overrides},{frameId:0}),1800,'脚本握手正常，但官网元素检查未回应。请保留诊断结果；没有发送消息。');
        if(!result?.ok) throw Error(result?.error || '检查失败');
        if(!sessions.has(port) || s.bindOperation!==m.operation) return;
        s.tabId=tab.id; s.provider=m.provider; s.bindingToken=result.bindingToken;
        post(port,{type:'bound',operation:m.operation,tabId:tab.id,provider:m.provider,...result});
      } else if(m.type==='detach'){
        s.bindOperation=null;await release(s);s.tabId=null;s.provider=null;
      } else if (m.type === 'send') {
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
        await release(s); post(port,{type:'ended',reason:'已停止同步；官网可能仍在生成，请到官网查看。'});
      } else if(m.type==='focus') {
        if(s.tabId) { const t=await chrome.tabs.update(s.tabId,{active:true}); await chrome.windows.update(t.windowId,{focused:true}); }
      }
    } catch(error) { post(port,{type:'error',operation:m.operation,message:error.message,trace:m.type==='bind'?s.trace:undefined}); }
  });
});
chrome.runtime.onMessage.addListener((m,sender) => {
  const s=locks.get(sender.tab?.id);
  if(!s || sender.frameId!==0 || originProvider(sender.url)!==s.provider || m.id!==s.request || m.type!=='update') return;
  post(s.port,{type:'update',id:m.id,text:typeof m.text==='string'?m.text.slice(0,200000):'',status:m.status,terminal:!!m.terminal,error:!!m.error});
  if(m.terminal) { locks.delete(s.tabId); s.request=null; }
});
function invalidate(tabId) {
  for(const s of sessions.values()) if(s.tabId===tabId) {
    release(s); s.tabId=null;
    post(s.port,{type:'invalidated',provider:s.provider,message:'官网标签页已关闭或重新加载。同步已断开，请重新绑定；不会自动重发。'});
  }
}
chrome.tabs.onRemoved.addListener(invalidate);
chrome.tabs.onUpdated.addListener((id,change) => { if(change.status==='loading') invalidate(id); });
