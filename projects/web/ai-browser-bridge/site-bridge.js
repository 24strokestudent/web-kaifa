/* Announces the opaque extension UI. No chat history, credentials or commands cross this seam. */
(()=>{
  if(window!==top || !isWorkbookURL(location.href))return;
  const announce=()=>{
    try{
      const url=chrome.runtime.getURL('panel.html'),version=chrome.runtime.getManifest().version;
      let marker=document.querySelector('meta[name="workbook-extension"]');
      if(!marker){marker=document.createElement('meta');marker.name='workbook-extension';document.head.append(marker);}
      marker.content=url;marker.dataset.version=version;
      window.postMessage({type:'workbook:extension-available',url,version},location.origin);
    }catch{document.querySelector('meta[name="workbook-extension"]')?.remove();}
  };
  window.addEventListener('message',event=>{
    if(event.source===window && event.origin===location.origin && event.data?.type==='workbook:extension-probe')announce();
  });
  chrome.runtime.onMessage.addListener(m=>{
    if(m.type==='workbook:open-assistant'){announce();window.postMessage({type:'workbook:open-assistant'},location.origin);}
  });
  document.addEventListener('DOMContentLoaded',announce,{once:true});
  announce();
})();
