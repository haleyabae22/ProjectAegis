from dotenv import load_dotenv
from google.genai import types
from db_api.helper_funcs import AddProgram, RetrieveProgram, GetDatabaseData, RetrieveUsedUrls
from scraper_api.scrape_funcs import ScrapeUrl
from scraper_api.selenium_tools import *

# Google ADK Imports
from google.adk.agents import Agent, SequentialAgent
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

        url: the url scraped
        desc: the description of what the program is and who is eligible for it
        amount: how much money at a per individual level a family / person can get
        rate: how often are the reimbursed monthly, yearly, or one-time
        NOTE: When calling the `add_program` tool, map the "amount" from the JSON to the `money` parameter.
        Do NOT provide a value for the `db_path` parameter in any of the tools; let it use the default.
    """,
    tools=[AddProgram(), RetrieveUsedUrls(), RetrieveProgram(), GetDatabaseData()]
)

# --- URL Search Agent ---
url_search_agent = Agent(
    name="url_search_agent",
    model="gemini-3.1-flash-lite-preview",
    description="Agent tasked with finding candidate government funding programs on the web.",
    instruction="""
        You are a URL Search Agent. Your primary workflow is:
        1. use database_specialist to get a list of links already scrape to not rescrape them
        2. Use the `google_search` tool to search for new government funding programs.
        3. Identify candidate resources or websites.
        4. Return a clean, pure list of URLs you discovered. Output nothing else but these URLs.
    """,
    tools=[AgentTool(db_agent), google_search],
    generate_content_config=types.GenerateContentConfig(tool_config=my_tool_config)
)

# --- Scraper Agent ---
scraper_agent = Agent(
    name="scraper_agent",
    model="gemini-2.5-pro",
    description="Extracts data from funding program websites into JSON format.",
    instruction="""
    You are a web scraping and extraction agent. Your job is to extract government funding program details.
    
    CRITICAL WORKFLOW:
    1. Ask the `call_url_search_agent` to find potential government funding program URLs on the internet.
    2. Request the Database Specialist (`call_database_specialist`) to provide all already 'used URLs' via the appropriate tool.
    3. Filter out any URLs provided by the `call_url_search_agent` that are already present in the database.
    4. Explore web pages and gather as much information as possible through your web scrapping tools
    5. Extract the following information:
    - "desc": Details of the gov funding program and who is eligible.
    - "amount": A monetary estimate (number only) representing how much money the program potentially offers, calculated based on the user profile provided to you in the prompt.
    - "rate": How often money is disbursed (monthly, yearly, or one-time).
    - "url": The source URL of the web page scrapped from.
    6. Output the extracted data STRICTLY in JSON format. Do not add markdown formatting outside the JSON.
    """,

    tools=[AgentTool(url_search_agent),
    AgentTool(db_agent),
    ScrapeUrl(),
    GoToUrl(),
    TakeScreenshot(),
    FindElementWithText(),
    ClickElementWithText(),
    EnterTextIntoElement(),
    ScrollDown(),
    GetPageSource(),
    AnalyzeWebpageAndDetermineAction()],
    generate_content_config=types.GenerateContentConfig(
    tool_config=types.ToolConfig(
        function_calling_config=types.FunctionCallingConfig(mode="AUTO"),
        include_server_side_tool_invocations=False # <-- Set to False
    )),
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
        1. Check that the data contains all required keys: 'desc', 'amount', 'rate', and 'url'.
        2. Check that the 'amount' makes logical sense. should be only a number
        3. remove duplicate jsons that have the same url, and compare the urls to database_specialist result of get all urls
        and remove any json who url is in it

        ACTION:
        - If the data is VALID: Use the `call_database_specialist` tool to pass the JSON data to the Database Specialist to save it. Return a success message.
        - If the data is INVALID: Do NOT save it. Return a detailed error message explaining what fields are missing or malformed.
    """,
    tools=[AgentTool(db_agent)],
    generate_content_config=types.GenerateContentConfig(tool_config=my_tool_config)
)

scrape_pipeline = SequentialAgent(
    name="scrape_pipeline",
    sub_agents=[url_search_agent, scraper_agent, validator_agent, db_agent],
    description="""Workflow
    1. Find online funding resources for individuals and families
    2. Scrape the found urls and format in json to update database
    3. validate the data is in json format
    4. update the database with the json"""
)

analysis_agent = Agent(
    name="analysis_agent",
    model="gemini-3.1-flash-lite-preview",
    description="Use information from the database to answer questions",
    tools=[google_search, AgentTool(db_agent)],
    generate_content_config=types.GenerateContentConfig(tool_config=my_tool_config)
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
           - First, call `call_scraper_agent` to find and extract the data into JSON. IMPORTANT: You MUST pass the following Sample User Profile to the scraper agent in your request so it can accurately generate the monetary finding estimate.
           - Second, pass the exact JSON output from the scraper into `call_validator_agent` so it can be checked and saved.
           - Finally, report the results back to the user.

        2. If the user asks a direct question about what is currently IN THE DATABASE (e.g., "how many urls do we have?"):
           - Call `call_database_specialist` directly to get the answer.

        SAMPLE USER PROFILE:
        name: John Doe
        citizenship: US Citizen
        zip: 78701
        monthly_income: 1200.00
        assets: 1500.00
        housing_cost: 600.00
        utility_cost: 100.00
        dependent_care: 0.00
    """,
    # FIX 1: Remove db_agent from this list. It is already owned by scrape_pipeline.
    sub_agents=[scrape_pipeline, analysis_agent],

    # FIX 2: Add AgentTool(db_agent) so the orchestrator can talk to it directly for direct database questions.
    # I also added AgentTool(scraper_agent) and AgentTool(validator_agent) because your instructions
    # explicitly tell the orchestrator to call them!
    tools=[
        google_search,
        AgentTool(analysis_agent),
        AgentTool(db_agent),
        AgentTool(scraper_agent),
        AgentTool(validator_agent)
    ],
    generate_content_config=types.GenerateContentConfig(tool_config=my_tool_config)
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


root_agent = orchestrator_agent