from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
# from langchain.embeddings import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
import openai
from dotenv import load_dotenv
import os
import shutil

# Load enviroment variables
load_dotenv()

openai.api_key = os.environ["OPENAI_API_KEY"]


DATA_PATH = "../data/DiscreteMathText.md"
CHROMA_PATH = "chroma"

def main():
    generate_date_store()

# function to load, split into chunks, save to db
def generate_date_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)

# func to load markdown data from text to python turning md files to documents
def load_documents():
    loader = TextLoader(DATA_PATH, encoding="utf-8")
    documents = loader.load() # returns List[Document]
    return documents

# function that takes documents and cuts into chunks for more accurate readings
def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=500,
        length_function=len,
        add_start_index=True,
    )

    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

    document = chunks[10]
    print(document.page_content)
    print(document.metadata) # print source

    return chunks

def save_to_chroma(chunks: list[Document]):
    # If db already exists clear out db first
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    # Create a new DB from the documents
    db = Chroma.from_documents(
        chunks, OpenAIEmbeddings(), persist_directory=CHROMA_PATH
    )
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")

if __name__ == "__main__":
    main()