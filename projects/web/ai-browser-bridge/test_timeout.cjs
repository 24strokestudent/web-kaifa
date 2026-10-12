// Worker regression: a stalled injection/inspection must return a visible error, never send.
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
async function check(stage){
  let connect,receive;const messages=[];let sendCalls=0;
  const event=()=>({addListener(){}});
  const chrome={
    action:{onClicked:event()},runtime:{getURL:p=>'chrome-extension://test/'+p,onConnect:{addListener:f=>connect=f},onMessage:event()},
    tabs:{get:async()=>({id:7,url:'https://chat.deepseek.com/'}),onRemoved:event(),onUpdated:event(),sendMessage:()=>{sendCalls++;return new Promise(()=>{});}},
    scripting:{executeScript:options=>{assert.equal(options.injectImmediately,true);return stage==='inject'?new Promise(()=>{}):Promise.resolve();}}
  };
  const scope={chrome,URL,console,clearTimeout,setTimeout:(fn)=>setTimeout(fn,5),importScripts(){}};
  vm.createContext(scope);vm.runInContext(fs.readFileSync(path.join(__dirname,'providers.js'),'utf8'),scope);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'background.js'),'utf8'),scope);
  const port={name:'workbook',sender:{url:chrome.runtime.getURL('panel.html')},postMessage:m=>messages.push(m),disconnect(){},onDisconnect:event(),onMessage:{addListener:f=>receive=f}};
  connect(port);await receive({type:'bind',provider:'ds',tabId:7,operation:'test'});
  assert.equal(messages.at(-1).type,'error');assert.equal(messages.at(-1).operation,'test');
  assert.match(messages.at(-1).message,stage==='inject'?/注入官网脚本超时/:/官网检查没有回应/);
  assert.equal(sendCalls,stage==='inject'?0:1); // Inspection only; no send request dispatched.
}
(async()=>{await check('inject');await check('inspect');console.log('PASS: stalled injection and inspection report bounded errors, preserve correlation, never send a prompt.');})().catch(e=>{console.error(e);process.exitCode=1});
