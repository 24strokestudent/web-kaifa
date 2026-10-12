# Web / Go 知识与练习优化记录

日期：2026-10-12。范围：学习网站内容、课程展示与补充练习。保留 14 节 Web 起步课、28 节 Go 课程和 12 个 Web 后续阶段；原教材未改，学习完成状态未更新。

## 为什么这样整理

原站有完整教材、任务与验收，但课头的知识点主要是术语列表；JavaScript 等后续阶段较大，缺少可以直接挑选的小任务。此次补充把“术语 → 理解 → 短例子 → 边界 → 练习 → 证据”连起来。

| 参考来源 | 阅读与采用的做法 | 在本仓库中的实现 |
| --- | --- | --- |
| [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/) | 核心基础与扩展分开，基础覆盖语义、布局、JavaScript、无障碍和 Git | 知识地图分组；框架不作为 HTML / CSS 起步前提 |
| [MDN JavaScript 技能检查](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Test_your_skills) | 按数组、函数、事件等主题单独检验 | 纯函数、搜索、表单与请求状态的专项任务 |
| [The Odin Project Foundations](https://www.theodinproject.com/paths/foundations/courses/foundations) | 基础知识与阶段项目交替安排 | 每阶段写明作品和验收证据，练习采用自己的社团与记录场景 |
| [Go 官方学习入口](https://go.dev/learn/) | Tour 的互动章节与配套练习；按需要选择教程 | 零基础 Go 起步不要求 C++；短例子之后改变输入 |
| [Go 官方添加测试](https://go.dev/doc/tutorial/add-a-test) | 用测试验证合法输入与边界 | 词频表驱动测试、HTTP 响应测试与边界用例 |
| [Go by Example](https://gobyexample.com/) | 通过小型可运行例子查看单个主题 | Go 主题给出短片段并明确所需上下文，完整参考例子放独立模块 |
| [Exercism Go](https://exercism.org/tracks/go) | 作为继续进行 Go 专项练习的站外入口 | 资料列表保留用途提示，不承诺账号、工具和服务条件 |
| [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | HTTP 错误仍可能返回 Response，需要检查 ok，再解析 | 真实验证 404、坏 JSON、空数组和网络失败 |
| [Go 数据库教程](https://go.dev/doc/tutorial/database-access) | 标准库访问关系数据库，示例使用 MySQL | 明确本课程使用 PostgreSQL，驱动与参数占位符不能原样混用 |
| [net/http](https://pkg.go.dev/net/http)、[context](https://pkg.go.dev/context)、[OWASP 权限检查](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) | 查询实际 API 与取消、授权边界 | 补充 Header 顺序、超时、对象归属与两用户测试 |

以上采用课程组织与验证方法，没有复制外站页面、图片或整篇教程。讲解、示例与任务由本仓库编写。Tour 页面文本抓取仅返回应用外壳，其结构依据官方学习入口，不宣称在站外逐题运行。链接核验不等于其全部内容、所有版本与所有练习都已验证。

## 展示与内容

- 新增 24 个主题：Web / Go 各 12 个。每个有说明、使用场景、三个关键点、例子、预期与运行条件、误区、复习问题、前置知识和练习链接。
- 新增 18 个练习：Web / Go 各 9 个。每个有起步提示、独立任务、加练、预期输入输出、启动方法和已知限制。
- 原有 42 课都关联补充概念；六个实际课时阶段写明可交付成果与验收方法。JavaScript、DOM、请求和联调练习接到对应后续阶段。
- 课程、知识和练习可通过顶部一起搜索；工坊和地图支持方向、难度、关键词，筛选保存在 URL 并随刷新和返回恢复。
- 四套可运行参考起点：Web 活动搜索、Web 请求状态、Go 词频、Go HTTP 基础。各目录 README 区分已实现与待练习内容。
- 资料列表扩充到 23 个，说明官方文档与社区课程的用途，不把所有参考都叫官方教程。

## 进度与运行边界

知识模块只展示，不写学习存储。复习答案、复制清单、阅读或运行参考例子不改变完成状态。仍需在课内完成原有验收、小测，并主动记录完成。

“运行起点演示”只在点击后将已知原始 HTML 放入 `sandbox="allow-scripts"` 的 iframe，使用限制外部连接、表单和资源的 CSP；不授予同源权限。不执行已编辑或导入草稿。Go / SQL 仍需本机运行。新增练习不提供在线 AI，也不把计划当成已实现的 CRUD、认证或数据库项目。

原有学习数据格式、导入撤销、清空撤销和异常原记录保存机制沿用。materials 与 manifest 未修改。沿用现有工作台暖纸色、陶土色、字体和间距，新增样式单独放入 learning.css，不替换原样式或 AI 桥接实现。

## 维护与验证

数据在 [learning-lab.js](../assets/data/learning-lab.js)，展示在 [learning.js](../assets/learning.js)、[learning.css](../assets/learning.css)。结构检查验证来源、前置关系无环、课时关联、练习上下文和配套文件存在。

```powershell
node scripts/check_site.cjs
node scripts/test_site.cjs
node scripts/test_workbench.cjs
node scripts/test_learning.cjs
python scripts/check_materials.py
git diff --check
```

浏览器检查需要 Playwright、本机 Edge 和仓库根目录的 8743 HTTP 服务；没有给学习者增加 npm 安装前提。四套练习各有启动与验证方式；Go 检查在各自模块目录运行 `go test ./...`、`go vet ./...`。Go 模块声明最低 1.22，实际本机验证工具链是 Go 1.26.2。

浏览器新检查覆盖新增 44 个内容路由、筛选 / 返回、全站搜索、复制不改变进度、手动预览与同源隔离、320 / 375 / 414 / 768px，以及配套请求的加载、空结果、404、坏 JSON 与断网。截图保存在已忽略的 `.qa/`。

本次执行结果：结构检查、原有站点检查、工作台检查、新增学习检查与 `git diff --check` 均通过；原教材 5 个来源文件校验通过。两个 Go 模块的 `go test ./...`、`go vet ./...` 通过，HTTP 模块另验证临时测试服务器上的真实请求。已查看知识地图、练习详情、课内补充的桌面截图与手机工坊 / 详情截图；新检查也验证了 file:// 本机打开与筛选。浏览器检查使用 `SITE_TEST_URL=http://127.0.0.1:8744/` 的本地预览服务。

本文记录的检查范围不表示学习者已经通过验收。测试与截图属于网站开发验证，课程进度仍由学习者的实际成果决定。
