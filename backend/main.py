from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

# Absolute import if running from backend root
from agents.agents_def import run_orchestrator

app = FastAPI(title="Aegis Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserProfile(BaseModel):
    fullName: str = ""
    citizenship: str = ""
    monthlyIncome: str = ""
    monthlyHousingCost: str = ""
    monthlyUtilityCost: str = ""
    dependentCareCost: str = ""

@app.post("/api/analyze")
async def analyze_profile(profile: UserProfile):
    query = f"""
    The user wants to FIND NEW FUNDS. 
    Here is the User Profile:
    name: {profile.fullName}
    citizenship: {profile.citizenship}
    monthly_income: {profile.monthlyIncome}
    housing_cost: {profile.monthlyHousingCost}
    utility_cost: {profile.monthlyUtilityCost}
    dependent_care: {profile.dependentCareCost}
    
    IMPORTANT: You must output the final results to the user strictly as a raw JSON array of objects with the exact keys below. DO NOT wrap with markdown, just output pure JSON.
    You MUST ONLY return real websites and programs that were verified and scraped by the scraper_agent. Do NOT hallucinate listings or return generic descriptions.
    The "icon" value must be STRICTLY one of the following: "food", "energy", "housing", "health".

    Format:
    [{{
        "icon": "food",
        "title": "Program Name",
        "amount": "$450/mo",
        "description": "Short description.",
        "matchPercent": 98,
        "url": "https://www.example.com/apply",
        "tags": ["TAG 1", "TAG 2"]
    }}]
    """
    try:
        response_text = await run_orchestrator(query)
        
        # Clean markdown if orchestrator includes it
        clean_response = response_text.strip()
        if clean_response.startswith("```json"):
            clean_response = clean_response[7:]
        elif clean_response.startswith("```"):
            clean_response = clean_response[3:]
            
        if clean_response.endswith("```"):
            clean_response = clean_response[:-3]
            
        clean_response = clean_response.strip()
        
        # Validate JSON, if parsing fails, we bubble up exception
        data = json.loads(clean_response)
        return {"benefits": data}
    except Exception as e:
        return {"error": str(e), "raw": response_text if 'response_text' in locals() else None}
