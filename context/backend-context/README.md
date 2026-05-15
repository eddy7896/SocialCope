# Backend Context

Backend services: Fastify/NestJS, PostgreSQL, business logic, API design.

---

## Stack

- **API Framework:** Fastify or NestJS
- **Database:** PostgreSQL (semantic scene graphs)
- **Cache:** Redis (sessions, cache)
- **Job Queue:** BullMQ (async jobs)
- **Language:** TypeScript (strict mode)

---

## Architecture

**Service Layer Pattern:**
- Controllers (HTTP endpoints)
- Services (business logic)
- Repositories (database access)
- Events (async notifications)

**Database:**
- Semantic scene graph schema
- Relationship tables
- Audit logs
- User/team/permission tables
- Project metadata

**APIs:**
- REST endpoints with OpenAPI specs
- Event-driven for async operations
- Versioned (v1, v2, etc.)
- Contracts defined in `contracts/`

---

## Key Responsibilities

- Scene graph management (create, read, update, delete)
- Mutation validation and execution
- User authentication and authorization
- Project access control
- Audit logging
- Event publishing

---

## Key Files

- `api-design.md` — API design patterns
- `service-patterns.md` — Service layer patterns
- `database-schema.md` — PostgreSQL schema
- `repositories.md` — Data access patterns

---

## Related Contexts

- [[service-context/]] — Service boundaries
- [[mutation-engine-context/]] — Mutation execution
- [[event-system-context/]] — Event publishing
- [[storage-context/]] — Database and R2 storage
- [[contracts/]] — API contracts

---

**Priority:** 3 | **Status:** Stub | **Last Updated:** 2026-05-16
