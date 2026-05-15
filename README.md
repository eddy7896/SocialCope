# socialCOPE

Internal AI-assisted semantic visual operating system for easyio technologies.

**Status:** Planning complete, ready for Phase 1 execution.

---

## Quick Start

### 1. First Time? Read These (in order)

1. **[SpecDoc.md](SpecDoc.md)** — Complete technical specification (vision, architecture, features)
2. **[masterPrompt.md](masterPrompt.md)** — Governance & anti-hallucination rules (architecture locks, constraints)
3. **[context/README.md](context/README.md)** — Context system navigation (how to use architecture governance)
4. **[PROJECT_PLAN.md](PROJECT_PLAN.md)** — Phased implementation plan (6 phases, 20-26 weeks)
5. **[PROGRESS.md](PROGRESS.md)** — Track progress against the plan (weekly updates)

### 2. About to Work? Read These

- **Architecture:** [context/architecture-locks.md](context/architecture-locks.md) — 10 locked decisions
- **Don't Assume:** [context/anti-hallucination-rules.md](context/anti-hallucination-rules.md) — Forbidden behaviors
- **Rules:** [context/constraints/non-negotiable-rules.md](context/constraints/non-negotiable-rules.md) — 15 non-negotiable rules
- **Phase Plan:** [PROJECT_PLAN.md](PROJECT_PLAN.md) — Details for your current phase

### 3. Making a Change? Follow This

1. Check [context/source-of-truth-policy.md](context/source-of-truth-policy.md) — Authority hierarchy
2. Check [context/architecture-locks.md](context/architecture-locks.md) — What's locked?
3. Check [context/decision-log.md](context/decision-log.md) — Been decided before?
4. Follow [context/change-management.md](context/change-management.md) — How to propose

---

## What is socialCOPE?

A semantic, AI-assisted, infinite-canvas operating system for rapid design ideation, automation, and collaboration.

**NOT:** Figma competitor, generic design tool, public platform.

**IS:** Internal tool for easyio teams to rapidly ideate → iterate → export.

**Key Features:**
- Semantic scene graphs (not visual blobs)
- AI orchestration (not autonomous generation)
- Realtime multiplayer collaboration
- Responsive variant generation (mobile layouts auto)
- Export to PSD, SVG, PDF
- Local AI runtime (Ollama/vLLM)
- Complete audit trail

---

## Architecture Overview

### 6-Phase Development

| Phase | Focus | Duration | Status |
|-------|-------|----------|--------|
| 1 | Foundation (services, schema, basic API) | 4-6w | Ready to start |
| 2 | Realtime (multiplayer, presence, CRDT) | 3-4w | Planned |
| 3 | Mutations (validation, constraints, audit) | 3-4w | Planned |
| 4 | AI (intent, tools, local LLM) | 4-6w | Planned |
| 5 | Responsive (mobile variants, adaptation) | 3-4w | Planned |
| 6 | Export (PSD, SVG, PDF rendering) | 3-4w | Planned |

**Total:** 20-26 weeks (5-6 months)

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for full details.

### 11 Microservices

```
Internet → Traefik → Gateway Service
                        ↓
            ┌───────────┼───────────┐
            ↓           ↓           ↓
        Frontend    Canvas        AI
        (Next.js)   (API)      (Orchestration)
            ↓           ↓           ↓
        ┌────────────────────────────┐
        │   Realtime / Export / Auth │
        │   Asset / Analytics        │
        └────────────────────────────┘
            ↓
        ┌─────────────────┐
        │ PostgreSQL      │
        │ Redis/BullMQ    │
        │ Cloudflare R2   │
        └─────────────────┘
```

See [context/architecture-context/](context/architecture-context/) for details.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js, Tailwind CSS, tldraw, Framer Motion |
| **Backend** | Fastify / NestJS, PostgreSQL, Redis |
| **Realtime** | Yjs, Hocuspocus |
| **AI** | Local LLM (Ollama/vLLM), Qwen/DeepSeek models |
| **Export** | Puppeteer, ag-psd |
| **Storage** | PostgreSQL (semantics), Cloudflare R2 (assets) |
| **Infrastructure** | Docker, Docker Compose, Traefik, KVM VPS |

---

## Context System (Governance)

Complete architecture governance to prevent drift and hallucination.

### Priority 1 (Immutable — locked down)
- **[architecture-locks.md](context/architecture-locks.md)** — 10 locked architectural decisions
- **[anti-hallucination-rules.md](context/anti-hallucination-rules.md)** — What NOT to assume
- **[constraints/non-negotiable-rules.md](context/constraints/non-negotiable-rules.md)** — 15 rules
- **[source-of-truth-policy.md](context/source-of-truth-policy.md)** — How to resolve conflicts

