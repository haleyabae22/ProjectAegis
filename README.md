# Project Aegis Monorepo

This repository is organized for parallel frontend and backend development.

## Top-level structure

- frontend: Expo React Native app (web + iOS + Android)
- backend: API/service code owned by backend team

## Frontend quick start

1. cd frontend
2. npm install
3. npm run start

## Frontend build commands

- npm run web
- npm run build:web

## Backend quick start

1. cd backend
2. python/python3 -m venv .venv
3. source python/.venv/bin/activate
4. pip install -r requirements.txt
5. uvicorn main:app --host 127.0.0.1 --port 8000 --reload
