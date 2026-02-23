import 'dotenv/config';
import { pool } from './client';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';

async function runMigrations() {
  const db = drizzle(pool);
  console.log('Running migrations…');
  await migrate(db, { migrationsFolder: path.join(__dirname, '../../drizzle') });
  console.log('✓ Migrations complete');
  await pool.end();
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
