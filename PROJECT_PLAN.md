# socialCOPE Development Roadmap

Complete phase-wise implementation plan derived from SpecDoc.md and masterPrompt.md.

---

## Project Overview

**Project:** socialCOPE (Create Once, Publish Everywhere)  
**Type:** Internal AI-assisted semantic visual operating system  
**Duration:** 6 phases (est. 6-12 months)  
**Status:** Phase 1 IN PROGRESS (70% complete — infrastructure & scaffolding done)  
**Last Update:** 2026-05-16  

---

## Phase Breakdown

### Phase 1: Foundation (4-6 weeks)
Set up core infrastructure, basic services, semantic scene graph.

**Status:** IN PROGRESS (70% complete)
**Started:** 2026-05-16
**Target Completion:** 2026-05-30

**Completed Deliverables:**
- [x] Project infrastructure (Docker Compose, 11 services scaffolded)
- [x] PostgreSQL schema (7 tables: users, projects, nodes, relationships, constraints, metadata, audit_logs)
- [x] Migration system (SQL migrations + Node.js runner)
- [x] Auth service (register, login, JWT, bcrypt)
- [x] Canvas service (scene graph CRUD API)
- [x] Gateway service (request routing, JWT auth middleware)
- [x] Frontend skeleton (Next.js, Tailwind, light mode)
- [x] Context system documentation (DONE ✓)
- [x] Development environment (local docker-compose)
- [x] TypeScript strict mode (all services)

**Remaining Deliverables:**
- [ ] Complete frontend (API client, auth store, login page, flows)
- [ ] Write all tests (unit + integration, >80% coverage)
- [ ] API documentation (contracts, schema docs)
- [ ] GitHub repositories setup (skipped per user request — no CI/CD)
- [ ] Deploy to staging (not needed for local dev)

**Success Criteria (Status):**
- [x] Local dev environment set up: `docker-compose up` starts all services
- [x] Basic semantic scene graph CRUD API implemented
- [ ] Frontend can render and edit canvas (80% done — page loads, needs tldraw integration)
- [x] All services have basic health checks
- [ ] Team can develop locally (ready after migrations run)

**Dependencies:** None (first phase)

**Tasks Completed:**
- [x] Design PostgreSQL schema (semantic nodes, relationships)
- [x] Implement auth service (register, login, JWT)
- [x] Implement canvas-service REST API (projects + nodes CRUD)
- [x] Implement gateway-service routing (auth + canvas services)
- [x] Setup Next.js frontend shell (pages, Tailwind, light mode)
- [x] Write development setup guide (SETUP.md)
- [x] Create service stubs (11 services with Dockerfiles)

**Tasks Remaining:**
- [ ] Run database migrations (manual or automated on startup)
- [ ] Complete frontend (API client, store, login/register pages, flows)
- [ ] Write unit + integration tests
- [ ] Write API contracts (3 files)
- [ ] Write schema documentation

---

### Phase 2: Realtime Collaboration (3-4 weeks)
Add multiplayer presence, cursor sync, CRDT-based conflict-free editing.

**Deliverables:**
- [ ] Realtime service (Hocuspocus + Yjs)
- [ ] Presence engine (cursor tracking, user awareness)
- [ ] WebSocket integration (frontend ↔ realtime service)
- [ ] CRDT synchronization for scene graph
- [ ] Conflict-free mutation handling
- [ ] Multiplayer testing suite

