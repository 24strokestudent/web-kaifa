(() => {
  const $=s=>document.querySelector(s);
  let port=chrome.runtime.connect({name:'workbook'}), ready=false, busy=false, request=null, answer=null, binding=null;
  let records=[],sendingQuestion='',replyStarted=0,lastReplyAt=0,portAlive=true,reconnectAttempts=0,reconnectTimer=null,interruptedPort=false;
  const defaultInstruction='请一次只指导一个可验证的步骤；先解释原因。没有实际运行的结果，不要声明课程已经完成。';
  const embed=globalThis.WORKBOOK_EMBED;
  if(embed){$('#course').remove();$('#close-embedded').hidden=false;}else $('#course').src=$('#course').dataset.src;
  let courseContext=null,courseNonce=embed?.channel || null;
  const STORAGE='workbook-bridge-conversations-v1';
  let saved={},activeProvider='gpt',saveBlocked=false,lastSavedRaw=null,officialURL='',newOfficialSession=false;
  let buildTimer=null,backendBuild=null;
  function validOfficialURL(value,provider=activeProvider){
    try{const u=new URL(value);return typeof value==='string' && value.length<=2000 && u.protocol==='https:' && !u.username && !u.password && BRIDGE_PROVIDERS[provider]?.hosts.includes(u.hostname)?u.href:'';}catch{return '';}
  }
  function rememberURL(value){const url=validOfficialURL(value);if(url){officialURL=url;const option=$('#tabs').selectedOptions[0];if(option)option.dataset.url=url;}}
  try { const raw=localStorage.getItem(STORAGE);lastSavedRaw=raw; if(raw){const data=JSON.parse(raw);if(data.version!==1 || !data.sessions || typeof data.sessions!=='object')throw Error('bad storage');for(const [key,v] of Object.entries(data.sessions)){if(!BRIDGE_PROVIDERS[key] || !v || !Array.isArray(v.records) || v.records.some(r=>!r || !['user','assistant'].includes(r.role) || typeof r.text!=='string') || !Array.isArray(v.options))throw Error('bad conversation');}saved=data.sessions;activeProvider=BRIDGE_PROVIDERS[data.active]?data.active:'gpt';} }
  catch {saveBlocked=true;}
  function remember(){
    saved[activeProvider]={records,draft:$('#question').value,tab:$('#tabs').value,url:officialURL,newOfficialSession,options:[...$('#tabs').options].map(o=>({value:o.value,text:o.text,url:o.dataset.url||''})),contextLessonId:courseContext?.lesson?.id,includeTask:$('#include-task').checked,includeCode:$('#include-code').checked,includeInstruction:$('#include-instruction').checked,instruction:$('#instruction').value,selectors:Object.fromEntries(['input','send','answer','stop'].map(k=>[k,$('#selector-'+k).value]))};
    if(saveBlocked){$('#save-state').textContent='本机历史异常，原记录已保留；当前对话请导出保存。';return false;}
    try {if(localStorage.getItem(STORAGE)!==lastSavedRaw){saveBlocked=true;$('#save-state').textContent='存档已被其他窗口修改，未覆盖；请导出本窗口对话。';return false;}const raw=JSON.stringify({version:1,active:activeProvider,sessions:saved});localStorage.setItem(STORAGE,raw);lastSavedRaw=raw;$('#save-state').textContent='对话与草稿已保存在本机。';return true;}
    catch {$('#save-state').textContent='本机保存失败，当前对话仍在；请及时导出。';return false;}
  }
  function restore(provider){
    activeProvider=provider;ready=false;binding=null;request=null;answer=null;newOfficialSession=false;
    const previous=saved[provider];records=previous?.records || [];officialURL=validOfficialURL(previous?.url,provider);newOfficialSession=previous?.newOfficialSession===true;
    $('#messages').replaceChildren();
    for(const record of records) renderRecord(record);
    showSessionNote();
    if(!records.length){const empty=document.createElement('p');empty.className='empty';empty.textContent='直接输入问题。首次发送会自动打开一段新对话；登录完成后在这里继续。';$('#messages').append(empty);}
    $('#messages').scrollTop=$('#messages').scrollHeight;
    $('#question').value=previous?.draft || '';
    $('#include-task').checked=previous?.includeTask!==false;$('#include-code').checked=previous?.includeCode===true && previous?.contextLessonId===courseContext?.lesson?.id;
    $('#include-instruction').checked=previous?.includeInstruction!==false;$('#instruction').value=typeof previous?.instruction==='string'?previous.instruction:defaultInstruction;refreshLearning();
    $('#tabs').replaceChildren(...(previous?.options||[{value:'',text:'先连接这个 AI'}]).map(o=>{const option=new Option(o.text,o.value);option.dataset.url=validOfficialURL(o.url,provider);return option;}));
    $('#tabs').value=previous?.tab || '';
    for(const key of ['input','send','answer','stop']) $('#selector-'+key).value=previous?.selectors?.[key] || '';
    $('#connection-summary').textContent=BRIDGE_PROVIDERS[provider].name+' · 连接设置';
    $('.connection').open=false;state();
    status(previous?.tab?'正在恢复原会话…':'直接输入问题，首次发送时自动新建对话。');
    if(previous?.tab || officialURL) beginConnection('ensure',false);
  }
  function renderRecord(record){
    const item=document.createElement('article');item.className='message '+record.role;
    if(record.newConversation){const note=document.createElement('p');note.className='session-note';note.textContent='新的官网对话 · 前面的本机记录没有重新发送给 AI。';item.append(note);}
    const label=document.createElement('strong');label.textContent=record.role==='user'?'你':BRIDGE_PROVIDERS[record.provider]?.name || 'AI';
    const pre=document.createElement('pre');pre.textContent=record.text;item.append(label,pre);
    if(record.role==='user' && (record.question || record.text.startsWith('课程：') && record.text.includes('\n\n我的问题：'))){
      pre.textContent=record.question || record.text.split('\n\n我的问题：')[1].split('\n\n请一次只指导')[0];
      const details=document.createElement('details'),summary=document.createElement('summary'),full=document.createElement('pre');summary.textContent='查看本次发送的学习内容';full.textContent=record.text;details.append(summary,full);item.append(details);
    }
    if(record.role==='assistant'){
      const pending=document.createElement('p');pending.className='reply-placeholder';pending.textContent=busy?'正在等待官网回复…':'未保存回复正文，请到官网核对。';item.append(pending);
    }
    $('#messages').append(item);return {pre,record};
  }
  function showSessionNote(){
    $('.new-session-note')?.remove();
    if(newOfficialSession && records.length){const note=document.createElement('p');note.className='session-note new-session-note';note.textContent='已打开新的官网对话。前面的本机记录保留，但 AI 不会自动读取这些记录。';$('#messages').append(note);}
  }
  function refreshLearning(){
    const lesson=courseContext?.lesson;
    $('#lesson-label').textContent=lesson?lesson.title:'自由提问 · 尚未选择课程';
    $('#include-task').disabled=$('#include-code').disabled=!lesson;
    $('#context-preview').textContent=learningContext() || '仅发送你填写的问题。';
    refreshPrompt();
  }
  function learningContext(){
    const lesson=courseContext?.lesson,parts=[];if(!lesson)return '';
    if($('#include-task').checked)parts.push(`课程：${lesson.title}`,`任务：${lesson.task}`,`验收：${lesson.checks.join('；')}`);
    if($('#include-code').checked)parts.push('我编辑的代码：',courseContext.code || '本课没有代码草稿。');
    return parts.join('\n');
  }
  function messageText(){
    const question=$('#question').value.trim(),context=learningContext();
    const instruction=$('#include-instruction').checked?$('#instruction').value.trim():'';
    const text=[context,context||instruction?'我的问题：'+question:question,instruction?'学习指导词：'+instruction:''].filter(Boolean).join('\n\n');
    if(text.length>12000)throw Error('问题与课程、代码合计超过 12000 字，请精简代码或取消带入代码；没有截断或发送。');
    return text;
  }
  function refreshPrompt(){
    try{$('#prompt-preview').textContent=messageText();$('#prompt-summary').textContent=[ $('#include-task').checked && courseContext?.lesson?'本课任务与验收':'不带课程', $('#include-code').checked && courseContext?.lesson?'包含代码':'不带代码', $('#include-instruction').checked?'包含学习指导词':'不带指导词' ].join(' · ');}
    catch(error){$('#prompt-preview').textContent=error.message;}
  }
  $('#preview-prompt').addEventListener('click',()=>{refreshPrompt();$('#prompt-dialog').showModal();});
  $('#close-prompt').addEventListener('click',()=>$('#prompt-dialog').close());
  $('#prompt-dialog').addEventListener('close',()=>$('#preview-prompt').focus());
  const courseWindow=()=>embed?parent:$('#course').contentWindow;
  const courseOrigin=()=>embed?embed.origin:new URL($('#course').src).origin;
  const sendHost=value=>{if(embed)parent.postMessage({...value,nonce:courseNonce},embed.origin);};
  function requestCourse(){
    courseContext=null;if(!embed)courseNonce=crypto.randomUUID();refreshLearning();
    courseWindow().postMessage({type:'workbook:course-request',nonce:courseNonce},courseOrigin());
  }
  if(!embed)$('#course').addEventListener('load',requestCourse);
  $('#close-embedded').addEventListener('click',()=>sendHost({type:'workbook:assistant-close'}));
  window.addEventListener('message',event=>{
    const m=event.data;
    if(event.source!==courseWindow() || event.origin!==courseOrigin() || !m || m.nonce!==courseNonce)return;
    if(m.type==='workbook:assistant-health-request'){
      let alive=portAlive,version='';try{version=chrome.runtime.getManifest().version;}catch{alive=false;}
      sendHost({type:'workbook:assistant-health',alive,version,ready,busy});return;
    }
    if(m.type==='workbook:assistant-provider' && BRIDGE_PROVIDERS[m.provider]){
      if(!busy && !checking){$('#provider').value=m.provider;$('#provider').dispatchEvent(new Event('change'));}return;
    }
    if(m.type==='workbook:assistant-draft' && typeof m.text==='string' && m.text.length<=12000){
      if(!$('#question').value.trim()){$('#question').value=m.text;remember();state();}return;
    }
    if(m.type==='workbook:course-context'){
      const lesson=m.lesson;
      if(lesson!==null && (!lesson || typeof lesson.id!=='string' || typeof lesson.title!=='string' || typeof lesson.task!=='string' || !Array.isArray(lesson.checks) || lesson.checks.some(x=>typeof x!=='string') || JSON.stringify(lesson).length>15000))return;
      if(typeof m.code!=='string' || m.code.length>60000)return;
      if(courseContext?.lesson?.id!==lesson?.id)$('#include-code').checked=false;
      courseContext={lesson,code:m.code};refreshLearning();
    }else if(m.type==='workbook:course-open'){
      $('#workspace').classList.remove('closed');$('#toggle').textContent='收起助教';$('#toggle').setAttribute('aria-expanded','true');
    }else if(m.type==='workbook:course-preset' && ['plan','hint','debug','review'].includes(m.mode)){
      seedLearning(m.mode);if(m.includeCode){$('#include-code').checked=true;refreshLearning();}
    }
  });
  function seedLearning(mode){
    const title=courseContext?.lesson?.title;
    const prompts={plan:'请把任务拆成三个可验证的小步骤，只指导第一步，并说明为什么。',hint:'请先给我一个思考线索和一个检查动作，等我尝试后再继续。',debug:'请引导我补齐预期结果、实际结果、完整报错和尝试，再提出一个可验证的原因。',review:'请按验收标准检查我的思路，先问我实际运行的结果。'};
    $('#question').value=(title?`我正在学习“${title}”。\n`:'')+prompts[mode];
    $('#workspace').classList.remove('closed');$('#toggle').textContent='收起助教';$('#toggle').setAttribute('aria-expanded','true');$('#question').focus();refreshPrompt();remember();state();
  }
  document.querySelectorAll('[data-learning]').forEach(button=>button.addEventListener('click',()=>seedLearning(button.dataset.learning)));
  for(const id of ['include-task','include-code','include-instruction'])$('#'+id).addEventListener('change',()=>{refreshLearning();remember();});
  $('#instruction').addEventListener('input',()=>{refreshPrompt();remember();});
  let checking=false,bindTimer=null,bindOperation=null,countdownTimer=null,pendingSend=null;
  function checked(){checking=false;clearTimeout(bindTimer);clearInterval(countdownTimer);bindTimer=null;countdownTimer=null;$('#countdown').hidden=true;$('#connection-progress').hidden=true;}
  function status(text,kind='info') {
    $('#status').textContent=text;
    $('#connection-feedback').dataset.kind=kind;
    $('#connection-feedback').setAttribute('role',kind==='error'?'alert':'status');
    $('#connection-feedback').setAttribute('aria-live',kind==='error'?'assertive':'polite');
    $('#status-title').textContent=({info:'当前状态',pending:'正在连接',working:'正在回复',error:busy?'回复同步中断':'连接未完成',ready:'可以发送问题'})[kind];
    $('#connection-feedback').hidden=!['pending','error'].includes(kind);
    $('#compact-status').textContent=text;$('#compact-status').title=text;
    $('#recovery').hidden=kind!=='error';
    sendHost({type:'workbook:assistant-state',provider:activeProvider,ready,busy,checking,kind});
  }
  function state() {
    $('#send').disabled=busy||checking||(!ready && !$('#question').value.trim());
    $('#cancel').disabled=!busy;
    for(const id of ['provider','tabs','bind','refresh','open','focus-selected','retry']) $('#'+id).disabled=busy||checking;
    $('#reload-extension').disabled=busy||checking;
  }
  function post(m) { try{port.postMessage(m);}catch{connectionLost();} }
  function scanConnection(type='ping'){
    post({type});
    if(!ready && !busy && !checking && officialURL)post({type:'locate',provider:activeProvider,url:officialURL});
  }
  const heartbeat=setInterval(()=>scanConnection(),10000);
  const replyClock=setInterval(()=>{
    if(busy && replyStarted){
      const elapsed=Math.floor((Date.now()-replyStarted)/1000);
      const text=(answer?.record.text?'正在回复':'等待官网回复')+' · '+elapsed+' 秒'+(Date.now()-lastReplyAt>15000?' · 正在检查同步':'');
      $('#compact-status').textContent=text;
    }
  },1000);
  function append(role,text) {
    $('.empty')?.remove();
    const record={role,text,provider:activeProvider,tabId:binding?.tabId,time:new Date().toISOString()};
    if(role==='user'){record.question=sendingQuestion;if(newOfficialSession){record.newConversation=true;newOfficialSession=false;$('.new-session-note')?.remove();}}
    records.push(record);
    const item=renderRecord(record);$('#messages').scrollTop=$('#messages').scrollHeight;return item;
  }
  Object.entries(BRIDGE_PROVIDERS).forEach(([id,p])=>$('#provider').add(new Option(p.name,id)));
  $('#provider').addEventListener('change',()=>{
    remember();pendingSend=null;post({type:'detach'});checked();bindOperation=null;restore($('#provider').value);remember();
  });
  $('#question').addEventListener('input',()=>{refreshPrompt();remember();state();});
  let composing=false;
  $('#question').addEventListener('compositionstart',()=>{composing=true;});
  $('#question').addEventListener('compositionend',()=>{composing=false;});
  $('#question').addEventListener('keydown',event=>{
    if(event.key!=='Enter' || event.isComposing || composing || event.keyCode===229)return;
    event.preventDefault();
    if(event.repeat)return;
    if(event.ctrlKey || event.shiftKey || event.metaKey){
      const input=event.currentTarget;
      if(input.value.length-(input.selectionEnd-input.selectionStart)+1<=input.maxLength){
        input.setRangeText('\n',input.selectionStart,input.selectionEnd,'end');
        input.dispatchEvent(new Event('input',{bubbles:true}));
      }
      return;
    }
    if(!event.altKey && !busy && !checking && $('#question').value.trim())$('#compose').requestSubmit();
  });
  window.addEventListener('pagehide',remember);
  $('#tabs').addEventListener('change',()=>{officialURL=validOfficialURL($('#tabs').selectedOptions[0]?.dataset.url);ready=false;remember();state();status('已选择其他官网对话，点击绑定并检查即可使用。');});
  for(const input of document.querySelectorAll('[id^="selector-"]')) input.addEventListener('input',()=>{ready=false;state();});
  $('#scan').addEventListener('click',()=>{$('.connection').open=true;scanConnection('scan');$('#scan-result').textContent='正在检查连接，不会重发问题…';});
  async function openOfficial(){
    if(busy || checking)return;
    const provider=activeProvider;pendingSend=null;checking=true;state();
    try{
      const granted=await chrome.permissions.request({origins:BRIDGE_PROVIDERS[provider].hosts.map(h=>'https://'+h+'/*')});
      if(provider!==activeProvider)return;
      checked();
      if(!granted){state();status('未授予 AI 页面访问权限，对话与草稿已保留。','error');return;}
      beginConnection('ensure',true,true);
    }catch(error){checked();state();status(error.message,'error');}
  }
  $('#open').addEventListener('click',openOfficial);
  $('#refresh').addEventListener('click',async()=>{
    try {
      const provider=$('#provider').value;
      const granted=await chrome.permissions.request({origins:BRIDGE_PROVIDERS[provider].hosts.map(h=>'https://'+h+'/*')});
      if(!granted) {status('没有授予官网访问权限，未连接。请点击“授权并查找标签页”授予权限。','error');return;}
      post({type:'list',provider});
    }catch(error){status(error.message,'error');}
  });
  function beginConnection(type='bind',create=false,open=false){
    ready=false;state();
    if(type==='bind' && !$('#tabs').value){status('先选择一个官网标签页。','error');return;}
    const overrides=Object.fromEntries(['input','send','answer','stop'].map(k=>[k,$('#selector-'+k).value]));
    remember();checking=true;bindOperation=crypto.randomUUID();state();
    bindTimer=setTimeout(()=>{checked();bindOperation=null;ready=false;state();status('连接检查超时，没有发送消息。请打开所选官网确认页面可操作，再重新检查连接。','error');},10000);
    const started=Date.now();
    const tick=()=>{const elapsed=Math.min(10,(Date.now()-started)/1000);$('#countdown').textContent=`剩余 ${Math.ceil(10-elapsed)} 秒`;$('#connection-progress').value=elapsed;};
    $('#countdown').hidden=false;$('#connection-progress').hidden=false;tick();countdownTimer=setInterval(tick,250);
    status(type==='ensure'?'正在准备对话…':'正在检查官网元素…','pending');post({type,create,open,url:officialURL,operation:bindOperation,tabId:Number($('#tabs').value),provider:$('#provider').value,overrides});
  }
  $('#bind').addEventListener('click',()=>beginConnection());
  $('#retry').addEventListener('click',()=>beginConnection('ensure',false));
  $('#focus-selected').addEventListener('click',openOfficial);
  $('#focus').addEventListener('click',()=>{if(busy || checking)post({type:'focus'});else openOfficial();});
  function showBuildWarning(message){
    $('#build-warning').hidden=false;$('#build-message').textContent=message;
    $('#extension-version').textContent=message;
  }
  function checkBuild(){
    clearTimeout(buildTimer);backendBuild=null;
    $('#extension-version').textContent='正在核对界面与后台版本…';
    buildTimer=setTimeout(()=>{
      let version;try{version=chrome.runtime.getManifest?.().version;}catch{sendHost({type:'workbook:assistant-health',alive:false});return;}
      if(!backendBuild && /^\d+\.\d+\.\d+$/.test(version))showBuildWarning('界面 v'+WORKBOOK_BRIDGE_BUILD+'；已加载扩展 v'+version+'，后台未回应版本核对。请载入本机新版，自动检查暂未确认。');
    },1500);
    post({type:'build'});
  }
  $('#reload-extension').addEventListener('click',()=>{
    if(busy || checking)return;
    if(!remember()){status('当前存档未能安全保存，未重载扩展。请先导出本窗口对话与草稿。','error');return;}
    try{pendingSend=null;clearTimeout(buildTimer);$('#reload-extension').disabled=true;$('#build-message').textContent='记录已保存，正在载入本机扩展文件…';chrome.runtime.reload();}
    catch(error){$('#reload-extension').disabled=false;showBuildWarning('载入失败：'+error.message);}
  });
  $('#compose').addEventListener('submit',event=>{
    event.preventDefault();if(busy||checking||!$('#question').value.trim())return;
    let text;try{text=messageText();}catch(error){status(error.message,'error');return;}
    if(ready){sendingQuestion=$('#question').value.trim();busy=true;state();post({type:'send',text});return;}
    const provider=activeProvider,question=$('#question').value.trim();
    checking=true;state();
    // Permissions are requested from this deliberate send gesture, once per provider.
    chrome.permissions.request({origins:BRIDGE_PROVIDERS[provider].hosts.map(h=>'https://'+h+'/*')}).then(granted=>{
      if(provider!==activeProvider)return;
      checked();
      if(!granted){state();status('没有授予 AI 页面访问权限，问题保留在输入框。','error');return;}
      pendingSend={provider,text,question};beginConnection('ensure',true);
    }).catch(error=>{checked();state();status(error.message,'error');});
  });
  $('#cancel').addEventListener('click',()=>post({type:'cancel'}));
  $('#cancel').title='只停止本窗口同步，不会停止官网生成';
  $('#toggle').addEventListener('click',()=>{
    const closed=$('#workspace').classList.toggle('closed');$('#toggle').textContent=closed?'打开助教':'收起助教';$('#toggle').setAttribute('aria-expanded',String(!closed));
  });
  $('#course-source').addEventListener('change',()=>{courseContext=null;courseNonce=crypto.randomUUID();refreshLearning();$('#course').src=$('#course-source').value+'?bridge=1#/web';});
  $('#export').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify({format:'workbook-bridge-v1',provider:activeProvider,records,draft:$('#question').value,instruction:$('#instruction').value},null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='官网对话记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  function connectionLost(){
    if(!portAlive)return;
    clearTimeout(buildTimer);
    portAlive=false;interruptedPort ||= busy;pendingSend=null;request=null;checked();ready=false;busy=false;replyStarted=0;state();
    if(answer && interruptedPort){answer.record.status='同步连接中断，未自动重发';answer.pre.parentElement.querySelector('.reply-placeholder').textContent='同步中断，正在恢复连接；请到官网核对本轮回复。';remember();}
    status('同步连接中断，正在自动检查；不会重新发送问题。','error');
    reconnectTimer=setTimeout(reconnectPort,500);
  }
  function reconnectPort(){
    clearTimeout(reconnectTimer);
    if(++reconnectAttempts>5){status('扩展连接无法自动恢复，记录保留；请到官网核对。','error');return;}
    try{
      chrome.runtime.getManifest();
      port=chrome.runtime.connect({name:'workbook'});portAlive=true;
      attachPort();
      if($('#tabs').value)beginConnection('ensure',false);
      else{state();status('扩展连接已恢复。输入问题即可开始。','ready');}
    }catch{
      if(reconnectAttempts<5)reconnectTimer=setTimeout(reconnectPort,1000);
      else{status('已加载的扩展代码不可用。网站会自动检查新版扩展；记录仍保留，请到官网核对。','error');sendHost({type:'workbook:assistant-health',alive:false});}
    }
  }
  function sendQueued(){
    if(!ready || !pendingSend || pendingSend.provider!==activeProvider)return;
    const {text,question}=pendingSend;pendingSend=null;
    let currentText;try{currentText=messageText();}catch(error){status(error.message,'error');return;}
    if($('#question').value.trim()!==question || currentText!==text){status('连接已就绪，输入内容已修改，请按发送。','ready');return;}
    sendingQuestion=question;busy=true;state();post({type:'send',text});
  }
  function receiveMessage(m){
    if(m.type==='available'){
      if(ready || busy || checking || m.provider!==activeProvider || validOfficialURL(m.url)!==officialURL)return;
      $('#tabs').replaceChildren(new Option(m.title||BRIDGE_PROVIDERS[activeProvider].name,String(m.tabId)));rememberURL(m.url);beginConnection('ensure',false);return;
    }
    if(m.type==='build'){
      clearTimeout(buildTimer);backendBuild=m;
      const consistent=m.version===WORKBOOK_BRIDGE_BUILD && m.build===WORKBOOK_BRIDGE_BUILD && m.protocol===WORKBOOK_BRIDGE_PROTOCOL;
      $('#build-warning').hidden=consistent;
      if(consistent)$('#extension-version').textContent='界面与后台 v'+m.version+' · 每 10 秒检查连接';
      else showBuildWarning('界面 v'+WORKBOOK_BRIDGE_BUILD+'；已加载扩展 v'+(m.version||'未知')+'，后台代码 v'+(m.build||'未知')+'。请载入本机新版。');
      return;
    }
    if(m.type==='pong'){
      return;
    }
    if(m.type==='health' && (!m.provider || m.provider===activeProvider)){
      $('#scan-result').textContent=m.message;
      if(m.counts)$('#diagnostics').textContent='自动检查：'+JSON.stringify(m.counts,null,2);
      if(m.url){rememberURL(m.url);remember();}
      return;
    }
    if(m.trace && m.operation===bindOperation) $('#diagnostics').textContent=JSON.stringify(m.trace,null,2);
    if(m.type==='stage' && m.operation===bindOperation && checking){
      status(m.message,'pending');
    }else if(m.type==='tabs' && m.provider===$('#provider').value){
      ready=false;state();$('#tabs').replaceChildren(new Option(m.tabs.length?'请选择官网对话':'没有找到，请先打开官网登录',''));
      for(const t of m.tabs){const option=new Option(`${t.title} · ${t.id}`,String(t.id));option.dataset.url=validOfficialURL(t.url);$('#tabs').add(option);}
      status(`找到 ${m.tabs.length} 个官网标签页。选择新对话后绑定。`);
    }else if(m.type==='session-tab' && m.operation===bindOperation && m.provider===activeProvider){
      $('#tabs').replaceChildren(new Option(m.title,String(m.tabId)));$('#tabs').value=String(m.tabId);rememberURL(m.url);
      if(m.newConversation && records.length){newOfficialSession=true;showSessionNote();}remember();
    }else if(m.type==='bound'){
      if(m.operation!==bindOperation)return;
      checked();
      if(m.provider!==$('#provider').value || m.tabId!==Number($('#tabs').value))return;
      binding={provider:m.provider,tabId:m.tabId};rememberURL(m.url);ready=m.ready;state();
      $('#connection-summary').textContent=BRIDGE_PROVIDERS[m.provider].name+(m.ready?' · 已绑定标签页 / 更改':' · 需要校准');
      if(m.ready) $('.connection').open=false;
      $('#diagnostics').textContent+='\n元素匹配：'+JSON.stringify(m.counts,null,2);
      status(m.ready?(m.reused?'原会话已恢复，可以继续对话。':'连接已就绪，可以开始对话。请保持对应官网标签页打开。'):(pendingSend && m.counts.input===0?'AI 页面尚未出现输入框。请打开 AI 页面完成登录或验证，完成后会自动继续。':`元素未匹配或不唯一（输入框 ${m.counts.input}，发送按钮 ${m.counts.send}）。请检查登录或展开适配诊断。`),m.ready?'ready':'error');
      if(m.ready){reconnectAttempts=0;if(interruptedPort){status('连接已自动恢复。中断的那一轮没有重发，请先到官网核对。','ready');interruptedPort=false;}}
      sendQueued();
    }else if(m.type==='waiting-login' && m.provider===activeProvider){
      checked();ready=false;state();status(m.message,'error');
    }else if(m.type==='recovering' && m.provider===activeProvider){
      checking=true;ready=false;state();status(m.message,'pending');
    }else if(m.type==='reconnected' && m.provider===activeProvider){
      checked();rememberURL(m.url);ready=m.ready;busy=m.busy;state();
      status(m.interrupted?'连接已自动恢复。上一轮因页面刷新中断，没有重发；请先核对 AI 页面。':busy?'连接正常，继续等待回复…':'连接已自动恢复，可以继续对话。',busy?'working':'ready');
      if(m.interrupted && answer){answer.record.status='页面刷新中断，未自动重发';answer.pre.parentElement.querySelector('.reply-placeholder').textContent='同步中断，未自动重发。请到官网核对本轮回复。';}
      sendQueued();
    }else if(m.type==='reconnect-failed' && m.provider===activeProvider){
      checked();ready=false;busy=false;state();status(m.message,'error');
    }else if(m.type==='started'){
      $('.connection').open=false;$('#learning-tools').open=false;request=m.id;replyStarted=lastReplyAt=Date.now();append('user',m.text);answer=append('assistant','');$('#question').value='';refreshPrompt();status('正在等待官网回复…','working');
    }else if(m.type==='update' && m.id===request){
      if(answer){const scroll=$('#messages');const atEnd=scroll.scrollHeight-scroll.scrollTop-scroll.clientHeight<60;answer.pre.textContent=m.text;answer.record.text=m.text;answer.record.status=m.status;answer.pre.parentElement.querySelector('.reply-placeholder').textContent=m.status;if(atEnd)scroll.scrollTop=scroll.scrollHeight;}
      lastReplyAt=Date.now();status(m.status,m.error?'error':m.terminal?'ready':'working');if(m.terminal){busy=false;replyStarted=0;state();}
    }else if(['error','ended','invalidated'].includes(m.type)){
      if(m.type==='invalidated' && m.provider && m.provider!==activeProvider)return;
      if(m.operation && m.operation!==bindOperation)return;
      pendingSend=null;checked();
      if(m.type!=='ended')$('.connection').open=true;
      status(m.message||m.reason,m.type==='ended'?'info':'error');busy=false;replyStarted=0;if(m.type!=='ended')ready=false;state();
      if(answer)answer.record.status=m.message||m.reason;
      if(answer)answer.pre.parentElement.querySelector('.reply-placeholder').textContent=m.message||m.reason;
    }
    if(['bound','started','update','ended','error','invalidated','reconnected','reconnect-failed'].includes(m.type))remember();
  }
  function attachPort(){
    const active=port;
    port.onDisconnect.addListener(()=>{if(active===port)connectionLost();});
    port.onMessage.addListener(m=>{if(active===port && portAlive)receiveMessage(m);});
    checkBuild();
  }
  attachPort();
  $('#provider').value=activeProvider;restore(activeProvider);
  sendHost({type:'workbook:assistant-ready',version:chrome.runtime.getManifest?.().version || 'test'});
  document.addEventListener('keydown',event=>{if(embed && event.key==='Escape')sendHost({type:'workbook:assistant-close'});});
  requestCourse();
  if(saveBlocked)$('#save-state').textContent='本机历史异常，原记录已保留；当前对话请导出保存。';
})();
