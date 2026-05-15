# Contracts

Service APIs, event schemas, data contracts.

---

## API Contracts

OpenAPI/REST specifications for each service.

- `gateway-api.md` — Gateway service endpoints
- `canvas-api.md` — Canvas service endpoints
- `export-api.md` — Export service endpoints
- etc.

Each specifies:
- Endpoints
- HTTP methods
- Request/response schemas
- Error codes
- Versioning

---

## Event Contracts

Event schemas and message formats.

- `canvas-events.md` — Canvas-related events
- `user-events.md` → User-related events
- `export-events.md` → Export workflow events

Each specifies:
- Event name
- Payload schema
- Subscribers
- Retention

---

## Data Contracts

Shared data formats between services.

- `semantic-node-contract.md` → Scene graph node structure
- `mutation-contract.md` → Mutation format
- `user-contract.md` → User data format

---

**Status:** Pending implementation | **Last Updated:** 2026-05-16
