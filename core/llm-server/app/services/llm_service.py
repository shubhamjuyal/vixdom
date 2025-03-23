from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.vectorstores import Chroma
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI


async def LLMService():
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    result = model.invoke("What is 81 divided by 9?")
    return result
