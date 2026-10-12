/* 新增教学补充：原教材保留不动，预览底板只提供HTML结构。 */
(() => {
  const illustration = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="480" viewBox="0 0 960 480"><rect width="960" height="480" fill="#e9f1eb"/><circle cx="730" cy="120" r="72" fill="#d5b967"/><path d="M0 390 245 140 450 335 610 200 960 480H0Z" fill="#96b39f"/><path d="M0 470 280 280 570 480H0Z" fill="#607e6c"/></svg>'
  );
  const image = (alt, width = 960) => `<img src="${illustration}" alt="${alt}" width="${width}" height="${width / 2}">`;
  const card = (title, index, withImage = false) => `<article class="card" id="activity-${index}">${withImage ? image('活动示意图：青绿色山丘和太阳') : ''}<div class="card-content"><h3>${title}</h3><p>周六下午，一起练习并交流遇到的问题。</p><a href="#activity-${index}">查看活动介绍</a></div></article>`;

  window.LEARNING_ADAPTATIONS = {
    goBeginner02: {
      title: '用循环和判断完成三个小练习',
      summary: '不需要C++基础：先求总和，再判断分数，最后让函数返回几个结果。',
      task: '在第1课的练习模块中完成三件事：① SumTo(n)计算1到n的总和，n=5得到15，n=0得到0，负数报告输入无效。② Passed(score)判断是否达到60分，59得到false，60得到true；小于0或大于100报告输入无效。③ Stats(scores)返回总分和平均分，[60,80,100]得到240和80，[60,61]得到121和60.5；空列表或非法分数报告输入无效。先自己写下预期，再运行核对。',
      checks: [
        '三个练习都核对了指定输入输出；0、负数、59/60分、空列表与非法分数有实际结果记录',
        '能用for累加、用if判断，能写返回总分与平均分等多个值的函数',
        '能解释函数中的:=、变量作用域，以及为什么算平均分时要用float64显式转换'
      ],
      hint: '先只做SumTo：total存总和，循环里每次加一个数。再写Passed的if。Stats先累加，除法前检查列表不为空，再用float64(total)/float64(len(scores))计算平均值。bool是true或false；函数可以用逗号返回两个结果。遇到新词先查这一课讲义，或在提问台要求只解释一个词。',
      starterCode: `package main

import "fmt"

func main() {
    // 小示例：先预测1+2+3，再运行；它不是三个练习的完整答案。
    n := 3
    total := 0
    for i := 1; i <= n; i++ {
        total += i
    }
    fmt.Println("总和：", total)

    average, valid := mean(total, n)
    if valid {
        fmt.Println("平均值：", average)
    } else {
        fmt.Println("数量必须大于0")
    }
    // 接着自己实现SumTo、Passed和Stats，按任务逐项验证。
}

// 演示多返回值；valid为false时，不把average当作有效结果。
func mean(total, count int) (float64, bool) {
    if count <= 0 {
        return 0, false
    }
    return float64(total) / float64(count), true
}`,
      language: 'go'
    },
    webPreviews: {
      'web-03': '<main><h1>算法社团</h1><section><h2>关于我们</h2><p>每周写一点代码，再交流各自的做法。</p></section><section><h2>近期活动</h2><p class="highlight">本周六：基础图论交流。</p><p>这段普通文字不使用highlight类，可以比较两段文字的变化。</p></section></main>',
      'web-04': '<article class="card"><h3>周六算法训练</h3><p><time datetime="2026-10-17">10月17日，14:00</time></p><p>带上自己的电脑，一起完成一道小题并交流解法。</p><a href="#details">活动介绍</a></article><section id="details"><h2>活动说明</h2><p>观察卡片宽度与内外间距的变化。</p></section>',
      'web-05': '<header class="topbar"><h1>算法社团</h1><nav aria-label="页面导航"><a href="#about">关于我们</a><a href="#events">近期活动</a><a href="#contact">联系我们</a></nav></header><main><section id="about"><h2>关于我们</h2><p>每周一次训练，一起读题、写代码和复盘。</p></section><section id="events"><h2>近期活动</h2><p>周六：基础图论交流。</p></section><section id="contact"><h2>联系我们</h2><p>欢迎在活动现场交流。</p></section></main>',
      'web-06': `<section class="cards" aria-label="近期活动">${card('算法训练', 1, true)}${card('读题交流', 2, true)}${card('代码复盘', 3, true)}</section>`,
      'web-08': `<section class="cards" aria-label="活动网格">${card('基础图论', 1)}${card('动态规划', 2)}${card('双指针练习', 3)}${card('二分查找', 4)}${card('一起分析ThisIsAnUnusuallyLongActivityTitleWithoutSpaces', 5)}</section>`,
      'web-09': `<main class="container"><section class="intro"><div><h1>一起把题目做出来</h1><p>先读清楚输入和输出，画一张小图，再写出自己想到的做法。</p><p>每周六下午有开放训练。新手可以先做一道简单题，带着结果和卡住的位置来交流。</p></div><aside>${image('社团活动示意图：山丘与太阳')}<p>活动时间：周六14:00</p></aside></section></main>`,
      'web-10': '<main class="container"><h1>周六一起写点代码</h1><p>带上你正在练习的小题，不需要一次把所有功能写完。把一个具体问题说清楚，就可以开始讨论。</p><p class="muted">本周六14:00 · 机房开放训练</p><section><h2>先做哪件事</h2><p>先读题，再写出一版自己的代码。遇到不确定的输出，手算一组小输入，然后运行核对。</p><p>长段落可以帮助你观察正文的行长和行高。缩窄预览区域后，检查文字是否仍然容易阅读。</p></section></main>',
      'web-11': `<main class="flex-main"><article><h1 class="long-title">社团活动公告：ThisIsAVeryLongTitleWithoutSpacesThatNeedsToWrapOnSmallScreens</h1><p>拖窄预览区域，检查这段长标题、导航和右侧图片有没有把页面撑宽。</p><nav aria-label="活动导航"><a href="#training">本周训练安排</a> <a href="#discussion">读题与解法交流</a> <a href="#review">代码问题复盘</a></nav><section id="training"><h2>训练安排</h2><p>周六14:00开始。</p></section><section id="discussion"><h2>解法交流</h2><p>试着解释自己的做法。</p></section><section id="review"><h2>代码复盘</h2><p>记录一个问题和验证结果。</p></section></article><aside>${image('活动预览插图：山丘与太阳', 1280)}<p>这张图有较大的原始宽度，请观察它怎样适应父容器。</p></aside></main>`
    }
  };
})();
