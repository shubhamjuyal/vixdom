from typing import Any, Dict, List
from langchain.callbacks.base import BaseCallbackHandler
import os
import asyncio
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import JSONLoader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage

router = APIRouter(prefix="/chat", tags=["Chat"])
load_dotenv()


def format_message(message: dict) -> str:
    return f"{message['role']}: {message['content']}"


def format_documents_as_string(docs) -> str:
    return "\n".join([doc.page_content for doc in docs])


class AsyncTokenStreamer:
    def __init__(self):
        self.queue = asyncio.Queue()

    def callback(self, token: str, **kwargs):
        self.queue.put_nowait(token)

    async def stream_tokens(self):
        while True:
            token = await self.queue.get()
            if token is None:
                break
            yield token


class AsyncTokenStreamerCallbackHandler(BaseCallbackHandler):
    def __init__(self, streamer: AsyncTokenStreamer):
        self.streamer = streamer

    def on_chat_model_start(self, llm: Dict[str, Any], messages: List[HumanMessage], **kwargs: Any):
        """Called when the LLM chat model starts."""
        # No-op or add logging here if needed
        pass

    def on_llm_new_token(self, token: str, **kwargs: Any):
        """Called each time a new token is streamed."""
        self.streamer.queue.put_nowait(token)


@router.post("/")
async def post_endpoint(request: Request):
    try:
        data = await request.json()
        messages = data.get("messages")
        if not messages:
            raise HTTPException(
                status_code=400, detail="No messages provided."
            )

        # Format previous messages for chat history
        formatted_previous_messages = "\n".join(
            [format_message(m) for m in messages[:-1]]
        )
        current_message_content = messages[-1]["content"]

        print("Before JSON Loader")
        loader = JSONLoader(
            "C:/Users/shubham/Documents/GitHub/vixdom/core/llm-server/app/db/states.json",
            jq_schema=".[].capital_city",
        )
        print("After JSON Loader")
        docs = loader.load()
        context_str = format_documents_as_string(docs)

        # Define the prompt template
        TEMPLATE = (
            "Answer the user's questions based only on the following context. "
            "If the answer is not in the context, reply politely that you do not have that information available.:\n"
            "==============================\n"
            "Context: {context}\n"
            "==============================\n"
            "Current conversation: {chat_history}\n\n"
            "user: {question}\n"
            "assistant:"
        )
        prompt = PromptTemplate(
            template=TEMPLATE,
            input_variables=["context", "chat_history", "question"],
        )
        formatted_prompt = prompt.format(
            context=context_str,
            chat_history=formatted_previous_messages,
            question=current_message_content,
        )

        # Prepare the asynchronous token streamer
        streamer = AsyncTokenStreamer()

        print("hello i am before LLM call")
        callback_handler = AsyncTokenStreamerCallbackHandler(streamer)
        model = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
            streaming=True,
            verbose=True,
            callbacks=[callback_handler],
        )
        print("hello i am after LLM call")

        loop = asyncio.get_event_loop()
        print("After loop")

        # Use invoke(...) to avoid the deprecation warning
        result_future = loop.run_in_executor(
            None, lambda: model.invoke(
                [HumanMessage(content=formatted_prompt)])
        )
        print("After result_future")

        async def wait_for_result():
            await result_future
            # Signal the end of streaming
            await streamer.queue.put(None)

        print("After wait_for_result")
        asyncio.create_task(wait_for_result())
        print("After asyncio")

        # Create an async generator that yields tokens as they arrive
        async def token_generator():
            async for token in streamer.stream_tokens():
                yield token

        print("After token_generator")

        # Return a streaming response to the client
        return StreamingResponse(token_generator(), media_type="text/plain")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
