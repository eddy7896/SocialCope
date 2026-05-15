# Phase Checklist

Quick reference for what needs to be done in each phase. Copy this for each phase and mark off as you complete.

---

## Phase 1: Foundation (4-6 weeks)

Use this checklist to track Phase 1 progress.

### Pre-Phase Checklist
- [ ] Team reads context/README.md
- [ ] Team reads architecture-locks.md
- [ ] Team reads PROJECT_PLAN.md
- [ ] PROGRESS.md updated with start date
- [ ] Resources allocated (2 frontend, 2 backend, 1 devops)

### Infrastructure Tasks

**GitHub Setup**
- [ ] Create 11 service repositories
- [ ] Create main repository (socialCOPE)
- [ ] Setup team access
- [ ] Configure branch protection
- [ ] Create issue templates

**CI/CD Setup**
- [ ] GitHub Actions workflows
- [ ] Linting (ESLint)
- [ ] Type checking (TypeScript)
- [ ] Unit tests (Jest)
- [ ] Build Docker images
- [ ] Deploy to staging

**Docker Compose**
- [ ] docker-compose.yml for all services
- [ ] Dockerfile for each service
- [ ] .env.example configuration
- [ ] Health checks for all services
- [ ] Local development guide

### Database Tasks

**PostgreSQL Schema**
- [ ] Create `projects` table
- [ ] Create `nodes` table (scene graph)
- [ ] Create `relationships` table
- [ ] Create `constraints` table
- [ ] Create `metadata` table
- [ ] Create `audit_logs` table
- [ ] Create indexes on frequently queried columns
- [ ] Write SQL migrations

**Migrations System**
- [ ] Migration framework setup
- [ ] Initial schema migration
- [ ] Test rollback capability

### Service Development

**Frontend Service (Next.js)**
- [ ] Setup Next.js project
- [ ] Install Tailwind CSS
- [ ] Install tldraw
- [ ] Create basic page structure (dashboard, editor, settings)
- [ ] Implement API client
- [ ] Setup WebSocket client
- [ ] Create empty canvas component
- [ ] Add basic navigation

**Canvas Service**
- [ ] Setup NestJS/Fastify
- [ ] Create PostgreSQL connection
- [ ] Implement scene graph API:
  - [ ] GET /projects/:id
  - [ ] GET /projects/:id/nodes
  - [ ] POST /projects/:id/nodes
  - [ ] PATCH /projects/:id/nodes/:nodeId
  - [ ] DELETE /projects/:id/nodes/:nodeId
- [ ] Add request validation
- [ ] Add error handling
- [ ] Add logging

**Gateway Service**
- [ ] Setup NestJS/Fastify
- [ ] Implement routing to services
- [ ] Add authentication middleware (JWT)
- [ ] Add logging middleware
- [ ] Add rate limiting
- [ ] Document API contracts

**Auth Service**
- [ ] Setup NestJS/Fastify
- [ ] Implement user model (PostgreSQL)
- [ ] Implement login endpoint
- [ ] Implement signup endpoint
- [ ] Implement JWT token generation
- [ ] Implement token verification
- [ ] Add password hashing

### Testing Tasks

**Unit Tests**
- [ ] Test each service controller
- [ ] Test business logic
- [ ] Test database queries
- [ ] Aim for >80% coverage

**Integration Tests**
- [ ] Test gateway → canvas service
- [ ] Test gateway → auth service
- [ ] Test full request/response flow
- [ ] Test error handling

**E2E Tests**
- [ ] Test user login flow
- [ ] Test create project flow
- [ ] Test canvas rendering

### Documentation Tasks

- [ ] Update context/architecture-context/README.md
- [ ] Update context/frontend-context/README.md
- [ ] Update context/backend-context/README.md
- [ ] Update context/infrastructure-context/README.md
- [ ] Write development setup guide (SETUP.md)
- [ ] Write database schema documentation
- [ ] Write API contract for each service
- [ ] Create architecture diagram (Mermaid)

### DevOps Tasks

