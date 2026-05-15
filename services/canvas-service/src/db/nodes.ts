import { query } from './connection';

export interface SemanticNode {
  id: string;
  project_id: string;
  type: 'section' | 'component' | 'text' | 'container' | 'media';
  semantic_role: string;
  label: string | null;
  properties: Record<string, unknown>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  parent_id: string | null;
  z_index: number;
  created_at: Date;
  updated_at: Date;
}

export async function listNodes(projectId: string): Promise<SemanticNode[]> {
  const result = await query<SemanticNode>(
    `SELECT id, project_id, type, semantic_role, label, properties, position, size, parent_id, z_index, created_at, updated_at
     FROM nodes WHERE project_id = $1 ORDER BY z_index ASC`,
    [projectId]
  );
  return result.rows;
}

export async function createNode(
  projectId: string,
  type: string,
  semanticRole: string,
  label?: string,
  properties?: Record<string, unknown>,
  position?: { x: number; y: number },
  size?: { width: number; height: number },
  parentId?: string
): Promise<SemanticNode> {
  const result = await query<SemanticNode>(
    `INSERT INTO nodes (project_id, type, semantic_role, label, properties, position, size, parent_id, z_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0)
     RETURNING id, project_id, type, semantic_role, label, properties, position, size, parent_id, z_index, created_at, updated_at`,
    [
      projectId,
      type,
      semanticRole,
      label || null,
      JSON.stringify(properties || {}),
      JSON.stringify(position || { x: 0, y: 0 }),
      JSON.stringify(size || { width: 100, height: 100 }),
      parentId || null,
    ]
  );
  return result.rows[0];
}

export async function getNode(id: string): Promise<SemanticNode | null> {
  const result = await query<SemanticNode>(
    `SELECT id, project_id, type, semantic_role, label, properties, position, size, parent_id, z_index, created_at, updated_at
     FROM nodes WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function updateNode(id: string, updates: Partial<SemanticNode>): Promise<SemanticNode | null> {
  const fields: string[] = [];
  const values: any[] = [id];
  let paramCount = 2;

  if (updates.label !== undefined) {
    fields.push(`label = $${paramCount++}`);
    values.push(updates.label);
  }
  if (updates.properties !== undefined) {
    fields.push(`properties = $${paramCount++}`);
    values.push(JSON.stringify(updates.properties));
  }
  if (updates.position !== undefined) {
    fields.push(`position = $${paramCount++}`);
    values.push(JSON.stringify(updates.position));
  }
  if (updates.size !== undefined) {
    fields.push(`size = $${paramCount++}`);
    values.push(JSON.stringify(updates.size));
  }
  if (updates.parent_id !== undefined) {
    fields.push(`parent_id = $${paramCount++}`);
    values.push(updates.parent_id);
  }
  if (updates.z_index !== undefined) {
    fields.push(`z_index = $${paramCount++}`);
    values.push(updates.z_index);
  }

  if (fields.length === 0) return getNode(id);

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  const result = await query<SemanticNode>(
    `UPDATE nodes SET ${fields.join(', ')} WHERE id = $1 RETURNING id, project_id, type, semantic_role, label, properties, position, size, parent_id, z_index, created_at, updated_at`,
    values
  );
  return result.rows[0] || null;
}

export async function deleteNode(id: string): Promise<boolean> {
  const result = await query('DELETE FROM nodes WHERE id = $1', [id]);
  return result.rowCount! > 0;
}
