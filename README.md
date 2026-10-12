# Web 开发与 Go 后端学习

这是我的开发学习仓库，用来保存教材、学习笔记、练习代码和阶段项目。先按 Web 基础与 Go 后端两条路线整理，后续学习内容继续放在同一仓库。

## 从这里开始

| 路线 | 互动手册 | Markdown 教材 | 学习进度 |
| --- | --- | --- | --- |
| Web 前端 / 全栈 | [Web 学习手册](materials/web/学习手册.html) | [Web 学习路线](materials/web/学习路线.md) | [Web 进度](progress/web.md) |
| Go 后端 | [28 天互动学习手册](materials/go/28天互动学习手册.html) | [完整学习清单](materials/go/完整学习清单.md) | [Go 进度](progress/go.md) |

**在本机阅读互动手册**：进入上面的 `materials/web` 或 `materials/go` 目录，双击 HTML 文件即可离线打开。GitHub 网页上的 HTML 链接用于查看源码；浏览器互动阅读需要先下载或克隆仓库。手册中的外部参考资料需要联网访问。

**后续学习安排**：见 [学习计划](docs/study-plan.md)。先理解知识点，再写练习、保存验收结果，最后更新进度。

## 目录怎么用

```text
web-kaifa/
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
└── scripts/              教材完整性检查
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

更详细的约定见 [仓库使用说明](docs/repository-guide.md)。教材来源见 [资料索引](materials/README.md)；有 Python 3 时可执行 `python scripts/check_materials.py` 检查教材是否完整。
