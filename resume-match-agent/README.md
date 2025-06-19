# Resume Match Agent Backend

## Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the project root and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-key
   ```
4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Endpoints

- `POST /upload` — Upload resume (PDF) and job description (text) to get fit score and suggestions.
- `POST /cold-email` — Upload resume (PDF) and job description (text) to get a personalized cold email.

## Project Structure

```
resume-match-agent/
├── app/
│   ├── main.py               # FastAPI server
│   ├── logic.py              # Matching, feedback, email generation
│   ├── utils.py              # Resume/JD parsing helpers
│   └── prompts/
│       ├── match_prompt.txt
│       └── cold_email_prompt.txt
├── tests/
│   └── test_logic.py
├── requirements.txt
└── README.md
```

## Notes
- CORS is enabled for all origins for easy frontend integration.
- The backend will automatically read your OpenAI API key from the `.env` file. 