### Priority 2 (Core Architecture)
- **[architecture-context/](context/architecture-context/)** — System topology, services
- **[semantic-engine-context/](context/semantic-engine-context/)** — Scene graphs, hierarchy
- **[mutation-engine-context/](context/mutation-engine-context/)** — Change pipeline
- **[ai-system-context/](context/ai-system-context/)** — AI orchestration, tools

### Priority 3 (System Implementation)
- **[service-context/](context/service-context/)** — 11 services, boundaries
- **[frontend-context/](context/frontend-context/)** — Next.js, tldraw
- **[backend-context/](context/backend-context/)** — API design, business logic
- **[infrastructure-context/](context/infrastructure-context/)** — Docker, deployment
- **[event-system-context/](context/event-system-context/)** — Pub/Sub, events
- **[queue-system-context/](context/queue-system-context/)** — BullMQ, async jobs

### Priority 4 (UX & Design)
- **[design-system-context/](context/design-system-context/)** — Colors, typography, spacing
- **[ui-ux-context/](context/ui-ux-context/)** — Interactions, keyboard shortcuts

### Priority 5 (Operations)
- **[product-context/](context/product-context/)** — Product vision, metrics
- **[security-context/](context/security-context/)** — Auth, data protection
- **[deployment-context/](context/deployment-context/)** — Environments, scaling
- **[realtime-context/](context/realtime-context/)** — Yjs, Hocuspocus
- **[storage-context/](context/storage-context/)** — PostgreSQL, R2
- **[export-context/](context/export-context/)** — PSD, SVG, PDF
- **[template-system-context/](context/template-system-context/)** — Design templates
- **[workflow-context/](context/workflow-context/)** — Development workflows
- **[governance-context/](context/governance-context/)** — Decision-making
- **[development-rules/](context/development-rules/)** — Code standards
- **[contracts/](context/contracts/)** — API contracts, schemas
- **[schemas/](context/schemas/)** — Database schemas
- **[playbooks/](context/playbooks/)** — Runbooks, troubleshooting
- **[prompts/](context/prompts/)** — AI system prompts
- **[validation/](context/validation/)** — Testing, verification

See [context/README.md](context/README.md) for complete navigation.

---

## Planning & Progress Tracking

### Documents

| Document | Purpose | Update Frequency |
|----------|---------|------------------|
| **[PROJECT_PLAN.md](PROJECT_PLAN.md)** | Complete 6-phase plan with deliverables + success criteria | Once at project start |
| **[PROGRESS.md](PROGRESS.md)** | Real-time progress tracking against the plan | Weekly |
| **[PHASE_CHECKLIST.md](PHASE_CHECKLIST.md)** | Quick reference for what to do in each phase | Per phase |

### How to Check Progress

1. Open [PROGRESS.md](PROGRESS.md)
2. See overall % complete
3. See which phase is active
4. See task completion status
5. See blockers and risks
6. Update weekly with new progress

### How to Plan Next Phase

1. Read [PROJECT_PLAN.md](PROJECT_PLAN.md) for your phase
2. Copy [PHASE_CHECKLIST.md](PHASE_CHECKLIST.md) for your phase
3. Paste into [PROGRESS.md](PROGRESS.md)
4. Assign tasks to team members
5. Track completion weekly

---

## Key Principles

### 1. Semantic-First
All structures are hierarchical, metadata-aware. Never visual-only blobs.

### 2. Mutation-Driven
ALL changes pass through mutation engine → validation → audit logging.

### 3. AI Orchestrates (Not Generates)
AI interprets intent, plans mutations, calls approved tools. Never autonomous.

### 4. Local-First AI
Ollama/vLLM for inference. No mandatory cloud dependency.

### 5. Modular Services
11 independent services. Clear boundaries. No monolith.

### 6. Event-Driven
Redis Pub/Sub + BullMQ for async, scalable communication.

### 7. Deterministic
Same input → Same output. Always. Seeded randomness when needed.

### 8. Locked Architecture
10 immutable decisions. Override only with formal approval.

---

## Team Structure

### Recommended Team

- 2 Frontend engineers (React, Next.js)
- 2 Backend engineers (Node.js, APIs)
- 1 DevOps engineer (Docker, infra)
- 1 AI/ML engineer (LLM, prompts)
- 1 QA engineer (testing)
- 1 Tech lead / architect

### Onboarding

1. Read [context/README.md](context/README.md)
2. Read [SpecDoc.md](SpecDoc.md) + [masterPrompt.md](masterPrompt.md)
3. Understand [context/architecture-locks.md](context/architecture-locks.md)
4. Understand [context/anti-hallucination-rules.md](context/anti-hallucination-rules.md)
5. Review [PROJECT_PLAN.md](PROJECT_PLAN.md) for your phase
6. Ask questions in team channel

---

## Development Workflow

### Starting a Task
1. Pick task from [PHASE_CHECKLIST.md](PHASE_CHECKLIST.md)
2. Create feature branch
3. Reference relevant context/ files
4. Implement with tests

