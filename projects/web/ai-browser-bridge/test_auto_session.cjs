// Real worker protocol with deterministic browser-message fixtures; no vendor requests.
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 let connect,receive,update,removed,terminal,creates=0,inspects=0,sends=0,injects=0,uuid=0;const out=[],tabs=new Map();
 const event=()=>({addListener(){}});
 const chrome={action:{onClicked:event()},permissions:{contains:async()=>true},runtime:{getManifest:()=>({version:'test'}),getURL:p=>'chrome-extension://test/'+p,onConnect:{addListener:f=>connect=f},onMessage:{addListener:f=>terminal=f}},scripting:{executeScript:async()=>{injects++;}},tabs:{get:id=>{if(!Number.isInteger(id))throw Error('tabs.get requires integer');return tabs.has(id)?Promise.resolve(tabs.get(id)):Promise.reject(Error('missing'));},create:async opts=>{const tab={id:++creates,url:opts.url,active:false,status:'complete',documentId:'doc-'+creates,bindingToken:null,request:null};tabs.set(tab.id,tab);return tab;},onUpdated:{addListener:f=>update=f},onRemoved:{addListener:f=>removed=f},sendMessage:async(id,m)=>{const tab=tabs.get(id);if(!tab)throw Error('missing');
 if(m.type==='workbook:hello')return {ok:true,version:'test',documentId:tab.documentId,bindingToken:tab.bindingToken,requestId:tab.request};
 if(m.type==='workbook:inspect'){inspects++;tab.bindingToken='binding-'+inspects;return {ok:true,ready:true,documentId:tab.documentId,bindingToken:tab.bindingToken,counts:{input:1,send:1}};}
 if(m.type==='workbook:send'){assert.equal(m.bindingToken,tab.bindingToken);sends++;tab.request=m.id;return {ok:true};}
 if(m.type==='workbook:cancel'){tab.request=null;return {ok:true};}
 }}};
 const scope={chrome,URL,crypto:{randomUUID:()=> 'id-'+(++uuid)},setTimeout,clearTimeout,importScripts(){}};vm.createContext(scope);
 for(const f of ['providers.js','background.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),scope);
 const port={name:'workbook',sender:{url:chrome.runtime.getURL('panel.html')},postMessage:m=>out.push(m),disconnect(){},onDisconnect:event(),onMessage:{addListener:f=>receive=f}};
 connect(port);
 const ensure=provider=>receive({type:'ensure',provider,create:true,operation:'op-'+(++uuid),overrides:{}});
 await ensure('kimi');assert.equal(creates,1);assert.equal(sends,0,'connection sends no seed prompt');
 for(const text of ['first','second']){await receive({type:'send',text});const tab=tabs.get(1);terminal({type:'update',id:tab.request,text:'response',status:'done',terminal:true},{tab:{id:1},frameId:0,url:tab.url});tab.request=null;}
 await receive({type:'detach'});await ensure('gemini');await receive({type:'detach'});const count=inspects;await ensure('kimi');
 assert.equal(out.at(-1).reused,true);assert.equal(inspects,count,'same document reuses token without rebinding');assert.equal(creates,2);assert.equal(sends,2);
 await receive({type:'send',text:'third'});assert.equal(sends,3);assert.equal(injects,0);
 console.log('PASS: new provider conversation created once; two rounds then switch and third round; connection reused with no seed prompt.');
})().catch(e=>{console.error(e);process.exitCode=1});
