# API Documentation

This document provides detailed information about all API endpoints, request/response formats, and usage examples.

## Base URL

```
http://localhost:8000
```

## Authentication

Currently, no authentication is required for any endpoints.

## Response Format

All endpoints return JSON responses. Error responses follow this format:

```json
{
  "error": "Error message",
  "jobs": [],
  "total": 0
}
```

## Endpoints

### 1. Resume Matching

#### `POST /upload`

Upload a resume (PDF) and job description to get a fit score and improvement suggestions.

**Request:**
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `resume` (file): PDF resume file
  - `jd` (string): Job description text

**Response:**
```json
{
  "fit_score": 8.5,
  "suggestions": "Your resume shows strong technical skills...\n\nRecommendations:\n1. Add more quantifiable achievements\n2. Include relevant certifications\n3. Highlight leadership experience"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/upload" \
  -F "resume=@resume.pdf" \
  -F "jd=We are looking for a Python developer..."
```

### 2. Cold Email Generation

#### `POST /cold-email`

Generate a personalized cold email based on resume and job description.

**Request:**
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `resume` (file): PDF resume file
  - `jd` (string): Job description text

**Response:**
```json
{
  "cold_email": "Dear Hiring Manager,\n\nI am writing to express my interest in the Python Developer position...\n\nBest regards,\n[Your Name]"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/cold-email" \
  -F "resume=@resume.pdf" \
  -F "jd=We are looking for a Python developer..."
```

### 3. Job Fetching

#### `GET /jobs`

Fetch jobs from all sources with optional filtering.

**Query Parameters:**
- `query` (optional, string): Search query for job title, description, or company
- `company` (optional, string): Filter by company name
- `source` (optional, string): Filter by source ("remotive" or "weworkremotely")
- `limit` (optional, integer): Maximum number of jobs to return (default: 50)

**Response:**
```json
{
  "jobs": [
    {
      "id": "remotive_12345",
      "title": "Senior Python Developer",
      "company": "Tech Corp",
      "description": "We are looking for an experienced Python developer...",
      "url": "https://remotive.com/job/12345",
      "published_at": "2024-01-15T10:30:00",
      "source": "remotive"
    }
  ],
  "total": 1,
  "sources": ["remotive", "weworkremotely"]
}
```

**Examples:**
```bash
# Get all jobs
curl "http://localhost:8000/jobs"

# Search for Python jobs
curl "http://localhost:8000/jobs?query=python&limit=10"

# Filter by company
curl "http://localhost:8000/jobs?company=google"

# Filter by source
curl "http://localhost:8000/jobs?source=remotive"
```

#### `GET /jobs/remotive`

Fetch jobs from Remotive API only.

**Response:**
```json
{
  "jobs": [
    {
      "id": "remotive_12345",
      "title": "Senior Python Developer",
      "company": "Tech Corp",
      "description": "We are looking for an experienced Python developer...",
      "url": "https://remotive.com/job/12345",
      "published_at": "2024-01-15T10:30:00",
      "source": "remotive"
    }
  ],
  "total": 1,
  "source": "remotive"
}
```

#### `GET /jobs/weworkremotely`

Fetch jobs from We Work Remotely only.

**Response:**
```json
{
  "jobs": [
    {
      "id": "weworkremotely_67890",
      "title": "Frontend Developer",
      "company": "Startup Inc",
      "description": "Remote position at Startup Inc - Frontend Developer",
      "url": "https://weworkremotely.com/job/67890",
      "published_at": "2024-01-15T12:00:00",
      "source": "weworkremotely"
    }
  ],
  "total": 1,
  "source": "weworkremotely"
}
```

## Data Models

### Job Object

```json
{
  "id": "string",           // Unique job identifier
  "title": "string",        // Job title
  "company": "string",      // Company name
  "description": "string",  // Job description
  "url": "string",          // Job application URL
  "published_at": "string", // ISO 8601 date string
  "source": "string"        // "remotive" or "weworkremotely"
}
```

### Resume Matching Response

```json
{
  "fit_score": "number",    // Score from 1-10
  "suggestions": "string"   // Improvement suggestions
}
```

### Cold Email Response

```json
{
  "cold_email": "string"    // Generated email content
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request (missing parameters) |
| 422 | Validation Error (invalid file format) |
| 500 | Internal Server Error |

## Rate Limiting

- No rate limiting is currently implemented
- Consider implementing rate limiting for production use

## CORS

CORS is enabled for all origins to allow frontend integration:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing

### Test Job Fetcher
```bash
cd resume-match-agent
python test_job_fetcher.py
```

### Test with curl
```bash
# Test resume matching
curl -X POST "http://localhost:8000/upload" \
  -F "resume=@test_resume.pdf" \
  -F "jd=Test job description"

# Test job fetching
curl "http://localhost:8000/jobs?query=python&limit=5"
```

## Notes

- All dates are in ISO 8601 format
- File uploads are limited to PDF format for resumes
- Job descriptions should be plain text
- The API automatically handles encoding/decoding of special characters
- Error responses include descriptive messages for debugging 