# AI Tools Platform Backend

基于FastAPI的AI工具平台后端服务，集成Dify AI应用。

## 功能特性

- 🚀 FastAPI框架，高性能异步API
- 🔧 可扩展的工具管理系统
- 🤖 Dify AI应用集成
- 📝 完整的API文档（Swagger UI）
- 🎯 六顶思考帽创意生成工具

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 环境配置

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

配置以下环境变量：
- `DIFY_API_KEY`: Dify API密钥
- `CREATIVITY_APP_ID`: 创意生成应用ID
- `CREATIVITY_API_KEY`: 创意生成应用API密钥

### 3. 启动服务

```bash
python run.py
```

服务将在 http://localhost:8000 启动

### 4. API文档

访问 http://localhost:8000/docs 查看Swagger UI文档

## API接口

### 工具管理
- `GET /api/tools/` - 获取所有工具
- `GET /api/tools/{tool_id}` - 获取特定工具
- `POST /api/tools/execute` - 执行工具

### 创意生成
- `POST /api/tools/creativity/generate` - 生成创意方案

## 工具类型

### Workflow（工作流）
一次性执行的工作流工具，如创意生成、文档总结等。

### Chat（对话）
支持多轮对话的聊天工具，具有上下文记忆。

### Completion（补全）
文本补全工具，用于代码生成、文案优化等。

## 扩展新工具

1. 在 `tool_service.py` 中添加工具配置
2. 配置相应的环境变量
3. 重启服务即可使用

## 项目结构

```
backend/
├── app/
│   ├── models/          # 数据模型
│   ├── services/        # 业务逻辑
│   ├── api/            # API路由
│   └── main.py         # 主应用
├── requirements.txt    # 依赖包
└── run.py             # 启动脚本
```