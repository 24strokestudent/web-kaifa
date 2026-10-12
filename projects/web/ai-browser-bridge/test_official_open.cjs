/* Reproduce the dead recovery button using a closed tab and retained local history. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();page.setDefaultTimeout(3000);
  await page.route('https://**/*',r=>r.fulfill({body:'offline fixture'}));
  await page.addInitScript(()=>{
   if(!localStorage.getItem('workbook-bridge-conversations-v1'))localStorage.setItem('workbook-bridge-conversations-v1',JSON.stringify({version:1,active:'ds',sessions:{ds:{records:[{role:'user',text:'原对话记录',provider:'ds'}],draft:'',tab:'7',url:'https://chat.deepseek.com/a/chat/s/saved-fixture',options:[{value:'7',text:'之前的对话'}],selectors:{}}}}));
   window.sent=[];window.created=0;let reply;
   const port={postMessage:m=>{sent.push(m);queueMicrotask(()=>{
    if(m.type==='ensure' && !m.create)reply({type:'error',operation:m.operation,message:'之前的 AI 标签页已关闭'});
    if(m.type==='ensure' && m.create){created++;reply({type:'session-tab',operation:m.operation,provider:'ds',tabId:9,title:'恢复的官网',url:'https://chat.deepseek.com/a/chat/s/saved-fixture',newConversation:!m.url});reply({type:'bound',operation:m.operation,provider:'ds',tabId:9,url:'https://chat.deepseek.com/a/chat/s/saved-fixture',ready:true,counts:{input:1,send:1}});}
   });},onMessage:{addListener:f=>reply=f},onDisconnect:{addListener(){}}};
   window.chrome={runtime:{getManifest:()=>({version:'test'}),connect:()=>port},permissions:{request:async()=>true},tabs:{get:async()=>{throw Error('No tab with id 7');},update:async()=>{throw Error('No tab with id 7');},create:async()=>({id:9})},windows:{update:async()=>{}}};
  });
  await page.goto(pathToFileURL(path.join(__dirname,'panel.html')).href);
  await page.locator('#connection-feedback[data-kind=error]').waitFor();
  await page.click('#focus-selected');
  await page.waitForFunction(()=>document.querySelector('#tabs').value==='9');
  assert.equal(await page.evaluate(()=>created),1);assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),0,'opening must not send a prompt');
  assert.match(await page.locator('#messages').textContent(),/原对话记录/);assert.equal(await page.locator('#question').inputValue(),'');
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('workbook-bridge-conversations-v1')).sessions.ds.url),'https://chat.deepseek.com/a/chat/s/saved-fixture');
  await page.locator('.connection').evaluate(e=>e.open=true);await page.click('#open');
  assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='ensure' && m.open).length),2,'both open controls use the same recovery path');
  // Legacy storage without a URL cannot pretend the new AI session has the old context.
  await page.evaluate(()=>{const key='workbook-bridge-conversations-v1',data=JSON.parse(localStorage.getItem(key));data.sessions.ds.url='';data.sessions.ds.tab='7';data.sessions.ds.options=[{value:'7',text:'旧标签'}];localStorage.setItem(key,JSON.stringify(data));});
  await page.reload();await page.locator('#connection-feedback[data-kind=error]').waitFor();await page.click('#focus-selected');await page.locator('.new-session-note').waitFor();assert.match(await page.locator('.new-session-note').textContent(),/不会自动读取/);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('workbook-bridge-conversations-v1')).sessions.ds.newOfficialSession),true);await page.reload();await page.locator('.new-session-note').waitFor();assert.match(await page.locator('#messages').textContent(),/原对话记录/);assert.equal(await page.evaluate(()=>sent.filter(m=>m.type==='send').length),0);
  console.log('PASS: closed-tab recovery opens/connects with empty composer; target/history retained; new-session boundary remains after reload; no sends. UI fixture only.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
