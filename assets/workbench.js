/* Presentation layer. Existing app.js owns learning records and completion rules. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  let api;
  let courseParent=null;
  let currentLesson = null;
  let currentKey = 'custom';
  let manualOpen = null;
  let provider = 'Claude';
  let returnFocus = null;
  const drafts = new Map();
  const tabs = new Map();
  const emptyDraft = () => ({ question: '', task: true, code: false, output: '' });
  let draft = emptyDraft();
  const modes = {
    plan: '请先帮我澄清目标，再把任务拆成最多四个可验证的小步骤。这次只展开第一步，说明需要修改哪个文件以及怎样验证。',
    hint: '请先给我一个线索和一个检查动作，不要直接给出完整答案。等我尝试后再继续。',
    debug: '请引导我补充预期结果、实际结果、完整报错和已有尝试，然后提出一个能验证的原因。一次只改一处，不重写整个项目。',
    review: '请根据验收标准检查我的思路，先问我实际运行的结果。没有运行测试就说明未运行，不要只凭代码声明已经完成。'
  };

  function methodPage() {
    const steps = [
      ['描述可验收的结果', '告诉 AI 谁会用、要完成什么，以及怎样才算做好。零基础可以要求解释术语；已有经验可以直接给接口和约束。', '我要做社团介绍页，包含标题、活动说明和报名入口。手机上不能横向滚动。先问我还缺什么信息，暂时不要写代码。', 'plan'],
      ['拆小任务，一次实现一个', '让 AI 先列计划与涉及的文件，再决定这次实现哪一步。保留能运行的版本，避免一次改太多。', '请拆成三个独立可验证的步骤。这次只实现第一步，告诉我文件放在哪里、怎样启动、预期看到什么。', 'plan'],
      ['带证据排查报错', '提供相关代码、完整报错、预期结果和实际结果。让 AI 给出原因与验证方法，自己运行后反馈。', '预期：点击按钮增加一行。实际：没有变化。我的代码和控制台报错如下……请先提出一个可验证的猜测。', 'debug'],
      ['检查改动，自己运行验证', '先看 AI 改了哪些内容，再测试正常情况、边界输入和手机尺寸。能解释关键部分后，再完成课内验收。', '这是我修改后的代码和实际测试结果……请检查还漏掉哪些边界，再问我两个问题，确认我能解释实现。', 'review']
    ];
    return `<header class="page-heading method-intro"><span class="workbook-eyebrow">LEARN TO BUILD WITH AI</span><h1>怎样用 AI 开发</h1><p>你决定目标、检查改动和验证结果。让 AI 在每一步帮你想清楚，而不是替你跳过理解。</p></header><ol class="method-list">${steps.map((step, i) => `<li><span class="method-number">0${i + 1}</span><div><h2>${step[0]}</h2><p>${step[1]}</p><pre class="method-example">${step[2]}</pre><button class="button quiet" data-assist-preset="${step[3]}">在侧栏练习这个问法 ↗</button></div></li>`).join('')}</ol><div class="callout"><strong>保留自己判断的那一步。</strong><p>不要粘贴密码或令牌。AI 给出的代码先检查，再运行；提问、复制或阅读回答都不等于完成课程。</p></div><div class="button-row"><a class="button primary" href="#/web">从 Web 第一课开始</a><a class="button" href="#/go">从 Go 第一课开始</a><a class="button quiet" href="#/ai">查看更多场景模板 ↗</a></div>`;
  }

  function mountLesson(lesson) {
    const grid = $('.lesson-grid');
    if (!grid || grid.dataset.workbench) return;
    grid.dataset.workbench = 'true';
    const content = grid.querySelector('.lesson-main');
    const sections = [...content.children];
    const codeSection = sections.find(section => section.querySelector('#lesson-code'));
    const quiz = $('#lesson-quiz');
    const acceptance = grid.querySelector('.lesson-aside');
    const legacyAI = sections.at(-1);
    const tabList = document.createElement('div');
    tabList.className = 'workbook-tabs';
    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('aria-label', '本课学习步骤');
    const names = [['task', '本课任务'], ['code', '动手写代码'], ['review', '验收与笔记']];
    tabList.innerHTML = names.map(([name, label]) => `<button type="button" id="workbook-tab-${name}" role="tab" data-lesson-tab="${name}" aria-controls="workbook-panel-${name}" aria-selected="false" tabindex="-1">${label}</button>`).join('');
    grid.before(tabList);
    const panels = Object.fromEntries(names.map(([name]) => {
      const panel = document.createElement('div');
      panel.id = 'workbook-panel-' + name;
      panel.className = 'workbook-tabpanel';
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'workbook-tab-' + name);
      panel.tabIndex = 0;
      return [name, panel];
    }));
    sections.filter(section => section !== codeSection && section !== quiz && section !== legacyAI).forEach(section => panels.task.append(section));
    if (codeSection) panels.code.append(codeSection);
    else panels.code.innerHTML = '<h2>这一课在本机动手</h2><p>本课没有可编辑的网页片段。请按完整讲义里的步骤在本机完成任务，并把实际结果记在验收笔记中。</p>';
    panels.review.append(quiz, acceptance);
    const help = document.createElement('section');
    help.className = 'workbook-inline-help';
    help.innerHTML = '<h2>卡住时，从一个线索开始。</h2><p class="small hint">带上本课任务与自己的尝试，在侧栏整理问题。</p><div class="button-row"><button class="button" data-assist-preset="hint">带着本课提问 ↗</button><a class="button quiet" href="#/ai-method">学会用 AI 开发</a></div>';
    panels.task.append(help);
    const actions = document.createElement('div');
    actions.className = 'button-row';
    actions.innerHTML = '<button class="button primary" data-next-tab="code">开始动手 →</button><button class="button quiet" data-assist-preset="plan">帮我拆解任务 ↗</button>';
    panels.task.querySelector('.task-box').append(actions);
    const next = document.createElement('div');
    next.className = 'button-row';
    next.innerHTML = '<button class="button primary" data-next-tab="review">检查运行结果 →</button><button class="button" data-assist-code>带着代码提问 ↗</button>';
    panels.code.append(next);
    grid.replaceChildren(...Object.values(panels));
    function select(name, focus = false) {
      tabs.set(lesson.id, name);
      tabList.querySelectorAll('button').forEach(button => {
        const active = button.dataset.lessonTab === name;
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
        if (active && focus) button.focus();
      });
      Object.entries(panels).forEach(([key, panel]) => { panel.hidden = key !== name; });
    }
    tabList.addEventListener('click', event => { const button = event.target.closest('[data-lesson-tab]'); if (button) select(button.dataset.lessonTab); });
    tabList.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const active = names.findIndex(([name]) => name === tabs.get(lesson.id));
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (active + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
      select(names[index][0], true);
    });
    grid.querySelectorAll('[data-next-tab]').forEach(button => button.addEventListener('click', () => select(button.dataset.nextTab, true)));
    select(tabs.get(lesson.id) || 'task');
    const editor = $('#lesson-code');
    if (editor) {
      const previewStatus = document.createElement('p');
      previewStatus.className = 'workbook-preview-status';
      previewStatus.setAttribute('role', 'status');
      editor.after(previewStatus);
      editor.addEventListener('input', () => {
        previewStatus.textContent = '草稿已保存；修改后的代码需手动运行。';
        const frame = $('#code-preview');
        if (frame) { frame.removeAttribute('srcdoc'); frame.hidden = true; }
        updateContext();
      });
      grid.addEventListener('click', event => {
        if (event.target.closest('[data-action="run-preview"], [data-action="reset-code"]')) {
          const frame = $('#code-preview'); if (frame) frame.hidden = false;
          previewStatus.textContent = frame ? '已运行当前代码，请检查实际结果。' : '已恢复参考片段；请按讲义在本机运行。';
          // app.js handles the action later in the same event propagation.
          queueMicrotask(updateContext);
        }
      });
    }
    updateOutline(lesson);
  }

  function updateOutline(lesson) {
    const outline = $('#course-outline');
    outline.hidden = !lesson;
    if (!lesson) { outline.replaceChildren(); return; }
    const completed = api.completed();
    outline.innerHTML = `<p>${lesson.track === 'web' ? 'WEB 开发' : 'GO 后端'} / 课程目录</p><div class="outline-links">${window.LEARNING_CURRICULUM[lesson.track].lessons.map(raw => {
      const item = api.lesson(raw.id);
      return `<a href="#/lesson/${item.id}"${item.id === lesson.id ? ' aria-current="page"' : ''} title="${escape(item.title)}"><span class="outline-number">${String(item.day).padStart(2, '0')}</span><span class="outline-title">${escape(item.title)}</span>${completed.includes(item.id) ? '<span class="outline-done" aria-label="已完成">✓</span>' : ''}</a>`;
    }).join('')}</div>`;
  }

  function publishCourse(){
    if(!courseParent)return;
    const l=currentLesson;
    const lesson=l?{id:l.id,title:l.title,task:l.task,checks:l.checks}:null;
    const code=l?($('#lesson-code')?.value ?? api.draft(l.id) ?? l.starterCode ?? ''):'';
    parent.postMessage({type:'workbook:course-context',nonce:courseParent.nonce,lesson,code},courseParent.origin);
  }
  window.addEventListener('message',event=>{
    const m=event.data;
    if(!new URLSearchParams(location.search).has('bridge') || event.source!==parent || !/^chrome-extension:\/\/[a-p]{32}$/.test(event.origin) || m?.type!=='workbook:course-request' || typeof m.nonce!=='string' || m.nonce.length>80)return;
    courseParent={origin:event.origin,nonce:m.nonce};publishCourse();setOpen(false);
  });
  function contextText() {
    const lesson = currentLesson;
    const parts = [];
    if (draft.task && lesson) parts.push(`课程：${lesson.track === 'web' ? 'Web' : 'Go'} 第 ${lesson.day} 课 · ${lesson.title}`, `任务：${lesson.task}`, `验收：${lesson.checks.join('；')}`);
    if (draft.code && lesson) {
      const code = $('#lesson-code')?.value ?? api.draft(lesson.id) ?? lesson.starterCode ?? '';
      parts.push('我的代码：', code || '本课尚无代码草稿。');
    }
    return parts.join('\n');
  }

  function refreshProgress(id) {
    if (currentLesson?.id !== id) return;
    updateOutline(currentLesson);
    const label = $('.lesson-header .lesson-meta > span:last-child');
    if (label) label.textContent = api.completed().includes(id) ? '✓ 已完成' : '待练习';
  }

  function updateContext() {
    publishCourse();
    if (!$('#assistant-context-preview')) return;
    $('#assistant-context-preview').textContent = contextText() || '本次只包含你在输入框中填写的问题。';
    // A previously generated prompt must never silently gain new code/context.
    if (draft.output) $('#assistant-status').textContent = '下方提问是上次整理的快照；修改上下文后请重新整理。';
  }

  function syncDraft() {
    $('#assistant-question').value = draft.question;
    $('#assistant-task').checked = draft.task;
    $('#assistant-code').checked = draft.code;
    $('#assistant-task').disabled = $('#assistant-code').disabled = !currentLesson;
    $('#assistant-context-label').textContent = currentLesson ? currentLesson.title : '自由提问 · 未附带课程';
    $('#assistant-output').textContent = draft.output;
    $('#assistant-result').hidden = !draft.output;
    $('#assistant-status').textContent = '';
    $('#assistant-question').removeAttribute('aria-invalid');
    updateContext();
  }

  function modalLayout() { return matchMedia('(max-width: 1279px)').matches; }
  function setOpen(open, manual = false) {
    if (manual) manualOpen = open;
    document.body.classList.toggle('assistant-open', open);
    $('#assistant-panel').hidden = !open;
    $('#assistant-backdrop').hidden = true;
    $('#assistant-toggle').setAttribute('aria-expanded', String(open));
    $('#assistant-panel').setAttribute('role', 'complementary');
    $('#assistant-panel').removeAttribute('aria-modal');
    $('.page-shell').inert = $('#sidebar').inert = false;
  }

  function openAssistant() {
    if(courseParent){publishCourse();parent.postMessage({type:'workbook:course-open',nonce:courseParent.nonce},courseParent.origin);return;}
    returnFocus = document.activeElement;
    setOpen(true, true);
    $('#assistant-question').focus();
  }
  function closeAssistant() {
    setOpen(false, true);
    const validReturn = returnFocus?.isConnected && !returnFocus.closest('#assistant-panel, dialog');
    (validReturn ? returnFocus : $('#assistant-toggle')).focus();
  }
  function seed(mode, code = false) {
    if(courseParent){publishCourse();parent.postMessage({type:'workbook:course-preset',nonce:courseParent.nonce,mode,includeCode:code},courseParent.origin);return;}
    openAssistant();
    if (code && currentLesson) draft.code = true;
    draft.question = (currentLesson ? `我正在学习“${currentLesson.title}”。\n` : '') + modes[mode];
    syncDraft();
    $('#assistant-question').focus();
  }

  function routeChanged(route, lesson) {
    drafts.set(currentKey, { ...draft });
    currentLesson = lesson;
    currentKey = lesson?.id || 'custom';
    draft = { ...(drafts.get(currentKey) || emptyDraft()) };
    document.body.classList.toggle('lesson-view', Boolean(lesson));
    updateOutline(lesson);
    syncDraft();
    setOpen(manualOpen ?? (Boolean(lesson) && !modalLayout() && !new URLSearchParams(location.search).has('bridge')));
  }

  function configure(bridge) {
    api = bridge;
    $('#assistant-root').innerHTML = `
      <button id="assistant-backdrop" class="assistant-backdrop" tabindex="-1" aria-label="关闭 AI 助教" hidden></button>
      <aside class="assistant-panel" id="assistant-panel" aria-labelledby="assistant-title" hidden>
        <header class="assistant-heading"><div class="assistant-row"><h2 id="assistant-title"><span class="assistant-symbol" aria-hidden="true">✳</span>AI 助教</h2><button class="assistant-close" id="assistant-close" aria-label="收起 AI 助教">×</button></div><button class="button provider-button" id="assistant-provider" aria-haspopup="dialog"><span><b id="assistant-provider-name">Claude</b> · 未接入</span><span>选择服务 ⌄</span></button></header>
        <div class="assistant-body"><p class="assistant-mode-note">本地提问工具 · 不调用模型、不发送代码</p><span class="workbook-eyebrow">A LITTLE HELP, AT THE RIGHT TIME</span><h3 class="assistant-greeting">从你卡住的地方开始。</h3><p class="assistant-description">说说你想做什么、试过什么。先整理一个清楚的问题，再带着提示回到自己的代码里。</p><div class="assistant-suggestions"><button data-assist-preset="plan">帮我把任务拆小</button><button data-assist-preset="hint">先给我一个线索</button><button data-assist-preset="debug">教我怎样排查报错</button></div><section class="assistant-context"><h3 id="assistant-context-label"></h3><label><input id="assistant-task" type="checkbox" checked>当前课程与验收标准</label><label><input id="assistant-code" type="checkbox">我编辑的代码</label><details><summary>查看本次提问的上下文</summary><pre id="assistant-context-preview"></pre></details></section><section class="assistant-result" id="assistant-result" hidden><div class="assistant-row"><h3>整理后的提问 · 非 AI 回答</h3><button class="button quiet small" id="assistant-copy">复制</button></div><pre id="assistant-output" tabindex="0"></pre></section></div>
        <div class="assistant-compose-area"><form class="assistant-compose" id="assistant-form"><label for="assistant-question">你的问题</label><textarea id="assistant-question" maxlength="4000" aria-describedby="assistant-status" placeholder="例如：我该先写页面结构，还是先调整样式？"></textarea><div class="assistant-row"><small>先要线索，再自己动手</small><button class="button primary" type="submit">整理提问 ↑</button></div></form><p id="assistant-status" class="assistant-status" role="status"></p><p class="assistant-footnote">提问草稿仅保留在当前页面，请及时复制</p></div>
      </aside>
      <dialog class="workbook-dialog" id="provider-dialog" aria-labelledby="provider-title"><div class="assistant-row"><h2 id="provider-title">选择你使用的 AI</h2><button class="assistant-close" data-close-dialog="provider-dialog" aria-label="关闭服务选择">×</button></div><p>选择你准备复制提问到的工具；本站目前没有在线模型连接。</p><div class="provider-options">${['Claude', 'ChatGPT', 'Gemini', 'DeepSeek'].map(name => `<button class="button" data-provider="${name}" aria-pressed="${name === provider}"><strong>${name}</strong><small>未接入</small></button>`).join('')}</div><p>选择服务不会登录第三方账号，也不会把课程或代码发出去。</p><button class="button" id="connection-info">了解站内登录与对话</button></dialog>
      <dialog class="workbook-dialog" id="connection-dialog" aria-labelledby="connection-title"><div class="assistant-row"><h2 id="connection-title">关于站内对话</h2><button class="assistant-close" data-close-dialog="connection-dialog" aria-label="关闭连接说明">×</button></div><p>当前版本可以直接学习和整理提问，不需要登录。</p><p>官网对话桥接扩展原型已单独提供：安装扩展 → 在官网登录 → 绑定官网标签页 → 在扩展工作台中同步对话。七家候选适配器仍需真实账号验证。</p><p>本页仍是本地提问工具，安装扩展也不会自动把它变成在线聊天。扩展不使用付费模型 API，也不会收集官网密码。</p><button class="button primary" data-close-dialog="connection-dialog">知道了</button></dialog>`;
    $('#assistant-toggle').addEventListener('click', () => document.body.classList.contains('assistant-open') ? closeAssistant() : openAssistant());
    $('#assistant-close').addEventListener('click', closeAssistant);
    $('#assistant-backdrop').addEventListener('click', closeAssistant);
    $('#assistant-provider').addEventListener('click', () => $('#provider-dialog').showModal());
    $('#connection-info').addEventListener('click', () => { $('#provider-dialog').close(); $('#connection-dialog').showModal(); });
    $('#connection-dialog').addEventListener('close', () => $('#assistant-provider').focus());
    document.querySelectorAll('[data-provider]').forEach(button => button.addEventListener('click', () => {
      provider = button.dataset.provider;
      $('#assistant-provider-name').textContent = provider;
      document.querySelectorAll('[data-provider]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
    document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => $('#' + button.dataset.closeDialog).close()));
    $('#assistant-question').addEventListener('input', event => {
      draft.question = event.target.value;
      event.target.removeAttribute('aria-invalid');
      $('#assistant-status').textContent = draft.output ? '问题已修改，请重新整理后复制。' : '';
    });
    for (const field of ['task', 'code']) $('#assistant-' + field).addEventListener('change', event => { draft[field] = event.target.checked; updateContext(); });
    $('#assistant-form').addEventListener('submit', event => {
      event.preventDefault();
      if (!draft.question.trim()) {
        $('#assistant-status').textContent = '先写下一个问题，或选择上面的提问方式。';
        $('#assistant-question').setAttribute('aria-invalid', 'true');
        $('#assistant-question').focus(); return;
      }
      draft.output = [contextText(), '我的问题：' + draft.question.trim(), '请先确认问题，只指导一个最小步骤，说明怎样验证。没有运行就明确说未运行，不要替我声明学习完成。'].filter(Boolean).join('\n\n');
      $('#assistant-output').textContent = draft.output;
      $('#assistant-result').hidden = false;
      $('#assistant-status').textContent = '提问已整理，可复制到 ' + provider + '。';
      const scroll = $('.assistant-body'); scroll.scrollTop = scroll.scrollHeight;
    });
    $('#assistant-copy').addEventListener('click', () => api.copy(draft.output, $('#assistant-copy')));
    document.addEventListener('click', event => {
      const preset = event.target.closest('[data-assist-preset]');
      if (preset) seed(preset.dataset.assistPreset);
      if (event.target.closest('[data-assist-code]')) seed('debug', true);
    });
    document.addEventListener('keydown', event => {
      if (!document.body.classList.contains('assistant-open') || $('dialog[open]')) return;
      if (event.key === 'Escape') { event.preventDefault(); closeAssistant(); }
    });
    matchMedia('(max-width: 1279px)').addEventListener('change', () => {
      setOpen(document.body.classList.contains('assistant-open'));
    });
  }
  window.Workbench = { configure, mountLesson, routeChanged, methodPage, refreshProgress };
})();
