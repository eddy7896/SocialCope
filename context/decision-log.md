# Decision Log

Record of significant architectural decisions with rationale, approval, and status.

---

## How to Read This Log

Each decision entry includes:
- **ID:** Unique identifier for cross-referencing
- **Date:** When decision was made
- **Title:** One-sentence decision summary
- **Type:** architectural, organizational, technical, security, ui-ux
- **Status:** approved, pending, superseded, overridden
- **Proposer:** Who proposed the decision
- **Rationale:** Why this decision was made (2-3 sentences)
- **Alternatives Considered:** What other options were available
- **Approval:** Who approved (stakeholders)
- **Related Decisions:** Links to related decisions
- **Impact:** What changes because of this decision
- **Notes:** Additional context or constraints

---

## Foundation Decisions (Locked)

### D-001: Semantic-First Architecture

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Engineering Lead  
**Type:** architectural

**Title:** All structures must be semantic hierarchies, not visual blobs.

**Rationale:** Enables intelligent AI mutation, responsive generation, layout inheritance, and long-term maintainability. Flat visual-only data cannot be analyzed or manipulated programmatically.

**Alternatives Considered:**
- Visual-only storage (Figma-style) → Rejected: blocks AI capabilities
- Hybrid semantic + visual → Rejected: adds complexity, creates sync issues

**Approval:** Engineering team, Architecture council

**Impact:**
- All canvas data stored as semantic scene graphs in PostgreSQL
- R2 stores assets only, not structure
- Mutation engine works on semantic structures
- AI can analyze and modify intelligently

**Related Decisions:** D-002, D-003

**Notes:** This is non-negotiable. Violating this undermines entire system.

---

### D-002: Mutation Engine as Single Point of Change

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Engineering Lead  
**Type:** architectural

**Title:** ALL changes (AI, user, automation) pass through mutation engine with validation, auditing, and rollback capability.

**Rationale:** Enables auditability, rollback, determinism, and prevents bypasses. Direct mutations break undo/redo, audit trails, and constraint validation.

**Alternatives Considered:**
- Direct DOM/database mutations → Rejected: no audit, no undo, no safety
- Multiple mutation paths → Rejected: unmaintainable, conflicting changes

**Approval:** Engineering team, Security team

**Impact:**
- Frontend cannot directly edit canvas state
- All mutations go through validation pipeline
- Every change logged with timestamp, user, before/after
- Enables undo/redo at any scale

**Related Decisions:** D-001, D-004, D-009

**Notes:** Critical for system integrity.

---

### D-003: Microservices Architecture (NOT Monorepo)

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Architecture Council  
**Type:** architectural

**Title:** 11 isolated services with independent repositories, deployments, and scaling. FORBIDDEN: monorepo, service coupling, shared databases.

**Rationale:** Prevents architecture collapse under pressure. Allows independent scaling, language choices per service, team autonomy. Monorepos and service coupling make scaling impossible as team grows.

**Services:**
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

**Alternatives Considered:**
- Monorepo → Rejected: causes tight coupling, scaling nightmares
- Shared libraries → Rejected: creates hidden dependencies

**Approval:** Architecture council, DevOps team

**Impact:**
- Each service has own repository
- Each service has own Docker container
- Each service can scale independently
- Communication via REST APIs and events only

**Related Decisions:** D-007, D-008

**Notes:** Non-negotiable. Preserves long-term maintainability.

---

### D-004: AI Orchestration (NOT Autonomous Generation)

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** AI Systems Lead  
**Type:** architectural

**Title:** AI acts as orchestrator + planner. Interprets intent, plans mutations, calls approved tools. Never directly edits canvas or generates uncontrolled output.

**Rationale:** Prevents hallucination, ensures determinism, maintains safety. Autonomous generation is unpredictable and unsafe for a production creative tool.

**What AI Does:**
- Interpret user intent ("Generate mobile layout")
- Plan structured mutations
- Call approved tools only
- Validate against constraints
- Log all operations

**What AI Does NOT Do:**
- Direct DOM manipulation
- Autonomous redesigns
- Unvalidated operations
- Arbitrary code execution

**Approval:** Engineering team, Security team

**Impact:**
- Tool registry defines what AI can do
- All AI operations pass validation
- User always in control
- All AI changes auditable

**Related Decisions:** D-002, D-005, D-009

**Notes:** Critical for user trust and system safety.

---

### D-005: Local AI Runtime Requirement

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Infrastructure Lead  
**Type:** architectural

**Title:** System MUST support local LLM execution. Cannot depend solely on cloud APIs.

**Rationale:** Ensures operational independence, respects data privacy, avoids vendor lock-in. easyio must control inference infrastructure.

**Approved Runtimes:**
- Ollama (easiest)
- vLLM (fastest)
- llama.cpp (lightweight)

**Approved Models:**
- Qwen 2.5 Coder
- DeepSeek Coder
- Phi-4

**Alternatives Considered:**
- Cloud-only (OpenAI, Claude API) → Rejected: vendor lock-in, privacy concerns
- No AI runtime → Rejected: loses orchestration benefits

**Approval:** Infrastructure team, Security team, Privacy officer

**Impact:**
- Deploy Ollama/vLLM alongside services
- No mandatory cloud dependency
- Can run entire system on local VPS
- Model choice flexible

**Related Decisions:** D-004, D-008

**Notes:** Non-negotiable for privacy and independence.

---

### D-006: Event-Driven Infrastructure

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Infrastructure Lead  
**Type:** architectural

**Title:** ALL async operations via queues (Redis Pub/Sub + BullMQ). NO synchronous blocking calls. NO polling loops.

