# AI 辅助学习内容的设计依据

本页对应 `assets/data/ai-guide.js`。它提供可复制的提示模板，不调用模型，也不需要网站账户或 API key。复制后可以粘贴到自己使用的 AI 工具中；这些外部工具的账户、费用和数据规则由各自服务决定。

内容按一个小练习组织：先自己写，卡住时分级求提示，把建议放到本机验证，再合上答案复写。模板覆盖布局、Go 参数检查、概念解释、错误定位、代码审查、测理解和项目拆解。每个模板都给出后续动作，让学习者知道下一步在哪里做。

## 已查的一手资料

以下页面与论文均于 2026-10-12 实际打开核对。

| 来源 | 采用的内容 | 设计中的用法 |
| --- | --- | --- |
| [OpenAI Prompting](https://learn.chatgpt.com/docs/prompting) 与 [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | 明确任务，提供相关背景，说明输出与边界。回答需要按目标检查。 | 把环境、预期、已尝试、代码、报错和所需帮助写成占位项。一次只要一个检查点。 |
| [GitHub Copilot Chat 官方说明](https://docs.github.com/en/copilot/responsible-use/chat) | 生成的代码、解释和测试可能不准确或不完整；需要人工审查与测试。 | 要求复现、最小修改和真实验证。提示中明确不能声称运行过未运行的测试。 |
| [Karpicke & Blunt, 2011, Science](https://learninglab.psych.purdue.edu/downloads/2011/2011_Karpicke_Blunt_Science.pdf), DOI: 10.1126/science.1199327 | 科学文本学习实验中，检索练习在延迟测验上优于实验中的概念图学习条件，测验包含推断题。 | 安排合上资料再回答、复写关键代码和做变式。 |
| [Butler, Karpicke & Roediger, 2008, Journal of Experimental Psychology: Learning, Memory, and Cognition](https://learninglab.psych.purdue.edu/downloads/2008/2008_Butler_Karpicke_Roediger_JEPLMC.pdf), DOI: 10.1037/0278-7393.34.4.918 | 常识测验实验中，作答后的反馈改善保持；答对但没把握的回答也可能受益。 | 小测先回答再看反馈，记录猜测和不确定之处，再核对。 |

## 这些资料不能证明什么

两篇学习研究没有直接测试本网站、AI 编程辅导或 Web/Go 项目学习。代码复写、分级提示、变式练习和隔天回看是据此做的教学安排，效果需要靠学习者能否独立完成练习来判断。页面不写提高多少效率，也不把“复制提示”或“看懂回答”记作课程完成。

AI 代码审查只是补充意见。验收仍用练习要求、官方文档和实际运行结果；测试也需要检查预期结果是否正确。模板保留敏感信息脱敏提醒，但不让初学者为一个小练习先配置一套复杂工具。

文案用具体动作说明学习方法，例如发送哪段代码、重复哪个请求、核对什么结果。页面避免没有证据的效率承诺，保留能执行的下一步和必要限制。
