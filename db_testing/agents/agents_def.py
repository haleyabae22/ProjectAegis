from dotenv import load_dotenv
from google.genai import types
from db_api.helper_funcs import add_program, retrieve_used_urls, get_database_data

# Google ADK Imports
from google.adk.agents import Agent
from google.adk.tools import google_search, ToolContext
from google.adk.tools.agent_tool import AgentTool
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
load_dotenv()

my_tool_config = types.ToolConfig(
    function_calling_config=types.FunctionCallingConfig(mode="AUTO"),
    include_server_side_tool_invocations=True
)

# --- Database Specialist ---
db_agent = Agent(
    name="database_specialist",
    model="gemini-3.1-flash-lite-preview",
    description="Agent tasked with managing and querying the programs database.",
    instruction="""
        You are a Database Specialist Agent.
        Your job is to assist the user by reading from and writing to the programs database.
        Always confirm with the user when a new record has been successfully added.
        
        when adding to the data base you will get in json format
        {
            "url": "www.example.com",
            "desc": "Funding for low income families",
            "amount": 300,
            "rate": "monthly"
        }
        
        NOTE: When calling the `add_program` tool, map the "amount" from the JSON to the `money` parameter.
        Do NOT provide a value for the `db_path` parameter in any of the tools; let it use the default.
    """,
    tools=[add_program, retrieve_used_urls, get_database_data]
)



# --- Validator Agent ---
validator_agent = Agent(
    name="validator_agent",
    model="gemini-3.1-flash-lite-preview",
    description="Validates JSON data from the scraper and passes it to the database specialist.",
    instruction="""
        You are a strict data validation agent.
        Your job is to receive scraped program data and ensure it is valid JSON.

        VALIDATION RULES:
        1. Check that the data contains all required keys: 'description', 'amount', 'disbursement_frequency', and 'url'.
        2. Check that the 'amount' makes logical sense. should be only a number

        ACTION:
        - If the data is VALID: Use the `call_db_agent` tool to pass the JSON data to the Database Specialist to save it. Return a success message.
        - If the data is INVALID: Do NOT save it. Return a detailed error message explaining what fields are missing or malformed.
    """,
    tools=[AgentTool(db_agent)]
)

# --- Scraper Agent ---
scraper_agent = Agent(
    name="scraper_agent",
    model="gemini-3.1-flash-lite-preview",
    description="Finds government funding programs and extracts data into JSON format.",
    instruction="""
        You are a web scraping and extraction agent. Your job is to find government funding programs, extract information
        from them, and finally format it as a json

        1. Using the database_specialist get the list of urls already scrapped and find new one, no redundant scraps
        2. Find new urls that have not been scrapped already
        3. While on the page describe the funding and who are eligible for it, and estimate how much money being disbursed  
        from the page for a per user level
        4. Organize data into a list of jsons to give to validator_agent to check the results and state if format is valid

        example format
        {
            "url": "www.example.com",
            "desc": "Funding for low income families",
            "amount": 300,
            "rate": "monthly"
        }
    """,
    tools=[google_search, AgentTool(db_agent), AgentTool(validator_agent)],
    # THIS IS THE NEW LINE:
    generate_content_config=types.GenerateContentConfig(
        tool_config=my_tool_config
    )
)


# ==========================================
# 3. The Top-Level Orchestrator Agent
# ==========================================

orchestrator_agent = Agent(
    name="orchestrator",
    model="gemini-3.1-flash-lite-preview",
    description="Master agent that manages the scraping, validation, and database storage ecosystem.",
    instruction="""
        You are the master Orchestrator agent. Your job is to analyze the user's request and choose the best agent or workflow.

        WORKFLOW RULES:
        1. If the user wants to FIND NEW FUNDS:
           - First, call `call_scraper_agent` to find and extract the data into JSON.
           - Second, pass the exact JSON output from the scraper into `call_validator_agent` so it can be checked and saved.
           - Finally, report the results back to the user.

        2. If the user asks a direct question about what is currently IN THE DATABASE (e.g., "how many urls do we have?"):
           - Call `call_db_agent` directly to get the answer.
    """,
    tools=[AgentTool(scraper_agent), AgentTool(validator_agent), AgentTool(db_agent)]
)


# ==========================================
# 4. Execution / Testing Block
# ==========================================

async def run_orchestrator(query: str):
    print(f"\n🗣️ User Query: '{query}'")

    session_service = InMemorySessionService()
    session = await session_service.create_session(
        app_name=orchestrator_agent.name,
        user_id="user_123"
    )

    runner = Runner(
        agent=orchestrator_agent,
        session_service=session_service,
        app_name=orchestrator_agent.name
    )

    final_response = ""
    async for event in runner.run_async(
            user_id="user_123",
            session_id=session.id,
            new_message=Content(parts=[Part(text=query)], role="user")
    ):
        if event.is_final_response():
            final_response = event.content.parts[0].text

    print("\n" + "=" * 50)
    print("✅ Final Orchestrator Response:\n")
    print(final_response)
    print("=" * 50 + "\n")


root_agent = scraper_agent