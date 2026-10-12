/* Real worker event seam: automatic scans are read-only and ignore stale snapshots. */
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 let connect,receive,request=null,version='test',sends=0,cancels=0,injections=0,sequence=0,defer=null,terminal=false;
 const out=[],event=()=>({addListener(){}});
 const chrome={action:{onClicked:event()},permissions:{contains:async()=>true},runtime:{getManifest:()=>({version:'test'}),getURL:p=>'chrome-extension://test/'+p,onConnect:{addListener:f=>connect=f},onMessage:event()},scripting:{executeScript:async()=>{injections++;version='test';}},tabs:{query:async()=>[],get:async()=>({id:7,url:'https://chat.deepseek.com/a/chat/s/test',active:true,status:'complete'}),onUpdated:event(),onRemoved:event(),sendMessage:async(id,m)=>{
  if(m.type==='workbook:hello')return {ok:true,version,documentId:'doc',bindingToken:'token',requestId:request};
  if(m.type==='workbook:inspect')return {ok:true,ready:true,documentId:'doc',bindingToken:'token',counts:{input:1,send:1}};
  if(m.type==='workbook:send'){sends++;request=m.id;return {ok:true};}
  if(m.type==='workbook:cancel'){cancels++;request=null;return {ok:true};}
  if(m.type==='workbook:scan'){
   const snapshot={ok:true,version,documentId:'doc',bindingToken:'token',requestId:terminal?null:request,counts:{input:1,answer:3,stop:terminal?0:1},lastUpdate:request?{id:request,text:'扫描读取的夹具回复',status:'正在回复',terminal}:null};
   if(defer)return new Promise(resolve=>defer.resolve=()=>resolve(snapshot));
   return snapshot;
  }
 }}};
 const scope={chrome,URL,crypto:{randomUUID:()=> 'round-'+(++sequence)},setTimeout,clearTimeout,importScripts(){}};vm.createContext(scope);
 for(const f of ['providers.js','workbook-sites.js','background.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),scope);
 const port={name:'workbook',sender:{url:chrome.runtime.getURL('panel.html')},postMessage:m=>out.push(m),disconnect(){},onDisconnect:event(),onMessage:{addListener:f=>receive=f}};connect(port);
 await receive({type:'bind',provider:'ds',tabId:7,operation:'bind'});await receive({type:'send',text:'first'});
 await receive({type:'ping'});assert.equal(sends,1);assert.equal(cancels,0);assert.equal(out.at(-1).type,'health');assert.equal(out.at(-2).text,'扫描读取的夹具回复');
 terminal=true;await receive({type:'scan'});assert(out.some(m=>m.type==='update' && m.terminal));assert.equal(sends,1);terminal=false;request=null;
 defer={};const waiting=receive({type:'scan'});await receive({type:'send',text:'second'});defer.resolve();await waiting;assert.equal(cancels,0,'stale snapshot must not cancel a newly started message');defer=null;
 version='old-version';await receive({type:'ping'});assert.equal(injections,1,'version mismatch replaces outdated content script');assert.equal(sends,2,'repair does not resend');assert(out.some(m=>m.type==='reconnected' && m.interrupted));
 console.log('PASS: automatic/manual scans recover existing text, accept terminal snapshot, reject stale races, replace old scripts, never resend. No vendor requests.');
})().catch(e=>{console.error(e);process.exitCode=1});
