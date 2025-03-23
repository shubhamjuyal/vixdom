from dotenv import load_dotenv
import json
from langchain.schema.output_parser import BaseOutputParser
from langchain.prompts import ChatPromptTemplate
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema.output_parser import StrOutputParser

load_dotenv()


class LLMService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2")

        self.text_splitter = CharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200)

        self.vectorstore = None

    def _prepare_vectorstore(self, csv_sample: str, collection_name: str):
        chunks = self.text_splitter.split_text(csv_sample)
        documents = [Document(page_content=chunk) for chunk in chunks]

        self.vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings,
            collection_name=collection_name,
            persist_directory="./chroma_db"
        )

    async def inspect_csv(self, csv_sample, session_id: str):
        print("\n\n\ncsv_sample: ", csv_sample)
        file1 = open(
            "app/db/inspect-csv.txt", "r+")
        res = file1.read()
        # prepare vector store
        self._prepare_vectorstore(csv_sample=res,
                                  collection_name="collection123_" + session_id)
        retriever = self.vectorstore.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 1, "score_threshold": 0.4}
        )

        messages = [
            ("system", "Your will recieve a CSVs data, your job is to analyze the CSV and answer the questions asked by human."),
            ("human", "Below is a sample of a CSV file content. Analyze it and provide suggestions for improvements such as handling null values, inconsistent date formats, or any other data quality issues. Each suggestion should be very crisp and short (max 30 words per suggestion), and not more than 5 suggestions are allowed. Output should strictly be a list of strings, where each string is a suggestion."),
            ("human", "CSV content:\n\n" + json.dumps(csv_sample))
        ]

        # # optionally displaying the relevant results with metadata
        # relevant_docs = retriever.invoke(json.dumps(messages))
        # print("\n\n\n\nrelevant documents ---", relevant_docs)

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=False
        )

        result = qa_chain.run(json.dumps(messages))
        print("\n\n\nFinal result:", ListOfStringsOutputParser().parse(result))
        return ListOfStringsOutputParser().parse(result)


class ListOfStringsOutputParser(BaseOutputParser):
    def parse(self, text: str) -> list:
        import re
        # Remove code block markers (e.g., ```json or ```)
        cleaned = re.sub(r"```[\w]*", "", text)
        cleaned = cleaned.replace("```", "").strip()
        try:
            # Try to parse the cleaned text as JSON
            parsed = json.loads(cleaned)
            if isinstance(parsed, list) and all(isinstance(item, str) for item in parsed):
                return parsed
            else:
                raise ValueError("Output is not a list of strings.")
        except Exception:
            # Fallback: process line by line if JSON parsing fails
            lines = [line.strip()
                     for line in cleaned.splitlines() if line.strip()]
            suggestions = []
            for line in lines:
                # Skip lines that are only structural markers
                if line in ["[", "]"]:
                    continue
                # Remove any trailing commas
                line = line.rstrip(",")
                # Remove surrounding quotes if present
                if (line.startswith('"') and line.endswith('"')) or (line.startswith("'") and line.endswith("'")):
                    line = line[1:-1]
                suggestions.append(line)
            return suggestions

    @property
    def _type(self) -> str:
        return "list_of_strings"
