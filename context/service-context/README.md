# Service Context

11 independent microservices, their responsibilities, APIs, and boundaries.

---

## Services Overview

| Service | Purpose | Owner |
|---------|---------|-------|
| frontend-service | UI, canvas rendering, user interaction | Frontend team |
| gateway-service | Auth, routing, API aggregation | Backend team |
| canvas-service | Scene graph, mutations, realtime sync | Canvas team |
| ai-orchestrator-service | Intent, planning, tool calling | AI team |
| llm-runtime-service | Local LLM inference (Ollama/vLLM) | Infrastructure |
| realtime-service | Presence, cursor sync, CRDT (Yjs) | Realtime team |
| export-service | PSD, SVG, PDF rendering and export | Export team |
| asset-service | Upload, optimization, CDN (R2) | Asset team |
| template-service | Design templates, recipes, automation | Design team |
| auth-service | Authentication, tokens, permissions | Security team |
| analytics-service | Events, metrics, usage tracking | Data team |

---

## Service Boundaries

**Frontend service** owns: UI, interaction, rendering. NOT canvas logic.

**Canvas service** owns: Scene graph, mutations, persistence. NOT rendering.

**Gateway service** owns: Auth, routing, API aggregation. NOT business logic.

**AI Orchestrator** owns: Intent, planning, tool calling. NOT direct execution.

**Each service** owns: Own code, own deployment, own database, own scaling.

---

## Communication

- **REST APIs** → Synchronous request/response. OpenAPI specs in `contracts/`
- **Events** → Async notifications via Redis Pub/Sub. See `event-system-context/`
- **Queues** → Durable jobs via BullMQ. See `queue-system-context/`
- **NO direct imports** between services
- **NO shared databases** except read-only replicas for specific patterns

---

## Key Files

- `service-list.md` — Detailed service descriptions
- `boundaries.md` — Service boundary definitions
- `communication-matrix.md` — Who talks to whom
- Individual service context folders (coming soon)

---

## Related Contexts

- [[architecture-context/]] — Overall system architecture
- [[event-system-context/]] — How services communicate
- [[queue-system-context/]] — Job processing
- [[contracts/]] — Service APIs and events
- Individual service contexts: frontend, backend, etc.

---

**Priority:** 3 | **Status:** Stub | **Last Updated:** 2026-05-16
