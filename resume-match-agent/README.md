# Resume Match Agent Backend

A FastAPI backend that provides AI-powered resume-job matching, cold email generation, and remote job fetching from multiple sources.

## Features

- 🤖 **AI Resume Matching**: Score resume-job fit and get improvement suggestions
- 📧 **Cold Email Generation**: Generate personalized cold emails for job applications
- 🔍 **Job Fetching**: Fetch remote jobs from Remotive API and We Work Remotely
- 🔄 **Real-time Processing**: Fast, async job processing and API responses
- 🛡️ **Error Handling**: Robust error handling and graceful degradation

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

## Project Structure

```
resume-match-agent/
├── app/
│   ├── main.py               # FastAPI server with all endpoints
│   ├── logic.py              # AI matching, feedback, email generation
│   ├── utils.py              # Resume/JD parsing helpers
│   ├── job_fetcher.py        # Job fetching from multiple sources
│   └── prompts/
│       ├── match_prompt.txt
│       └── cold_email_prompt.txt
├── tests/
│   ├── test_logic.py
│   └── test_job_fetcher.py
├── requirements.txt
└── README.md
```

## Job Fetching System

The backend includes a comprehensive job fetching system that:

- **Fetches from Multiple Sources**:
  - Remotive API (remote jobs)
  - We Work Remotely (scraped jobs)
- **Normalizes Data**: All jobs converted to consistent format
- **Provides Search & Filtering**: Query, company, and source filtering
- **Handles Errors Gracefully**: Continues working even if one source fails

### Job Data Format

All jobs are normalized to this format:
```json
{
  "id": "unique_job_id",
  "title": "Job Title",
  "company": "Company Name", 
  "description": "Job Description",
  "url": "Job URL",
  "published_at": "2024-01-01T00:00:00",
  "source": "remotive|weworkremotely"
}
```

### Job Fetching Endpoints

- `GET /jobs` - Fetch all jobs with optional filters
- `GET /jobs/remotive` - Fetch Remotive jobs only
- `GET /jobs/weworkremotely` - Fetch We Work Remotely jobs only

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed endpoint specifications.

## Core Features

### Resume Matching
- Upload PDF resume and job description
- Get AI-powered fit score (1-10)
- Receive detailed improvement suggestions
- Fast processing with OpenAI GPT-4

### Cold Email Generation
- Generate personalized cold emails
- Based on resume and job description
- Professional tone and structure
- Ready-to-use email content

### Job Discovery
- Real-time job fetching from multiple sources
- Search and filtering capabilities
- Normalized data format
- Error handling and fallbacks

## Dependencies

- **FastAPI**: Modern web framework
- **OpenAI**: AI-powered text generation
- **PyMuPDF**: PDF parsing
- **httpx**: Async HTTP client
- **beautifulsoup4**: Web scraping
- **python-dotenv**: Environment management

## Development

### Running Tests
```bash
python test_job_fetcher.py
```

### Adding New Job Sources
1. Add new method to `JobFetcher` class
2. Update `fetch_all_jobs()` method
3. Add new endpoint in `main.py`
4. Update API documentation

### Environment Variables
- `OPENAI_API_KEY`: Required for AI features
- `NEXT_PUBLIC_API_URL`: Frontend API URL (optional)

## Notes

- CORS is enabled for all origins for easy frontend integration
- The backend automatically reads your OpenAI API key from the `.env` file
- Job fetching includes rate limiting awareness and error handling
- All endpoints return consistent JSON responses with proper error handling

## Endpoints

- `POST /upload` — Upload resume (PDF) and job description (text) to get fit score and suggestions.
- `POST /cold-email` — Upload resume (PDF) and job description (text) to get a personalized cold email. 