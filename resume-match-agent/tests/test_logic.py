import pytest
from app.logic import evaluate_fit

@pytest.mark.asyncio
async def test_evaluate_fit_good_match(monkeypatch):
    async def fake_openai(*args, **kwargs):
        class FakeResp:
            choices = [{"message": {"content": "8/10. Looks like a good match. No major changes needed."}}]
        return FakeResp()
    monkeypatch.setattr("app.logic.openai.ChatCompletion.acreate", fake_openai)
    score, feedback = await evaluate_fit("React, TypeScript", "React developer with TypeScript")
    assert score >= 7
    assert "good match" in feedback.lower() or "no major changes" in feedback.lower() 