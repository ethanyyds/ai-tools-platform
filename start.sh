#!/bin/bash

# AI Tools Platform 启动脚本

echo "🚀 启动 AI Tools Platform..."

# 检查Python版本
python_version=$(python3 --version 2>&1)
if [[ $? -ne 0 ]]; then
    echo "❌ 错误: 未找到Python3，请先安装Python 3.8+"
    exit 1
fi
echo "✅ Python版本: $python_version"

# 检查Node.js版本
node_version=$(node --version 2>&1)
if [[ $? -ne 0 ]]; then
    echo "❌ 错误: 未找到Node.js，请先安装Node.js 16+"
    exit 1
fi
echo "✅ Node.js版本: $node_version"

# 创建环境变量文件（如果不存在）
if [ ! -f backend/.env ]; then
    echo "📝 创建后端环境变量文件..."
    cat > backend/.env << EOF
# Dify API Configuration
DIFY_API_BASE_URL=https://api.dify.ai/v1
DIFY_API_KEY=your_dify_api_key_here

# Creativity Tool Configuration
CREATIVITY_APP_ID=your_creativity_app_id
CREATIVITY_API_KEY=your_creativity_api_key

# Database
DATABASE_URL=sqlite:///./ai_tools.db

# Security
SECRET_KEY=your_secret_key_here_$(date +%s)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF
    echo "⚠️  请编辑 backend/.env 文件，填入正确的Dify API配置"
fi

if [ ! -f frontend/.env ]; then
    echo "📝 创建前端环境变量文件..."
    cat > frontend/.env << EOF
# API配置
REACT_APP_API_URL=http://localhost:8000

# 应用配置
REACT_APP_NAME=AI Tools Platform
REACT_APP_VERSION=1.0.0
EOF
fi

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
if [ ! -d "venv" ]; then
    echo "创建Python虚拟环境..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# 启动后端服务
echo "🔧 启动后端服务..."
python run.py &
BACKEND_PID=$!

cd ..

# 安装前端依赖
echo "📦 安装前端依赖..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

# 启动前端服务
echo "🎨 启动前端服务..."
npm start &
FRONTEND_PID=$!

cd ..

echo "✅ 服务启动完成!"
echo "📱 前端地址: http://localhost:3000"
echo "🔗 后端API: http://localhost:8000"
echo "📚 API文档: http://localhost:8000/docs"
echo ""
echo "按 Ctrl+C 停止服务"

# 等待用户中断
trap "echo '🛑 正在停止服务...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait