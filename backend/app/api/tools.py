from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models.schemas import (
    DifyTool, ToolExecuteRequest, ToolExecuteResponse, ToolType
)
from ..services.tool_service import tool_service

router = APIRouter(prefix="/api/tools", tags=["tools"])

@router.get("/", response_model=List[DifyTool])
async def get_tools():
    """获取所有可用工具"""
    return tool_service.get_all_tools()

@router.get("/{tool_id}", response_model=DifyTool)
async def get_tool(tool_id: str):
    """获取特定工具信息"""
    tool = tool_service.get_tool(tool_id)
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool

@router.get("/type/{tool_type}", response_model=List[DifyTool])
async def get_tools_by_type(tool_type: ToolType):
    """按类型获取工具"""
    return tool_service.get_tools_by_type(tool_type)

@router.post("/execute", response_model=ToolExecuteResponse)
async def execute_tool(request: ToolExecuteRequest):
    """执行工具"""
    try:
        result = await tool_service.execute_tool(request)
        if not result.success:
            raise HTTPException(status_code=400, detail=result.error)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/creativity/generate", response_model=ToolExecuteResponse)
async def generate_creativity(topic: str, context: str = ""):
    """创意生成工具的专用接口"""
    request = ToolExecuteRequest(
        tool_id="creativity_generator",
        inputs={
            "topic": topic,
            "context": context
        }
    )
    
    try:
        result = await tool_service.execute_tool(request)
        if not result.success:
            raise HTTPException(status_code=400, detail=result.error)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))