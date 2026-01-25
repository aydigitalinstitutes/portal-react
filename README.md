# AY Digital Institute

Full-stack repo containing:
- Public website (Vite + React)
- Admin dashboard (Vite + React)
- Backend APIs (Express + Prisma, and a separate NestJS API)

## Project Structure

```
aydigital/
├── src/              # Public website source (Vite entry: src/main.jsx)
├── admin/            # Admin frontend (Vite)
├── backend/           # Express API (Prisma)
├── api/              # NestJS API (Prisma + Redis + JWT + OAuth)
├── docs/             # Documentation
├── nginx/            # Reverse proxy example config
└── docker-compose.yml
```

## Features

### Frontend
- ✅ Responsive React website
- ✅ User Authentication (Login/Register)
- ✅ Protected Routes
- ✅ Dashboard for logged-in users
- ✅ 22 Courses with NIELIT certifications
- ✅ Contact form
- ✅ WhatsApp floating button
- ✅ Smooth animations

### Backend
- ✅ RESTful API with Express.js
- ✅ JWT Authentication
- ✅ User Registration & Login
- ✅ Protected API routes
- ✅ PostgreSQL database
- ✅ User profile management

## Setup Instructions

### Public Website (root)

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in repo root:
```env
VITE_API_URL=http://localhost:5001/api
```

3. Start development server:
```bash
npm run dev
```

### Express Backend (`backend/`)

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Create `.env` from example and set `DATABASE_URL` and JWT secrets.

5. Create PostgreSQL database:
```sql
CREATE DATABASE aydigital;
```

5. Start backend server:
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

## API Endpoints

### Express Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Admin (Express)
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`

### NestJS API
- Versioned under `/api/v1/*`
- Health and metrics: `GET /health`, `GET /metrics`

## Frontend Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (Protected)

## Technologies

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Vite
- React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL (Prisma ORM)
- JWT (jsonwebtoken)
- bcryptjs

## Development

Run both frontend and backend simultaneously:

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```

## GitHub Actions CI/CD

This project includes GitHub Actions workflows for automated CI/CD:

> 📖 **Quick Setup:** See [SETUP_SECRETS.md](./docs/SETUP_SECRETS.md) for detailed instructions on setting up GitHub secrets.

### Available Workflows
- **CI/CD Pipeline**: Automated testing, building, and frontend deployment
- **Database Migration**: Run database schema updates
- **Backend Deployment**: Deploy backend to staging/production
- **Database Backup**: Automated daily backups (runs at 2 AM UTC)

### Setup GitHub Actions Secrets

Go to your repository → Settings → Secrets and variables → Actions, and add:

**Frontend:**
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `VITE_API_URL` - Production API URL

**Backend/Database:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Access token signing secret
- `REFRESH_TOKEN_SECRET` - Refresh token signing secret

**Database Backup (Optional):**
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

See `.github/README.md` for detailed workflow documentation.

## Production Deployment

### Frontend
- Build: `npm run build`
- Deploy to Vercel/Netlify
- GitHub Actions will auto-deploy on push to main branch

### Backend
- Deploy to Heroku/Railway/Render
- Set environment variables
- Connect PostgreSQL database (local or cloud like Supabase, Neon, etc.)
- Use GitHub Actions workflow for automated deployment

## License

This project is created for AY Digital Institute.
