from fastapi import FastAPI
from app.file_info import file_info_routes
from app.file_info.file_info_llm_service import LLMService
app = FastAPI(title="FastAPI server for LLM integration.")

app.include_router(file_info_routes.router)


@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI CRUD Server!"}


if __name__ == "__main__":
    import uvicorn
    LLMService()
    uvicorn.run(app, host="0.0.0.0", port=9000)
