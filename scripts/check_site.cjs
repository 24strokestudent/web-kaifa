/* Run with Node.js: validates published assets and curriculum coverage. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const name of ['curriculum', 'adaptations', 'resources', 'ai-guide']) {
  const source = fs.readFileSync(path.join(root, 'assets/data', name + '.js'), 'utf8');
  vm.runInContext(source, context, { filename: name + '.js' });
}
new vm.Script(fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8'));
new vm.Script(fs.readFileSync(path.join(root, 'assets/workbench.js'), 'utf8'));
const courses = context.window.LEARNING_CURRICULUM;
const ids = new Set();
for (const [track, count] of [['web', 14], ['go', 28]]) {
  const course = courses[track];
  assert.equal(course.lessons.length, count, track + ' lesson coverage');
  for (let i = 0; i < count; i++) {
    const lesson = course.lessons[i];
    assert.equal(lesson.id, track + '-' + String(i + 1).padStart(2, '0'));
    assert.equal(lesson.day, i + 1);
    assert(!ids.has(lesson.id)); ids.add(lesson.id);
    for (const field of ['title', 'summary', 'task', 'hint', 'sourceMarkdown']) assert.equal(typeof lesson[field], 'string', lesson.id + ' ' + field);
    assert(lesson.sourceMarkdown.length > 100, lesson.id + ' full source lesson');
    assert(lesson.checks.length >= 2 && lesson.checks.length <= 4);
    assert.equal(lesson.quiz.options.length, 3);
    assert(Number.isInteger(lesson.quiz.answer) && lesson.quiz.answer >= 0 && lesson.quiz.answer < 3);
    assert(course.stages.some(stage => stage.id === lesson.stageId && stage.lessonIds.includes(lesson.id)));
  }
  const listed = course.stages.flatMap(stage => Array.from(stage.lessonIds));
  assert.deepEqual([...listed].sort(), Array.from(course.lessons, lesson => lesson.id).sort());
}
assert.equal(courses.web.followups.length, 12);
for (const followup of courses.web.followups) assert(followup.task && followup.checks.length && followup.sourceSection.length > 100);
const adaptation = context.window.LEARNING_ADAPTATIONS;
assert.equal(adaptation.goBeginner02.checks.length, courses.go.lessons[1].checks.length);
assert(!adaptation.goBeginner02.task.includes('熟悉的 C++'));
assert(adaptation.webPreviews['web-05'].includes('topbar'));
const resources = context.window.LEARNING_RESOURCES;
assert.equal(resources.length, 18);
assert.equal(new Set(resources.map(item => item.id)).size, resources.length);
for (const resource of resources) assert.equal(new URL(resource.url).protocol, 'https:');
const ai = context.window.AI_LEARNING_GUIDE;
assert.equal(ai.prompts.length, 10);
assert.equal(new Set(ai.prompts.map(item => item.id)).size, 10);
for (const prompt of ai.prompts) assert(prompt.prompt && prompt.why && prompt.nextStep);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const reference = match[1];
  if (/^(?:#|https?:|data:)/.test(reference)) continue;
  assert(fs.existsSync(path.resolve(root, reference)), 'missing asset: ' + reference);
}
assert(fs.existsSync(path.join(root, '.nojekyll')));
console.log('PASS: 42 lessons, 12 followups, 18 resources, 10 AI templates, beginner adaptations and all entry assets.');
