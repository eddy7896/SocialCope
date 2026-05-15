# Source of Truth Policy

## Authority Hierarchy

ALL architectural decisions, implementation choices, and governance rules follow this strict hierarchy:

### Level 1 — Immutable Governance (Cannot Change)
- `architecture-locks.md` — locked architectural decisions
- `anti-hallucination-rules.md` — what Claude MUST NOT invent or assume
- `constraints/non-negotiable-rules.md` — non-negotiable business rules

**Override Process:** Requires documented architectural review + stakeholder approval + decision log entry.

### Level 2 — Core Specifications (Change via RFC)
- `masterPrompt.md` (root) — principal governance document
- `SpecDoc.md` (root) — technical specification
- All Priority 2 contexts: architecture, semantic-engine, mutation-engine, ai-system

**Override Process:** Issue formal change proposal, document rationale, approval from tech lead.

### Level 3 — System Implementation (Change via normal development)
- Priority 3 contexts: service, frontend, backend, infrastructure, event, queue

**Override Process:** Code review + local documentation update.

### Level 4 — UX & Design (Change via design review)
- Priority 4 contexts: design-system, ui-ux

**Override Process:** Design review + implementation team agreement.

### Level 5 — Operational Guidance (Change via PR)
- Priority 5+ contexts: workflow, governance, development-rules, product, security, deployment, etc.

**Override Process:** Pull request + team consensus.

---

## Conflict Resolution

When multiple context files or specifications conflict:

1. **Check Level** — which authority level do they represent?
2. **Higher Level Wins** — Level 1 overrides all others
3. **Document Conflict** — add entry to decision-log.md explaining resolution
4. **Update Lower Context** — align the lower-level context with the decision
5. **Never Create Contradiction** — maintain consistency across all levels

---

## Application to Claude Sessions

**Every Claude session MUST:**

1. Read Priority 1 governance files FIRST
2. Verify any architectural proposal against architecture-locks.md
3. Check anti-hallucination-rules.md before proposing unspecified features
4. Consult decision-log.md for prior rationale on similar decisions
5. **NEVER** deviate from Level 1 immutable rules without formal override

---

## Change Log Entry Format

When overriding an immutable rule (Level 1):

```markdown
## [Decision ID]

**Date:** YYYY-MM-DD
**Proposer:** [name]
**Type:** [architectural-override | rule-exception | security-waiver]
**Affected Context:** [path/to/context/file.md]
**Rationale:** [2-3 sentence explanation]
**Approval:** [stakeholder names]
**Status:** [approved | rejected | under-review]
```

---

## Reading This System

For future Claude sessions, read contexts in priority order:

```
masterPrompt.md (root)
├─ architecture-locks.md ← MANDATORY
├─ anti-hallucination-rules.md ← MANDATORY
├─ constraints/non-negotiable-rules.md ← MANDATORY
├─ architecture-context/
├─ semantic-engine-context/
├─ mutation-engine-context/
├─ ai-system-context/
├─ [implementation contexts...]
└─ [operational contexts...]
```

**Treat Level 1 as immutable unless documented override exists in decision-log.md.**

---

## Intent

This policy prevents:
- Architectural drift from session to session
- Hallucinated features outside specification
- Service boundary collapse
- Mutation engine bypass
- AI autonomy violations
- Semantic-first principle erosion

The system is designed to be maintainable for years without losing coherence.
