# Project Aegis Monorepo

Project Aegis is an assistance-discovery platform focused on helping users identify and track public benefit opportunities. The app combines a guided intake flow, a service analysis report, and an impact dashboard to make complex eligibility information understandable and actionable.

## Mission

Project Aegis aims to reduce unclaimed support by:

- Turning raw eligibility criteria into user-centered recommendations.
- Showing potential impact in clear financial and progress views.
- Providing a guided workflow from intake to outcomes tracking.

## Repository Overview

This repository is organized as a monorepo with frontend and backend areas:

- Root app: Active Expo application currently used for local development and runtime.
- frontend: Secondary frontend workspace/mirror used for branch-specific work and experiments.
- backend: Reserved area for API, auth, and data integration services.

## Top-Level Structure

```text
.
|- App.tsx
|- app.json
|- babel.config.js
|- package.json
|- tsconfig.json
|- vercel.json
|- src/
|  |- components/
|  |- contexts/
|  |- navigation/
|  |- screens/
|  |- services/
|  |- theme/
|  `- types/
|- frontend/
|  |- app.json
|  |- package.json
|  |- src/
|  |  |- navigation/
|  |  |- screens/
|  |  `- theme/
|  `- README.md
`- backend/
	 `- README.md
```

## Core Product Flow

1. Landing Screen
- User enters profile and financial inputs.

2. Service Analysis Report
- App displays matched programs and estimated value.

3. Impact Dashboard
- App visualizes progress and projected outcomes (charts and metrics).

4. User Profile
- User can review and edit saved profile preferences.

## Frontend Architecture (Root App)

### Entrypoint

- App.tsx
	- Initializes app providers.
	- Configures React Navigation container.
	- Persists and restores navigation state using AsyncStorage.

### State and Persistence

- src/contexts/ProfileContext.tsx
	- Stores user profile data in context.
	- Hydrates/saves profile with AsyncStorage.
- Navigation state persistence
	- Stored under PROJECT_AEGIS_NAVIGATION_STATE_V1.
	- Uses web reload detection to restore only on true refresh.

### Navigation

- src/navigation/AppNavigator.tsx
	- Home stack: Landing and Service Analysis Report.
	- Bottom tabs: Home, Impact Dashboard, Profile.
	- Shared styled headers and custom tab rendering.

### Screens

- src/screens/LandingScreen.tsx
- src/screens/ServiceAnalysisReportScreen.tsx
- src/screens/ImpactDashboardScreen.tsx
- src/screens/ProfileScreen.tsx

### Components

- Benefit and status UI cards and banners.
- Multiple chart renderers for impact analytics:
	- Cumulative area chart
	- Program bar chart
	- Outcome donut chart
	- Milestone funnel chart

### Services

- src/services/api.ts
	- Health endpoint check.
	- Profile analysis request for recommendations.
- src/services/impactApi.ts
	- Impact dashboard data provider (currently dummy data + network ping pattern).

## Design and UX Direction

Current UI direction emphasizes:

- Dark navy and gold visual identity.
- Data-forward cards and chart sections.
- Hover interactions on web for cards, banners, and key surfaces.
- Strong top navigation hierarchy for report, impact, and profile views.

## Local Development

From repository root:

```bash
npm install
npm run start
```

Other useful scripts:

```bash
npm run web
npm run android
npm run ios
npm run lint
npm run type-check
```

## Build and Deployment

- Web export:

```bash
npm run build:web
```

- vercel.json is present for web hosting configuration.

## Backend Workspace

The backend folder is intentionally minimal and reserved for future API expansion:

- Authentication/session ownership
- Recommendation engines
- Persistent user/account storage
- Production-grade analytics endpoints

## Working Model for This Repo

Because both root and frontend workspaces exist, contributors should always confirm which app is the active runtime target before making UI changes.

Recommended practice:

- Treat root app as primary unless intentionally developing in frontend workspace.
- Keep critical navigation and screen behavior aligned when mirrored files are required.

## Roadmap Suggestions

- Introduce environment-based API configuration (dev/stage/prod).
- Add backend profile persistence for cross-device sync.
- Add automated tests for navigation state restoration and profile hydration.
- Consolidate duplicate frontend surfaces when branch strategy is finalized.
1. cd backend
2. python/python3 -m venv .venv
3. source python/.venv/bin/activate
4. pip install -r requirements.txt
5. uvicorn main:app --host 127.0.0.1 --port 8000 --reload
