/* Explicit workbook locations; unrelated pages and code previews are excluded. */
globalThis.isWorkbookURL=value=>{
  try{const u=new URL(value);
    if(u.protocol==='https:' && u.hostname==='zhouwu97.github.io')return /^\/web-kaifa\/(?:index\.html)?$/.test(u.pathname);
    return u.protocol==='http:' && ['localhost','127.0.0.1'].includes(u.hostname) && /^\/(?:index\.html)?$/.test(u.pathname);
  }catch{return false;}
};
globalThis.isWorkbookOrigin=value=>{
  try{const u=new URL(value);return u.origin===value && ((u.protocol==='https:' && u.hostname==='zhouwu97.github.io') || (u.protocol==='http:' && ['localhost','127.0.0.1'].includes(u.hostname)));}catch{return false;}
};
