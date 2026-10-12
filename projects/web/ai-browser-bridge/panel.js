(() => {
  const $=s=>document.querySelector(s);
  let port=chrome.runtime.connect({name:'workbook'}), ready=false, busy=false, request=null, answer=null, binding=null;
  const records=[];
  let checking=false,bindTimer=null,bindOperation=null,countdownTimer=null;
  function checked(){checking=false;clearTimeout(bindTimer);clearInterval(countdownTimer);bindTimer=null;countdownTimer=null;$('#countdown').hidden=true;$('#connection-progress').hidden=true;}
  function status(text,kind='info') {
    $('#status').textContent=text;
    $('#connection-feedback').dataset.kind=kind;
    $('#connection-feedback').setAttribute('role',kind==='error'?'alert':'status');
    $('#connection-feedback').setAttribute('aria-live',kind==='error'?'assertive':'polite');
    $('#status-title').textContent=({info:'当前状态',pending:'正在连接',error:busy?'回复同步中断':'连接未完成',ready:'可以发送问题'})[kind];
    $('#recovery').hidden=kind!=='error';
  }
  function state() {
    $('#send').disabled=!ready||busy;
    $('#cancel').disabled=!busy;
    for(const id of ['provider','tabs','bind','refresh','open']) $('#'+id).disabled=busy||checking;
  }
  function post(m) { try{port.postMessage(m);}catch{checked();ready=false;busy=false;state();status('扩展连接已断开，请导出记录后刷新工作台。','error');} }
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
      if(!granted) {status('没有授予官网访问权限，未连接。请点击“授权并查找标签页”授予权限。','error');return;}
      post({type:'list',provider});
    }catch(error){status(error.message,'error');}
  });
  $('#bind').addEventListener('click',()=>{
    ready=false;state();
    if(!$('#tabs').value){status('先选择一个官网标签页。','error');return;}
    const overrides=Object.fromEntries(['input','send','answer','stop'].map(k=>[k,$('#selector-'+k).value]));
    checking=true;bindOperation=crypto.randomUUID();state();
    bindTimer=setTimeout(()=>{checked();bindOperation=null;ready=false;state();status('连接检查超时，没有发送消息。请打开所选官网确认页面可操作，再重新检查连接。','error');},10000);
    const started=Date.now();
    const tick=()=>{const elapsed=Math.min(10,(Date.now()-started)/1000);$('#countdown').textContent=`剩余 ${Math.ceil(10-elapsed)} 秒`;$('#connection-progress').value=elapsed;};
    $('#countdown').hidden=false;$('#connection-progress').hidden=false;tick();countdownTimer=setInterval(tick,250);
    status('正在检查官网元素…','pending');post({type:'bind',operation:bindOperation,tabId:Number($('#tabs').value),provider:$('#provider').value,overrides});
  });
  $('#retry').addEventListener('click',()=>$('#bind').click());
  $('#focus-selected').addEventListener('click',async()=>{
    if(!$('#tabs').value){status('请先选择官网标签页。','error');return;}
    try{const t=await chrome.tabs.update(Number($('#tabs').value),{active:true});await chrome.windows.update(t.windowId,{focused:true});}catch(error){status('所选标签页已不可用，请重新查找。','error');}
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
  port.onDisconnect.addListener(()=>{checked();clearInterval(heartbeat);ready=false;busy=false;state();status('扩展连接已断开，不会重发消息。请导出记录后刷新，再核对官网。','error');});
  port.onMessage.addListener(m=>{
    if(m.trace && m.operation===bindOperation) $('#diagnostics').textContent=JSON.stringify(m.trace,null,2);
    if(m.type==='stage' && m.operation===bindOperation && checking){
      status(m.message,'pending');
    }else if(m.type==='tabs' && m.provider===$('#provider').value){
      ready=false;state();$('#tabs').replaceChildren(new Option(m.tabs.length?'请选择官网对话':'没有找到，请先打开官网登录',''));
      for(const t of m.tabs) $('#tabs').add(new Option(`${t.title} · ${t.id}`,String(t.id)));
      status(`找到 ${m.tabs.length} 个官网标签页。选择新对话后绑定。`);
    }else if(m.type==='bound'){
      if(m.operation!==bindOperation)return;
      checked();
      if(m.provider!==$('#provider').value || m.tabId!==Number($('#tabs').value))return;
      binding={provider:m.provider,tabId:m.tabId};ready=m.ready;state();
      $('#connection-summary').textContent=BRIDGE_PROVIDERS[m.provider].name+(m.ready?' · 已绑定标签页 / 更改':' · 需要校准');
      if(m.ready) $('.connection').open=false;
      $('#diagnostics').textContent+='\n元素匹配：'+JSON.stringify(m.counts,null,2);
      status(m.ready?'输入框已找到；发送时会再次检查按钮，回复同步仍待真实验证。':`元素未匹配或不唯一（输入框 ${m.counts.input}，发送按钮 ${m.counts.send}）。请检查登录或展开适配诊断。`,m.ready?'ready':'error');
    }else if(m.type==='started'){
      request=m.id;append('user',m.text);answer=append('assistant','');$('#question').value='';
    }else if(m.type==='update' && m.id===request){
      if(answer){const scroll=$('#messages');const atEnd=scroll.scrollHeight-scroll.scrollTop-scroll.clientHeight<60;answer.pre.textContent=m.text;answer.record.text=m.text;answer.record.status=m.status;if(atEnd)scroll.scrollTop=scroll.scrollHeight;}
      status(m.status,m.error?'error':'info');if(m.terminal){busy=false;state();}
    }else if(['error','ended','invalidated'].includes(m.type)){
      if(m.operation && m.operation!==bindOperation)return;
      checked();
      status(m.message||m.reason,m.type==='ended'?'info':'error');busy=false;if(m.type!=='ended')ready=false;state();
      if(answer)answer.record.status=m.message||m.reason;
    }
  });
})();
