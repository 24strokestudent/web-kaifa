/* Discovers an extension-owned UI. This channel cannot send chat messages. */
(()=>{
  'use strict';
  if(window!==top)return;
  let state={phase:'idle',version:'',seconds:0},timer=null,deadline=0,blockedURL='';
  const show=next=>{
    state={...state,...next};
    window.Workbench?.setAssistantConnection(state);
  };
  const stop=()=>{clearInterval(timer);timer=null;};
  const connect=()=>{
    const marker=document.querySelector('meta[name="workbook-extension"]');
    if(!marker)return false;
    try{
      const url=new URL(marker.content);
      if(url.protocol!=='chrome-extension:' || !/^[a-p]{32}$/.test(url.hostname) || url.pathname!=='/panel.html' || url.search || url.hash)return false;
      const instance=marker.dataset.instance||'';
      if(blockedURL===url.href+'|'+(marker.dataset.version||'')+'|'+instance)return false;
      const result=window.Workbench?.connectAssistant(url.href,marker.dataset.version,instance);
      if(result){stop();return true;}
    }catch{}
    return false;
  };
  const probe=()=>{
    if(connect())return;
    const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));
    if(!seconds){stop();show({phase:'unavailable',seconds:0});return;}
    show({phase:'probing',seconds});
    window.postMessage({type:'workbook:extension-probe'},location.origin);
  };
  const retry=()=>{
    if(state.phase==='connected'){window.Workbench?.openAssistant();return;}
    if(state.phase==='connecting' || state.phase==='probing')return;
    stop();blockedURL='';
    if(!/^https?:$/.test(location.protocol)){show({phase:'unsupported',seconds:0});return;}
    deadline=Date.now()+3000;show({phase:'probing',seconds:3});
    timer=setInterval(probe,250);probe();
  };
  window.WorkbookExtensionConnection={retry,getState:()=>({...state})};
  window.addEventListener('workbook:assistant-connection',event=>{
    const next=event.detail;
    if(next.phase==='failed'){stop();blockedURL=next.url+'|'+next.version+'|'+next.instance;}
    show(next);
  });
  window.addEventListener('message',event=>{
    if(event.source!==window || event.origin!==location.origin)return;
    if(event.data?.type==='workbook:extension-available')connect();
    if(event.data?.type==='workbook:open-assistant'){window.Workbench?.openAssistant();retry();}
  });
  // Page setup can follow the first announcement. A bounded probe handles either order.
  const start=()=>{show(state);retry();};
  document.addEventListener('DOMContentLoaded',start,{once:true});
  window.addEventListener('pageshow',start);
  const announceProbe=()=>{if(!document.hidden)window.postMessage({type:'workbook:extension-probe'},location.origin);};
  window.addEventListener('focus',announceProbe);
  document.addEventListener('visibilitychange',announceProbe);
  setInterval(announceProbe,15000);
  start();
})();
