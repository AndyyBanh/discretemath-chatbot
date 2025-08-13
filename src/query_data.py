import argparse
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain.schema import SystemMessage
from dotenv import load_dotenv
import os
import openai

# Load enviroment variables
load_dotenv()
openai.api_key = os.environ["OPENAI_API_KEY"]
CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {query}
"""

def main():
    # Command Line interface
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    arg = parser.parse_args()
    query_text = arg.query_text

    # Prepare DB
    embedding_function = OpenAIEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search DB for best match of query
    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    if len(results) == 0 or results[0][1] < 0.7: # check if no results or no accurate results
        print(f"Unable to find matching results.")
        return 
    
    # Create prompt
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format_prompt(context=context_text, query=query_text)
    messages = prompt.to_messages()

    # Explicit system role to prevent hallucination
    system_message = SystemMessage(
        content="You are a helpful discrete math assistant. Only answer using provided context."
    )
    messages = [system_message] + messages

    # Use LLM to answer
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        max_tokens=300,
        timeout=20,
        max_retries=2,
    )

    # invoke model
    response = llm.invoke(messages) # call model with list of messages
    response_text = response.content

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)


if __name__ == "__main__":
    main()