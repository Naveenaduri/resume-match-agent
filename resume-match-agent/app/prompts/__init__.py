from app.utils import load_prompt
import os

PROMPT_DIR = os.path.dirname(__file__)

def get_match_prompt(resume, jd):
    template = load_prompt(os.path.join(PROMPT_DIR, "match_prompt.txt"))
    return template.format(resume=resume, jd=jd)

def get_cold_email_prompt(resume, jd):
    template = load_prompt(os.path.join(PROMPT_DIR, "cold_email_prompt.txt"))
    return template.format(resume=resume, jd=jd) 