(()=>{
  const params=new URLSearchParams(location.search);
  const origin=params.get('host'),channel=params.get('channel');
  const embedded=params.get('embedded')==='1' && parent!==window && isWorkbookOrigin(origin) && /^[a-zA-Z0-9-]{16,80}$/.test(channel || '');
  globalThis.WORKBOOK_EMBED=embedded?{origin,channel}:null;
  if(embedded)document.documentElement.classList.add('embedded');
})();
