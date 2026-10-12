# Go 小练习

按教材的 Day 01–28 或 G01、H01 等练习编号创建目录。每个独立程序在自己的目录内创建 Go 模块，保存源代码、必要测试和运行说明。

课程任务见 [Go 完整清单](../../materials/go/完整学习清单.md)。后续 HTTP、SQL 等练习可以逐步汇入 `projects/go/problem-tracker`。

现有参考例子都具有独立 go.mod，不要在资料仓库根目录初始化模块：

- [词频统计](wordfreq/README.md)：map 计数、slice 排序、并列次序与表驱动测试；TopN 留作练习。
- [HTTP 基础](http-basics/README.md)：标准库 /health、/add 与 httptest；/multiply 和更多响应规则留作练习。

在相应目录运行 `go run .`、`go test ./...` 与 `go vet ./...`。启动条件、实际功能和限制见各目录 README。网站的“练习工坊”另有 JSON、CRUD、SQL、用户归属和 context 任务，需要自己的已有项目或测试数据库。参考例子通过不代表自己的学习任务已经验收。
