import os
from google.adk.agents import Agent, SequentialAgent
from .tools import (
    google_search,
    web_scraper_tool,
    fact_checker_tool,
    sql_executor_tool,
    db_query_tool
)

# Use flash variant as default if none specified (generally faster for chained testing)
DEFAULT_MODEL = os.getenv("ADK_MODEL", "gemini-2.5-flash")

# 🟢 Agent 1a: Research Agent
research_agent = Agent(
    name="research_agent",
    model=DEFAULT_MODEL,
    tools=[google_search],
    instruction="""You are the Research Agent.
    Your task is to execute targeted searches to find official website URLs (ending in .gov or .org) for government assistance programs based on: {user_input}
    Output the relevant URLs you find.
    """,
    output_key="program_urls"
)

# 🟢 Agent 1b: Harvester Agent (formerly part of Gathering Agent)
harvester_agent = Agent(
    name="harvester_agent",
    model=DEFAULT_MODEL,
    tools=[web_scraper_tool],
    instruction="""You are the Data Harvester.
    Use the web_scraper_tool to extract raw text content from the URLs provided: {program_urls}
    Include everything you find: program names, links, and detailed descriptions.
    """,
    output_key="raw_text"
)

# 🟡 Agent 2: Information Quality Assurance (QA) Agent
qa_agent = Agent(
    name="qa_agent",
    model=DEFAULT_MODEL,
    tools=[fact_checker_tool],
    instruction="""You are the Information Quality Assurance (QA) Agent.
    Your task is to refine and validate the text provided: {raw_text}
    Step 1: Use the fact_checker_tool to analyze the raw text for hallucinations or missing info.
    Step 2: Convert the valid information into a structured JSON string adhering to our ProgramSchema.
    
    The schema includes:
    - program_name, state_federal, category, source_url (required strings)
    - agency (optional string)
    - application_deadline (optional YYYY-MM-DD date)
    - funding_amount (optional string)
    
    Output ONLY the raw JSON string (no markdown formatting, no backticks).
    """,
    output_key="program_json"
)

# 🔵 Agent 3: Database Agent
db_agent = Agent(
    name="db_agent",
    model=DEFAULT_MODEL,
    tools=[sql_executor_tool],
    instruction="""You are the Database Agent responsible for data persistence.
    Your task is to take the validated JSON object: {program_json}
    Use the sql_executor_tool to map this JSON data into our Cloud SQL schema (Upsert logic).
    Output the final confirmation message regarding the DB commit and record ID.
    """,
    output_key="db_commit"
)

# 🔴 Agent 4: Service Testing Agent
testing_agent = Agent(
    name="testing_agent",
    model=DEFAULT_MODEL,
    tools=[db_query_tool],
    instruction="""You are the Service Testing Agent acting as a synthetic "secret shopper."
    Context of the last update: {db_commit}
    Original request context: {user_input}

    Generate a realistic user persona related to the initial request.
    Use the db_query_tool to query the database with your persona to ensure the new record is easily discoverable and accurate.
    Output a structured Health Report flagging any stale data or incorrect eligibility mapping.
    """,
    output_key="health_report"
)

# Multi-Agent Sequential Plan
adk_pipeline = SequentialAgent(
    name="adk_pipeline",
    sub_agents=[research_agent, harvester_agent, qa_agent, db_agent, testing_agent],
    description="Transforms unstructured input queries into validated SQL records via a 5-step pipeline."
)

root_agent = adk_pipeline

