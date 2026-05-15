# Constraints

Non-negotiable platform rules and business constraints.

---

## Purpose

Define the immutable, non-negotiable rules that govern the entire platform.

**These rules cannot be changed without formal override and stakeholder approval.**

---

## Rule Categories

### Architectural Constraints
- Semantic-first structure (never visual-only)
- Mutation engine as single point of change
- Microservices (never monorepo)
- Event-driven infrastructure
- Deterministic systems

### Technology Constraints
- TypeScript strict mode required
- Light mode only (no dark mode)
- Local AI runtime support mandatory
- PostgreSQL for semantics, R2 for assets
- Docker containerization

### AI Constraints
- AI orchestration, not autonomous generation
- Tool registry only (no arbitrary execution)
- No direct canvas manipulation
- All operations validated and logged
- Deterministic outcomes required

### UX Constraints
- Enterprise-modern aesthetic (Notion, Linear, Stripe)
- Large whitespace, minimal clutter
- Keyboard-first workflows
- Floating panels, not modals
- Fast interaction (<100ms mutations)

### Organization Constraints
- 11 isolated services with clear boundaries
- No shared databases (except read replicas)
- Communication via REST APIs + events only
- Independent deployment and scaling
- Own repository per service

---

## Master Rule

> **If something is not explicitly in SpecDoc.md or masterPrompt.md, it does not exist.**

Don't invent features, assumptions, or capabilities outside specification.

---

## Checking Constraints

Before any implementation:

1. Check [[architecture-locks.md]] for locked decisions
2. Check [[anti-hallucination-rules.md]] for forbidden patterns
3. Check this file (constraints/) for non-negotiable rules
4. If violating any, get formal approval before proceeding

---

## Violations and Overrides

Violating a constraint requires:
1. Full documented rationale
2. Stakeholder approval (level depends on constraint severity)
3. Entry in decision-log.md
4. Context file updates
5. Team notification

---

See Also:
- `non-negotiable-rules.md` — 15 detailed non-negotiable rules
- [[architecture-locks.md]] — 10 locked architectural decisions
- [[source-of-truth-policy.md]] — How to resolve conflicts

---

**Priority:** 1 (Immutable) | **Last Updated:** 2026-05-16
