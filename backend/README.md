# Project Aegis Backend

The backend powers profile-driven benefit analysis for Project Aegis.
It exposes API endpoints used by the frontend, orchestrates agent workflows to discover and validate assistance programs, and stores scraped program data for reuse.

## Mission

The backend exists to:

- Turn user profile and household inputs into relevant program recommendations.
- Discover real funding/program URLs and avoid duplicates.
- Validate and return structured results the frontend can render directly.
- Serve as the integration point for future auth, persistent user data, and production APIs.

## Current Tech Stack

- FastAPI for HTTP API endpoints.
- Uvicorn as the ASGI server.
- Pydantic for request validation.
- Google ADK agents for orchestration/search/scraping/validation.
- SQLite for local program storage.
- Selenium tools for dynamic scraping flows.

## High-Level Architecture

- main.py
  - Creates FastAPI app.
  - Configures CORS.
  - Defines API routes.
  - Calls the orchestrator pipeline.
- agents/
  - Agent definitions and orchestration logic.
  - Search, scraper, validator, and database specialist roles.
- scraper_api/
  - Scraping helpers and browser automation utilities.
- db_api/
  - Database init and helper utilities.
- programs.db
  - Local SQLite file containing saved program records.

## Repository Structure

- backend/main.py: API entrypoint and route definitions.
- backend/agents/agents_def.py: ADK agent graph and run_orchestrator flow.
- backend/db_api/init_db.py: database bootstrap script for programs/users tables.
- backend/db_api/get_database_data.py: program data retrieval helpers.
- backend/scraper_api/scrape_funcs.py: scrape extraction routines.
- backend/scraper_api/selenium_tools.py: browser automation tools.
- backend/requirements.txt: Python dependencies.
- backend/programs.db: local SQLite database.

## API Endpoints

- POST /api/analyze
  - Input: user profile payload (name, citizenship, monthly costs, etc.).
  - Behavior:
    - Builds an analysis query from profile fields.
    - Runs orchestrator workflow.
    - Cleans and parses JSON output.
    - Returns normalized benefits list.
  - Response shape:
    - Success: { "benefits": [ ... ] }
    - Error: { "error": "...", "raw": "..." }

## Local Development Setup

Use this flow:

1. cd backend
2. python/python3 -m venv .venv
3. source python/.venv/bin/activate
4. pip install -r requirements.txt
5. uvicorn main:app --host 127.0.0.1 --port 8000 --reload

Windows PowerShell activation equivalent:

- .\.venv\Scripts\Activate.ps1

Note:

- If you create the venv in backend/.venv, the Unix activation path is usually source .venv/bin/activate.

## Running and Testing the API

After startup, default service URL is:

- http://127.0.0.1:8000

Quick checks:

- Open docs endpoint at /docs.
- Send POST requests to /api/analyze with a sample profile payload.

## Frontend Integration

Frontend API calls are currently wired from:

- src/services/api.ts in the root app workspace.

Expected backend base URL in local development:

- http://127.0.0.1:8000

## Data and Persistence Notes

- programs.db is currently local and file-based.
- Profile/session persistence in frontend is local storage based.
- Cross-device account persistence is a future backend responsibility.

## Environment and Secrets

The agent stack uses dotenv loading in agents/agents_def.py.
Define required keys in a local environment file before running advanced agent flows.

## Known Limitations

- Current endpoint set is minimal (core analyze route only).
- Orchestrator output quality depends on upstream model/tool results.
- SQLite is suitable for local development, not production scale.

## Suggested Next Backend Milestones

- Add dedicated health endpoint and structured error codes.
- Add auth and user identity model.
- Add persistent profile storage and user history.
- Add deterministic tests for route contracts and orchestrator parsing.
- Add production configuration for database and deployment.
