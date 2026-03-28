import pytest
import json
from pipeline.models import ProgramSchema
from pipeline.tools import (
    web_scraper_tool, 
    fact_checker_tool, 
    sql_executor_tool, 
    db_query_tool
)

def test_web_scraper_tool_format():
    """Ensure raw text is returned correctly for the gathering agent."""
    result = web_scraper_tool("https://www.texas.gov/housing")
    assert "Mocked content" in result
    assert "Texas Housing Agency" in result

def test_schema_integrity():
    """Ensure the ProgramSchema robustly validates a good JSON object from the QA agent."""
    valid_data = {
        "program_name": "Texas Housing Grant",
        "state_federal": "TX",
        "category": "Housing",
        "agency": "Texas Housing Agency",
        "source_url": "https://www.texas.gov/housing",
        "funding_amount": "$5,000",
        "eligibility_criteria": {
            "demographics": ["veteran"],
            "income_limit": 50000.0
        }
    }
    
    # Parsing shouldn't raise validation error
    program = ProgramSchema(**valid_data)
    assert program.program_name == "Texas Housing Grant"
    assert program.eligibility_criteria is not None
    assert "veteran" in program.eligibility_criteria.demographics
    assert program.eligibility_criteria.income_limit == 50000.0
    
def test_db_agent_data_integrity():
    """Verify that `sql_executor_tool` handles valid schema representations properly."""
    valid_json_string = json.dumps({
        "program_name": "Test Validator Grant",
        "state_federal": "CA",
        "category": "Financial",
        "source_url": "https://ca.gov/grants"
    })
    
    # Simulates Agent 3 (DB Agent) executing the commit tool
    result = sql_executor_tool(valid_json_string)
    assert "SUCCESS" in result
    assert "Test Validator Grant" in result
    
def test_db_agent_malformed_json_handling():
    """Verify that improperly formatted strings output from QA agent result in an error instead of crash."""
    invalid_json_string = "```json\n { bad: 'syntax' }\n```"
    
    # DB Agent tool should catch parsing issues
    result = sql_executor_tool(invalid_json_string)
    assert "ERROR" in result
    assert "Could not parse" in result

def test_testing_agent_report_structure():
    """Verify that the synthetic testing agent outputs a health report."""
    persona = "single mother in NY"
    result = db_query_tool(persona)
    assert "[HEALTH REPORT]" in result
    assert "single mother in NY" in result
