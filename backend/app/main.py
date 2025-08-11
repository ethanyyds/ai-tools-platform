from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# 最小可运行的 FastAPI Demo
app = FastAPI(title="AI Tools Demo", version="0.1.0")

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from AI Tools Demo"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/creativity/demo")
async def creativity_demo(payload: dict):
    """最小Demo：模拟调用Dify产生创意，先不接Dify，返回固定结构。
    前端后续只需将此接口替换为真实Dify调用即可。
    """
    topic = payload.get("topic", "未提供主题")
    context = payload.get("context", "")
    return {
        "success": True,
        "data": {
            "workflow_run_id": "demo-run-id",
            "task_id": "demo-task-id",
            "data": {
                "outputs": {
                    "text": f"基于六顶思考帽对主题 ‘{topic}’ 的简要创意：\n- 白帽：列出现状与事实\n- 红帽：直觉与情绪反应\n- 黑帽：风险与限制\n- 黄帽：价值与收益\n- 绿帽：创意与替代方案\n- 蓝帽：行动步骤与度量指标\n\n背景：{context}"
                }
            }
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)