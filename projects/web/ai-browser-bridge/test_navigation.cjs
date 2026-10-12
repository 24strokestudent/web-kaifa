// Real worker event seam: an onUpdated loading event must not cancel a live same-document reply.
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 let connect,receive,updated,removed,request=null,documentId='doc-a',cancelled=0,sendCount=0,host='https://www.kimi.com/chat/one';const out=[];
 const event=()=>({addListener(){}});
 const chrome={action:{onClicked:event()},permissions:{contains:async()=>true},runtime:{getManifest:()=>({version:'test'}),getURL:p=>'chrome-extension://test/'+p,onConnect:{addListener:f=>connect=f},onMessage:event()},scripting:{executeScript:async()=>{}},tabs:{get:async()=>({id:7,url:host,active:true,status:'complete'}),onUpdated:{addListener:f=>updated=f},onRemoved:{addListener:f=>removed=f},sendMessage:async(id,m)=>{
  if(m.type==='workbook:hello')return {ok:true,version:'test',documentId,bindingToken:'token',requestId:request};
  if(m.type==='workbook:inspect')return {ok:true,ready:true,documentId,bindingToken:'token',counts:{input:1,send:1}};
  if(m.type==='workbook:send'){sendCount++;request=m.id;return {ok:true};}
  if(m.type==='workbook:cancel'){cancelled++;request=null;return {ok:true};}
 }}};
 const scope={chrome,URL,console,crypto:{randomUUID:()=> 'request-1'},clearTimeout,setTimeout:f=>setTimeout(f,1),importScripts(){}};vm.createContext(scope);
 for(const f of ['providers.js','background.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),scope);
 const port={name:'workbook',sender:{url:chrome.runtime.getURL('panel.html')},postMessage:m=>out.push(m),disconnect(){},onDisconnect:event(),onMessage:{addListener:f=>receive=f}};
 connect(port);await receive({type:'bind',provider:'kimi',tabId:7,operation:'one'});await receive({type:'send',text:'hello'});
 await updated(7,{status:'loading',url:host},{id:7,url:host});await new Promise(r=>setTimeout(r,40));
 assert.equal(cancelled,0,'same-document loading must not cancel generation');assert.equal(request,'request-1');assert.equal(out.at(-1).type,'reconnected');assert.equal(out.at(-1).busy,true);
 // A genuinely new document reconnects but must not replay the old prompt or read old history.
 documentId='doc-b';request=null;await updated(7,{status:'complete'},{id:7,url:host});await new Promise(r=>setTimeout(r,40));
 assert.equal(out.at(-1).type,'reconnected');assert.equal(out.at(-1).busy,false);assert.equal(out.at(-1).interrupted,true);assert.equal(sendCount,1);
 // Loading/complete arriving together must still preserve the interrupted-round notice.
 await receive({type:'send',text:'second'});documentId='doc-c';request=null;
 await Promise.all([updated(7,{status:'loading'}),updated(7,{status:'complete'})]);
 assert.equal(out.at(-1).type,'reconnected');assert.equal(out.at(-1).interrupted,true);assert.equal(sendCount,2);
 // An unrelated origin must never be injected or rebound.
 host='https://example.com/';await updated(7,{status:'complete'},{id:7,url:host});await new Promise(r=>setTimeout(r,40));assert.equal(out.at(-1).type,'invalidated');
 console.log('PASS: live SPA navigation preserves reply; new document reconnects without resend; foreign origin invalidates.');
})().catch(e=>{console.error(e);process.exitCode=1});
