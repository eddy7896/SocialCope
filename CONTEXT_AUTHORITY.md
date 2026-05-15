# Context Authority & Enforcement

**CRITICAL:** Context/ folder is IMMUTABLE single source of truth. Code MUST conform 100%.

---

## Golden Rule

> **IF IT'S NOT IN CONTEXT/, IT DOES NOT EXIST.**
> **IF CODE VIOLATES CONTEXT/, CODE IS WRONG.**

---

## Hierarchy (Immutable)

### Level 0: Context System (ABSOLUTE AUTHORITY)
**Source:** `context/` folder

- architecture-locks.md → 10 locked decisions
- anti-hallucination-rules.md → forbidden patterns
- constraints/non-negotiable-rules.md → 15 rules
- source-of-truth-policy.md → authority hierarchy
- All context/ subfolders → detailed specs

**Status:** LOCKED. Cannot be overridden by code.

### Level 1: Code Implementation (MUST CONFORM)
**Source:** All code in `services/` repositories

**Requirement:** 100% conformance to context/

**Enforcement:** Code review checks context/ compliance before merge.

---

## Code Review Checklist (MANDATORY)

Before ANY code merge:

```markdown
## Context Conformance Check

### Architecture Locks (context/architecture-locks.md)
- [ ] No monorepo (Lock 3)
- [ ] Mutation engine used (Lock 2)
- [ ] Semantic structures only (Lock 1)
- [ ] AI orchestration only (Lock 4)
- [ ] Local LLM supported (Lock 5)
- [ ] Event-driven (Lock 6)
- [ ] Deterministic behavior (Lock 7)
- [ ] Correct storage (Lock 8)
- [ ] Light mode only (Lock 9)
- [ ] Approved tech stack (Lock 10)

### Anti-Hallucination (context/anti-hallucination-rules.md)
- [ ] No features outside SpecDoc.md
- [ ] No invented APIs
- [ ] No undefined data structures
- [ ] No direct DOM manipulation
- [ ] No autonomous AI
- [ ] No dark mode
- [ ] No monolithic frameworks
- [ ] No cloud-only dependencies

### Constraints (context/constraints/non-negotiable-rules.md)
- [ ] Speed prioritized over perfection
- [ ] Semantic structure preserved
- [ ] Automation, not repetition
- [ ] Modular, not monolithic
- [ ] AI orchestration, not generation
- [ ] Workflow acceleration only
- [ ] Internal scalability focus
- [ ] Mutation safety enforced
- [ ] Deterministic workflows
- [ ] Local-first capability
- [ ] Event-driven consistency
- [ ] Enterprise-modern UX
- [ ] TypeScript strict mode
- [ ] Service boundaries respected
- [ ] Documentation as code

### Context Alignment
- [ ] References relevant context/ files
- [ ] No contradictions with existing contexts
- [ ] Updates context/ if needed
- [ ] Links to decision-log.md if architectural
- [ ] Follows development-rules/
```

**BLOCK MERGE IF ANY CHECK FAILS.** Fix violation or get override approval.

---

## Violation Handling

### When Code Violates Context/

**Step 1: STOP**
Do not merge. Do not ship.

**Step 2: IDENTIFY VIOLATION**
Which context/ file violated?
- architecture-locks.md?
- anti-hallucination-rules.md?
- constraints/non-negotiable-rules.md?
- Service-specific context?
- Development rules?

**Step 3: FIX OR OVERRIDE**

**Option A: Fix Code (PREFERRED)**
Change code to conform to context/.

**Option B: Override Context/ (RARE)**
Only if:
1. Get tech lead approval
2. Document in decision-log.md with full rationale
3. Update context/ file with change
4. Get C-level sign-off (for locked decisions)
5. Notify team

**Option C: Context Was Wrong (POSSIBLE)**
If context/ has error:
1. Follow change-management.md
2. Update context/ file
3. Update all affected contexts
4. Document decision
5. Re-evaluate code against updated context

**No Option D:** Ignore violation and merge anyway.

---

## Types of Violations

### Type 1: Architectural Lock Violation (CRITICAL)

**Example:** Code uses monorepo pattern (violates Lock 3)

**Severity:** CRITICAL — Stop immediately

**Recovery:**
1. Revert to microservices pattern
2. OR get formal override (C-level + architecture council)
3. Document in decision-log.md
4. Update architecture-locks.md with timestamp

