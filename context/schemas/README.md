# Schemas

Database schemas, JSON schemas, validation rules.

---

## PostgreSQL Schemas

SQL DDL for database tables.

- `projects.sql` — Project metadata
- `nodes.sql` — Scene graph nodes
- `relationships.sql` → Node relationships
- `audit_logs.sql` → Change history
- `users.sql` → User data
- `templates.sql` → Template storage

---

## JSON Schemas

JSON Schema specifications for validation.

- `semantic-node.schema.json` → Scene graph node
- `mutation.schema.json` → Mutation format
- `event.schema.json` → Event message format
- `user.schema.json` → User data

---

## Validation Rules

Rules for data integrity.

- Constraints (min/max sizes, required fields)
- Uniqueness (no duplicate IDs)
- References (foreign key integrity)
- Format (email, URL, etc.)

---

**Status:** Pending implementation | **Last Updated:** 2026-05-16
