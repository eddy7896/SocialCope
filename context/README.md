# socialCOPE Context System

## What is This?

This `/context` directory is the **source of truth** for socialCOPE's architecture, governance, and engineering standards. Every Claude session, developer, and architectural decision refers to these files.

**Purpose:** Prevent architectural drift, prevent hallucination, preserve institutional knowledge, enforce non-negotiable rules.

---

## Priority Reading Order

For new sessions or new team members:

### 1️⃣ **MANDATORY: Read First (15 min)**

Start here. These establish the immutable foundation.

- `source-of-truth-policy.md` — How to resolve conflicts, hierarchy of authority
- `architecture-locks.md` — 10 locked architectural decisions (cannot change without formal override)
- `anti-hallucination-rules.md` — What Claude MUST NOT assume or invent
- `constraints/non-negotiable-rules.md` — 15 non-negotiable platform rules

### 2️⃣ **FOUNDATION: Architecture (30 min)**

Understand what socialCOPE actually is.

- `architecture-context/` — System architecture overview, service roles, data flow
- `semantic-engine-context/` — Semantic node hierarchy, scene graphs, metadata
- `mutation-engine-context/` — How all changes flow through validation → mutation → audit
- `ai-system-context/` — AI orchestration, tool registry, deterministic workflows

### 3️⃣ **IMPLEMENTATION: Services (30 min)**

Understand each service's responsibility.

- `service-context/` — 11 services, boundaries, APIs, responsibilities
- `frontend-context/` — Next.js, tldraw, Tailwind, UI architecture
- `backend-context/` — Fastify/NestJS, API design, business logic
- `infrastructure-context/` — Docker, Traefik, deployment topology
- `event-system-context/` — Redis Pub/Sub, events, communication
- `queue-system-context/` — BullMQ, async jobs, workers

### 4️⃣ **EXPERIENCE: Design (20 min)**

Understand the user-facing layer.

- `design-system-context/` — Colors, typography, spacing, component library
- `ui-ux-context/` — Interaction patterns, command system, keyboard-first UX

### 5️⃣ **OPERATIONS: Governance (15 min)**

Understand how to operate the system.

- `workflow-context/` — Development workflows, team processes
- `governance-context/` — Decision-making, approval processes
- `development-rules/` — Coding standards, commit conventions, PR process

### 6️⃣ **OPTIONAL: Details (as needed)**

Dive deeper into specific areas.

- `product-context/` — Product vision, user personas, success metrics
- `security-context/` — Authentication, authorization, data protection
- `deployment-context/` — Deployment strategies, environments, scaling
- `realtime-context/` — Yjs, Hocuspocus, presence engine
- `storage-context/` — PostgreSQL, Cloudflare R2, data models
- `export-context/` — PSD, SVG, PDF export pipelines
- `template-system-context/` — Design templates, reusable components
- `contracts/` — API contracts, event schemas, data contracts
- `schemas/` — Database schemas, JSON schemas, validation rules
- `playbooks/` — Runbooks, troubleshooting guides, common tasks
- `prompts/` — Claude system prompts, AI instructions
- `validation/` — Testing strategies, verification procedures

---

## Files Overview

### Governance Files

| File | Purpose |
|------|---------|
| `source-of-truth-policy.md` | Authority hierarchy, conflict resolution |
| `architecture-locks.md` | Immutable architectural decisions |
| `anti-hallucination-rules.md` | What NOT to assume or invent |
| `constraints/non-negotiable-rules.md` | 15 non-negotiable platform rules |
| `terminology-registry.md` | Canonical definitions |
| `glossary.md` | Human-readable term definitions |
| `decision-log.md` | Architecture decisions + rationale |
| `change-management.md` | How to propose changes |

### Metadata Files

| File | Purpose |
|------|---------|
| `context-manifest.json` | Machine-readable index of all context files |
| `context-registry.json` | File registry: domain → priority → status |
| `dependency-graph.md` | Service dependencies, event dependencies |

### Context Folders (28 total)

