# KOAH EGZERSİZ - Replit Agent Guide

## Overview

KOAH EGZERSİZ is a mobile application built for COPD (Chronic Obstructive Pulmonary Disease) patients, providing guided breathing and physical exercises. The app is built with Expo/React Native for the frontend and Express.js for the backend API server. It features a welcome/onboarding screen, a dashboard hub, an exercise library with category filtering, and individual exercise detail screens with step-by-step instructions. The app name and all UI content is in Turkish.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (Expo/React Native)
- **Framework**: Expo SDK 54 with React Native 0.81, using the new architecture (`newArchEnabled: true`)
- **Routing**: File-based routing via `expo-router` v6 with typed routes. Routes live in the `app/` directory:
  - `app/index.tsx` — Welcome/onboarding screen (full-screen gradient, no header)
  - `app/dashboard.tsx` — Main hub with 2x2 navigation card grid
  - `app/exercises.tsx` — Exercise library with category filtering (Nefes, Güçlendirme, Esneme, Rahatlama)
  - `app/exercise/[id].tsx` — Exercise detail with steps and completion modal
- **State Management**: React Query (`@tanstack/react-query`) for server state; local `useState` for UI state
- **Styling**: React Native `StyleSheet` with a centralized color constants file at `constants/colors.ts`
- **Fonts**: Inter font family (400, 500, 600, 700 weights) via `@expo-google-fonts/inter`
- **UI Libraries**: `expo-haptics` for tactile feedback, `expo-linear-gradient` for gradients, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`
- **Data**: Exercise data is currently stored as local mock data in `data/exercises.ts` with typed interfaces. Each exercise has id, title, category, duration, steps, and placeholder image info.
- **Components**: Reusable components in `components/` including `AppHeader` (consistent teal header bar with navigation), `ErrorBoundary`, `ErrorFallback`, and `KeyboardAwareScrollViewCompat`

### Backend (Express.js)
- **Runtime**: Node.js with TypeScript (compiled via `tsx` in dev, `esbuild` for production)
- **Framework**: Express v5
- **API Pattern**: Routes registered in `server/routes.ts`, prefixed with `/api`. Currently minimal — the backend is mostly a scaffold ready for expansion.
- **CORS**: Configured to allow Replit dev/deployment domains and localhost origins for Expo web development
- **Storage Layer**: Abstracted via `IStorage` interface in `server/storage.ts`. Currently uses in-memory storage (`MemStorage`) with a Map-based user store. Designed to be swapped to a database-backed implementation.
- **Static Serving**: In production, serves pre-built Expo web static files. Has a landing page template for when no static build exists.

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` — currently has a `users` table with `id` (UUID), `username`, and `password`
- **Validation**: Zod schemas generated from Drizzle schema via `drizzle-zod`
- **Migrations**: Output to `./migrations` directory, managed via `drizzle-kit push` command
- **Connection**: Uses `DATABASE_URL` environment variable for PostgreSQL connection
- **Note**: The database is configured but the app primarily uses local mock data for exercises. The storage layer currently uses in-memory storage rather than Drizzle/Postgres.

### Build & Development
- **Dev workflow**: Two parallel processes — `expo:dev` for the Expo dev server and `server:dev` for the Express API
- **Production build**: Expo web static build via custom `scripts/build.js`, Express server bundled with esbuild
- **Proxy**: Uses `http-proxy-middleware` in the Express server to proxy to Expo's Metro bundler during development
- **Orientation**: Portrait only (`"orientation": "portrait"` in app.json)

## External Dependencies

- **PostgreSQL**: Database (via `DATABASE_URL` environment variable), used with Drizzle ORM. Required for the `db:push` command and production data persistence.
- **Expo Services**: Expo SDK for native capabilities (haptics, splash screen, image picker, location, etc.)
- **Google Fonts**: Inter font family loaded via `@expo-google-fonts/inter`
- **React Query**: Client-side server state management and caching
- **Replit Environment**: The app is designed to run on Replit, using `REPLIT_DEV_DOMAIN`, `REPLIT_DOMAINS`, and `REPLIT_INTERNAL_APP_DOMAIN` environment variables for URL configuration and CORS