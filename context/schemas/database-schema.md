# Database Schema

PostgreSQL semantic database for socialCOPE.

---

## users

User accounts and authentication.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| email | VARCHAR(255) | UNIQUE NOT NULL | unique email per user |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hash, cost=12 |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |
| updated_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

---

## projects

Canvases/workspaces.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| owner_id | UUID | FOREIGN KEY (users) | who owns it |
| name | VARCHAR(255) | NOT NULL | project name |
| description | TEXT | | optional description |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |
| updated_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

**Indexes:**
- owner_id

---

## nodes

Semantic elements in scene graph.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| project_id | UUID | FOREIGN KEY (projects) | which project |
| type | VARCHAR(50) | CHECK IN (section, component, text, container, media) | semantic type |
| semantic_role | VARCHAR(255) | NOT NULL | role/purpose (header, footer, etc.) |
| label | VARCHAR(255) | | display name |
| properties | JSONB | DEFAULT '{}' | arbitrary metadata |
| position | JSONB | DEFAULT '{"x":0,"y":0}' | {x, y} coordinates |
| size | JSONB | DEFAULT '{"width":100,"height":100}' | {width, height} in pixels |
| parent_id | UUID | FOREIGN KEY (nodes) | parent node (hierarchy) |
| z_index | INTEGER | DEFAULT 0 | stacking order |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |
| updated_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

**Indexes:**
- project_id
- parent_id

---

## relationships

Connections between nodes (parent-child, sibling, etc).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| project_id | UUID | FOREIGN KEY (projects) | which project |
| source_id | UUID | FOREIGN KEY (nodes) | from node |
| target_id | UUID | FOREIGN KEY (nodes) | to node |
| type | VARCHAR(50) | NOT NULL | relationship type |
| metadata | JSONB | DEFAULT '{}' | relationship properties |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

**Indexes:**
- project_id
- source_id
- target_id

---

## constraints

Design rules per node (min width, etc).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| node_id | UUID | FOREIGN KEY (nodes) | which node |
| constraint_type | VARCHAR(100) | NOT NULL | type of constraint |
| value | JSONB | NOT NULL | constraint value |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

**Indexes:**
- node_id

---

## metadata

Arbitrary key-value metadata per node.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| node_id | UUID | FOREIGN KEY (nodes) | which node |
| key | VARCHAR(255) | NOT NULL | metadata key |
| value | TEXT | NOT NULL | metadata value |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

**Constraints:**
- UNIQUE (node_id, key) — one value per key per node

**Indexes:**
- node_id

---

## audit_logs

Complete change history. Every mutation logged.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PRIMARY KEY | auto-generated |
| project_id | UUID | FOREIGN KEY (projects) | which project |
| node_id | UUID | FOREIGN KEY (nodes) | which node (null if project-level) |
| user_id | UUID | FOREIGN KEY (users) | who made change |
| operation | VARCHAR(50) | CHECK IN (CREATE, UPDATE, DELETE, MOVE) | what happened |
| before_state | JSONB | | state before change |
| after_state | JSONB | | state after change |
| created_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | UTC |

**Indexes:**
- project_id
- user_id
- node_id
- created_at

**Purpose:** Complete audit trail for compliance, undo/redo, and deterministic replay.

---

## migrations

Internal table tracking which migrations have been applied.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | SERIAL | PRIMARY KEY | auto-increment |
| name | VARCHAR(255) | UNIQUE NOT NULL | migration filename |
| executed_at | TIMESTAMP TZ | DEFAULT CURRENT_TIMESTAMP | when applied |

---

## Normalization

- **3NF**: All tables follow third normal form
- **JSONB**: Complex structures stored in JSONB (properties, position, size, metadata) for flexibility
- **UUID**: All IDs use UUID for distributed system compatibility
- **Timestamps**: All timestamps in UTC with timezone
- **Foreign Keys**: Cascading deletes where appropriate
