/* Detects a local extension UI, then delegates to the existing workbench surface. */
(()=>{
  'use strict';
  const connect=()=>{
    if(window!==top)return;
    const marker=document.querySelector('meta[name="workbook-extension"]');
    if(!marker)return;
    try{
      const url=new URL(marker.content);
      if(url.protocol!=='chrome-extension:' || !/^[a-p]{32}$/.test(url.hostname) || url.pathname!=='/panel.html')return;
      window.Workbench?.connectAssistant(url.href,marker.dataset.version);
    }catch{}
  };
  window.addEventListener('message',event=>{
    if(event.source!==window || event.origin!==location.origin)return;
    if(event.data?.type==='workbook:extension-available')connect();
    if(event.data?.type==='workbook:open-assistant')window.Workbench?.openAssistant();
  });
  const start=()=>{connect();window.postMessage({type:'workbook:extension-probe'},location.origin);};
  document.addEventListener('DOMContentLoaded',start,{once:true});
  window.addEventListener('pageshow',start);start();
})();
