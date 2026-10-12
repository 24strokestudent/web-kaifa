importScripts('providers.js');
const sessions = new Map();
const locks = new Map();
const originProvider = url => {
  try { const u = new URL(url); return u.protocol === 'https:' && Object.entries(BRIDGE_PROVIDERS).find(([,p]) => p.hosts.includes(u.hostname))?.[0]; } catch { return null; }
};
chrome.action.onClicked.addListener(() => chrome.tabs.create({url:chrome.runtime.getURL('panel.html')}));
function post(port, value) { try { port.postMessage(value); } catch {} }
async function release(s) {
  if (s.tabId && locks.get(s.tabId) === s) {
    locks.delete(s.tabId);
    await chrome.tabs.sendMessage(s.tabId, {type:'cancel', id:s.request}).catch(() => {});
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
        const tab = await chrome.tabs.get(m.tabId);
        if (originProvider(tab.url) !== m.provider) throw Error('官网标签页与所选服务不符');
        if (locks.has(tab.id) && locks.get(tab.id) !== s) throw Error('这个官网标签页正在被另一个工作台使用');
        await release(s);
        s.tabId=null; s.provider=null;
        await chrome.scripting.executeScript({target:{tabId:tab.id},files:['providers.js','bridge.js']});
        const result = await chrome.tabs.sendMessage(tab.id,{type:'inspect',provider:m.provider,overrides:m.overrides});
        if(!result?.ok) throw Error(result?.error || '检查失败');
        if(!sessions.has(port)) return;
        s.tabId=tab.id; s.provider=m.provider; s.bindingToken=result.bindingToken;
        post(port,{type:'bound',tabId:tab.id,provider:m.provider,...result});
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
          const result=await chrome.tabs.sendMessage(s.tabId,{type:'send',id:s.request,text:m.text,bindingToken:s.bindingToken});
          if(!result?.ok) throw Error(result?.error || '发送失败，请检查官网，勿直接重复发送');
        } catch(error) { await release(s); throw error; }
      } else if(m.type==='cancel') {
        await release(s); post(port,{type:'ended',reason:'已停止同步；官网可能仍在生成，请到官网查看。'});
      } else if(m.type==='focus') {
        if(s.tabId) { const t=await chrome.tabs.update(s.tabId,{active:true}); await chrome.windows.update(t.windowId,{focused:true}); }
      }
    } catch(error) { post(port,{type:'error',message:error.message}); }
  });
});
chrome.runtime.onMessage.addListener((m,sender) => {
  const s=locks.get(sender.tab?.id);
  if(!s || sender.frameId!==0 || originProvider(sender.url)!==s.provider || m.id!==s.request || m.type!=='update') return;
  post(s.port,{type:'update',id:m.id,text:typeof m.text==='string'?m.text.slice(0,200000):'',status:m.status,terminal:!!m.terminal});
  if(m.terminal) { locks.delete(s.tabId); s.request=null; }
});
function invalidate(tabId) {
  for(const s of sessions.values()) if(s.tabId===tabId) {
    release(s); s.tabId=null;
    post(s.port,{type:'invalidated',message:'官网标签页已关闭或重新加载。同步已断开，请重新绑定；不会自动重发。'});
  }
}
chrome.tabs.onRemoved.addListener(invalidate);
chrome.tabs.onUpdated.addListener((id,change) => { if(change.status==='loading') invalidate(id); });
