// 官方入口核验日期：2026-10-12。核验范围与版本说明见 docs/research-notes.md。
window.LEARNING_RESOURCES = [
  {
    id: "web-first-site",
    track: "web",
    title: "MDN：做出第一个网页",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started/Your_first_website",
    description: "入门。按顺序做一个小网页：安排内容、写 HTML、加 CSS 和交互，再发布。适合还没写过网页的人。",
    stage: "起步",
    language: "中文"
  },
  {
    id: "web-html",
    track: "web",
    title: "MDN：HTML 内容与结构",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content",
    description: "入门。给标题、列表、链接和图片选对元素；边读边整理自己的介绍页。表单内容可从页面中的链接继续学。",
    stage: "基础",
    language: "中文"
  },
  {
    id: "web-css",
    track: "web",
    title: "MDN：CSS 选择器与盒模型",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics",
    description: "基础。适合已经写过一点 CSS 的人。样式不生效时，重点看选择器、优先级、继承和盒模型。",
    stage: "基础",
    language: "中文"
  },
  {
    id: "web-responsive",
    track: "web",
    title: "web.dev：响应式布局",
    url: "https://web.dev/learn/design",
    description: "基础。学过 HTML 和 CSS 后再看。先做媒体查询与页面布局，拿自己的页面检查手机宽度、图片和字体。",
    stage: "基础",
    language: "英文"
  },
  {
    id: "web-javascript",
    track: "web",
    title: "MDN：条件、函数与事件",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting",
    description: "基础。先了解变量和数组，再练条件、循环、函数与点击事件。可以用一个按钮和列表验证每个知识点。",
    stage: "基础",
    language: "中文"
  },
  {
    id: "web-fetch",
    track: "web",
    title: "MDN：从服务器取数据",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Network_requests",
    description: "进阶。用 Fetch 取数据并更新页面。注意检查 response.ok；请求本地文件的例子要通过本地 HTTP 服务运行。",
    stage: "进阶",
    language: "中文"
  },
  {
    id: "web-accessibility",
    track: "web",
    title: "MDN：让页面也能用键盘操作",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility",
    description: "基础。对照自己的页面检查语义元素、图片替代文本和键盘操作。无障碍可以随 HTML、CSS 一起练。",
    stage: "基础",
    language: "中文"
  },
  {
    id: "go-install",
    track: "go",
    title: "Go 官方：安装与验证",
    url: "https://go.dev/doc/install",
    description: "入门。选择自己的操作系统，安装后重新打开终端，运行 go version。下载版本以官方页面为准。",
    stage: "起步",
    language: "英文"
  },
  {
    id: "go-first-program",
    track: "go",
    title: "Go 官方：运行第一个程序",
    url: "https://go.dev/doc/tutorial/getting-started",
    description: "入门。认识 main、import、go.mod 和 go run。每个练习建自己的目录；先弄懂输出从哪一行产生。",
    stage: "起步",
    language: "英文"
  },
  {
    id: "go-tour",
    track: "go",
    title: "A Tour of Go：在线改代码",
    url: "https://go.dev/tour/welcome/1",
    description: "入门。官方互动教程带有练习。一次做一小节，先预测输出，再改代码验证；网页运行需要联网。",
    stage: "基础",
    language: "英文"
  },
  {
    id: "go-http",
    track: "go",
    title: "Go 标准库：net/http",
    url: "https://pkg.go.dev/net/http",
    description: "进阶查阅。写第一个接口时，先查 Handler、ServeMux 和 Server。方法与路径参数的路由写法需要 Go 1.22 或更高版本。",
    stage: "进阶",
    language: "英文"
  },
  {
    id: "go-testing",
    track: "go",
    title: "Go 官方：给函数加测试",
    url: "https://go.dev/doc/tutorial/add-a-test",
    description: "基础。学习 _test.go、testing.T 和 go test。教程接着前面的模块示例，至少写一个正常输入和一个错误输入的用例。",
    stage: "基础",
    language: "英文"
  },
  {
    id: "go-database",
    track: "go",
    title: "Go 官方：连接关系数据库",
    url: "https://go.dev/doc/tutorial/database-access",
    description: "进阶。认识连接、Query、Scan 和插入。官方示例使用 MySQL；本仓库用 PostgreSQL，要调整驱动、占位符和 SQL。",
    stage: "项目",
    language: "英文"
  },
  {
    id: "go-postgresql",
    track: "go",
    title: "PostgreSQL：SQL 动手教程",
    url: "https://www.postgresql.org/docs/current/tutorial-sql.html",
    description: "基础。按建表、插入、查询、连接、更新、删除的顺序练。先在数据库里把 SQL 跑对，再写入 Go 的存储层。",
    stage: "项目",
    language: "英文"
  },
  {
    id: "go-sql-safety",
    track: "go",
    title: "Go 官方：避免 SQL 注入",
    url: "https://go.dev/doc/database/sql-injection",
    description: "进阶。核对参数绑定与字符串拼接的区别。占位符跟驱动有关，PostgreSQL 常见写法是 $1、$2。",
    stage: "安全",
    language: "英文"
  },
  {
    id: "shared-github",
    track: "shared",
    title: "GitHub：分支、提交与拉取请求",
    url: "https://docs.github.com/zh/get-started/using-github/hello-world",
    description: "入门。在网页里走一遍仓库、分支、提交和合并，不要求先会命令行。学完后再用 Git 保存自己的练习。",
    stage: "起步",
    language: "中文"
  },
  {
    id: "shared-pages",
    track: "shared",
    title: "GitHub Pages：发布静态网页",
    url: "https://docs.github.com/zh/pages/getting-started-with-github-pages/creating-a-github-pages-site",
    description: "基础。把 HTML、CSS、JavaScript 页面发布成网站。发布源和入口文件要对应；Go 服务与数据库需要另行部署。",
    stage: "项目",
    language: "中英混排"
  },
  {
    id: "shared-authorization",
    track: "shared",
    title: "OWASP：登录后还要检查权限",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
    description: "进阶。做用户数据时，核对每次请求的权限。用两个账号测试：一个人不能读取、修改或删除另一个人的记录。",
    stage: "安全",
    language: "英文"
  }
];
