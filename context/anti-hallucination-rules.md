# Anti-Hallucination Rules

## Purpose

Prevent Claude from inventing unsupported functionality, assuming undefined features, or deviating from specification.

**Rule:** IF a feature, API, data structure, or behavior is not explicitly defined in masterPrompt.md or SpecDoc.md, THEN it does not exist and MUST NOT be assumed or invented.

---

## Architecture Hallucinations (FORBIDDEN)

### Monorepo Structure
**Do NOT assume:** Single repository containing all services.

**Reality:** 11 isolated repositories, isolated deployments, isolated scaling.

**What to do:** If task requires cross-service code, verify repository boundaries first.

### Tightly Coupled Services
**Do NOT assume:** Direct service-to-service imports or circular dependencies.

**Reality:** Services communicate via REST APIs, events, or shared contracts only.

**What to do:** Always verify communication path in event-system-context or service-context before proposing coupling.

### Direct Canvas Mutations
**Do NOT assume:** Frontend code directly modifying canvas state.

**Reality:** All changes go through mutation engine. Frontend receives rendered mutations.

**What to do:** Never propose direct state mutation. Always route through mutation engine.

### Cloud-Only AI
**Do NOT assume:** AI runs only on external cloud APIs.

**Reality:** System MUST support local Ollama/vLLM inference.

**What to do:** If implementing AI, verify local runtime support and event queuing.

### Shared Monolithic Database
**Do NOT assume:** Single database for all services.

**Reality:** Canvas-service has PostgreSQL for semantic scene graphs. Each service may have isolated DB. R2 stores assets.

**What to do:** Check service-context before proposing database usage.

### Dark Mode
**Do NOT assume:** UI supports dark mode.

**Reality:** Strict light mode only, with specific color palette.

**What to do:** Never propose dark mode. Use only specified light mode colors.

---

## Feature Hallucinations (FORBIDDEN)

### Real-Time Video Collaboration
**Do NOT assume:** Video, audio, or screen-sharing features.

**Reality:** Not in specification. Yjs/Hocuspocus handles presence + cursor sync only.

**What to do:** If user asks for "collaboration", verify it means semantic co-editing, not video.

### AI-Driven Automatic Redesign
**Do NOT assume:** AI autonomously redesigning layouts without user intent.

**Reality:** AI ONLY responds to explicit commands, generates mutations, never autonomous changes.

**What to do:** All AI actions require user command. Document intent path.

### Pixel-Perfect Rendering
**Do NOT assume:** Photoshop-level precision or raster editing.

**Reality:** Semantic layout system for ideation, not pixel editing.

**What to do:** If task involves pixel-level work, verify it's actually needed.

### Multi-Workspace
**Do NOT assume:** Multiple simultaneous projects or workspaces in single session.

**Reality:** Not in specification. Single project per session.

**What to do:** Check product-context before proposing multi-workspace UX.

### Custom Fonts/Assets Upload Without Validation
**Do NOT assume:** Users can upload arbitrary assets without validation or moderation.

**Reality:** Asset service validates, optimizes, stores in R2. Contracts define allowable formats.

**What to do:** Check schemas/ and contracts/ folders before proposing asset handling.

### Built-In Social Media Integration
**Do NOT assume:** Native Twitter, Figma, or Slack integrations.

**Reality:** Not in specification. Platform focused on internal ideation.

**What to do:** If task mentions integration, verify it exists in contracts/social-integrations.md.

### Unlimited Canvas Size
**Do NOT assume:** Infinite memory or performance with massive canvases.

**Reality:** Semantic scene graph has practical limits. Constraint engine enforces bounds.

**What to do:** Document expected scale in any performance proposal.

---

## API/Contract Hallucinations (FORBIDDEN)

### Undefined Endpoints
**Do NOT assume:** REST endpoints not defined in service-context.

**Reality:** All APIs must be documented in contracts/ before implementation.

**What to do:** Before proposing an endpoint, verify it's defined in contracts/[service]-api.md.

### Undefined Events
**Do NOT assume:** Events not defined in event-system-context.

**Reality:** All events must follow schema in events-registry.md or defined in contracts/.

**What to do:** Before proposing an event, verify it's in event-system-context/events-registry.md.

