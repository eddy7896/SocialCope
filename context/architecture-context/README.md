# Architecture Context

System architecture, service topology, data flows, and design patterns.

---

## Overview

socialCOPE is a distributed system of 11 microservices communicating via REST APIs and async events.

**Service Topology:**
```
Internet → Traefik (reverse proxy) → Gateway Service → [Canvas, AI, Export, Asset, Realtime, etc.]
                                      └─ Auth Service
```

**Data Flow:**
```
Frontend UI → Gateway → Canvas Service (mutations) → Mutation Engine → PostgreSQL/R2
                     ↓
              Event System → [Export, AI, Analytics] workers
```

---

## Core Architecture Principles

1. **Semantic-First** — All data is hierarchical and metadata-aware
2. **Mutation-Driven** — Single path for all changes
3. **Modular** — 11 independent services
4. **Event-Driven** — Async via Pub/Sub and queues
5. **Scalable** — Services scale independently
6. **Deterministic** — Same input → same output

See [[architecture-locks.md]] for locked decisions.

---

## 11 Services

| Service | Role | Stack | Responsibility |
|---------|------|-------|-----------------|
| **frontend-service** | UI layer | Next.js, tldraw | Rendering, interaction, WebSocket client |
| **gateway-service** | Entry point | Fastify/NestJS | Auth, routing, API aggregation |
| **canvas-service** | Core data | Fastify, PostgreSQL | Scene graph, mutations, sync |
| **ai-orchestrator-service** | AI control | NestJS, local LLM | Intent, planning, tool calling |
| **llm-runtime-service** | AI inference | Ollama/vLLM | Model execution |
| **realtime-service** | Collaboration | Hocuspocus | Presence, cursor sync, CRDT |
| **export-service** | Output | Puppeteer, ag-psd | PSD, SVG, PDF rendering |
| **asset-service** | File storage | Node.js, R2 | Upload, optimization, CDN |
| **template-service** | Design patterns | Node.js, R2 | Templates, recipes, presets |
| **auth-service** | Authentication | NestJS, JWT | Login, tokens, permissions |
| **analytics-service** | Insights | Node.js, PostgreSQL | Events, metrics, usage |

---

## Communication Patterns

### REST APIs
- Synchronous request/response
- Services publish OpenAPI specs
- Version APIs for compatibility
- See `contracts/` for specifications

### Events (Pub/Sub)
- Real-time notifications
- Example: `canvas.mutation.created`, `export.job.queued`
- Multiple listeners per event
- See `event-system-context/` for schema

### Job Queues (BullMQ)
- Durable async processing
- Long-running tasks (export, optimization)
- Observable, retryable
- See `queue-system-context/` for details

---

## Data Model

### PostgreSQL
- Projects (metadata)
- Scene graphs (hierarchy)
- Users, teams, permissions
- Audit logs
- Decision logs

### Cloudflare R2
- Images, uploads
- Templates, CSS
- Exports (PSD, SVG, PDF)
- Generated variants
- Snapshots

### Redis
- Session cache
- Queue persistence
- Pub/Sub messages
- Presence state

---

## Deployment Topology

```
Internet
   ↓
Traefik (port 80/443, SSL termination)
   ↓
┌──────────────────────────────────┐
│   Gateway Service (auth + routing) │
├──────────────────────────────────┤
│   Frontend Service (Next.js)      │
│   Canvas Service (PostgreSQL)     │
│   AI Orchestrator (local LLM)     │
│   Realtime Service (Hocuspocus)   │
│   Export Service (Puppeteer)      │
│   Asset Service (R2)              │
│   Analytics Service               │
└──────────────────────────────────┘
   ↓           ↓           ↓
PostgreSQL   Redis      R2 Storage
```

---

## Mutation Flow

```
User Action / AI Command
    ↓
Frontend sends intent to Canvas Service
    ↓
Canvas mutation endpoint receives request
    ↓
Mutation Planner validates intent
    ↓
Constraint Validator checks rules
    ↓
Mutation Engine executes
    ↓
Change persisted to PostgreSQL
    ↓
Event published ("canvas.mutation.created")
    ↓
Export Service, AI, Analytics listen → React
    ↓
Frontend receives WebSocket update
    ↓
Canvas re-renders
```

---

## Scaling Strategy

**Horizontal Scaling:**
- Frontend: Multiple Next.js replicas
- Canvas: Stateless, multiple instances with load balancing
- Export: Multiple workers for PSD/SVG jobs
- AI: Multiple Ollama instances for inference

**Vertical Scaling:**
- PostgreSQL: Connection pooling, replication
- Redis: Sharding if needed
- R2: Automatic scaling (managed by Cloudflare)

**Database Optimization:**
- Indexing on frequently queried columns
- CRDT for conflict-free collaboration
- Audit log archival for old data
- Snapshot strategy for large scene graphs

---

## Key Files

- `spec.md` — Detailed architecture specification
- `service-topology.md` — Visual service diagram
- `data-flow.md` — Data flow diagrams
- [[service-context/]] — Individual service details
- [[infrastructure-context/]] — Docker and deployment
- [[event-system-context/]] — Event specifications

---

## Related Contexts

- [[mutation-engine-context/]] — How changes flow
- [[semantic-engine-context/]] — Data structures
- [[ai-system-context/]] — AI layer
- [[service-context/]] — Individual services
- [[infrastructure-context/]] — Deployment
- [[event-system-context/]] — Async communication

---

## Status

- **Locked:** Yes (architecture-locks.md)
- **Priority:** 2
- **Last Updated:** 2026-05-16

---

**Read this first when:** Understanding overall system design  
**Read decision-log.md for:** Why architecture decisions were made
