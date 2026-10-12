/* Announces the opaque extension UI. No chat history, credentials or commands cross this seam. */
(()=>{
  if(window!==top || !isWorkbookURL(location.href))return;
  const runtime=globalThis.chrome?.runtime;
  if(!runtime?.onMessage)return;
  // Re-injection must not leave invalidated listeners removing a newer announcement.
  try{globalThis.__workbookSiteBridge?.dispose();}catch{}
  const instance=crypto.randomUUID();let disposed=false;
  const announce=()=>{
    if(disposed || !document.head)return;
    try{
      const url=runtime.getURL('panel.html'),version=runtime.getManifest().version;
      let marker=document.querySelector('meta[name="workbook-extension"]');
      if(!marker){marker=document.createElement('meta');marker.name='workbook-extension';document.head.append(marker);}
      marker.content=url;marker.dataset.version=version;marker.dataset.instance=instance;
      window.postMessage({type:'workbook:extension-available',url,version},location.origin);
    }catch{
      const marker=document.querySelector('meta[name="workbook-extension"]');
      if(marker?.dataset.instance===instance)marker.remove();
      dispose();
    }
  };
  const onPage=event=>{
    if(event.source===window && event.origin===location.origin && event.data?.type==='workbook:extension-probe')announce();
  };
  const onRuntime=(m,sender,reply)=>{
    if(disposed || sender.id!==runtime.id)return;
    if(m.type==='workbook:open-assistant'){
      announce();window.postMessage({type:'workbook:open-assistant'},location.origin);
      reply({ok:true,version:runtime.getManifest().version});
    }
  };
  function dispose(){
    disposed=true;
    window.removeEventListener('message',onPage);
    document.removeEventListener('DOMContentLoaded',announce);
    try{runtime.onMessage.removeListener(onRuntime);}catch{}
  }
  globalThis.__workbookSiteBridge={dispose};
  window.addEventListener('message',onPage);
  runtime.onMessage.addListener(onRuntime);
  document.addEventListener('DOMContentLoaded',announce,{once:true});
  announce();
})();
