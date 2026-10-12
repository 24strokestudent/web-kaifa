/* Isolated content script. No cookies, token extraction, fetch, or page-world code. */
(() => {
  if(globalThis.__workbookBridge) return;
  globalThis.__workbookBridge=true;
  let config, running, bindingToken, pending;
  const visible = el => !!el.getClientRects().length && getComputedStyle(el).visibility!=='hidden';
  function nodes(key) {
    for(const selector of config[key] || []) {
      const found=[...document.querySelectorAll(selector)].filter(visible);
      if(found.length) return found;
    }
    return [];
  }
  function one(key) {
    const matches=nodes(key);
    if(matches.length!==1) throw Error(`${key} 匹配 ${matches.length} 个元素，需要校准为唯一元素`);
    return matches[0];
  }
  const content = el => (el.value ?? el.innerText ?? '').trim();
  const enabled = el => !el.disabled && el.getAttribute('aria-disabled')!=='true';
  function cancel() {
    pending=null;
    if(running) { clearInterval(running.timer); running.observer.disconnect(); running=null; }
  }
  function emit(text,status,terminal=false) {
    if(!running) return;
    chrome.runtime.sendMessage({type:'update',id:running.id,text,status,terminal}).catch(cancel);
    if(terminal) cancel();
  }
  async function send(m) {
    if(running || pending) throw Error('官网正在同步另一条消息');
    if(!config) throw Error('尚未校准');
    if(m.bindingToken!==bindingToken) throw Error('校准已被另一个工作台修改，请重新绑定');
    if(nodes('stop').length) throw Error('官网正在生成，请稍后再试');
    const editor=one('input');
    if(!enabled(editor)) throw Error('输入框不可用，请在官网检查登录');
    if(content(editor)) throw Error('官网输入框已有草稿，未覆盖。请先在官网保存或清空。');
    one('send');
    pending=m.id;
    const before=nodes('answer');
    // Existing answer text is only held in this isolated script to avoid importing old history.
    const baseline=new Set(before.map(content));
    editor.focus();
    if(editor instanceof HTMLTextAreaElement || editor instanceof HTMLInputElement) {
      const proto=editor instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto,'value').set.call(editor,m.text);
      editor.dispatchEvent(new Event('input',{bubbles:true}));
    } else if(editor.isContentEditable) {
      const selection=getSelection(), range=document.createRange(); range.selectNodeContents(editor); selection.removeAllRanges(); selection.addRange(range);
      if(!document.execCommand('insertText',false,m.text)) throw Error('富文本输入失败，请在官网手动输入；没有发送');
      editor.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:m.text}));
    } else throw Error('选择的不是可编辑输入框');
    await new Promise(r=>setTimeout(r,250));
    if(pending!==m.id) throw Error('发送准备已取消；请在官网检查草稿');
    pending=null;
    if(content(editor)!==m.text.trim()) throw Error('官网输入内容与消息不一致，未点击发送，请检查草稿');
    const button=one('send');
    if(!enabled(button)) throw Error('官网发送按钮不可用，文字已留在官网草稿中，未发送');
    running={id:m.id,text:'',start:Date.now(),changed:Date.now(),seenStop:false,stableNotified:false};
    const tick=() => {
      if(!running) return;
      try {
        const stop=nodes('stop').length>0;
        running.seenStop ||= stop;
        const answers=nodes('answer');
        const latest=answers.at(-1);
        const text=latest?content(latest):'';
        // Fail closed: only a newly appended answer; never mistake old history for a response.
        if(answers.length>before.length && text && !baseline.has(text) && text!==m.text.trim() && text!==running.text) {
          running.text=text; running.changed=Date.now(); running.stableNotified=false;
          emit(text,'正在同步官网可见文字');
        }
        if(running.text && running.seenStop && !stop && Date.now()-running.changed>1800) {
          emit(running.text,'官网停止按钮已消失；本轮同步结束，请核对官网。',true); return;
        }
        if(running.text && !stop && Date.now()-running.changed>8000 && !running.stableNotified) {
          running.stableNotified=true; emit(running.text,'文字暂时稳定，未确认生成完成；可继续等待或停止同步。');
        }
        if(Date.now()-running.start>180000) emit(running.text,'同步超时，请到官网查看登录、额度或生成状态；没有自动重发。',true);
      } catch(error) { emit(running?.text||'',`页面结构变化：${error.message}`,true); }
    };
    running.observer=new MutationObserver(tick);
    running.observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['disabled','aria-disabled','aria-label']});
    running.timer=setInterval(tick,500);
    button.click();
    emit('','已点击官网发送按钮，等待可识别的新回复；不代表官网已接收。');
  }
  chrome.runtime.onMessage.addListener((m,_sender,reply) => {
    if(!['inspect','send','cancel'].includes(m.type)) return;
    (async()=>{
      if(m.type==='cancel') { if(!m.id || m.id===running?.id || m.id===pending) cancel(); return {ok:true}; }
      if(m.type==='send') { await send(m); return {ok:true}; }
      if(running || pending) throw Error('请先停止同步再校准');
      const p=BRIDGE_PROVIDERS[m.provider];
      if(!p || !p.hosts.includes(location.hostname) || location.protocol!=='https:') throw Error('不是所选服务官网');
      config={...p};
      for(const key of ['input','send','answer','stop']) {
        const selector=m.overrides?.[key]?.trim();
        if(selector) { if(selector.length>500) throw Error('选择器过长'); document.querySelector(selector); config[key]=[selector]; }
      }
      const inputs=nodes('input').length, sends=nodes('send').length;
      bindingToken=crypto.randomUUID();
      return {ok:true,bindingToken,ready:inputs===1 && sends===1,counts:{input:inputs,send:sends,answer:nodes('answer').length,stop:nodes('stop').length}};
    })().then(reply,error=>{if(m.type==='send')pending=null;reply({ok:false,error:error.message});});
    return true;
  });
})();
