from fastapi import FastAPI, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from app.logic import evaluate_fit, generate_email
from app.utils import extract_resume_text
from app.job_fetcher import JobFetcher
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize job fetcher
job_fetcher = JobFetcher()

@app.post("/upload")
async def upload(resume: UploadFile = File(...), jd: str = Form(...)):
    resume_text = await extract_resume_text(resume)
    score, feedback = evaluate_fit(resume_text, jd)
    return {"fit_score": score, "suggestions": feedback}

@app.post("/cold-email")
async def cold_email(resume: UploadFile = File(...), jd: str = Form(...)):
    resume_text = await extract_resume_text(resume)
    email = generate_email(resume_text, jd)
    return {"cold_email": email}

@app.get("/jobs")
async def get_jobs(
    query: Optional[str] = Query(None, description="Search query for job title, description, or company"),
    company: Optional[str] = Query(None, description="Filter by company name"),
    source: Optional[str] = Query(None, description="Filter by source (remotive or weworkremotely)"),
    limit: Optional[int] = Query(50, description="Maximum number of jobs to return")
):
    """Fetch jobs from Remotive API and We Work Remotely"""
    try:
        # Fetch all jobs
        all_jobs = await job_fetcher.fetch_all_jobs()
        
        # Apply filters
        filtered_jobs = job_fetcher.search_jobs(all_jobs, query, company, source)
        
        # Apply limit
        if limit:
            filtered_jobs = filtered_jobs[:limit]
        
        return {
            "jobs": filtered_jobs,
            "total": len(filtered_jobs),
            "sources": ["remotive", "weworkremotely"]
        }
    except Exception as e:
        return {"error": str(e), "jobs": [], "total": 0}

@app.get("/jobs/remotive")
async def get_remotive_jobs():
    """Fetch jobs from Remotive API only"""
    try:
        jobs = await job_fetcher.fetch_remotive_jobs()
        return {"jobs": jobs, "total": len(jobs), "source": "remotive"}
    except Exception as e:
        return {"error": str(e), "jobs": [], "total": 0}

@app.get("/jobs/weworkremotely")
async def get_weworkremotely_jobs():
    """Fetch jobs from We Work Remotely only"""
    try:
        jobs = await job_fetcher.fetch_weworkremotely_jobs()
        return {"jobs": jobs, "total": len(jobs), "source": "weworkremotely"}
    except Exception as e:
        return {"error": str(e), "jobs": [], "total": 0} 