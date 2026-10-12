const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 await page.screenshot({path:path.join(__dirname,'preview-desktop.png'),fullPage:true});
 await page.locator('#start').click();
 assert.equal(await page.locator('#preview').getAttribute('sandbox'),'allow-scripts');
 await page.locator('#code').fill('<h1 id="proof">手动运行成功</h1>');
 assert.equal(await page.locator('#preview').getAttribute('srcdoc'),null);
 await page.locator('#run').click();
 assert.equal(await page.frameLocator('#preview').locator('#proof').textContent(),'手动运行成功');
 await page.locator('#ask-code').click();
 await page.locator('#prompt-form button').click();
 assert((await page.locator('#prompt-output').textContent()).includes('id="proof"'));
 await page.locator('#stream-demo').click();
 await page.waitForFunction(()=>document.querySelector('#stream-text').textContent.length>5);
 await page.locator('#stop-stream').click();
 const partial=await page.locator('#stream-text').textContent();
 await page.waitForTimeout(150);
 assert.equal(await page.locator('#stream-text').textContent(),partial);
 await page.locator('#choose-model').click();
 await page.locator('[data-provider="DeepSeek"]').click();
 await page.locator('#connect').click();
 assert.equal(await page.locator('#connection').evaluate(d=>d.open),true);
 await page.locator('#return-workspace').click();
 assert.equal(await page.locator('#provider-name').textContent(),'DeepSeek');
 await page.locator('[data-track="go"]').click();
 await page.locator('[data-tab="code"]').click();
 assert.equal(await page.locator('#run').isVisible(),false);
 assert.equal(await page.locator('#include-code').isChecked(),false);
 assert.equal(await page.locator('#result').isVisible(),false);
 await page.locator('[data-track="web"]').click();
 await page.locator('[data-tab="code"]').click();
 assert((await page.locator('#code').inputValue()).includes('id="proof"'));
 assert.equal(await page.locator('#preview').getAttribute('srcdoc'),null);
 for(const width of [320,375,414,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.reload();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+width);
  if(width<=1150)await page.locator('#open-ai').click();
  assert(await page.evaluate(()=>document.querySelector('#assistant').getBoundingClientRect().right<=innerWidth+1),'panel overflow '+width);
  await page.locator('#choose-model').click();
  assert(await page.evaluate(()=>document.querySelector('#models').getBoundingClientRect().width<=innerWidth),'dialog overflow '+width);
  await page.keyboard.press('Escape');
  await page.locator('#close-ai').click();
  if(width===375)await page.screenshot({path:path.join(__dirname,'preview-mobile.png'),fullPage:true});
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: reference layout, sandbox, drafts, context, provider dialog, streaming stop; 5 widths; no JS errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
