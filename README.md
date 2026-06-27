# Discrete Math AI Chatbot
Education web app that uses Retrieval-Augmented Generation, OpenAI API, and FAST API to provide accurate explanations. Allowing for user interaction through chatbot and interactive quizzes.

## Features
The web app has the following features:
- **AI Chatbot:** Leveraging Open AI's gpt-4o-mini model the Chatbot will listen for user input and provide accurate responses.
- **RAG Integration:** Use Chroma DB to store vector database of source text based on Discrete Math material. Which is used to generate a response.
- **Quiz Module:** Mutiple choice quiz on various topics allowing for users to enforce their learning.

## Tech Stack
**Frontend:**
- Next.js
- TypeScript
- Tailwind.css + DaisyUI

**Backend**
- FAST API
- LangChain
- ChromaDB
- Python

## Installation
1. Clone the repository
```
git clone https://github.com/AndyyBanh/discretemath-chatbot
cd discretemath-chatbot
```
2. Install Dependencies
```
pip install -r requirements.txt
```
3. Setup .env keys
```
export OPENAI_API_KEY="your_openai_api_key"
```
4. Prepare Source Data (need your own PDF and place in data/ folder)
```
cd src
python extract_pdf.py
python create_database.py
```
5. Run Backend
```
cd src
uvicorn main:app --reload
```
6. Run Frontend
```
cd frontend
npm run dev

```
## Project Structure
```
ai-chatbot
┣ frontend # Next.js + Tailwind frontend
┃ ┣ app
┃ ┃ ┣ components # Reusable UI components
┃ ┃ ┣ quiz # Quiz pages
┃ ┃ ┣ globals.css
┃ ┃ ┣ layout.tsx
┃ ┃ ┗ page.tsx
┃ ┣ package.json # Frontend dependencies
┃ ┗ tsconfig.json
┣ src # Backend (FastAPI + LangChain + ChromaDB)
┃ ┣ main.py # FastAPI app (Chat + Quiz API endpoints)
┃ ┣ create_database.py # Build vector DB from PDFs
┃ ┣ extract_pdf.py # Extract text from PDFs
┃ ┣ query_data.py # Query vector DB
┃ ┗ quizzes.json # Quiz dataset
┣ .env # Environment variables (API keys, etc.)
┣ README.md # Project documentation
┗ requirements.txt # Python dependencies
```

## Future Plans
- Improve UI
- Expand Quiz pool
  
## Contributing 
Contributions welcome. Feel free to send pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer
This project does not include copyrighted source materials.  
If you want to use chatbot, you will need to provide own text data and build the vector database using the provided scripts (`extract_pdf.py` and `create_database.py`).
