from typing import Dict, List, Optional
from ..models.schemas import (
    DifyTool, ToolType, ToolStatus, 
    ToolExecuteRequest, ToolExecuteResponse,
    WorkflowRequest, ChatRequest
)
from .dify_service import dify_service
import json
import os

class ToolService:
    def __init__(self):
        # 初始化内置工具配置（后续可扩展到数据库）
        self.tools = self._load_default_tools()
    
    def _load_default_tools(self) -> Dict[str, DifyTool]:
        """加载默认工具配置"""
        # 创意生成工具配置
        creativity_tool = DifyTool(
            id="creativity_generator",
            name="六顶思考帽创意生成器",
            description="使用六顶思考帽方法论生成创意和解决方案",
            tool_type=ToolType.WORKFLOW,
            status=ToolStatus.ACTIVE,
            dify_app_id=os.getenv("CREATIVITY_APP_ID", ""),
            dify_api_key=os.getenv("CREATIVITY_API_KEY", ""),
            config={
                "input_fields": ["topic", "context"],
                "output_format": "structured_analysis",
                "max_tokens": 2000
            }
        )
        
        return {
            "creativity_generator": creativity_tool
        }
    
    def get_tool(self, tool_id: str) -> Optional[DifyTool]:
        """获取工具配置"""
        return self.tools.get(tool_id)
    
    def get_all_tools(self) -> List[DifyTool]:
        """获取所有工具"""
        return list(self.tools.values())
    
    def get_tools_by_type(self, tool_type: ToolType) -> List[DifyTool]:
        """按类型获取工具"""
        return [tool for tool in self.tools.values() if tool.tool_type == tool_type]
    
    async def execute_tool(self, request: ToolExecuteRequest) -> ToolExecuteResponse:
        """执行工具"""
        tool = self.get_tool(request.tool_id)
        if not tool:
            return ToolExecuteResponse(
                success=False,
                error=f"Tool {request.tool_id} not found",
                tool_type=ToolType.WORKFLOW
            )
        
        if tool.status != ToolStatus.ACTIVE:
            return ToolExecuteResponse(
                success=False,
                error=f"Tool {request.tool_id} is not active",
                tool_type=tool.tool_type
            )
        
        try:
            if tool.tool_type == ToolType.WORKFLOW:
                return await self._execute_workflow_tool(tool, request)
            elif tool.tool_type == ToolType.CHAT:
                return await self._execute_chat_tool(tool, request)
            else:
                return ToolExecuteResponse(
                    success=False,
                    error=f"Unsupported tool type: {tool.tool_type}",
                    tool_type=tool.tool_type
                )
        except Exception as e:
            return ToolExecuteResponse(
                success=False,
                error=str(e),
                tool_type=tool.tool_type
            )
    
    async def _execute_workflow_tool(self, tool: DifyTool, request: ToolExecuteRequest) -> ToolExecuteResponse:
        """执行工作流工具"""
        workflow_request = WorkflowRequest(
            inputs=request.inputs,
            response_mode=request.response_mode
        )
        
        result = await dify_service.execute_workflow(
            app_id=tool.dify_app_id,
            api_key=tool.dify_api_key,
            request=workflow_request
        )
        
        return ToolExecuteResponse(
            success=True,
            data=result.dict(),
            tool_type=tool.tool_type
        )
    
    async def _execute_chat_tool(self, tool: DifyTool, request: ToolExecuteRequest) -> ToolExecuteResponse:
        """执行聊天工具"""
        # 从inputs中提取query
        query = request.inputs.get("query", "")
        if not query:
            return ToolExecuteResponse(
                success=False,
                error="Query is required for chat tools",
                tool_type=tool.tool_type
            )
        
        chat_request = ChatRequest(
            query=query,
            inputs={k: v for k, v in request.inputs.items() if k != "query"},
            response_mode=request.response_mode,
            conversation_id=request.conversation_id
        )
        
        result = await dify_service.send_chat_message(
            app_id=tool.dify_app_id,
            api_key=tool.dify_api_key,
            request=chat_request
        )
        
        return ToolExecuteResponse(
            success=True,
            data=result.dict(),
            tool_type=tool.tool_type
        )
    
    def add_tool(self, tool: DifyTool) -> bool:
        """添加新工具"""
        if tool.id in self.tools:
            return False
        
        self.tools[tool.id] = tool
        return True
    
    def update_tool(self, tool_id: str, updates: Dict[str, any]) -> bool:
        """更新工具配置"""
        if tool_id not in self.tools:
            return False
        
        tool = self.tools[tool_id]
        for key, value in updates.items():
            if hasattr(tool, key):
                setattr(tool, key, value)
        
        return True
    
    def remove_tool(self, tool_id: str) -> bool:
        """移除工具"""
        if tool_id not in self.tools:
            return False
        
        del self.tools[tool_id]
        return True

# 全局实例
tool_service = ToolService()