| Folder | Scope | Priority |
|--------|-------|----------|
| `architecture-context/` | System architecture | 2 |
| `semantic-engine-context/` | Semantic structures | 2 |
| `mutation-engine-context/` | Change pipeline | 2 |
| `ai-system-context/` | AI orchestration | 2 |
| `service-context/` | Service responsibilities | 3 |
| `frontend-context/` | UI layer | 3 |
| `backend-context/` | API + business logic | 3 |
| `infrastructure-context/` | Docker, deployment | 3 |
| `event-system-context/` | Events, Pub/Sub | 3 |
| `queue-system-context/` | Jobs, workers, BullMQ | 3 |
| `design-system-context/` | Visual design | 4 |
| `ui-ux-context/` | Interaction design | 4 |
| `product-context/` | Product vision | 5 |
| `workflow-context/` | Team processes | 5 |
| `governance-context/` | Governance | 5 |
| `development-rules/` | Coding standards | 5 |
| `security-context/` | Security | 5 |
| `deployment-context/` | Deployment | 5 |
| `realtime-context/` | Collaboration | 5 |
| `storage-context/` | Data | 5 |
| `export-context/` | Export pipelines | 5 |
| `template-system-context/` | Templates | 5 |
| `contracts/` | Contracts | 5 |
| `schemas/` | Schemas | 5 |
| `playbooks/` | Runbooks | 5 |
| `prompts/` | Claude prompts | 5 |
| `validation/` | Testing | 5 |

---

## How to Use This System

### For Architecture Decisions

1. Check `architecture-locks.md` — is this locked?
2. Check `decision-log.md` — has this been decided before?
3. Propose in GitHub issue referencing relevant context files
4. On approval, document in decision-log.md + update affected contexts

### For Implementing Features

1. Read relevant Priority 2-4 contexts
2. Check `anti-hallucination-rules.md` — is this feature defined?
3. Review `contracts/` for API specs
4. Follow coding standards from `development-rules/`
5. Reference context files in PR description

### For Claude Sessions

1. Load `/context/source-of-truth-policy.md` first
2. Check `architecture-locks.md` before proposing architecture changes
3. Check `anti-hallucination-rules.md` before assuming features
4. Reference context files when making decisions
5. If proposing something new, verify it's in `SpecDoc.md` or `masterPrompt.md` first

### For New Team Members

1. Read this README
2. Follow "Priority Reading Order" above (1-4)
3. Scan relevant domain contexts (sections 5-6)
4. Ask questions in team channel
5. Contribute to contexts as you learn

---

## Adding to This System

### Creating New Context Files

1. Create file in appropriate folder
2. Add to `context-manifest.json` with role + priority
3. Link from parent `README.md`
4. Reference related contexts with `[[context-name]]`

### Updating Locked Decisions

1. Document override in `decision-log.md`
2. Update `architecture-locks.md` with status change + timestamp
3. Notify team
4. Update affected contexts

### Resolving Conflicts

See `source-of-truth-policy.md` — hierarchy is:
1. architecture-locks.md (immutable)
2. masterPrompt.md / SpecDoc.md (requires RFC)
3. Priority 2-3 contexts (requires review)
4. Priority 4+ contexts (PR consensus)

---

## Quick Reference

| Question | Answer | Document |
|----------|--------|----------|
| What are we building? | Semantic visual OS for ideation | `product-context/` |
| What's locked? | 10 decisions | `architecture-locks.md` |
| What can't we do? | See rules | `anti-hallucination-rules.md` |
| How do services talk? | REST APIs + events | `event-system-context/` |
| How do changes flow? | Through mutation engine | `mutation-engine-context/` |
| What can AI do? | Orchestrate + plan only | `ai-system-context/` |
| What's the tech stack? | Next.js, tldraw, Fastify, etc. | `architecture-locks.md` |
| How do we style? | Light mode, Tailwind, specific colors | `design-system-context/` |
| How do we deploy? | Docker Compose, Traefik, KVM VPS | `infrastructure-context/` |
| What's the API design? | REST, event-driven, versioned | `contracts/` |

---

## Principles

- **Source of Truth:** If it's not documented here, it doesn't exist
- **No Hallucination:** Specification is immutable
- **Locked Decisions:** Cannot change without formal override
- **Deterministic:** Same input → same output always
- **Modular:** Each service independent
- **Semantic:** All structures are hierarchical, not flat
- **Safe:** All mutations auditable + reversible

---

## Contact & Feedback

For questions about context system:
1. Check relevant context folder
2. Ask in #engineering Slack
3. Propose changes via GitHub issue with context references

Context system is living but intentionally slow to change. Changes to Priority 1-2 contexts require discussion.

---

**Last Updated:** 2026-05-16
**Maintained By:** Engineering team
**Version:** 1.0
