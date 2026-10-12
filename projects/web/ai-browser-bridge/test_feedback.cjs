// Local UI fixture only: no extension privileges, vendor pages, or account sessions.
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:960}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://**/*',r=>r.fulfill({contentType:'text/html; charset=utf-8',body:'<!doctype html><meta charset="utf-8"><h1>课程布局测试</h1><script>addEventListener("message",e=>{if(e.data.type==="workbook:course-request")parent.postMessage({type:"workbook:course-context",nonce:e.data.nonce,lesson:{id:"fixture",title:"课程布局测试",task:"完成测试任务",checks:["检查结果"]},code:"fixture code"},"*");});</script>'}));
  await page.addInitScript(()=>{
   window.__sent=[];window.__reply=null;
   const port={postMessage:m=>{window.__sent.push(m);if(m.type==='list')window.__reply({type:'tabs',provider:m.provider,tabs:[{id:7,title:'本地故障测试夹具'}]});},onMessage:{addListener:f=>window.__reply=f},onDisconnect:{addListener(){}}};
   window.chrome={runtime:{connect:()=>port},permissions:{request:async()=>true},tabs:{create:async()=>{},update:async()=>({windowId:1})},windows:{update:async()=>{}}};
  });
  await page.goto(pathToFileURL(path.join(__dirname,'panel.html')).href);
  await page.clock.install();
  await page.selectOption('#provider','ds');await page.locator('.connection').evaluate(e=>e.open=true);await page.click('#refresh');await page.selectOption('#tabs','7');await page.click('#bind');
  assert.equal(await page.locator('#countdown').textContent(),'剩余 10 秒');assert(await page.locator('#bind').isDisabled());
  await page.clock.fastForward(1100);assert.equal(await page.locator('#countdown').textContent(),'剩余 9 秒');
  await page.clock.fastForward(3000);assert.equal(await page.locator('#countdown').textContent(),'剩余 6 秒');
  const first=await page.evaluate(()=>window.__sent.find(m=>m.type==='bind').operation);
  await page.evaluate(operation=>window.__reply({type:'stage',operation,message:'脚本已注入，正在检查输入框与发送按钮'}),first);
  assert((await page.locator('#status').textContent()).includes('脚本已注入'));
  await page.evaluate(operation=>window.__reply({type:'error',operation,message:'注入官网脚本超时。没有发送消息。'}),first);
  assert.equal(await page.locator('#connection-feedback').getAttribute('role'),'alert');
  assert(await page.locator('#retry').isVisible());assert.equal(await page.locator('#countdown').isVisible(),false);
  await page.click('#retry');assert.equal(await page.locator('#countdown').textContent(),'剩余 10 秒');
  await page.evaluate(operation=>window.__reply({type:'bound',operation,provider:'ds',tabId:7,ready:true,counts:{input:1,send:1}}),first);
  assert(await page.locator('#send').isDisabled(),'stale success cannot enable sending');
  await page.clock.fastForward(10001);
  assert((await page.locator('#status').textContent()).includes('连接检查超时'));
  assert.equal(await page.locator('#countdown').isVisible(),false);assert(await page.locator('#bind').isEnabled());
  for(const width of [375,768,1200]){
   await page.setViewportSize({width,height:960});
   assert(await page.evaluate(()=>{const r=document.querySelector('#connection-feedback').getBoundingClientRect(),h=document.querySelector('.heading').getBoundingClientRect();return r.top>=h.bottom-1&&r.width>0&&r.right<=innerWidth+1;}));
  }
  const qa=path.resolve(__dirname,'../../../.qa');fs.mkdirSync(qa,{recursive:true});
  await page.screenshot({path:path.join(qa,'bridge-feedback-error.png'),fullPage:true});
  await page.locator('#connection-feedback').screenshot({path:path.join(qa,'bridge-feedback-card.png')});
  assert.equal(await page.evaluate(()=>window.__sent.filter(m=>m.type==='send').length),0);
  await page.click('#retry');
  await page.evaluate(()=>{const op=window.__sent.filter(m=>['bind','ensure'].includes(m.type)).at(-1).operation;window.__reply({type:'bound',operation:op,provider:'ds',tabId:7,ready:true,counts:{input:1,send:1}});});
  await page.fill('#question','本地错误反馈测试');await page.click('#send');
  await page.evaluate(()=>{window.__reply({type:'started',id:'fixture',text:'本地错误反馈测试'});window.__reply({type:'update',id:'fixture',text:'',status:'同步超时；没有自动重发。',terminal:true,error:true});});
  assert.equal(await page.locator('#connection-feedback').getAttribute('role'),'alert');
  assert.equal(await page.locator('#status-title').textContent(),'回复同步中断');
  assert.equal(await page.evaluate(()=>window.__sent.filter(m=>m.type==='send').length),1,'no automatic resend');
  await page.click('#retry');
  await page.evaluate(()=>{const op=window.__sent.filter(m=>['bind','ensure'].includes(m.type)).at(-1).operation;window.__reply({type:'bound',operation:op,provider:'ds',tabId:7,ready:true,counts:{input:1,send:1}});});
  assert.equal(await page.locator('#connection-feedback').isVisible(),false,'successful connection banner collapses');
  await page.check('#include-code');assert(await page.locator('#send').isEnabled(),'learning controls must not invalidate connection');
  await page.locator('#learning-tools').evaluate(e=>e.open=true);await page.fill('#instruction','先解释，再给一个检查动作。');await page.fill('#question','我的问题正文');
  await page.click('#preview-prompt');assert.match(await page.locator('#prompt-preview').textContent(),/我的问题正文/);assert.match(await page.locator('#prompt-preview').textContent(),/先解释/);await page.click('#close-prompt');
  await page.click('#send');await page.evaluate(()=>{window.__reply({type:'started',id:'active',text:window.__sent.filter(m=>m.type==='send').at(-1).text});window.__reply({type:'reconnected',provider:'ds',ready:true,busy:true,interrupted:false});});
  assert.equal(await page.locator('#status-title').textContent(),'正在回复','reconnected generation is not a pending bind');
  assert.equal(await page.locator('#connection-feedback').isVisible(),false);
  assert(await page.locator('#preview-prompt').isVisible());assert(await page.locator('.context-options').isVisible());assert.match(await page.locator('.message.assistant').last().textContent(),/等待官网回复/);
  const editorPage=await browser.newPage();
  await editorPage.setContent('<rich-textarea><div class="ql-editor" contenteditable="true">input</div><div class="ql-clipboard" contenteditable="true">clipboard helper</div></rich-textarea>');
  await editorPage.addScriptTag({path:path.join(__dirname,'providers.js')});
  assert.equal(await editorPage.evaluate(()=>{for(const s of BRIDGE_PROVIDERS.gemini.input){const n=[...document.querySelectorAll(s)].filter(e=>e.getClientRects().length);if(n.length)return n.length;}return 0;}),1,'Gemini clipboard helper is not a second editor');
  await editorPage.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: visible 10→9→6 countdown, staged status, prominent error/retry, watchdog expiry, stale response rejection, streaming error, three widths; no real requests.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
