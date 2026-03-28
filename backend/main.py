import asyncio
import json
import argparse
import sys
from dotenv import load_dotenv

load_dotenv()

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
from pipeline.agents import root_agent
from pipeline.models import ProgramSchema

async def run_pipeline(user_query: str):
    print(f"==================================================")
    print(f"🚀 Initializing ADK Pipeline for query:")
    print(f"   '{user_query}'")
    print(f"==================================================")

    session_service = InMemorySessionService()
    my_user_id = "test_user_001"
    
    try:
        session = await session_service.create_session(app_name=root_agent.name, user_id=my_user_id)
        
        runner = Runner(
            agent=root_agent,
            session_service=session_service,
            app_name=root_agent.name
        )

        final_response = ""
        print("Starting asynchronous execution of the Sequential Workflow...\n")
        
        async for event in runner.run_async(
            user_id=my_user_id,
            session_id=session.id,
            new_message=Content(parts=[Part(text=user_query)], role="user"),
            state_delta={"user_input": user_query}
        ):
            print(f"EVENT >>> {event}")
            if event.is_final_response():
                final_response = event.content.parts[0].text
                
        print("\n✅ Pipeline Execution Complete.")
        print("--- Final Response ---")
        print(final_response)
        
    except Exception as e:
        print(f"\n❌ Pipeline failed during execution: {str(e)}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Test Command for ADK Sequential Pipeline")
    parser.add_argument(
        "--query",
        type=str,
        default="Florida grants for single parents 2026",
        help="The search query simulating a backend trigger"
    )
    args = parser.parse_args()
    
    asyncio.run(run_pipeline(args.query))

if __name__ == "__main__":
    main()
