'use strict';
const activities = [
  { id: 1, title: 'HTML 第一张网页', category: 'web', minutes: 30 },
  { id: 2, title: 'Go 快速起步', category: 'go', minutes: 40 },
  { id: 3, title: 'Grid 卡片布局', category: 'web', minutes: 35 }
];
function filterActivities(items, keyword) {
  const query = keyword.trim().toLowerCase();
  return items.filter(item => item.title.toLowerCase().includes(query));
}
// 练习：增加分类参数，再添加与 render 使用同一份结果的分类控件和清空按钮。
const input = document.querySelector('#keyword');
const list = document.querySelector('#activities');
function render() {
  const visible = filterActivities(activities, input.value);
  list.replaceChildren();
  for (const activity of visible) {
    const row = document.createElement('li');
    const title = document.createElement('h2');
    const detail = document.createElement('p');
    title.textContent = activity.title;
    detail.textContent = `${activity.category === 'web' ? 'Web' : 'Go'} · ${activity.minutes} 分钟`;
    row.append(title, detail);
    list.append(row);
  }
  document.querySelector('#count').textContent = `找到 ${visible.length} 场活动`;
  document.querySelector('#empty').hidden = visible.length !== 0;
}
input.addEventListener('input', render);
render();