- [ ] Configure GitHub Actions
- [ ] Setup Docker Hub (or equivalent)
- [ ] Create staging environment on VPS
- [ ] Setup PostgreSQL on staging
- [ ] Setup Redis on staging
- [ ] Setup monitoring (health checks)
- [ ] Create deployment runbook
- [ ] Create rollback procedure

### Success Criteria Verification

- [ ] `docker-compose up` starts all services: ✓
- [ ] Basic scene graph CRUD works: ✓
- [ ] Frontend renders empty canvas: ✓
- [ ] Authentication works (login/logout): ✓
- [ ] All services health check passing: ✓
- [ ] Tests passing (>80% coverage): ✓
- [ ] Team can develop locally: ✓

### Phase 1 Sign-Off

- [ ] All tasks completed
- [ ] All success criteria met
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Deployed to staging and tested
- [ ] Context files updated
- [ ] Runbooks written
- [ ] Team trained
- [ ] Tech lead approval

**Phase 1 Completed:** [Date]

---

## Phase 2: Realtime Collaboration (3-4 weeks)

Use this checklist to track Phase 2 progress.

### Pre-Phase Checklist
- [ ] Phase 1 completely done
- [ ] Team reads realtime-context/README.md
- [ ] PROGRESS.md updated with start date

### Realtime Service Tasks

**Hocuspocus Setup**
- [ ] Install Hocuspocus server
- [ ] Configure WebSocket server
- [ ] Setup document provider
- [ ] Configure persistence (PostgreSQL)
- [ ] Add authentication

**Yjs Integration**
- [ ] Install Yjs library
- [ ] Create Y.Doc for scene graph
- [ ] Bind Y.Map to nodes
- [ ] Test CRDT conflict resolution
- [ ] Test offline changes

### Presence Engine

- [ ] Track connected users
- [ ] Track user cursors
- [ ] Track user selections
- [ ] Broadcast presence updates
- [ ] Handle user disconnect

### Frontend Integration

