(() => {
  const $=s=>document.querySelector(s);
  let port=chrome.runtime.connect({name:'workbook'}), ready=false, busy=false, request=null, answer=null, binding=null;
  const records=[];
  const status=text=>$('#status').textContent=text;
  function state() {
    $('#send').disabled=!ready||busy;
    $('#cancel').disabled=!busy;
    for(const id of ['provider','tabs','bind','refresh','open']) $('#'+id).disabled=busy;
  }
  function post(m) { try{port.postMessage(m);}catch{ready=false;busy=false;state();status('扩展连接已断开，请导出记录后刷新工作台。');} }
  const heartbeat=setInterval(()=>post({type:'ping'}),20000);
  function append(role,text) {
    $('.empty')?.remove();
    const item=document.createElement('article');item.className='message '+role;
    const label=document.createElement('strong');label.textContent=role==='user'?'你':`${BRIDGE_PROVIDERS[binding?.provider || $('#provider').value].name} · 官网同步`;
    const pre=document.createElement('pre');pre.textContent=text;
    item.append(label,pre);$('#messages').append(item);
    const record={role,text,provider:binding?.provider,tabId:binding?.tabId,time:new Date().toISOString()};records.push(record);
    return {pre,record};
  }
  Object.entries(BRIDGE_PROVIDERS).forEach(([id,p])=>$('#provider').add(new Option(p.name,id)));
  $('#provider').addEventListener('change',()=>{
    ready=false;binding=null;state();$('#tabs').replaceChildren(new Option('请重新授权并查找',''));
    for(const key of ['input','send','answer','stop']) $('#selector-'+key).value='';
    status('服务已切换，请重新绑定。');
  });
  $('#tabs').addEventListener('change',()=>{ready=false;state();status('标签页已改变，请重新绑定。');});
  for(const input of document.querySelectorAll('details input')) input.addEventListener('input',()=>{ready=false;state();});
  $('#open').addEventListener('click',()=>chrome.tabs.create({url:BRIDGE_PROVIDERS[$('#provider').value].url}));
  $('#refresh').addEventListener('click',async()=>{
    try {
      const provider=$('#provider').value;
      const granted=await chrome.permissions.request({origins:BRIDGE_PROVIDERS[provider].hosts.map(h=>'https://'+h+'/*')});
      if(!granted) {status('没有授予官网访问权限，未连接。');return;}
      post({type:'list',provider});
    }catch(error){status(error.message);}
  });
  $('#bind').addEventListener('click',()=>{
    ready=false;state();
    if(!$('#tabs').value){status('先选择一个官网标签页。');return;}
    const overrides=Object.fromEntries(['input','send','answer','stop'].map(k=>[k,$('#selector-'+k).value]));
    status('正在检查官网元素…');post({type:'bind',tabId:Number($('#tabs').value),provider:$('#provider').value,overrides});
  });
  $('#focus').addEventListener('click',()=>post({type:'focus'}));
  $('#compose').addEventListener('submit',event=>{
    event.preventDefault();if(!ready||busy||!$('#question').value.trim())return;
    busy=true;state();post({type:'send',text:$('#question').value.trim()});
  });
  $('#cancel').addEventListener('click',()=>post({type:'cancel'}));
  $('#toggle').addEventListener('click',()=>{
    const closed=$('#workspace').classList.toggle('closed');$('#toggle').textContent=closed?'打开助教':'收起助教';$('#toggle').setAttribute('aria-expanded',String(!closed));
  });
  $('#course-source').addEventListener('change',()=>{$('#course').src=$('#course-source').value+'?bridge=1#/web';});
  $('#export').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify({format:'workbook-bridge-v1',records},null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='官网对话记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  port.onDisconnect.addListener(()=>{clearInterval(heartbeat);ready=false;busy=false;state();status('扩展连接已断开，不会重发消息。请导出记录后刷新，再核对官网。');});
  port.onMessage.addListener(m=>{
    if(m.type==='tabs' && m.provider===$('#provider').value){
      ready=false;state();$('#tabs').replaceChildren(new Option(m.tabs.length?'请选择官网对话':'没有找到，请先打开官网登录',''));
      for(const t of m.tabs) $('#tabs').add(new Option(`${t.title} · ${t.id}`,String(t.id)));
      status(`找到 ${m.tabs.length} 个官网标签页。选择新对话后绑定。`);
    }else if(m.type==='bound'){
      if(m.provider!==$('#provider').value || m.tabId!==Number($('#tabs').value))return;
      binding={provider:m.provider,tabId:m.tabId};ready=m.ready;state();
      $('#connection-summary').textContent=BRIDGE_PROVIDERS[m.provider].name+(m.ready?' · 已绑定标签页 / 更改':' · 需要校准');
      if(m.ready) $('.connection').open=false;
      $('#diagnostics').textContent=JSON.stringify(m.counts,null,2);
      status(m.ready?'输入和发送元素已找到；回复读取仍待真实发送验证。':'元素未匹配或不唯一。请检查登录状态，或填写校准选择器。');
    }else if(m.type==='started'){
      request=m.id;append('user',m.text);answer=append('assistant','');$('#question').value='';
    }else if(m.type==='update' && m.id===request){
      if(answer){const scroll=$('#messages');const atEnd=scroll.scrollHeight-scroll.scrollTop-scroll.clientHeight<60;answer.pre.textContent=m.text;answer.record.text=m.text;answer.record.status=m.status;if(atEnd)scroll.scrollTop=scroll.scrollHeight;}
      status(m.status);if(m.terminal){busy=false;state();}
    }else if(['error','ended','invalidated'].includes(m.type)){
      status(m.message||m.reason);busy=false;if(m.type!=='ended')ready=false;state();
      if(answer)answer.record.status=m.message||m.reason;
    }
  });
})();
