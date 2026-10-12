'use strict';
const paths = { success: './items.json', empty: './empty.json', missing: './missing.json', invalid: './invalid.json' };
const form = document.querySelector('#request-form');
const scenario = document.querySelector('#scenario');
const button = document.querySelector('#load');
const view = document.querySelector('#view');
const status = document.querySelector('#status');
const list = document.querySelector('#items');
function setState(name, text) {
  view.dataset.state = name;
  status.textContent = text;
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (button.disabled) return;
  const path = paths[scenario.value];
  button.disabled = scenario.disabled = true;
  list.replaceChildren();
  setState('loading', '正在加载…');
  try {
    // 教学演示每次读取新响应，避免缓存把断网验证伪装成成功。
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items = await response.json();
    if (!Array.isArray(items)) throw new Error('响应应当是数组');
    // 练习：这里继续校验每一项是否拥有符合契约的 id 与 title。
    if (!items.length) setState('empty', '请求成功，但当前没有活动');
    else {
      for (const item of items) {
        const row = document.createElement('li');
        row.textContent = item.title;
        list.append(row);
      }
      setState('success', `已加载 ${items.length} 场活动`);
    }
  } catch (error) {
    list.replaceChildren();
    setState('error', error instanceof SyntaxError ? '请求失败：JSON 解析错误' : `请求失败：${error.message}`);
  } finally {
    button.disabled = scenario.disabled = false;
  }
});
