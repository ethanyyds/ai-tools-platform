import axios from 'axios';
import { DifyTool, ToolExecuteRequest, ToolExecuteResponse, CreativityRequest, ToolType } from '../types';

// 配置axios实例
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export class ApiService {
  // 获取所有工具
  static async getTools(): Promise<DifyTool[]> {
    const response = await api.get('/api/tools/');
    return response.data;
  }

  // 获取特定工具
  static async getTool(toolId: string): Promise<DifyTool> {
    const response = await api.get(`/api/tools/${toolId}`);
    return response.data;
  }

  // 按类型获取工具
  static async getToolsByType(toolType: ToolType): Promise<DifyTool[]> {
    const response = await api.get(`/api/tools/type/${toolType}`);
    return response.data;
  }

  // 执行工具
  static async executeTool(request: ToolExecuteRequest): Promise<ToolExecuteResponse> {
    const response = await api.post('/api/tools/execute', request);
    return response.data;
  }

  // 创意生成专用接口
  static async generateCreativity(request: CreativityRequest): Promise<ToolExecuteResponse> {
    const response = await api.post('/api/tools/creativity/generate', null, {
      params: request
    });
    return response.data;
  }

  // 健康检查
  static async healthCheck(): Promise<{ status: string }> {
    const response = await api.get('/health');
    return response.data;
  }
}

export default ApiService;