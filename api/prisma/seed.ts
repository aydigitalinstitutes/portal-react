import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const main = async () => {
  // Existing admin
  const defaultAdminEmail = 'admin@aydigital.com';
  const existingDefault = await prisma.user.findUnique({ where: { email: defaultAdminEmail } });

  if (!existingDefault) {
    await prisma.user.create({
      data: {
        email: defaultAdminEmail,
        name: 'Default Admin',
        role: 'ADMIN',
        provider: 'LOCAL',
        passwordHash: await bcrypt.hash('admin123', 10),
      },
    });
    console.log(`Created default admin: ${defaultAdminEmail}`);
  }

  // New requested admin
  const requestedAdminEmail = 'admin@admin.com';
  const existingRequested = await prisma.user.findUnique({ where: { email: requestedAdminEmail } });

  if (!existingRequested) {
    await prisma.user.create({
      data: {
        email: requestedAdminEmail,
        name: 'System Admin',
        role: 'ADMIN',
        provider: 'LOCAL',
        passwordHash: await bcrypt.hash('admin123', 10),
      },
    });
    console.log(`Created requested admin: ${requestedAdminEmail}`);
  } else {
    console.log(`Admin ${requestedAdminEmail} already exists`);
  }
};

main()
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

