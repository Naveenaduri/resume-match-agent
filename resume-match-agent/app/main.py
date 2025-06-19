from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.logic import evaluate_fit, generate_email
from app.utils import extract_resume_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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