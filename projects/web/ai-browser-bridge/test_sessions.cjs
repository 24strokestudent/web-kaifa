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
   window.sent=[];window.connections=0;let receive,current;
   const port={postMessage:m=>{window.sent.push(m);queueMicrotask(()=>{
    if(m.type==='list')receive({type:'tabs',provider:m.provider,tabs:[{id:m.provider==='ds'?7:8,title:m.provider}]});
    if(m.type==='bind' || m.type==='ensure'){current=m.provider;if(m.type==='ensure' && !m.tabId){m.tabId=9;receive({type:'session-tab',operation:m.operation,provider:m.provider,tabId:9,title:'自动新建测试对话'});}receive(localStorage.getItem('closed')?{type:'error',operation:m.operation,message:'官网标签页已关闭'}:{type:'bound',operation:m.operation,provider:m.provider,tabId:m.tabId,ready:true,counts:{input:1,send:1}});}
    if(m.type==='send'){receive({type:'started',id:'reply',text:m.text});receive({type:'update',id:'reply',text:current+' reply',terminal:true,status:'完成'});}
   });},onMessage:{addListener:f=>receive=f},onDisconnect:{addListener:f=>window.disconnectPort=f}};
   window.chrome={runtime:{getManifest:()=>({version:'test'}),connect:()=>{window.connections++;return port;}},permissions:{request:async()=>true},tabs:{create:async()=>{}},windows:{}};
  });
  await page.goto(pathToFileURL(path.join(__dirname,'panel.html')).href);
  for(const provider of ['ds','doubao']){
   await page.selectOption('#provider',provider);await page.locator('.connection').evaluate(e=>e.open=true);await page.click('#refresh');await page.selectOption('#tabs',provider==='ds'?'7':'8');await page.click('#bind');await page.locator('#send:enabled').waitFor();
   await page.fill('#question',provider+' hello');await page.click('#send');await page.locator('#provider:enabled').waitFor();
   await page.fill('#question',provider+' draft');
  }
  const binds=await page.evaluate(()=>sent.filter(m=>m.type==='bind').length);
  await page.selectOption('#provider','ds');await page.locator('#send:enabled').waitFor();
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='bind').length),binds,'switch restores without manual bind');
  assert.equal(await page.inputValue('#question'),'ds draft');assert.match(await page.locator('#messages').textContent(),/ds reply/);assert.doesNotMatch(await page.locator('#messages').textContent(),/doubao/);
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),2);
  // Enter sends; both requested modifiers insert a newline at the cursor.
  await page.fill('#question','first');await page.locator('#question').press('Shift+Enter');await page.locator('#question').press('Control+Enter');
  assert.equal(await page.inputValue('#question'),'first\n\n');assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),2);
  await page.locator('#question').dispatchEvent('compositionstart');await page.locator('#question').press('Enter');
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),2,'IME confirmation must not send');
  await page.locator('#question').dispatchEvent('compositionend');
  await page.fill('#question','keyboard message');await page.locator('#question').press('Enter');
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),3);
  await page.locator('#question').press('Enter');assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),3,'empty Enter must not send');
  await page.fill('#question','ds draft');
  await page.selectOption('#provider','kimi');await page.fill('#question','自动新建首条消息');await page.locator('#question').press('Enter');await page.locator('#provider:enabled').waitFor();
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),4,'first-send creates conversation and sends once');
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='ensure' && m.create).length),1);
  assert.match(await page.locator('#messages').textContent(),/kimi reply/);
  await page.selectOption('#provider','ds');await page.locator('#send:enabled').waitFor();
  await page.reload();await page.locator('#send:enabled').waitFor();assert.equal(await page.inputValue('#question'),'ds draft');assert.match(await page.locator('#messages').textContent(),/ds reply/);assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),0);
  await page.locator('#learning-tools summary').click();await page.fill('#instruction','保存这个自定义指导词');
  await page.evaluate(()=>disconnectPort());await page.waitForFunction(()=>connections===2);await page.locator('#send:enabled').waitFor();
  assert.equal(await page.inputValue('#question'),'ds draft');assert.equal(await page.inputValue('#instruction'),'保存这个自定义指导词');assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),0,'port recovery must not resend');
  await page.reload();assert.equal(await page.inputValue('#instruction'),'保存这个自定义指导词');await page.locator('#send:enabled').waitFor();
  await page.evaluate(()=>localStorage.setItem('closed','1'));await page.selectOption('#provider','doubao');await page.locator('#status').filter({hasText:'官网标签页已关闭'}).waitFor();assert(await page.locator('#send').isEnabled(),'retained draft can initiate automatic reconnect');assert.match(await page.locator('#messages').textContent(),/doubao reply/);
  await page.evaluate(()=>localStorage.setItem('workbook-bridge-conversations-v1','{bad'));await page.reload();await page.fill('#question','new draft');assert.equal(await page.evaluate(()=>localStorage.getItem('workbook-bridge-conversations-v1')),'{bad');assert.match(await page.locator('#save-state').textContent(),/原记录已保留/);
  assert.deepEqual(errors,[]);console.log('PASS: isolated provider history/drafts, automatic reconnect, reload recovery, missing tab retains history, no auto-send, corrupt data preserved.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