**Cost:** High (architectural implications everywhere)

---

### Type 2: Hallucination (HIGH)

**Example:** Add feature not in SpecDoc.md or masterPrompt.md

**Severity:** HIGH — Prevent merge

**Recovery:**
1. Remove feature
2. OR justify in SpecDoc.md + get approval
3. Follow change-management.md
4. Document decision

**Cost:** Medium (scope change)

---

### Type 3: Constraint Violation (HIGH)

**Example:** Add dark mode (violates Light Mode rule, Lock 9)

**Severity:** HIGH — Prevent merge

**Recovery:**
1. Remove dark mode code
2. OR change constraint (needs approval)
3. Document decision

**Cost:** Medium

---

### Type 4: Service Boundary Violation (MEDIUM)

**Example:** Frontend directly mutates canvas state instead of through mutation engine

**Severity:** MEDIUM — Fix before merge

**Recovery:**
1. Route through mutation engine
2. Add middleware/validation layer
3. Verify audit logging

**Cost:** Low (local fix)

---

### Type 5: Code Standard Violation (LOW)

**Example:** JavaScript instead of TypeScript strict mode

**Severity:** LOW — Fix before merge

**Recovery:**
1. Convert to TypeScript
2. Enable strict mode
3. Add types

**Cost:** Minimal

---

## Context Alignment Process

### When Starting a Task

1. **READ** relevant context/ files
2. **UNDERSTAND** what's locked vs flexible
3. **PLAN** implementation against context
4. **IMPLEMENT** with context as authority
5. **VALIDATE** code against context before PR

### Before Creating PR

1. **CHECK** against architecture-locks.md
2. **CHECK** against anti-hallucination-rules.md
3. **CHECK** against constraints/non-negotiable-rules.md
4. **CHECK** against service-specific contexts
5. **UPDATE** context/ if needed (and document)
6. **REFERENCE** context files in PR description

### During Code Review

1. **VERIFY** code conforms to context/
2. **VERIFY** no new violations introduced
3. **VERIFY** context/ files updated if scope changed
4. **VERIFY** decision-log.md entry (if architectural)
5. **BLOCK** if violations found

### After Merge

1. **UPDATE** PROGRESS.md
2. **UPDATE** context/ files (if needed)
3. **DOCUMENT** any decisions in decision-log.md
4. **NOTIFY** team of changes

---

## Context Files by Category

### MUST CONFORM (Always)

**Architecture Locks:**
- Lock 1: Semantic-first (not visual-only)
- Lock 2: Mutation engine (single change path)
- Lock 3: Microservices (not monorepo)
- Lock 4: AI orchestration (not generation)
- Lock 5: Local LLM (not cloud-only)
- Lock 6: Event-driven (not synchronous)
- Lock 7: Deterministic (not random)
- Lock 8: Storage separation (PostgreSQL + R2)
- Lock 9: Light mode (no dark mode)
- Lock 10: Tech stack (approved tools)

**Anti-Hallucination:**
- No features outside SpecDoc.md
- No invented APIs or events
- No undefined data structures
- No autonomous AI
- No dark mode
- No monolithic patterns

**Non-Negotiable Rules (15):**
- Speed > perfection
- Semantic > pixels
- Automation > repetition
- Modularity > monolith
- Orchestration > generation
- Acceleration > bloat
- Internal scalability
- Mutation safety
- Determinism
- Local-first
- Event-driven
- Enterprise UX
- TypeScript strict
- Service boundaries
- Documentation-as-code

### MUST FOLLOW (Implementation Level)

**Service-Specific Contexts:**
- architecture-context/ → System design
- frontend-context/ → Next.js patterns
- backend-context/ → API design
- mutation-engine-context/ → Change pipeline
- ai-system-context/ → Intent/tools
- etc.

**Development Standards:**
- development-rules/ → Code style, commits, tests
- design-system-context/ → Colors, typography, spacing
- ui-ux-context/ → Interactions, keyboard shortcuts

---

## What Each File Controls

