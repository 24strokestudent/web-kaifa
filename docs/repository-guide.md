# 仓库使用说明

## 教材与自己写的内容

`materials` 存放原始资料，文件名已恢复为可读名称，正文保持原样。自己的解释、纠错和补充放入 `notes`；不直接在原教材里打卡，以便日后更新版本和校验来源。

网页手册可以离线双击阅读。GitHub 默认显示 HTML 源码，不能通过仓库中的文件链接直接运行互动页面。

## 文件命名

| 内容 | 推荐路径示例 |
| --- | --- |
| Web 笔记 | `notes/web/2026-10-12-html-basics.md` |
| Go 笔记 | `notes/go/day01-environment.md` |
| Web 小练习 | `exercises/web/day01-html/` |
| Go 小练习 | `exercises/go/day01-hello/` |
| Web 阶段项目 | `projects/web/club-site/` |
| Go 阶段项目 | `projects/go/problem-tracker/` |

这些路径是命名示例，不表示练习已经完成。每个目录按实际学习需要建立，避免提前放大量空文件。

Go 的每个独立练习或项目在自己的目录里创建 `go.mod`。例如进入 `exercises/go/day01-hello` 后，再按照教材执行 `go mod init`。Web 项目的依赖配置同样保存在各自项目内。

## 更新与同步

开始学习前执行 `git pull --ff-only`，结束后查看 `git status`，确认提交内容，再提交并 `git push`。互动手册的浏览器存储不会自动随 Git 同步，需要手动导出，见 [进度说明](../progress/README.md)。

环境变量示例可以保存为 `.env.example`，填写占位值；实际配置放 `.env`。依赖缓存、数据库数据和编译产物已经加入 `.gitignore`。

## 完整性检查

在根目录执行：

```powershell
python scripts/check_materials.py
```

检查依据为 `materials/manifest.json` 中的 SHA-256 和字节数。它只确认教材和资料包没有意外改变，不代表教材里的所有示例已经执行过或所有外部链接仍然有效。
