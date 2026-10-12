# 开发练习册：Web 与 Go

给第一次写代码的人，也给已经会一点编程、想转学 Web 或 Go 的人。选一节课，先动手；卡住时，用 AI 提问台把自己的目标、代码和报错整理清楚，再回到代码里验证。

**在线阅读：[打开开发练习册](https://zhouwu97.github.io/web-kaifa/)。**

**本机阅读**：下载或克隆仓库，双击 [index.html](index.html)。课程、提示模板和进度功能不需要安装依赖；官方资料入口需要联网。

## 网页里可以做什么

- 选择“第一次写代码”或“写过代码”，按自己的起点进入路线。
- 学习 Web 前 14 天与 Go 28 天，每节有任务、完整讲义、提示、验收与小测。Web 后续前端 / 全栈阶段也有入口。
- 修改 Web 示例，在隔离预览中看到真实效果；Go 和 SQL 按讲义在自己的电脑上运行。
- 带着当前课程、自己的代码和报错整理 AI 提问；也可以复制 10 个具体场景模板。
- 在同一工作台切换本课任务、代码、验收与笔记；右侧 AI 助教可按需带入课程和代码，手机上以可关闭窗口呈现。
- 阅读“怎样用 AI 开发”，练习描述需求、拆小任务、带证据排错与自己验证。
- 保存课内笔记和代码草稿，导出 / 导入 JSON，或导出 Markdown 留在仓库。

本站没有在线 AI 接口，不要求 API Key。提问台只整理文字，由你复制到常用的 AI 工具。进度保存在当前浏览器，不会自动同步到 GitHub。原互动手册的记录与新网页分开保存。

网页使用方法见 [学习网站说明](docs/site-guide.md)。

## 从这里开始

| 路线 | 互动手册 | Markdown 教材 | 学习进度 |
| --- | --- | --- | --- |
| Web 前端 / 全栈 | [Web 学习手册](materials/web/学习手册.html) | [Web 学习路线](materials/web/学习路线.md) | [Web 进度](progress/web.md) |
| Go 后端 | [28 天互动学习手册](materials/go/28天互动学习手册.html) | [完整学习清单](materials/go/完整学习清单.md) | [Go 进度](progress/go.md) |

上表是保留的原始教材。日常学习可从新网页开始；需要对照时再打开原手册。GitHub 仓库页面显示 HTML 源码，互动阅读请使用在线站点或本机文件。

**后续学习安排**：见 [学习计划](docs/study-plan.md)。先理解知识点，再写练习、保存验收结果，最后更新进度。

## 目录怎么用

```text
web-kaifa/
├── index.html            学习网站入口，支持本机打开
├── tokens.css            统一颜色、字体和间距
├── assets/               网页交互、课程、AI 模板和官方资料
├── materials/            教材原文、资料包和来源校验记录
│   ├── web/              Web 前端与全栈教材
│   ├── go/               Go 后端教材
│   └── archives/         原始 Web ZIP 资料包
├── docs/                 学习安排和仓库使用说明
├── notes/                自己写的知识总结与问题记录
│   ├── web/
│   └── go/
├── exercises/            按知识点或日期整理的小练习
│   ├── web/
│   └── go/
├── projects/             可以独立运行的阶段项目
│   ├── web/
│   └── go/problem-tracker/  刷题记录 API 的待实现计划
├── progress/             可提交到 Git 的学习进度和导出备份
├── templates/            每日笔记与项目 README 模板
└── scripts/              教材、课程结构和浏览器交互检查
```

教材已经整理入库；学习任务和项目实现均从未完成状态开始。`projects/go/problem-tracker` 目前只包含计划，后续学习时逐步实现。

## 每次学完怎么保存

1. 阅读手册，在 `exercises/web` 或 `exercises/go` 写当天练习。
2. 复制 [每日笔记模板](templates/daily-note.md)，保存到对应的 `notes` 目录。
3. 写下运行结果和仍未解决的问题，通过教材验收后再勾选 `progress` 中的任务。
4. 导出互动手册的勾选记录，按 [进度备份说明](progress/README.md) 保存。
5. 在仓库根目录提交并推送：

```powershell
git status
git add .
git commit -m "study: record today's learning"
git push
```

更详细的约定见 [仓库使用说明](docs/repository-guide.md)。教材来源见 [资料索引](materials/README.md)，整理与补充审核见 [课程审核](docs/curriculum-audit.md)、[官方资料核验](docs/research-notes.md) 和 [AI 学习依据](docs/ai-learning-notes.md)。

## 本地预览与检查

直接打开 `index.html` 可阅读。开发时也可以在根目录启动静态服务器：

```powershell
python -m http.server 8743
```

然后访问 `http://localhost:8743/`。检查教材完整性与课程数据：

```powershell
python scripts/check_materials.py
node scripts/check_site.cjs
node scripts/test_site.cjs
node scripts/test_workbench.cjs
```

浏览器集成检查位于 `scripts/test_site.cjs`，需要 Playwright 和本机 Edge，测试前先启动上述服务器。它覆盖课程入口、代码预览、完成规则、AI 上下文、记录备份和移动端布局；不要求学习者运行这些开发检查。

工作台扩展检查位于 `scripts/test_workbench.cjs`，使用相同环境。设计与审核记录见 [工作台改版说明](docs/workbench-redesign.md)。AI 服务选择仅表示工具偏好，当前没有真实登录、API 调用或流式回答。
