import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './index';

// This will run migrations on the database, creating tables if they don't exist
// and updating them if they do
async function main() {
  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: './drizzle' });
  
  console.log('Migrations completed successfully!');
}

main().catch((e) => {
  console.error('Migration failed!');
  console.error(e);
  process.exit(1);
});