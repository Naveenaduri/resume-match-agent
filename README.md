# AI-powered Job Agent

This project contains both the backend (FastAPI) and frontend (Next.js) for a resume-job matching and cold email generator tool.

## Features

- Score your resume against job descriptions
- Generate personalized cold emails
- Modern, responsive UI
- Easy to deploy backend and frontend

## Structure

- `resume-match-agent/` — Python FastAPI backend
  - Resume parsing and analysis
  - OpenAI integration for scoring and email generation
  - CORS-enabled API endpoints

- `resume-match-ui/` — Next.js frontend
  - Modern UI built with Chakra UI
  - File upload and form handling
  - Responsive design
  - Configurable backend URL

## Quick Start

1. Set up the backend:
   - See `resume-match-agent/README.md`
   - Requires Python and OpenAI API key

2. Set up the frontend:
   - See `resume-match-ui/README.md`
   - Requires Node.js
   - Optional: Configure custom backend URL

3. Development:
   - Backend runs on http://localhost:8000
   - Frontend runs on http://localhost:3000

## Environment Variables

### Backend
- `OPENAI_API_KEY` (required): Your OpenAI API key

### Frontend
- `NEXT_PUBLIC_BACKEND_URL` (optional): Custom backend URL
  - Defaults to http://localhost:8000 