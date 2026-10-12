// Exercise the real worker: a live content script must not depend on injection acknowledgement.
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const version=JSON.parse(fs.readFileSync(path.join(__dirname,'manifest.json'))).version;
async function check(mode){
 let connect,receive,injections=0,prompts=0,awakened=false;const messages=[];
 const event=()=>({addListener(){}}),never=()=>new Promise(()=>{});
 const chrome={
  action:{onClicked:event()},permissions:{contains:async()=>mode!=='permission'},
  runtime:{getManifest:()=>({version}),getURL:p=>'chrome-extension://test/'+p,onConnect:{addListener:f=>connect=f},onMessage:event()},
  tabs:{get:async id=>({id,url:'https://chat.deepseek.com/',windowId:1,active:awakened}),query:async()=>[{id:9,windowId:1}],update:async(id)=>{awakened=id===7;return {id,windowId:1};},onRemoved:event(),onUpdated:event(),sendMessage:async(id,m)=>{
   if(m.type==='workbook:send')prompts++;
   if(m.type==='workbook:hello'){
    if(mode==='existing'||(mode==='ack'&&injections)||(mode==='sleep'&&awakened)||(mode==='inspect'&&injections))return {ok:true,version};
    throw Error('Receiving end does not exist');
   }
   if(m.type==='workbook:inspect')return mode==='inspect'?never():{ok:true,ready:true,bindingToken:'test',counts:{input:1,send:1}};
   return never();
  }},
  scripting:{executeScript:options=>{injections++;assert.equal(options.injectImmediately,true);return never();}}
 };
 const scope={chrome,URL,console,clearTimeout,setTimeout:fn=>setTimeout(fn,2),importScripts(){}};
 vm.createContext(scope);for(const f of ['providers.js','background.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),scope);
 const port={name:'workbook',sender:{url:chrome.runtime.getURL('panel.html')},postMessage:m=>messages.push(m),disconnect(){},onDisconnect:event(),onMessage:{addListener:f=>receive=f}};
 connect(port);await receive({type:'bind',provider:'ds',tabId:7,operation:'test'});
 const last=messages.at(-1);assert.equal(last.operation,'test');assert.equal(prompts,0);
 if(['existing','ack','sleep'].includes(mode)){
  assert.equal(last.type,'bound',`${mode}: ${last.message}`);
  assert.equal(injections,mode==='existing'?0:1);
 }else {assert.equal(last.type,'error');assert.match(last.message,mode==='permission'?/权限/:mode==='inspect'?/检查/:/握手/);}
 console.log('PASS:',mode);
}
(async()=>{for(const mode of ['existing','ack','sleep','permission','inject','inspect'])await check(mode);})().catch(e=>{console.error(e);process.exitCode=1});
// Reinstalling after a same-version reload must replace the listener, not trust a stale sentinel.
{
 const listeners=new Set();
 const scope={chrome:{runtime:{getManifest:()=>({version}),onMessage:{addListener:f=>listeners.add(f),removeListener:f=>listeners.delete(f)}}},__workbookBridge:true};
 vm.createContext(scope);const code=fs.readFileSync(path.join(__dirname,'bridge.js'),'utf8');
 vm.runInContext(code,scope);assert.equal(listeners.size,1);
 const first=[...listeners][0];vm.runInContext(code,scope);assert.equal(listeners.size,1);assert(!listeners.has(first));
 let reply;[...listeners][0]({type:'workbook:hello'},{},r=>reply=r);assert.equal(reply.version,version);
 assert.equal([...listeners][0]({type:'inspect'},{},()=>{throw Error('legacy protocol accepted');}),undefined);
 console.log('PASS: legacy sentinel recovery, same-version listener replacement, versioned handshake');
}
