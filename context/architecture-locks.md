# Architecture Locks

## Immutable Architectural Decisions

These decisions are LOCKED. Changing any requires formal override documented in decision-log.md.

---

## Lock 1: Semantic-First Architecture

**Decision:** All structures MUST be semantic, not visual-only.

**Rationale:** Enables AI mutation, responsive generation, and long-term maintainability.

**What this means:**
- Every object has semantic metadata
- Every layout is structured hierarchy
- Every component is metadata-aware
- Cannot flatten to visual blobs

**Forbidden:**
- Flattened visual-only systems
- Unstructured canvas blobs
- Direct pixel manipulation

**Why locked:** Violating this breaks the entire AI orchestration and responsive engine.

---

## Lock 2: Mutation Engine as Single Source of Change

**Decision:** ALL changes pass through the mutation engine. No direct DOM, frontend state, or database mutations.

**Rationale:** Enables auditability, rollback, determinism, and AI safety.

**What this means:**
```
Intent → Mutation Planner → Validation → Constraint Engine → Mutation Engine → Audit Log → Render
```

**Forbidden:**
- Direct DOM manipulation
- Direct frontend state mutation
- Bypassing validation pipeline
- Circumventing audit logging

**Why locked:** Direct mutations destroy auditability and break rollback capability.

---

## Lock 3: Microservices Architecture (NOT Monorepo)

**Decision:** Each service gets isolated repository, isolated deployment, isolated scaling.

**Service List (Immutable):**
1. frontend-service
2. gateway-service
3. canvas-service
4. ai-orchestrator-service
5. llm-runtime-service
6. realtime-service
7. export-service
8. asset-service
9. template-service
10. auth-service
11. analytics-service

**Forbidden:**
- Monorepo structure
- Collapsing service boundaries
- Shared code packages (except contracts)
- Shared deployment manifests

**Why locked:** Service isolation enables independent scaling and prevents architecture collapse under pressure.

---

## Lock 4: AI Orchestration (NOT AI Generation)

**Decision:** AI acts as orchestrator + planner. AI NEVER directly edits canvas or generates uncontrolled output.

**What AI MUST do:**
- Interpret user intent
- Plan mutations
- Call approved tools only
- Generate structured operations
- Respect constraint validation

**What AI MUST NOT do:**
- Direct DOM manipulation
- Direct frontend state mutation
- Uncontrolled generation
- Bypass tool registry
- Execute arbitrary code

**Why locked:** Prevents hallucination, ensures determinism, maintains system safety.

---

## Lock 5: Local AI Runtime Requirement

**Decision:** System MUST support local LLM execution. Cannot depend solely on cloud APIs.

**Approved Runtimes:**
- Ollama
- vLLM
- llama.cpp

**Approved Models:**
- Qwen 2.5 Coder
- DeepSeek Coder
- Phi-4

**Forbidden:**
- Mandatory cloud AI dependency
- Tight coupling to external APIs
- Proprietary model lock-in

**Why locked:** Ensures operational independence and respects data privacy.

---

## Lock 6: Event-Driven Infrastructure

**Decision:** Async workflows via Redis Pub/Sub + BullMQ queues.

**Required Queue Types:**
- AI tasks (responsive generation, organization, analysis)
- Export tasks (PSD, SVG, PDF rendering)
- Asset tasks (optimization, compression, thumbnails)

**Forbidden:**
- Synchronous blocking calls for long tasks
- Polling loops instead of events
- Direct task execution without queue

**Why locked:** Enables scalability and prevents blocking cascades.

---

## Lock 7: Deterministic Systems

**Decision:** ALL automation MUST be repeatable and deterministic.

**What this means:**
- Same input → same output, always
- No probabilistic layout behavior
- No uncontrolled semantic drift
- Deterministic constraint resolution
- Seeded randomness when needed

**Forbidden:**
- Nondeterministic AI outputs
- Random layout generation
- Probabilistic mutation behavior
- Uncontrolled variation

**Why locked:** Makes the system debuggable, testable, and auditable.

---

## Lock 8: Storage Architecture

**PostgreSQL stores:**
- Metadata
- Semantic scene graphs
- Relationships
- Project structures
- Decision logs
- User data

**Cloudflare R2 stores:**
- Assets (images, uploads)
- Templates
- Screenshots
- Exports (PSD, SVG, PDF)
- Generated variants
- Snapshots

**Forbidden:**
- Large binaries in PostgreSQL
- Semantic data in R2
- Asset metadata duplication
- Unversioned exports

**Why locked:** Separates concerns, enables efficient scaling.

---

## Lock 9: Light Mode Only (UI)

**Decision:** Strict light mode. No dark mode.

**Visual Language:**
- Enterprise-modern
- Spatial
- Minimal
- Fast
- Keyboard-first
- Low-noise
- Highly structured

**Forbidden:**
- Dark mode
- Cluttered interfaces
- Heavy modals
- Inconsistent spacing
- Bloated interactions

**Why locked:** Maintains clear visual identity and consistent UX.

---

## Lock 10: Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- tldraw
- Framer Motion

**Backend:**
- Fastify or NestJS
- PostgreSQL
- Redis
- BullMQ

**Realtime:**
- Yjs
- Hocuspocus

**Infrastructure:**
- Docker
- Docker Compose
- Traefik
- KVM VPS

**Forbidden:**
- Alternative frameworks without override
- Dark mode tools
- Monolithic servers
- Non-containerized deployment

**Why locked:** Ensures consistency and team alignment.

---

## Lock Override Process

To change any locked decision:

1. Document override in decision-log.md with:
   - Lock ID (e.g., "Lock 2: Mutation Engine")
   - Date of change
   - Proposer
   - Detailed rationale
   - Approval signatures
2. Update this file with change timestamp
3. Notify team
4. Update all affected contexts

**Expectation:** Locks should rarely change. If changing multiple locks, re-evaluate entire architecture.

---

## Lock Status

| Lock | Status | Last Updated |
|------|--------|--------------|
| 1. Semantic-First | ACTIVE | 2026-05-16 |
| 2. Mutation Engine | ACTIVE | 2026-05-16 |
| 3. Microservices | ACTIVE | 2026-05-16 |
| 4. AI Orchestration | ACTIVE | 2026-05-16 |
| 5. Local AI Runtime | ACTIVE | 2026-05-16 |
| 6. Event-Driven | ACTIVE | 2026-05-16 |
| 7. Deterministic | ACTIVE | 2026-05-16 |
| 8. Storage | ACTIVE | 2026-05-16 |
| 9. Light Mode | ACTIVE | 2026-05-16 |
| 10. Tech Stack | ACTIVE | 2026-05-16 |