### Direct Service-to-Service Calls
**Do NOT assume:** Backend services calling each other directly.

**Reality:** All inter-service communication via events, queues, or documented REST contracts.

**What to do:** Propose communication path through event system or defined API contract.

### Undefined Data Structures
**Do NOT assume:** Database schema or JSON structures not in schemas/.

**Reality:** All persistent data follows schemas defined in schemas/ folder.

**What to do:** Before storing data, check schemas/ for existing patterns.

---

## Mutation Engine Hallucinations (FORBIDDEN)

### Mutations Without Validation
**Do NOT assume:** Mutations directly hitting database or canvas.

**Reality:** All mutations pass through: Planner → Validator → Constraint Engine → Mutation Engine → Audit.

**What to do:** Never bypass validation. Document mutation contract in contracts/.

### Unauditable Changes
**Do NOT assume:** Changes that don't create audit trail.

**Reality:** ALL mutations must be logged, reversible, and documented.

**What to do:** Include audit logging in any mutation proposal.

### Probabilistic Mutations
**Do NOT assume:** Randomized or non-deterministic mutation outcomes.

**Reality:** Same mutation input must produce same output always (with seeded randomness if needed).

**What to do:** If randomness needed, propose seed-based approach.

---

## UI/UX Hallucinations (FORBIDDEN)

### Dark Mode UI
**Do NOT assume:** Any dark mode implementation.

**Reality:** Strict light mode. Palette defined in design-system-context/colors.md.

**What to do:** Use only specified light mode colors.

### Modal-Heavy Workflows
**Do NOT assume:** Multiple nested modals or dialog chains.

**Reality:** Floating panels, contextual interfaces, command-driven.

**What to do:** Check ui-ux-context/interaction-patterns.md before designing UI flows.

### Cluttered Panels
**Do NOT assume:** Information-dense cramped interfaces.

**Reality:** Large whitespace, minimal clutter, spatial design.

**What to do:** Verify spacing system (xs=4px, sm=8px, md=16px, lg=24px, xl=32px, xxl=48px).

### Non-Enterprise Aesthetics
**Do NOT assume:** Playful, casual, or non-professional design language.

**Reality:** Enterprise-modern, systematic, professional.

**What to do:** Reference Linear, Notion, Stripe for inspiration.

---

## Security/Compliance Hallucinations (FORBIDDEN)

### Unencrypted Sensitive Data
**Do NOT assume:** Storing passwords, tokens, or auth data in plain text.

**Reality:** Must follow security-context rules.

**What to do:** Check security-context/authentication.md before proposing storage.

### Public Exports
**Do NOT assume:** Generated exports are publicly accessible.

**Reality:** Check deployment-context/access-control.md for access rules.

**What to do:** Verify access control before proposing export feature.

### Unrestricted File Uploads
**Do NOT assume:** Unlimited or unvalidated file uploads.

**Reality:** Asset service validates format, size, content.

**What to do:** Check schemas/asset-validation.md before proposing uploads.

---

## Dependency/Library Hallucinations (FORBIDDEN)

### Undocumented Dependencies
**Do NOT assume:** Adding libraries not listed in tech stack.

**Reality:** Must use approved tech stack only (see architecture-locks.md).

**What to do:** Check architecture-locks.md#Lock10 before proposing new library.

### Monolithic Framework Assumptions
**Do NOT assume:** Using Next.js monolithic patterns across services.

**Reality:** Each service independent. Frontend uses Next.js; backend uses Fastify/NestJS; no shared frameworks.

**What to do:** Verify service architecture in service-context before proposing patterns.

---

## When in Doubt

1. Check SpecDoc.md section numbers for feature
2. Check masterPrompt.md for principle
3. Check context/ folder for detailed spec
4. **If not found, DO NOT ASSUME. ASK OR DEFER.**

If a feature, API, behavior, or structure is not explicitly documented, it does not exist.

---

## Checking Process for Any Proposal

Before implementing anything:

```
1. Is this in SpecDoc.md? → If no, go to 2
2. Is this in masterPrompt.md? → If no, go to 3
3. Is this in relevant context/ folder? → If no, STOP
4. STOP → Feature undefined. Check with team before proceeding.
5. If found, proceed and document source.
```

**Golden rule:** Specification is source of truth. Nothing else.
