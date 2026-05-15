import { query } from './connection';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export async function findByEmail(email: string): Promise<User | null> {
  const result = await query<User>(
    'SELECT id, email, password_hash, created_at, updated_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function findById(id: string): Promise<User | null> {
  const result = await query<User>(
    'SELECT id, email, password_hash, created_at, updated_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  const result = await query<User>(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash, created_at, updated_at',
    [email, passwordHash]
  );
  return result.rows[0];
}

export async function userExists(email: string): Promise<boolean> {
  const result = await query<{ count: string }>(
    'SELECT COUNT(*) as count FROM users WHERE email = $1',
    [email]
  );
  return parseInt(result.rows[0].count) > 0;
}
