/* Worker selection regression: exact saved URLs, closed tabs and reused IDs. No vendor calls. */
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 let connect,receive,removed,next=20,creates=0,sends=0;const tabs=new Map(),out=[];
 const url='https://chat.deepseek.com/a/chat/s/saved-fixture';
 const event=()=>({addListener(){}});
 const chrome={action:{onClicked:event()},windows:{update:async()=>({})},permissions:{contains:async()=>true},runtime:{getManifest:()=>({version:'0.2.3'}),getURL:p=>'chrome-extension://fixture/'+p,onConnect:{addListener:f=>connect=f},onMessage:event()},scripting:{executeScript:async()=>{}},tabs:{query:async()=>[...tabs.values()],get:async id=>{if(!tabs.has(id))throw Error('closed');return tabs.get(id);},update:async(id,opts)=>Object.assign(tabs.get(id),opts),create:async opts=>{creates++;const tab={id:++next,url:opts.url,windowId:1,active:opts.active,status:'complete'};tabs.set(tab.id,tab);return tab;},onUpdated:event(),onRemoved:{addListener:f=>removed=f},sendMessage:async(id,m)=>{
  if(m.type==='workbook:hello')return {ok:true,version:'0.2.3',documentId:'doc-'+id,bindingToken:'token-'+id};
  if(m.type==='workbook:inspect')return {ok:true,ready:true,documentId:'doc-'+id,bindingToken:'token-'+id,counts:{input:1,send:1}};
  if(m.type==='workbook:send'){sends++;return {ok:true};}
  if(m.type==='workbook:cancel')return {ok:true};
 }}};
 const scope={chrome,URL,crypto:{randomUUID:()=>Math.random()+''},setTimeout,clearTimeout,importScripts(){}};vm.createContext(scope);
 for(const f of ['providers.js','workbook-sites.js','background.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),scope);
 const port={name:'workbook',sender:{url:chrome.runtime.getURL('panel.html')},postMessage:m=>out.push(m),onDisconnect:event(),onMessage:{addListener:f=>receive=f},disconnect(){}};connect(port);
 const ensure=(extra={})=>receive({type:'ensure',provider:'ds',tabId:7,url,operation:Math.random()+'',overrides:{},...extra});
 tabs.set(7,{id:7,url:'https://www.doubao.com/chat/',windowId:1});tabs.set(8,{id:8,url,windowId:1});
 await ensure();assert.equal(out.at(-1).tabId,8,'reused ID cannot bind wrong provider');assert.equal(creates,0);
 await receive({type:'detach'});tabs.set(7,{id:7,url:'https://chat.deepseek.com/a/chat/s/unrelated',windowId:1});
 await ensure({open:true});assert.equal(out.at(-1).tabId,8,'unrelated same-provider chat is not substituted');assert.equal(creates,0);assert(tabs.get(8).active);
 tabs.delete(8);removed(8);await ensure({create:true,open:true});assert.equal(creates,1);assert.equal(tabs.get(21).url,url);assert.equal(out.at(-1).tabId,21);
 assert.equal(sends,0,'opening/recovery sends no seed or draft');await ensure({tabId:21,create:true,open:true});assert.equal(creates,1,'existing exact session is reused');assert(out.at(-1).reused);
 await receive({type:'detach'});await receive({type:'locate',provider:'ds',url});assert.equal(out.at(-1).type,'available');assert.equal(out.at(-1).tabId,21);assert.equal(sends,0);
 tabs.set(22,{id:22,url,windowId:1});await ensure({tabId:999});assert.equal(out.at(-1).type,'error');assert.match(out.at(-1).message,/多个/);assert.equal(creates,1);
 tabs.delete(22);await ensure({tabId:999,url:'https://user:password@chat.deepseek.com/',create:true});assert.equal(tabs.get(22).url,'https://chat.deepseek.com/','credential-bearing URL is not opened or stored');
 await receive({type:'build'});assert.equal(out.at(-1).protocol,3);assert.equal(out.at(-1).build,'0.2.3');
 console.log('PASS: saved-session lookup, reused/wrong IDs, reopen exact URL, open twice creates once, read-only discovery, ambiguity/credential URLs, build handshake. Worker fixtures only.');
})().catch(e=>{console.error(e);process.exitCode=1});