**Success Criteria:**
- Two users can edit same canvas simultaneously
- No merge conflicts when editing overlapping areas
- Cursor positions sync in real-time (<200ms latency)
- User presence visible (who's online, current selection)
- Offline changes sync when reconnected

**Dependencies:** Phase 1 (services must exist)

**Tasks:**
- [ ] Implement Hocuspocus server
- [ ] Integrate Yjs into canvas-service
- [ ] Add WebSocket layer to frontend
- [ ] Implement presence tracking
- [ ] Build cursor synchronization
- [ ] Write multiplayer integration tests
- [ ] Performance testing (10+ concurrent users)
- [ ] Update realtime-context documentation

---

### Phase 3: Mutation Engine (3-4 weeks)
Implement structured change pipeline with validation, constraints, auditing, undo/redo.

**Deliverables:**
- [ ] Mutation validation layer
- [ ] Constraint engine
- [ ] Undo/redo stack
- [ ] Audit logging system
- [ ] Mutation API endpoints
- [ ] Rollback mechanisms
- [ ] Deterministic testing framework

**Success Criteria:**
- All changes pass validation pipeline
- Constraints enforced (button min height 44px, etc.)
- Undo/redo works for all operations
- Audit trail logs every change with timestamp/user
- Mutations are deterministic (same input → same output)
- Can replay mutations from audit log

**Dependencies:** Phase 1 (canvas service must exist)

**Tasks:**
- [ ] Design mutation schema
- [ ] Implement mutation validator
- [ ] Implement constraint checker
- [ ] Implement undo/redo stack
- [ ] Add audit logging to database
- [ ] Create mutation endpoint handlers
- [ ] Write deterministic tests
- [ ] Update mutation-engine-context documentation
- [ ] Add rollback procedure

---

### Phase 4: AI Orchestration (4-6 weeks)
Implement AI intent classification, tool registry, structured mutation planning, local LLM runtime.

**Deliverables:**
- [ ] Local LLM runtime (Ollama or vLLM)
- [ ] Intent classifier (what user wants)
- [ ] Tool registry system
- [ ] Mutation planner (generates mutations from intent)
- [ ] Constraint validator for AI mutations
- [ ] AI safety guardrails
- [ ] Structured prompts for AI operations

**Success Criteria:**
- Local LLM can run Qwen/DeepSeek models
- User can give commands via command bar (⌘K)
- AI understands intent correctly
- AI generates valid mutations that pass validation
- AI respects all constraints
- Deterministic outputs (same intent → same mutations)
- Audit trail shows all AI operations
- No direct canvas manipulation by AI

**Dependencies:** Phase 1 (services), Phase 3 (mutations), Phase 4 (realtime)

**Tasks:**
- [ ] Deploy Ollama/vLLM container
- [ ] Design intent classification schema
- [ ] Build tool registry system
- [ ] Implement mutation planner
- [ ] Create command bar UI (⌘K)
- [ ] Integrate local LLM inference
- [ ] Build AI safety constraint layer
- [ ] Write AI operation tests
- [ ] Create AI system prompts
- [ ] Update ai-system-context documentation

---

### Phase 5: Responsive Engine (3-4 weeks)
Implement responsive variant generation (mobile/tablet layouts from desktop).

**Deliverables:**
- [ ] Responsive generation tool
- [ ] Breakpoint definitions (mobile, tablet, desktop)
- [ ] Responsive rules engine
- [ ] Constraint-based adaptation
- [ ] Variant versioning
- [ ] Mobile/tablet preview modes
- [ ] Export variants

**Success Criteria:**
- Desktop 3-column → Mobile 1-column (automatically)
- Typography scales responsively
- Spacing adapts to screen size
- All variants follow design system
- Generated layouts are valid semantic structures
- Can preview variants on different screen sizes
- Variants exportable to PSD/SVG

**Dependencies:** Phase 4 (AI can call responsive tool), Phase 3 (mutations)

**Tasks:**
- [ ] Define responsive breakpoints and rules
- [ ] Implement constraint analysis engine
- [ ] Build responsive mutation generator
- [ ] Add breakpoint preview to UI
- [ ] Implement variant storage in R2
- [ ] Create responsive template system
- [ ] Write responsive generation tests
- [ ] Update semantic-engine-context documentation

---

### Phase 6: Export Infrastructure (3-4 weeks)
Implement PSD, SVG, PDF export pipelines with rendering workers.

**Deliverables:**
- [ ] Export service workers
- [ ] PSD renderer (ag-psd)
- [ ] SVG renderer
- [ ] PDF renderer (Puppeteer)
- [ ] Export queue (BullMQ)
- [ ] Export status tracking
- [ ] Asset service (R2 storage)
- [ ] Thumbnail generation

**Success Criteria:**
- User clicks "Export PSD" → job queued → returns immediately
- Export completes in <10 seconds
- PSD is layered, editable in Photoshop
- SVG is clean, responsive, web-ready
- PDF is print-friendly
- Exports stored in R2
- Can download multiple versions
- Assets optimized (compressed images, etc.)

**Dependencies:** Phase 1 (services), Phase 3 (mutations), Phase 4 (responsive)

**Tasks:**
- [ ] Implement export-service
- [ ] Setup ag-psd library
- [ ] Build SVG renderer from scene graph
- [ ] Integrate Puppeteer for PDF
- [ ] Queue export jobs in BullMQ
- [ ] Implement R2 storage integration
- [ ] Add export status tracking UI
- [ ] Build asset optimization pipeline
- [ ] Generate thumbnails
- [ ] Update export-context documentation
- [ ] Performance testing (parallel exports)

---

## Phase Summary Table

| Phase | Name | Duration | Key Features | Dependencies |
|-------|------|----------|--------------|--------------|
| 1 | Foundation | 4-6w | Services, schema, basic API | None |
| 2 | Realtime | 3-4w | Multiplayer, presence, CRDT | P1 |
| 3 | Mutations | 3-4w | Validation, constraints, audit | P1 |
| 4 | AI | 4-6w | Intent, tools, local LLM | P1, P3 |
| 5 | Responsive | 3-4w | Mobile variants, adaptation | P4, P3 |
| 6 | Export | 3-4w | PSD/SVG/PDF rendering | P1, P3, P4 |

**Total Duration:** 20-26 weeks (5-6 months)

---

## Cross-Phase Deliverables

These apply throughout all phases:

### Documentation (Ongoing)
- [ ] Update context/ files for each feature
- [ ] Write API contracts in contracts/
- [ ] Create database schemas in schemas/
- [ ] Write runbooks in playbooks/

### Testing (Ongoing)
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests (services communicating)
- [ ] E2E tests (user workflows)
- [ ] Performance tests (latency benchmarks)
- [ ] Determinism tests (same input = same output)

### DevOps (Ongoing)
- [ ] CI/CD pipeline (linting, tests, builds)
- [ ] Environment setup (dev, staging, prod)
- [ ] Monitoring (health checks, error tracking)
- [ ] Backups (database, R2)
- [ ] Disaster recovery procedures

### Infrastructure (Ongoing)
- [ ] Docker images per service
- [ ] Docker Compose orchestration
- [ ] Traefik configuration
- [ ] PostgreSQL administration
- [ ] Redis administration

---

## Success Metrics

### Phase 1
- [ ] All services start: `docker-compose up`
- [ ] Basic CRUD works on scene graph
- [ ] Frontend renders empty canvas
- [ ] Authentication works
- [ ] Team can develop locally

### Phase 2
- [ ] 2+ users edit simultaneously
- [ ] No merge conflicts
- [ ] Cursor sync <200ms latency
- [ ] Offline changes sync

### Phase 3
- [ ] All mutations validated
- [ ] Constraints enforced
- [ ] Undo/redo works
- [ ] Audit trail complete
- [ ] Deterministic outcomes

### Phase 4
- [ ] LLM runs locally
- [ ] Intent classification works
- [ ] AI mutations generated
- [ ] All AI ops logged
- [ ] Command bar functional

### Phase 5
- [ ] Responsive generation works
- [ ] Variants preview correctly
- [ ] Layouts are semantic (not broken)
- [ ] All variants exportable

### Phase 6
- [ ] PSD exports in <10s
- [ ] SVG clean + responsive
- [ ] PDF print-friendly
- [ ] R2 storage working
- [ ] Parallel exports work

---

## Dependencies Map

```
Phase 1: Foundation
    ↓
Phase 2: Realtime (needs P1)
Phase 3: Mutations (needs P1)
    ↓           ↓
Phase 4: AI (needs P1, P3)
    ↓
Phase 5: Responsive (needs P4, P3)
    ↓
Phase 6: Export (needs P1, P3, P4)
```

**Critical Path:** P1 → P3 → P4 → P5/P6

---

## Risk Mitigation

### Technical Risks

**Risk:** CRDT synchronization complexity  
**Mitigation:** Phase 2 starts with simple presence, layer complexity gradually  
**Fallback:** Use event-based sync if CRDT proves too complex

**Risk:** AI determinism (same intent → different mutations)  
**Mitigation:** Use seeded randomness, test extensively in Phase 4  
**Fallback:** Restrict AI to deterministic operations only

**Risk:** Performance (too slow mutations or exports)  
**Mitigation:** Load test during Phase 3 and 6  
**Fallback:** Optimize hot paths, reduce feature scope

**Risk:** LLM model compatibility  
**Mitigation:** Test Ollama/vLLM setup early (Phase 4 start)  
**Fallback:** Use cloud API (Claude/OpenAI) as fallback

### Organizational Risks

**Risk:** Team context loss between phases  
**Mitigation:** Context/ system prevents drift; read before each phase  
**Fallback:** Onboarding checklist, context review meetings

**Risk:** Scope creep (features outside specification)  
**Mitigation:** Architecture-locks.md and anti-hallucination-rules.md prevent this  
**Fallback:** RFC process (change-management.md) for any additions

**Risk:** Database schema changes mid-project  
**Mitigation:** Design semantic schema thoroughly in Phase 1  
**Fallback:** Migration scripts for schema changes

---

## Progress Tracking

### Checklist Format

For each phase:
```markdown
## Phase X: [Name]

### Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Status
- Started: [date]
- In Progress: [%]
- Completed: [date]
```

### Metrics to Track

- Commits per phase
- Test coverage %
- Bug count
- Performance metrics (latency, throughput)
- Team velocity (tasks/week)

---

## Decision Points Between Phases

### Phase 1 → 2
**Decision:** Should we do Realtime first or Mutations?  
**Choice:** Mutations first (Phase 3) for stability  
**Rationale:** Realtime depends on solid mutation foundation

### Phase 3 → 4
**Decision:** Local LLM ready or use cloud API?  
**Choice:** Local LLM required (architecture-locked)  
**Rationale:** Privacy, independence, no vendor lock-in

### Phase 5 ↔ 6
**Decision:** Parallel or sequential?  
**Choice:** Parallel (P5 and P6 independent)  
**Rationale:** Different teams can work simultaneously

---

## Handoff Checklist (End of Each Phase)

- [ ] All tasks completed ✓
- [ ] Success criteria met ✓
- [ ] Tests passing (>80% coverage)
- [ ] Context/ documentation updated
- [ ] Code reviewed and merged
- [ ] Deployed to staging
- [ ] Performance validated
- [ ] Team trained on new features
- [ ] Runbooks written

---

## Resources Required

### Team

- 2 Frontend engineers (Phase 1-6)
- 2 Backend engineers (Phase 1-6)
- 1 DevOps engineer (Phase 1-6)
- 1 AI/ML engineer (Phase 4-6)
- 1 QA engineer (Phase 1-6)
- 1 Tech lead/architect (Phase 1-6)

### Infrastructure

- Development laptops (Docker, Node, Python)
- Staging VPS (Docker, PostgreSQL, Redis)
- Production VPS (KVM, Traefik, monitoring)
- GitHub (repositories, CI/CD)
- Sentry/monitoring (error tracking)

### Tools

- Docker, Docker Compose
- PostgreSQL, Redis, Ollama
- GitHub Actions
- Sentry, DataDog (monitoring)
- Figma (design reference)

---

## Phase Completion Criteria

**Phase is DONE when:**

1. ✓ All tasks completed
2. ✓ All success criteria met
3. ✓ Tests pass (>80% coverage)
4. ✓ No critical bugs
5. ✓ Code reviewed
6. ✓ Deployed to staging + tested
7. ✓ Context/ files updated
8. ✓ Team trained
9. ✓ Runbooks written
10. ✓ Tech lead sign-off

---

## Current Status

**Overall:** Planning complete, infrastructure ready

**Phase 1:** READY TO START
- Context system: ✓ DONE
- Architecture defined: ✓ DONE
- Dependencies locked: ✓ DONE
- Team structure: Ready
- Next: Create service repositories

---

## How to Use This Plan

### For Managers
- Track progress phase-by-phase
- Monitor team velocity
- Identify blockers
- Adjust timeline/scope as needed

### For Engineers
- Reference phase deliverables
- Know success criteria
- Understand dependencies
- Track your work against tasks

### For Architects
- Validate phase ordering
- Ensure no architectural violations
- Review context/ updates
- Approve cross-phase changes

---

**Last Updated:** 2026-05-16  
**Status:** Ready for Phase 1 execution  
**Next Action:** Create service repositories + initialize Phase 1
