# 官方资料核验与教材审核记录

核验日期：2026-10-12。范围：给学习网页挑选常用的一手资料入口，抽查教材中的版本、数据库示例和上线说明。原教材保持不变；这份记录不表示学习任务已经完成，也不等同于跑过教材中的每段代码。

网页的资料列表来自 [resources.js](../assets/data/resources.js)。原有 Web 7 个、Go 8 个和通用 3 个官方入口，另补充 MDN Curriculum / JavaScript 技能检查、The Odin Project、Go by Example 与 Exercism 5 个文档或课程参考，总共 23 个。新增参考依据与用途见 [知识与练习优化记录](learning-content-upgrade.md)。难度、阶段和建议阅读顺序由本仓库整理；用途依据链接中的实际内容。

## Web 入口

| 入口 | 难度 / 阶段 | 语言 | 核验依据与用法 |
| --- | --- | --- | --- |
| [MDN：你的第一个网站](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website) | 入门 / 起步 | 中文 | 从安排内容开始，串起 HTML、CSS、JavaScript 与发布。适合先做一页能打开的网页。 |
| [MDN：使用 HTML 构建内容](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content) | 入门 / 基础 | 中文 | 介绍文档结构、链接、多媒体和表格，并提供表单入口。先理解元素用途，再记标签。 |
| [MDN：CSS 样式基础](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics) | 基础 / 基础 | 中文 | 中文正文介绍选择器、层叠与继承、盒模型、尺寸与调试；前提是写过一点 HTML 和 CSS。 |
| [web.dev：Learn Responsive Design](https://web.dev/learn/design) | 基础 / 基础 | 英文 | 课程包含媒体查询、页面与组件布局、字体、图片、输入方式和无障碍。优先看与当前页面有关的章节。 |
| [MDN：JavaScript 脚本模块](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting) | 基础 / 基础 | 中文 | 核验时中文正文覆盖条件、循环、函数和事件。开始前需补变量、数组及 HTML / CSS 基础。 |
| [MDN：从服务器获取数据](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Network_requests) | 进阶 / 请求与数据 | 中文 | 展示 Fetch、响应处理和局部更新，示例检查 `response.ok`，并说明本地 HTTP 服务的必要性。 |
| [MDN：无障碍](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility) | 基础 / 页面质量 | 中文 | 包含语义 HTML、CSS / JavaScript、键盘与辅助技术的使用。第一张页面开始就能检查按钮与替代文本。 |

MDN 部分中文页面的正文与新目录标题并未完全同步；因此资料卡只描述核验到的内容。web.dev 的 `?hl=zh-cn` 在本次浏览中转回英文页面，列表按英文标注，没有把语言参数当成中文译文的证据。

## Go 入口

| 入口 | 难度 / 阶段 | 语言 | 核验依据与用法 |
| --- | --- | --- | --- |
| [Go：Download and install](https://go.dev/doc/install) | 入门 / 环境 | 英文 | 提供 Windows、macOS 和 Linux 的安装流程，并要求用 `go version` 验证。下载号以官方入口为准。 |
| [Go：Get started](https://go.dev/doc/tutorial/getting-started) | 入门 / 第一个程序 | 英文 | 介绍 `main`、`import`、`go mod init`、`go run` 和外部模块。每个独立练习在自己的目录中建模块。 |
| [A Tour of Go](https://go.dev/tour/welcome/1) | 入门 / 语法 | 英文 | [Go 官方学习页](https://go.dev/learn/)将其说明为有配套练习的互动教程。Tour 入口可访问，但文本抓取只返回外壳；本次没有声称逐题运行。 |
| [net/http](https://pkg.go.dev/net/http) | 进阶 / HTTP | 英文 | 查 `Handler`、`ServeMux`、`Server` 的签名与限制。参考手册适合随用随查，不要求从头背完。 |
| [Go：Add a test](https://go.dev/doc/tutorial/add-a-test) | 基础 / 测试 | 英文 | 教程使用 `_test.go`、`testing.T` 和 `go test`，同时测试合法输入与空输入。它属于 Create a module 系列，需要先有示例函数。 |
| [Go：Accessing a relational database](https://go.dev/doc/tutorial/database-access) | 进阶 / 持久化 | 英文 | 介绍标准库 `database/sql` 的连接、查询和插入。示例数据库是 MySQL，不能原样当成 PostgreSQL 教程。 |
| [PostgreSQL：The SQL Language](https://www.postgresql.org/docs/current/tutorial-sql.html) | 基础 / SQL | 英文 | 依次覆盖建表、插入、查询、连接、聚合、更新与删除。`current` 在核验时指向 PostgreSQL 18；可从文档的版本切换器看与本机相同的版本。 |
| [Go：Avoiding SQL injection risk](https://go.dev/doc/database/sql-injection) | 进阶 / 安全 | 英文 | 说明把值单独传给查询函数，避免格式化拼接。页面明确提示占位符由数据库和驱动决定，PostgreSQL 可用 `$1`。 |

## 共用入口

| 入口 | 难度 / 阶段 | 语言 | 核验依据与用法 |
| --- | --- | --- | --- |
| [GitHub：Hello World](https://docs.github.com/zh/get-started/using-github/hello-world) | 入门 / 保存与协作 | 中文 | 不要求先会编程或安装 Git，通过网页走完仓库、分支、提交和拉取请求。 |
| [GitHub：创建 Pages 网站](https://docs.github.com/zh/pages/getting-started-with-github-pages/creating-a-github-pages-site) | 基础 / 发布 | 中英混排 | 说明发布源、入口文件与站点查看方式。中文路径中的部分正文仍为英文，语言已据实标注。 |
| [OWASP：Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) | 进阶 / 用户权限 | 英文 | 区分认证和授权，要求默认拒绝、逐请求校验及授权测试。可以转成项目里的两个账号隔离用例。 |

## 审核发现与补充说明

1. **Go 和 Actions 版本已核实。** 教材 Day 27 的 `golang:1.27`、Day 28 的 `actions/checkout@v7` 与 `actions/setup-go@v7` 均有官方依据，无需凭记忆改成旧版。见下表。
2. **方法与路径参数路由有版本要求。** 教材的 `GET /problems/{id}` 和 `r.PathValue("id")` 采用 Go 1.22 起的新路由行为；教材已有相关提醒，网页的环境说明和接口示例应保留这个前提。依据：[ServeMux 兼容性说明](https://pkg.go.dev/net/http#ServeMux)。
3. **数据库教程的差异要写在链接旁。** Go 官方入门使用 MySQL；本仓库练习使用 PostgreSQL。需要转换驱动、连接字符串、参数占位符、自增列与插入返回值，不能只替换连接地址。依据：[Go 数据库教程](https://go.dev/doc/tutorial/database-access)、[参数占位符说明](https://go.dev/doc/database/sql-injection)。
4. **网页预览与接口服务要区分。** 阅读静态教材不需要 Go 后端；练习调用 Go API 时，服务必须实际启动。GitHub Pages 发布 HTML、CSS 和 JavaScript，不能替代 Go 进程或数据库。依据：[GitHub Pages 的用途与限制](https://docs.github.com/zh/pages/getting-started-with-github-pages/what-is-github-pages)。
5. **请求失败不能只留在控制台。** 教材已说明要检查 `response.ok`。学习网页的演示也应能显示请求中、空结果和失败状态，让初学者看出哪里出了问题。MDN 请求教程包含响应检查，并解释本地文件的安全限制；涉及 Fetch 的练习要写清本地服务地址。依据：[MDN 请求教程](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Network_requests)。
6. **学习顺序应配小作品。** MDN 的入门模块以一个小网站串起技术，Go 官方测试教程让正常输入和错误输入一起接受检查。本仓库可据此安排“读一段 → 自己改一处 → 看运行结果 → 留一个问题”。这是课程组织建议，不是官方对本仓库的评价。
7. **登录成功不等于数据隔离。** 教材 Day 24 的所有者检查值得保留。网页中的项目验收应明确两账号读写测试，而不是只勾选“已加 JWT”。依据：[OWASP 权限校验与测试](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)。

### 版本核验表

| 教材用法 | 本次看到的官方证据 | 结论 |
| --- | --- | --- |
| Go 1.27 | [Go Release History](https://go.dev/doc/devel/release)列出 `go1.27.0` 发布于 2026-08-19、`go1.27.2` 发布于 2026-10-08。 | 已发布。安装以官方稳定版本为准；可重现的项目要记录实际 `go version`。 |
| `FROM golang:1.27` | [Docker Hub 官方 golang 镜像](https://hub.docker.com/_/golang)列出 `1.27.2`、`1.27` shared tags，示例直接使用 `FROM golang:1.27`。 | 标签存在。本次核验了文档，没有下载镜像或执行 Docker 构建。 |
| `actions/checkout@v7` | [官方 README](https://github.com/actions/checkout)使用 `@v7`；[latest release](https://github.com/actions/checkout/releases/tag/v7.0.1)为 `v7.0.1`，页面显示 20 Jul。 | `v7` 有官方依据；自托管 runner 还需检查 Node 24 兼容要求。 |
| `actions/setup-go@v7` | [官方 README](https://github.com/actions/setup-go)使用 `@v7`；[latest release](https://github.com/actions/setup-go/releases/tag/v7.0.0)为 `v7.0.0`，页面显示 16 Jul。 | `v7` 有官方依据；README 说明 Node 24 需要 runner 2.327.1 或更高。 |

GitHub release 页在文本视图中只显示日月，表格沿用页面显示，未额外推断完整发布时间。版本入口会更新；后续改教材或运行 CI 时应重新核验。
