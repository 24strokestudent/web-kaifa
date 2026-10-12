// Reload regression: old content-script closures outlive their extension runtime.
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const code=fs.readFileSync(path.join(__dirname,'bridge.js'),'utf8');
function context(){
 const listeners=new Set();
 const runtime={getManifest:()=>({version:'test'}),onMessage:{addListener:f=>listeners.add(f),removeListener:f=>listeners.delete(f)}};
 const scope={chrome:{runtime}};vm.createContext(scope);return {scope,runtime,listeners};
}
// A disposer from the shipped 0.1.3/0.1.4 code resolves chrome.runtime in its OLD realm.
const old=context();
vm.runInContext('globalThis.__workbookBridge={dispose(){chrome.runtime.onMessage.removeListener(()=>{});}}',old.scope);
old.scope.chrome.runtime=undefined;
const fresh=context();fresh.scope.__workbookBridge=old.scope.__workbookBridge;
assert.doesNotThrow(()=>vm.runInContext(code,fresh.scope),'stale disposer must not prevent new listener installation');
assert.equal(fresh.listeners.size,1);
let reply;[...fresh.listeners][0]({type:'workbook:hello'},{},r=>reply=r);assert.equal(reply.ok,true);
// New cleanup also tolerates a browser API that has been invalidated after installation.
fresh.runtime.onMessage.removeListener=()=>{throw Error('Extension context invalidated.');};
fresh.scope.chrome.runtime=undefined;
assert.doesNotThrow(()=>fresh.scope.__workbookBridge.dispose());
// A script which cannot register must not leave a false installed marker or an uncaught error.
for(const scope of [{},{chrome:{}},{chrome:{runtime:{getManifest(){throw Error('Extension context invalidated.');}}}}]){
 vm.createContext(scope);assert.doesNotThrow(()=>vm.runInContext(code,scope));assert.equal(scope.__workbookBridge,undefined);
}
console.log('PASS: invalidated legacy disposer, new-runtime handshake, invalidated cleanup, missing runtime bootstrap.');
async function streamingInvalidation(rejectAsync){
 const c=context();let timer=0,stops=0,clicks=0;
 class Input {constructor(){this._value='';this.classList={contains:()=>false};}get value(){return this._value;}set value(v){this._value=v;}getClientRects(){return [1];}getAttribute(){return null;}focus(){}dispatchEvent(){}}
 const input=new Input(),button={...input,getClientRects:()=>[1],getAttribute:()=>null,click(){clicks++;}};
 Object.assign(c.scope,{location:{hostname:'chat.deepseek.com',protocol:'https:'},BRIDGE_PROVIDERS:{ds:{hosts:['chat.deepseek.com'],input:['input'],send:['button'],answer:['answer'],stop:['stop']}},document:{body:{},querySelectorAll:s=>s==='input'?[input]:s==='button'?[button]:[]},getComputedStyle:()=>({visibility:'visible'}),HTMLTextAreaElement:Input,HTMLInputElement:class {},Event:class{},crypto:{randomUUID:()=> 'token'},setTimeout,clearInterval(){timer--;},setInterval(){timer++;return 1;},MutationObserver:class{observe(){}disconnect(){stops++;}}});
 c.runtime.sendMessage=()=>{if(rejectAsync)return Promise.reject(Error('Extension context invalidated.'));throw Error('Extension context invalidated.');};
 vm.runInContext(code,c.scope);const listener=[...c.listeners][0];
 const inspect=await new Promise(resolve=>listener({type:'workbook:inspect',provider:'ds'},{},resolve));assert(inspect.ready);
 const result=await new Promise(resolve=>listener({type:'workbook:send',id:'one',text:'fixture',bindingToken:inspect.bindingToken},{},resolve));
 await new Promise(resolve=>setImmediate(resolve));
 assert(result.ok);assert.equal(clicks,1);assert.equal(timer,0);assert.equal(stops,1);
 // A dead response channel must not create an unhandled rejection either.
 assert.doesNotThrow(()=>listener({type:'workbook:hello'},{},()=>{throw Error('port closed');}));
 console.log('PASS: '+(rejectAsync?'asynchronous':'synchronous')+' runtime invalidation cancels observation without duplicate sends.');
}
(async()=>{await streamingInvalidation(false);await streamingInvalidation(true);})().catch(e=>{console.error(e);process.exitCode=1});
