# AI Tools Platform Frontend

基于React + TypeScript + Ant Design的AI工具平台前端应用。

## 功能特性

- 🎨 现代化UI设计，基于Ant Design组件库
- 🚀 React 18 + TypeScript + React Router v6
- 🔧 可扩展的工具管理系统
- 🎯 六顶思考帽创意生成工具
- 📱 响应式设计，支持移动端

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

### 3. 启动开发服务器

```bash
npm start
```

应用将在 http://localhost:3000 启动

### 4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
frontend/
├── public/             # 静态资源
├── src/
│   ├── components/     # 通用组件
│   ├── pages/         # 页面组件
│   ├── services/      # API服务
│   ├── types/         # TypeScript类型定义
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 主应用组件
│   └── index.tsx      # 应用入口
├── package.json       # 项目配置
└── tsconfig.json     # TypeScript配置
```

## 主要功能

### 创意生成器
- 基于六顶思考帽方法论的创意生成工具
- 支持主题输入和背景描述
- 实时生成结果展示

### 工具管理
- 工具列表展示和管理
- 支持不同类型工具（工作流、对话、补全）
- 工具状态监控

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **UI库**: Ant Design 5.x
- **路由**: React Router v6
- **HTTP客户端**: Axios
- **样式**: CSS + Styled Components

## 扩展开发

### 添加新工具页面

1. 在 `src/pages/` 创建新页面组件
2. 在 `src/types/` 添加相关类型定义
3. 在 `src/services/api.ts` 添加API接口
4. 在 `App.tsx` 添加路由配置
5. 在 `Layout.tsx` 添加导航菜单

### 自定义主题

修改 `src/App.css` 中的CSS变量或使用Ant Design的主题定制功能。

## API接口

所有API接口通过 `src/services/api.ts` 统一管理：

- `getTools()` - 获取工具列表
- `executeTool()` - 执行工具
- `generateCreativity()` - 生成创意

## 环境变量

- `REACT_APP_API_URL` - 后端API地址
- `REACT_APP_NAME` - 应用名称
- `REACT_APP_VERSION` - 应用版本