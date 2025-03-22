from fastapi import FastAPI
from app.routes import users

app = FastAPI(title="FastAPI server for LLM integration.")

app.include_router(users.router)


@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI CRUD Server!"}
