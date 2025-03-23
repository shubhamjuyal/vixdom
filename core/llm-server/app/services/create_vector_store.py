import os
from dotenv import load_dotenv
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings


def initialize_vector_store(filename):
    print("request received for initializing vector database for {filename}")

    load_dotenv()

    # defining the directory containing text file and the persistent directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "books", filename)
    persistent_directory = os.path.join(current_dir, "db", filename)

    if not os.path.exists(persistent_directory):

        if not os.path.exists(file_path):
            raise FileNotFoundError(
                f"The file {file_path} does not exist. Please check the path."
            )

        # reading content from the file
        loader = TextLoader(file_path, encoding="utf-8")
        documents = loader.load()

        # spliting document into chunks
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        docs = text_splitter.split_documents(documents)
        print(f"Number of document chunks: {len(docs)}")

        # creating embeddings
        print("\nCreating embeddings")
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2"
        )
        print("\nFinished creating embeddings")

        # creating vector store and persist
        print("\nCreating vector store")
        db = Chroma.from_documents(
            docs, embeddings, persist_directory=persistent_directory)
        print("\nFinished creating vector store")
    else:
        print("Vector store already exists. No need to initialize.")
