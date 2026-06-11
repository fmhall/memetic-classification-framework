import path from 'path';
import fs from 'fs';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const dbPath = path.join(process.cwd(), 'memes.db');
if (!fs.existsSync(dbPath)) {
  throw new Error(`SQLite database not found at ${dbPath} — run from frontend/ (bun run dev) after seeding (bun run db:seed)`);
}
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

// Export schema for use in other files
export * from './schema';