### Code Review
1. Check [[architecture-locks.md]] compliance
2. Check [[anti-hallucination-rules.md]] compliance
3. Check [[development-rules/]] standards
4. Verify context/ files updated
5. Approve and merge

### Deploying
1. Tests passing
2. Code reviewed
3. Staged deployment
4. Production deployment
5. Update [PROGRESS.md](PROGRESS.md)

---

## Documentation Map

```
socialCOPE/
├── SpecDoc.md              ← Technical specification (sections 1-46)
├── masterPrompt.md         ← Governance rules & principles
├── PROJECT_PLAN.md         ← 6-phase implementation plan
├── PROGRESS.md             ← Real-time progress tracking
├── PHASE_CHECKLIST.md      ← Quick reference per phase
├── README.md               ← This file
│
└── context/                ← Complete architecture governance
    ├── README.md           ← Context navigation guide
    ├── source-of-truth-policy.md
    ├── architecture-locks.md
    ├── anti-hallucination-rules.md
    ├── decision-log.md
    ├── change-management.md
    │
    ├── architecture-context/
    ├── semantic-engine-context/
    ├── mutation-engine-context/
    ├── ai-system-context/
    ├── frontend-context/
    ├── backend-context/
    ├── infrastructure-context/
    ├── event-system-context/
    ├── queue-system-context/
    ├── design-system-context/
    ├── ui-ux-context/
    │
    ├── contracts/          ← API specifications
    ├── schemas/            ← Database schemas
    ├── playbooks/          ← Runbooks
    └── [and more...]
```

---

## Quick Links

**Just Getting Started?**
- [context/README.md](context/README.md) → Navigation guide
- [SpecDoc.md](SpecDoc.md) (sections 1-10) → Vision and overview
- [PROJECT_PLAN.md](PROJECT_PLAN.md) (Phase 1) → What to build first

**Making Architecture Decisions?**
- [context/source-of-truth-policy.md](context/source-of-truth-policy.md) → Authority hierarchy
- [context/architecture-locks.md](context/architecture-locks.md) → What's locked
- [context/decision-log.md](context/decision-log.md) → Past decisions
- [context/change-management.md](context/change-management.md) → How to propose

**Implementing Features?**
- [context/semantic-engine-context/](context/semantic-engine-context/) → Semantic structures
- [context/mutation-engine-context/](context/mutation-engine-context/) → Change pipeline
- [context/development-rules/](context/development-rules/) → Code standards
- [PHASE_CHECKLIST.md](PHASE_CHECKLIST.md) → What to do in your phase

**Debugging?**
- [context/playbooks/](context/playbooks/) → Runbooks & troubleshooting
- [context/validation/](context/validation/) → Testing strategies
- [context/decision-log.md](context/decision-log.md) → Why decisions were made

---

## Success Criteria (Project Level)

**Phase 1 Success:**
- [ ] Local dev environment works
- [ ] Basic CRUD on scene graph
- [ ] Team can develop features

**Phase 2 Success:**
- [ ] 2+ users collaborate without conflicts
- [ ] Cursor sync real-time

**Phase 3 Success:**
- [ ] All mutations validated
- [ ] Constraints enforced
- [ ] Undo/redo works

**Phase 4 Success:**
- [ ] Local LLM running
- [ ] AI generates valid mutations
- [ ] Command bar functional

**Phase 5 Success:**
- [ ] Desktop 3-col → Mobile 1-col automatically
- [ ] All variants valid

**Phase 6 Success:**
- [ ] Export completes <10s
- [ ] PSD editable, SVG responsive, PDF printable

**Full Project Success:**
- [ ] All phases complete
- [ ] No architecture-locks violations
- [ ] >80% test coverage
- [ ] Production ready

---

## Contact & Support

**Questions about:**
- **Vision/Strategy** → See SpecDoc.md + product-context/
- **Architecture** → See architecture-locks.md + decision-log.md
- **Governance** → See source-of-truth-policy.md + change-management.md
- **Implementation** → See relevant context/ + PHASE_CHECKLIST.md
- **Progress** → See PROGRESS.md + PROJECT_PLAN.md

---

## Files & Folders

| File/Folder | Purpose |
|-------------|---------|
| **SpecDoc.md** | Complete technical specification |
| **masterPrompt.md** | Governance & constraints document |
| **PROJECT_PLAN.md** | 6-phase implementation roadmap |
| **PROGRESS.md** | Real-time progress tracking |
| **PHASE_CHECKLIST.md** | Per-phase task checklists |
| **context/** | Complete architecture governance system (28 folders) |
| **.github/** | GitHub Actions CI/CD (to be created) |
| **services/** | 11 microservice repositories (to be created) |

---

## License & Attribution

Internal project for easyio technologies.

---

**Last Updated:** 2026-05-16  
**Status:** Ready for Phase 1 execution  
**Next Action:** Create service repositories and start Phase 1

See [PROJECT_PLAN.md](PROJECT_PLAN.md) to begin.

