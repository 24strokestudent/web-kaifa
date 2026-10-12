/* Real MV3 extension in an isolated Edge profile, with local DOM fixtures at routed URLs.
   No vendor requests, user account, or membership generation is exercised by this test. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'../../..');
const qa=path.join(root,'.qa/bridge');fs.mkdirSync(qa,{recursive:true});
const extension=fs.mkdtempSync(path.join(qa,'extension-'));
for(const f of ['manifest.json','providers.js','background.js','bridge.js','panel.html','panel.js','panel.css','theme.css','workbook-sites.js','site-bridge.js','panel-mode.js'])fs.copyFileSync(path.join(__dirname,f),path.join(extension,f));
const manifest=JSON.parse(fs.readFileSync(path.join(extension,'manifest.json')));
// Only the test copy pregrants hosts, to avoid automating the browser's permission prompt.
manifest.host_permissions=manifest.optional_host_permissions;
fs.writeFileSync(path.join(extension,'manifest.json'),JSON.stringify(manifest));
const sandbox={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'providers.js'),'utf8'),sandbox);
const fixture=`<!doctype html><meta charset="utf-8"><title>DOM 测试夹具 · 非官网回复</title>
<textarea id="ask"></textarea><button id="send">发送</button><button id="stop" hidden>停止</button><div class="assistant">旧消息绝不能被导入</div>
<script>
window.sends=0;
document.querySelector('#send').onclick=()=>{
 window.sends++;const input=document.querySelector('#ask');window.lastSent=input.value??input.innerText;if('value' in input)input.value='';else input.textContent='';
 const stop=document.querySelector('#stop');stop.hidden=false;
 const answer=document.createElement('div');answer.className='assistant ds-assistant-message-main-content';if(document.body.dataset.doubao){const wrap=document.createElement('div');wrap.dataset.testid='receive_message';answer.dataset.testid='message_text_content';answer.dataset.streaming='true';wrap.append(answer);document.body.append(wrap);}else document.body.append(answer);
 setTimeout(()=>answer.textContent='夹具第一段',200);
 setTimeout(()=>answer.textContent='夹具第一段，第二段 <img src=x onerror=alert(1)>',2200);
 setTimeout(()=>{stop.hidden=true;answer.dataset.streaming='false';},3000);
};
</script>`;
(async()=>{
  const context=await chromium.launchPersistentContext(fs.mkdtempSync(path.join(qa,'profile-')),{channel:'msedge',headless:true,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});
  try{
    await context.route('https://**/*',route=>route.fulfill({contentType:'text/html',body:fixture}));
    await context.route('https://zhouwu97.github.io/web-kaifa/**',async route=>{
      if(process.env.BRIDGE_COURSE_URL){
        const url=new URL(route.request().url());
        const local=process.env.BRIDGE_COURSE_URL+url.pathname.replace('/web-kaifa/','')+url.search;
        await route.fulfill({response:await route.fetch({url:local})});
      }else await route.fulfill({contentType:'text/html',body:'<!doctype html><meta charset="utf-8"><h1>课程布局测试夹具</h1><p>该页面仅供自动化验证，非官网回复。</p>'});
    });
    const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
    const id=new URL(worker.url()).host;
    const panel=await context.newPage();const errors=[];panel.on('pageerror',e=>errors.push(e.message));
    await panel.goto(`chrome-extension://${id}/panel.html`);
    await panel.locator('.connection').evaluate(e=>e.open=true);await panel.locator('.connection details summary').click();
    for(const [key,p] of Object.entries(process.env.BRIDGE_MODERN_ONLY?{}:sandbox.BRIDGE_PROVIDERS)){
      if(process.env.BRIDGE_PROVIDERS && !process.env.BRIDGE_PROVIDERS.split(',').includes(key))continue;
      const official=await context.newPage();await official.goto(p.url);
      if(key==='ds') await official.evaluate(()=>{
        document.querySelector('#ask').placeholder='给 DeepSeek 发送消息 ';
        const send=document.querySelector('#send');send.setAttribute('role','button');send.className='ds-button--primary ds-button--circle ds-button--disabled';
        send.innerHTML='<svg><path d="M8.3125 0.980206C8.66767 1.05312"></path></svg>';
        document.querySelector('#ask').addEventListener('input',()=>send.classList.remove('ds-button--disabled'));
        document.querySelector('#stop').setAttribute('role','button');document.querySelector('#stop').setAttribute('aria-label','停止生成');
        document.querySelector('.assistant').classList.add('ds-assistant-message-main-content');
        const thinking=document.createElement('div');thinking.className='ds-markdown ds-think-content';thinking.textContent='思考区不能作为最终正文';document.body.append(thinking);
      });
      if(key==='doubao')await official.evaluate(()=>{
        document.body.dataset.doubao='1';
        document.querySelector('#ask').outerHTML='<div id="ask" class="tiptap ProseMirror" contenteditable="true" style="min-height:40px"></div>';
        document.querySelector('#send').dataset.testid='chat_input_send_button';
        const old=document.querySelector('.assistant'),wrap=document.createElement('div');wrap.dataset.testid='receive_message';old.dataset.testid='message_text_content';old.replaceWith(wrap);wrap.append(old);
      });
      if(['kimi','gemini'].includes(key))await official.evaluate(key=>{
        document.querySelector('#ask').outerHTML='<div id="ask" contenteditable="true" class="'+(key==='kimi'?'chat-input-editor':'ql-editor')+'" style="min-height:40px"></div>';
        const input=document.querySelector('#ask'),button=document.querySelector('#send'),stop=document.querySelector('#stop');
        if(key==='gemini'){
          const rich=document.createElement('rich-textarea');input.replaceWith(rich);rich.append(input);
          const helper=document.createElement('div');helper.contentEditable='true';helper.className='ql-clipboard';helper.textContent='辅助编辑区域';rich.append(helper);
          button.className='send-button';stop.setAttribute('aria-label','停止回答');
        }else{
          button.className='send-button';stop.className='send-button-container loading';
        }
        function wrap(answer){
          answer.classList.add('markdown');
          const container=document.createElement(key==='gemini'?'model-response':'div');
          if(key==='kimi'){
            container.className='segment-assistant';
            const thought=document.createElement('div');thought.className='markdown-container toolcall-content-text';thought.innerHTML='<div class="markdown">思考区不能作为正文</div>';container.append(thought);
            const body=document.createElement('div');body.className='markdown-container';container.append(body);answer.replaceWith(container);body.append(answer);
          }else{answer.replaceWith(container);container.append(answer);}
        }
        wrap(document.querySelector('.assistant'));
        const original=button.onclick;button.onclick=()=>{
          original();wrap([...document.querySelectorAll('.assistant')].at(-1));
          history.pushState({},'',key==='kimi'?'/chat/fixture-new-session':'/app/fixture-session');
        };
      },key);
      await panel.locator('.connection').evaluate(el=>el.open=true);
      await panel.selectOption('#provider',key);await panel.locator('.connection').evaluate(el=>el.open=true);
      await panel.click('#refresh');
      await panel.waitForFunction(()=>document.querySelector('#tabs').options.length>1);
      await panel.selectOption('#tabs',await panel.locator('#tabs option').nth(1).getAttribute('value'));
      for(const [field,selector] of Object.entries({input:'#ask',send:'#send',answer:'.assistant',stop:'#stop'}))await panel.fill('#selector-'+field,['ds','doubao','kimi','gemini'].includes(key)?'':selector);
      await panel.click('#bind');await panel.locator('#send:enabled').waitFor({timeout:8000});
      await panel.fill('#question',`${p.name} 桥接验收（夹具）`);await panel.click('#send');
      await panel.waitForFunction(()=>document.querySelector('.message.assistant:last-child pre')?.textContent==='夹具第一段',null,{timeout:8000}).catch(async error=>{
        console.log('DEBUG',await panel.locator('#status').textContent(),await official.evaluate(()=>({sends:window.sends,body:document.body.innerText})));throw error;
      });
      await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('本轮同步结束'));
      assert((await panel.locator('.message.assistant').last().textContent()).includes('第二段'));
      assert.equal(await panel.locator('.messages img').count(),0,'remote text must never become HTML');
      assert(!(await panel.locator('#messages').textContent()).includes('旧消息绝不能'));
      assert(!(await panel.locator('#messages').textContent()).includes('思考区不能作为正文'));
      assert.equal(await official.evaluate(()=>window.sends),1);
      assert.equal(await official.evaluate(()=>window.lastSent),`${p.name} 桥接验收（夹具）`);
      // Existing official drafts are protected, with no second click on send.
      await official.fill('#ask','我的官网草稿');await panel.fill('#question','不能覆盖');await panel.click('#send');
      await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('已有草稿'));
      assert.equal(await official.locator('#ask').evaluate(e=>e.value??e.innerText),'我的官网草稿');
      assert.equal(await official.evaluate(()=>window.sends),1);
      if(['kimi','gemini'].includes(key)){
        await official.fill('#ask','');
        await panel.fill('#question','第二轮连续对话');await panel.click('#retry');await panel.locator('#send:enabled').waitFor();
        await panel.locator('#question').press('Enter');await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('本轮同步结束'));
        assert.equal(await official.evaluate(()=>window.sends),2);
        const text=await panel.locator('#messages').textContent();
        await panel.selectOption('#provider','claude');await panel.selectOption('#provider',key);await panel.locator('.connection').evaluate(el=>el.open=true);await panel.locator('#send:enabled').waitFor({timeout:8000});
        assert.equal(await panel.locator('#messages').textContent(),text,'switch retains both rounds');
        await panel.fill('#question','切回来第三轮');await panel.locator('#question').press('Enter');await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('本轮同步结束'));
        assert.equal(await official.evaluate(()=>window.sends),3,'no prompt sent merely for binding');
      }
      await official.close();
      console.log(`PASS ${p.name}: MV3 route, ${['ds','doubao','kimi','gemini'].includes(key)?'default adapter':'explicit calibration'}, incremental DOM relay, old history exclusion, draft protection (fixture only)`);
    }
    if(!process.env.BRIDGE_MODERN_ONLY){
      const discover=await context.newPage();await discover.goto('https://www.doubao.com/chat/bot/discover');
      await panel.locator('.connection').evaluate(el=>el.open=true);await panel.selectOption('#provider','doubao');await panel.locator('.connection').evaluate(el=>el.open=true);
      await panel.click('#refresh');await panel.waitForFunction(()=>document.querySelector('#tabs').options.length>1);
      await panel.selectOption('#tabs',await panel.locator('#tabs option').nth(1).getAttribute('value'));await panel.click('#bind');
      await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('不是对话页'));
      assert(await panel.locator('#send').isDisabled());await discover.close();
    }
    for(const width of [375,768,1024,1440]){
      await panel.setViewportSize({width,height:900});
      assert(await panel.evaluate(()=>{
        const a=document.querySelector('aside').getBoundingClientRect(),b=document.querySelector('.course').getBoundingClientRect();
        return document.documentElement.scrollWidth<=innerWidth+1 && (innerWidth>760?b.right<=a.left+1:b.bottom<=a.top+1);
      }),'split layout '+width);
      await panel.click('#toggle');assert.equal(await panel.locator('aside').isVisible(),false);await panel.click('#toggle');
    }
    // A contenteditable editor, cancellation, and navigation use real extension messages too.
    const official=await context.newPage();await official.goto('https://chatgpt.com/');
    await official.evaluate(()=>{
      document.querySelector('#ask').outerHTML='<div data-composer-markdown contenteditable="true" role="textbox" aria-label="询问 ChatGPT" style="min-height:40px"> </div>';
      document.querySelector('#send').setAttribute('aria-label','发送');
      document.querySelector('#send').hidden=true;
      document.querySelector('[data-composer-markdown]').addEventListener('input',()=>document.querySelector('#send').hidden=false);
      document.querySelector('.assistant').dataset.markdownTextStyle='assistant-message';
      document.querySelector('#stop').setAttribute('aria-label','停止');
      document.querySelector('#send').onclick=()=>{
        window.sends++;window.lastSent=document.querySelector('[data-composer-markdown]').innerText;
        document.querySelector('[data-composer-markdown]').textContent='';
        const a=document.createElement('div');a.dataset.markdownTextStyle='assistant-message';document.body.append(a);
        document.querySelector('#stop').hidden=false;
        setTimeout(()=>a.textContent='真实浏览器里的富文本夹具',500);
      };
    });
    await panel.locator('.connection').evaluate(el=>el.open=true);
    await panel.selectOption('#provider','gpt');await panel.locator('.connection').evaluate(el=>el.open=true);await panel.click('#refresh');
    await panel.waitForFunction(()=>document.querySelector('#tabs').options.length>1);
    await panel.selectOption('#tabs',await panel.locator('#tabs option').nth(1).getAttribute('value'));
    for(const key of ['input','send','answer','stop'])await panel.fill('#selector-'+key,'');
    await panel.click('#bind');await panel.locator('#send:enabled').waitFor({timeout:8000});
    await panel.fill('#question','富文本编辑验证');await panel.click('#send');
    await panel.waitForFunction(()=>document.querySelector('.message.assistant:last-child pre')?.textContent.includes('富文本夹具'));
    assert.equal(await official.evaluate(()=>window.lastSent),'富文本编辑验证');
    await panel.click('#cancel');await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('已停止同步'));
    const lastText=await panel.locator('.message.assistant').last().textContent();
    await official.evaluate(()=>document.querySelector('[data-markdown-text-style="assistant-message"]:last-child').textContent='停止后不应同步');
    await panel.waitForTimeout(1000);assert.equal(await panel.locator('.message.assistant').last().textContent(),lastText);
    await official.route('https://chatgpt.com/',route=>route.fulfill({contentType:'text/html',body:'<textarea id=prompt-textarea></textarea><button data-testid=send-button>Send</button>'}));
    await official.reload();await panel.waitForFunction(()=>document.querySelector('#status').textContent.includes('连接已自动恢复'));
    assert(await panel.locator('#send').isEnabled());await official.close();
    await panel.locator('.connection').evaluate(el=>el.open=false);
    await panel.screenshot({path:path.join(qa,'fixture-workspace.png'),fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('PASS: '+(process.env.BRIDGE_MODERN_ONLY?'modern GPT fixture':process.env.BRIDGE_PROVIDERS?'selected provider fixtures':'7 provider fixtures')+'; rich text input, deferred send button, cancellation, automatic navigation recovery; split layout at 4 widths. NOT a live provider acceptance.');
  }finally{await context.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
