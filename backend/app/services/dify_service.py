import httpx
import json
from typing import Dict, Any, Optional
from ..models.schemas import WorkflowRequest, WorkflowResponse, ChatRequest, ChatResponse, ToolType
import os
from dotenv import load_dotenv

load_dotenv()

class DifyService:
    def __init__(self):
        self.base_url = os.getenv("DIFY_API_BASE_URL", "https://api.dify.ai/v1")
        self.default_api_key = os.getenv("DIFY_API_KEY", "")
    
    async def execute_workflow(
        self, 
        app_id: str, 
        api_key: str, 
        request: WorkflowRequest
    ) -> WorkflowResponse:
        """执行Dify工作流"""
        url = f"{self.base_url}/workflows/run"
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": request.inputs,
            "response_mode": request.response_mode,
            "user": request.user
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            
            data = response.json()
            return WorkflowResponse(
                workflow_run_id=data.get("workflow_run_id", ""),
                task_id=data.get("task_id", ""),
                data=data.get("data", {})
            )
    
    async def send_chat_message(
        self, 
        app_id: str, 
        api_key: str, 
        request: ChatRequest
    ) -> ChatResponse:
        """发送聊天消息"""
        url = f"{self.base_url}/chat-messages"
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": request.inputs,
            "query": request.query,
            "response_mode": request.response_mode,
            "user": request.user
        }
        
        if request.conversation_id:
            payload["conversation_id"] = request.conversation_id
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            
            data = response.json()
            return ChatResponse(
                message_id=data.get("message_id", ""),
                conversation_id=data.get("conversation_id", ""),
                answer=data.get("answer", ""),
                created_at=data.get("created_at", 0)
            )
    
    async def get_conversation_messages(
        self, 
        app_id: str, 
        api_key: str, 
        conversation_id: str,
        first_id: Optional[str] = None,
        limit: int = 20
    ) -> Dict[str, Any]:
        """获取会话消息历史"""
        url = f"{self.base_url}/messages"
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        params = {
            "conversation_id": conversation_id,
            "limit": limit
        }
        
        if first_id:
            params["first_id"] = first_id
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            return response.json()

# 全局实例
dify_service = DifyService()