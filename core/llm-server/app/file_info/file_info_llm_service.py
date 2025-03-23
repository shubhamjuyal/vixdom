from dotenv import load_dotenv
from io import StringIO
from langchain.schema.output_parser import StrOutputParser
from langchain.prompts import ChatPromptTemplate
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()


class LLMService:
    def __init__(self):
        # print("\n\n\n\n\n\n\nCreating embeddings")
        # self.embeddings = HuggingFaceEmbeddings(
        #     model_name="sentence-transformers/all-mpnet-base-v2"
        # )
        # print("\\n\n\n\n\n\nnFinished creating embeddings: ", self.embeddings)
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

    async def inspect_csv(self, csv_sample, session_id: str):
        print("\n\n\n\n\n\ncsv_sample: ", csv_sample)

        messages = [
            ("system", "Your will recieve a CSVs data, your job is to analyze the CSV and answer the questions asked by human."),
            ("human", "Below is a sample of a CSV file content. Analyze it and provide suggestions for improvements such as handling null values, inconsistent date formats, or any other data quality issues. Each suggestion should be very crisp and short (max 30 words per suggestion), and not more than 5 suggestions are allowed. Output should strictly be a list of strings, where each string is a suggestion."),
            ("human", "CSV content:\n\n{csv_sample}")
        ]
        prompt_template = ChatPromptTemplate.from_messages(messages)

        chain = prompt_template | self.llm | StrOutputParser()
        result = chain.invoke({"csv_sample": csv_sample})
        print("\n\n\n\n\n\nresult.content: ", result)
        return result

        # collection_name = f"session_{session_id}"
        # vectorstore = Chroma.from_texts(
        #     [csv_sample],
        #     embedding_function=self.embeddings,
        #     collection_name=collection_name
        # )
        # retriever = vectorstore.as_retriever(search_kwargs={"k": 1})

        # collection_name = f"session_{session_id}"
        # qa_chain = RetrievalQA.from_chain_type(
        #     llm=self.llm, chain_type="stuff", retriever=retriever)

        # suggestions_text = qa_chain.run(messages)
        # # suggestions_text = qa_chain.run(prompt_template)

        # # Split the result by newlines to create a list of suggestions.
        # suggestions = [s.strip()
        #                for s in suggestions_text.split('\n') if s.strip()]
        # return suggestions
