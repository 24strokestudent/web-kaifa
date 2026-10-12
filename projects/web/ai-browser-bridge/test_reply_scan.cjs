/* Exercise real reply observer with a fixed-size assistant list. Synthetic DOM only. */
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  for(const mode of ['replaced','empty']){
  const count=mode==='empty'?4:3;
  const page=await browser.newPage();await page.route('https://chat.deepseek.com/**',r=>r.fulfill({contentType:'text/html; charset=utf-8',body:`<textarea id=chat-input></textarea><button aria-label="Send message" id=send>send</button><button aria-label="Stop generating" id=stop hidden>stop</button><div class=ds-assistant-message-main-content>old one</div><div class=ds-assistant-message-main-content>old two</div><div class=ds-assistant-message-main-content>old three</div>${mode==='empty'?'<div class=ds-assistant-message-main-content id=slot></div>':''}<script>window.sends=0;send.onclick=()=>{sends++;document.querySelector('#chat-input').value='';document.querySelector('#stop').hidden=false;let answer=document.querySelector('#slot');if(!answer){answer=document.createElement('div');answer.className='ds-assistant-message-main-content';document.body.append(answer);document.querySelector('.ds-assistant-message-main-content').remove();}setTimeout(()=>answer.textContent='新回复第一段（测试夹具）',300);setTimeout(()=>{answer.textContent='新回复第一段与第二段（测试夹具）';document.querySelector('#stop').hidden=true;},1600);};</script>`}));
  await page.goto('https://chat.deepseek.com/');await page.clock.install();
  await page.evaluate(()=>{window.updates=[];window.chrome={runtime:{getManifest:()=>({version:'test'}),sendMessage:async m=>updates.push(m),onMessage:{addListener:f=>window.receive=f,removeListener(){}}}};});
  await page.addScriptTag({path:path.join(__dirname,'providers.js')});await page.addScriptTag({path:process.env.BRIDGE_REPLY_SOURCE || path.join(__dirname,'bridge.js')});
  const inspect=await page.evaluate(()=>new Promise(resolve=>receive({type:'workbook:inspect',provider:'ds'},null,resolve)));
  await page.evaluate(token=>{window.sent=new Promise(resolve=>receive({type:'workbook:send',id:'round',text:'测试问题',bindingToken:token},null,resolve));},inspect.bindingToken);
  await page.clock.fastForward(1000);
  await page.clock.fastForward(700);
  assert.match(await page.locator('.ds-assistant-message-main-content').last().textContent(),/新回复第一段/,'fixture actually produced a new reply');
  assert.equal(await page.evaluate(()=>sends),1);
  assert.equal(await page.locator('.ds-assistant-message-main-content').count(),count);
  assert.match(await page.evaluate(()=>updates.map(m=>m.text).join('\n')),/新回复第一段/,'a new assistant node must stream even when an old node is removed');
  await page.clock.fastForward(4000);
  await page.clock.fastForward(2100);
  assert.equal(await page.evaluate(()=>updates.at(-1).terminal),true);
  assert.doesNotMatch(await page.evaluate(()=>updates.map(m=>m.text).join('\n')),/old one|old two|old three/);
  const snapshot=await page.evaluate(()=>new Promise(resolve=>receive({type:'workbook:scan'},null,resolve)));
  assert.equal(snapshot.lastUpdate.terminal,true);assert.equal(snapshot.lastUpdate.id,'round');assert.equal(snapshot.counts.answer,count);assert.equal(await page.evaluate(()=>sends),1,'read-only scan must not resend');
  await page.close();
  console.log('PASS: '+mode+' reply list streams and completes without importing history or resending. Synthetic DOM only.');
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
