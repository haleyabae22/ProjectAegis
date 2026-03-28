# Project Blueprint: ADK-Powered Government Assistance Database

## 1. Executive Summary
This project outlines a backend architecture that leverages **Google’s Agent Development Kit (ADK)** to automate the discovery, validation, and storage of government assistance programs. By using a sequential multi-agent workflow, we transform unstructured web data into a high-quality, queryable SQL database.

---

## 2. Technical Architecture
The backend is built as a **Sequential Pipeline** where each agent performs a specialized task and passes its context to the next via the ADK `InvocationContext`.

* **Framework:** Python with FastAPI.
* **Orchestration:** Google ADK (Agent Development Kit).
* **Database:** Google Cloud SQL (PostgreSQL).
* **Hosting:** Vertex AI Agent Engine.

---

## 3. Agent Specifications

### 🟢 Agent 1: Information Gathering Agent
* **Role:** Primary researcher and data harvester.
* **Tools:** `Google Search_tool`, `web_scraper_tool` (Custom BeautifulSoup/Playwright tool).
* **Primary Task:** Execute targeted searches (e.g., "New York small business grants 2026") and extract raw text from official `.gov` or `.org` sites.
* **Output:** Unstructured text blobs containing program names, links, and descriptions.

### 🟡 Agent 2: Information Quality Assurance (QA) Agent
* **Role:** Data refiner and validator.
* **Tools:** `json_formatter`, `fact_checker` (Cross-references links/dates).
* **Primary Task:** Analyze raw text for hallucinations or missing info. It converts text into a **Structured JSON Schema**.
* **Output:** Validated JSON objects containing: `program_name`, `agency`, `eligibility_criteria`, `application_deadline`, `funding_amount`, and `source_url`.

### 🔵 Agent 3: Database Agent
* **Role:** Data persistence and record management.
* **Tools:** `sql_executor_tool` (Custom tool using SQLAlchemy/psycopg2).
* **Primary Task:** Map the JSON data to the SQL schema. It handles **Upserts** (Update or Insert) to ensure no duplicate programs are created if they already exist in the database.
* **Output:** Confirmation of successful DB commit and record IDs.

### 🔴 Agent 4: Service Testing Agent
* **Role:** Synthetic user and system validator.
* **Tools:** `db_query_tool`.
* **Primary Task:** It acts as a "secret shopper." It generates user personas (e.g., "veteran in Texas looking for housing") and queries the database to ensure the search results are accurate and the links are live.
* **Output:** A **Health Report** flagging any stale data or incorrect eligibility mapping.

---

## 4. The Workflow (Data Lifecycle)

| Step | Component | Action | Result |
| :--- | :--- | :--- | :--- |
| **1** | **Backend Trigger** | API call defines search parameters (e.g., "Florida Grants"). | Process Initiated. |
| **2** | **Gathering Agent** | Scours the web for specific program details. | Raw text in session state. |
| **3** | **QA Agent** | Cleans text and enforces JSON formatting. | Clean JSON object. |
| **4** | **DB Agent** | Executes SQL commands to save to Cloud SQL. | Persistent record created. |
| **5** | **Testing Agent** | Verifies the record by "asking" about it. | Verified/Flagged status. |

---

## 5. Proposed SQL Database Schema

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Unique identifier for the program. |
| `program_name` | VARCHAR(255) | Official name of the assistance program. |
| `state_federal` | VARCHAR(50) | Scope of the program (e.g., Federal, CA, NY). |
| `category` | VARCHAR(100) | Housing, Food, Financial, Education, etc. |
| `eligibility_json` | JSONB | Detailed criteria (income limits, demographics). |
| `deadline` | DATE | Last date to apply (if applicable). |
| `source_url` | TEXT | Link to the official application page. |
| `last_updated` | TIMESTAMP | Last time the QA agent verified this entry. |

---

## 6. Security & Ethics
* **PII Masking:** Ensure the QA agent strips any sensitive personal info during the scraping phase.
* **Source Verification:** The Gathering agent is restricted to searching domains ending in `.gov`, `.edu`, or verified `.org` sites to prevent misinformation.

---