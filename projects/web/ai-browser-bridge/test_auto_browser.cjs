/* Isolated MV3 UI test. Routed fixtures only; no user profile or vendor traffic. */
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const qa=path.resolve(__dirname,'../../../.qa/auto-bridge');fs.mkdirSync(qa,{recursive:true});
const extension=fs.mkdtempSync(path.join(qa,'extension-'));
for(const f of ['manifest.json','providers.js','background.js','bridge.js','panel.html','panel.js','panel.css'])fs.copyFileSync(path.join(__dirname,f),path.join(extension,f));
const manifest=JSON.parse(fs.readFileSync(path.join(extension,'manifest.json')));manifest.host_permissions=manifest.optional_host_permissions;fs.writeFileSync(path.join(extension,'manifest.json'),JSON.stringify(manifest));
function fixture(kimi){return `<!doctype html><meta charset=utf-8><title>隔离扩展测试 · ${kimi?'Kimi':'Gemini'} DOM 夹具</title><h1>合成页面，非 AI 官网回复</h1>
${kimi?'<div id=ask class=chat-input-editor contenteditable=true style="min-height:50px"></div>':'<rich-textarea><div id=ask class=ql-editor contenteditable=true style="min-height:50px"></div><div class=ql-clipboard contenteditable=true>辅助输入</div></rich-textarea>'}
<button id=send class=send-button>发送</button><button id=stop class="send-button-container loading" aria-label="停止回答" hidden>停止</button>
<script>window.sends=0;document.querySelector('#send').onclick=()=>{window.sends++;window.lastSent=document.querySelector('#ask').innerText;document.querySelector('#ask').textContent='';document.querySelector('#stop').hidden=false;
const wrapper=document.createElement('${kimi?'div':'model-response'}');wrapper.className='segment-assistant';const body=document.createElement('div');body.className='markdown-container';const answer=document.createElement('div');answer.className='markdown';body.append(answer);wrapper.append(body);document.body.append(wrapper);
history.pushState({},'','${kimi?'/chat/auto-fixture':'/app/auto-fixture'}');setTimeout(()=>answer.textContent='夹具第一段',200);setTimeout(()=>answer.textContent='夹具完整回复 '+window.sends,1200);setTimeout(()=>document.querySelector('#stop').hidden=true,1700);};</script>`;}
(async()=>{const context=await chromium.launchPersistentContext(fs.mkdtempSync(path.join(qa,'profile-')),{channel:'msedge',headless:true,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});try{
await context.setOffline(true);
await context.route('https://**/*',r=>r.fulfill({contentType:'text/html',body:new URL(r.request().url()).hostname==='www.kimi.com'?fixture(true):new URL(r.request().url()).hostname==='gemini.google.com'?fixture(false):'<h1>课程布局测试夹具</h1>'}));
const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker'),id=new URL(worker.url()).host;
// Extension-created first navigations can precede Playwright target attachment.
// Open blank in the test copy, attach routing, then navigate; all egress is offline.
await worker.evaluate(()=>{const create=chrome.tabs.create.bind(chrome.tabs);chrome.tabs.create=async options=>{
 const tab=await create({url:'about:blank',active:options.active});
 for(let i=0;i<100;i++){const current=await chrome.tabs.get(tab.id);if(current.url?.startsWith(options.url))return current;await new Promise(r=>setTimeout(r,50));}
 throw Error('Fixture navigation was not installed');
};});
const panel=await context.newPage();const errors=[];panel.on('pageerror',e=>errors.push(e.message));await panel.goto(`chrome-extension://${id}/panel.html`);
const pages={};
for(const provider of ['kimi','gemini']){
 await panel.selectOption('#provider',provider);await panel.fill('#question',provider+' 首条问题');const created=context.waitForEvent('page');await panel.locator('#question').press('Enter');pages[provider]=await created.catch(async error=>{console.log('AUTO FAILURE',provider,await panel.locator('#status').textContent(),await panel.locator('#diagnostics').textContent());throw error;});await pages[provider].goto(provider==='kimi'?'https://www.kimi.com/':'https://gemini.google.com/app');
 await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('本轮同步结束'),null,{timeout:15000}).catch(async error=>{console.log('REPLY FAILURE',provider,await panel.locator('#status').textContent(),await panel.locator('#diagnostics').textContent(),await pages[provider].evaluate(()=>({sends:window.sends,body:document.body.innerText})),await worker.evaluate(()=>[...sessions.values()].map(s=>({tabId:s.tabId,provider:s.provider,request:s.request,ready:s.ready,connecting:s.connecting}))));throw error;});
 assert.equal(await pages[provider].evaluate(()=>window.sends),1);
 await panel.fill('#question',provider+' 第二轮');await panel.locator('#question').press('Enter');await panel.waitForFunction(round=>document.querySelector('.message.assistant:last-child pre')?.textContent==='夹具完整回复 '+round && !document.querySelector('#provider').disabled,2);
 assert.equal(await pages[provider].evaluate(()=>window.sends),2);
 assert.equal(await panel.locator('.message.user').count(),2);
}
for(const provider of ['kimi','gemini']){
 await panel.selectOption('#provider',provider);await panel.locator('#send:enabled').waitFor({timeout:8000});
 assert.equal(await panel.locator('.message.user').count(),2,'history restored before third round');
 await panel.fill('#question',provider+' 切换后第三轮');await panel.locator('#question').press('Enter');await panel.waitForFunction(round=>document.querySelector('.message.assistant:last-child pre')?.textContent==='夹具完整回复 '+round && !document.querySelector('#provider').disabled,3);
 assert.equal(await pages[provider].evaluate(()=>window.sends),3,'exactly three user prompts, no binding seed');
 assert.equal(await panel.locator('.message.user').count(),3);
 await panel.screenshot({path:path.join(qa,provider+'-three-rounds.png'),fullPage:true});
}
assert.equal(context.pages().filter(p=>/kimi\.com|gemini\.google\.com/.test(p.url())).length,2,'provider switch creates no duplicate tabs');assert.deepEqual(errors,[]);
console.log('PASS: default Kimi/Gemini MV3 UI creates first conversation, relays two rounds, restores after switch, relays third round; no manual bind or seed prompt (fixtures only).');
}finally{await context.close();}})().catch(e=>{console.error(e);process.exitCode=1});
