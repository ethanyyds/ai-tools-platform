# AI Tools Platform

一个集成Dify AI应用的智能工具平台，采用前后端分离架构，支持多种类型的AI工具集成。

## 项目概述

本项目旨在创建一个可扩展的AI工具平台，当前已集成六顶思考帽创意生成工具，后续可以方便地添加更多AI工具，如文档总结、知识库问答等。

## 系统架构

```
AI Tools Platform
├── Backend (Python FastAPI)     # 后端API服务
│   ├── Dify API集成             # 与Dify平台的API集成
│   ├── 工具管理系统              # 可扩展的工具管理
│   └── RESTful API              # 标准化API接口
└── Frontend (React TypeScript)  # 前端用户界面
    ├── 创意生成器               # 六顶思考帽工具界面
    ├── 工具管理面板             # 工具列表和状态管理
    └── 响应式设计               # 支持桌面和移动端
```

## 功能特性

### ✨ 核心功能
- 🎯 **六顶思考帽创意生成器** - 基于德博诺思维方法的创意生成工具
- 🔧 **可扩展工具系统** - 支持工作流、对话、补全等多种工具类型
- 📊 **工具管理面板** - 实时监控工具状态和使用情况
- 🎨 **现代化UI** - 基于Ant Design的优雅界面设计

### 🛠 技术特性
- **前后端分离** - 独立开发和部署
- **RESTful API** - 标准化的API接口设计
- **异步处理** - 支持长时间运行的AI任务
- **错误处理** - 完善的错误处理和用户反馈
- **类型安全** - TypeScript提供完整的类型检查

## 快速开始

### 环境要求
- Python 3.8+
- Node.js 16+
- npm 或 yarn

### 1. 后端启动

```bash
cd backend

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入Dify API密钥等配置

# 启动服务
python run.py
```

后端服务将在 http://localhost:8000 启动

### 2. 前端启动

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 启动开发服务器
npm start
```

前端应用将在 http://localhost:3000 启动

### 3. 访问应用

打开浏览器访问 http://localhost:3000，即可使用AI工具平台。

## 项目结构

```
ai_tools/
├── backend/                    # 后端代码
│   ├── app/
│   │   ├── models/            # 数据模型
│   │   ├── services/          # 业务逻辑层
│   │   ├── api/              # API路由
│   │   └── main.py           # 主应用入口
│   ├── requirements.txt       # Python依赖
│   └── run.py                # 启动脚本
├── frontend/                  # 前端代码
│   ├── src/
│   │   ├── components/       # 通用组件
│   │   ├── pages/           # 页面组件
│   │   ├── services/        # API服务
│   │   └── types/          # 类型定义
│   ├── package.json         # 项目配置
│   └── public/             # 静态资源
└── README.md               # 项目文档
```

## API文档

启动后端服务后，访问 http://localhost:8000/docs 查看完整的API文档（Swagger UI）。

### 主要API接口

- `GET /api/tools/` - 获取所有工具
- `GET /api/tools/{tool_id}` - 获取特定工具信息
- `POST /api/tools/execute` - 执行工具
- `POST /api/tools/creativity/generate` - 创意生成专用接口

## 配置说明

### 后端环境变量
```bash
# Dify API配置
DIFY_API_BASE_URL=https://api.dify.ai/v1
DIFY_API_KEY=your_dify_api_key_here

# 创意生成工具配置
CREATIVITY_APP_ID=your_creativity_app_id
CREATIVITY_API_KEY=your_creativity_api_key

# 其他配置
DATABASE_URL=sqlite:///./ai_tools.db
ALLOWED_ORIGINS=http://localhost:3000
```

### 前端环境变量
```bash
REACT_APP_API_URL=http://localhost:8000
```

## 工具扩展指南

### 添加新的AI工具

1. **后端扩展**：
   - 在 `backend/app/services/tool_service.py` 中添加工具配置
   - 根据需要在 `backend/app/api/tools.py` 中添加专用API端点

2. **前端扩展**：
   - 在 `frontend/src/pages/` 创建新工具页面
   - 在 `frontend/src/types/` 添加类型定义
   - 更新导航菜单和路由配置

### 支持的工具类型

- **Workflow（工作流）**：一次性执行的任务，如文档生成、数据分析
- **Chat（对话）**：支持多轮对话的聊天工具，具有上下文记忆
- **Completion（补全）**：文本补全工具，如代码生成、文案优化

## 部署指南

### Docker部署（推荐）

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d
```

### 传统部署

1. **后端部署**：
   - 使用gunicorn或uvicorn部署FastAPI应用
   - 配置nginx反向代理

2. **前端部署**：
   - 执行 `npm run build` 构建生产版本
   - 将build目录部署到静态服务器

## 贡献指南

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

如果你觉得这个项目有用，请给它一个⭐️！

如有问题或建议，请创建Issue或直接联系项目维护者。