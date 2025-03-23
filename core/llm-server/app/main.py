from fastapi import FastAPI
from app.file_info import file_info_routes
app = FastAPI(title="FastAPI server for LLM integration.")

app.include_router(file_info_routes.router)


@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI CRUD Server!"}
