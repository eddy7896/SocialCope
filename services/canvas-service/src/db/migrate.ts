import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@postgres:5432/socialcope',
});

async function runMigrations() {
  const client = await pool.connect();

  try {
    // Create migrations tracking table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Find all migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

    for (const file of files) {
      // Check if already executed
      const result = await client.query('SELECT id FROM migrations WHERE name = $1', [file]);
      if (result.rows.length > 0) {
        console.log(`✓ Already executed: ${file}`);
        continue;
      }

      // Read and execute migration
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      console.log(`Executing: ${file}`);
      await client.query(sql);

      // Record migration
      await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
      console.log(`✓ Completed: ${file}`);
    }

    console.log('\n✓ All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations().catch((err) => {
  console.error(err);
  process.exit(1);
});
