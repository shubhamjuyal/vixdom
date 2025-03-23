import os
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings


def retrieve_context(filename, query):

    load_dotenv()

    # Defining persistent directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    persistent_directory = os.path.join(current_dir, "db", filename)

    # defining embedding model
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

    # loading the existing vector store with the embedding function
    db = Chroma(persist_directory=persistent_directory,
                embedding_function=embeddings)

    # retrieving relevant documents based on query
    retriever = db.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": 3, "score_threshold": 0.9},
    )
    relevant_docs = retriever.invoke(query)

    # optionally displaying the relevant results with metadata
    # print("\nrelevant documents ---")
    # for i, doc in enumerate(relevant_docs, 1):
    #     print(f"document {i}:\n{doc.page_content}\n")
    #     if doc.metadata:
    #         print(f"Source: {doc.metadata.get('source', 'unknown')}\n")

    return relevant_docs
