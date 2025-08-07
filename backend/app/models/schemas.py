from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from enum import Enum

class ToolType(str, Enum):
    WORKFLOW = "workflow"  # 一次性工作流
    CHAT = "chat"         # 会话式对话
    COMPLETION = "completion"  # 文本补全

class ToolStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    DRAFT = "draft"

class DifyTool(BaseModel):
    id: str
    name: str
    description: str
    tool_type: ToolType
    status: ToolStatus
    dify_app_id: str
    dify_api_key: str
    config: Dict[str, Any] = Field(default_factory=dict)
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class WorkflowRequest(BaseModel):
    inputs: Dict[str, Any]
    response_mode: str = "blocking"  # blocking or streaming
    user: str = "user"

class WorkflowResponse(BaseModel):
    workflow_run_id: str
    task_id: str
    data: Dict[str, Any]
    
class ChatRequest(BaseModel):
    query: str
    inputs: Dict[str, Any] = Field(default_factory=dict)
    response_mode: str = "blocking"
    conversation_id: Optional[str] = None
    user: str = "user"

class ChatResponse(BaseModel):
    message_id: str
    conversation_id: str
    answer: str
    created_at: int

class ToolExecuteRequest(BaseModel):
    tool_id: str
    inputs: Dict[str, Any]
    response_mode: str = "blocking"
    conversation_id: Optional[str] = None  # 仅对chat类型工具有效

class ToolExecuteResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    tool_type: ToolType