# 配置指南

## 环境变量配置

### 后端配置 (backend/.env)

```bash
# Dify API配置 - 必须配置
DIFY_API_BASE_URL=https://api.dify.ai/v1    # Dify API基础URL
DIFY_API_KEY=your_dify_api_key_here         # Dify平台API密钥

# 创意生成工具配置 - 必须配置
CREATIVITY_APP_ID=your_creativity_app_id     # 创意生成应用的ID
CREATIVITY_API_KEY=your_creativity_api_key   # 创意生成应用的API密钥

# 数据库配置 - 可选
DATABASE_URL=sqlite:///./ai_tools.db         # 数据库连接URL

# 安全配置 - 可选
SECRET_KEY=your_secret_key_here              # JWT签名密钥
ALGORITHM=HS256                              # 加密算法
ACCESS_TOKEN_EXPIRE_MINUTES=30               # Token过期时间

# CORS配置 - 可选
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000  # 允许的跨域源
```

### 前端配置 (frontend/.env)

```bash
# API配置
REACT_APP_API_URL=http://localhost:8000      # 后端API地址

# 应用配置
REACT_APP_NAME=AI Tools Platform            # 应用名称
REACT_APP_VERSION=1.0.0                     # 应用版本
```

## Dify应用配置步骤

### 1. 获取Dify API密钥

1. 登录Dify平台 (https://cloud.dify.ai)
2. 进入"设置" → "API密钥"
3. 创建新的API密钥
4. 将密钥配置到 `DIFY_API_KEY`

### 2. 配置创意生成应用

1. 在Dify平台创建或导入六顶思考帽workflow应用
2. 获取应用ID（在应用详情页可以看到）
3. 创建应用专用的API密钥
4. 将应用ID配置到 `CREATIVITY_APP_ID`
5. 将应用API密钥配置到 `CREATIVITY_API_KEY`

### 3. 应用输入输出配置

确保你的Dify workflow应用具有以下输入字段：
- `topic` (必需): 要分析的主题
- `context` (可选): 背景描述

## 工具扩展配置

### 添加新工具的步骤

1. **后端配置**:
   - 在 `backend/app/services/tool_service.py` 的 `_load_default_tools()` 方法中添加工具配置
   - 添加相应的环境变量

2. **环境变量**:
   ```bash
   # 新工具配置示例
   NEW_TOOL_APP_ID=your_new_tool_app_id
   NEW_TOOL_API_KEY=your_new_tool_api_key
   ```

3. **工具配置示例**:
   ```python
   new_tool = DifyTool(
       id="new_tool_id",
       name="新工具名称",
       description="工具描述",
       tool_type=ToolType.WORKFLOW,  # 或 CHAT, COMPLETION
       status=ToolStatus.ACTIVE,
       dify_app_id=os.getenv("NEW_TOOL_APP_ID", ""),
       dify_api_key=os.getenv("NEW_TOOL_API_KEY", ""),
       config={
           "input_fields": ["field1", "field2"],
           "output_format": "structured",
           "max_tokens": 1000
       }
   )
   ```

## 部署配置

### 开发环境

使用提供的启动脚本：
```bash
./start.sh
```

### Docker部署

1. 创建 `.env` 文件配置环境变量
2. 启动服务：
```bash
docker-compose up -d
```

### 生产环境

1. **后端部署**:
   - 使用gunicorn: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000`
   - 配置nginx反向代理
   - 使用PostgreSQL替代SQLite

2. **前端部署**:
   ```bash
   npm run build
   # 将build目录部署到nginx或其他静态服务器
   ```

## 安全配置

### 生产环境安全建议

1. **环境变量安全**:
   - 使用强密码生成器生成 `SECRET_KEY`
   - 不要在代码中硬编码敏感信息
   - 使用环境变量或密钥管理服务

2. **API安全**:
   - 配置适当的CORS策略
   - 启用HTTPS
   - 实施API频率限制

3. **数据安全**:
   - 定期备份数据库
   - 加密敏感数据
   - 实施访问控制

## 故障排除

### 常见问题

1. **Dify API连接失败**:
   - 检查API密钥是否正确
   - 确认网络连接正常
   - 验证Dify应用状态

2. **前后端通信失败**:
   - 检查CORS配置
   - 确认API URL配置正确
   - 验证端口是否被占用

3. **工具执行失败**:
   - 检查工具配置是否完整
   - 验证输入参数格式
   - 查看后端日志获取详细错误信息

### 日志查看

- 后端日志: 直接在终端查看或检查Docker容器日志
- 前端日志: 浏览器开发者工具的控制台
- Dify日志: Dify平台的应用执行日志

### 健康检查

- 后端健康检查: `curl http://localhost:8000/health`
- API文档: `http://localhost:8000/docs`
- 前端访问: `http://localhost:3000`