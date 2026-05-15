# Storage Context

PostgreSQL, Cloudflare R2, data models, schema.

---

## PostgreSQL

**Stores:**
- Semantic scene graphs (projects, nodes, relationships)
- Metadata (user data, teams, projects)
- Audit logs (all changes)
- Decision logs (architecture history)

**Features:**
- JSONB for flexible metadata
- Relationships via foreign keys
- Full-text search on content
- ACID guarantees

---

## Cloudflare R2

**Stores:**
- Images (uploads, screenshots, references)
- Templates (JSON, CSS, design systems)
- Exports (PSD, SVG, PDF)
- Generated variants (responsive layouts)
- Snapshots (version history)

**Benefits:**
- Cheap object storage
- CDN-friendly
- Scalable
- Doesn't clog database

---

## Schema

See `/schemas/` folder for PostgreSQL DDL and JSON schemas.

---

## Key Files

- `postgres-spec.md` → PostgreSQL setup
- `r2-spec.md` → Cloudflare R2 usage
- `data-models.md` → Schema design

---

**Priority:** 5 | **Status:** Stub | **Last Updated:** 2026-05-16
