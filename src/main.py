from fastapi import FastAPI
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain.schema import SystemMessage
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
import json
import random

# Load env
load_dotenv()
CHROMA_PATH = "chroma"

app = FastAPI()

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {query}
"""

QUIZ_PROMPT_TEMPLATE = """
You are a discrete math quiz generator. Based on the following context, create 5 multiple choice questions:

{context}

Return Only valid JSON in this format:
[
    {{
    "question": "string",
    "options": ["A","B","C","D"],
    "answer": "A"
    }},
    ...
]
"""

TOPICS = [
    "Propositional Logic",
    "Sets",
    "Big-O",
    "Induction",
    "Recurrence Relations",
    "Relations",
    "Graphs",
    "Trees",
]

# Middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Schema of request
class QueryRequest(BaseModel):
    query: str

class QuizRequest(BaseModel):
    topic: str | None = None

# Setup DB
embedding_function = OpenAIEmbeddings()
db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

# CHAT API ENDPOINT
@app.post("/api/chat")
async def chat_endpoint(request: QueryRequest):
    query_text = request.query

    # Search DB for best match of query
    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    if len(results) == 0 or results[0][1] < 0.7: # check if no results or no accurate results
        return {"response": "Unable to find matching results.", "sources": []}
    
    # Create prompt
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format_prompt(context=context_text, query=query_text)
    messages = [SystemMessage(content="You are a helpful discrete math assistant. Only answer using provided context.")] + prompt.to_messages()

    # Call LLM
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        max_tokens=300,
    )

    # invoke model
    response = llm.invoke(messages) # call model with list of messages
    response_text = response.content

    # Get Source
    sources = [doc.metadata.get("source", None) for doc, _score in results]

    return {"response": response_text, "sources": sources}


# QUIZ API ENDPOINT
@app.post("/api/quiz")
async def quiz_endpoint(request: QuizRequest):
    topic = request.topic or random.choice(TOPICS)

    # Search DB for content matching topic 
    results = db.similarity_search_with_relevance_scores(topic, k=2)
    if len(results) == 0 or results[0][1] < 0.7:
        return {"quiz": None, "error": "No relevant content found."}
    
    # Create prompt
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(QUIZ_PROMPT_TEMPLATE)
    prompt = prompt_template.format_prompt(context=context_text)
    messages = [SystemMessage(content="You are quiz generator for discrete math.")] + prompt.to_messages()

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.3,
        max_tokens=1000,
    )

    response = llm.invoke(messages)

    # parse into JSON
    try:
        quiz = json.loads(response.content)
    except Exception:
        return { "quiz": None, "error": "Failed to parse quiz JSON."}
    
    return { "quiz": quiz }

