/* UI running new disk files with a legacy background that does not answer build messages. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.fulfill({body:'offline'}));
  await page.addInitScript(()=>{window.reloads=0;const port={postMessage(){},onMessage:{addListener(){}},onDisconnect:{addListener(){}}};window.chrome={runtime:{getManifest:()=>({version:'0.2.0'}),connect:()=>port,reload:()=>reloads++},permissions:{request:async()=>true}};});
  await page.goto(pathToFileURL(path.join(__dirname,'panel.html')).href);await page.locator('#build-warning').waitFor();assert.match(await page.locator('#build-message').textContent(),/后台未回应/);assert.doesNotMatch(await page.locator('#extension-version').textContent(),/每 10 秒/);
  await page.fill('#question','需要保留的草稿');await page.click('#reload-extension');assert.equal(await page.evaluate(()=>reloads),1);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('workbook-bridge-conversations-v1')).sessions.gpt.draft),'需要保留的草稿');
  assert.equal(await page.locator('#reload-extension').isDisabled(),true,'one click while reload in progress');
  await page.evaluate(()=>localStorage.setItem('workbook-bridge-conversations-v1','{broken'));await page.reload();await page.locator('#build-warning').waitFor();await page.fill('#question','未能安全保存的草稿');await page.click('#reload-extension');assert.equal(await page.evaluate(()=>reloads),0,'do not reload away unsaved/corrupt records');assert.equal(await page.evaluate(()=>localStorage.getItem('workbook-bridge-conversations-v1')),'{broken');assert.match(await page.locator('#status').textContent(),/未重载/);assert.equal(await page.inputValue('#question'),'未能安全保存的草稿');
  assert.deepEqual(errors,[]);console.log('PASS: legacy worker no handshake exposes mixed versions, no false scan claim; explicit reload saves draft once, corrupt storage prevents data loss. UI mocks only.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
