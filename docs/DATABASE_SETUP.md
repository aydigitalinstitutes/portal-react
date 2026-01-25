# Database Setup

This project uses PostgreSQL via a single `DATABASE_URL` connection string.

## Configuration Summary

### Database Details
- **Provider**: PostgreSQL (Neon/AWS/RDS/local are all supported)
- **SSL**: Required for managed providers (e.g., Neon)

### What Was Done

1. ✅ **Backend uses Prisma** with `DATABASE_URL`
2. ✅ **GitHub Secrets** should store `DATABASE_URL` and JWT secrets

## Testing the Connection

### Local Testing

1. Navigate to backend:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

3. You should see a Prisma connection message and the server running.

### If Connection Fails

- Check that your Neon database is active
- Verify firewall/network settings in Neon dashboard
- Ensure SSL is enabled (already configured in code)

## Next Steps

1. **Test the backend locally**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Create your first user** via the registration endpoint:
   ```bash
   POST http://localhost:5001/api/auth/register
   ```

3. **Set up remaining GitHub secrets** (if deploying):
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VITE_API_URL`

## Database Tables

Tables are managed by Prisma. Apply schema changes using `prisma db push` (or migrations if you introduce them).

## Security Notes

- ⚠️ The `.env` file is git-ignored (not committed)
- ✅ Database credentials are stored securely in GitHub Secrets
- ✅ SSL is required for all connections
- ✅ JWT secret is randomly generated and secure

## Connection String Format

If you need the connection string elsewhere:
```
postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require
```
