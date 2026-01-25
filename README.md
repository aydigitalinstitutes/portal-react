# AY Digital Institute

Full-stack platform containing:
- **Public Website**: Modern React + Vite application (`src/`)
- **Admin Portal**: Dedicated dashboard for management (`admin/`)
- **Backend API**: Scalable NestJS service (`api/`)

## Architecture Overview

### 1. Backend (`api/`)
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT, OAuth (Google/GitHub), RBAC
- **Docs**: Swagger/OpenAPI at `/api/docs`
- **Logging**: Winston
- **Testing**: Jest (Unit & E2E)

### 2. Frontend (`src/`)
- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS
- **State**: Context API
- **Testing**: Vitest + React Testing Library

### 3. Admin Portal (`admin/`)
- **Framework**: React 18 + Vite (TypeScript)
- **Features**: User management, Content management, Analytics
- **Charts**: Recharts
- **Testing**: Vitest

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL
- Redis (optional, for caching)

### Installation
```bash
# Install root dependencies (and Husky hooks)
npm install

# Install sub-project dependencies
npm -C api install
npm -C admin install
```

### Development
```bash
# Run all services (requires configured .env files)
npm run dev

# Run individual services
npm -C api run start:dev
npm -C admin run dev
```

### Docker Support
Each service includes a `Dockerfile` for containerized deployment.
```bash
docker-compose up -d --build
```

## Quality Assurance
- **Linting**: ESLint + Prettier (enforced via Husky pre-commit hooks)
- **Testing**:
  - API: `npm -C api run test`
  - Web: `npm run test`
  - Admin: `npm -C admin run test`

## Documentation
- [Architecture Refactor](./docs/ARCHITECTURE_REFACTOR.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Database Setup](./docs/DATABASE_SETUP.md)

