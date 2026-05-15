import { query } from './connection';

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function listProjects(userId: string): Promise<Project[]> {
  const result = await query<Project>(
    'SELECT id, owner_id, name, description, created_at, updated_at FROM projects WHERE owner_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function createProject(userId: string, name: string, description?: string): Promise<Project> {
  const result = await query<Project>(
    'INSERT INTO projects (owner_id, name, description) VALUES ($1, $2, $3) RETURNING id, owner_id, name, description, created_at, updated_at',
    [userId, name, description || null]
  );
  return result.rows[0];
}

export async function getProject(id: string): Promise<Project | null> {
  const result = await query<Project>(
    'SELECT id, owner_id, name, description, created_at, updated_at FROM projects WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function deleteProject(id: string): Promise<boolean> {
  const result = await query('DELETE FROM projects WHERE id = $1', [id]);
  return result.rowCount! > 0;
}

export async function updateProject(id: string, name?: string, description?: string): Promise<Project | null> {
  const fields: string[] = [];
  const values: any[] = [id];
  let paramCount = 2;

  if (name !== undefined) {
    fields.push(`name = $${paramCount++}`);
    values.push(name);
  }
  if (description !== undefined) {
    fields.push(`description = $${paramCount++}`);
    values.push(description);
  }

  if (fields.length === 0) return getProject(id);

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  const result = await query<Project>(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = $1 RETURNING id, owner_id, name, description, created_at, updated_at`,
    values
  );
  return result.rows[0] || null;
}
