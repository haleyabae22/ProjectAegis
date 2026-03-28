# Project Aegis

Basic fully functional schema for a React Native app that runs on:
- iOS
- Android
- Web

This setup uses Expo + TypeScript and includes:
- App shell and entrypoint
- Native stack navigation
- Shared state via React Context
- Example API service layer
- Reusable UI component

## Stack

- Expo
- React Native
- React Native Web
- TypeScript
- React Navigation

## Project Structure

```text
.
|- App.tsx
|- app.json
|- babel.config.js
|- package.json
|- tsconfig.json
|- .gitignore
`- src/
	|- components/
	|  `- StatusCard.tsx
	|- navigation/
	|  `- RootNavigator.tsx
	|- screens/
	|  |- HomeScreen.tsx
	|  `- SettingsScreen.tsx
	|- services/
	|  `- api.ts
	|- store/
	|  `- appStore.tsx
	`- theme/
		`- colors.ts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run start
```

3. Run on your target:

```bash
npm run android
npm run ios
npm run web
```

## Notes

- `src/services/api.ts` has a placeholder API base URL and simple fetch helper.
- `src/store/appStore.tsx` provides shared app state (`count`, `themeName`) and actions.
- The app is intentionally minimal and ready to extend.
