from openai import OpenAI
from app.prompts import get_match_prompt, get_cold_email_prompt
from app.utils import parse_score_and_feedback
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def evaluate_fit(resume_text: str, jd_text: str):
    prompt = get_match_prompt(resume_text, jd_text)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return parse_score_and_feedback(response.choices[0].message.content)

def generate_email(resume_text: str, jd_text: str):
    prompt = get_cold_email_prompt(resume_text, jd_text)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content 