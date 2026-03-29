# Project Aegis Frontend Workspace

This folder contains a frontend-focused workspace for Project Aegis. It is used for UI and navigation iteration and can be developed independently from the root app workflow when needed.

## Purpose

The frontend workspace supports:

- Rapid screen and navigation iteration.
- Visual and layout tuning for web/mobile presentation.
- Branch-specific experimentation before promoting changes to the primary app surface.

## Current Scope

At present, this workspace includes:

- Navigation configuration
- Core screen surfaces (partial set)
- Theme tokens

It does not currently include the full root-level feature stack (for example, contexts/services are not mirrored one-to-one here).

## Structure

```text
frontend/
|- app.json
|- babel.config.js
|- package.json
|- tsconfig.json
|- vercel.json
|- assets/
`- src/
   |- navigation/
   |  `- AppNavigator.tsx
   |- screens/
   |  |- LandingScreen.tsx
   |  `- ProfileScreen.tsx
   `- theme/
      |- colors.ts
      `- typography.ts
```

## Navigation and UI Notes

- Uses React Navigation with custom tab rendering.
- Header styles follow the dark navy + gold visual direction.
- Tab labels/icons are tuned for Home, Impact, and Profile user paths.
- Header/title layout values are controlled in src/navigation/AppNavigator.tsx.

## Run Locally

From this folder:

```bash
npm install
npm run start
```

Other scripts:

```bash
npm run web
npm run android
npm run ios
npm run lint
```

## Relationship to Root App

Project Aegis currently has two frontend surfaces in the repo:

- Root app (primary runtime path)
- frontend workspace (secondary branch/workstream path)

When shipping user-facing behavior, confirm where the app is being launched from and keep intended files synchronized.

## Recommended Workflow

1. Decide target runtime (root app or frontend workspace).
2. Implement and verify UI changes in that target.
3. Mirror critical updates when both paths must remain aligned.
4. Run lint/type-check in the target workspace before merge.

## Future Improvements

- Add parity checklist versus root app screens/components.
- Add dedicated frontend-only entrypoint documentation if this workspace becomes primary.
- Add component-level test coverage for navigation and header layout behavior.
