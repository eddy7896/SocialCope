# Terminology Registry

Canonical definitions of key terms. Use these exact definitions in all contexts.

---

## Core Platform Terms

### socialCOPE
**Definition:** Create Once, Publish Everywhere. Internal AI-assisted semantic visual operating system for easyio technologies.

**Scope:** Rapid UI ideation, design automation, workflow acceleration, collaborative planning.

**NOT:** Figma competitor, generic design tool, public-facing platform.

---

## Architectural Terms

### Semantic Structure
**Definition:** Data structure that preserves hierarchy, metadata, and relationships. Opposite of flattened visual-only data.

**Example:** Semantic scene graph with node types, layouts, constraints. NOT flat SVG blob.

**Mandatory:** All structures must be semantic.

---

### Mutation
**Definition:** Structured change to semantic data. All changes pass through: Intent → Plan → Validate → Constraint Check → Execute → Audit.

**Properties:** Auditable, reversible, deterministic, validated.

**NOT:** Direct DOM change, direct database update, unvalidated modification.

---

### Mutation Engine
**Definition:** System responsible for: accepting intent, planning mutations, validating constraints, executing changes, logging audit trail.

**Responsibility:** Single point of change for entire system.

**Governance:** All changes MUST pass through mutation engine.

---

### Scene Graph
**Definition:** Hierarchical representation of all objects on canvas with semantic metadata.

**Content:** Nodes with IDs, types, layouts, children, metadata, constraints.

**Storage:** PostgreSQL semantic schema, NOT flattened blobs.

---

### Responsive Generation
**Definition:** Automatic creation of mobile/tablet variants from desktop layout using semantic constraints and responsive rules.

**NOT:** Clone-based copying, pixel scaling, manual duplication.

**Engine:** Constraint-based responsive rule engine.

---

## AI Terms

### AI Orchestration
**Definition:** AI interprets user intent, plans mutations, calls approved tools, generates structured operations. Does NOT directly edit canvas.

**Governance:** AI acts as orchestrator + planner, never autonomous generator.

**Safety:** All operations pass validation, tool registry, constraint checking.

---

### Tool Registry
**Definition:** Approved set of operations AI can call. Each tool: validated input, predictable output, audit logging.

**Examples:** createComponent, moveComponent, resizeComponent, alignGrid, applyTheme, generateResponsive.

**Governance:** Tools defined in contracts, not invented at runtime.

---

### Intent Classification
**Definition:** AI's first step: understanding what user wants to accomplish.

**Example:** User input "Generate mobile layout" → Intent: responsive_variant_generate.

**Output:** Structured intent object for mutation planner.

---

### Deterministic Behavior
**Definition:** Same input always produces same output. No randomization without seeds. All outcomes predictable and repeatable.

**Governance:** Required for all automation, mutations, AI workflows.

**Testing:** Must be verifiable with deterministic tests.

---

## Service Terms

### Microservice
**Definition:** Isolated service with own repository, deployment, scaling, database, Docker container.

**Boundary:** Clear APIs/events, no shared code except contracts.

**socialCOPE Services:** 11 independent microservices.

---

### Service Boundary
**Definition:** Clear separation between what one service owns vs. other services.

**Enforcement:** No cross-service code imports, REST APIs only, events for notifications.

**Example:** Canvas service owns scene graph; frontend service owns UI rendering.

---

### Frontend Service
**Definition:** Responsible for UI rendering, canvas rendering, user interaction, WebSocket client, semantic visualization.

**Stack:** Next.js, Tailwind, tldraw.

**Boundary:** UI layer only. Does NOT directly mutate canvas.

---

### Canvas Service
**Definition:** Responsible for scene graph management, object mutations, layout constraints, semantic storage, canvas synchronization.

**Boundary:** Owns semantic scene graph, NOT UI rendering.

**API:** REST endpoints for mutations, WebSocket for realtime sync.

---

### Gateway Service
**Definition:** API aggregation, authentication, routing, session handling, rate limiting.

**Role:** Entry point for all requests from frontend.

**Boundary:** Auth + routing only, NOT business logic.

---

### AI Orchestrator Service
**Definition:** Interprets user intent, classifies intent, plans mutations, calls tools, validates semantic operations.

**NOT:** Direct generation, autonomous changes, unvalidated operations.

**Output:** Structured mutation operations for mutation engine.

---

### LLM Runtime Service
**Definition:** Local model execution with Ollama/vLLM. Inference serving, tool call generation.

**Requirement:** MUST support local inference, NOT cloud-only.

**Models:** Qwen 2.5 Coder, DeepSeek Coder, Phi-4.

---

## Event/Queue Terms

