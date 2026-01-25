# Architecture Refactor Summary

This document explains the repo cleanup and restructuring performed to remove redundant code, standardize layout, and keep builds/tests stable.

## Before → After (High-Level)

### Before
- Public website source lived under `frontend/` with a mixed layout (`frontend/App.jsx`, `frontend/main.jsx`, plus `frontend/src/lib/*`).
- Backend contained two parallel implementations:
  - Legacy JS/Sequelize (`backend/server.js`, `backend/models`, `backend/routes`, `backend/config`, etc.)
  - New TS/Prisma server (`backend/src/*`)
- Config files referenced `frontend/*` and legacy DB env vars (`DB_HOST`, etc.).

### After
- Public website source is standardized to `src/` (Vite entry: `src/main.jsx`).
- Backend keeps the TS/Prisma implementation only (`backend/src/*`).
- CI/CD workflows, docs, and configs are updated to current paths and env vars.

## Current Structure

```
aydigital/
├── src/                 # Public website (Vite)
├── admin/               # Admin dashboard (Vite)
├── backend/             # Express API (TypeScript + Prisma)
├── api/                 # NestJS API (Prisma + Redis + JWT + OAuth)
├── docs/                # Documentation
├── nginx/               # Nginx reverse proxy example
└── docker-compose.yml   # Postgres/Redis/API example
```

## What Was Removed (and Why)

### Removed Legacy Backend (Sequelize)
The following were deleted because they were unused duplicates of the Prisma/TS backend:
- `backend/server.js`
- `backend/config/`
- `backend/models/`
- `backend/routes/`
- `backend/middleware/`
- `backend/utils/`
- `backend/database.sql`

### Dependency Cleanup (Backend)
Removed unused backend dependencies tied to the legacy stack:
- `sequelize`
- `redis`
- `ioredis`
- `nodemailer`
- `express-validator`

## Key Config Updates

### Website (root)
- `index.html`: entry updated to `src/main.jsx`
- `vite.config.js`: alias `@` now maps to `./src`
- `tsconfig.json`: includes `src` and maps `@/*` to `./src/*`
- `tailwind.config.js`: content paths updated to `./src/**/*`
- Added root `.env.example` for `VITE_API_URL`

### Backend (Express)
- `backend/package.json`: `start` now runs `node dist/src/server.js`
- `.github/workflows/*`: updated to Prisma/`DATABASE_URL` and removed Sequelize assumptions

## Developer Instructions (Updated)

### Public Website
```bash
npm install
npm run dev
```

### Admin
```bash
npm -C admin install
npm -C admin run dev
```

### Express Backend
```bash
npm -C backend install
npm -C backend run dev
```

### NestJS API
```bash
npm -C api install
npm -C api run prisma:generate
npm -C api run start:dev
```

## Validation
- Root website build passes (`npm run build`)
- Admin build passes (`npm -C admin run build`)
- Express backend build passes (`npm -C backend run build`)
- NestJS API build + unit tests + e2e + coverage passes (`npm -C api run test:cov`, `npm -C api run test:e2e`)

