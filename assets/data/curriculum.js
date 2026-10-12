// 课程卡片为补充讲解；sourceMarkdown/sourceSection保留对应教材原文。
// 完成状态由学习者实际验收后记录，课程数据不预设任何任务已完成。
window.LEARNING_CURRICULUM = {
  "web": {
    "title": "Web开发",
    "description": "先用14天做出能在手机上阅读的静态网页；随后补JavaScript、请求与部署，再选择前端或全栈路线。",
    "stages": [
      {
        "id": "web-start",
        "title": "先做一张页面",
        "range": "Day 01–07",
        "description": "HTML、CSS与Flexbox，做出社团首页并独立重建一次。",
        "lessonIds": [
          "web-01",
          "web-02",
          "web-03",
          "web-04",
          "web-05",
          "web-06",
          "web-07"
        ]
      },
      {
        "id": "web-layout",
        "title": "让页面方便使用",
        "range": "Day 08–14",
        "description": "Grid、手机适配、表单与键盘操作，完成自己的招新页。",
        "lessonIds": [
          "web-08",
          "web-09",
          "web-10",
          "web-11",
          "web-12",
          "web-13",
          "web-14"
        ]
      },
      {
        "id": "web-common",
        "title": "补上交互与上线",
        "range": "第3–8周",
        "description": "两周之后继续布局、JavaScript、DOM、请求、Git与部署，见后续课程。",
        "lessonIds": []
      },
      {
        "id": "web-frontend",
        "title": "选择前端路线",
        "range": "第9–20周",
        "description": "TypeScript、一个前端框架、测试和作品集；不用同时学React与Vue。",
        "lessonIds": []
      },
      {
        "id": "web-fullstack",
        "title": "选择全栈路线",
        "range": "第9–24周",
        "description": "前端、API、SQL、账号权限与部署；后端可沿用Go路线。",
        "lessonIds": []
      }
    ],
    "lessons": [
      {
        "id": "web-01",
        "day": 1,
        "minutes": 90,
        "stageId": "web-start",
        "concepts": [
          "浏览器、HTML 文件与网页的关系",
          "doctype、head、body、title、charset",
          "标题 h1/h2、段落 p、基本标签嵌套"
        ],
        "starterCode": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>算法社团｜首页</title>\n</head>\n<body>\n  <h1>算法社团</h1>\n  <p>我们一起学习算法、参加比赛。</p>\n  <h2>关于我们</h2>\n  <p>每周组织一次训练。</p>\n  <h2>近期活动</h2>\n  <p>本周六：基础图论交流。</p>\n</body>\n</html>",
        "language": "html",
        "sourceMarkdown": "### Day 01｜认识 Web + 创建第一张 HTML\n**知识要点**\n- [ ] 浏览器、HTML 文件与网页的关系\n- [ ] doctype、head、body、title、charset\n- [ ] 标题 h1/h2、段落 p、基本标签嵌套\n**动手任务**：创建 web-study/index.html，写出社团标题、简介、两个板块并在浏览器打开。\n**验收**：能说清 title 和 h1 的区别；不看示例写出基础 HTML 骨架。\n- [ ] Day 01 当日完成并记录练习结果\n**容易踩坑**：不要把文件误存为 .html.txt。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜浏览器、HTML 文件与网页的关系**\n\n浏览器不是直接执行 HTML 里的中文说明，而是解析标签，建立 DOM 树，然后把内容绘制到屏幕。双击 index.html 使用 file:// 打开；日后接入接口时通常改用本地开发服务器（http://localhost）。\n\n**知识点 2｜doctype、head、body、title、charset**\n\n<!DOCTYPE html> 声明按现代 HTML 标准解析；html 包含整份文档；head 保存元数据，body 保存页面内容。meta charset=\"UTF-8\" 避免乱码；viewport 让手机按设备宽度布局。\n\n**知识点 3｜标题 h1/h2、段落 p、基本标签嵌套**\n\nh1 是页面最高层级标题，h2 用于大板块，p 用于一段完整的话。标题不是用来随便放大字体的：应保持合理层级并成对闭合标签。\n\n**跟写示例：index.html**\n\n```html\n<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>算法社团｜首页</title>\n</head>\n<body>\n  <h1>算法社团</h1>\n  <p>我们一起学习算法、参加比赛。</p>\n  <h2>关于我们</h2>\n  <p>每周组织一次训练。</p>\n  <h2>近期活动</h2>\n  <p>本周六：基础图论交流。</p>\n</body>\n</html>\n```\n\n**分步实践**\n\n1. 创建 web-study 文件夹，并用 VS Code 打开。\n2. 新建 index.html，输入示例并保存为 UTF-8。\n3. 双击打开网页，修改 h1 后刷新，观察变化。\n4. 把 title 改为“我的社团网站”，看浏览器标签页变化；最后新增“联系我们”板块。\n\n**自测问题**：为什么修改 <title> 不会把网页正文里的大标题一起修改？\n**参考解释**：title 是 head 中的文档元信息，通常用于浏览器标签页；正文标题属于 body 中的 h1，两者是不同的元素。\n**排错提示**：看见源代码而不是页面？检查扩展名是否真为 .html、是否在浏览器里打开。",
        "title": "写出第一张网页",
        "summary": "新建一个 HTML 文件，让社团介绍真正出现在浏览器里。",
        "task": "在 exercises/web/day-01 新建 index.html，写社团名称、简介、两个板块；改一次标题并刷新。",
        "checks": [
          "浏览器能打开页面，中文没有乱码",
          "能指出 title 和 h1 分别出现在什么位置",
          "关闭示例后能写出 head 与 body"
        ],
        "hint": "先检查文件名真的以 .html 结尾，保存后刷新浏览器。",
        "quiz": {
          "question": "改了 title，正文的大标题为什么没变？",
          "options": [
            "浏览器没有加载 CSS",
            "title 是标签页标题，正文由 h1 显示",
            "必须同时修改文件名"
          ],
          "answer": 1,
          "explanation": "title 位于 head，描述文档；h1 位于 body，是页面正文。它们是两个元素。"
        }
      },
      {
        "id": "web-02",
        "day": 2,
        "minutes": 90,
        "stageId": "web-start",
        "concepts": [
          "a href 的地址、锚点与相对路径",
          "img src/alt 的含义",
          "header/nav/main/section/footer 的使用"
        ],
        "starterCode": "<header>\n  <h1>算法社团</h1>\n  <nav aria-label=\"页面导航\">\n    <a href=\"#about\">关于我们</a>\n    <a href=\"#events\">近期活动</a>\n  </nav>\n</header>\n<main>\n  <section id=\"about\"><h2>关于我们</h2><p>欢迎参加训练。</p></section>\n  <section id=\"events\">\n    <h2>近期活动</h2>\n    <img src=\"images/training.jpg\" alt=\"社团成员在机房讨论算法题\" width=\"420\">\n  </section>\n</main>\n<footer><p>2026 算法社团</p></footer>",
        "language": "html",
        "sourceMarkdown": "### Day 02｜链接、图片与语义化页面\n**知识要点**\n- [ ] a href 的地址、锚点与相对路径\n- [ ] img src/alt 的含义\n- [ ] header/nav/main/section/footer 的使用\n**动手任务**：添加顶部导航、活动图和联系我们；使用 #events 跳转活动板块。\n**验收**：导航可跳转；移走一张图片后能定位路径错误；图片有合适 alt。\n- [ ] Day 02 当日完成并记录练习结果\n**容易踩坑**：图片地址大小写和相对路径经常出错。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜a href 的地址、锚点与相对路径**\n\na 是可以导航的链接。href=\"https://...\" 指向网址；href=\"about.html\" 指向同目录文件；href=\"#events\" 跳到当前页面 id=\"events\" 的位置。路径是相对于当前 HTML 文件计算的。\n\n**知识点 2｜img src/alt 的含义**\n\nimg 用 src 告诉浏览器去哪找文件，用 alt 描述图片信息。图片加载失败时 alt 有帮助，使用读屏器的人也会读到它；纯装饰图可用 alt=\"\"，但有意义的图片不要留空。\n\n**知识点 3｜header/nav/main/section/footer 的使用**\n\nheader 表示页眉，nav 是主要导航，main 是主要内容，section 是主题板块，footer 是页脚。这些标签有语义，不是浏览器自动帮你做好外观。\n\n**跟写示例：index.html（插入到 body）**\n\n```html\n<header>\n  <h1>算法社团</h1>\n  <nav aria-label=\"页面导航\">\n    <a href=\"#about\">关于我们</a>\n    <a href=\"#events\">近期活动</a>\n  </nav>\n</header>\n<main>\n  <section id=\"about\"><h2>关于我们</h2><p>欢迎参加训练。</p></section>\n  <section id=\"events\">\n    <h2>近期活动</h2>\n    <img src=\"images/training.jpg\" alt=\"社团成员在机房讨论算法题\" width=\"420\">\n  </section>\n</main>\n<footer><p>2026 算法社团</p></footer>\n```\n\n**分步实践**\n\n1. 在 web-study 内创建 images 文件夹，放一张你有使用权的照片并命名 training.jpg。\n2. 将 h1 和导航放入 header，把主要板块放到 main。\n3. 给两个 section 各设置唯一 id，测试导航的锚点跳转。\n4. 故意把 src 改错，再打开开发者工具 Console/Network 查看失败的图片请求。\n\n**自测问题**：index.html 位于网站根目录，照片位于 images/a.png，src 应怎样写？\n**参考解释**：写成 src=\"images/a.png\"（或 ./images/a.png）。图片路径相对于 index.html 所在目录。\n**排错提示**：不要把本地绝对路径 C:\\Users\\... 写入网页：别人电脑上没有这条路径。",
        "title": "把页面连起来",
        "summary": "用链接、图片和语义标签，让首页有导航和清楚的结构。",
        "task": "加上页眉、导航、活动区和页脚；导航链接到 #events；放一张有使用权的活动照片。",
        "checks": [
          "点击导航能到达对应板块",
          "图片使用相对路径，并有合适的 alt",
          "故意改错图片路径后能在 Network 找到失败请求"
        ],
        "hint": "图片路径相对于 HTML 文件；别写你电脑里的 C:\\Users\\... 地址。",
        "quiz": {
          "question": "index.html 同级有 images/a.png，图片路径该写什么？",
          "options": [
            "images/a.png",
            "C:\\Users\\a.png",
            "../a.png"
          ],
          "answer": 0,
          "explanation": "从 index.html 所在目录进入 images，再找到 a.png。部署后这条相对路径仍能使用。"
        }
      },
      {
        "id": "web-03",
        "day": 3,
        "minutes": 90,
        "stageId": "web-start",
        "concepts": [
          "link 引入 style.css",
          "标签、类、伪类选择器",
          "颜色、字体、行高、背景、继承"
        ],
        "starterCode": "/* index.html 的 head 加：<link rel=\"stylesheet\" href=\"style.css\"> */\nbody { font-family: Arial, sans-serif; background: #f6f8f8; color: #263238; }\nh1 { color: #136b59; }\nsection { background: white; padding: 16px; margin: 16px 0; }\nsection p { line-height: 1.8; }\n.highlight { color: #b34333; font-weight: bold; }",
        "language": "css",
        "sourceMarkdown": "### Day 03｜CSS 选择器与文本排版\n**知识要点**\n- [ ] link 引入 style.css\n- [ ] 标签、类、伪类选择器\n- [ ] 颜色、字体、行高、背景、继承\n**动手任务**：把样式放到 style.css，统一标题颜色、背景色、段落行高。\n**验收**：可以用类名只修改一个板块的样式；解释 CSS 与 HTML 分工。\n- [ ] Day 03 当日完成并记录练习结果\n**容易踩坑**：别把所有样式都写成 style=\"...\"。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜link 引入 style.css**\n\nHTML 决定“是什么”，CSS 决定“长什么样”。用 <link rel=\"stylesheet\" href=\"style.css\"> 在 head 中连接样式文件；同目录才能直接这样写。\n\n**知识点 2｜标签、类、伪类选择器**\n\nh1 匹配所有一级标题；.card 匹配 class=\"card\" 的元素；.card:hover 只匹配悬停状态。优先使用 class 写组件外观，少用过长的选择器链。\n\n**知识点 3｜颜色、字体、行高、背景、继承**\n\ncolor 修改文字色，background-color 修改背景；font-size 是字号、line-height 是行高。子元素可能继承字体属性，但一般不会继承 padding 或 border。\n\n**跟写示例：style.css**\n\n```css\n/* index.html 的 head 加：<link rel=\"stylesheet\" href=\"style.css\"> */\nbody { font-family: Arial, sans-serif; background: #f6f8f8; color: #263238; }\nh1 { color: #136b59; }\nsection { background: white; padding: 16px; margin: 16px 0; }\nsection p { line-height: 1.8; }\n.highlight { color: #b34333; font-weight: bold; }\n```\n\n**分步实践**\n\n1. 创建 style.css，在 index.html 的 head 引入。\n2. 复制样式，刷新页面确认 h1 变色。\n3. 在一个段落中加入 class=\"highlight\"，只修改这个段落的文字颜色。\n4. 故意写错 href 文件名，利用 DevTools Network 找到 style.css 404 或文件读取失败原因。\n\n**自测问题**：只希望“近期活动”板块有蓝色标题，应该修改所有 h2 还是给该标题加类？\n**参考解释**：优先给这个标题一个单独的 class，再写 .类名 选择器；修改所有 h2 会影响其他板块。\n**排错提示**：选择器写 .card 时，HTML 应是 class=\"card\"，不是 id=\"card\"。",
        "title": "给网页加上样式",
        "summary": "把外观放到独立 CSS 文件，学会只修改想修改的元素。",
        "task": "建立 style.css 并在 head 引入；统一背景、文字和行高，再只给活动标题一种强调色。",
        "checks": [
          "CSS 文件正常加载",
          "只有目标标题变色，其他标题不受影响",
          "能说明 class 选择器与 HTML 类名如何对应"
        ],
        "hint": "先检查 link 的 href 和文件位置，再检查 .类名是否与 class 一致。",
        "quiz": {
          "question": "只想把一个活动标题变蓝，应该怎么做？",
          "options": [
            "修改所有 h2",
            "给标题加类，再写对应选择器",
            "把标题换成 div"
          ],
          "answer": 1,
          "explanation": "类选择器可以限定目标。直接改 h2 会影响页面上所有匹配的二级标题。"
        }
      },
      {
        "id": "web-04",
        "day": 4,
        "minutes": 90,
        "stageId": "web-start",
        "concepts": [
          "margin / padding / border / content",
          "width 与 box-sizing:border-box",
          "块级元素和行内元素的差别"
        ],
        "starterCode": "* { box-sizing: border-box; }\n.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #d9e1e0;\n  margin: 16px 0;\n  background: white;\n  border-radius: 12px;\n}\n.card h3 { margin-top: 0; }",
        "language": "css",
        "sourceMarkdown": "### Day 04｜盒模型：间距为什么不听话\n**知识要点**\n- [ ] margin / padding / border / content\n- [ ] width 与 box-sizing:border-box\n- [ ] 块级元素和行内元素的差别\n**动手任务**：制作第一张活动卡片，包含标题、日期、说明、按钮。\n**验收**：能用 DevTools 看出卡片最终宽度和四种间距。\n- [ ] Day 04 当日完成并记录练习结果\n**容易踩坑**：不要用几十个空格或多个 br 当布局。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜margin / padding / border / content**\n\n浏览器里的每个元素都占据一个矩形盒子：内容 content → 内边距 padding → 边框 border → 外边距 margin。padding 在盒子内；margin 在盒子外，不属于背景区域。\n\n**知识点 2｜width 与 box-sizing:border-box**\n\n默认 content-box 的 width 只算内容宽度，padding/border 会额外增加总宽；box-sizing:border-box 会把 padding/border 纳入已设置的 width，更易控制布局。\n\n**知识点 3｜块级元素和行内元素的差别**\n\ndiv、section 默认通常独占一行；span、a 是常见行内元素，通常随文字排列。display 属性可以改变表现，但语义由标签本身决定。\n\n**跟写示例：style.css**\n\n```css\n* { box-sizing: border-box; }\n.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #d9e1e0;\n  margin: 16px 0;\n  background: white;\n  border-radius: 12px;\n}\n.card h3 { margin-top: 0; }\n```\n\n**分步实践**\n\n1. 在 HTML 新增 <article class=\"card\">，包含标题、时间和说明。\n2. 按代码设置宽 300px、padding 20px、border 1px。\n3. 在浏览器 DevTools 的 Computed → Box Model 查看各层数值。\n4. 暂时删掉 box-sizing，比较卡片总宽是 300px 还是 342px，再恢复。\n\n**自测问题**：width:300px；左右 padding 各 20px；左右 border 各 1px，默认 content-box 的总宽是多少？\n**参考解释**：342px：300 + 20×2 + 1×2。设置 border-box 后，总宽变为 300px。\n**排错提示**：margin 的垂直折叠会造成距离“不按加法计算”；先检查实际盒模型，不要盲目调大数字。",
        "title": "弄清卡片的间距",
        "summary": "用盒模型解释宽度和留白，再做一张活动卡片。",
        "task": "做一张含标题、时间和说明的卡片；设置宽 300px、padding 20px、border 1px，并比较两种 box-sizing。",
        "checks": [
          "在 DevTools 找到 content、padding、border、margin",
          "能计算 content-box 的总宽 342px",
          "改为 border-box 后总宽为 300px"
        ],
        "hint": "先看 Computed 里的盒模型数值。margin 在盒子外，padding 在盒子内。",
        "quiz": {
          "question": "默认 content-box：width 300px，左右 padding 各20px，左右 border 各1px，总宽是多少？",
          "options": [
            "300px",
            "340px",
            "342px"
          ],
          "answer": 2,
          "explanation": "总宽是 300 + 20×2 + 1×2 = 342px。border-box 会把 padding 与 border 包含在设定宽度内。"
        }
      },
      {
        "id": "web-05",
        "day": 5,
        "minutes": 90,
        "stageId": "web-start",
        "concepts": [
          "display:flex 与主轴/交叉轴",
          "justify-content、align-items、gap",
          "flex-wrap、flex-grow 基本含义"
        ],
        "starterCode": "* { box-sizing: border-box; }\n.topbar { display: flex; align-items: center; gap: 20px; }\n.topbar nav { margin-left: auto; display: flex; gap: 14px; flex-wrap: wrap; }\n.topbar a { color: #136b59; text-decoration: none; }\n@media (max-width: 600px) {\n  .topbar { align-items: flex-start; flex-direction: column; }\n  .topbar nav { margin-left: 0; }\n}",
        "language": "css",
        "sourceMarkdown": "### Day 05｜Flexbox：导航和横向排列\n**知识要点**\n- [ ] display:flex 与主轴/交叉轴\n- [ ] justify-content、align-items、gap\n- [ ] flex-wrap、flex-grow 基本含义\n**动手任务**：让 logo 与导航分列，导航链接排列整齐，窄屏可换行。\n**验收**：无需大量 position:absolute 即可完成导航布局。\n- [ ] Day 05 当日完成并记录练习结果\n**容易踩坑**：justify-content 控制主轴，不一定是水平方向。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜display:flex 与主轴/交叉轴**\n\nFlexbox 负责单维排列：一排或一列。给父元素 display:flex，子元素自动参与 Flex 布局；默认主轴水平向右（direction:row），修改方向后主轴也会改变。\n\n**知识点 2｜justify-content、align-items、gap**\n\njustify-content 控制主轴方向的排列，align-items 控制交叉轴方向的对齐。flex-direction:column 时，justify-content 不再是“水平对齐”。\n\n**知识点 3｜flex-wrap、flex-grow 基本含义**\n\ngap 是项目之间的间隔；flex-wrap:wrap 允许空间不足时换行；flex:1 常用来让某个区域占据剩余空间，不等于写死宽度。\n\n**跟写示例：style.css**\n\n```css\n* { box-sizing: border-box; }\n.topbar { display: flex; align-items: center; gap: 20px; }\n.topbar nav { margin-left: auto; display: flex; gap: 14px; flex-wrap: wrap; }\n.topbar a { color: #136b59; text-decoration: none; }\n@media (max-width: 600px) {\n  .topbar { align-items: flex-start; flex-direction: column; }\n  .topbar nav { margin-left: 0; }\n}\n```\n\n**分步实践**\n\n1. 给 header 加 class=\"topbar\"，其中放社团名称与 nav。\n2. 写 display:flex 和 gap，观察导航如何排列。\n3. 把 flex-direction 改成 column，验证两个对齐属性的作用。\n4. 缩窄窗口，看链接何时拥挤；再试 flex-wrap 和示例里的媒体查询。\n\n**自测问题**：当 flex-direction:column 时，justify-content 控制水平还是垂直方向？\n**参考解释**：主轴改为纵向，所以 justify-content 控制纵向分布；align-items 控制横向对齐。\n**排错提示**：给单个元素 text-align:center 不能取代父元素 Flexbox 对多个子元素的布局。",
        "title": "排好页眉和导航",
        "summary": "让社团名称和导航自然排列，并在窄屏换行。",
        "task": "用 Flexbox 排列页眉和导航；把方向暂时改成 column，观察对齐变化，再加窄屏布局。",
        "checks": [
          "大屏名称与导航排列清楚",
          "缩窄后导航不会重叠",
          "能说出主轴改变后 justify-content 控制什么方向"
        ],
        "hint": "display:flex 写在父元素上；先确认 flex-direction，再判断对齐方向。",
        "quiz": {
          "question": "flex-direction:column 时，justify-content 控制什么方向？",
          "options": [
            "垂直方向",
            "水平方向",
            "文字方向"
          ],
          "answer": 0,
          "explanation": "column 把主轴改为纵向。justify-content 管主轴，align-items 管交叉轴。"
        }
      },
      {
        "id": "web-06",
        "day": 6,
        "minutes": 90,
        "stageId": "web-start",
        "concepts": [
          "类名复用与组合",
          "卡片图片 object-fit 和圆角",
          "按钮/链接 hover 与 focus 状态"
        ],
        "starterCode": ".cards { display: flex; gap: 16px; flex-wrap: wrap; }\n.card { flex: 1 1 230px; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; }\n.card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }\n.card-content { padding: 16px; }\n.card a { color: #136b59; }\n.card a:hover { text-decoration: underline; }\n.card a:focus-visible { outline: 3px solid #ffb347; outline-offset: 4px; }",
        "language": "css",
        "sourceMarkdown": "### Day 06｜CSS 组合练习：活动区\n**知识要点**\n- [ ] 类名复用与组合\n- [ ] 卡片图片 object-fit 和圆角\n- [ ] 按钮/链接 hover 与 focus 状态\n**动手任务**：做 3 张风格一致的活动卡片，并加入可见的焦点样式。\n**验收**：三个卡片的内边距一致；Tab 键能看到当前焦点。\n- [ ] Day 06 当日完成并记录练习结果\n**容易踩坑**：别给纯装饰 div 加上假的按钮行为。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜类名复用与组合**\n\n同类卡片共享 .card 样式，内容可以不同。CSS 的复用原则是“同样的结构同样的类”，不要为三张卡片各复制一次相同声明。\n\n**知识点 2｜卡片图片 object-fit 和圆角**\n\nobject-fit:cover 可以让图片填充固定比例的区域并裁剪边缘；它不会改变图片原文件的内容。对内容重要的图片，裁剪前注意不要截掉关键信息。\n\n**知识点 3｜按钮/链接 hover 与 focus 状态**\n\n鼠标可看到 :hover，但键盘用户通常依赖 :focus-visible。链接用 a，提交或动作使用 button；具有功能的元素不应该伪装成普通 div。\n\n**跟写示例：style.css**\n\n```css\n.cards { display: flex; gap: 16px; flex-wrap: wrap; }\n.card { flex: 1 1 230px; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; }\n.card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }\n.card-content { padding: 16px; }\n.card a { color: #136b59; }\n.card a:hover { text-decoration: underline; }\n.card a:focus-visible { outline: 3px solid #ffb347; outline-offset: 4px; }\n```\n\n**分步实践**\n\n1. 用同一个 .card 结构写三张不同内容的活动卡片。\n2. 给卡片容器加 .cards 类，使用 Flexbox 排列。\n3. 给每张图片设置 16:9 的展示比例，观察是否拉伸。\n4. 不断按 Tab，在三个活动链接之间移动，确认焦点清晰可见。\n\n**自测问题**：应该把打开“活动详情页”的元素写成 a 还是 button？\n**参考解释**：导航到另一个页面或 URL 应用 <a href=\"...\">；触发当前页动作才主要用 <button>。\n**排错提示**：不要只写 :hover 忘了键盘焦点；也不要把可点击卡片实现为没有键盘支持的 div。",
        "title": "做一组能复用的卡片",
        "summary": "三张活动卡片共用样式，同时照顾图片和键盘操作。",
        "task": "用同一套 .card 结构做三张活动卡片；图片按16:9显示；活动链接加 hover 与 focus-visible。",
        "checks": [
          "三张卡片内边距一致",
          "图片没有拉伸变形",
          "用 Tab 能看到每个链接的焦点"
        ],
        "hint": "导航到另一页用 a，触发当前页动作用 button；先保留元素原本的键盘能力。",
        "quiz": {
          "question": "打开活动详情页的控件适合用什么？",
          "options": [
            "没有键盘事件的 div",
            "a 元素加 href",
            "不带事件的 span"
          ],
          "answer": 1,
          "explanation": "页面导航适合使用链接。a 原生支持键盘聚焦、打开新标签页等浏览器行为。"
        }
      },
      {
        "id": "web-07",
        "day": 7,
        "minutes": 120,
        "stageId": "web-start",
        "concepts": [
          "HTML 标题层级和语义检查",
          "盒模型与 Flexbox 复盘",
          "文件路径、浏览器开发工具"
        ],
        "starterCode": "# 算法社团静态首页\n\n## 打开方法\n用浏览器打开 `index.html`。\n\n## 已完成\n- 顶部导航和页面锚点\n- 三张活动卡片\n- HTML/CSS 文件分离\n\n## 已知限制\n- 尚未连接后端，不能真正提交报名数据\n- 手机端布局下周继续优化",
        "language": "text",
        "sourceMarkdown": "### Day 07｜第 1 周阶段验收\n**知识要点**\n- [ ] HTML 标题层级和语义检查\n- [ ] 盒模型与 Flexbox 复盘\n- [ ] 文件路径、浏览器开发工具\n**动手任务**：关闭参考资料，独立重建社团首页的页眉、介绍、活动卡片、页脚。\n**验收**：从空文件做出完整初版；在 README 写明如何打开与当前缺点。\n- [ ] Day 07 当日完成并记录练习结果\n**容易踩坑**：复现失败的部分才是下一周要补的知识。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜HTML 标题层级和语义检查**\n\n检查标题结构：页面核心标题一般有一个 h1，各主要板块用 h2，板块内活动标题用 h3。语义顺序有助于阅读理解与辅助技术。\n\n**知识点 2｜盒模型与 Flexbox 复盘**\n\n盒模型解决“卡片内部与外部留白”，Flexbox 解决“一排多个元素如何排列”；它们解决的问题不同，需要组合使用。\n\n**知识点 3｜文件路径、浏览器开发工具**\n\n网页打开不等于没有问题。浏览器 F12 的 Elements 检查结构，Console 查 JS/资源错误，Network 看实际加载请求；记录现象和修复。\n\n**跟写示例：README.md**\n\n```md\n# 算法社团静态首页\n\n## 打开方法\n用浏览器打开 `index.html`。\n\n## 已完成\n- 顶部导航和页面锚点\n- 三张活动卡片\n- HTML/CSS 文件分离\n\n## 已知限制\n- 尚未连接后端，不能真正提交报名数据\n- 手机端布局下周继续优化\n```\n\n**分步实践**\n\n1. 暂时关闭参考文件，从空白 HTML 文档重建页眉、主内容和页脚。\n2. 只在卡住的时候查前六天的概念讲义，标记卡住了哪一个知识点。\n3. 完成后用 F12 检查图片、锚点和样式；至少修改一次自己发现的问题。\n4. 写一份 README，明确运行方法、已完成和待做功能。\n\n**自测问题**：为什么“能看到三张卡片”还不能证明你学会了 HTML/CSS？\n**参考解释**：还要能解释代码里的结构、布局原因，并在不复制模板的情况下完成类似页面、定位路径或样式错误。\n**排错提示**：本日侧重独立复现；允许查文档，但不要让 AI 一次性生成完整作业。",
        "title": "从空白重做一次",
        "summary": "关掉示例，独立重建首页，找出还没掌握的地方。",
        "task": "从空文件重建页眉、介绍、活动卡片和页脚；只在卡住时查文档，写 README 说明打开方法与限制。",
        "checks": [
          "页面不依赖复制完整旧代码",
          "图片与锚点均有效",
          "README 能让另一人打开网页，并说明未接后端"
        ],
        "hint": "卡住不代表失败。记录你卡在哪一层：结构、路径还是布局，下一次只补这一处。",
        "quiz": {
          "question": "哪一种证据更能说明你掌握了这一周？",
          "options": [
            "看完了全部讲义",
            "截图里有三张卡片",
            "能独立重建并解释布局，修复资源错误"
          ],
          "answer": 2,
          "explanation": "阅读和截图只是部分证据。独立实现、解释和排错才检验知识能否用起来。"
        }
      },
      {
        "id": "web-08",
        "day": 8,
        "minutes": 90,
        "stageId": "web-layout",
        "concepts": [
          "display:grid 与 grid-template-columns",
          "repeat/minmax/gap",
          "Grid 与 Flex 的使用边界"
        ],
        "starterCode": ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));\n  gap: 20px;\n}\n.card { min-width: 0; padding: 20px; background: white; border: 1px solid #ddd; }\n.card h3 { overflow-wrap: anywhere; }",
        "language": "css",
        "sourceMarkdown": "### Day 08｜Grid：多列布局不靠手算\n**知识要点**\n- [ ] display:grid 与 grid-template-columns\n- [ ] repeat/minmax/gap\n- [ ] Grid 与 Flex 的使用边界\n**动手任务**：把活动区改成桌面 3 列、窄屏能自动换行的卡片网格。\n**验收**：增加第四张卡片时不必手工重新计算每个宽度。\n- [ ] Day 08 当日完成并记录练习结果\n**容易踩坑**：能用 Grid 就别用绝对定位写三列。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜display:grid 与 grid-template-columns**\n\nGrid 是二维布局：同时安排列和行。display:grid 给父容器建立网格，grid-template-columns 定义列宽，gap 定义格子间距。\n\n**知识点 2｜repeat/minmax/gap**\n\nrepeat(3,1fr) 代表三列均分；minmax(最小,最大) 控制列宽区间，auto-fit 能在容器变窄时减少列数。\n\n**知识点 3｜Grid 与 Flex 的使用边界**\n\n导航通常按一维排布适合 Flexbox；活动卡片横纵都有规则，Grid 更直观。两者不是“谁更高级”，而是适用场景不同。\n\n**跟写示例：style.css**\n\n```css\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));\n  gap: 20px;\n}\n.card { min-width: 0; padding: 20px; background: white; border: 1px solid #ddd; }\n.card h3 { overflow-wrap: anywhere; }\n```\n\n**分步实践**\n\n1. 将 Day 6 的活动容器从 flex 改为 grid。\n2. 添加第四、第五张活动卡片，不修改列数。\n3. 把浏览器从 1440px 拖到 375px，观察每行卡片个数变化。\n4. 尝试改成 repeat(3,1fr)，观察窄屏如何挤压，再改回自适应。\n\n**自测问题**：Grid 的 1fr 是固定 1 像素吗？\n**参考解释**：不是。fr 表示网格容器里可分配空间的份额，多个 1fr 列通常等比例分配剩余空间。\n**排错提示**：固定三列的 Grid 在手机上可能会拥挤；根据内容宽度调整列数。",
        "title": "让卡片自己排成网格",
        "summary": "把活动区改成 Grid，卡片数量和窗口宽度变化时不用重算。",
        "task": "把活动容器改为 Grid，增加第四、第五张卡片；从1440px缩到375px观察列数。",
        "checks": [
          "新增卡片不用逐个改宽度",
          "窄屏卡片正常换行",
          "能说明导航和卡片区为何适合不同布局工具"
        ],
        "hint": "把 Grid 写在卡片容器上。固定三列拥挤时，试 auto-fit 与 minmax。",
        "quiz": {
          "question": "Grid 里的 1fr 表示什么？",
          "options": [
            "剩余可分配空间的一份",
            "固定1像素",
            "浏览器宽度的百分之一"
          ],
          "answer": 0,
          "explanation": "fr 是可分配空间的比例单位。多个 1fr 列会按相等份额分配空间。"
        }
      },
      {
        "id": "web-09",
        "day": 9,
        "minutes": 90,
        "stageId": "web-layout",
        "concepts": [
          "viewport、相对尺寸、max-width",
          "@media 的基础语法",
          "内容驱动的断点设计"
        ],
        "starterCode": "body { margin: 0; }\n.container { width: min(100% - 32px, 1080px); margin-inline: auto; }\n.intro { display: grid; grid-template-columns: 2fr 1fr; gap: 28px; }\nimg { max-width: 100%; height: auto; }\n@media (max-width: 680px) {\n  .intro { grid-template-columns: 1fr; }\n}",
        "language": "css",
        "sourceMarkdown": "### Day 09｜响应式与媒体查询\n**知识要点**\n- [ ] viewport、相对尺寸、max-width\n- [ ] @media 的基础语法\n- [ ] 内容驱动的断点设计\n**动手任务**：实现桌面多列、手机单列的首页布局。\n**验收**：在 360px、768px 和 1440px 都没有页面横向溢出。\n- [ ] Day 09 当日完成并记录练习结果\n**容易踩坑**：响应式不只是把文字缩小。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜viewport、相对尺寸、max-width**\n\n响应式目标是让内容在不同宽度都可读。viewport 元信息让移动浏览器正确按设备宽度计算布局；max-width 防止大屏内容无限拉宽。\n\n**知识点 2｜@media 的基础语法**\n\n@media (max-width: 640px) 表示视口宽度不超过 640px 时生效；断点依据内容什么时候出现拥挤选取，而不是死记手机型号。\n\n**知识点 3｜内容驱动的断点设计**\n\n常用相对单位有 %、rem、vw。宽度建议用 width:100% 配合 max-width；小屏要考虑外边距、图片宽度与长单词。\n\n**跟写示例：style.css**\n\n```css\nbody { margin: 0; }\n.container { width: min(100% - 32px, 1080px); margin-inline: auto; }\n.intro { display: grid; grid-template-columns: 2fr 1fr; gap: 28px; }\nimg { max-width: 100%; height: auto; }\n@media (max-width: 680px) {\n  .intro { grid-template-columns: 1fr; }\n}\n```\n\n**分步实践**\n\n1. 把页面内容放进 class=\"container\" 的容器。\n2. 大屏为简介区域设置 2:1 两列；窄屏改为单列。\n3. 使用 DevTools 设备模拟分别检查 360px、768px、1440px。\n4. 找到第一次出现重叠或横向滚动的宽度，说明你选断点的理由。\n\n**自测问题**：响应式是不是给每种手机型号写一个 @media？\n**参考解释**：不是。按页面内容的承载能力选择少量必要断点，配合弹性宽度和自适应布局，避免为机型逐一硬编码。\n**排错提示**：不要为隐藏错误而给 body 随手加 overflow-x:hidden；先定位超宽元素。",
        "title": "让手机也能读",
        "summary": "用弹性宽度和媒体查询，让首页在不同屏幕上保持清楚。",
        "task": "给首页加最大宽度和左右留白；桌面简介两列、手机单列；检查360、768、1440px。",
        "checks": [
          "三个测试宽度均无横向溢出",
          "图片随容器缩放",
          "能说明选择断点的内容依据"
        ],
        "hint": "找到内容第一次拥挤的宽度，再加断点。不要先用 overflow-x:hidden 遮住问题。",
        "quiz": {
          "question": "媒体查询的断点通常怎么选？",
          "options": [
            "为每个手机型号写一套",
            "根据内容开始拥挤的位置",
            "只用屏幕分辨率越大越好"
          ],
          "answer": 1,
          "explanation": "断点服务于内容布局。弹性尺寸配合少量必要断点，比逐个适配机型更易维护。"
        }
      },
      {
        "id": "web-10",
        "day": 10,
        "minutes": 90,
        "stageId": "web-layout",
        "concepts": [
          "字体大小、行高、可读行长",
          "颜色对比与间距系统",
          "卡片信息层级与留白"
        ],
        "starterCode": ":root { --brand: #156a5a; --text: #243333; --muted: #526866;\n  --surface: #fff; --page: #f4f7f6; --space: 16px; }\nbody { background: var(--page); color: var(--text); line-height: 1.7; }\n.container { max-width: 1040px; margin: auto; padding: 0 var(--space); }\nh1 { font-size: clamp(28px, 5vw, 44px); line-height: 1.2; }\np { max-width: 70ch; }\n.muted { color: var(--muted); }",
        "language": "css",
        "sourceMarkdown": "### Day 10｜文字、颜色和视觉层次\n**知识要点**\n- [ ] 字体大小、行高、可读行长\n- [ ] 颜色对比与间距系统\n- [ ] 卡片信息层级与留白\n**动手任务**：建立 4–5 个颜色/间距变量，统一整个网站视觉风格。\n**验收**：不依赖随机配色；正文清晰易读，重要按钮醒目。\n- [ ] Day 10 当日完成并记录练习结果\n**容易踩坑**：漂亮不等于信息拥挤，也不等于加满阴影。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜字体大小、行高、可读行长**\n\n好的排版先考虑信息层级：一级标题、板块标题、正文、辅助信息的大小和对比应有差别；不要让所有文字一样显眼。\n\n**知识点 2｜颜色对比与间距系统**\n\n颜色最好有语义：正文色、次要文字色、背景色、强调色。正文与背景要有足够对比度，可参考 WCAG 标准的文字对比度要求。\n\n**知识点 3｜卡片信息层级与留白**\n\nCSS 自定义属性 --brand 与 var(--brand) 便于集中维护主题。间距也可以使用 8/12/16/24/32 的简单尺度，避免任意数字到处散落。\n\n**跟写示例：style.css**\n\n```css\n:root { --brand: #156a5a; --text: #243333; --muted: #526866;\n  --surface: #fff; --page: #f4f7f6; --space: 16px; }\nbody { background: var(--page); color: var(--text); line-height: 1.7; }\n.container { max-width: 1040px; margin: auto; padding: 0 var(--space); }\nh1 { font-size: clamp(28px, 5vw, 44px); line-height: 1.2; }\np { max-width: 70ch; }\n.muted { color: var(--muted); }\n```\n\n**分步实践**\n\n1. 确定主色、文字色、辅助色、页面背景和卡片背景。\n2. 把原来散落的十几个颜色改为 CSS 变量。\n3. 用手机和电脑分别查看正文：不应太小、不应横向跨过整屏。\n4. 让同学快速扫视 5 秒，说出最重要的信息是什么。\n\n**自测问题**：为什么把 12px 的正文改成 8px 不能算“更紧凑的专业设计”？\n**参考解释**：会显著降低可读性和可访问性。合理的信息组织、间距和行长比一味缩小文字更有效。\n**排错提示**：颜色对比不足和超长行宽比是否“高大上”更直接影响阅读体验。",
        "title": "整理颜色和文字层次",
        "summary": "让读者先看见重要信息，再读说明，而不是一屏都在抢注意。",
        "task": "集中定义主色、文字色、背景色和间距变量；整理标题、正文、日期和主操作的层级。",
        "checks": [
          "重复颜色改用 CSS 变量",
          "手机正文易读，长段落不过宽",
          "另一人快速浏览能找到主要信息"
        ],
        "hint": "先改字号、行高和行长，再考虑阴影。辅助文字也要看得清。",
        "quiz": {
          "question": "把正文从12px缩成8px会带来什么？",
          "options": [
            "必然更专业",
            "自动解决内容拥挤",
            "可读性下降，应该先整理层级和间距"
          ],
          "answer": 2,
          "explanation": "更小的文字不等于更好的排版。清楚的层级与合理行长能减少拥挤，同时保持可读。"
        }
      },
      {
        "id": "web-11",
        "day": 11,
        "minutes": 90,
        "stageId": "web-layout",
        "concepts": [
          "flex-wrap 与媒体查询的组合",
          "overflow 与图片超宽的定位",
          "DevTools 设备模拟"
        ],
        "starterCode": "img, video { max-width: 100%; height: auto; }\n.flex-main { display: flex; gap: 20px; }\n.flex-main > * { min-width: 0; }\n.long-title { overflow-wrap: anywhere; }\n@media (max-width: 600px) {\n  .flex-main { flex-direction: column; }\n  nav { flex-wrap: wrap; }\n}",
        "language": "css",
        "sourceMarkdown": "### Day 11｜手机导航与小屏问题排查\n**知识要点**\n- [ ] flex-wrap 与媒体查询的组合\n- [ ] overflow 与图片超宽的定位\n- [ ] DevTools 设备模拟\n**动手任务**：修复小屏导航换行、过长标题、宽图片等问题。\n**验收**：320–390px 模拟宽度能正常浏览，实际手机至少测试一次。\n- [ ] Day 11 当日完成并记录练习结果\n**容易踩坑**：别用 overflow-x:hidden 掩盖所有布局错误。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜flex-wrap 与媒体查询的组合**\n\n手机端的问题常来自固定宽度、图片尺寸、过长文本或 flex 子项不肯缩小。排查时先选中超宽元素，检查实际计算宽度。\n\n**知识点 2｜overflow 与图片超宽的定位**\n\nmin-width:0 能让 Flex/Grid 子项在某些场景允许缩小；overflow-wrap:anywhere 让异常长串字符可断行。它们是针对问题的工具。\n\n**知识点 3｜DevTools 设备模拟**\n\n模拟器方便快速检查宽度，但不能完全替代真机：触摸目标、系统字体、移动浏览器行为可能不同。\n\n**跟写示例：style.css**\n\n```css\nimg, video { max-width: 100%; height: auto; }\n.flex-main { display: flex; gap: 20px; }\n.flex-main > * { min-width: 0; }\n.long-title { overflow-wrap: anywhere; }\n@media (max-width: 600px) {\n  .flex-main { flex-direction: column; }\n  nav { flex-wrap: wrap; }\n}\n```\n\n**分步实践**\n\n1. 在一张活动卡片内放一段 80 字长标题以及一长串无空格文本。\n2. 检查 320px、375px、390px 宽度，发现水平滚动时用 Elements 定位元素。\n3. 有针对性地使用 min-width、max-width 或 overflow-wrap 修复。\n4. 用真实手机打开页面（本地文件传过去或部署预览），检查按钮是否方便点按。\n\n**自测问题**：页面横向溢出，直接设置 body{overflow-x:hidden} 是最佳解决方式吗？\n**参考解释**：不是。它可能把被挤出的内容切掉。应先找出超宽元素再修复其宽度或换行策略。\n**排错提示**：修复后必须再次测试桌面布局，避免窄屏改动把大屏破坏。",
        "title": "抓住小屏溢出的元素",
        "summary": "用长标题和窄窗口主动找错，别等别人手机上才暴露问题。",
        "task": "给卡片加长标题和无空格长串；检查320、375、390px，定位超宽元素并在真实手机上试一次。",
        "checks": [
          "窄屏导航与正文不重叠",
          "长标题可以换行",
          "修复后桌面布局仍正常，并记录一次真机结果"
        ],
        "hint": "Flex/Grid 子项不肯缩小时检查 min-width；图片检查 max-width；长串检查换行策略。",
        "quiz": {
          "question": "发现横向滚动，第一步更适合做什么？",
          "options": [
            "在 Elements 定位超宽元素",
            "把所有文字缩小",
            "给 body 加 overflow-x:hidden"
          ],
          "answer": 0,
          "explanation": "先找原因，再改对应尺寸或换行。直接隐藏溢出可能把用户需要的内容一起切掉。"
        }
      },
      {
        "id": "web-12",
        "day": 12,
        "minutes": 90,
        "stageId": "web-layout",
        "concepts": [
          "form、label、input、button 结构",
          "required、placeholder 与 label 区别",
          "键盘焦点、disabled 状态与 alt"
        ],
        "starterCode": "<form action=\"#\" method=\"get\">\n  <label for=\"student-name\">姓名</label>\n  <input id=\"student-name\" name=\"name\" type=\"text\" required>\n  <label for=\"message\">想交流的内容</label>\n  <textarea id=\"message\" name=\"message\" rows=\"3\" required></textarea>\n  <button type=\"submit\">检查表单字段</button>\n</form>\n<!-- 教学演示：当前没有服务器，不会真的发送给社团。 -->",
        "language": "html",
        "sourceMarkdown": "### Day 12｜表单外观与无障碍\n**知识要点**\n- [ ] form、label、input、button 结构\n- [ ] required、placeholder 与 label 区别\n- [ ] 键盘焦点、disabled 状态与 alt\n**动手任务**：添加联系表单界面（暂不发送数据），包含姓名、意见和提交按钮。\n**验收**：Tab 可以依次聚焦字段；label 点击后能聚焦输入框。\n- [ ] Day 12 当日完成并记录练习结果\n**容易踩坑**：这个阶段表单只是界面，不能假装信息已发送到后台。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜form、label、input、button 结构**\n\nform 表示一个表单；label 让字段有可识别的名称。label 的 for 值要与 input 的 id 一致。button 默认在 form 内常会触发表单提交。\n\n**知识点 2｜required、placeholder 与 label 区别**\n\nplaceholder 是输入提示，不等于 label：用户输入后 placeholder 往往消失。required 可以让浏览器进行基础必填检查，但不能替代服务端校验。\n\n**知识点 3｜键盘焦点、disabled 状态与 alt**\n\n必须能用键盘操作表单：Tab 切换焦点，focus-visible 保留清晰提示。若表单没有后端，不能在点击后显示“已经收到你的报名”。\n\n**跟写示例：index.html（表单片段）**\n\n```html\n<form action=\"#\" method=\"get\">\n  <label for=\"student-name\">姓名</label>\n  <input id=\"student-name\" name=\"name\" type=\"text\" required>\n  <label for=\"message\">想交流的内容</label>\n  <textarea id=\"message\" name=\"message\" rows=\"3\" required></textarea>\n  <button type=\"submit\">检查表单字段</button>\n</form>\n<!-- 教学演示：当前没有服务器，不会真的发送给社团。 -->\n```\n\n**分步实践**\n\n1. 在“联系我们”区域放入 form、label、input、textarea、button。\n2. 核对每个 label 的 for 和字段的 id。\n3. 留空点击提交，观察浏览器默认的必填提示。\n4. 暂不连接任何接收数据的服务；在页面明确注明“演示表单，暂不接受报名”。\n\n**自测问题**：字段已经写了 placeholder=\"请输入姓名\"，是否可以删除 label？\n**参考解释**：不建议。placeholder 会在输入后消失，且无法稳定替代表单控件的可访问名称。保留明确的 label。\n**排错提示**：浏览器自带 required 只提供便捷反馈；真正的身份和业务验证将由后端完成。",
        "title": "做一个诚实的表单界面",
        "summary": "字段要有名称、键盘可用；没有后端时明确写清只是演示。",
        "task": "加姓名与意见字段，让 label 对应控件；使用 required；页面写明“演示表单，暂不接受报名”。",
        "checks": [
          "点击 label 能聚焦对应字段",
          "Tab 顺序与焦点清楚",
          "空字段有必填提示，页面没有虚假的发送成功提示"
        ],
        "hint": "label 的 for 必须与字段 id 完全一致。placeholder 是提示，不能替代字段名称。",
        "quiz": {
          "question": "有 placeholder 后，还需要 label 吗？",
          "options": [
            "不需要，文字已经显示",
            "需要，输入提示不能稳定替代字段名称",
            "只在电脑上需要"
          ],
          "answer": 1,
          "explanation": "输入后 placeholder 通常消失。label 为控件提供稳定名称，也让点击标签聚焦等行为可用。"
        }
      },
      {
        "id": "web-13",
        "day": 13,
        "minutes": 90,
        "stageId": "web-layout",
        "concepts": [
          "CSS 重复规则清理",
          "命名规范与目录组织",
          "Elements/Console/Network 的入门"
        ],
        "starterCode": "web-study/\n├── index.html\n├── style.css\n├── images/\n│   ├── training.jpg\n│   └── banner.jpg\n└── README.md",
        "language": "text",
        "sourceMarkdown": "### Day 13｜整理、复用、调试\n**知识要点**\n- [ ] CSS 重复规则清理\n- [ ] 命名规范与目录组织\n- [ ] Elements/Console/Network 的入门\n**动手任务**：整理 css/、images/ 目录，修复失效资源和不一致样式。\n**验收**：无明显控制台错误；项目目录清晰；同学能看懂代码。\n- [ ] Day 13 当日完成并记录练习结果\n**容易踩坑**：不要为纯静态页面过度拆成几十个文件。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜CSS 重复规则清理**\n\n重复 CSS 规则会增加维护成本。删规则前先查它影响哪些元素，不要仅为了“代码短”把有语义的类全部合并。\n\n**知识点 2｜命名规范与目录组织**\n\n文件名、资源路径和目录结构是协作基础。推荐 index.html、style.css、images/；README 写如何运行及哪些功能不具备。\n\n**知识点 3｜Elements/Console/Network 的入门**\n\nElements 可看实时 DOM/CSS；Console 可看 JavaScript 错误；Network 可看每个资源请求和响应。用证据定位，不是改一行就祈祷。\n\n**跟写示例：建议目录**\n\n```text\nweb-study/\n├── index.html\n├── style.css\n├── images/\n│   ├── training.jpg\n│   └── banner.jpg\n└── README.md\n```\n\n**分步实践**\n\n1. 检查当前目录，删除无用的重复图片和临时复制文件。\n2. 用 DevTools 的 Network 刷新，确认 HTML/CSS/图片都成功加载。\n3. 故意把一个样式类写错，利用 Elements 查出为什么没有样式。\n4. 让同学从零按 README 打开网页；记录他遇到的问题并修正文档。\n\n**自测问题**：页面某张图片不显示，应优先改 CSS，还是先看 Network 请求与 src 路径？\n**参考解释**：先检查 src 的实际路径以及 Network 是否加载成功。资源未加载时，修改尺寸或 object-fit 没用。\n**排错提示**：可以让 AI 做代码审查，但必须要求给出可以复现的问题位置与真实证据。",
        "title": "把目录和错误一起收拾好",
        "summary": "整理资源路径、重复样式和说明，让别人也能接手页面。",
        "task": "将样式放 css、图片放 images，更新所有路径；刷新检查资源；让另一人照 README 打开。",
        "checks": [
          "Network 中主要资源成功加载",
          "重复样式已合并，命名能看懂",
          "README 的步骤实际可复现"
        ],
        "hint": "图片不显示时先看 src 与 Network。移动 CSS 文件后，CSS 里的图片相对路径也可能变。",
        "quiz": {
          "question": "一张图片不显示，应先查什么？",
          "options": [
            "给图片加更多阴影",
            "改 object-fit",
            "检查 src 和资源请求是否成功"
          ],
          "answer": 2,
          "explanation": "加载失败是路径或资源问题。图片都没读到时，改尺寸和裁剪方式无法修复。"
        }
      },
      {
        "id": "web-14",
        "day": 14,
        "minutes": 120,
        "stageId": "web-layout",
        "concepts": [
          "结构、布局、响应式综合应用",
          "多视口手测与基本验收",
          "简单 README 与截图留存"
        ],
        "starterCode": "# 从空目录开始\nindex.html\ncss/style.css\nimages/\nscreenshots/\nREADME.md\n\n# 用你自己的内容与布局完成页面；今天不给整页答案。",
        "language": "text",
        "sourceMarkdown": "### Day 14｜第二周毕业小项目\n**知识要点**\n- [ ] 结构、布局、响应式综合应用\n- [ ] 多视口手测与基本验收\n- [ ] 简单 README 与截图留存\n**动手任务**：不复制前 13 天代码，从空目录制作一页「社团活动日历 / 社团招新页」。\n**验收**：独立完成：清晰结构 + 至少 3 个区块 + 手机适配 + 4 张截图 + README。\n- [ ] Day 14 当日完成并记录练习结果\n**容易踩坑**：允许查文档；但核心页面不要一键交给 AI 代写。\n\n#### 对应知识讲义（不仅是打卡清单）\n\n**知识点 1｜结构、布局、响应式综合应用**\n\n独立项目要同时检验语义、布局、可访问性和阅读体验。可查文档，但不能复制原页面所有代码再换名字充作新作品。\n\n**知识点 2｜多视口手测与基本验收**\n\n测试不是“我自己看着还行”：应列出真实检查宽度、链接、键盘、图片、长文本等项目，并保留截图或问题记录。\n\n**知识点 3｜简单 README 与截图留存**\n\nREADME 相当于交接文档，至少写用途、打开方法、功能、已知限制。修改需求时记录做过什么和为何这样做。\n\n**跟写示例：README.md（结业提交样例）**\n\n```md\n# 社团招新页\n\n## 运行\n用浏览器打开 `index.html`。\n\n## 功能\n- 社团介绍、活动日程、联系方式\n- 大小屏响应式布局\n\n## 已知限制\n- 暂无真实后端，表单仅作展示\n\n## 验收证据\n- `screenshots/360.png`\n- `screenshots/768.png`\n- `screenshots/1440.png`\n```\n\n**分步实践**\n\n1. 新建 web-final 文件夹，不复制旧项目全部 HTML/CSS。\n2. 设计一张“社团招新页”或“社团活动日历”：至少 3 个语义化区块、3 张活动卡片。\n3. 独立实现电脑与手机布局，图片都有正确 alt，导航和焦点可用。\n4. 在 360/768/1440px 与真实手机测试，截图并记录至少一项修复。\n5. 提交 README 和完整源码，让别人能打开并检查。\n\n**自测问题**：页面样式很好看，但导航跳转无效、手机横向溢出，可以算阶段通过吗？\n**参考解释**：不能。项目必须达到功能与布局验收标准；美观不是替代功能的理由。\n**排错提示**：今天不给完整页面答案，因为重点是检验你能否自己综合使用前 13 天的知识。",
        "title": "交出你自己的招新页",
        "summary": "从空目录做一个完整静态页面，用实测证明这两周的收获。",
        "task": "在 projects/web/club-page 从零做招新页或活动日历；至少3个区块和3张卡片，提交源码、README与4张验收截图。",
        "checks": [
          "导航、图片、键盘操作可用",
          "360、768、1440px与真机各留一张截图",
          "README 写明如何打开、实际功能与未接后端的限制",
          "能解释并记录至少一处修复"
        ],
        "hint": "先画内容顺序，再写结构与布局。查文档可以，核心页面要由自己组织。",
        "quiz": {
          "question": "页面很漂亮，但手机溢出、导航失效，能通过吗？",
          "options": [
            "不能，功能和布局验收仍需完成",
            "能，美观已经足够",
            "只要AI说通过就行"
          ],
          "answer": 0,
          "explanation": "阶段验收检查实际使用。截图不能代替导航、键盘和窄屏测试。"
        }
      }
    ],
    "followups": [
      {
        "title": "把响应式做扎实",
        "range": "第3–4周 · 共同基础",
        "description": "在两周静态页面的基础上处理复杂布局、长内容和多尺寸调试。",
        "task": "把主页扩成含侧栏、列表和详情的响应式页面，覆盖窄屏、平板与桌面。",
        "checks": [
          "布局随内容变化仍可用",
          "能解释Flex与Grid选择",
          "有窄屏和键盘测试记录"
        ],
        "sourceSection": "### 02｜第 3–4 周 · 页面布局与响应式\n**目标**：面对一张中等复杂度页面图，能选择合适布局手段并独立实现。\n**知识点 / 掌握标准**\n- [ ] **Flexbox 进阶**：弄清主轴/交叉轴、flex-grow、flex-shrink、flex-basis，避免无意义的宽度计算。\n    - **知识讲解**：flex-grow 参与分配剩余空间，flex-shrink 在空间不足时允许收缩，flex-basis 是初始主轴尺寸。固定宽度太多会相互冲突。\n    - **跟练任务**：做“搜索框 + 提交按钮”一排布局：搜索框 flex:1，按钮保持本身宽度。\n- [ ] **Grid 双维布局**：会写 grid-template-columns、repeat、minmax、auto-fit，做多列卡片。\n    - **知识讲解**：Grid 同时控制行和列；repeat(auto-fit,minmax(...)) 可根据容器空间重新排卡片，fr 是空间比例而非固定长度。\n    - **跟练任务**：给三张活动卡片写自适应网格，再新增第四张验证是否无需手调宽度。\n- [ ] **定位与层级**：解释 relative/absolute/fixed/sticky 与 z-index，不用定位替代正常文档流。\n    - **知识讲解**：relative 仍在普通文档流中；absolute 通常相对定位祖先定位；fixed 相对视口；sticky 随滚动粘附。\n    - **跟练任务**：做一个卡片右上角小角标：卡片设 relative，角标设 absolute，记录为何不影响正文。\n- [ ] **媒体查询**：为常见窄屏场景设置 @media；围绕内容断点设计而非只记设备型号。\n    - **知识讲解**：媒体查询针对条件切换规则，但移动优先可以先写单列默认样式，再为宽屏增强为多列。\n    - **跟练任务**：从 360px 开始排版，之后添加 min-width:768px 的双列规则并截图。\n- [ ] **图片呈现**：会用 aspect-ratio、object-fit、max-width，防止图片拉伸。\n    - **知识讲解**：object-fit:cover 裁切填充，不是压缩文件；aspect-ratio 控制展示框比例，max-width 防止图片超容器。\n    - **跟练任务**：用竖图和横图各放一张卡片，统一 16:9 预览框，检查有无不合理裁剪。\n- [ ] **CSS 变量**：用 --color 等自定义属性组织配色和间距，减少复制粘贴。\n    - **知识讲解**：CSS 自定义属性在声明处定义，例如 --brand:#156a5a，通过 var(--brand) 使用，统一改主题色只需改一个变量。\n    - **跟练任务**：为背景、正文、强调色写三个变量并在三个区域复用，修改变量观察全站改变。\n- [ ] **交互状态**：为 hover、focus-visible、disabled 提供合理反馈，键盘可见焦点。\n    - **知识讲解**：hover 是指针交互，focus-visible 让键盘焦点可见；disabled 的状态要真正阻止无效操作。\n    - **跟练任务**：不用鼠标只按 Tab 浏览导航与按钮，补足看不见的焦点框。\n- [ ] **表单与语义**：让 label 正确关联 input；不要用 div 冒充 button。\n    - **知识讲解**：label、button、nav 自带浏览器和辅助技术可理解的语义；纯 div 没有按钮默认键盘行为。\n    - **跟练任务**：将“提交”伪按钮 div 换成 button，给两个 input 写清晰 label，按 Enter 测试。\n- [ ] **无障碍基础**：用 Tab 键完成主要操作，检查颜色对比度、图片 alt、标题层级。\n    - **知识讲解**：无障碍不是最后加一个 aria-label；从正确语义、合理标题顺序、alt、键盘操作开始更可靠。\n    - **跟练任务**：做 5 分钟键盘巡检：能否访问所有导航、焦点是否可见、操作名称是否明确。\n- [ ] **开发者工具调试**：使用 Elements、Computed、设备模拟器定位布局错位与溢出。\n    - **知识讲解**：Elements 看 DOM 与应用样式，Computed 看最终值，设备模拟发现窄屏问题；要从证据确定哪个规则生效。\n    - **跟练任务**：故意写一个 width:1200px 导致溢出，用 DevTools 找到该元素并修复。\n- [ ] **网页可读性**：控制行长、字号、行高、段落间距；避免「好看但看不清」。\n    - **知识讲解**：正文行宽太长难以回读，行高太小拥挤。max-width:65ch 和 line-height:1.6 是可调整的起点。\n    - **跟练任务**：测量桌面版正文长度并限制行长，再比较 1.1 与 1.7 的行高可读性。\n#### 本阶段配套综合实战\n\n**用 Flex + Grid 完成响应式布局**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```css\n.top { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }\n.cards { display: grid; gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }\n.card img { max-width: 100%; aspect-ratio: 16/9; object-fit: cover; }\n@media (max-width: 640px) { .top { flex-direction: column; align-items: start; } }\n```\n\n**练习步骤**\n\n1. 页眉用 Flex，卡片区用 Grid，先别写绝对定位。\n2. 模拟 360/768/1440px，检查图片、长标题和导航。\n3. 用键盘 Tab 遍历链接，修复焦点不可见问题。\n\n**思考题**：为什么卡片区多列用 Grid，导航用 Flex 通常更省事？\n**参考答案**：卡片涉及行列网格，导航主要是一维排列，布局工具与结构相匹配。\n\n**实战作品**：完整社团首页：大屏三列活动卡片、手机单列、顶部导航、公告区与联系区。\n**验收清单**\n- [ ] 在 360 / 768 / 1440px 宽度分别截图检查\n- [ ] Tab 可访问按钮与链接，焦点有可见样式\n- [ ] 能口头说明为什么这一区域选择 Grid 而另一处用 Flex\n**常见错误**：把响应式理解为缩小字体；只在自己的屏幕上调一次；滥用 px 固定宽度。\n**推荐资料**：[MDN：Web 核心学习（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core)、[MDN：Web 无障碍（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility)、[The Odin Project：Foundations](https://www.theodinproject.com/paths/foundations/courses/foundations)"
      },
      {
        "title": "让页面回应操作",
        "range": "第5–6周 · JavaScript与DOM",
        "description": "学变量、函数、事件和异步请求，把静态页面变成活动搜索页。",
        "task": "实现搜索、筛选、收藏和数据请求；分别做加载、空结果与失败状态。",
        "checks": [
          "点击与输入能改变页面",
          "不可信内容作为文本显示",
          "请求失败有可理解的反馈"
        ],
        "sourceSection": "### 03｜第 5–6 周 · JavaScript 与 DOM\n**目标**：不借助框架，写出活动搜索、筛选、展开与本地收藏等功能。\n**知识点 / 掌握标准**\n- [ ] **JS 与 C++ 区别**：掌握 let/const、null/undefined、真值、===；特别注意隐式类型转换。\n    - **知识讲解**：JS 使用 let/const，比较推荐 ===；null 表示明确的空值，undefined 常表示未赋值。0、空字符串在 if 中是假值。\n    - **跟练任务**：预测 0==false 与 0===false，再在控制台验证；解释为何输入值往往还是字符串。\n- [ ] **对象与数组**：能用对象保存一条活动记录，使用 map/filter/find/sort 等处理数据。\n    - **知识讲解**：对象承载一条活动 {id,title}，数组承载多条；filter 返回满足条件的新数组，map 转换每一项。\n    - **跟练任务**：建立三条活动对象，filter 只保留“算法”类型，map 得到所有活动标题。\n- [ ] **函数与作用域**：函数、箭头函数、闭包、局部变量；能读懂回调函数。\n    - **知识讲解**：函数帮助复用逻辑；箭头函数常作为回调传给 filter 等方法。闭包能让回调记住外部作用域里的变量。\n    - **跟练任务**：把搜索逻辑写为 filterEvents(events, keyword)，别把筛选和 DOM 渲染混在一起。\n- [ ] **DOM 查询和更新**：使用 querySelector、textContent、createElement、append；理解 DOM 是网页对象树。\n    - **知识讲解**：DOM 是当前网页可操作的对象树；textContent 写纯文本更直接，createElement + append 构造元素。\n    - **跟练任务**：用 querySelector 选出 ul，再由 JS 创建三条 li 活动信息，而不是手工复制 HTML。\n- [ ] **事件机制**：会用 addEventListener、event.target、preventDefault，理解事件冒泡。\n    - **知识讲解**：addEventListener 注册事件处理函数；事件冒泡使子元素事件传播到父元素，preventDefault 可取消默认提交或跳转。\n    - **跟练任务**：给活动列表做事件委托：点击某个“收藏”按钮时从 data-id 取得活动编号。\n- [ ] **表单处理**：读取输入值并验证，处理空字符串、异常输入和重复提交。\n    - **知识讲解**：浏览器读 input.value 通常得到字符串；输入不可信，先 trim、检查长度和格式再处理。\n    - **跟练任务**：输入全空格时显示“请输入关键词”，不要出现空白成功提示。\n- [ ] **JSON**：掌握对象和 JSON 字符串的区别；用 JSON.stringify/parse 序列化数据。\n    - **知识讲解**：JavaScript 对象与 JSON 字符串不是同一回事：JSON 需要双引号包键且不包含函数；parse/stringify 在二者间转换。\n    - **跟练任务**：将活动数组 JSON.stringify 后输出，再 JSON.parse 恢复，检查对象内容是否一致。\n- [ ] **本地持久化**：使用 localStorage 保存筛选条件或收藏；明白它不是后台数据库。\n    - **知识讲解**：localStorage 保存同源浏览器键值字符串，不是用户共享数据库；用户可以清除、更改这些值。\n    - **跟练任务**：保存收藏活动 ID 数组，刷新后恢复；在 Application 面板删除键后观察页面状态。\n- [ ] **异步的原因**：能解释同步/异步、Promise、async/await 和 try/catch。\n    - **知识讲解**：Promise 代表未来结果，await 等待 Promise 解决；try/catch 处理拒绝，代码语句依然可能按异步时序执行。\n    - **跟练任务**：写一个 async 函数 await Promise.resolve(42)，在执行前后打印日志，观察顺序。\n- [ ] **fetch 与状态**：能请求 JSON 并处理 loading、空列表、网络错误、非 2xx 响应。\n    - **知识讲解**：fetch 仅在网络层失败时自动 reject；服务器返回 404/500 时仍会得到 Response，需要检查 response.ok。\n    - **跟练任务**：请求不存在的 JSON 地址，观察状态码；分别渲染加载中、失败、无结果。\n- [ ] **错误定位**：会用 Console、断点、Network 查看实际请求与报错，而不盲目改代码。\n    - **知识讲解**：Console 的错误堆栈给行号，Network 给请求 URL、状态和响应；断点能停下观察变量值。\n    - **跟练任务**：故意把 events 写错为 event，在 Console 定位错误，再检查代码变量名修复。\n- [ ] **基础安全习惯**：显示不可信文本优先 textContent；理解直接拼接 innerHTML 的风险。\n    - **知识讲解**：直接把用户提供的文本插入 innerHTML 可能产生 XSS；默认用 textContent 显示文字，确需 HTML 时用可信模板和安全处理。\n    - **跟练任务**：让活动标题等于“<b>活动</b>”，分别使用 textContent 和 innerHTML 查看差异，并说明风险。\n#### 本阶段配套综合实战\n\n**不依赖框架完成搜索**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```js\nconst events = [{id:1,title:'图论训练'}, {id:2,title:'动态规划入门'}];\nconst input = document.querySelector('#keyword');\nconst list = document.querySelector('#result');\nfunction render(keyword='') {\n  const found = events.filter(e => e.title.includes(keyword.trim()));\n  list.replaceChildren();\n  if (!found.length) { list.textContent = '暂无匹配活动'; return; }\n  for (const event of found) {\n    const li = document.createElement('li');\n    li.textContent = event.title;\n    list.append(li);\n  }\n}\ninput.addEventListener('input', () => render(input.value));\nrender();\n// 在 HTML 中准备 <input id=\"keyword\"> 与 <ul id=\"result\"></ul>\n```\n\n**练习步骤**\n\n1. 先在 HTML 放 id=\"keyword\" 的 input 和 id=\"result\" 的 ul。\n2. 复制 JS 并测试空关键字、正常命中、无命中。\n3. 添加 localStorage 记住关键词，并解释它不是后端。\n\n**思考题**：为什么优先使用 textContent 而不是直接拼 innerHTML？\n**参考答案**：textContent 会把不可信输入作为文本处理，不会将其解析成可执行 HTML。\n\n**实战作品**：可搜索活动列表：分类过滤、关键词搜索、加载/空状态、失败提示、localStorage 收藏。\n**验收清单**\n- [ ] 搜索无结果时有明确提示\n- [ ] 模拟接口失败也不会白屏\n- [ ] 刷新后收藏保留；能解释存储在哪台设备\n**常见错误**：直接让 AI 写复杂状态管理；只跑正常数据；把 localStorage 当成共享数据库。\n**推荐资料**：[现代 JavaScript 教程（中文）](https://zh.javascript.info/)、[MDN：Web 核心学习（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core)、[MDN：HTTP 概述（中文）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Overview)"
      },
      {
        "title": "把第一版放到线上",
        "range": "第7–8周 · Git、调试与部署",
        "description": "用版本控制记录修改，学会定位问题，再检查真实访问地址。",
        "task": "用分支完成一个修改，做代码审查；部署网页并从线上URL重新检查功能与资源。",
        "checks": [
          "提交有清楚的修改范围",
          "线上资源与路径正确",
          "能区分构建成功与实际可用"
        ],
        "sourceSection": "### 04｜第 7–8 周 · 协作、调试与首次上线\n**目标**：能把静态/纯前端项目放进 GitHub，协作修改、测试并上线。\n**知识点 / 掌握标准**\n- [ ] **终端基础**：熟悉 pwd/cd/ls 与 Windows 对应操作，理解当前目录和相对路径。\n    - **知识讲解**：终端命令在“当前工作目录”运行；cd 切目录，pwd/Windows cd 看位置，ls/dir 查看文件。路径错误是初学者常见原因。\n    - **跟练任务**：在项目文件夹打开终端，用 pwd（PowerShell 可用 pwd）、ls 或 dir 确认能看到 index.html。\n- [ ] **Git 三层概念**：区分工作区、暂存区和提交记录，会用 status、add、commit、log。\n    - **知识讲解**：Git 工作区是正在改的文件，暂存区决定本次提交内容，commit 形成可追溯快照；status 给出当前状态。\n    - **跟练任务**：修改一行 CSS，依次运行 git status、git add、git diff --cached、git commit，再看 git log。\n- [ ] **GitHub 合作**：会建分支、创建 Pull Request、做代码审查和合并。\n    - **知识讲解**：分支让修改隔离，Pull Request 让同伴查看差异并讨论后合并；不要在主分支直接试验大改动。\n    - **跟练任务**：建 feature/activity-card 分支，加一张卡片提交，再在 GitHub 发起 PR 让同学 review。\n- [ ] **README**：写清项目用途、启动方式、功能、截图、已知限制。\n    - **知识讲解**：README 必须回答“这是什么”“怎么启动”“已经实现什么”“有什么限制”，不是只有项目名的展示文案。\n    - **跟练任务**：让没参与开发的同学只按 README 运行项目，记录并修补缺失步骤。\n- [ ] **npm 和 package.json**：知道依赖、脚本、lockfile 的用途；此阶段不必追逐框架。\n    - **知识讲解**：npm 用于安装包和运行 scripts，package.json 声明依赖与命令，lockfile 记录可复现的依赖版本。\n    - **跟练任务**：在一个独立练习目录运行 npm init -y，阅读 scripts、dependencies 等字段；不要随意删除 lockfile。\n- [ ] **API 与数据流**：看懂 URL、方法、请求头、请求体、响应状态码和 JSON。\n    - **知识讲解**：HTTP 请求含方法、地址、头、可选请求体；响应有状态码、头和内容。JSON 是常见正文格式而非传输协议。\n    - **跟练任务**：打开浏览器 Network，选一个请求分别标出 Method、Status、Headers 和 Response。\n- [ ] **基础浏览器测试**：验证点击、输入、导航、刷新、返回以及不同宽度。\n    - **知识讲解**：手测应包含操作顺序和预期结果；“点了一下没报错”不是充分验收。\n    - **跟练任务**：写 5 个用例：点导航、筛选活动、清空筛选、刷新、手机浏览，逐一记录结果。\n- [ ] **边界与异常**：测试空数据、长标题、断网、404、无效输入。\n    - **知识讲解**：边界数据能揭露正常用例没发现的错误，例如空数组、极长标题、断网、重复点击。\n    - **跟练任务**：把活动数据改成空数组和 150 字长标题，修复布局和提示。\n- [ ] **性能常识**：压缩大图、避免无必要请求，用浏览器 Network 查看大小与耗时。\n    - **知识讲解**：首先量再优化：大图尺寸和多余网络请求很常见；Network 能显示传输大小与耗时。\n    - **跟练任务**：找出加载最大的两张图片，压缩后比较页面总传输体积。\n- [ ] **静态部署**：能通过 GitHub Pages 等静态托管发布网站，知道它不运行数据库服务。\n    - **知识讲解**：GitHub Pages 发布 HTML/CSS/JS 静态资源，不负责在服务器上执行 Node API 或运行 PostgreSQL。\n    - **跟练任务**：配置 Pages 并拿真实网址在手机打开；记下静态站点的功能边界。\n- [ ] **版本与回退**：遇到坏改动能对比 diff 与回退；知道何时不应强推共享分支。\n    - **知识讲解**：git diff 比较更改，git log 追踪历史。回退公开分支通常优先考虑 git revert，避免破坏其他人的提交。\n    - **跟练任务**：在测试分支做一个明显坏改动，再演练恢复；说明 revert 与 reset 用途有何不同。\n- [ ] **调试记录**：提交前留下现象、复现步骤、定位原因、修复和测试证据。\n    - **知识讲解**：Bug 记录至少包含环境、现象、复现步骤、预期与实际、定位依据、修改与回归结果。\n    - **跟练任务**：把一次图片 404 或布局溢出的修复写成 6 行问题记录附到 README。\n#### 本阶段配套综合实战\n\n**从修改到 PR 的最小闭环**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```bash\ngit status\ngit switch -c feature/event-search\ngit add index.html style.css\ngit diff --cached\ngit commit -m \"feat: add event search layout\"\ngit push -u origin feature/event-search\n# 在 GitHub 发 Pull Request，审核后再合并\n```\n\n**练习步骤**\n\n1. 先确保已初始化仓库并配置远端。\n2. 修改一项真实功能后创建单独提交。\n3. 在 PR 里描述如何手动验证，合并后检查线上页面。\n\n**思考题**：为什么构建通过还不足以证明发布成功？\n**参考答案**：构建只验证生成产物；还需要打开线上真实 URL、操作页面并检查资源和路由。\n\n**实战作品**：社团活动展示站 v1：真实可点击链接、筛选交互、README、至少两次 PR 变更、公开预览地址。\n**验收清单**\n- [ ] 另一位同学按 README 能打开/运行项目\n- [ ] 至少提交一次有意义的 PR，并说明修改理由\n- [ ] 项目上线后用真实手机访问一次\n**常见错误**：只让 AI 宣布「测试通过」；没有截图/日志就认为部署成功；把 API 密钥提交到仓库。\n**推荐资料**：[Pro Git（中文）](https://git-scm.com/book/zh/v2)、[GitHub Pages：发布教程](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[MDN：Web 核心学习（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core)、[MDN：HTTP 概述（中文）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Overview)"
      },
      {
        "title": "用TypeScript整理代码",
        "range": "前端路线 · 第9–10周",
        "description": "给现有交互补类型，用Vite组织开发和构建，不把类型当作运行时校验。",
        "task": "把活动搜索页迁移为TypeScript+Vite，保留原有功能，并检查外部接口数据。",
        "checks": [
          "类型检查与构建实际通过",
          "功能没有因迁移丢失",
          "外部数据有运行时边界校验"
        ],
        "sourceSection": "### F1｜第 9–10 周 · TypeScript 与现代前端工具\n**目标**：能创建 Vite 项目，理解 TS 的价值，合理拆分模块并检查类型错误。\n**知识点 / 掌握标准**\n- [ ] **模块化**：理解 import/export 和 ES modules，区分模块与传统 script。\n    - **知识讲解**：ES module 通过 export 暴露成员，import 显式声明依赖，能避免所有函数挂到全局对象造成命名冲突。\n    - **跟练任务**：把 filterEvents 提取到 events.js 并 export，在 main.ts 导入使用。\n- [ ] **Vite**：会创建与启动项目，知道 dev/build/preview 各命令在做什么。\n    - **知识讲解**：Vite 在开发时提供快速本地服务器并支持模块变更；npm run build 生成可部署的静态资源，不等于启动后端。\n    - **跟练任务**：用 Vite 创建 vanilla-ts 模板，分别跑 dev/build/preview 并对比地址与 dist。\n- [ ] **TypeScript 基础**：会给变量、函数参数/返回值、数组和对象添加类型。\n    - **知识讲解**：TypeScript 在编辑和构建时检查类型，最后仍转换为 JavaScript；number 和 string 不应混用。\n    - **跟练任务**：给 filterEvents 的 events 与 keyword 参数加类型，故意把数字传给 keyword 看报错。\n- [ ] **类型建模**：用 interface/type、可选属性、联合类型表示 API 数据。\n    - **知识讲解**：type / interface 描述数据形状；例如 Event 有 id:number、title:string、date?:string 可防止组件误用字段。\n    - **跟练任务**：为活动 API 响应定义 Event 类型，把 date 设可选并编译检验。\n- [ ] **类型收窄**：会用 typeof、in、判空缩小联合类型，不乱用 any。\n    - **知识讲解**：联合类型如 string | null 需要先判空再调用字符串方法，typeof 和 in 可帮助类型收窄。\n    - **跟练任务**：写一个参数为 string | undefined 的函数，不使用 !，完成安全判空。\n- [ ] **异步数据类型**：把 Promise 与返回数据结构联系起来，处理未知错误类型。\n    - **知识讲解**：Promise<Event[]> 表示异步返回活动数组，但并不能保证服务端真返回正确形状；运行时仍需验证未知 JSON。\n    - **跟练任务**：声明 async loadEvents():Promise<Event[]>，模拟服务端返回缺失 title 时设计校验逻辑。\n- [ ] **格式与静态检查**：接触 ESLint、格式化工具与 TypeScript 检查；知道不同工具的职责。\n    - **知识讲解**：Prettier 统一格式，ESLint 发现可疑代码模式，tsc 发现类型问题，测试工具验证实际行为，职责不同。\n    - **跟练任务**：配置 format、lint、typecheck、test 四条独立命令，并故意制造类型错误验证检查有效。\n- [ ] **配置和环境变量**：理解开发/生产环境区别；前端构建出的变量会暴露，不放服务器机密。\n    - **知识讲解**：VITE_ 前缀之类的构建环境变量可能被打包进浏览器代码；密钥属于后端，不应写入客户端 bundle。\n    - **跟练任务**：定义一个公开 API 基础地址变量，打包后搜索 dist 看其是否出现在输出中。\n- [ ] **构建产物**：能解释 dist、资源哈希、静态资源相对路径和刷新 404 的常见原因。\n    - **知识讲解**：dist 中是编译后的前端静态文件；路由刷新 404 往往和主机的 SPA fallback 配置有关。\n    - **跟练任务**：本地执行 build+preview，检查图片相对路径和详情页刷新行为。\n#### 本阶段配套综合实战\n\n**用 TypeScript 描述活动列表**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```ts\ntype EventItem = { id: number; title: string; location?: string };\nfunction filterEvents(events: EventItem[], keyword: string): EventItem[] {\n  return events.filter(e => e.title.includes(keyword.trim()));\n}\nconst events: EventItem[] = [{id: 1, title: '图论训练'}];\nconsole.log(filterEvents(events, '图论'));\n// 故意把第二参数改成 42，观察 TypeScript 类型错误\n```\n\n**练习步骤**\n\n1. 用 Vite vanilla-ts 初始化示例项目。\n2. 建立 EventItem 类型并将筛选逻辑移动到单独模块。\n3. 执行类型检查和 build，并保存一次故意制造类型错误的截图。\n\n**思考题**：TypeScript 类型正确能保证后端返回的 JSON 也正确吗？\n**参考答案**：不能；运行时接收到的外部数据仍可能不符合预期，需要在输入边界做校验。\n\n**实战作品**：把第 6 周的活动搜索页迁移成 TypeScript + Vite，保留原有全部功能。\n**验收清单**\n- [ ] 类型检查/构建命令正常完成\n- [ ] 故意把数字传成字符串时能看到类型错误\n- [ ] 迁移前后主要交互行为一致\n**常见错误**：把 TS 当成「更高级的 JS」就跳过 JS；靠 any 或 @ts-ignore 消除所有错误。\n**推荐资料**：[Vite：入门指南](https://vite.dev/guide/)、[TypeScript：官方手册](https://www.typescriptlang.org/docs/handbook/intro)"
      },
      {
        "title": "选一个框架做组件",
        "range": "前端路线 · 第11–14周",
        "description": "在React和Vue中选一条，练组件、状态、路由和接口请求。",
        "task": "用所选框架实现活动列表与详情，拆出可复用卡片和状态视图。",
        "checks": [
          "状态与界面保持一致",
          "路由与刷新可用",
          "加载、空数据、失败状态完整"
        ],
        "sourceSection": "### F2｜第 11–14 周 · React 或 Vue：组件化 UI\n**目标**：能够围绕业务需求拆组件、管理状态、接入路由，而不是只会复制 UI 库示例。\n**知识点 / 掌握标准**\n- [ ] **框架选择**：React 或 Vue 任选其一；不要前两周两个框架同时学。\n    - **知识讲解**：React 的 JSX 和 Vue 的模板采用不同写法，但组件、数据流、状态更新的核心问题相同，先掌握一套。\n    - **跟练任务**：在同一社团列表需求里评估两种写法，然后选定一个框架，坚持做完项目。\n- [ ] **组件拆分**：把页面拆成导航、活动卡片、筛选器、表单、弹窗等单一职责组件。\n    - **知识讲解**：组件的职责应该清晰：EventCard 显示单条活动，EventList 管列表，EventFilter 管搜索；避免单文件塞下所有东西。\n    - **跟练任务**：画出首页组件树，并把至少 3 个可复用区域拆为单独组件。\n- [ ] **Props**：理解父组件向子组件传数据，不把所有东西塞进全局对象。\n    - **知识讲解**：props 是父传子的输入，不应在子组件直接任意修改父状态；例如把 activity 对象传给 EventCard 展示。\n    - **跟练任务**：把活动标题与时间以 props 传给卡片，尝试改变父列表看子卡片是否更新。\n- [ ] **状态与视图**：掌握 state/ref/reactive 的基本关系，知道更新状态为何会刷新界面。\n    - **知识讲解**：React state / Vue ref 让数据变化驱动 UI 重新呈现；直接操作 DOM 可能绕过框架的数据管理。\n    - **跟练任务**：用状态变量保存关键词和筛选结果，不再手写 querySelector 改每个卡片的 display。\n- [ ] **事件通信**：处理点击和输入，掌握父子之间的交互与状态提升。\n    - **知识讲解**：子组件用回调/emit 向父组件报告用户操作，由拥有数据的一层决定如何更新。\n    - **跟练任务**：在 EventFilter 中发出 keyword 变化，父组件根据它更新活动列表。\n- [ ] **列表与条件渲染**：会稳定渲染列表、处理 key、空状态和加载状态。\n    - **知识讲解**：条件渲染决定加载/空/错误时显示何种内容；列表需要稳定唯一 key，不应无理由使用数组序号。\n    - **跟练任务**：活动数组为空时显示空状态；列表项用 id 作为 key，并测试新增与删除。\n- [ ] **副作用**：能解释何时发请求、订阅与清理；React 关注 effect，Vue 关注 watch/onMounted。\n    - **知识讲解**：副作用指发起请求、订阅计时等外部交互，需要考虑触发时机与清理；不能在每次渲染里无限请求。\n    - **跟练任务**：在页面进入时加载活动，离开或输入变化时避免过期请求覆盖新结果。\n- [ ] **表单**：处理输入、校验、错误显示与提交反馈。\n    - **知识讲解**：受控表单明确输入来源与校验状态；反馈要准确区分“尚未提交”“提交中”“提交失败”“成功”。\n    - **跟练任务**：写一个报名表单，禁止空姓名提交，显示字段错误而不是简单 alert。\n- [ ] **路由**：完成首页/活动列表/活动详情三个页面；理解客户端路由与服务端路由差异。\n    - **知识讲解**：客户端路由能在不整页重新加载的情况下切换视图，但服务器要支持直接访问/刷新对应 URL。\n    - **跟练任务**：增加 /events 与 /events/:id 两类页面，测试地址栏直接输入详情 URL。\n- [ ] **复用逻辑**：按需使用自定义 Hook / Composable，先解决重复问题再抽象。\n    - **知识讲解**：自定义 Hook / Composable 用于共享行为逻辑，不能只为“高级”把两行简单代码抽象成多层。\n    - **跟练任务**：将至少两页都需要的活动加载逻辑提取为一个复用函数或 Hook。\n- [ ] **UI 组件库**：理解引入库的代价；能在不依赖组件库时做基础按钮和表单。\n    - **知识讲解**：组件库可省时间但引入体积、样式约束和可访问性负担；基础按钮、表单和卡片应先会自己实现。\n    - **跟练任务**：只用基础 CSS 做按钮/表单，再选一个组件库比较包体积和可访问性表现。\n- [ ] **调试**：使用框架 DevTools，定位异常渲染与状态来源。\n    - **知识讲解**：组件不更新时优先看 props/state 变化路径；React/Vue DevTools 能显示组件树与状态。\n    - **跟练任务**：故意让关键字状态不更新，用框架 DevTools 查出数据在哪一层没有传播。\n#### 本阶段配套综合实战\n\n**一个 React 组件怎样流动数据**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```tsx\nimport { useState } from 'react';\nconst events = [{id: 1, title: '图论训练'}, {id: 2, title: '算法交流'}];\nexport default function EventList() {\n  const [keyword, setKeyword] = useState('');\n  const found = events.filter(e => e.title.includes(keyword));\n  return <section>\n    <label>搜索活动 <input value={keyword}\n      onChange={e => setKeyword(e.target.value)} /></label>\n    {found.length ? found.map(e => <p key={e.id}>{e.title}</p>)\n      : <p>没有匹配活动</p>}\n  </section>;\n}\n// 选 Vue 的学员改用 ref、v-model、v-for 实现等价功能。\n```\n\n**练习步骤**\n\n1. 先在纸上画出输入框 → keyword 状态 → 列表的单向更新流程。\n2. 实现组件，再拆分 SearchBox 和 EventCard。\n3. 实现空状态和路由刷新检查。\n\n**思考题**：为什么不建议在 React 渲染后通过 querySelector 手动隐藏活动卡片？\n**参考答案**：会绕开框架状态与渲染模型，使 DOM 与状态不同步；应更新状态然后由框架渲染。\n\n**实战作品**：组件化社团网站：主页、公告列表、活动详情、报名表单（先使用模拟数据）。\n**验收清单**\n- [ ] 至少复用 3 个通用组件\n- [ ] URL 与页面能对应，返回/刷新逻辑正确\n- [ ] 能清楚解释某个状态应放在哪个组件\n**常见错误**：动不动上全局状态库；还没理解组件就套庞大后台模板。\n**推荐资料**：[React：Thinking in React](https://react.dev/learn/thinking-in-react)、[Vue 3：官方中文指南](https://cn.vuejs.org/guide/introduction)、[Vite：入门指南](https://vite.dev/guide/)"
      },
      {
        "title": "让修改有测试保护",
        "range": "前端路线 · 第15–17周",
        "description": "补测试、可访问性和性能检查，让已有页面在持续修改中保持可靠。",
        "task": "给活动筛选与请求错误写测试；检查键盘流程与资源加载，修复一项实际问题。",
        "checks": [
          "测试断言关键行为而不只检查存在",
          "键盘流程可完成",
          "性能改动有前后证据"
        ],
        "sourceSection": "### F3｜第 15–17 周 · 前端工程质量\n**目标**：交付可靠的前端，而不只是「截图看着不错」。\n**知识点 / 掌握标准**\n- [ ] **API 交互**：统一封装请求函数，区分业务错误、网络错误和 HTTP 错误。\n    - **知识讲解**：接口层单独处理 fetch 的 URL、header、状态检查和 JSON 解析，让组件只关心领域数据与 UI。\n    - **跟练任务**：创建 api/events.ts，封装 listEvents()，在组件中只调用函数不拼接 URL。\n- [ ] **状态边界**：处理 loading、empty、error、success 及重试逻辑。\n    - **知识讲解**：请求通常至少有 idle、loading、success、empty、error 状态；success 可以有数据为空，两者文案不应混淆。\n    - **跟练任务**：给活动列表绘制状态转移草图，逐一模拟等待、无结果、500 和正常数据。\n- [ ] **错误恢复**：异常不能导致整页不可用；有可读提示和下一步操作。\n    - **知识讲解**：出错提示应告诉用户怎么恢复：重试按钮、检查网络、保留旧内容；仅在控制台报错不足以交付。\n    - **跟练任务**：断开网络触发 error，提供“重新加载”按钮并验证恢复流程。\n- [ ] **输入校验**：前端在提交前给及时提示，但知道真正的权限与安全校验必须靠后端。\n    - **知识讲解**：前端校验能减少无效提交，但攻击者可直接调用 API；后端必须重新验证规则和权限。\n    - **跟练任务**：实现邮箱格式和必填提示，并说明后端仍要拒绝同样非法的请求。\n- [ ] **组件测试**：会测试搜索函数、筛选规则和组件主要交互，不只测试是否能渲染。\n    - **知识讲解**：组件测试关注具体交互与输出，例如搜索框输入后是否只显示匹配结果；不要只测渲染没崩。\n    - **跟练任务**：写一个测试：输入“图论”后只出现图论活动，输入不存在词显示空状态。\n- [ ] **端到端测试**：用 Playwright 或手动脚本覆盖完整用户路径：打开、搜索、查看详情。\n    - **知识讲解**：E2E 通过浏览器操作完整路径，覆盖路由、渲染和事件；与单元测试互补而非互相替代。\n    - **跟练任务**：用 Playwright 从首页点击活动并返回列表，截图或保存运行报告。\n- [ ] **无障碍**：键盘可达、焦点可见、label 正确、图片有意义的 alt。\n    - **知识讲解**：无障碍首先是可键盘操作、可识别名称、正确标题与合理对比；动态错误提示最好可被辅助技术感知。\n    - **跟练任务**：闭眼不使用鼠标完成活动搜索和详情打开，至少修复一处键盘障碍。\n- [ ] **响应式回归**：组件变动后重新检查手机、平板、桌面。\n    - **知识讲解**：组件变更可能影响多个尺寸。先检查窄屏最容易溢出的长标题、表单和弹窗，再测平板/桌面。\n    - **跟练任务**：每次调整导航后固定回归 360、768、1440px 三种宽度。\n- [ ] **性能测量**：用 Lighthouse/Network 分析图片体积、资源加载，优化有明确收益的问题。\n    - **知识讲解**：性能优化从测量开始：图片传输体积、关键 JS 资源、请求数量和实际用户感受比随意“上缓存”重要。\n    - **跟练任务**：用 Lighthouse 与 Network 对比一次图片尺寸优化前后的结果并记录数值。\n- [ ] **数据与视图分离**：用 API 类型/适配层减少服务端字段变化对组件的影响。\n    - **知识讲解**：API 字段与 UI 显示不是一回事；用适配函数将后端字段转成前端视图模型，避免每个组件各自处理空值。\n    - **跟练任务**：把 start_time 映射为 startTime，把缺失地点转成“待定”，仅在适配层处理。\n- [ ] **错误日志**：保留复现步骤、console/Network 证据，能判断前端还是接口异常。\n    - **知识讲解**：错误记录应包含可复现步骤与请求状态，而不能包含真实用户密码、令牌等秘密。\n    - **跟练任务**：编写“活动页面报错”的 issue 模板，含 URL、操作、状态码、预期/实际。\n#### 本阶段配套综合实战\n\n**四种请求状态与失败恢复**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```ts\ntype LoadState = 'idle' | 'loading' | 'success' | 'error';\nasync function getEvents(): Promise<unknown> {\n  const response = await fetch('/api/events');\n  if (!response.ok) throw new Error('HTTP ' + response.status);\n  return response.json();\n}\n// 组件调用前 state='loading'，成功且校验数据后更新为 success；\n// 失败则更新为 error 并显示可点击的“重试”。\n// 空数组需要单独显示“暂时没有活动”，不能冒充网络失败。\n```\n\n**练习步骤**\n\n1. 实现加载中、正常数据、无结果、错误四种 UI。\n2. 使用 DevTools 网络断开模拟失败，验证重试按钮有效。\n3. 写一条单元测试验证筛选逻辑，一条 E2E 验证搜索流程。\n\n**思考题**：服务器返回 404 会自动让 fetch 进入 catch 吗？\n**参考答案**：fetch 对普通 HTTP 404 通常返回 Response；需要检查 response.ok 后主动抛错。\n\n**实战作品**：社团活动信息台：真实公开 API 或受控模拟 API、搜索/分页/重试、可靠错误提示和测试。\n**验收清单**\n- [ ] 断网情况下页面有可操作的恢复方式\n- [ ] 至少 5 个关键用例有测试记录\n- [ ] 明确区分自己前端负责的行为与 API 负责的行为\n**常见错误**：把后端数据库、账号权限都写成「前端功能」；只测正常数据路径。\n**推荐资料**：[MDN：Web 无障碍（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility)、[Vitest：官方入门](https://vitest.dev/guide/)、[Playwright：官方文档](https://playwright.dev/docs/intro)、[web.dev：Learn Performance](https://web.dev/learn/performance)"
      },
      {
        "title": "完成可展示的前端作品",
        "range": "前端路线 · 第18–20周",
        "description": "围绕明确需求完成作品，并把真实功能、部署方式和限制讲清楚。",
        "task": "完成一个含接口数据、筛选、路由与错误处理的作品，提供线上地址和README。",
        "checks": [
          "作品从真实URL可访问",
          "关键操作有测试",
          "演示功能不会假称已保存到服务器"
        ],
        "sourceSection": "### F4｜第 18–20 周 · 前端毕业项目与作品集\n**目标**：上线一个可解释、可维护、可访问的中等复杂度前端作品。\n**知识点 / 掌握标准**\n- [ ] **需求说明**：能把模糊想法拆成功能清单、页面清单和验收项。\n    - **知识讲解**：需求要可验收；“页面高级”不可验证，“手机不横向溢出并支持搜索与详情”可验证。\n    - **跟练任务**：写 8 条功能需求并为每条定义操作与预期结果。\n- [ ] **信息架构**：画出导航结构与页面之间的关系。\n    - **知识讲解**：信息架构说明页面和入口的关系；用户应该能预测点击导航后到哪里，避免跳转混乱。\n    - **跟练任务**：画首页→活动列表→活动详情→资料页的页面关系图。\n- [ ] **组件规划**：挑出复用组件，解释拆分原则和文件布局。\n    - **知识讲解**：组件规划从重复内容和变化点出发，通用组件稳定，业务组件负责自身领域，不为复用而复用。\n    - **跟练任务**：列出组件树并圈出至少 3 个实际复用的组件。\n- [ ] **设计一致性**：统一按钮、颜色、字体、间距与表单状态。\n    - **知识讲解**：设计一致性来自少量颜色、排版和间距规则，而不是所有元素都加动画和渐变。\n    - **跟练任务**：写一个 design-tokens.css，统一按钮高度、卡片圆角和正文色。\n- [ ] **真实数据策略**：公开 API、模拟 API 或本地文件合理选型，并注明数据来源。\n    - **知识讲解**：公开 API、受控 mock、本地 JSON 各有适用场景。mock 必须标注演示数据，不能冒充实时真实数据。\n    - **跟练任务**：为每个页面注明数据来源，移除“假的报名成功/真实用户数”误导。\n- [ ] **错误与空态**：每个重要页面都有加载、为空、失败的表现。\n    - **知识讲解**：所有重要组件要考虑加载、为空、失败；例如空列表不是报错，用户应该知道下一步能做什么。\n    - **跟练任务**：把网络断开并把返回活动设空，分别展示两套不同提示。\n- [ ] **单元与 E2E**：为关键逻辑编写测试，保留运行说明。\n    - **知识讲解**：单元测试保护筛选排序等逻辑，E2E 检验浏览器流程；测试要包括失败场景。\n    - **跟练任务**：选三个核心流程，各写输入、预期和证据位置；至少实现一个自动化测试。\n- [ ] **部署与回滚**：构建并部署静态前端，能回退到可用版本。\n    - **知识讲解**：前端发布要保证构建产物与路由配置正确；回滚应能恢复上一可用版本，不只提交新代码。\n    - **跟练任务**：部署两次版本，演练回退一次，验证旧页面链接仍可访问。\n- [ ] **作品集陈述**：README 讲清目标、技术权衡、本人负责部分和限制。\n    - **知识讲解**：作品集展示真实能力：目标、方案、权衡、遇到的 Bug 和你亲手解决的细节，比技术栈堆叠更有说服力。\n    - **跟练任务**：在 README 加上技术选择理由、项目截图与两项实际修复记录。\n- [ ] **演示与复盘**：准备 3 分钟演示：问题→方案→功能→遇到的问题→改进。\n    - **知识讲解**：好的演示讲清用户问题和证据，不把“用了 AI”视为功能本身；限制要明确。\n    - **跟练任务**：准备 3 分钟演示脚本，现场演示一次错误恢复而不仅是成功截图。\n#### 本阶段配套综合实战\n\n**把产品目标写成可验收功能**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```md\n## 功能：活动筛选\n前提：列表中有图论、动态规划活动\n操作：输入“图论”\n预期：只出现图论训练，页面不重载\n空数据：输入不存在关键词显示“没有匹配活动”\n失败：API 500 显示错误与“重试”按钮\n证据：tests/search.spec.ts、screenshots/360.png\n```\n\n**练习步骤**\n\n1. 把首页、列表、详情划分为页面与可复用组件。\n2. 逐条写下真实功能的输入、输出和异常路径。\n3. 做现场演示，公开承认尚未实现的服务端功能。\n\n**思考题**：演示“假的报名成功弹窗”能算实现报名功能吗？\n**参考答案**：不能。没有服务端记录或实际连接时应明确标注“界面演示”，不能误导用户。\n\n**实战作品**：「社团活动与资料展示平台」前端版：多页面、筛选/收藏、响应式、无障碍和测试；数据可来自可靠外部 API 或 mock。\n**验收清单**\n- [ ] 提供可访问的演示地址、源码地址、README\n- [ ] 核心流程在 PC 与手机实测可用\n- [ ] 能独立修改一个新增需求并说明测试结果\n**常见错误**：为了「全栈感」去自建没有必要的后台；用假按钮或摆设功能充数。\n**推荐资料**：[React：Thinking in React](https://react.dev/learn/thinking-in-react)、[Vue 3：官方中文指南](https://cn.vuejs.org/guide/introduction)、[MDN：Web 无障碍（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility)、[GitHub Pages：发布教程](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)"
      },
      {
        "title": "准备全栈的前端界面",
        "range": "全栈路线 · 第9–11周",
        "description": "选择一个前端框架和TypeScript，为后续自己的API准备页面。",
        "task": "完成活动管理的列表、详情、表单与路由，先用明确标注的模拟数据。",
        "checks": [
          "组件职责清楚",
          "表单状态与输入校验可用",
          "模拟数据与真实保存的区别已写明"
        ],
        "sourceSection": "### S1｜第 9–11 周 · 前端框架与 TypeScript\n**目标**：能构建一个读取 API 的组件化前端，理解它与后端之间的协议。\n**知识点 / 掌握标准**\n- [ ] **框架二选一**：在 React 与 Vue 中选一种完成首个项目，不并行学习。\n    - **知识讲解**：全栈不等于不用前端。选一套框架理解组件、路由与状态，后端返回的数据最终仍要被正确展示。\n    - **跟练任务**：在 React/Vue 中选一种，画出社团首页三组件的关系。\n- [ ] **Vite/模块**：使用开发服务器、npm 脚本、import/export 管理代码。\n    - **知识讲解**：import/export 组织模块，Vite 提供开发与构建；不要把 npm run dev 误认为上线生产后端。\n    - **跟练任务**：建立 Vite 项目并拆出 EventCard 模块，跑 build 确认产物。\n- [ ] **TypeScript 基础**：类型、接口、函数和 API 响应数据建模。\n    - **知识讲解**：TS 类型帮助编辑器提前发现 id 数字/字符串等错误，但外部 API 数据需要运行时校验。\n    - **跟练任务**：定义 Event 接口并在组件中使用，模拟不符合形状的服务端响应。\n- [ ] **组件拆分**：页面拆为列表、详情、表单、消息提示等模块。\n    - **知识讲解**：职责清晰的组件减少耦合：列表、详情、表单、状态提示可以分别维护。\n    - **跟练任务**：把单页改成四个组件，再改活动卡片视觉验证没有重复修改多处。\n- [ ] **状态与事件**：区分组件内状态、共享状态与后端持久数据。\n    - **知识讲解**：表单 state 保存用户输入，后端保存持久结果，二者生命周期不同；不能把 localStorage 当作可靠共享数据。\n    - **跟练任务**：页面提交后重新请求活动数据而不是永远只更新浏览器变量。\n- [ ] **路由**：理解前端路由和后端路由，各自处理哪些 URL。\n    - **知识讲解**：前端路由选择哪个组件显示，API 路由决定后端如何处理请求，二者常分别使用 /events 和 /api/events。\n    - **跟练任务**：画出 /events 和 /api/events 各走哪部分代码，并在 Network 验证。\n- [ ] **fetch 调用**：会向模拟 API 请求，并处理成功、失败、超时/断网情形。\n    - **知识讲解**：fetch 需要检查 response.ok，处理 JSON 格式和失败状态；开发代理可以避免不必要的路径混乱。\n    - **跟练任务**：从受控 mock API 拉取活动，分别测试成功和 500。\n- [ ] **表单校验**：向用户显示错误，知道后端仍须独立校验。\n    - **知识讲解**：页面校验改善体验，安全的最终判定在后端；不要只禁用按钮就认为权限被保护。\n    - **跟练任务**：让姓名为空时报错，同时写出后端必须检查的同一规则。\n- [ ] **浏览器调试**：使用 Network 报文验证真实请求，不猜接口行为。\n    - **知识讲解**：Network 中会真实显示请求方法、URL、Body、状态码与响应体，定位联调时比猜测快。\n    - **跟练任务**：提交表单后截图保存 Request Payload 与 Response，确认数据正确。\n- [ ] **环境变量**：明白公开前端配置与服务器秘密配置的差别。\n    - **知识讲解**：前端能看到的任何字符串都应按公开信息看待。数据库口令、签名密钥只能留在服务器环境配置中。\n    - **跟练任务**：打包生产 bundle 并搜索公开环境变量，验证没有数据库密码。\n#### 本阶段配套综合实战\n\n**区分前端状态和服务器数据**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```ts\ntype EventItem = { id: number; title: string };\nasync function listEvents(): Promise<EventItem[]> {\n  const res = await fetch('/api/events');\n  if (!res.ok) throw new Error('活动加载失败');\n  // 实际项目仍需对外部 JSON 做运行时校验\n  return await res.json() as EventItem[];\n}\n// 前端输入框的当前关键词是临时 UI state；\n// 活动记录最终由 API 与数据库负责持久化。\n```\n\n**练习步骤**\n\n1. 选择 React 或 Vue 完成搜索、列表、详情基本框架。\n2. 用模拟 API 将前端活动与服务器数据区分开。\n3. 在 Network 明确指出哪个请求来自真实服务器。\n\n**思考题**：把管理员按钮隐藏后，普通用户是否就没有权限调用管理员接口？\n**参考答案**：不是。隐藏只影响 UI；真正权限必须由后端对每个受保护请求进行验证。\n\n**实战作品**：建立组件化活动管理前端，暂用模拟接口；后续不重写 UI，直接对接自己开发的后端。\n**验收清单**\n- [ ] 能用示意图画出组件→API→服务端的数据流\n- [ ] 模拟 API 出错时不白屏\n- [ ] 能说明前端无法单独实现可靠的管理员权限\n**常见错误**：认为「全栈」就是跳过前端；使用前端隐藏按钮作为权限控制。\n**推荐资料**：[Vite：入门指南](https://vite.dev/guide/)、[TypeScript：官方手册](https://www.typescriptlang.org/docs/handbook/intro)、[React：Thinking in React](https://react.dev/learn/thinking-in-react)、[Vue 3：官方中文指南](https://cn.vuejs.org/guide/introduction)"
      },
      {
        "title": "给页面接上自己的API",
        "range": "全栈路线 · 第12–14周",
        "description": "理解HTTP与REST，先定契约，再把前端请求与后端CRUD连起来。",
        "task": "为活动或题目写API契约并实现CRUD；已有Go路线可直接用net/http实现，保持接口约定。",
        "checks": [
          "成功与错误响应一致",
          "前端处理非2xx与网络失败",
          "明确本地演示还缺哪些上线条件"
        ],
        "sourceSection": "### S2｜第 12–14 周 · HTTP、服务端与 REST API\n**目标**：用 Node.js + Express（或 Python + FastAPI）做出规范、可测试的 API。\n**知识点 / 掌握标准**\n- [ ] **请求/响应模型**：区分浏览器、网络、Web 服务器、应用逻辑与数据库。\n    - **知识讲解**：浏览器构造请求；服务器按路由和业务规则计算；数据库持久化；服务端再返回状态与 JSON。各层有清晰的边界。\n    - **跟练任务**：画出点击“创建活动”后从浏览器到服务器返回的 5 个步骤。\n- [ ] **路由与方法**：设计 GET/POST/PATCH/DELETE 的合理用途与 URL。\n    - **知识讲解**：GET 读资源，POST 常用于创建，PATCH 部分更新，DELETE 删除；URL 用名词例如 /api/events/12。\n    - **跟练任务**：设计 /api/events 的 CRUD 表，写出每个方法、路径、成功码。\n- [ ] **状态码**：理解 200/201/204/400/401/403/404/409/500 的典型场景。\n    - **知识讲解**：200 通常表示成功返回，201 创建，204 无响应体；400 请求不合法、401 未认证、403 无权、404 不存在、500 服务器错误。\n    - **跟练任务**：为“缺少标题”“活动不存在”“普通用户删活动”分别选合适状态码。\n- [ ] **JSON 请求体**：接收、解析和返回 JSON；正确设置 Content-Type。\n    - **知识讲解**：express.json() 解析 JSON 请求体；Content-Type:application/json 声明发送类型。缺少字段必须返回错误而非默默保存空值。\n    - **跟练任务**：用 curl -H \"Content-Type: application/json\" -d ... 测试 POST 接收的数据。\n- [ ] **输入校验**：对必填项、长度、类型、格式进行服务端校验。\n    - **知识讲解**：服务端必须校验结构、字符串长度和业务约束；仅检查 input.required 不够，因为客户端可以绕过。\n    - **跟练任务**：用 Postman/curl 跳过页面，直接传空标题，确保后端返回 400。\n- [ ] **后端分层**：区分路由、控制器/处理器、业务逻辑、数据访问。\n    - **知识讲解**：路由层接收 HTTP，服务层处理业务，数据层负责读写；小项目可先简单拆开，避免一个函数包办所有逻辑。\n    - **跟练任务**：把“活动标题不能为空”的检查抽成业务函数，编写单元测试。\n- [ ] **异步 I/O**：理解服务器读库/文件时的等待和异常处理。\n    - **知识讲解**：await I/O 时线程不应被昂贵同步任务阻塞；Promise 拒绝要被 try/catch 或错误中间件处理。\n    - **跟练任务**：在查询函数里模拟 reject，验证 API 返回统一错误而不是让进程退出。\n- [ ] **环境配置**：使用 .env 等方式保存配置，不把机密写进公开仓库。\n    - **知识讲解**：PORT、数据库连接参数等通过服务器环境变量配置；仓库放 .env.example，真实 .env 不进 Git。\n    - **跟练任务**：建立 .env.example，仅含变量名与无秘密示例值，确认 git status 不出现本地密钥。\n- [ ] **CORS**：明白跨域是浏览器的访问约束，不是登录机制或安全授权。\n    - **知识讲解**：CORS 决定浏览器是否允许跨源脚本读取响应，并不能防止 curl、服务器程序直接调用 API；鉴权是另一回事。\n    - **跟练任务**：用浏览器和 curl 分别访问接口，解释为什么设置 CORS 不是权限控制。\n- [ ] **错误处理**：规范错误响应格式；不直接把堆栈、SQL、密钥暴露给客户端。\n    - **知识讲解**：给用户错误信息但不泄漏堆栈或 SQL；错误处理中间件统一转成 {error:{code,message}}。\n    - **跟练任务**：制造服务端异常，检查浏览器响应只含通用可理解提示，日志内部可定位。\n- [ ] **接口测试**：用 curl/HTTP 客户端发送请求，验证非法输入和不存在资源。\n    - **知识讲解**：接口可以独立测试，不依赖前端。用 curl 发送合法、缺字段、非法 ID、重复创建等请求。\n    - **跟练任务**：完成一组 5 条 curl 用例并记录请求、响应状态和预期。\n- [ ] **API 契约**：写接口文档：字段、示例、失败码；前后端依据契约协作。\n    - **知识讲解**：接口契约是前后端协作协议：路径、方法、参数、成功样例与错误样例要一致；OpenAPI 也是选项。\n    - **跟练任务**：为活动 GET/POST 接口各写请求示例、200/201 数据、400 错误返回。\n#### 本阶段配套综合实战\n\n**Express：活动接口（教学版）**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```js\nimport express from 'express';\nconst app = express();\napp.use(express.json());\nconst events = [{id:1,title:'图论训练'}];\napp.get('/api/events', (req,res) => res.json(events));\napp.post('/api/events', (req,res) => {\n  if (typeof req.body?.title !== 'string' || !req.body.title.trim())\n    return res.status(400).json({error:'标题不能为空'});\n  const item = {id:events.length+1,title:req.body.title.trim()};\n  events.push(item);\n  res.status(201).json(item);\n});\napp.listen(3000);\n// 教学示例：内存数据重启即消失，且尚无认证、授权和完整校验。\n```\n\n**练习步骤**\n\n1. 单独新建后端项目，安装 express 并设置 type:module。\n2. 使用 curl 测试 GET、合法 POST 和标题为空的 POST。\n3. 记录重启后数据消失的事实，为下一阶段 SQL 铺垫。\n\n**思考题**：为什么不能把示例 Express POST 接口直接开放给真实用户？\n**参考答案**：它还缺少鉴权、授权、速率限制、充分校验与持久化，仅为教学演示。\n\n**实战作品**：活动 API v1：新增活动、列表、按 ID 查询、编辑、删除；先用内存数据理解流程。\n**验收清单**\n- [ ] 正确区分 400、404 和 500 等错误\n- [ ] 非法数据会被后端拒绝而不只是页面上提示\n- [ ] 只启动后端也能独立调用接口完成 CRUD\n**常见错误**：没有学 HTTP 就盲上 Next.js 全栈魔法；把 CORS 配置误当权限控制。\n**推荐资料**：[MDN：HTTP 概述（中文）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Overview)、[Node.js：官方学习文档](https://nodejs.org/learn/getting-started/introduction-to-nodejs)、[Express：Hello World 与路由](https://expressjs.com/en/starter/hello-world/)、[FastAPI：官方中文教程](https://fastapi.tiangolo.com/zh/tutorial/)"
      },
      {
        "title": "设计可以持续使用的数据",
        "range": "全栈路线 · 第15–17周",
        "description": "建立表关系与约束，处理数据迁移、事务和查询，而不是只把对象塞进数据库。",
        "task": "给项目建表、写迁移与查询；实际验证重复值、外键和重启持久化。",
        "checks": [
          "新空库可按迁移初始化",
          "约束实际生效",
          "多步操作失败能回滚，记录可持久保存"
        ],
        "sourceSection": "### S3｜第 15–17 周 · 数据库与数据建模\n**目标**：能独立设计简单关系表、写 SQL，避免把用户数据散放在 JSON 文件里。\n**知识点 / 掌握标准**\n- [ ] **关系数据库**：理解表、行、列、主键、外键与唯一约束。\n    - **知识讲解**：主键唯一标识行，外键表达引用关系。活动与报名是 1:N 关系，报名表需要 event_id 引用活动。\n    - **跟练任务**：画 events、members、registrations 三张表并标出主键/外键。\n- [ ] **基本 SQL**：会 CREATE TABLE、INSERT、SELECT、UPDATE、DELETE。\n    - **知识讲解**：INSERT 加数据，SELECT 查数据，UPDATE 改数据，DELETE 删除；写操作必须留意 WHERE，避免修改全表。\n    - **跟练任务**：在独立测试库写三条活动，SELECT 验证，再只 UPDATE 一条活动标题。\n- [ ] **WHERE/ORDER/LIMIT**：完成过滤、排序和分页的数据库查询。\n    - **知识讲解**：WHERE 过滤、ORDER BY 排序、LIMIT/OFFSET 分页；服务端不能无上限返回几十万条记录。\n    - **跟练任务**：写一条查询：取最近 10 个未来活动，按开始时间排序。\n- [ ] **JOIN**：理解一对多/多对多关系；活动与报名记录如何关联。\n    - **知识讲解**：JOIN 用关联键连接表；1:N 记录重复可能造成意外计数，需要明确统计语义。\n    - **跟练任务**：JOIN 活动和报名表，查询每个活动的报名人数并验证为 0 的活动。\n- [ ] **索引**：知道索引有助于查询，也会占空间与增加写入成本。\n    - **知识讲解**：索引适合常过滤/关联的列，但增加写入维护与占用空间；先用执行计划定位慢查询再建索引。\n    - **跟练任务**：为 registrations.event_id 建索引，比较查询计划而非凭感觉宣称提速。\n- [ ] **约束与一致性**：使用 NOT NULL、UNIQUE、FOREIGN KEY 防止脏数据。\n    - **知识讲解**：数据库约束是底线：NOT NULL 不许空，UNIQUE 保证唯一，FOREIGN KEY 防止引用不存在的父记录。\n    - **跟练任务**：为 (member_id,event_id) 加 UNIQUE，尝试重复报名并捕获约束错误。\n- [ ] **事务**：用事务处理多步骤修改，解释全部成功或全部回滚。\n    - **知识讲解**：事务把一组操作变成“全部成功或全部回滚”；报名扣名额与生成记录需要一致。\n    - **跟练任务**：故意在事务第二步制造错误，确认前一步的数据也回滚。\n- [ ] **迁移**：理解 schema 版本升级和数据迁移，不靠删库重建做更新。\n    - **知识讲解**：schema 迁移记录数据库结构变化；上线不能简单删掉表重建，否则丢失数据。\n    - **跟练任务**：从 events 添加 location 字段，写一次迁移并在已有数据环境验证。\n- [ ] **参数化查询**：避免字符串拼接用户输入造成 SQL 注入。\n    - **知识讲解**：参数化 SQL 把用户输入当数据而非 SQL 语法的一部分，是防止注入的核心策略。\n    - **跟练任务**：用占位符查询标题关键字，试输入引号等特殊字符，确保不改变查询结构。\n- [ ] **数据访问层**：把 SQL/ORM 调用从路由处理逻辑中拆开。\n    - **知识讲解**：路由关注 HTTP，数据层负责 SQL/ORM 查询，方便测试和以后替换存储技术。\n    - **跟练任务**：将“按 id 查活动”的 SQL 移到 repository 文件，路由仅调用函数。\n- [ ] **数据库选型**：本地练习可用 SQLite；多人在线部署可学习 PostgreSQL。\n    - **知识讲解**：SQLite 适合单机教学与轻量存储；PostgreSQL 更适合多人共享在线服务和复杂并发，需要按需求选型。\n    - **跟练任务**：在项目说明中写出为何当前选 SQLite，何时准备迁往 PostgreSQL。\n- [ ] **备份和恢复**：知道备份必须验证可恢复，不能只复制一个随时被写入的文件。\n    - **知识讲解**：备份不是复制按钮；必须明确备份时机、文件位置、保留策略，并验证能够恢复到一个全新实例。\n    - **跟练任务**：制作测试库备份，删除临时实例后从备份恢复，检查活动数量与记录。\n#### 本阶段配套综合实战\n\n**把报名规则交给数据库约束**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```sql\nCREATE TABLE events (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL\n);\nCREATE TABLE registrations (\n  id INTEGER PRIMARY KEY,\n  event_id INTEGER NOT NULL REFERENCES events(id),\n  member_id INTEGER NOT NULL,\n  UNIQUE(event_id, member_id)\n);\n-- PostgreSQL / SQLite 中具体键约束行为应依据配置核实。\n```\n\n**练习步骤**\n\n1. 建立 events 和 registrations 表，新增三条测试记录。\n2. 尝试同成员重复报同活动，观察 UNIQUE 错误。\n3. 在后端实现参数化查询，并重启确认数据保留。\n\n**思考题**：为什么只有应用层判断“不能重复报名”还不够？\n**参考答案**：并发请求可能同时通过应用层检查；数据库 UNIQUE 约束是最终一致性底线之一。\n\n**实战作品**：活动、成员、报名记录三张关联表；接口从内存数据改为数据库持久化。\n**验收清单**\n- [ ] 重启后端后数据仍然存在\n- [ ] 同一用户不能重复报名同一活动（约束生效）\n- [ ] 对非法输入使用参数化 SQL 或框架安全绑定\n**常见错误**：ORM 会用就认为理解数据库；把用户输入直接拼接进 SQL；所有信息塞进一张大表。\n**推荐资料**：[PostgreSQL：官方 SQL 教程](https://www.postgresql.org/docs/current/tutorial.html)、[OWASP Top 10（2025）](https://top10.owasp.org/2025/0x00_2025-Introduction/)"
      },
      {
        "title": "把身份和权限补到服务器",
        "range": "全栈路线 · 第18–20周",
        "description": "设计登录与资源归属，权限要在每次服务器请求上验证。",
        "task": "实现登录、退出、过期和A/B两用户隔离；测试前端改URL、伪造字段与会话失效。",
        "checks": [
          "密码用专用哈希",
          "所有私有CRUD检查对象权限",
          "没有靠隐藏按钮当授权"
        ],
        "sourceSection": "### S4｜第 18–20 周 · 鉴权、权限与 Web 安全\n**目标**：区分认证和授权，能设计最小权限并完成基本安全校验。\n**知识点 / 掌握标准**\n- [ ] **认证 vs 授权**：登录回答「你是谁」；权限回答「你能做什么」。\n    - **知识讲解**：认证确定当前请求来自谁，授权决定这个人可做什么；“已登录”不等于“可以编辑任意用户数据”。\n    - **跟练任务**：画匿名用户、成员、管理员三种角色的 GET/POST/PATCH/DELETE 权限表。\n- [ ] **安全的密码保存**：使用成熟的密码哈希机制，不存明文，不自创加密算法。\n    - **知识讲解**：密码只能保存成熟的慢哈希（如 Argon2id）生成的结果与必要参数，不能保存明文或简单 SHA256。\n    - **跟练任务**：查阅成熟认证库的哈希与验证接口，确认数据库只出现哈希而不是密码原文。\n- [ ] **会话与 Cookie**：了解服务端会话、HttpOnly、Secure、SameSite 的基本用途。\n    - **知识讲解**：Cookie 把会话标识随请求带上；HttpOnly 降低 JS 读取风险，Secure 约束 HTTPS，SameSite 可辅助 CSRF 防护。\n    - **跟练任务**：在 DevTools 查看测试站 Cookie 属性，解释每项作用与局限。\n- [ ] **权限校验**：每个写入/敏感读取接口做服务端身份与角色校验。\n    - **知识讲解**：真正授权要在服务器上针对每个受保护资源检查角色与资源所有权，不信任浏览器传来的 role 字段。\n    - **跟练任务**：直接调用管理员删除接口，确认普通成员返回 403 而非仅按钮隐藏。\n- [ ] **水平越权**：普通用户不能靠改 URL 或 ID 查看/修改别人的记录。\n    - **知识讲解**：水平越权是把 URL 的报名 id 改成别人的就可以读取/删除。权限不能仅检查资源 ID 是否存在。\n    - **跟练任务**：成员 A 用成员 B 的报名 ID 发起删除请求，验证服务器拒绝。\n- [ ] **输入验证**：服务端验证类型、长度、规则；适当处理超大请求体。\n    - **知识讲解**：输入验证要检查类型、长度、允许值和请求体大小，避免无效数据和滥用；安全编码不是简单禁用特殊字符。\n    - **跟练任务**：提交 10 万字符标题、数组代替字符串，确认后端以 4xx 拒绝。\n- [ ] **SQL 注入**：使用参数化查询和 ORM 安全接口，避免拼 SQL。\n    - **知识讲解**：SQL 注入来自把输入拼进查询语法；采用参数化绑定，不靠黑名单删除引号。\n    - **跟练任务**：检查 SQL 调用是否使用参数绑定，添加包含单引号的正常名字测试。\n- [ ] **XSS**：默认对不可信内容作安全输出处理，不直接执行用户提供的 HTML。\n    - **知识讲解**：XSS 是不可信数据变成浏览器可执行脚本；输出到网页时使用框架默认转义或 textContent。\n    - **跟练任务**：把活动标题设为带标签的字符串，确认页面按文本显示而不执行 HTML。\n- [ ] **CSRF**：使用 Cookie 会话时理解跨站请求伪造风险和对应防护。\n    - **知识讲解**：浏览器携带 Cookie 时可能遭跨站请求伪造；SameSite、CSRF Token、Origin 检查按应用架构组合。\n    - **跟练任务**：在架构笔记说明 Cookie 会话提交表单为何需要 CSRF 防护。\n- [ ] **速率限制**：对登录等高风险接口设合理限制，避免无成本暴力尝试。\n    - **知识讲解**：登录尝试是高风险接口，限速与告警可提高暴力尝试成本；不能只对单个 IP 一刀切忽略误伤。\n    - **跟练任务**：为测试登录接口设计速率限制与重试提示，验证超限响应不泄漏账号存在性。\n- [ ] **HTTPS 与秘密**：使用 HTTPS，秘密配置留在服务器，及时轮换泄漏密钥。\n    - **知识讲解**：HTTPS 保护传输；服务器密钥不可发到前端代码，泄漏后要轮换；证书失效也会影响线上可用性。\n    - **跟练任务**：核对 .gitignore、部署环境变量和构建产物，模拟发现密钥泄漏后的轮换流程。\n- [ ] **错误与日志**：日志不记录口令、令牌、敏感隐私；错误不泄漏内部实现。\n    - **知识讲解**：日志要能定位接口错误，但不能记录口令、Cookie 值、认证令牌；对外 500 提示不应暴露堆栈。\n    - **跟练任务**：登录失败写入时间/错误码，不写用户密码；检查错误响应是否包含数据库连接信息。\n- [ ] **依赖风险**：定期检查依赖，避免安装来源不明的包。\n    - **知识讲解**：第三方依赖可能引入已知漏洞或供应链风险；升级前检查兼容性和来源，不盲目安装不明包。\n    - **跟练任务**：运行 npm audit（或对应语言的依赖审计工具），列出需处理的项并验证升级测试。\n#### 本阶段配套综合实战\n\n**权限检查必须执行在服务器**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```js\n// 教学伪代码，不能直接运行：req.user 必须由成熟的认证中间件建立\nfunction requireAdmin(req, res, next) {\n  if (!req.user) return res.sendStatus(401);\n  if (req.user.role !== 'admin') return res.sendStatus(403);\n  next();\n}\napp.delete('/api/events/:id', authenticate, requireAdmin, deleteEvent);\n// 同时要校验资源所有权和请求数据，真实项目采用安全库。\n```\n\n**练习步骤**\n\n1. 画普通成员与管理员的权限矩阵。\n2. 用测试会话分别请求受保护 API，检查 401/403 的差别。\n3. 增加尝试修改别人报名记录的越权案例。\n\n**思考题**：已登录的 A 把请求里的 memberId 改成 B 后，服务器应该检查什么？\n**参考答案**：检查该资源属于谁，以及当前 A 是否被授权操作 B 的资源，而不是只验证 A 已登录。\n\n**实战作品**：添加普通成员/管理员：管理员管理活动，成员查看与报名；后端强制校验权限。\n**验收清单**\n- [ ] 未登录不能访问受保护写入接口\n- [ ] 成员直接请求管理员接口返回适当拒绝\n- [ ] 改动别人的报名 ID 不会越权成功\n**常见错误**：只在前端隐藏按钮；把 JWT 当成一键安全；自写密码加密；忽略越权测试。\n**推荐资料**：[OWASP Top 10（2025）](https://top10.owasp.org/2025/0x00_2025-Introduction/)、[Express：Hello World 与路由](https://expressjs.com/en/starter/hello-world/)、[FastAPI：官方中文教程](https://fastapi.tiangolo.com/zh/tutorial/)"
      },
      {
        "title": "联调、部署，并验证恢复",
        "range": "全栈路线 · 第21–24周",
        "description": "用端到端测试、配置和日志交付应用，备份也要实际试恢复。",
        "task": "完成前后端联调与部署说明；执行关键流程、失败恢复和备份恢复测试。",
        "checks": [
          "CI测试确实执行",
          "新环境能照README运行",
          "备份能实际恢复并检查业务数据"
        ],
        "sourceSection": "### S5｜第 21–24 周 · 联调、测试、部署与运维\n**目标**：独立完成前端+API+数据库的部署、验收与基本维护。\n**知识点 / 掌握标准**\n- [ ] **联调定位**：能区分前端逻辑、网络、API 和数据库层发生的故障。\n    - **知识讲解**：请求链路跨浏览器、网络、应用、数据库；先用 Network 确认请求是否发出，再看服务器日志与 SQL。\n    - **跟练任务**：制造一例 API 500，从 Network、后端日志、数据库连接逐层确认问题归属。\n- [ ] **测试金字塔**：理解单元、接口、端到端测试各自覆盖的风险。\n    - **知识讲解**：单元测试检查小函数，接口测试检查服务合同，E2E 检查用户流程；越靠上越完整但通常更慢更难定位。\n    - **跟练任务**：为“报名活动”画一张三层测试矩阵，给每层至少两个案例。\n- [ ] **接口自动化**：覆盖正常 CRUD、参数错误、未登录、权限不足与不存在 ID。\n    - **知识讲解**：接口自动化必须覆盖成功与失败：字段错误、未登录、越权、找不到资源、重复报名。\n    - **跟练任务**：编写用例断言：POST /api/events 空标题返回 400，不只检查“有返回”。\n- [ ] **E2E**：从登录到报名再到取消报名跑一次完整流程。\n    - **知识讲解**：E2E 要模拟真实用户连续操作，关注浏览器和服务组合；可以保留截图/trace 辅助复现。\n    - **跟练任务**：用 Playwright 完成登录→打开活动→报名→取消报名的完整链路。\n- [ ] **数据库隔离**：测试使用独立数据库/测试数据，不能污染生产环境。\n    - **知识讲解**：测试应使用单独数据库，避免覆盖真实报名记录；测试结束后清理数据或重建测试环境。\n    - **跟练任务**：确保 TEST_DATABASE_URL 指向独立库，故意失败时核对生产库未被改写。\n- [ ] **环境管理**：区分开发、测试、生产环境和不同配置。\n    - **知识讲解**：开发、测试、生产各自有独立配置与数据；线上调试不要默认开启详细错误堆栈或弱安全选项。\n    - **跟练任务**：建立一张配置表列出不同环境的数据库地址、CORS 与日志级别。\n- [ ] **部署架构**：能够画出浏览器→前端托管→后端服务→数据库。\n    - **知识讲解**：部署通常拆为静态前端、后端进程、数据库三部分；可在同一服务器也可分开托管。\n    - **跟练任务**：画实际公网访问图，标出前端域名、/api 路径、后端端口和数据库连接。\n- [ ] **域名/HTTPS**：理解 DNS、证书和反向代理的基本职责。\n    - **知识讲解**：DNS 把域名指向服务器；HTTPS 证书证明加密连接；反向代理可转发路径并终止 TLS。\n    - **跟练任务**：解释访问 https://example.com/api/events 时请求经过哪几层，不需要立即学 Nginx 全部参数。\n- [ ] **日志与监控**：记录关键错误及健康检查信息，能查看服务是否正常。\n    - **知识讲解**：健康检查用于判断服务状态，日志帮助定位错误；监控应包含成功率、延迟和错误变化，而不只看 CPU。\n    - **跟练任务**：添加不泄漏内部详情的 /health 接口，模拟数据库不可用时的告警与日志。\n- [ ] **数据备份**：有备份与恢复演练，明确数据丢失风险。\n    - **知识讲解**：备份只有成功恢复过才可信；演练应记录时间点、恢复步骤、数据完整性与可接受损失。\n    - **跟练任务**：恢复一次演示数据备份，抽查活动和报名的主外键关系。\n- [ ] **发布回滚**：上线前备份/迁移检查，失败能恢复旧版。\n    - **知识讲解**：发布前检查迁移兼容性和回滚方案；含数据库破坏性变更时，回滚不只是切 Git commit。\n    - **跟练任务**：演练新版本失败：回退应用代码，评估数据库迁移能否安全回退。\n- [ ] **CI 基础**：push / PR 时自动执行构建、检查和核心测试。\n    - **知识讲解**：CI 可以在 PR 自动运行 lint、typecheck、build、test；工作流成功不保证线上业务百分百正确。\n    - **跟练任务**：写一个 GitHub Actions 工作流，提交破坏测试的修改，确认 PR 会失败。\n- [ ] **文档与交接**：README、环境变量样例、API 文档、上线/回滚说明完整。\n    - **知识讲解**：文档需要包括启动、环境变量模板、API 合同、迁移、上线和恢复步骤，让未参与开发者也能接手。\n    - **跟练任务**：把项目交给另一名同学，仅按文档从零启动并记下缺失步骤。\n- [ ] **容量与成本意识**：了解免费额度、后端休眠、数据库连接数、存储与带宽费用。\n    - **知识讲解**：上线成本包括计算、数据库、存储、带宽、流量与服务休眠；免费额度并不等于无限资源。\n    - **跟练任务**：列出预期用户数、图片大小、月流量与托管方案，用估算表解释选择。\n#### 本阶段配套综合实战\n\n**让 CI 拒绝错误提交**：下面为教学案例代码，依照注释补齐必要项目结构；不代表可直接部署生产。\n\n```yaml\nname: verify\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '22'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint --if-present\n      - run: npm test --if-present\n      - run: npm run build --if-present\n# 项目应提供真实 test 脚本；--if-present 会跳过缺失项，不能当成已有测试。\n```\n\n**练习步骤**\n\n1. 配置 lint、测试、构建命令，并确保核心测试脚本真实存在。\n2. 故意让测试失败，检查 PR 阻断且能看到日志。\n3. 制作数据库备份恢复演练并写上线回滚流程。\n\n**思考题**：GitHub Actions 全部绿色能保证数据库备份可恢复吗？\n**参考答案**：不能。必须独立做一次实际恢复测试，验证业务数据完整性。\n\n**实战作品**：社团活动管理系统全栈版：成员账号、管理员、活动与报名数据库、部署、自动化测试、备份说明。\n**验收清单**\n- [ ] 从空环境按文档能够启动项目\n- [ ] 至少验证登录/越权/空数据/断网/异常输入/数据库持久化\n- [ ] 提供真实在线演示与部署说明（机密不入库）\n**常见错误**：只看构建通过，不测线上功能；把生产数据库当测试库；把「能访问」当成安全验收。\n**推荐资料**：[Playwright：官方文档](https://playwright.dev/docs/intro)、[Vitest：官方入门](https://vitest.dev/guide/)、[OWASP Top 10（2025）](https://top10.owasp.org/2025/0x00_2025-Introduction/)、[Node.js：官方学习文档](https://nodejs.org/learn/getting-started/introduction-to-nodejs)"
      }
    ]
  },
  "go": {
    "title": "Go后端",
    "description": "适合有基础编程经验的学习者；用28个学习日逐步完成刷题记录API，从标准库HTTP走到数据库、测试与本地部署。",
    "stages": [
      {
        "id": "go-language",
        "title": "语言与第一个服务",
        "range": "Day 01–07",
        "description": "练Go工具链、数据结构、JSON和测试，再接住第一条HTTP请求。",
        "lessonIds": [
          "go-01",
          "go-02",
          "go-03",
          "go-04",
          "go-05",
          "go-06",
          "go-07"
        ]
      },
      {
        "id": "go-crud",
        "title": "把CRUD真正存下来",
        "range": "Day 08–14",
        "description": "先写接口契约，再完成内存CRUD与PostgreSQL持久化。",
        "lessonIds": [
          "go-08",
          "go-09",
          "go-10",
          "go-11",
          "go-12",
          "go-13",
          "go-14"
        ]
      },
      {
        "id": "go-quality",
        "title": "让项目可测可维护",
        "range": "Day 15–21",
        "description": "单元、HTTP和数据库测试，分层、配置、日志与分页。",
        "lessonIds": [
          "go-15",
          "go-16",
          "go-17",
          "go-18",
          "go-19",
          "go-20",
          "go-21"
        ]
      },
      {
        "id": "go-delivery",
        "title": "用户隔离与完整交付",
        "range": "Day 22–28",
        "description": "账号、对象权限、安全边界、并发、Compose与CI；目标是能解释和复现的本地项目。",
        "lessonIds": [
          "go-22",
          "go-23",
          "go-24",
          "go-25",
          "go-26",
          "go-27",
          "go-28"
        ]
      }
    ],
    "lessons": [
      {
        "id": "go-01",
        "day": 1,
        "minutes": 120,
        "stageId": "go-language",
        "concepts": [
          "Go SDK、PATH、编辑器",
          "package main 与 func main()",
          "import 与标准库",
          "go.mod 与模块",
          "go run . / go build ."
        ],
        "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    name := \"Go learner\" // := 声明并初始化一个局部变量\n    fmt.Println(\"Hello,\", name)\n    fmt.Println(\"目标：28 天写出刷题记录 API\")\n}",
        "language": "go",
        "sourceMarkdown": "### Day 01｜装好 Go，跑通项目\n\n**今天为什么学**：写后端之前，先弄清楚“代码在哪里运行”和“一个 Go 项目如何组织”。今天不背大量语法，只要自己创建、运行、构建一次程序。\n\n#### 知识点与任务的对应关系\n\n- **Go SDK、PATH、编辑器** → 让终端能找到 `go` 命令。`go version` 报“找不到命令”一般是安装或 PATH 问题，和你的代码无关。VS Code 装官方 Go 扩展即可。\n- **`package main` 与 `func main()`** → `package` 表示代码所属的包；可执行 Go 程序要有 `main` 包及程序入口 `main()`，对应 C++ 的 `int main()`。\n- **`import` 与标准库** → `fmt` 用来格式化输出，`os` 可读环境、参数。Go 的 `import` 引入包，不是 C++ `#include` 那种文本包含。\n- **`go.mod` 与模块** → 一个模块可能包含多个包。`go mod init example/go-lab` 创建模块声明；不需要每新建一个 `.go` 文件都初始化。\n- **`go run .` / `go build .`** → 前者编译并运行，后者生成可执行文件；`.` 表示当前包，能包含同包的多个 Go 源文件。\n\n#### 可直接运行的示例：`main.go`\n\n```go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n    name := \"Go learner\" // := 声明并初始化一个局部变量\n    fmt.Println(\"Hello,\", name)\n    fmt.Println(\"目标：28 天写出刷题记录 API\")\n}\n```\n\n**读懂它**：Go 不要求写分号；局部变量用 `:=` 是编译器推断类型；`fmt.Println` 中的 `fmt` 是包名、`Println` 是该包导出的函数。大写开头通常表示标识符可被其他包访问。\n\n#### 跟着做（PowerShell）\n\n```powershell\nmkdir go-lab\ncd go-lab\ngo mod init example/go-lab\n# 创建 main.go 并填入上面的代码\ngo run .\ngo fmt ./...\ngo build .\ngit init\ngit add .\ngit commit -m \"learn: first go program\"\n```\n\n#### 练习与验收\n\n1. 改为输出自己的学习目标和今天的日期，再运行一次。\n2. 把 `main` 错写为 `Main`，观察编译提示，然后恢复；把变量声明却不使用，观察 Go 的报错。\n3. **过关**：解释 `package`、`module`、`main()`、`go run .` 各负责什么；提交至少 `go.mod` 和 `main.go`（不要提交生成的 `.exe`）。\n\n**自测**：为什么 `go run .` 往往比 `go run main.go` 更适合多文件项目？——因为前者按包构建，会包含同目录中属于该包的其他适用 Go 文件。\n\n---",
        "title": "装好 Go，跑一个程序",
        "summary": "先跑通工具链，弄清包、模块和程序入口分别是什么。",
        "task": "在 exercises/go/day-01 新建独立 Go 模块，打印自己的目标；运行、格式化和构建，并记录 go version。",
        "checks": [
          "go run . 输出自己的目标",
          "go fmt ./... 与 go build . 成功",
          "能区分 module、package 和 main，不提交生成的可执行文件"
        ],
        "hint": "安装后先重开终端试 go version。模块只在这次练习目录初始化，不在资料仓库根目录初始化。",
        "quiz": {
          "question": "多文件项目为什么优先使用 go run .？",
          "options": [
            "它会自动修复代码",
            "它按包构建，包含同目录适用源文件",
            "它不会编译"
          ],
          "answer": 1,
          "explanation": "go run main.go 只使用显式指定的文件；go run . 构建当前包，更符合多文件项目组织。"
        }
      },
      {
        "id": "go-02",
        "day": 2,
        "minutes": 150,
        "stageId": "go-language",
        "concepts": [
          "变量与类型",
          "零值",
          "if / switch",
          "只有 for",
          "函数与多返回值"
        ],
        "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    total := 0\n    for i := 1; i <= 5; i++ { total += i }\n    fmt.Println(total) // 15\n}",
        "language": "go",
        "sourceMarkdown": "### Day 02｜用 Go 重写熟悉的 C++ 题\n\n**今天为什么学**：你已懂循环、条件和函数，不必重新学习“什么是循环”，重点掌握 Go 的写法及与 C++ 的差异。\n\n#### 知识点与任务的对应关系\n\n- **变量与类型** → `var n int = 3` 和 `n := 3` 都能声明变量，`:=` 只允许在函数内；`int`、`int64`、`float64` 之间多数情况下要显式转换。\n- **零值** → `var n int` 默认是 `0`，`var ok bool` 默认是 `false`；不要以为 Go 的未赋值变量就是随机垃圾值。\n- **`if` / `switch`** → 条件不加圆括号；`switch` 的 `case` 默认不穿透，通常不写 `break`。\n- **只有 `for`** → `for i := 0; i < n; i++`、`for condition`、`for {}`；Go 没有 `while` 关键字。\n- **函数与多返回值** → `func solve(a, b int) (int, int)` 可以同时返回两个结果；Go 的 `++` 是语句，不是能赋值的表达式。\n- **输入输出** → 小练习用 `fmt.Fscan` / `fmt.Fprintln`；算法比赛大量输入时再了解 `bufio.NewReader`、`bufio.NewWriter`。\n\n#### 可直接运行的示例：`main.go`\n\n```go\npackage main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc calc(a, b int) (int, int) {\n    return a + b, a * b\n}\n\nfunc main() {\n    in := bufio.NewReader(os.Stdin)\n    out := bufio.NewWriter(os.Stdout)\n    defer out.Flush()\n    var n int\n    if _, err := fmt.Fscan(in, &n); err != nil { return }\n    sum := 0\n    for i := 0; i < n; i++ {\n        var x int\n        if _, err := fmt.Fscan(in, &x); err != nil { return }\n        if x > 0 { sum += x }\n    }\n    a, b := calc(sum, 2)\n    fmt.Fprintln(out, a, b)\n}\n```\n\n**拆解**：`&n` 把变量地址交给扫描函数，类似 C++ 的引用输入；`a, b := calc(...)` 接住两个返回值；`defer out.Flush()` 在 `main` 返回时刷新缓冲区。`err` 不是异常，而是函数返回的一部分，Day 5 会系统讲。\n\n#### 跟着做\n\n1. 任选三个熟悉的 C++ 小题（求和、最大值、判断回文等），先自己写 Go 版本，再对照输入输出。\n2. 把一个 `while` 循环改成 Go 的 `for condition`；把一个 C++ `switch` 改写，并观察是否需要 `break`。\n3. 用 `int64` 保存可能超过 32 位的结果；试验 `int64(n)` 强制转换。\n\n**验收样例**：输入 `5` 和 `1 -2 3 0 4`，正数之和是 8，`calc(8,2)` 返回 `8+2` 和 `8*2`，预期输出 **`10 16`**。先手算，再运行程序核对。\n\n**易错提醒**：不要照搬 `cin >> n`、`vector<int>` 或 `a++` 出现在表达式里的 C++ 写法；如果编译器提示变量未使用，先检查代码而不是删除所有提示。\n\n---",
        "title": "用 Go 重写熟悉的小题",
        "summary": "借用已有的循环和函数知识，集中练 Go 的写法与类型转换。",
        "task": "选择3道熟悉的小题，用 Go 独立改写；每道都用同样输入与原实现对照，并加一个边界输入。",
        "checks": [
          "3道题输出与手算或原实现一致",
          "能写 for condition 与多返回值函数",
          "能解释 := 的作用域及数值类型显式转换"
        ],
        "hint": "Go 没有 while；左大括号与条件同一行；发现未使用变量时先读编译错误。",
        "quiz": {
          "question": "Go 的 switch case 默认会怎样执行？",
          "options": [
            "自动继续到下一个case",
            "必须每个case写break",
            "执行匹配分支后退出switch"
          ],
          "answer": 2,
          "explanation": "Go 的 case 默认不穿透，不必照搬 C++ 的每个分支末尾 break。"
        }
      },
      {
        "id": "go-03",
        "day": 3,
        "minutes": 150,
        "stageId": "go-language",
        "concepts": [
          "数组 vs 切片",
          "append",
          "map 与 make",
          "range",
          "字符串与 Unicode"
        ],
        "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    counts := make(map[string]int)\n    for _, word := range []string{\"go\", \"web\", \"go\"} { counts[word]++ }\n    fmt.Println(counts[\"go\"]) // 2；排行需要再排序\n}",
        "language": "go",
        "sourceMarkdown": "### Day 03｜slice、map、字符串与稳定排序\n\n**今天为什么学**：后端中“列表”“按 ID 索引”“按次数统计”非常频繁；你熟悉的 `vector` 和 `unordered_map`，在 Go 中主要对应 `slice` 和 `map`。\n\n#### 知识点与任务的对应关系\n\n- **数组 vs 切片** → `[3]int` 是固定长度数组，`[]int` 是 slice；slice 有 `len`（当前长度）和 `cap`（容量）。\n- **`append`** → `items = append(items, x)` 必须接住返回的 slice；扩容时可能更换底层数组。\n- **`map` 与 `make`** → `counts := make(map[string]int)` 可以安全写入；`var m map[string]int` 得到 nil map，能读不能写。\n- **`range`** → `for i, v := range xs` 每次给的是元素值；`v = ...` 不会修改原 slice，要写 `xs[i] = ...`。\n- **字符串与 Unicode** → `len(s)` 返回字节数，中文字符个数可用 `utf8.RuneCountInString(s)`；`strings.Fields` 按空白字符分词。\n- **排序** → `sort.Slice` 自定义排序规则；`map` 的遍历顺序不稳定，输出排名必须显式排序。\n\n#### 可直接运行的示例：`main.go`\n\n```go\npackage main\n\nimport (\n    \"fmt\"\n    \"sort\"\n    \"strings\"\n    \"unicode/utf8\"\n)\n\ntype Pair struct { Word string; Count int }\n\nfunc main() {\n    text := \"Go go Cpp go CPP\"\n    counts := make(map[string]int)\n    for _, word := range strings.Fields(strings.ToLower(text)) {\n        counts[word]++\n    }\n    var list []Pair\n    for word, count := range counts {\n        list = append(list, Pair{word, count})\n    }\n    sort.Slice(list, func(i, j int) bool {\n        if list[i].Count != list[j].Count { return list[i].Count > list[j].Count }\n        return list[i].Word < list[j].Word\n    })\n    fmt.Println(list) // [{go 3} {cpp 2}]\n    fmt.Println(len(\"中文\"), utf8.RuneCountInString(\"中文\")) // 6 2\n}\n```\n\n**拆解**：`counts[word]++` 读取不存在的键会得到 `int` 的零值，因此词频可以直接累加；排序先比较频次、再比较单词，才能在频次相同时稳定输出。`sort.Slice` 的比较器回答“下标 i 的元素是否排在 j 前面”。\n\n#### 练习与验收\n\n1. 把固定字符串改为用户输入，输出词频 Top 3（不足 3 项就全部输出）。\n2. 测试空行、大小写混合、次数并列、中文文本；对中文分词先限定按空白划分，不要求自然语言分词。\n3. 做一个 slice 共享实验：`b := a[:2]` 后改 `b[0]`，观察 `a[0]` 是否改变；接着用 `append([]int(nil), a...)` 制造独立副本。\n\n**过关标准**：能解释为什么结果不能直接按 `range map` 的顺序输出；能解释 `len(\"中\")` 为什么是 3。\n\n---",
        "title": "统计词频，排出前3名",
        "summary": "练 slice、map、字符串和排序，输出每次都能复现的结果。",
        "task": "读取一行文本，忽略英文大小写，按空白分词；输出词频前3名，同次数按词典序排序。",
        "checks": [
          "空文本和不足3个词不会越界",
          "并列词频多次运行顺序一致",
          "能解释 len(\"中\") 与 rune 数量的差别"
        ],
        "hint": "map 遍历顺序不保证稳定；先转成 slice 再排序。写 map 前先 make。",
        "quiz": {
          "question": "len(\"中\") 在 Go 中是多少？",
          "options": [
            "3",
            "1",
            "0"
          ],
          "answer": 0,
          "explanation": "字符串是UTF-8字节序列，len 计算字节数。“中”占3字节；rune 计数是1。"
        }
      },
      {
        "id": "go-04",
        "day": 4,
        "minutes": 150,
        "stageId": "go-language",
        "concepts": [
          "struct",
          "方法接收者（receiver）",
          "值接收者 vs 指针接收者",
          "& 与 *",
          "导出规则与 JSON"
        ],
        "starterCode": "package main\n\nimport \"fmt\"\n\ntype Problem struct { Title string; Solved bool }\nfunc (p *Problem) MarkSolved() { p.Solved = true }\nfunc main() {\n    p := Problem{Title: \"Two Sum\"}\n    p.MarkSolved()\n    fmt.Println(p.Solved) // true\n}",
        "language": "go",
        "sourceMarkdown": "### Day 04｜struct、指针与方法：不需要先补 C++ OOP\n\n**今天为什么学**：后端要表达“题目”“用户”这样的数据对象。Go 无传统 `class` 和继承语法，用结构体、方法及小接口组织程序。\n\n#### 知识点与任务的对应关系\n\n- **`struct`** → 把字段组合为一个类型，类似 C++ 的结构体；用 `Problem{ID: 1, Title: \"...\"}` 初始化。\n- **方法接收者（receiver）** → `func (p Problem) IsSolved() bool` 表示这个方法作用在 `Problem` 类型上，不必引入 class。\n- **值接收者 vs 指针接收者** → `(p Problem)` 得到拷贝；`(p *Problem)` 能修改原对象。指针不是“总是更快”，也要看方法语义。\n- **`&` 与 `*`** → `&p` 取地址，`*p` 解引用；Go 用垃圾回收管理普通内存，不需要手写 `delete`。\n- **导出规则与 JSON** → `Title` 是导出字段，`title` 通常仅包内可见；JSON 编码器无法通过 `json` tag 强行导出小写字段。\n- **接口的第一印象** → 接口描述“具有哪些方法”，类型不需要写 `implements`；**今天只认识，不要求抽象接口体系**。\n\n#### 可直接运行的示例：`main.go`\n\n```go\npackage main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Problem struct {\n    ID     int64  `json:\"id\"`\n    Title  string `json:\"title\"`\n    Solved bool   `json:\"solved\"`\n}\n\nfunc (p *Problem) MarkSolved() { p.Solved = true }\nfunc (p Problem) IsSolved() bool { return p.Solved }\nfunc (p Problem) WrongChange() { p.Solved = false } // 仅修改副本\n\nfunc main() {\n    p := Problem{ID: 1, Title: \"Two Sum\"}\n    p.MarkSolved()\n    p.WrongChange()\n    data, err := json.Marshal(p)\n    if err != nil { panic(err) }\n    fmt.Println(p.IsSolved(), string(data))\n}\n```\n\n**拆解**：`p.MarkSolved()` 可写成看似对象调用的方法；Go 会按规则取得地址，使指针接收者方法修改原对象；`WrongChange` 的修改丢失是因为接收者拷贝。这里的 `panic` 只为展示不可预期的内部错误，不应拿来响应无效用户输入。\n\n#### 练习与验收\n\n1. 给 `Problem` 增加 `Platform`、`Difficulty`、`CreatedAt`，只修改代码对应的字段。\n2. 写 `Rename(newTitle string)` 和 `MarkUnsolved()`，其中修改原对象的方法使用指针接收者。\n3. 定义 `[]Problem`，根据标题关键字筛选，再编码为 JSON。\n\n**过关标准**：自己能讲清楚结构体、方法、接口分别做什么；当方法改不了原对象时，第一时间想到检查值/指针接收者。\n\n---",
        "title": "用结构体表达一条题目",
        "summary": "把题目字段放在一起，再用指针方法修改原对象。",
        "task": "定义 Problem 并实现 MarkSolved、Rename；筛选 []Problem 的标题关键字，输出 JSON。",
        "checks": [
          "MarkSolved 后原对象的 Solved 变为true",
          "JSON 包含导出的字段",
          "能演示值接收者与指针接收者的差别"
        ],
        "hint": "方法改不了原值时先看 receiver。JSON 不输出字段时先看首字母是否大写。",
        "quiz": {
          "question": "哪个接收者适合修改原 Problem？",
          "options": [
            "(p Problem)",
            "(p *Problem)",
            "省略接收者"
          ],
          "answer": 1,
          "explanation": "值接收者得到副本；指针接收者可以通过指针修改原结构体的字段。"
        }
      },
      {
        "id": "go-05",
        "day": 5,
        "minutes": 150,
        "stageId": "go-language",
        "concepts": [
          "error 是普通返回值",
          "错误包装",
          "defer",
          "JSON 与字段标签",
          "语法有效 ≠ 业务有效"
        ],
        "starterCode": "// 片段：放在已有函数中，需导入 encoding/json 和 strings。\ntype Input struct { Title string `json:\"title\"` }\nvar input Input\nif err := json.Unmarshal([]byte(`{\"title\":\"Two Sum\"}`), &input); err != nil {\n    // 返回或报告解码错误，不继续使用无效输入\n    return\n}\ninput.Title = strings.TrimSpace(input.Title)\n// 继续检查 input.Title 是否满足你的业务规则。",
        "language": "go",
        "sourceMarkdown": "### Day 05｜error、defer、JSON：处理外部输入\n\n**今天为什么学**：后端面向不可控输入。一个请求里的字段可能缺失、类型错误或业务无效；Go 的思路是明确返回并处理 `error`。\n\n#### 知识点与任务的对应关系\n\n- **`error` 是普通返回值** → `func parse(...) (Problem,error)`；成功时 `err == nil`，失败时携带原因，通常立即 `return`。\n- **错误包装** → `fmt.Errorf(\"decode request: %w\", err)` 能保留底层错误，`errors.Is` 可判断已知错误。\n- **`defer`** → 函数返回时执行清理，如 `defer file.Close()` 或 `defer rows.Close()`；不是离开 `if` 就立即执行。\n- **JSON 与字段标签** → `json.Unmarshal` 把字节解码到结构体；`json.Marshal` 生成 JSON；`json:\"title\"` 控制字段名。\n- **语法有效 ≠ 业务有效** → `{ \"title\": \"\" }` 是合法 JSON，但对新建题目来说无效；需要 `strings.TrimSpace` 再校验。\n- **严格解码** → `DisallowUnknownFields` 拒绝未知字段；解码一次后再判断 EOF，以免悄悄接受两个连续对象。\n\n#### 可直接运行的示例：`main.go`\n\n```go\npackage main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n    \"io\"\n    \"strings\"\n)\n\ntype CreateProblem struct { Title string `json:\"title\"` }\n\nfunc parse(s string) (CreateProblem, error) {\n    dec := json.NewDecoder(strings.NewReader(s))\n    dec.DisallowUnknownFields()\n    var p CreateProblem\n    if err := dec.Decode(&p); err != nil { return p, fmt.Errorf(\"decode: %w\", err) }\n    if err := dec.Decode(new(any)); err != io.EOF { return p, fmt.Errorf(\"expected one JSON object\") }\n    if strings.TrimSpace(p.Title) == \"\" { return p, fmt.Errorf(\"title required\") }\n    return p, nil\n}\n\nfunc main() {\n    for _, input := range []string{`{\"title\":\"Two Sum\"}`, `{\"title\":\" \"}`, `{\"title\":10}`} {\n        p, err := parse(input)\n        fmt.Printf(\"%+v, error=%v\\n\", p, err)\n    }\n}\n```\n\n**拆解**：`Decode(&p)` 把 JSON 写入目标结构体，所以传的是地址；JSON 字段类型错了会返回错误；业务非法必须另写校验。用 `err != io.EOF` 判断第二次解码是一种演示写法：真实项目还要区分第二次解码失败与多值输入，以便给出精确响应。\n\n#### 练习与验收\n\n1. 让输入来自标准输入或文件，解析成功后输出标准化 JSON。\n2. 增加字段 `platform`，限定非空；试验缺失字段、拼错字段、错误类型和连续两个 JSON 对象。\n3. 写 `validateTitle` 函数，让错误原因既能打印出来又能被调用者处理；额外试验一次 `defer` 关闭文件。\n\n**过关标准**：能区分“JSON 解码失败”和“字段值不符合业务规则”；正常错误不要直接 `panic`。\n\n---",
        "title": "把 JSON 和错误处理好",
        "summary": "外部输入可能语法正确却业务无效，解析和校验要分开。",
        "task": "读取一份题目 JSON，校验去空格后的标题和平台；正常输入重新编码，错误返回 error 并说明原因。",
        "checks": [
          "错误字段类型与空标题被区分",
          "未知字段、额外JSON值有检查",
          "资源关闭有依据，预期输入错误不会panic"
        ],
        "hint": "先检查 Decode 的 error，再做字段规则。严格解析后还要确认流里没有第二个 JSON 值。",
        "quiz": {
          "question": "{\"title\":\"\"} 的问题是什么？",
          "options": [
            "它不是合法JSON",
            "它必须导致panic",
            "JSON合法，但题目标题不符合业务规则"
          ],
          "answer": 2,
          "explanation": "JSON语法只证明数据格式可解析。必填、长度等业务规则仍需单独校验。"
        }
      },
      {
        "id": "go-06",
        "day": 6,
        "minutes": 120,
        "stageId": "go-language",
        "concepts": [
          "module vs package",
          "导出命名",
          "*_test.go",
          "表驱动测试",
          "工具命令"
        ],
        "starterCode": "// calc/math_test.go；前置：calc包已有func Add(a, b int) int。\npackage calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n    if got := Add(2, 3); got != 5 { t.Fatalf(\"got %d, want 5\", got) }\n}",
        "language": "go",
        "sourceMarkdown": "### Day 06｜package、模块与最小自动化测试\n\n**今天为什么学**：单文件练习可以快速上手，但真正项目需要拆包和反复回归。第一条规则是“函数可测试、编译器可检查、项目可复现”。\n\n#### 知识点与任务的对应关系\n\n- **`module` vs `package`** → `go.mod` 定义模块路径，同目录源文件一般归同一个包；`import \"example/go-lab/calc\"` 引入子目录包。\n- **导出命名** → `func Add` 可以跨包调用，`func add` 只在包内使用；Go 不使用 C++ 的 `public/private` 关键字。\n- **`*_test.go`** → 测试函数形如 `func TestAdd(t *testing.T)`，执行 `go test ./...`。\n- **表驱动测试** → 一个结构体切片列出输入与“独立写出的期望输出”；不能用被测函数自己计算期望值。\n- **工具命令** → `go fmt ./...` 格式化、`go vet ./...` 静态分析、`go mod tidy` 整理依赖；`go test -v ./...` 查看更详细结果。\n\n#### 示例：三个文件（放在同一个 Go 模块里）\n\n`calc/math.go`：\n\n```go\npackage calc\n\nfunc Add(a, b int) int { return a + b }\n```\n\n`calc/math_test.go`：\n\n```go\npackage calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n    tests := []struct{ a, b, want int }{\n        {1, 2, 3}, {-2, 1, -1}, {0, 0, 0},\n    }\n    for _, tt := range tests {\n        if got := Add(tt.a, tt.b); got != tt.want {\n            t.Errorf(\"Add(%d,%d)=%d, want %d\", tt.a, tt.b, got, tt.want)\n        }\n    }\n}\n```\n\n`main.go`：\n\n```go\npackage main\n\nimport (\n    \"fmt\"\n    \"example/go-lab/calc\"\n)\n\nfunc main() { fmt.Println(calc.Add(3, 4)) }\n```\n\n#### 跟着做与验收\n\n1. 项目根目录保留 Day 1 的 `go.mod`（模块路径是 `example/go-lab`），把 `math.go` 和测试文件放进 `calc/` 子目录。\n2. 依次执行 `go fmt ./...`、`go vet ./...`、`go test ./...`、`go run .`。预期主程序输出 `7`。\n3. 将 `Add` 内的 `+` 故意改成 `-`，确认测试真的失败，然后恢复正确实现。\n\n**过关标准**：能独立解决“找不到本地包”问题，知道首先检查 `go.mod` 模块名和文件夹路径；能说明测试通过不等于功能肯定正确。\n\n---",
        "title": "拆包，写下第一组测试",
        "summary": "把计算函数放进独立包，用测试检查正常和错误结果。",
        "task": "在练习模块中建 calc 包；写4个 Add 测试，运行 fmt、vet、test；故意把加法改错再还原。",
        "checks": [
          "本地包导入路径与 go.mod 一致",
          "4个测试包含自己手算的期望值",
          "改错加法后测试失败，还原后通过"
        ],
        "hint": "import 从模块路径开始。跨包函数首字母大写；测试文件以 _test.go 结尾。",
        "quiz": {
          "question": "测试的 want 应怎样得到？",
          "options": [
            "根据需求或手算独立确定",
            "再次调用被测函数计算",
            "直接复制got"
          ],
          "answer": 0,
          "explanation": "期望值必须独立于被测实现。用同一个实现计算want，会把同样的错误复制两遍。"
        }
      },
      {
        "id": "go-07",
        "day": 7,
        "minutes": 150,
        "stageId": "go-language",
        "concepts": [
          "客户端—服务器",
          "URL 结构",
          "http.HandlerFunc",
          "ServeMux",
          "状态码与 Content-Type"
        ],
        "starterCode": "package main\n\nimport (\n    \"log\"\n    \"net/http\"\n)\n\nfunc main() {\n    mux := http.NewServeMux() // 需要 Go 1.22+\n    mux.HandleFunc(\"GET /health\", func(w http.ResponseWriter, r *http.Request) {\n        w.Write([]byte(\"ok\"))\n    })\n    log.Fatal(http.ListenAndServe(\"127.0.0.1:8080\", mux))\n}",
        "language": "go",
        "sourceMarkdown": "### Day 07｜第一个 HTTP 后端：请求怎样变成响应\n\n**今天为什么学**：从今天起，你写的程序不再是“运行一次结束”，而是长期监听端口，等待客户端通过 HTTP 调用。\n\n#### 知识点与任务的对应关系\n\n- **客户端—服务器** → 浏览器/`curl` 发请求，Go 服务接收后选择 Handler，构造状态码、Header、Body 返回。\n- **URL 结构** → `http://localhost:8080/add?a=1&b=2`：`8080` 是端口，`/add` 是路径，`?a=1&b=2` 是查询参数。\n- **`http.HandlerFunc`** → 函数签名 `func(w http.ResponseWriter, r *http.Request)`；`r` 是输入，`w` 是输出。\n- **`ServeMux`** → 标准库路由器，注册方法与路径，例如 `GET /health`。Go 1.22 及更高版本支持这种路由模式。\n- **状态码与 Content-Type** → 成功常用 `200`，输入错误用 `400`，内部故障才使用 `500`。响应 JSON 时设置 `application/json`。\n- **类型转换与校验** → Query 参数全部是字符串，调用 `strconv.Atoi` 转换，失败应立即返回 400。\n\n#### 可直接运行：`main.go`\n\n```go\npackage main\n\nimport (\n    \"encoding/json\"\n    \"log\"\n    \"net/http\"\n    \"strconv\"\n)\n\nfunc main() {\n    mux := http.NewServeMux()\n    mux.HandleFunc(\"GET /health\", func(w http.ResponseWriter, r *http.Request) {\n        w.Header().Set(\"Content-Type\", \"application/json\")\n        _ = json.NewEncoder(w).Encode(map[string]string{\"status\": \"ok\"})\n    })\n    mux.HandleFunc(\"GET /hello\", func(w http.ResponseWriter, r *http.Request) {\n        w.Header().Set(\"Content-Type\", \"application/json\")\n        _ = json.NewEncoder(w).Encode(map[string]string{\"message\": \"hello Go\"})\n    })\n    mux.HandleFunc(\"GET /add\", func(w http.ResponseWriter, r *http.Request) {\n        q := r.URL.Query()\n        a, e1 := strconv.Atoi(q.Get(\"a\"))\n        b, e2 := strconv.Atoi(q.Get(\"b\"))\n        if e1 != nil || e2 != nil || !q.Has(\"a\") || !q.Has(\"b\") {\n            http.Error(w, \"a and b must be integers\", http.StatusBadRequest)\n            return\n        }\n        w.Header().Set(\"Content-Type\", \"application/json\")\n        _ = json.NewEncoder(w).Encode(map[string]int{\"sum\": a + b})\n    })\n    log.Println(\"listening on http://localhost:8080\")\n    log.Fatal(http.ListenAndServe(\":8080\", mux))\n}\n```\n\n#### 实际发请求（Windows PowerShell）\n\n```powershell\ngo run .\n# 另开一个 PowerShell 窗口：\ncurl.exe -i \"http://localhost:8080/health\"\ncurl.exe -i \"http://localhost:8080/add?a=10&b=20\"\ncurl.exe -i \"http://localhost:8080/add?a=abc&b=20\"\n```\n\n**验收**：第二个请求 JSON 中有 `\"sum\":30`；第三个请求的 HTTP 状态为 `400`，服务不退出。试着只传 `a`、使用负数、让 `b=0`，并解释每一种返回。\n\n**调试提示**：PowerShell 中 `curl` 有时是其他命令的别名，练习时优先使用 `curl.exe`；`&` 必须和整个 URL 一起用双引号包起来。\n\n---",
        "title": "让程序接住 HTTP 请求",
        "summary": "启动长时间运行的服务，做健康检查和加法接口。",
        "task": "在独立项目模块实现 GET /health、/hello、/add；使用 curl.exe 查看状态码和响应。",
        "checks": [
          "/health 能访问，/add?a=10&b=20 返回sum=30",
          "缺失与非数字参数返回400，服务继续运行",
          "能指出请求里的方法、路径、查询参数和响应Body"
        ],
        "hint": "用 Go 1.22+ 的 ServeMux 方法路由。端口被占用时看启动日志；PowerShell 中使用 curl.exe 避免别名差异。",
        "quiz": {
          "question": "/add?a=1&b=2 中 a 与 b 属于什么？",
          "options": [
            "路径参数",
            "查询参数",
            "响应Header"
          ],
          "answer": 1,
          "explanation": "问号之后的是 URL 查询字符串，由 r.URL.Query() 读取；路径是 /add。"
        }
      },
      {
        "id": "go-08",
        "day": 8,
        "minutes": 120,
        "stageId": "go-crud",
        "concepts": [
          "资源（resource）",
          "HTTP 方法语义",
          "路径参数 vs Query vs Body",
          "状态码",
          "输入 DTO（请求结构）"
        ],
        "starterCode": "POST /problems\nContent-Type: application/json\n\n{\"title\":\"Two Sum\",\"platform\":\"LeetCode\",\"difficulty\":\"easy\"}\n\n预期：201 Created，并返回由服务端生成的id。",
        "language": "text",
        "sourceMarkdown": "### Day 08｜先设计 API：URL、REST 与请求契约\n\n**今天为什么学**：直接写代码很容易变成“想到哪个接口就加哪个接口”。今天先明确：客户端发送什么、后端负责什么、成功/失败各返回什么。\n\n#### 知识点与任务的对应关系\n\n- **资源（resource）** → 一条刷题记录是 `Problem` 资源，而不是一个 `doAddProblem` 动作；对外路径用复数名词 `/problems`。\n- **HTTP 方法语义** → `GET` 查、`POST` 新增、`PATCH` 改部分字段、`DELETE` 删；不能把所有动作塞进 `GET`。\n- **路径参数 vs Query vs Body** → `/problems/12` 指定资源 ID；`?page=2` 控制列表查询；JSON Body 携带要创建/修改的数据。\n- **状态码** → 列表/单条成功一般 200，创建 201，删除且不返回响应体用 204，非法请求 400，不存在 404。\n- **输入 DTO（请求结构）** → `CreateProblemRequest` 不让调用者自行决定数据库 ID；响应字段可与数据库内部结构不同。\n- **接口契约** → 同一类错误使用相同 JSON 形状，方便后续前端和自动化测试。\n\n#### 先写约定，再写 Go 代码\n\n创建题目的请求：\n\n```http\nPOST /problems HTTP/1.1\nContent-Type: application/json\n\n{\"title\":\"Two Sum\",\"platform\":\"LeetCode\",\"difficulty\":\"easy\"}\n```\n\n成功响应示例：\n\n```http\nHTTP/1.1 201 Created\nContent-Type: application/json\n\n{\"id\":1,\"title\":\"Two Sum\",\"platform\":\"LeetCode\",\"difficulty\":\"easy\",\"solved\":false}\n```\n\n输入错误时统一输出，例如：\n\n```json\n{\"error\":{\"code\":\"INVALID_INPUT\",\"message\":\"title must not be empty\"}}\n```\n\n#### 跟着做\n\n1. 定义 `Problem` 字段：`id`、`title`、`platform`、`difficulty`、`solved`、`created_at`。\n2. 列出六个端点：列表、单条、创建、局部修改、删除、健康检查；逐项填请求方法、路径、Body 与响应示例。\n3. 明确边界：`title` 去空格后必填；`difficulty` 只能是 `easy` / `medium` / `hard`；列表按 `id` 升序排序。\n\n**验收**：不用先启动服务，也能解释为何 `GET /problems?page=2` 的 `page` 不放 JSON Body 里；解释为何 400 与 500 不能混用。\n\n**思考**：如果 `POST` 被客户端重复发送两次，可能创建两条记录；所以要理解幂等性，暂时不必实现复杂的幂等键。\n\n---",
        "title": "先写刷题 API 的约定",
        "summary": "确定请求、数据和错误长什么样，再开始扩展服务。",
        "task": "为 Problem 定义字段，列出健康检查和5个CRUD端点，逐项写成功与失败的请求响应样例。",
        "checks": [
          "清单包含方法、路径、Body和状态码",
          "title、difficulty和排序规则明确",
          "能区分400与500，并保持错误JSON结构一致"
        ],
        "hint": "从一个具体创建请求开始写契约。ID由服务端生成，不让客户端随意指定。",
        "quiz": {
          "question": "新增资源成功后通常返回哪个状态码？",
          "options": [
            "500",
            "404",
            "201"
          ],
          "answer": 2,
          "explanation": "201 Created 表示创建成功。404代表资源不存在，500用于服务端内部故障。"
        }
      },
      {
        "id": "go-09",
        "day": 9,
        "minutes": 150,
        "stageId": "go-crud",
        "concepts": [
          "http.NewServeMux",
          "r.PathValue(\"id\")",
          "r.URL.Query()",
          "json.NewEncoder(w).Encode(...)",
          "404 与 400"
        ],
        "starterCode": "// Handler内片段；需导入strconv与net/http，Go 1.22+。\nid, err := strconv.Atoi(r.PathValue(\"id\"))\nif err != nil || id <= 0 {\n    http.Error(w, \"invalid id\", http.StatusBadRequest)\n    return\n}\n// 继续按id查询；不存在返回404。",
        "language": "go",
        "sourceMarkdown": "### Day 09｜实现 GET：路由、路径 ID、JSON 输出\n\n**今天为什么学**：把 Day 8 纸上的接口变成真实可访问的 HTTP 路由，第一步只读数据，不处理数据库和复杂并发。\n\n#### 知识点与任务的对应关系\n\n- **`http.NewServeMux`** → 管理 `GET /problems` 和 `GET /problems/{id}`，由 URL 匹配适当的函数。\n- **`r.PathValue(\"id\")`** → Go 1.22+ 路由参数，返回字符串，必须转换为整数并检查正数。\n- **`r.URL.Query()`** → `?solved=true` 或 `?page=1` 的值，和路径 ID 的意义不同。\n- **`json.NewEncoder(w).Encode(...)`** → 向响应 Body 写 JSON；调用前设置 `Content-Type` 和状态码。\n- **`404` 与 `400`** → ID 不是数字是 400；合法 ID 但没有这条数据是 404。\n- **数据来源** → 今天可以用只读固定 slice 模拟数据库，等 Day 13 再换成 PostgreSQL。\n\n#### 可直接运行的最小 GET 示例：`main.go`\n\n```go\npackage main\n\nimport (\n    \"encoding/json\"\n    \"net/http\"\n    \"strconv\"\n    \"log\"\n)\n\ntype Problem struct {\n    ID int `json:\"id\"`\n    Title string `json:\"title\"`\n}\n\nfunc main() {\n    data := []Problem{{1, \"Two Sum\"}, {2, \"Binary Search\"}}\n    mux := http.NewServeMux()\n    mux.HandleFunc(\"GET /problems\", func(w http.ResponseWriter, r *http.Request) {\n        w.Header().Set(\"Content-Type\", \"application/json\")\n        _ = json.NewEncoder(w).Encode(data)\n    })\n    mux.HandleFunc(\"GET /problems/{id}\", func(w http.ResponseWriter, r *http.Request) {\n        id, err := strconv.Atoi(r.PathValue(\"id\"))\n        if err != nil || id <= 0 { http.Error(w, \"invalid id\", 400); return }\n        for _, p := range data {\n            if p.ID == id {\n                w.Header().Set(\"Content-Type\", \"application/json\")\n                _ = json.NewEncoder(w).Encode(p)\n                return\n            }\n        }\n        http.Error(w, \"not found\", 404)\n    })\n    log.Fatal(http.ListenAndServe(\":8080\", mux))\n}\n```\n\n**拆解**：固定 slice 只读，所以此例不需要锁；从 Day 10 开始有并发写入，就不能再无保护地共享可变 slice/map。示例用简短纯文本错误，正式项目再换成统一 JSON 错误结构。\n\n#### 练习与验收\n\n1. `GET /problems` 返回 JSON 数组；`GET /problems/1` 返回一条记录。\n2. `GET /problems/999` 必须返回 `404`；`GET /problems/abc` 与 `/problems/-1` 返回 `400`。\n3. 扩展 `?solved=true` 过滤；不合法布尔字符串也返回 `400`。用 `curl.exe -i` 查看真实响应头和状态码。\n\n**过关标准**：你能从输入 URL 画出 `ServeMux → Handler → 读取数据 → Encoder → 响应` 的调用链。\n\n---",
        "title": "实现列表和详情查询",
        "summary": "把 API 约定变成路由，区分无效 ID 与不存在的记录。",
        "task": "实现 GET /problems 和 /problems/{id}，先用只读数据；加入 solved 查询参数校验。",
        "checks": [
          "列表和已有详情返回200与JSON",
          "abc、负数ID返回400，不存在ID返回404",
          "非法布尔筛选返回400"
        ],
        "hint": "PathValue 得到字符串，先转换并验证。先设置 Content-Type，再写 JSON。",
        "quiz": {
          "question": "GET /problems/abc 应怎样处理？",
          "options": [
            "返回400，因为ID格式不合法",
            "返回200与空对象",
            "直接当0查询"
          ],
          "answer": 0,
          "explanation": "输入格式不符合接口要求属于客户端错误。合法ID但查不到记录，才属于404场景。"
        }
      },
      {
        "id": "go-10",
        "day": 10,
        "minutes": 150,
        "stageId": "go-crud",
        "concepts": [
          "r.Body 与 Decoder",
          "限制请求大小",
          "未知字段",
          "输入 DTO vs 输出模型",
          "创建响应"
        ],
        "starterCode": "// Handler内片段；需导入encoding/json与net/http。\nr.Body = http.MaxBytesReader(w, r.Body, 1<<20)\ndec := json.NewDecoder(r.Body)\ndec.DisallowUnknownFields()\n// 下一步：Decode、检查额外JSON、业务校验，然后写存储。",
        "language": "go",
        "sourceMarkdown": "### Day 10｜实现 POST：读取 JSON、验证并创建资源\n\n**今天为什么学**：查询很简单，创建资源必须考虑 Body 不是合法 JSON、字段缺失、字段类型错误、写入并发等问题。\n\n#### 知识点与任务的对应关系\n\n- **`r.Body` 与 Decoder** → 请求 Body 是可读取的流；用 `json.NewDecoder(r.Body).Decode(&req)` 将 JSON 写入结构体。\n- **限制请求大小** → `http.MaxBytesReader` 在解析前限制输入规模，避免恶意上传巨大 JSON 使服务失去响应。\n- **未知字段** → `DisallowUnknownFields()` 能拒绝拼错的键；之后还要检查业务规则。\n- **输入 DTO vs 输出模型** → 创建请求中不允许客户端设置数据库自增 ID，后端生成 ID 后再返回。\n- **创建响应** → 成功使用 `201 Created`，设置 `Content-Type`，可根据需要设置 `Location`。\n- **并发写入** → 标准 Go HTTP 服务可并发执行 Handler，共享计数器和 map 要有互斥锁。\n\n#### 核心代码示例：在 Day 09 的项目里添加创建处理器\n\n下面是一段**函数级代码**，不是独立的 `main.go`；在你的项目中注册 `mux.HandleFunc(\"POST /problems\", createHandler)`，并为存储增加互斥保护。\n\n```go\n// 该函数需要 import: encoding/json, errors, io, net/http, strings\n// 假设 Problem 已定义，且通过 store.Create 创建数据。\ntype CreateProblemRequest struct {\n    Title string `json:\"title\"`\n    Platform string `json:\"platform\"`\n}\n\nfunc createHandler(w http.ResponseWriter, r *http.Request) {\n    r.Body = http.MaxBytesReader(w, r.Body, 1<<20) // 最多 1 MiB\n    dec := json.NewDecoder(r.Body)\n    dec.DisallowUnknownFields()\n    var req CreateProblemRequest\n    if err := dec.Decode(&req); err != nil {\n        var sizeErr *http.MaxBytesError\n        if errors.As(err, &sizeErr) { http.Error(w, \"body too large\", 413) } else {\n            http.Error(w, \"invalid JSON\", 400)\n        }\n        return\n    }\n    if err := dec.Decode(new(any)); err != io.EOF {\n        var sizeErr *http.MaxBytesError\n        if errors.As(err, &sizeErr) { http.Error(w, \"body too large\", 413) } else {\n            http.Error(w, \"expected one JSON object\", 400)\n        }\n        return\n    }\n    req.Title = strings.TrimSpace(req.Title)\n    if req.Title == \"\" { http.Error(w, \"title required\", 400); return }\n    // TODO: 调用你自己实现的 store.Create(req)，取得数据库生成的 id\n    // TODO: 将完整 Problem 编码返回，状态码必须是 201\n}\n```\n\n**拆解**：第一个 `Decode` 把 JSON 装进请求结构；第二个检查是否只有一个 JSON 值；`TrimSpace` 防止只输入空格。使用 `errors.As` 将请求体过大（413）和 JSON 语法错误（400）区分处理；解析完后仍须检查业务规则。\n\n#### 练习与验收\n\n1. 创建 `CreateProblemRequest`，设计 `title`、`platform`、`difficulty` 三个输入字段，并在服务端生成递增 ID。\n2. 为可变存储增加 `sync.Mutex`；客户端不应通过 JSON 直接覆盖已有资源的 ID。\n3. 测试：合法 JSON → 201；空标题/未知字段/字段类型错误 → 400；过大 Body → 413。若使用 `http.MaxBytesReader`，用 `errors.As(err, &maxErr)` 区分超限。\n\n**过关标准**：用 POST 新增后，再 GET 列表能看到刚创建的记录；错误请求不能让存储内容改变。\n\n---",
        "title": "创建一条真正的新记录",
        "summary": "严格读 JSON、校验字段，再由服务端生成新 ID。",
        "task": "在现有服务添加 POST /problems；限制Body、拒绝未知字段、检查必填项，并保护共享存储写入。",
        "checks": [
          "合法POST返回201，随后GET能读到新记录",
          "错误JSON、空标题、未知字段返回400且不改变存储",
          "超限Body返回413"
        ],
        "hint": "先完成输入检查，最后才写存储。HTTP handler 会并发运行，map与ID计数器不能无保护共享。",
        "quiz": {
          "question": "Body 超过你设置的上限，适合返回什么？",
          "options": [
            "200",
            "413",
            "404"
          ],
          "answer": 1,
          "explanation": "413表示请求体超过允许大小。用errors.As识别 http.MaxBytesError，避免把所有解析失败混成同一种错误。"
        }
      },
      {
        "id": "go-11",
        "day": 11,
        "minutes": 180,
        "stageId": "go-crud",
        "concepts": [
          "CRUD",
          "局部更新",
          "sync.RWMutex",
          "原子读改写",
          "状态码"
        ],
        "starterCode": "// 模型片段：nil表示没传，&false表示明确改为false。\ntype PatchProblemRequest struct {\n    Title  *string `json:\"title\"`\n    Solved *bool   `json:\"solved\"`\n}",
        "language": "go",
        "sourceMarkdown": "### Day 11｜PATCH、DELETE 与内存数据的并发安全\n\n**今天为什么学**：完成完整 CRUD 之前，必须理解“缺失字段”和“设置为 false”不是同一件事，同时保证多个请求不会并发写坏共享数据。\n\n#### 知识点与任务的对应关系\n\n- **CRUD** → Create/Read/Update/Delete；删除成功后再查询应找不到资源。\n- **局部更新** → PATCH 更新请求只带要修改的字段；`Solved *bool` 能区分“没传 solved”和“传了 false”。\n- **`sync.RWMutex`** → 多个读取者允许并行，写入时独占；每次 map 访问都要遵守锁规则。\n- **原子读改写** → 查出旧对象、修改字段、写回 map 必须在同一把写锁保护下完成。\n- **状态码** → 删除已存在对象可返回 204；不存在返回 404。不要向 204 响应追加 JSON Body。\n- **请求幂等性** → 同一个 `PATCH {\"solved\":true}` 重试通常产生相同状态；重复删除时是否 404 是接口契约选择。\n\n#### 核心代码：`MemoryStore`（可放入独立包）\n\n```go\npackage store\n\nimport \"sync\"\n\ntype Problem struct { ID int64; Title string; Solved bool }\ntype Patch struct { Title *string `json:\"title\"`; Solved *bool `json:\"solved\"` }\ntype MemoryStore struct {\n    mu sync.RWMutex\n    data map[int64]Problem\n}\nfunc New() *MemoryStore { return &MemoryStore{data: make(map[int64]Problem)} }\n\nfunc (s *MemoryStore) Get(id int64) (Problem, bool) {\n    s.mu.RLock()\n    defer s.mu.RUnlock()\n    p, ok := s.data[id]\n    return p, ok\n}\nfunc (s *MemoryStore) Patch(id int64, req Patch) (Problem, bool) {\n    s.mu.Lock()\n    defer s.mu.Unlock()\n    p, ok := s.data[id]\n    if !ok { return Problem{}, false }\n    if req.Title != nil { p.Title = *req.Title }\n    if req.Solved != nil { p.Solved = *req.Solved }\n    s.data[id] = p\n    return p, true\n}\nfunc (s *MemoryStore) Delete(id int64) bool {\n    s.mu.Lock()\n    defer s.mu.Unlock()\n    if _, ok := s.data[id]; !ok { return false }\n    delete(s.data, id)\n    return true\n}\n```\n\n**拆解**：`Patch` 的指针字段用于区分未提供与提供零值。`RLock` 是读锁，`Lock` 是写锁；加锁后配套 `defer Unlock`，减少错误路径忘记解锁。上面示范的是存储层代码，HTTP 层需自行补 URL 参数、JSON 解码与状态码。\n\n#### 练习与验收\n\n1. 为 `POST` 补 `MemoryStore.Create`，并让 `GET`、`PATCH`、`DELETE` 都操作同一个 store。\n2. 发送 `{\"solved\":false}` 能把原本 `true` 改为 `false`；发送 `{}` 不应无故清空其他字段。\n3. `go test -race ./...` 运行存在并发请求的测试，确认无数据竞争；之后 Day 26 再系统学习竞态条件。\n\n**过关标准**：完整内存 CRUD 可用，但重启程序后数据会丢，这是 Day 12～14 要解决的问题。\n\n---",
        "title": "补齐修改和删除",
        "summary": "局部更新要区分没传字段与传了零值，内存存储要有锁。",
        "task": "为同一 MemoryStore 补 Create、Patch、Delete；实现 PATCH 与 DELETE，并写并发请求测试。",
        "checks": [
          "solved:false 可以将true改回false，空对象不会清空字段",
          "DELETE成功204且无响应Body，再查返回404",
          "并发测试实际运行 go test -race ./..."
        ],
        "hint": "用 *bool 表示PATCH的可选字段；查旧值、修改、写回必须在同一次写锁内。",
        "quiz": {
          "question": "PATCH 用 *bool 而不是 bool 的主要原因是什么？",
          "options": [
            "指针总是更快",
            "省掉JSON解析",
            "区分未提供字段与明确提供false"
          ],
          "answer": 2,
          "explanation": "bool的零值就是false，无法独自表示“未传”。指针为nil表示缺失，非nil指针可包含true或false。"
        }
      },
      {
        "id": "go-12",
        "day": 12,
        "minutes": 180,
        "stageId": "go-crud",
        "concepts": [
          "表、行、列",
          "主键与自增",
          "类型",
          "四种 SQL",
          "约束"
        ],
        "starterCode": "CREATE TABLE IF NOT EXISTS problems (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    title TEXT NOT NULL CHECK (length(trim(title)) > 0),\n    platform TEXT NOT NULL,\n    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy','medium','hard')),\n    solved BOOLEAN NOT NULL DEFAULT FALSE,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nINSERT INTO problems (title, platform, difficulty)\nVALUES ('Two Sum', 'LeetCode', 'easy');\n\nSELECT id, title, solved FROM problems ORDER BY id;\nUPDATE problems SET solved = TRUE WHERE id = 1;\nDELETE FROM problems WHERE id = 999;",
        "language": "sql",
        "sourceMarkdown": "### Day 12｜SQL 与 PostgreSQL：把记录真正存下来\n\n**今天为什么学**：内存中的 map 在进程退出后消失。数据库负责持久化、按条件查询，并使用约束防止无效数据入库。\n\n#### 知识点与任务的对应关系\n\n- **表、行、列** → 表可类比一组结构体组成的数据集合；每行代表一条记录，列的类型由数据库约束。\n- **主键与自增** → `id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY` 生成唯一标识；ID 不是排名。\n- **类型** → `TEXT`、`BOOLEAN`、`TIMESTAMPTZ`、`BIGINT`；`NULL` 表示缺失/未知，不等于空字符串。\n- **四种 SQL** → `INSERT` 新增、`SELECT` 查询、`UPDATE` 修改、`DELETE` 删除；更新/删除不写 `WHERE` 会影响整表。\n- **约束** → `NOT NULL`、`CHECK`、`FOREIGN KEY` 可以在数据库层面保护数据，不能只依赖 Go 校验。\n- **排序** → 需要可预测输出时写 `ORDER BY id`，不要依赖未定义的默认行顺序。\n\n#### 建表文件：`schema.sql`（适用于 PostgreSQL）\n\n```sql\nCREATE TABLE IF NOT EXISTS problems (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    title TEXT NOT NULL CHECK (length(trim(title)) > 0),\n    platform TEXT NOT NULL,\n    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy','medium','hard')),\n    solved BOOLEAN NOT NULL DEFAULT FALSE,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nINSERT INTO problems (title, platform, difficulty)\nVALUES ('Two Sum', 'LeetCode', 'easy');\n\nSELECT id, title, solved FROM problems ORDER BY id;\nUPDATE problems SET solved = TRUE WHERE id = 1;\nDELETE FROM problems WHERE id = 999;\n```\n\n**拆解**：`DEFAULT FALSE` 只在未显式提供字段时设置默认值；`CHECK` 保证难度只在允许集合。`CREATE TABLE IF NOT EXISTS` 适合第一次体验，不等于后续修改表结构所需的正式迁移工具。\n\n#### 跟着做\n\n1. 安装并启动本地 PostgreSQL（或使用一个本地临时容器），创建开发数据库 `problems_dev`。\n2. 用 `psql` 或图形客户端执行 `schema.sql`；手动插入至少 10 行，练习 `WHERE`、`ORDER BY`、`LIMIT`。\n3. 尝试插入空标题或非法难度，确认数据库会拒绝；停止并重启数据库服务后查询刚插入的数据。\n\n**验收**：能写出 `SELECT * FROM problems WHERE solved = false ORDER BY id LIMIT 10;`，并解释其含义。开始认真区分“数据库服务重启”与“删除整个数据目录/容器 volume”。\n\n---",
        "title": "让数据库保存记录",
        "summary": "建好表和约束，练会四种 SQL 操作，验证数据不会随服务退出消失。",
        "task": "建立专用 problems_dev 数据库，运行 schema.sql，插入10条样例；练习查询、更新、删除与排序。",
        "checks": [
          "空标题与非法难度被数据库约束拒绝",
          "能写带WHERE、ORDER BY与LIMIT的查询",
          "重启数据库服务后记录仍在"
        ],
        "hint": "先用数据库客户端单独跑SQL。UPDATE/DELETE之前检查WHERE；不要把删除volume当成普通重启。",
        "quiz": {
          "question": "UPDATE problems SET solved=true 没有 WHERE 会怎样？",
          "options": [
            "更新全部匹配表中的行",
            "只更新第一行",
            "自动报错并保护数据"
          ],
          "answer": 0,
          "explanation": "没有WHERE限制会更新表内所有行。练习前先用SELECT确认目标范围。"
        }
      },
      {
        "id": "go-13",
        "day": 13,
        "minutes": 180,
        "stageId": "go-crud",
        "concepts": [
          "database/sql vs 驱动",
          "sql.Open",
          "连接字符串 DATABASE_URL",
          "Context 与超时",
          "参数绑定防注入"
        ],
        "starterCode": "// Repository函数内片段：db为*sql.DB，ctx为context.Context。\nvar id int64\nerr := db.QueryRowContext(ctx,\n    \"INSERT INTO problems(title, platform, difficulty) VALUES ($1,$2,$3) RETURNING id\",\n    title, platform, difficulty,\n).Scan(&id)\n// 处理err；不要把数据库内部错误直接发给客户端。",
        "language": "go",
        "sourceMarkdown": "### Day 13｜Go 连接数据库：驱动、连接池与参数绑定\n\n**今天为什么学**：`database/sql` 是统一的数据库访问接口，但不能直接理解 PostgreSQL 协议，需要额外的数据库驱动。\n\n#### 知识点与任务的对应关系\n\n- **`database/sql` vs 驱动** → 标准库负责查询接口、事务和连接池；如 `pgx/v5/stdlib` 负责连接 PostgreSQL。\n- **`sql.Open`** → 得到一个 `*sql.DB` 连接池句柄，不保证当时已经连接成功；再用 `PingContext` 验证。\n- **连接字符串 `DATABASE_URL`** → 配置来自环境变量，不要把真实密码提交 Git。\n- **`Context` 与超时** → `context.WithTimeout` 限制数据库操作等待时间，`defer cancel()` 释放资源。\n- **参数绑定防注入** → PostgreSQL 使用 `$1`、`$2`，把用户输入作为独立参数传给 Query/Exec；不要拼进 SQL 字符串。\n- **`QueryRowContext` 与 `Scan`** → 单条结果写入传入的地址；找不到行时 `Scan` 返回 `sql.ErrNoRows`，不能一概当 500。\n\n#### 可运行的连接演示：`main.go`\n\n先在已有 Go 模块执行 `go get github.com/jackc/pgx/v5/stdlib`，并在 PowerShell 设置本地开发数据库连接串（示例凭据仅用于本机临时环境）。\n\n```go\npackage main\n\nimport (\n    \"context\"\n    \"database/sql\"\n    \"fmt\"\n    \"log\"\n    \"os\"\n    \"time\"\n\n    _ \"github.com/jackc/pgx/v5/stdlib\"\n)\n\nfunc main() {\n    db, err := sql.Open(\"pgx\", os.Getenv(\"DATABASE_URL\"))\n    if err != nil { log.Fatal(err) }\n    defer db.Close()\n    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)\n    defer cancel()\n    if err := db.PingContext(ctx); err != nil { log.Fatal(err) }\n    var count int\n    if err := db.QueryRowContext(ctx, \"SELECT COUNT(*) FROM problems\").Scan(&count); err != nil {\n        log.Fatal(err)\n    }\n    fmt.Println(\"problem count:\", count)\n}\n```\n\nPowerShell 设置环境变量：\n\n```powershell\n$env:DATABASE_URL = \"postgres://app:localpass@localhost:5432/problems_dev?sslmode=disable\"\ngo run .\n```\n\n**拆解**：`_ \".../stdlib\"` 是只为驱动注册执行初始化；`sql.Open(\"pgx\", ...)` 用注册的驱动名；`*sql.DB` 会管理连接池，**不要每次请求都 `sql.Open`**。示例中的 `sslmode=disable` 仅适用于你控制的本地学习环境，部署时必须按环境配置 TLS。\n\n#### 练习与验收\n\n1. 写 `CreateProblem` 使用 `INSERT ... RETURNING id`；写 `GetProblem` 使用 `QueryRowContext(... WHERE id=$1, id)`。\n2. 查询不存在的 ID，检查 `errors.Is(err, sql.ErrNoRows)`，将其交由 HTTP 层映射为 404。\n3. 传入带单引号和 SQL 关键字的标题，如 `x' OR 1=1 --`，它应该只是普通字段值；确认 SQL 没有被改变。\n\n**过关标准**：能解释驱动、连接池、QueryRow、Scan 各自做什么，也能说明为什么 SQL 字符串拼接不安全。\n\n---",
        "title": "让 Go 连上 PostgreSQL",
        "summary": "认识驱动和连接池，用参数绑定完成创建与详情查询。",
        "task": "安装 pgx 数据库驱动；从 DATABASE_URL 读取配置；PingContext检查连接；实现Create与Get。",
        "checks": [
          "有效连接能Ping成功，无效连接有错误",
          "SQL用$1参数，含单引号标题按普通文本保存",
          "不存在记录通过sql.ErrNoRows映射为404"
        ],
        "hint": "sql.Open只是创建连接池句柄，不保证已连上。数据库密码只放本机环境，不提交Git。",
        "quiz": {
          "question": "sql.Open 没有报错，能证明数据库已连接成功吗？",
          "options": [
            "可以",
            "不能，还需要PingContext等实际操作",
            "只有加了fmt.Println才可以"
          ],
          "answer": 1,
          "explanation": "Open准备数据库句柄与连接池；具体连接通常在需要时建立。PingContext用于验证可连接性。"
        }
      },
      {
        "id": "go-14",
        "day": 14,
        "minutes": 180,
        "stageId": "go-crud",
        "concepts": [
          "数据访问层（repository）",
          "QueryContext",
          "ExecContext",
          "RETURNING",
          "事务"
        ],
        "starterCode": "-- SQL片段：占位符由Go驱动绑定，不是手工替换字符串。\nSELECT id, title, solved FROM problems ORDER BY id;\nUPDATE problems SET solved=$1 WHERE id=$2;\nDELETE FROM problems WHERE id=$1;",
        "language": "sql",
        "sourceMarkdown": "### Day 14｜从内存 CRUD 升级为 PostgreSQL CRUD\n\n**今天为什么学**：这是最早能称为“做出一个可用后端”的里程碑。把 Day 11 的内存 store 替换为 SQL，HTTP 接口不需要大改。\n\n#### 知识点与任务的对应关系\n\n- **数据访问层（repository）** → 负责 SQL，与 Handler 的 HTTP 输入输出分开；同一接口可以换底层实现。\n- **`QueryContext`** → 查询多行，`rows.Next()` 遍历、`Scan` 读取、`defer rows.Close()` 回收资源，最后检查 `rows.Err()`。\n- **`ExecContext`** → 执行更新或删除，使用 `RowsAffected` 判断是否影响了目标数据。\n- **`RETURNING`** → PostgreSQL 插入后可 `RETURNING id`，比通用的 `LastInsertId()` 更合适。\n- **事务** → 多条 SQL 必须“要么全部成功、要么全部失败”时，用 `BeginTx`、`Commit`、`Rollback`。\n- **错误分层** → 存储层将 `sql.ErrNoRows` 等转换为领域错误，HTTP 层选择 404/400/500；不要把数据库内部错误原文直接返回用户。\n\n#### 核心片段：从数据库读取列表\n\n以下代码属于你的 repository 层，**需要 Day 13 的 `db *sql.DB` 与你定义的 `Problem` 类型**。它演示正确的多行读取生命周期。\n\n```go\nfunc ListProblems(ctx context.Context, db *sql.DB) ([]Problem, error) {\n    rows, err := db.QueryContext(ctx, `\n        SELECT id, title, platform, difficulty, solved\n        FROM problems ORDER BY id`)\n    if err != nil { return nil, fmt.Errorf(\"query problems: %w\", err) }\n    defer rows.Close()\n    result := make([]Problem, 0)\n    for rows.Next() {\n        var p Problem\n        if err := rows.Scan(&p.ID, &p.Title, &p.Platform, &p.Difficulty, &p.Solved); err != nil {\n            return nil, fmt.Errorf(\"scan problem: %w\", err)\n        }\n        result = append(result, p)\n    }\n    if err := rows.Err(); err != nil { return nil, fmt.Errorf(\"rows: %w\", err) }\n    return result, nil\n}\n```\n\n#### 迁移步骤\n\n1. 把内存 `Get/Create/Patch/Delete/List` 改为数据库访问；接口路径、JSON 结构与状态码保持 Day 8 的契约。\n2. `GET` 使用 `QueryRowContext` 或 `QueryContext`；`POST` 使用 `INSERT ... RETURNING id`；`PATCH/DELETE` 用 `WHERE id=$1` 和 `RowsAffected`。\n3. 执行至少六个 API 端点的正常/非法/不存在测试，重启 Go 进程后再次查询数据。\n\n**验收**：合法数据重启后仍能查到；不存在的 ID 返回 404；原始 SQL 语句始终使用参数绑定；`go test ./...` 与后续新增测试不因更换底层存储而全部失效。\n\n**注意**：第 14 天达到“本地可用 CRUD”即可，不等于已经具备账号隔离、容灾备份和公网安全防护。\n\n---",
        "title": "完成持久化 CRUD",
        "summary": "把内存存储换成 SQL，接口契约和用户看到的行为保持稳定。",
        "task": "将 List、Get、Create、Patch、Delete 换成 PostgreSQL；补资源关闭与错误映射，重启API后再查。",
        "checks": [
          "创建记录后重启API仍能读到",
          "不存在ID返回404，错误输入不写入",
          "多行查询关闭rows并检查rows.Err",
          "SQL始终使用参数绑定"
        ],
        "hint": "先换一个存储方法并测通，再迁移下一个。PostgreSQL新ID使用RETURNING读取。",
        "quiz": {
          "question": "遍历 rows 完成后为什么还要检查 rows.Err()？",
          "options": [
            "为了重新执行SQL",
            "为了删除结果",
            "遍历途中也可能发生错误，不能只看Next结束"
          ],
          "answer": 2,
          "explanation": "Next返回false可能是结束，也可能是出错。rows.Err能区分并发现读取过程中的错误。"
        }
      },
      {
        "id": "go-15",
        "day": 15,
        "minutes": 120,
        "stageId": "go-quality",
        "concepts": [
          "测试文件与函数",
          "表驱动测试",
          "断言",
          "边界值",
          "错误类型/信息"
        ],
        "starterCode": "// 测试片段：放到_test.go，需导入testing与strings。\n// 前置：ValidateTitle规定1..80个Unicode码点。\nfunc TestTitleTooLong(t *testing.T) {\n    if err := ValidateTitle(strings.Repeat(\"a\", 81)); err == nil {\n        t.Fatal(\"81-character title should fail\")\n    }\n}",
        "language": "go",
        "sourceMarkdown": "### Day 15｜测试纯函数：先让错误能被稳定复现\n\n**今天为什么学**：手工测试只能说明“刚才那一次看起来正确”；自动化测试能在以后每次修改代码时重复检查关键行为。\n\n#### 知识点与任务的对应关系\n\n- **测试文件与函数** → 文件名以 `_test.go` 结尾，函数名 `TestXxx(t *testing.T)`，通过 `go test ./...` 运行。\n- **表驱动测试** → 把输入、期望结果写在一张切片里；循环逐个运行，很适合 Go 和你已有的算法竞赛习惯。\n- **断言** → `if got != want { t.Errorf(...) }`；失败必须给清楚的“实际值与期望值”。\n- **边界值** → 业务通常在空串、最大长度、负数、0、重复值附近出问题，不只测正常输入。\n- **错误类型/信息** → 业务规则可以返回明确的 error；更复杂时用 `errors.Is` 或自定义错误码，而不是依赖随意变化的字符串。\n- **测试独立性** → 预期结果应该由需求或人工算出，不要调用同一个被测实现计算 `want`。\n\n#### 可直接测试的示例：`validation.go`\n\n```go\npackage validation\n\nimport (\n    \"errors\"\n    \"strings\"\n    \"unicode/utf8\"\n)\n\nvar ErrTitle = errors.New(\"title must contain 1..80 characters\")\n\nfunc ValidateTitle(s string) error {\n    s = strings.TrimSpace(s)\n    n := utf8.RuneCountInString(s)\n    if n == 0 || n > 80 { return ErrTitle }\n    return nil\n}\n```\n\n与它放在同一目录的 `validation_test.go`：\n\n```go\npackage validation\n\nimport (\n    \"errors\"\n    \"strings\"\n    \"testing\"\n)\n\nfunc TestValidateTitle(t *testing.T) {\n    tests := []struct { name, input string; bad bool }{\n        {\"normal\", \"Two Sum\", false},\n        {\"empty\", \"\", true},\n        {\"spaces\", \"   \", true},\n        {\"80 chars\", strings.Repeat(\"a\", 80), false},\n        {\"81 chars\", strings.Repeat(\"a\", 81), true},\n        {\"chinese\", \"动态规划\", false},\n    }\n    for _, tt := range tests {\n        t.Run(tt.name, func(t *testing.T) {\n            err := ValidateTitle(tt.input)\n            if errors.Is(err, ErrTitle) != tt.bad { t.Fatalf(\"err=%v, bad=%v\", err, tt.bad) }\n        })\n    }\n}\n```\n\n**拆解**：`t.Run` 给每个样例单独命名；`errors.Is` 比直接比较错误字符串更稳健；`utf8.RuneCountInString` 按 Unicode 码点数计算，需求如果定义“字节数”则要改回 `len`。\n\n#### 练习与验收\n\n1. 为难度字段写 `ValidateDifficulty`，分别测试 `easy`、`medium`、`hard` 及非法值。\n2. 给解析分页参数的函数写正常值、缺失、负数、超大值和非数字测试。\n3. 故意修改 `ValidateTitle` 使 81 字符也合法，确认测试会失败，然后还原。\n\n**过关标准**：`go test ./...` 通过，并能解释为什么“测试会失败的演示”与“测试恰好全绿”同样重要。\n\n---",
        "title": "测试输入的边界",
        "summary": "把标题、难度和分页校验写成可重复检查的纯函数。",
        "task": "写表驱动测试覆盖标题长度、空白、中文、合法难度与非法分页；人为放开81字符限制，观察失败再还原。",
        "checks": [
          "正常、非法与边界输入各有断言",
          "80字符通过、81字符失败",
          "故意引入错误能让相应测试失败"
        ],
        "hint": "先写清长度指的是字节还是Unicode码点，再决定用len还是rune计数。测试不要只断言没有panic。",
        "quiz": {
          "question": "哪组更适合检验最大80字符的标题规则？",
          "options": [
            "79、80、81字符",
            "只测10字符",
            "只测英文Hello"
          ],
          "answer": 0,
          "explanation": "边界两侧与边界本身容易暴露比较符号等错误；还应配空白、中文与正常输入测试。"
        }
      },
      {
        "id": "go-16",
        "day": 16,
        "minutes": 180,
        "stageId": "go-quality",
        "concepts": [
          "httptest.NewRequest",
          "httptest.NewRecorder",
          "ServeHTTP",
          "JSON 断言",
          "测试替身（fake）"
        ],
        "starterCode": "// 测试函数内片段；需导入net/http与net/http/httptest。\n// 前置：mux已注册路由，测试存储包含id=1。\nreq := httptest.NewRequest(\"GET\", \"/problems/1\", nil)\nrec := httptest.NewRecorder()\nmux.ServeHTTP(rec, req)\nif rec.Code != http.StatusOK { t.Fatalf(\"status=%d\", rec.Code) }\n// 再解析Body，断言字段与Content-Type。",
        "language": "go",
        "sourceMarkdown": "### Day 16｜HTTP 自动化测试：不仅看 200\n\n**今天为什么学**：后端最常见的错误不只是函数计算错，还有状态码错、响应 JSON 字段缺失、Content-Type 错、错误输入没处理。\n\n#### 知识点与任务的对应关系\n\n- **`httptest.NewRequest`** → 创建一个模拟 HTTP 请求，不需要真的监听端口。\n- **`httptest.NewRecorder`** → 捕获处理器的 HTTP 状态码、Header 和 Body。\n- **`ServeHTTP`** → 调用路由器处理模拟请求，完整覆盖从路由到响应的链路。\n- **JSON 断言** → 解码返回 Body 比较字段值，不要只断言响应含某个单词。\n- **测试替身（fake）** → 用可控的内存 store 替代数据库，让接口测试不依赖外部 PostgreSQL。\n- **错误矩阵** → 每个端点至少覆盖正常、无效输入、资源不存在，后续再覆盖数据库错误与认证失败。\n\n#### 可直接运行的 HTTP 测试示例\n\n`server.go`：\n\n```go\npackage server\n\nimport (\n    \"encoding/json\"\n    \"net/http\"\n)\n\nfunc Routes() http.Handler {\n    mux := http.NewServeMux()\n    mux.HandleFunc(\"GET /health\", func(w http.ResponseWriter, r *http.Request) {\n        w.Header().Set(\"Content-Type\", \"application/json\")\n        _ = json.NewEncoder(w).Encode(map[string]string{\"status\":\"ok\"})\n    })\n    return mux\n}\n```\n\n`server_test.go`：\n\n```go\npackage server\n\nimport (\n    \"encoding/json\"\n    \"net/http\"\n    \"net/http/httptest\"\n    \"testing\"\n)\n\nfunc TestHealth(t *testing.T) {\n    req := httptest.NewRequest(http.MethodGet, \"/health\", nil)\n    rec := httptest.NewRecorder()\n    Routes().ServeHTTP(rec, req)\n    if rec.Code != 200 { t.Fatalf(\"status=%d\", rec.Code) }\n    if got := rec.Header().Get(\"Content-Type\"); got != \"application/json\" {\n        t.Fatalf(\"content type=%q\", got)\n    }\n    var body struct { Status string `json:\"status\"` }\n    if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil { t.Fatal(err) }\n    if body.Status != \"ok\" { t.Fatalf(\"body=%+v\", body) }\n}\n```\n\n#### 练习与验收\n\n1. 为 `GET /problems/{id}` 测试：存在返回 200、非法 ID 返回 400、不存在返回 404。\n2. 为 `POST /problems` 测试：成功 201、缺标题 400、JSON 错误 400、未知字段 400。\n3. 为 `PATCH`、`DELETE` 增加至少两条测试，累计不少于 8 个独立场景。\n\n**过关标准**：`go test -v ./...` 可重复通过；故意改错状态码、响应 JSON 或业务数据中的任意一项，都有对应测试变红。\n\n---",
        "title": "自动检查整个 HTTP 响应",
        "summary": "用 httptest 跑路由，状态码、响应头和 JSON 都要有断言。",
        "task": "为CRUD handler至少写8个场景，用fake store隔离数据库；通过ServeHTTP测试完整路由。",
        "checks": [
          "包含200、201、400、404和删除场景",
          "JSON字段与Content-Type都有断言",
          "改错状态码或字段后对应测试失败"
        ],
        "hint": "NewRequest造请求，NewRecorder收响应，ServeHTTP走路由；fake store只能证明HTTP层，不证明SQL。",
        "quiz": {
          "question": "只断言状态码200，可能漏掉什么？",
          "options": [
            "任何测试都不会漏",
            "响应JSON字段错误或Content-Type错误",
            "编译错误一定不会出现"
          ],
          "answer": 1,
          "explanation": "成功状态码不保证响应内容正确。应解析Body并检查字段，也检查约定的Header。"
        }
      },
      {
        "id": "go-17",
        "day": 17,
        "minutes": 180,
        "stageId": "go-quality",
        "concepts": [
          "单元测试 vs 集成测试",
          "独立测试数据库",
          "事务与清理",
          "约束验证",
          "重放一致性"
        ],
        "starterCode": "// 集成测试函数内片段；db必须指向专用测试库。\ntx, err := db.BeginTx(ctx, nil)\nif err != nil { t.Fatal(err) }\ndefer tx.Rollback()\n// 用tx执行测试写入并断言查询与约束。\n// 自增序列可有空洞；此片段不代替对真实Repository的测试。",
        "language": "go",
        "sourceMarkdown": "### Day 17｜数据库集成测试：证明确实写进 PostgreSQL\n\n**今天为什么学**：fake store 的测试可以证明 HTTP 处理逻辑，但不能证明 SQL 是否正确、表结构是否可用、事务是否真会回滚。\n\n#### 知识点与任务的对应关系\n\n- **单元测试 vs 集成测试** → 单元测试隔离外部依赖；集成测试连接真实 PostgreSQL，核验与数据库之间的行为。\n- **独立测试数据库** → 用单独的 `TEST_DATABASE_URL`，**绝不要指向真实业务或有价值的数据**；测试可以插入或回滚。\n- **事务与清理** → 单个测试把操作包在事务中，最后 `Rollback`；不同测试也能选择独立 schema / 唯一数据。\n- **约束验证** → 应测试空标题、重复唯一键、无效枚举值真的被数据库拒绝。\n- **重放一致性** → 同样的测试重复运行应该稳定通过，不依赖某一条恰好存在的旧记录。\n- **迁移可复现** → 建表 SQL/迁移脚本要能将一个新空库初始化为测试所需结构。\n\n#### 集成测试代码片段：`repository_integration_test.go`\n\n以下测试**需要预先创建测试数据库并执行 Day 12 的 schema**；驱动与数据库需要实际安装。此代码展示连接和事务的基本用法。\n\n```go\npackage repository\n\nimport (\n    \"context\"\n    \"database/sql\"\n    \"os\"\n    \"testing\"\n    _ \"github.com/jackc/pgx/v5/stdlib\"\n)\n\nfunc TestInsertAndRollback(t *testing.T) {\n    dsn := os.Getenv(\"TEST_DATABASE_URL\")\n    if dsn == \"\" { t.Skip(\"set TEST_DATABASE_URL for integration test\") }\n    db, err := sql.Open(\"pgx\", dsn)\n    if err != nil { t.Fatal(err) }\n    defer db.Close()\n    ctx := context.Background()\n    tx, err := db.BeginTx(ctx, nil)\n    if err != nil { t.Fatal(err) }\n    defer tx.Rollback()\n    var id int64\n    err = tx.QueryRowContext(ctx, `INSERT INTO problems\n        (title,platform,difficulty) VALUES ($1,$2,$3) RETURNING id`,\n        \"test-one\", \"local\", \"easy\").Scan(&id)\n    if err != nil { t.Fatal(err) }\n    if id <= 0 { t.Fatalf(\"invalid id: %d\", id) }\n}\n```\n\n**拆解**：事务的回滚会撤销插入的数据，但 PostgreSQL 自增序列可能仍然消耗 ID，不能假设序号连续。`t.Skip` 仅用于明确标记外部测试环境未设置，最终交付前必须在具备数据库的 CI/本地环境实际运行过这些集成测试。\n\n#### 练习与验收\n\n1. 为真实 `Create/Get/Patch/Delete` 各写集成测试，不能只测试裸 SQL 示例。\n2. 测试数据库约束：空标题应失败、非法 difficulty 应失败；捕获和分类数据库返回的错误。\n3. 连续运行测试两次，确认互不污染，最后查询表中不存在测试数据。\n\n**过关标准**：能指出哪些问题必须连接 PostgreSQL 才能发现；能证明测试不会误伤生产库。\n\n---",
        "title": "用真实数据库验证存储层",
        "summary": "fake不能发现SQL和约束错误，集成测试要实际连接测试库。",
        "task": "用独立 TEST_DATABASE_URL 为实际Repository写CRUD与约束测试；用事务回滚或可靠清理，连续运行两次。",
        "checks": [
          "实际执行Create、Get、Patch、Delete",
          "空标题与非法难度被真实数据库拒绝",
          "连续两次通过且无测试数据残留",
          "记录执行结果，未配置数据库的Skip不算通过"
        ],
        "hint": "先确认连接的是专用测试库；测试ID不要求连续，回滚也可能消耗自增序列。",
        "quiz": {
          "question": "集成测试因没有数据库而Skip，能报告“数据库测试通过”吗？",
          "options": [
            "能，命令是绿色的",
            "能，已有单元测试",
            "不能，必须实际运行数据库测试"
          ],
          "answer": 2,
          "explanation": "Skip表示这次没验证。交付前应在配置好的测试库或CI数据库服务中实际运行并记录结果。"
        }
      },
      {
        "id": "go-18",
        "day": 18,
        "minutes": 150,
        "stageId": "go-quality",
        "concepts": [
          "Handler（HTTP 层）",
          "Service（业务层）",
          "Repository（存储层）",
          "依赖注入",
          "小接口"
        ],
        "starterCode": "// 依赖注入片段：完整方法按实际需求定义。\ntype Handler struct { store ProblemStore }\nfunc NewHandler(store ProblemStore) *Handler {\n    return &Handler{store: store}\n}\n// 测试传fake store；启动程序传PostgreSQL store。",
        "language": "go",
        "sourceMarkdown": "### Day 18｜代码分层：让 main.go 不再承包一切\n\n**今天为什么学**：一个文件塞满路由、校验、SQL 和业务规则，修改一处很容易影响别处。分层不是“目录越多越高级”，而是分清职责。\n\n#### 知识点与任务的对应关系\n\n- **Handler（HTTP 层）** → 读路径/Query/Body、决定 HTTP 状态码、写 JSON；不直接决定复杂业务规则。\n- **Service（业务层）** → 验证需求规则、组合操作；如果现在业务很简单，可以暂时没有单独 service 层。\n- **Repository（存储层）** → 组织 SQL，不应依赖 `http.ResponseWriter`。\n- **依赖注入** → `NewHandler(store)` 接受存储依赖，比在函数里使用全局变量更容易测试。\n- **小接口** → 在真正需要替身/多实现的一侧定义 `ProblemStore` 接口，不要给每个类型机械地创建接口。\n- **错误归属** → Repository 告诉 Handler “不存在”或“数据库故障”；由 Handler 映射为对应 HTTP 响应。\n\n#### 推荐目录（不需要一次建十几个包）\n\n```text\ngo-backend/\n├── cmd/api/main.go          # 启动和依赖组装\n├── internal/httpapi/        # HTTP 路由和 Handler\n├── internal/problems/       # Problem 类型、业务规则\n├── internal/postgres/       # SQL 查询实现\n├── db/schema.sql            # 数据库定义\n├── go.mod\n└── README.md\n```\n\n#### 依赖注入的核心代码片段\n\n```go\n// 这段是讲解接口与依赖关系的片段，需要已有 Problem 类型。\ntype ProblemStore interface {\n    Get(ctx context.Context, id int64) (Problem, error)\n}\n\ntype Handler struct { store ProblemStore }\nfunc NewHandler(store ProblemStore) *Handler { return &Handler{store: store} }\n\nfunc (h *Handler) GetProblem(w http.ResponseWriter, r *http.Request) {\n    // ① 解析 PathValue 和校验 ID\n    // ② h.store.Get(r.Context(), id)\n    // ③ 根据 error 返回 404/500，成功时编码 JSON\n}\n```\n\n**拆解**：Handler 不知道底层是不是 PostgreSQL；测试时可传 FakeStore。Go 的接口通过方法集合隐式实现，不需要像 C++ 那样写 `implements` 或建立复杂继承层级。\n\n#### 练习与验收\n\n1. 把所有路由注册收拢到一个地方；把 SQL 代码移入单独的文件/包。\n2. 删除“整个项目只有一个 main.go 里几百行逻辑”的结构，但不要为了好看凭空多建五层抽象。\n3. 运行全部 HTTP 与数据库测试，确认对外路径、JSON、状态码不变。\n\n**过关标准**：能解释一次请求从 Handler 到 Repository，再返回响应的全过程；能在不启动数据库的情况下测试 HTTP 层。\n\n---",
        "title": "分清 HTTP 与存储职责",
        "summary": "减少 main.go 的负担，让 handler能换存储也能单独测试。",
        "task": "保持对外API不变，将SQL移动到Repository；通过NewHandler(store)注入依赖，按需要增加Service。",
        "checks": [
          "路由、JSON与状态码和重构前一致",
          "HTTP测试能在无数据库环境运行",
          "全部原有测试仍通过"
        ],
        "hint": "先抽一个最臃肿职责，别一次建很多空包。Repository返回领域结果，不接收ResponseWriter。",
        "quiz": {
          "question": "哪一层适合决定HTTP状态码？",
          "options": [
            "Handler",
            "数据库驱动",
            "SQL表结构"
          ],
          "answer": 0,
          "explanation": "Handler理解HTTP请求与响应；Repository负责数据访问，返回可分类的结果或错误。"
        }
      },
      {
        "id": "go-19",
        "day": 19,
        "minutes": 120,
        "stageId": "go-quality",
        "concepts": [
          "环境变量",
          "显式校验",
          "结构化日志",
          "日志不能泄密",
          "请求关联"
        ],
        "starterCode": "// 配置读取片段；需导入os、fmt。\ndsn := os.Getenv(\"DATABASE_URL\")\nif dsn == \"\" {\n    return fmt.Errorf(\"DATABASE_URL is required\")\n}\n// 仅提示缺少哪项；别把带密码的dsn写进日志。",
        "language": "go",
        "sourceMarkdown": "### Day 19｜配置与日志：能定位问题才算会维护\n\n**今天为什么学**：同一份代码可能在本地、CI、云服务器运行。如果端口和密码写死在代码里，迁移环境就会混乱，泄露密钥的风险也很高。\n\n#### 知识点与任务的对应关系\n\n- **环境变量** → `os.Getenv(\"PORT\")` 读取设置，数据库连接字符串由 `DATABASE_URL` 提供；Git 仓库只提交 `.env.example`，不提交真实 `.env`。\n- **显式校验** → 不能把缺失数据库配置默默当作正常；启动前验证必需项，错误消息指出缺什么。\n- **结构化日志** → `log/slog` 用键值形式记录时间、事件、错误等信息，便于搜索和分析。\n- **日志不能泄密** → 不输出密码、完整数据库 DSN、Bearer Token 或 Cookie。\n- **请求关联** → 可加 request ID，结合 HTTP 方法、路径、状态码定位问题；不要把用户输入全部无过滤地写入日志。\n- **启动与退出错误** → 端口占用、数据库不可用都应该有清晰报错，而不是无声失败。\n\n#### 可直接运行的配置与日志示例：`main.go`\n\n```go\npackage main\n\nimport (\n    \"log/slog\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc main() {\n    logger := slog.New(slog.NewTextHandler(os.Stdout, nil))\n    port := os.Getenv(\"PORT\")\n    if port == \"\" { port = \"8080\" }\n    n, err := strconv.Atoi(port)\n    if err != nil || n < 1 || n > 65535 {\n        logger.Error(\"invalid port\", \"port\", port)\n        os.Exit(1)\n    }\n    if os.Getenv(\"DATABASE_URL\") == \"\" {\n        logger.Error(\"missing required DATABASE_URL\")\n        os.Exit(1)\n    }\n    logger.Info(\"configuration loaded\", \"port\", n) // 不记录密码或 DSN\n}\n```\n\n**拆解**：端口可以给本地默认值；数据库 URL 如果是必需配置，就在启动前检查。`slog.Info` 的键值结构便于后来接入日志平台，但现在不必安装任何平台。\n\n#### 练习与验收\n\n1. 为 API 引入 `PORT` 和 `DATABASE_URL` 两个配置；缺失或非法时在启动阶段明确反馈。\n2. 给每个请求添加包含方法、路径、耗时、状态码的简洁日志，不打印完整请求 Body。\n3. 搜索仓库，确保没有提交真实密钥；示例配置单独放在 `.env.example`，并加入适当的 `.gitignore`。\n\n**过关标准**：换端口无需改 Go 源码；当数据库地址错误时，开发者能定位原因；日志不含密码。\n\n---",
        "title": "把配置和日志写清楚",
        "summary": "换环境不用改源码，出错时能定位原因，日志里不留下凭据。",
        "task": "用PORT、DATABASE_URL配置服务；启动时检查缺失与格式；记录请求方法、路径、耗时和状态码。",
        "checks": [
          "改端口不用改源码",
          "缺失配置或数据库不可用有明确报错",
          "Git与日志均无真实密码、Token、Cookie"
        ],
        "hint": "别把完整DSN直接打印到日志。提交.env.example写占位值，真实.env只保存在本机。",
        "quiz": {
          "question": "日志里不应该出现什么？",
          "options": [
            "请求耗时",
            "完整数据库连接串和登录Cookie",
            "请求方法"
          ],
          "answer": 1,
          "explanation": "连接串和Cookie可能包含可用凭据。日志用于定位故障，不能把身份凭据一起暴露。"
        }
      },
      {
        "id": "go-20",
        "day": 20,
        "minutes": 150,
        "stageId": "go-quality",
        "concepts": [
          "Query 参数",
          "默认值与上限",
          "OFFSET/LIMIT",
          "稳定排序",
          "参数化筛选"
        ],
        "starterCode": "-- 分页SQL片段：绑定参数之前，校验page与limit。\n-- offset = (page - 1) * limit\nSELECT id, title, solved\nFROM problems\nORDER BY id\nLIMIT $1 OFFSET $2;",
        "language": "sql",
        "sourceMarkdown": "### Day 20｜筛选、排序、分页：让列表接口真正可用\n\n**今天为什么学**：数据量变大后，`GET /problems` 一次返回全部内容既难用也浪费流量。分页和稳定排序是后端常见需求。\n\n#### 知识点与任务的对应关系\n\n- **Query 参数** → `?page=2&limit=20&solved=true` 用于列表筛选；不要把它们误认为路径参数。\n- **默认值与上限** → 未提供 `page` 默认 1、`limit` 默认 20；限制 `limit` 最大 100，非法值返回 400。\n- **OFFSET/LIMIT** → SQL 的 `LIMIT $1 OFFSET $2` 限制返回数量；偏移 `(page-1)*limit`。\n- **稳定排序** → `ORDER BY id` 保证同样查询的顺序可预测；没有排序，分页可能重复/遗漏数据。\n- **参数化筛选** → `WHERE solved=$1` 的布尔值作为参数传递；排序字段等 SQL 标识符要在白名单里选择，不能直接把用户字符串拼进去。\n- **索引及代价** → 索引能加快某些查询，但也占空间并拖慢写入；先了解 `EXPLAIN`，不要见字段就建索引。\n\n#### SQL 与分页换算\n\n```sql\n-- 已将 solved、limit、offset 解析并校验后再作为参数传入\nSELECT id, title, solved\nFROM problems\nWHERE solved = $1\nORDER BY id\nLIMIT $2 OFFSET $3;\n```\n\nGo 中的分页参数检查：\n\n```go\nfunc parsePagination(q url.Values) (page, limit int, err error) {\n    page, limit = 1, 20\n    if s := q.Get(\"page\"); s != \"\" {\n        page, err = strconv.Atoi(s)\n        if err != nil || page < 1 { return 0, 0, fmt.Errorf(\"invalid page\") }\n    }\n    if s := q.Get(\"limit\"); s != \"\" {\n        limit, err = strconv.Atoi(s)\n        if err != nil || limit < 1 || limit > 100 { return 0, 0, fmt.Errorf(\"invalid limit\") }\n    }\n    if page > 1000000 { return 0, 0, fmt.Errorf(\"page too large\") }\n    return page, limit, nil\n}\n```\n\n**拆解**：`url.Values` 来自 `net/url`，`strconv.Atoi` 和 `fmt.Errorf` 要导入相应包。上面的函数属于一个更大的 Go 包，并非独立程序。`OFFSET` 适合入门和小数据量；数据量巨大时了解基于游标的 keyset pagination。\n\n#### 练习与验收\n\n1. 实现 `GET /problems?page=...&limit=...`，结果带一个可预测的顺序。\n2. 增加 `solved=true/false` 过滤；缺失时返回全部，布尔字符串非法时返回 400。\n3. 比较 `page=1/2/3`，确认没有重复记录；测试 `limit=0`、`limit=1000`、`page=-1`。\n\n**过关标准**：接口即使有 500 条数据，也能按分页访问，且无 SQL 拼接用户输入。\n\n---",
        "title": "给列表加筛选与分页",
        "summary": "数据变多后，稳定排序和参数边界让接口继续可用。",
        "task": "实现page、limit、solved参数；设page默认1、limit默认20且最多100；按固定规则排序。",
        "checks": [
          "静态测试数据的相邻页不重复，排序稳定",
          "page负数、limit为0或超限返回400",
          "solved非法字符串返回400，SQL不拼接用户输入"
        ],
        "hint": "OFFSET=(page-1)*limit；先校验再计算。排序字段用固定白名单，不能当普通参数绑定列名。",
        "quiz": {
          "question": "page=2、limit=20 时 OFFSET 是多少？",
          "options": [
            "40",
            "2",
            "20"
          ],
          "answer": 2,
          "explanation": "第一页偏移0，第二页跳过20条。计算为(2-1)×20。"
        }
      },
      {
        "id": "go-21",
        "day": 21,
        "minutes": 150,
        "stageId": "go-quality",
        "concepts": [
          "README 的最小内容",
          "可复现环境",
          "质量门禁",
          "接口演示",
          "错误日志与限制"
        ],
        "starterCode": "# 在独立Go项目目录中执行；不是资料仓库根目录。\ngo fmt ./...\ngo vet ./...\ngo test ./...\ngo build ./...\n# 数据库集成测试另需专用TEST_DATABASE_URL。",
        "language": "text",
        "sourceMarkdown": "### Day 21｜第一版工程验收：别人能不能在自己电脑上跑起来\n\n**今天为什么学**：代码在你电脑里能跑，不代表别人能复现。README、测试命令和错误排查说明是交付的一部分。\n\n#### 知识点与任务的对应关系\n\n- **README 的最小内容** → 项目做什么、依赖什么、如何配置数据库、如何创建表、如何启动、如何调用 API、如何运行测试。\n- **可复现环境** → 区分系统依赖（Go/PostgreSQL）与 Go 模块依赖（`go.mod`/`go.sum`）；不要依赖本机的隐形设置。\n- **质量门禁** → 格式检查、静态分析、全部单元测试和数据库集成测试应在提交前运行。\n- **接口演示** → 给用户一个完整的 `curl` 流程：新增 → 查询 → 修改 → 删除 → 再查 404。\n- **错误日志与限制** → README 应说明需要本地 PostgreSQL、环境变量，以及尚未实现登录的安全限制。\n- **提交习惯** → 交付版本打 tag 之前先完成测试，别只把输出写成“所有测试都通过”却没有真实运行。\n\n#### 质量检查命令（项目根目录）\n\n```powershell\ngo fmt ./...\ngo vet ./...\ngo test ./...\ngo test -race ./...\ngo build ./...\ngit status\n```\n\n示例 README 的主要结构：\n\n```markdown\n# Problems API\n## 功能\n## 环境要求（Go、PostgreSQL）\n## 安装与数据库初始化\n## 配置说明（DATABASE_URL、PORT）\n## 启动命令\n## API 调用示例\n## 测试命令（单元与集成测试）\n## 已知限制与安全注意事项\n```\n\n**拆解**：`go test ./...` 可能在缺少 `TEST_DATABASE_URL` 时跳过需要数据库的测试；这不等于集成测试已经通过，要查看 `go test -v` 是否出现 `SKIP`，在完整环境运行。\n\n#### 练习与验收\n\n1. 用一个新的空目录重新 clone 项目，只按 README 操作，不依赖之前做过的临时配置。\n2. 用六个端点演示一条 Problem 的完整生命周期，保存实际调用的请求、状态码和响应。\n3. 记录至少三个曾遇到的错误及解决办法，例如端口占用、数据库拒绝连接、参数无效。\n\n**过关标准**：别人照 README 能把 API 和数据库启动起来，至少有一套自动测试可重复执行。\n\n---",
        "title": "让别人照 README 跑起来",
        "summary": "重新克隆并按说明启动，才能发现你电脑里隐藏的依赖。",
        "task": "补环境、数据库初始化、配置、启动、API示例与测试命令；在新目录只照README跑一次CRUD演示。",
        "checks": [
          "fmt、vet、unit与HTTP测试实际通过",
          "声明的数据库集成测试实际执行",
          "新目录可按README完成创建、查询、修改、删除、再查404"
        ],
        "hint": "遇到漏写的配置不要直接靠记忆补上，先把它写进README，再从这一步重试。",
        "quiz": {
          "question": "哪一步能更好检查README是否可复现？",
          "options": [
            "在新目录从头照文档运行",
            "只在已配置好的目录启动",
            "让AI判断文字是否完整"
          ],
          "answer": 0,
          "explanation": "新目录能暴露未记录的文件、依赖和环境变量；已有环境经常掩盖遗漏。"
        }
      },
      {
        "id": "go-22",
        "day": 22,
        "minutes": 120,
        "stageId": "go-delivery",
        "concepts": [
          "认证（Authentication）",
          "鉴权（Authorization）",
          "用户与资源归属",
          "密码存储原则",
          "最小权限"
        ],
        "starterCode": "-- 迁移片段：先明确旧记录归属，再回填并设置约束。\nALTER TABLE problems\nADD COLUMN owner_id BIGINT REFERENCES users(id);\n\nSELECT id, title FROM problems WHERE owner_id=$1 ORDER BY id;",
        "language": "sql",
        "sourceMarkdown": "### Day 22｜认证 vs 鉴权：开始设计多用户数据\n\n**今天为什么学**：没有登录的 CRUD 只是共享记事本。要做真正的个人账户后端，必须区分“用户是谁”和“用户能不能访问这条记录”。\n\n#### 知识点与任务的对应关系\n\n- **认证（Authentication）** → 确认请求来自哪个已登录用户；例如用户提交凭据后建立会话。\n- **鉴权（Authorization）** → 即使已经登录，也必须判断是否有权限读取、修改或删除某条资源。\n- **用户与资源归属** → `users` 表存账号，`problems.owner_id` 关联用户；每个查询都应限定当前用户。\n- **密码存储原则** → **不保存明文或可逆加密的密码**，使用专门的密码哈希算法和唯一随机盐。\n- **最小权限** → 认证通过不代表可以访问任意用户 ID；管理员权限是另外设计的问题。\n- **统一错误语义** → 未登录为 401；登录但无权访问可选 403，或在资源层统一返回 404 防止暴露资源是否存在。\n\n#### 两张表的关系（用于一个新项目）\n\n```sql\nCREATE TABLE users (\n    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    email TEXT NOT NULL UNIQUE,\n    password_hash TEXT NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\n-- 如果从 Day 12 单用户表迁移：先处理已有记录，\n-- 再新增 owner_id、回填数据、设置 NOT NULL 和外键。\nALTER TABLE problems\nADD COLUMN owner_id BIGINT REFERENCES users(id);\n```\n\n**拆解**：原本 `problems` 没有 `owner_id`，不能直接假设旧数据已有归属。`ADD COLUMN` 先可空是为了让你有机会处理旧记录，实际部署迁移须按已有数据情况安排。`password_hash` 是文本形式的算法输出，而不是原密码。\n\n#### 练习与验收\n\n1. 在纸上设计两个测试用户 A 和 B，各自拥有两条题目。\n2. 写出列表 SQL：`SELECT ... FROM problems WHERE owner_id=$1 ORDER BY id`，说明 `$1` 从**已验证的会话**得来，不是直接信任用户填写的 `owner_id`。\n3. 写出“用户 A 查询 B 的题目”的预期结果，决定你的 API 返回 403 还是 404，并保持一致。\n\n**过关标准**：能用自己的话解释“登录成功不等于拥有资源权限”，并能画出 `users.id → problems.owner_id` 的关系。\n\n---",
        "title": "设计用户和记录的归属",
        "summary": "登录回答“你是谁”，每条记录的权限回答“你能操作什么”。",
        "task": "设计users与problems.owner_id；为旧记录安排归属迁移；写出用户A/B的列表与单条访问规则。",
        "checks": [
          "能画出users与problems的关联",
          "owner_id来自已验证身份",
          "迁移考虑旧数据，明确越权返回403或404"
        ],
        "hint": "别直接信任Body中的owner_id。旧表已有数据时，先回填归属，再加NOT NULL等约束。",
        "quiz": {
          "question": "用户A已经登录，是否能直接读取用户B的记录？",
          "options": [
            "能，登录就说明有权限",
            "不能，还必须检查对象归属",
            "能，只要前端隐藏按钮"
          ],
          "answer": 1,
          "explanation": "认证与授权是两步。每条受保护资源都要用当前可信用户身份判断是否允许访问。"
        }
      },
      {
        "id": "go-23",
        "day": 23,
        "minutes": 180,
        "stageId": "go-delivery",
        "concepts": [
          "注册流程",
          "密码哈希",
          "验证密码",
          "Session（会话）",
          "Cookie 选项"
        ],
        "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"log\"\n    \"golang.org/x/crypto/bcrypt\"\n)\n\nfunc main() {\n    password := []byte(\"strong passphrase 123\")\n    hash, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)\n    if err != nil { log.Fatal(err) }\n    fmt.Println(\"saved hash:\", string(hash))\n    err = bcrypt.CompareHashAndPassword(hash, password)\n    fmt.Println(\"correct password:\", err == nil)\n    err = bcrypt.CompareHashAndPassword(hash, []byte(\"wrong\"))\n    fmt.Println(\"wrong password:\", err == nil)\n}",
        "language": "go",
        "sourceMarkdown": "### Day 23｜注册与登录：密码哈希和会话的基本流程\n\n**今天为什么学**：账号功能是安全敏感的部分。先明确注册、验证密码、建立会话的流程，不靠浏览器传递“我是用户 3”这种不可信信息。\n\n#### 知识点与任务的对应关系\n\n- **注册流程** → 验证邮箱和密码规则 → 对密码做专用哈希 → 保存用户记录；邮箱唯一性要由数据库约束。\n- **密码哈希** → 演示使用 `golang.org/x/crypto/bcrypt` 的 `GenerateFromPassword` 与 `CompareHashAndPassword`；密码不放 URL、不写日志。\n- **验证密码** → 不存在用户、密码错误都要返回相近的外部错误语义，避免泄露账号存在性。\n- **Session（会话）** → 登录成功后产生随机、不可猜测的会话令牌；服务端保存对应的身份与失效时间。\n- **Cookie 选项** → `HttpOnly` 防止网页脚本读取 Cookie；正式 HTTPS 场景设置 `Secure`、合适的 `SameSite` 与有效期。\n- **限流/暴力尝试防护** → 登录接口尤其需要合理限流、错误次数监控，不要无保护地公开在公网。\n\n#### 可运行的密码哈希演示：`main.go`\n\n先执行 `go get golang.org/x/crypto/bcrypt`（此代码需下载依赖）。\n\n```go\npackage main\n\nimport (\n    \"fmt\"\n    \"log\"\n    \"golang.org/x/crypto/bcrypt\"\n)\n\nfunc main() {\n    password := []byte(\"strong passphrase 123\")\n    hash, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)\n    if err != nil { log.Fatal(err) }\n    fmt.Println(\"saved hash:\", string(hash))\n    err = bcrypt.CompareHashAndPassword(hash, password)\n    fmt.Println(\"correct password:\", err == nil)\n    err = bcrypt.CompareHashAndPassword(hash, []byte(\"wrong\"))\n    fmt.Println(\"wrong password:\", err == nil)\n}\n```\n\n**拆解**：同一密码每次哈希的字符串通常不同，因为包含随机盐；验证不是重新哈希后直接对比文本，而是使用 `CompareHashAndPassword`。bcrypt 有 **72 字节输入长度限制**，真实项目要明确处理过长密码；更深入可比较 Argon2id 的适用性。\n\n#### 练习与验收\n\n1. 实现 `POST /register`：格式校验、邮箱规范化、密码哈希、唯一邮箱冲突处理；响应中**不能出现**密码或哈希。\n2. 实现 `POST /login`：按邮箱查哈希并验证，密码正确才建立会话；暂时不接前端页面。\n3. 验证数据库中密码不是明文；同一邮箱重复注册返回冲突；密码错误无法登录；Cookie 不在日志中暴露。\n\n**过关标准**：能讲清楚“密码哈希”和“Session Token”是两种完全不同的东西，前者用于验证密码，后者用于标识登录状态。\n\n---",
        "title": "实现注册和登录",
        "summary": "密码用专用哈希存储，登录后用会话标识身份。",
        "task": "实现/register与/login，使用专用密码哈希；建立随机会话与有效期，处理邮箱冲突及错误密码。",
        "checks": [
          "数据库不存明文密码，响应不含哈希",
          "重复邮箱受数据库唯一约束保护",
          "错误密码无法创建会话",
          "有明确密码长度规则和会话过期规则"
        ],
        "hint": "演示bcrypt有72字节输入上限，中文也按字节计算；哈希验证用Compare，不比较两次哈希文本。",
        "quiz": {
          "question": "相同密码两次bcrypt哈希通常不同，为什么仍能验证？",
          "options": [
            "说明库出错了",
            "只有第一次哈希有效",
            "输出含盐与参数，Compare能按对应信息验证"
          ],
          "answer": 2,
          "explanation": "每次使用随机盐，输出通常不同。CompareHashAndPassword理解已存哈希的参数与盐来验证密码。"
        }
      },
      {
        "id": "go-24",
        "day": 24,
        "minutes": 180,
        "stageId": "go-delivery",
        "concepts": [
          "可信身份从何而来",
          "Session vs JWT",
          "授权检查",
          "对象级鉴权",
          "401/403/404"
        ],
        "starterCode": "-- $2来自服务端验证的会话，不信任Body中的owner_id。\nSELECT id, title, solved FROM problems\nWHERE id=$1 AND owner_id=$2;\n\nDELETE FROM problems WHERE id=$1 AND owner_id=$2;",
        "language": "sql",
        "sourceMarkdown": "### Day 24｜把用户身份放进每条 CRUD：防越权\n\n**今天为什么学**：后端安全漏洞经常不是“没人登录就进来”，而是“登录 A 后，通过改 URL 中的 ID 读到了 B 的数据”。\n\n#### 知识点与任务的对应关系\n\n- **可信身份从何而来** → 服务端通过 Session/JWT 的合法性校验得到用户 ID；不能直接信任请求里的 `user_id` 字段。\n- **Session vs JWT** → Session 常用随机令牌 + 服务端存储；JWT 是签名令牌，但依旧要验证签名、有效期及适用范围。\n- **授权检查** → 每条查询都带 `owner_id` 条件，避免先把别人的数据读出来再决定不显示。\n- **对象级鉴权** → 不仅列表要筛选，单条 GET、PATCH、DELETE 也要检查资源归属。\n- **401/403/404** → 无有效会话返回 401；无权限访问现有对象时可 403 或 404，保持策略一致。\n- **退出与过期** → Session 需要有限有效期；退出时使服务端会话失效。仅删除浏览器 Cookie 不能撤销全部服务端凭据。\n\n#### 关键 SQL：不要仅用资源 ID\n\n```sql\n-- 当前用户 ID 必须从已验证的登录会话中获得。\nSELECT id, title, solved\nFROM problems\nWHERE id=$1 AND owner_id=$2;\n\nUPDATE problems SET solved=$1\nWHERE id=$2 AND owner_id=$3;\n\nDELETE FROM problems\nWHERE id=$1 AND owner_id=$2;\n```\n\n安全做法的 Handler 伪代码：\n\n```text\n1. 从 Cookie 读取随机会话令牌\n2. 服务端查 session、核验过期和撤销状态\n3. 查到 userID；失败 → 401\n4. 从 PathValue 解析 problemID（错误 → 400）\n5. SQL 使用 problemID + userID 双条件查询\n6. 查询不到 → 404；成功 → 200\n```\n\n**拆解**：若请求来自用户 A，即使修改 URL 为 B 的记录 ID，SQL 也不会返回 B 的数据。这个规则适用于写操作，不能只在 GET 列表上实现。\n\n#### 练习与验收\n\n1. 准备两个账号 A 和 B，各自至少两条记录；逐一验证 A 看不到、改不了、删不了 B 的记录。\n2. 清除 Cookie 后尝试 CRUD，必须返回 401；手动伪造 `owner_id` 字段不能改变真实身份。\n3. 退出登录，确认之前的会话令牌在服务端已失效，而不是只让浏览器界面显示“退出”。\n\n**过关标准**：能自己写出用户隔离的自动化测试，这是第 24 天比新增页面更重要的交付物。\n\n---",
        "title": "逐条挡住跨用户操作",
        "summary": "把可信用户ID加入每一次读写，改URL也不能越权。",
        "task": "给所有CRUD加认证和owner条件；准备A/B两个用户，测试读取、修改、删除与会话撤销。",
        "checks": [
          "未登录访问返回401",
          "A看不到、改不了、删不了B的记录",
          "伪造owner_id不改变身份",
          "退出后旧会话在服务端失效"
        ],
        "hint": "列表过滤只是第一步，详情与写操作也要带owner_id条件；授权必须在服务器执行。",
        "quiz": {
          "question": "查询单条私有记录，哪个条件更合理？",
          "options": [
            "WHERE id=$1 AND owner_id=$2",
            "只用WHERE id=$1",
            "按前端传入的user_id查询即可"
          ],
          "answer": 0,
          "explanation": "资源ID与服务端验证所得用户ID一起限制查询，可以阻止改URL访问其他用户的数据。"
        }
      },
      {
        "id": "go-25",
        "day": 25,
        "minutes": 150,
        "stageId": "go-delivery",
        "concepts": [
          "输入验证",
          "请求体上限",
          "SQL 注入",
          "CORS",
          "CSRF"
        ],
        "starterCode": "// Handler内片段：需导入net/http。\nr.Body = http.MaxBytesReader(w, r.Body, 1<<20)\n// 接下来严格Decode，并用errors.As区分MaxBytesError(413)。\n// 仍需业务校验、授权和稳定的错误响应。",
        "language": "go",
        "sourceMarkdown": "### Day 25｜后端安全底线：输入、SQL、HTTP、权限\n\n**今天为什么学**：功能越完整，越需要系统检验错误输入、并发和越权。今天不是做“企业级安全系统”，而是补齐几个常见且容易验证的防线。\n\n#### 知识点与任务的对应关系\n\n- **输入验证** → 字段类型、长度、枚举范围、未知 JSON 字段和过大的 Body 都要有明确规则。\n- **请求体上限** → `http.MaxBytesReader` 限制 Body，超过限制应返回 413；不要把全部请求直接 `io.ReadAll` 到无限大的内存中。\n- **SQL 注入** → 用户数据使用 `$1/$2` 参数绑定；SQL 表名、排序列如需动态选择，必须用固定白名单。\n- **CORS** → 浏览器跨源读取响应的安全机制，不是“后端开放 CORS 就自动安全”；不需要跨域就不必随意设置 `*`。\n- **CSRF** → Cookie 认证要结合合适的 SameSite 设置、Origin/CSRF 防护；不能只靠登录 Cookie 就认为所有状态修改安全。\n- **HTTPS、错误隐藏** → 公网使用 HTTPS；对用户返回稳定错误码，不泄露 SQL、服务器路径、密钥等内部细节。\n- **限流** → 登录、注册和高代价查询要有基本限制和监控；单进程内存计数在多实例部署时不够。\n\n#### 识别请求体超限的示例片段\n\n这段代码可用于已经使用 `r.Body` 的 Handler 内，**需要导入** `encoding/json`、`errors`、`net/http`。\n\n```go\nr.Body = http.MaxBytesReader(w, r.Body, 1<<20)\nvar input CreateProblemRequest\nerr := json.NewDecoder(r.Body).Decode(&input)\nif err != nil {\n    var limitErr *http.MaxBytesError\n    if errors.As(err, &limitErr) {\n        http.Error(w, \"request body too large\", http.StatusRequestEntityTooLarge)\n    } else {\n        http.Error(w, \"invalid JSON\", http.StatusBadRequest)\n    }\n    return\n}\n```\n\n**拆解**：`errors.As` 可以判断包装后的错误类型；不同的客户端错误应该有合理的 4xx 状态，而不是将所有意外都返回 500 或 200。这个片段仅处理解码错误，仍须补业务校验、未知字段和第二个 JSON 对象的检查。\n\n#### 练习与验收\n\n1. 故意发送 2 MiB 请求体、嵌套异常 JSON、拼错的字段、非法难度，检查响应和服务器稳定性。\n2. 用包含单引号、SQL 关键词的标题创建记录，再查询它，确认标题被当作文本保存。\n3. 测试无登录、过期会话、跨用户访问、非法 `Origin`；检查 HTTP 响应不泄露内部堆栈信息。\n\n**过关标准**：形成一张安全测试表，标清“输入 → 预期状态码 → 实际结果 → 是否修复”，而不是只在报告中写“已考虑安全”。\n\n---",
        "title": "检查接口的安全边界",
        "summary": "把超限输入、SQL注入、越权和错误泄漏变成可复现测试。",
        "task": "建立输入、预期状态码、实际结果、修复记录表；测试大Body、异常JSON、特殊标题、失效会话与非法Origin。",
        "checks": [
          "超限Body返回413，非法输入有明确4xx",
          "包含SQL关键词的标题只作为文本保存",
          "Cookie认证考虑CSRF/Origin规则",
          "响应与日志不泄漏内部路径和凭据"
        ],
        "hint": "CORS不是认证。先明确请求来源和Cookie策略，再设置对应规则；别默认把所有来源都开放。",
        "quiz": {
          "question": "把CORS设为*能防止未授权用户访问API吗？",
          "options": [
            "能，它会要求登录",
            "不能，认证和授权仍要由后端实现",
            "能，它自动检查owner_id"
          ],
          "answer": 1,
          "explanation": "CORS影响浏览器跨源读取响应，不替代服务器身份与权限检查，也不阻止所有客户端发请求。"
        }
      },
      {
        "id": "go-26",
        "day": 26,
        "minutes": 150,
        "stageId": "go-delivery",
        "concepts": [
          "goroutine",
          "channel",
          "sync.Mutex / RWMutex",
          "context.Context",
          "超时"
        ],
        "starterCode": "// 数据库调用片段：需导入context与time。\nctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)\ndefer cancel()\n// 将ctx传给QueryContext/ExecContext；只创建context不会自动停止工作。",
        "language": "go",
        "sourceMarkdown": "### Day 26｜Go 并发、context、超时与优雅退出\n\n**今天为什么学**：Go Web 服务在同一时刻可以接收多个请求。如果共享数据操作不加保护，或者关闭服务时直接杀进程，就可能出现竞态和中断。\n\n#### 知识点与任务的对应关系\n\n- **goroutine** → `go f()` 在新的 goroutine 并发执行，不等于每一个都会独占一个系统线程。\n- **channel** → goroutine 之间传递数据或同步的一种方式；先了解作用，不要求今天实现复杂 worker pool。\n- **`sync.Mutex` / `RWMutex`** → 保护共享可变内存，尤其是第 11 天的 map；并发读写 map 不安全。\n- **`context.Context`** → 随请求传递截止时间和取消信号；数据库调用使用 `r.Context()` 或其派生 context。\n- **超时** → `context.WithTimeout` 限制慢查询占用资源，函数返回时调用 `cancel()`。\n- **优雅退出** → 停止接收新连接，给在途请求留出收尾机会，再关闭数据库连接池。\n- **`go test -race`** → 动态检查实际跑到的路径中的数据竞争；检查没报警不等于所有并发问题都不存在。\n\n#### 优雅退出的最小可运行程序：`main.go`\n\n```go\npackage main\n\nimport (\n    \"context\"\n    \"log\"\n    \"net/http\"\n    \"os/signal\"\n    \"syscall\"\n    \"time\"\n)\n\nfunc main() {\n    mux := http.NewServeMux()\n    mux.HandleFunc(\"GET /health\", func(w http.ResponseWriter, r *http.Request) {\n        w.Write([]byte(\"ok\"))\n    })\n    srv := &http.Server{Addr: \":8080\", Handler: mux, ReadHeaderTimeout: 5 * time.Second}\n    ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)\n    defer stop()\n    go func() {\n        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {\n            log.Printf(\"server error: %v\", err)\n            stop()\n        }\n    }()\n    <-ctx.Done()\n    shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n    defer cancel()\n    if err := srv.Shutdown(shutdownCtx); err != nil { log.Printf(\"shutdown: %v\", err) }\n}\n```\n\n**拆解**：`go func(){ ... }()` 启动一个 goroutine 运行服务器；主 goroutine 等待系统退出信号；`Shutdown` 让 HTTP Server 有机会处理在途请求。这个示例使用 `syscall` 的传统信号常量，适合跨平台理解，实际 Windows/Linux 行为需按环境测试。\n\n#### 练习与验收\n\n1. 为一次耗时数据库查询加 `context.WithTimeout(r.Context(), 2*time.Second)`；观察超时如何传递。\n2. 给内存存储写一个并发测试，先故意去掉锁运行 `go test -race`，再恢复锁并检查。\n3. 运行 API，发出一个持续几秒的请求，再用 Ctrl+C 退出，查看是否有机会完成请求或在期限内取消。\n\n**过关标准**：能区分“数据竞争”“业务逻辑竞态”“超时取消”三个概念，不再把 goroutine 理解为自动安全。\n\n---",
        "title": "处理并发、超时和退出",
        "summary": "共享数据要同步，慢操作要能取消，退出时给在途请求收尾时间。",
        "task": "给慢查询传递请求context并设超时；写并发存储测试；实际启动服务，发请求后Ctrl+C检查退出。",
        "checks": [
          "并发路径实际运行race检查",
          "慢操作能响应取消或超时",
          "退出停止接新连接，并有期限地等待在途请求"
        ],
        "hint": "context只传递信号，不会自动中断所有代码；调用的函数需要使用它。race只检查实际执行到的路径。",
        "quiz": {
          "question": "go test -race 没报错说明什么？",
          "options": [
            "全部业务竞态都不存在",
            "程序永远线程安全",
            "本次实际运行路径未检测到数据竞争"
          ],
          "answer": 2,
          "explanation": "动态检查受测试覆盖影响；逻辑上的读改写竞态与超时行为仍需独立测试和设计。"
        }
      },
      {
        "id": "go-27",
        "day": 27,
        "minutes": 180,
        "stageId": "go-delivery",
        "concepts": [
          "镜像（image）vs 容器（container）",
          "Dockerfile 多阶段构建",
          "Compose 服务名",
          "volume",
          "健康检查与启动顺序"
        ],
        "starterCode": "# 在包含compose.yaml的独立项目目录执行。\ndocker compose up --build -d\ndocker compose logs api\n# 按README初始化数据库，并创建一条记录。\ndocker compose restart\n# 再查询记录，确认数据仍存在。",
        "language": "text",
        "sourceMarkdown": "### Day 27｜Docker 和 Compose：让 API 与数据库一起启动\n\n**今天为什么学**：用户不一定和你装了一样的 Go/数据库版本。容器可以把运行环境固定下来，Compose 帮你一次启动 API 和 PostgreSQL。\n\n#### 知识点与任务的对应关系\n\n- **镜像（image）vs 容器（container）** → 镜像是构建好的运行模板，容器是实际运行的实例；删容器不一定等于删数据卷。\n- **Dockerfile 多阶段构建** → 第一阶段用 Go 编译二进制，第二阶段只保留运行所需文件，减小最终镜像。\n- **Compose 服务名** → API 连接数据库时使用 `db:5432`，不是容器内的 `localhost:5432`。\n- **volume** → 数据库文件存在持久化 volume 中，重启容器数据才不会因为容器的可写层丢失。\n- **健康检查与启动顺序** → `depends_on` 本身不总能保证数据库已经可连接；结合 healthcheck 和应用启动重试。\n- **配置与密钥** → `.env` 只用于本地开发；正式环境要把数据库密码交给安全配置机制，而不是写进 Dockerfile。\n\n#### `Dockerfile`（假设入口为 `./cmd/api`）\n\n```dockerfile\nFROM golang:1.27 AS build\nWORKDIR /src\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -o /out/api ./cmd/api\n\nFROM gcr.io/distroless/static-debian12:nonroot\nWORKDIR /\nCOPY --from=build /out/api /api\nEXPOSE 8080\nUSER nonroot:nonroot\nENTRYPOINT [\"/api\"]\n```\n\n如果项目不含外部依赖，`go.sum` 可能不存在，可调整 COPY 写法；本课程数据库驱动已加入后应正常生成 `go.sum`。另外请创建 `.dockerignore`，排除 `.git`、`.env`、本机可执行文件和临时数据。\n\n#### `compose.yaml`（本地学习示例）\n\n```yaml\nservices:\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: localpass\n      POSTGRES_DB: problems_dev\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U app -d problems_dev\"]\n      interval: 5s\n      retries: 12\n  api:\n    build: .\n    environment:\n      PORT: \"8080\"\n      DATABASE_URL: \"postgres://app:localpass@db:5432/problems_dev?sslmode=disable\"\n    ports:\n      - \"127.0.0.1:8080:8080\"\n    depends_on:\n      db:\n        condition: service_healthy\nvolumes:\n  pgdata:\n```\n\n**拆解**：Compose 示例中的密码仅用于**本地隔离的学习环境**。API 只绑定本机的 `127.0.0.1:8080`，不能视作已加 TLS 的公网部署。首次启动还需执行 `schema.sql` 或已设计好的数据库迁移，Compose 不会自动猜到要建哪些表。\n\n#### 练习与验收\n\n1. `docker compose up --build -d` 后请求 `/health`；日志用 `docker compose logs api` 检查。\n2. 初始化数据库后创建题目，执行 `docker compose restart`，再次查询数据。\n3. 删除并重建 API 容器，确认数据库 volume 仍保留数据；**不要**在有价值的数据上随意执行 `docker compose down -v`。\n\n**过关标准**：另一个人不需要手动安装 PostgreSQL，即可按 README 在本机启动并使用你的 API。\n\n---",
        "title": "把 API 和数据库一起启动",
        "summary": "用Compose固定运行环境，验证重启后数据保留。",
        "task": "为实际入口编写Dockerfile与Compose；添加.dockerignore、数据库健康检查和迁移说明；创建记录后重启验证。",
        "checks": [
          "docker compose up --build -d 后health可访问",
          "从空库能按说明初始化表",
          "重启API与数据库容器后记录仍在",
          "凭据只用于本地隔离演示，不提交真实.env"
        ],
        "hint": "容器内连接数据库用服务名db；入口可能是cmd/api或cmd/server，以你的代码为准。不要用down -v当普通重启。",
        "quiz": {
          "question": "API容器访问Compose里的db服务应该用什么地址？",
          "options": [
            "db:5432",
            "localhost:5432",
            "浏览器页面URL"
          ],
          "answer": 0,
          "explanation": "容器的localhost是它自己。Compose网络中其他服务通过服务名找到数据库。"
        }
      },
      {
        "id": "go-28",
        "day": 28,
        "minutes": 180,
        "stageId": "go-delivery",
        "concepts": [
          "CI（持续集成）",
          "工作流 YAML",
          "go.mod 决定 Go 工具链要求",
          "测试范围说明",
          "Git tag / Release"
        ],
        "starterCode": "# 完成交付前在独立项目运行，CI重复同样检查。\ngo vet ./...\ngo test ./...\ngo build ./...\n# 实际配置测试库后运行集成测试；不能把Skip计为通过。",
        "language": "text",
        "sourceMarkdown": "### Day 28｜GitHub Actions、发布与最后一次验收\n\n**今天为什么学**：完整项目不仅要能写，还要能被验证、复现、演示。CI 用一台干净的机器在每次代码提交时重复执行规定的检查。\n\n#### 知识点与任务的对应关系\n\n- **CI（持续集成）** → 推送代码或打开 PR 后自动运行构建、静态分析和测试。\n- **工作流 YAML** → `.github/workflows/ci.yml` 定义触发事件、运行环境、步骤。\n- **`go.mod` 决定 Go 工具链要求** → CI 使用 `go-version-file: go.mod`，避免随意和本地版本漂移。\n- **测试范围说明** → 无数据库的 CI 不能假装集成测试已通过；需要 PostgreSQL service 或专门测试工作流。\n- **Git tag / Release** → 标记一个经验证的版本，演示时能回溯代码状态。\n- **交付包** → README、接口清单、建表/迁移脚本、测试结果、已知限制和一套能演示的数据。\n\n#### 可用的基础工作流：`.github/workflows/ci.yml`\n\n```yaml\nname: Go CI\non:\n  push:\n  pull_request:\npermissions:\n  contents: read\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-go@v7\n        with:\n          go-version-file: go.mod\n          cache: true\n      - name: Check formatting\n        run: |\n          files=$(gofmt -l .)\n          test -z \"$files\" || { echo \"$files\"; exit 1; }\n      - run: go vet ./...\n      - run: go test ./...\n      - run: go build ./...\n```\n\n**拆解**：`actions/checkout` 取仓库代码；`setup-go` 根据 `go.mod` 准备工具链；`go test` 有失败会让 CI 变红。这个入门工作流只包含基础检查，使用真实数据库的集成测试需要再添加 PostgreSQL 测试服务和测试 DSN。\n\n#### 最后一次项目演示与验收\n\n1. **功能**：注册/登录、用户 A/B 数据隔离、Problem CRUD、筛选与分页。\n2. **错误处理**：非法 JSON、非法参数、401、404、数据库暂不可用、请求超时的响应可解释。\n3. **质量**：`go fmt`/`go vet`/单元测试/HTTP 测试通过；对外声明的数据库集成测试必须实际执行过。\n4. **运行**：从 README 开始，在新环境用 Compose 启动并保存数据；GitHub Actions 出现真实的绿色运行记录。\n5. **复盘**：写一页“我独立完成的部分、仍需 AI 提示的部分、当前没解决的风险、下一步学什么”。\n\n**过关标准**：你能在 10 分钟内从仓库讲明白请求流向、数据怎么持久化、错误在哪里处理、如何证明功能正确。做到这些，就真正从语言入门走进了后端开发。",
        "title": "交付并讲清整个后端",
        "summary": "让CI重复检查代码，用完整演示和复盘证明项目可以交接。",
        "task": "在独立Go项目中建立CI；实际跑基础与数据库测试；用Compose在新环境演示登录、隔离、CRUD与分页，记录限制。",
        "checks": [
          "CI有真实成功记录，数据库测试没有被Skip当成通过",
          "10分钟内讲清请求、存储、错误和测试",
          "新环境能按README启动并保留数据",
          "复盘写明独立完成、需AI提示和未解决部分"
        ],
        "hint": "CI按项目go.mod选择Go版本。资料仓库根目录没有Go模块，工作流必须先进入你的独立项目目录。",
        "quiz": {
          "question": "基础CI只有go test，没有数据库服务，应该怎样描述验证范围？",
          "options": [
            "所有数据库测试都已通过",
            "只声明实际运行的测试，补数据库服务再验证集成测试",
            "CI绿色就等于已公网部署"
          ],
          "answer": 1,
          "explanation": "CI结果需要对应实际执行内容。Skip和未配置测试库都不代表真实SQL已验证，更不代表完成公网部署。"
        }
      }
    ],
    "followups": []
  }
};
