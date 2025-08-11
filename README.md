# AI Tools Demo (Minimal)

一个尽可能精简、开箱即用的最小Demo，用于逐步学习与扩展：

- 后端：单文件 FastAPI (`backend/app/main.py`)，提供健康检查与一个模拟的创意生成接口
- 前端：单个静态HTML (`frontend/public/index.html`)，用原生 `fetch` 调用后端接口

## 快速开始

### 1) 启动后端

```bash
cd backend
pip install -r requirements.txt
python run.py
```

后端将运行在: http://localhost:8000

接口：
- `GET /health` 健康检查
- `POST /api/creativity/demo` 输入 `{ topic, context }`，返回模拟创意结果

### 2) 打开前端

直接用浏览器打开本地文件：`frontend/public/index.html`

点击“生成创意”按钮，即可看到后端返回的模拟结构（六顶思考帽简要输出）。

## 逐步扩展建议

1. 将后端 `/api/creativity/demo` 替换为真实的 Dify API 调用
2. 增加错误处理、参数校验
3. 将静态HTML替换为简单的React或Vue（可选）
4. 增加更多工具的最小端点，保持一步一步增加复杂度

保持简单、小步快跑，你随时可以请求我继续把某一步落地为代码。