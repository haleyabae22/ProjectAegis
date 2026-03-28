from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import date, datetime

class EligibilityCriteria(BaseModel):
    """Detailed criteria for program eligibility (e.g., income limits, demographics)."""
    income_limit: Optional[float] = Field(default=None, description="Maximum income limit if applicable")
    demographics: Optional[List[str]] = Field(default_factory=list, description="Target demographic groups (e.g., 'veteran', 'single parent')")
    other_conditions: Optional[str] = Field(default=None, description="Any other specific conditions")

class ProgramSchema(BaseModel):
    """Validated JSON object representing a government assistance program."""
    program_name: str = Field(..., description="Official name of the assistance program.")
    state_federal: str = Field(..., description="Scope of the program (e.g., Federal, CA, NY).")
    category: str = Field(..., description="Housing, Food, Financial, Education, etc.")
    agency: Optional[str] = Field(default=None, description="The government agency managing the program.")
    eligibility_criteria: Optional[EligibilityCriteria] = None
    application_deadline: Optional[date] = Field(default=None, description="Last date to apply (if applicable).")
    funding_amount: Optional[str] = Field(default=None, description="Amount or description of funding.")
    source_url: str = Field(..., description="Link to the official application page.")
    last_updated: Optional[datetime] = Field(default=None, description="Last time the QA agent verified this entry.")
