# HTTP 基础：先验证契约，再增加路由

这是完整可运行的标准库参考例子，已经实现 `/health`、`/add` 与 HTTP 测试。`/multiply`、统一的错误方法 JSON 与优雅退出还没有实现，留作练习。没有数据库、账号与 CRUD 服务。

对应网站：`#/exercise/go-health`，对应 Go 第 7 / 9 / 16 课。

## 启动

需要 Go 1.22 或更高版本，因为使用带方法的 ServeMux 路由。目录已有独立 go.mod，无第三方依赖。

从仓库根目录执行：

```powershell
cd exercises/go/http-basics
go test ./...
go vet ./...
go run .
```

另开终端请求。Ctrl+C 停止服务器：

```powershell
curl.exe http://127.0.0.1:8752/health
curl.exe "http://127.0.0.1:8752/add?a=2&b=3"
curl.exe -i "http://127.0.0.1:8752/add?a=x&b=3"
curl.exe -i -X POST http://127.0.0.1:8752/add
```

## 契约与验证

| 请求 | 预期 |
| --- | --- |
| GET /health | 200，JSON `{"status":"ok"}` |
| GET /add?a=2&b=3 | 200，JSON `{"sum":5}` |
| GET /add?a=-1.5&b=2 | 200，JSON `{"sum":0.5}` |
| 缺参数、空值、非数字、NaN、Inf、重复 a/b | 400，含 error 的 JSON |
| 两个有限值相加溢出 | 400，含 error 的 JSON |
| POST /add | 405，标准库默认文本响应和 Allow header |

Go 的 GET 路由也匹配 HEAD；真实 HTTP 服务会按 HEAD 语义省略响应 Body。`go test ./...` 不需要自己启动服务器：测试通过 httptest 直接调用 Handler，检查状态、Content-Type、JSON 字段与错误方法；另有临时本机端口的真实 HTTP 往返检查，结束后自动关闭。

## 独立练习

1. 解释 Header、WriteHeader 与 JSON 编码的顺序。
2. 新增 `/multiply?a=...&b=...`，先写缺参数、非数字、负数与溢出用例。
3. 给错误方法设计统一 JSON，但保留 405 与 Allow 的语义。

加练：实现可取消的优雅退出，在受支持的环境用 `go test -race ./...` 验证；不要只凭一次运行声称并发安全。

## 已知限制

使用 float64，包含常见浮点误差，不是精确金额计算器。只监听本机 127.0.0.1:8752；端口已占用时启动会失败。没有 CORS、认证、限流、数据库或完整生产配置，不是部署模板。未匹配路由与错误方法保留标准库默认文本行为。
