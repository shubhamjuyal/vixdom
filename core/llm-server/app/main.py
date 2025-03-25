from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.file_info import file_info_routes
from app.file_info.file_info_llm_service import LLMService
from app.chat import chat_routes

app = FastAPI(title="FastAPI server for LLM integration.")

# Define the origins you want to allow
origins = [
    "http://localhost:3000",  # Update this to match your client's domain and port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(file_info_routes.router)
app.include_router(chat_routes.router)


@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI CRUD Server!"}


if __name__ == "__main__":
    import uvicorn
    LLMService()
    uvicorn.run(app, host="0.0.0.0", port=9000)
