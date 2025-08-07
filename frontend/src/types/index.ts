export enum ToolType {
  WORKFLOW = 'workflow',
  CHAT = 'chat',
  COMPLETION = 'completion'
}

export enum ToolStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft'
}

export interface DifyTool {
  id: string;
  name: string;
  description: string;
  tool_type: ToolType;
  status: ToolStatus;
  dify_app_id: string;
  dify_api_key: string;
  config: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ToolExecuteRequest {
  tool_id: string;
  inputs: Record<string, any>;
  response_mode?: string;
  conversation_id?: string;
}

export interface ToolExecuteResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  tool_type: ToolType;
}

export interface CreativityRequest {
  topic: string;
  context?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}