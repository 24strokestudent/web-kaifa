// Provider switching, reload, and unavailable tabs: local panel fixture, no real AI calls.
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://**/*',r=>r.fulfill({body:'fixture'}));
  await page.addInitScript(()=>{
   window.sent=[];let receive,current;
   const port={postMessage:m=>{window.sent.push(m);queueMicrotask(()=>{
    if(m.type==='list')receive({type:'tabs',provider:m.provider,tabs:[{id:m.provider==='ds'?7:8,title:m.provider}]});
    if(m.type==='bind'){current=m.provider;receive(localStorage.getItem('closed')?{type:'error',operation:m.operation,message:'官网标签页已关闭'}:{type:'bound',operation:m.operation,provider:m.provider,tabId:m.tabId,ready:true,counts:{input:1,send:1}});}
    if(m.type==='send'){receive({type:'started',id:'reply',text:m.text});receive({type:'update',id:'reply',text:current+' reply',terminal:true,status:'完成'});}
   });},onMessage:{addListener:f=>receive=f},onDisconnect:{addListener(){}}};
   window.chrome={runtime:{connect:()=>port},permissions:{request:async()=>true},tabs:{create:async()=>{}},windows:{}};
  });
  await page.goto(pathToFileURL(path.join(__dirname,'panel.html')).href);
  for(const provider of ['ds','doubao']){
   await page.selectOption('#provider',provider);await page.click('#refresh');await page.selectOption('#tabs',provider==='ds'?'7':'8');await page.click('#bind');await page.locator('#send:enabled').waitFor();
   await page.fill('#question',provider+' hello');await page.click('#send');await page.locator('#provider:enabled').waitFor();
   await page.fill('#question',provider+' draft');
  }
  await page.selectOption('#provider','ds');await page.locator('#send:enabled').waitFor();
  assert.equal(await page.inputValue('#question'),'ds draft');assert.match(await page.locator('#messages').textContent(),/ds reply/);assert.doesNotMatch(await page.locator('#messages').textContent(),/doubao/);
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),2);
  await page.reload();await page.locator('#send:enabled').waitFor();assert.equal(await page.inputValue('#question'),'ds draft');assert.match(await page.locator('#messages').textContent(),/ds reply/);assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),0);
  await page.evaluate(()=>localStorage.setItem('closed','1'));await page.selectOption('#provider','doubao');await page.getByText('官网标签页已关闭',{exact:true}).waitFor();assert(await page.locator('#send').isDisabled());assert.match(await page.locator('#messages').textContent(),/doubao reply/);
  await page.evaluate(()=>localStorage.setItem('workbook-bridge-conversations-v1','{bad'));await page.reload();await page.fill('#question','new draft');assert.equal(await page.evaluate(()=>localStorage.getItem('workbook-bridge-conversations-v1')),'{bad');assert.match(await page.locator('#save-state').textContent(),/原记录已保留/);
  assert.deepEqual(errors,[]);console.log('PASS: isolated provider history/drafts, automatic reconnect, reload recovery, missing tab retains history, no auto-send, corrupt data preserved.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