**Rationale:** Enables scalability, prevents cascading failures, makes UI responsive, allows distributed workers.

**Queue Types:**
- **Pub/Sub:** Real-time events (mutations, presence)
- **BullMQ:** Durable jobs (exports, optimization, heavy computation)

**Alternatives Considered:**
- Synchronous calls → Rejected: blocks UI, doesn't scale
- Polling → Rejected: wasteful, slow

**Approval:** Infrastructure team, DevOps team

**Impact:**
- Long operations return immediately to user
- Workers process jobs in background
- Observable queue depths
- Fault-tolerant with retries

**Related Decisions:** D-003, D-008

**Notes:** Critical for responsiveness and scalability.

---

### D-007: Storage Architecture

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Infrastructure Lead  
**Type:** architectural

**Title:** PostgreSQL for metadata/relationships. Cloudflare R2 for assets/exports. NO large blobs in database.

**Rationale:** Separates concerns, enables efficient scaling, maintains database performance.

**PostgreSQL Stores:**
- Semantic scene graphs
- Metadata (projects, users, teams)
- Relationships (ownership, permissions)
- Audit logs
- Decision logs

**R2 Stores:**
- Images (uploads, screenshots, references)
- Templates (JSON structures, CSS)
- Exports (PSD, SVG, PDF)
- Generated variants
- Snapshots

**Alternatives Considered:**
- Everything in database → Rejected: doesn't scale, slow
- Everything in R2 → Rejected: no relationships, no transactions

**Approval:** Infrastructure team, Database team

**Impact:**
- Fast database queries
- Cheap object storage
- Efficient backups
- Easy scaling

**Related Decisions:** D-001, D-008

**Notes:** Non-negotiable for performance.

---

### D-008: Deterministic Systems

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Engineering Lead  
**Type:** technical

**Title:** ALL automation MUST be deterministic. Same input → Same output always.

**Rationale:** Makes system debuggable, testable, predictable. Non-deterministic behavior is unfixable.

**What This Means:**
- Responsive generation: same constraints → same layout
- Mutations: same input → same output
- AI operations: must produce repeatable results
- Randomness: only with seeds

**Alternatives Considered:**
- Non-deterministic AI → Rejected: can't debug, tests flaky, unpredictable
- Probabilistic layouts → Rejected: breaks reproducibility

**Approval:** Engineering team, QA team

**Impact:**
- All tests use deterministic verification
- AI operations are reproducible
- Users can explain outcomes
- System behavior is explainable

**Related Decisions:** D-004, D-009

**Notes:** Non-negotiable for debuggability.

---

### D-009: Tight TypeScript + Strict Mode

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Engineering Lead  
**Type:** technical

**Title:** All code uses TypeScript strict mode. No `any`, no unsafe casts.

**Rationale:** Catches errors at build time, not runtime. Improves code clarity, enables safe refactoring, reduces bugs.

**Enforcement:**
- `tsconfig.json` with strict settings enabled
- No `any` types
- No `@ts-ignore`
- All types defined

**Alternatives Considered:**
- JavaScript → Rejected: no type safety, higher bug rate
- Loose TypeScript → Rejected: defeats purpose

**Approval:** Engineering team

**Impact:**
- Early error detection
- Better IDE support
- Type-safe refactoring
- Higher code confidence

**Related Decisions:** D-002

**Notes:** Non-negotiable for code quality.

---

### D-010: Light Mode Only (Strict UI Rule)

**Status:** APPROVED (LOCKED)  
**Date:** 2026-05-16  
**Proposer:** Design Lead  
**Type:** ui-ux

**Title:** Strict light mode. No dark mode. Visual language: enterprise-modern, spatial, minimal, keyboard-first.

**Rationale:** Maintains clear visual identity, consistent experience, professional appearance. Dark mode adds complexity and visual confusion.

**Color Palette:**
- Canvas background: #FAFAFA (light gray)
- Panels: #FFFFFF (white)
- Primary text: #111827 (dark gray)
- Secondary text: #4B5563 (medium gray)
- Borders: #E5E5E5 (light gray)
- Accent: #2563EB (blue)

**Design Inspirations:** Linear, Notion, FigJam, Arc, Vercel, Stripe

**Alternatives Considered:**
- Dark mode toggle → Rejected: complexity, visual inconsistency
- Casual aesthetic → Rejected: conflicts with professional focus

**Approval:** Design team, Product team

**Impact:**
- All UI uses specified colors
- All design references enterprise products
- No dark mode feature requests
- Consistent professional appearance

**Related Decisions:** None (UI-specific)

**Notes:** Non-negotiable for brand consistency.

---

## Future Decisions (Pending)

*None yet. New decisions will be logged here.*

---

## Overridden Decisions (History)

*None yet. If a locked decision is overridden, it will be logged here.*

---

## How to Add a Decision

1. Assign next ID (D-0XX)
2. Record current date
3. Write compelling title (one sentence)
4. Choose type: architectural, organizational, technical, security, ui-ux
5. Explain rationale (2-3 sentences, not obvious)
6. List alternatives considered
7. Secure approval from relevant stakeholders
8. Update related contexts
9. Add to this log

## How to Override a Locked Decision

1. Document override with full rationale (minimum 1 paragraph)
2. Get approval from affected stakeholders
3. Create new decision entry (mark as "override")
4. Update architecture-locks.md with status change
5. Update all affected contexts
6. Notify team

**Expectation:** Locks should rarely change. If changing multiple locks, re-evaluate entire architecture.

---

**Last Updated:** 2026-05-16  
**Decision Count:** 10 locked foundation decisions  
**Pending Decisions:** 0