### Event
**Definition:** Notification that something happened. Async message on Redis Pub/Sub or BullMQ.

**Format:** {event: "domain.action.qualifier"}

**Example:** "variant.generate.mobile", "canvas.mutation.created", "export.job.queued"

---

### Pub/Sub
**Definition:** Redis Pub/Sub for event broadcast to multiple listeners.

**Use Case:** Notifications, presence updates, state synchronization.

**NOT:** Persistent queue (use BullMQ for that).

---

### Job Queue
**Definition:** BullMQ queue for durable async job processing.

**Use Cases:** Export jobs, AI generation, asset optimization, heavy computation.

**Properties:** Persistent, retryable, observable, distributed.

---

## Storage Terms

### PostgreSQL Store
**Definition:** Persistent storage for metadata, semantic scene graphs, relationships, project structures, decision logs.

**NOT:** Large assets, rendered files, export binaries.

**Schema:** Semantic-first, normalized, relationship-heavy.

---

### Cloudflare R2
**Definition:** Object storage for assets, templates, exports, snapshots, generated variants.

**NOT:** Metadata, relationships, small structured data.

**Properties:** Scalable, CDN-friendly, version-tracking.

---

### Semantic Scene Graph Storage
**Definition:** Storing complete scene hierarchy with all metadata in PostgreSQL.

**NOT:** Flattened visual-only data, lossy serialization.

**Format:** Normalized tables for nodes, relationships, metadata.

---

## UX/Design Terms

### Light Mode
**Definition:** Strict light theme. No dark mode option.

**Palette:** Defined colors (canvas bg, panels, borders, text, accent).

**Design:** Enterprise-modern, spatial, minimal, high-clarity.

---

### Command-Driven Workflow
**Definition:** User triggers actions via command bar (⌘K), keyboard shortcuts, contextual menu.

**NOT:** Click-heavy, modal-heavy, menu-driven.

**Goal:** Fast, keyboard-first interactions.

---

### Floating Contextual Panel
**Definition:** Floating, non-modal panel that appears contextually next to user action.

**NOT:** Centered modal, full-screen dialog, heavy overlay.

**Design:** Glassmorphism, subtle shadow, 1px border.

---

## Infrastructure Terms

### Docker Container
**Definition:** Isolated runtime for each service with own dependencies, environment, config.

**Deployment:** One service = one container.

**Orchestration:** Docker Compose locally, Kubernetes/VPS in production.

---

### Traefik Reverse Proxy
**Definition:** Entry point for all requests. Handles routing, SSL, load balancing.

**Role:** Front-end server, routes to services.

**Config:** Dynamic routing rules per service.

---

### KVM VPS
**Definition:** Virtual private server with KVM hypervisor for production infrastructure.

**Use:** Docker host, database host, queue host, AI runtime host.

---

## Governance Terms

### Architecture Lock
**Definition:** Immutable architectural decision that cannot change without formal override.

**socialCOPE Locks:** 10 locked decisions on architecture-locks.md.

**Override Process:** Documented in decision-log.md with approval signatures.

---

### Source of Truth
**Definition:** Authoritative specification that supersedes all other sources.

**Hierarchy:** Architecture locks > SpecDoc > Priority 2 contexts > PR consensus.

**Principle:** IF not in source of truth, it does not exist.

---

### Decision Log
**Definition:** Record of significant architectural decisions with rationale, date, proposer, approval.

**Use:** Understanding WHY decisions were made, preventing re-debate of settled issues.

**Format:** ID, date, proposer, type, rationale, approval, status.

---

### Hallucination
**Definition:** Inventing unsupported features, assuming undefined behavior, deviating from specification.

**Forbidden:** Claude MUST NOT hallucinate.

**Prevention:** anti-hallucination-rules.md guardrails.

---

## Abbreviations

| Abbr | Full Form |
|------|-----------|
| CRDT | Conflict-Free Replicated Data Type |
| UX | User Experience |
| UI | User Interface |
| AI | Artificial Intelligence |
| LLM | Large Language Model |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| CRUD | Create, Read, Update, Delete |
| VPS | Virtual Private Server |
| CDN | Content Delivery Network |
| R2 | Cloudflare R2 (object storage) |
| Pub/Sub | Publish/Subscribe |
| JWT | JSON Web Token |
| OIDC | OpenID Connect |
| SSO | Single Sign-On |
| PSD | Photoshop Document |
| SVG | Scalable Vector Graphics |
| PDF | Portable Document Format |

---

## See Also

- `glossary.md` for human-readable explanations
- `architecture-context/` for detailed specifications
- `anti-hallucination-rules.md` for what NOT to assume
