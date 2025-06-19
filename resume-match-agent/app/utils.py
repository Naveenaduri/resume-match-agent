import fitz  # PyMuPDF
import re

async def extract_resume_text(resume_file):
    contents = await resume_file.read()
    with fitz.open(stream=contents, filetype="pdf") as doc:
        text = "\n".join(page.get_text() for page in doc)
    return text

def parse_score_and_feedback(response_text):
    match = re.search(r"(\d{1,2})/10|([1-9]|10) out of 10|([1-9]|10)", response_text)
    score = int(match.group(1) or match.group(2) or match.group(3)) if match else 0
    feedback = response_text
    return score, feedback

def load_prompt(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return f.read() 