| File | Controls | Violation = |
|------|----------|-------------|
| architecture-locks.md | System design, service structure, tech choices | Architectural error (critical) |
| anti-hallucination-rules.md | Feature scope, API contracts, data structures | Scope creep (high) |
| constraints/non-negotiable-rules.md | Implementation approach, coding standards | Quality issue (medium-high) |
| semantic-engine-context/ | How data is structured and stored | Data model error (critical) |
| mutation-engine-context/ | How all changes must flow | Unsafe mutation (critical) |
| ai-system-context/ | What AI can do, tool registry, safety | AI safety violation (critical) |
| frontend-context/ | Next.js patterns, tldraw usage, state mgmt | UX inconsistency (medium) |
| backend-context/ | API design, business logic patterns | API inconsistency (medium) |
| design-system-context/ | Colors, spacing, typography | Visual inconsistency (low) |
| development-rules/ | Code style, testing, documentation | Code quality (low) |

---

## Enforcement Mechanisms

### 1. Code Review (Mandatory)
- [ ] Reviewer checks context/ compliance
- [ ] Blocks if violations found
- [ ] Requires explicit fix or override approval

### 2. Automated Linting
- [ ] ESLint for code style
- [ ] TypeScript strict for type safety
- [ ] Pre-commit hooks validate against rules

### 3. CI/CD Gates
- [ ] Build fails if TypeScript strict errors
- [ ] Tests fail if coverage <80%
- [ ] Pre-merge checks context alignment

### 4. Architecture Review
- [ ] Quarterly review of context/ violations
- [ ] Identify architectural drift
- [ ] Course correction if needed

### 5. Team Culture
- [ ] Read context/ first, code second
- [ ] Question deviations immediately
- [ ] Document overrides in decision-log.md
- [ ] Update context/ if rules change

---

## Override Process (For Locked Decisions)

Only for architecture-locks.md. Rare.

### Step 1: Document Rationale
```markdown
## Override Request: [Lock ID]

**Lock:** [Name from architecture-locks.md]
**Current Rule:** [Current rule]
**Proposed Change:** [What you want instead]
**Rationale:** [Full paragraph explaining why lock no longer valid]
**Impact:** [What changes as result]
**Timeline:** [When needed]
```

### Step 2: Get Approvals
- Tech Lead: ✓
- Architecture Council: ✓
- CEO/CTO (if architectural): ✓

### Step 3: Document Decision
- Entry in decision-log.md
- Update architecture-locks.md
- Update all affected contexts

### Step 4: Announce
- Team meeting
- Slack notification
- Updated decision-log.md

---

## Questions to Ask Before Coding

1. **Is this in context/?**
   - Yes → Code it according to context
   - No → Ask: should it be in context? → Follow change-management.md

2. **Does my code conform to context/?**
   - Yes → Code is ready
   - No → Fix code or get override approval

3. **Is my code using approved patterns?**
   - Check relevant context/ folder
   - Follow examples given
   - Match code style

4. **Did I update context/ if needed?**
   - New service? → Update service-context/
   - New API? → Update contracts/
   - New schema? → Update schemas/
   - New decision? → Update decision-log.md

5. **Is this documented?**
   - Code comments (minimal, WHY not WHAT)
   - Context/ files (updated)
   - Decision log (if architectural)
   - PR description (references context)

---

## If You Find Context/ Is Wrong

1. **Don't ignore it.** Raise issue.
2. **Don't violate it.** Fix code or follow change process.
3. **Propose fix:**
   - GitHub issue explaining problem
   - Reference context/ file and section
   - Suggest correction
   - Link to decision-log.md if similar decision
4. **Follow change-management.md** for approval
5. **Update context/**
6. **Document decision** in decision-log.md

---

## Monitoring & Enforcement

### Weekly
- [ ] Check PROGRESS.md for on-track status
- [ ] Review PRs for context/ violations
- [ ] Update decision-log.md with new decisions

### Monthly
- [ ] Review context/ files for accuracy
- [ ] Check for architectural drift
- [ ] Identify patterns of violations
- [ ] Team retrospective on process

### Quarterly
- [ ] Full architecture review
- [ ] Context/ accuracy audit
- [ ] Identify locks that should change
- [ ] Refresh team understanding

---

## Summary

**Context/ is IMMUTABLE source of truth.**

**Code MUST conform 100%.**

**Deviations blocked at code review.**

**Overrides rare, documented, approved.**

**Team culture enforces compliance.**

---

**Last Updated:** 2026-05-16  
**Authority:** Tech Lead + Architecture Council  
**Enforcement:** Mandatory before merge