- [ ] Add WebSocket client (Hocuspocus)
- [ ] Sync scene graph via Yjs
- [ ] Display user cursors
- [ ] Display user presence (who's online)
- [ ] Handle connection/disconnection
- [ ] Add offline indicator

### Testing

- [ ] Unit tests for presence engine
- [ ] Integration tests (2+ users)
- [ ] Test concurrent edits
- [ ] Test conflict resolution
- [ ] Test offline scenario
- [ ] Load test (10+ users)
- [ ] Latency measurement (<200ms)

### Documentation

- [ ] Update realtime-context documentation
- [ ] Document Hocuspocus setup
- [ ] Document Yjs integration
- [ ] Update API contracts

### Success Criteria Verification

- [ ] 2+ users can edit simultaneously: ✓
- [ ] No merge conflicts: ✓
- [ ] Cursor sync <200ms: ✓
- [ ] User presence visible: ✓
- [ ] Offline changes sync: ✓

**Phase 2 Completed:** [Date]

---

## Phase 3: Mutation Engine (3-4 weeks)

Use this checklist to track Phase 3 progress.

### Pre-Phase Checklist
- [ ] Phase 1 done
- [ ] Team reads mutation-engine-context/README.md
- [ ] PROGRESS.md updated with start date

### Mutation Validation

- [ ] Design mutation schema (JSON)
- [ ] Implement mutation validator
- [ ] Add schema validation errors
- [ ] Test valid mutations
- [ ] Test invalid mutations

### Constraint Engine

- [ ] List all constraints (button min 44px, etc.)
- [ ] Implement constraint validator
- [ ] Check constraints before mutation
- [ ] Return helpful error messages
- [ ] Add constraint documentation

### Undo/Redo System

- [ ] Create undo stack
- [ ] Create redo stack
- [ ] Implement undo operation
- [ ] Implement redo operation
- [ ] Test full session undo/redo
- [ ] Add keyboard shortcuts (⌘Z / ⌘⇧Z)

### Audit Logging

- [ ] Design audit log schema
- [ ] Log every mutation (timestamp, user, before/after)
- [ ] Make audit logs queryable
- [ ] Test audit trail completeness
- [ ] Add audit log viewer

### Mutation API

- [ ] Create mutation endpoint
- [ ] Implement validation pipeline
- [ ] Implement constraint checking
- [ ] Execute mutation
- [ ] Log to audit trail
- [ ] Return result to client

### Determinism Tests

- [ ] Test: Same input → Same output
- [ ] Test: Replay audit log → Same result
- [ ] Test: Different orders → Same final state
- [ ] Document determinism guarantees

### Documentation

- [ ] Update mutation-engine-context
- [ ] Document mutation contract
- [ ] Document constraints
- [ ] Write mutation testing guide

### Success Criteria Verification

- [ ] All changes pass validation: ✓
- [ ] Constraints enforced: ✓
- [ ] Undo/redo works: ✓
- [ ] Audit trail complete: ✓
- [ ] Deterministic outcomes: ✓

**Phase 3 Completed:** [Date]

---

## Phase 4: AI Orchestration (4-6 weeks)

Use this checklist to track Phase 4 progress.

### Pre-Phase Checklist
- [ ] Phase 1 and Phase 3 done
- [ ] Team reads ai-system-context/README.md
- [ ] PROGRESS.md updated with start date

### LLM Runtime

- [ ] Install Ollama
- [ ] Download model (Qwen 2.5 Coder or DeepSeek)
- [ ] Test model inference
- [ ] Setup LLM runtime service container
- [ ] Test inference from API
- [ ] Performance benchmark

### Intent Classification

- [ ] Define intent types (responsive.generate, node.resize, etc.)
- [ ] Create intent classifier prompt
- [ ] Implement intent parser
- [ ] Test intent classification
- [ ] Document intent types

### Tool Registry

- [ ] Define all tools (createComponent, applyTheme, etc.)
- [ ] Document tool inputs/outputs
- [ ] Implement tool registry system
- [ ] Add safety checks (no unknown tools)
- [ ] Test tool calling

### Mutation Planner

- [ ] Create AI system prompt
- [ ] Implement planner service
- [ ] Test mutation generation from intent
- [ ] Validate mutations pass constraints
- [ ] Test deterministic outputs

### Command Bar

- [ ] Design command bar UI
- [ ] Implement ⌘K trigger
- [ ] Create command search
- [ ] Integrate with AI (send user input)
- [ ] Show results/mutations
- [ ] Get user approval

### Safety & Auditing

- [ ] Add AI operation logging
- [ ] Add safety guardrails
- [ ] Test: No direct canvas manipulation
- [ ] Test: All mutations validated
- [ ] Test: All operations logged

### Testing

- [ ] Unit tests for intent classifier
- [ ] Integration tests for planner
- [ ] E2E tests for command bar
- [ ] Determinism tests (same intent → same mutations)
- [ ] Safety tests (guardrails work)

### Documentation

- [ ] Update ai-system-context
- [ ] Document tool registry
- [ ] Document intent types
- [ ] Write AI operation guide
- [ ] Document safety constraints

### Success Criteria Verification

- [ ] Local LLM runs (Qwen/DeepSeek): ✓
- [ ] Intent classification works: ✓
- [ ] AI generates valid mutations: ✓
- [ ] Deterministic outputs: ✓
- [ ] All ops audited: ✓

**Phase 4 Completed:** [Date]

---

## Phase 5: Responsive Engine (3-4 weeks)

Use this checklist to track Phase 5 progress.

### Pre-Phase Checklist
- [ ] Phase 4 done
- [ ] Team reads semantic-engine-context/README.md
- [ ] PROGRESS.md updated with start date

### Breakpoints & Rules

- [ ] Define breakpoints (mobile: <640px, tablet: 640-1024px, desktop: >1024px)
- [ ] Define responsive rules (3-col → 2-col → 1-col)
- [ ] Define typography rules (32px → 24px → 18px)
- [ ] Define spacing rules (32px → 24px → 16px)

### Responsive Engine

- [ ] Implement constraint analyzer
- [ ] Implement responsive rule engine
- [ ] Generate tablet variant from desktop
- [ ] Generate mobile variant from desktop
- [ ] Preserve semantic structure
- [ ] Validate all variants

### Responsive Tool

- [ ] Implement as AI tool (generateResponsive)
- [ ] Add to tool registry
- [ ] Test: Desktop → Mobile (auto)
- [ ] Test: Typography scales
- [ ] Test: Spacing adapts

### Preview & Export

- [ ] Add breakpoint preview UI
- [ ] Show mobile/tablet/desktop previews
- [ ] Add preview toggle
- [ ] Export variants to R2
- [ ] Test variant preview

### Testing

- [ ] Unit tests for rule engine
- [ ] Test: 3-col → 1-col correct
- [ ] Test: All variants valid semantic
- [ ] Test: Deterministic variants
- [ ] Load test (many variants)

### Documentation

- [ ] Update semantic-engine-context
- [ ] Document responsive rules
- [ ] Document variant generation
- [ ] Write responsive generation guide

### Success Criteria Verification

- [ ] Desktop 3-col → Mobile 1-col (auto): ✓
- [ ] Typography scales: ✓
- [ ] All variants follow design system: ✓
- [ ] Can preview different sizes: ✓

**Phase 5 Completed:** [Date]

---

## Phase 6: Export Infrastructure (3-4 weeks)

Use this checklist to track Phase 6 progress.

### Pre-Phase Checklist
- [ ] Phase 4 done
- [ ] Team reads export-context/README.md
- [ ] PROGRESS.md updated with start date

### Export Service

- [ ] Setup export-service (Node.js/NestJS)
- [ ] Create export job handler
- [ ] Implement PSD rendering
- [ ] Implement SVG rendering
- [ ] Implement PDF rendering

### PSD Rendering

- [ ] Install ag-psd
- [ ] Implement scene graph → PSD converter
- [ ] Create layers from semantic nodes
- [ ] Apply styling (colors, fonts)
- [ ] Test PSD editing in Photoshop
- [ ] Validate exported file

### SVG Rendering

- [ ] Implement scene graph → SVG converter
- [ ] Apply styling (CSS)
- [ ] Make responsive (viewBox, etc.)
- [ ] Optimize file size
- [ ] Validate SVG in browser

### PDF Rendering

- [ ] Install Puppeteer
- [ ] Implement HTML → PDF converter
- [ ] Apply print styling
- [ ] Optimize for printing
- [ ] Test print output

### Export Queue

- [ ] Setup BullMQ queue
- [ ] Create export job schema
- [ ] Implement queue worker
- [ ] Add retry logic
- [ ] Track job progress
- [ ] Notify user when done

### Asset Service

- [ ] Setup asset-service
- [ ] Integrate with Cloudflare R2
- [ ] Upload export files
- [ ] Generate download links
- [ ] Add file versioning
- [ ] Cleanup old exports

### Testing

- [ ] Test: Export completes <10s
- [ ] Test: PSD is editable
- [ ] Test: SVG is responsive
- [ ] Test: PDF is printable
- [ ] Load test (parallel exports)
- [ ] Test: Download link works

### Documentation

- [ ] Update export-context
- [ ] Document export formats
- [ ] Document R2 integration
- [ ] Write export operation guide

### Success Criteria Verification

- [ ] Export completes <10s: ✓
- [ ] PSD layered + editable: ✓
- [ ] SVG responsive + clean: ✓
- [ ] PDF print-friendly: ✓

**Phase 6 Completed:** [Date]

---

## Post-Project Checklist

After all 6 phases:

- [ ] All phases completed and documented
- [ ] All tests passing (>80% coverage)
- [ ] All context/ files updated
- [ ] All runbooks written
- [ ] Team trained on all features
- [ ] Production environment deployed
- [ ] Monitoring and alerts configured
- [ ] Backup and recovery tested
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Team sign-off obtained

**Project Completion:** [Date]

---

**How to Use:**

1. Copy relevant phase checklist
2. Paste into PROGRESS.md for that phase
3. Check off items as you complete them
4. Update timestamps
5. Move to next phase when done

**Questions?** See PROJECT_PLAN.md for detailed descriptions.

