# Change Management

Process for proposing architectural changes and managing the context system.

---

## Principles

1. **Source of Truth First** — Check source-of-truth-policy.md before proposing change
2. **Locked Decisions First** — Check architecture-locks.md before assuming you can change it
3. **Consensus Before Code** — Discuss before implementing
4. **Documented Always** — All changes logged in decision-log.md
5. **Impact Analysis Required** — Understand what else breaks

---

## Change Classification

### Level 1 — Immutable Governance (NO CHANGE)

**Files:** architecture-locks.md, anti-hallucination-rules.md, source-of-truth-policy.md, constraints/non-negotiable-rules.md

**Change Process:** Override only with formal architectural review + C-level stakeholder approval.

**Timeline:** Weeks, not days. Re-evaluate entire architecture.

**Example:** "We're switching to monorepo architecture" → Requires override.

---

### Level 2 — Core Architecture (RFC Required)

**Files:** masterPrompt.md, SpecDoc.md, Priority 2 contexts (architecture, semantic-engine, mutation-engine, ai-system)

**Change Process:**
1. Write RFC (1-2 page document)
2. Present to architecture council
3. Get consensus (aim for >80% agreement)
4. Document decision in decision-log.md
5. Update affected contexts
6. Announce to team

**Timeline:** 1-2 weeks for discussion and refinement.

**Example:** "Changing mutation engine validation pipeline" → Requires RFC.

---

### Level 3 — System Implementation (Code Review Only)

**Files:** Priority 3 contexts (service, frontend, backend, infrastructure, event, queue)

**Change Process:**
1. Create GitHub PR with detailed description
2. Reference context files in PR
3. Get code review approval
4. Update local context documentation
5. Merge

**Timeline:** 1-3 days for review.

**Example:** "Adding new endpoint to canvas-service API" → Code review only.

---

### Level 4 — UX & Design (Design Review Only)

**Files:** Priority 4 contexts (design-system, ui-ux)

**Change Process:**
1. Create design proposal (Figma, design doc, or mockups)
2. Get design review + product review
3. Update design-system context
4. Implement

**Timeline:** Few days.

**Example:** "Adding new spacing token" → Design review.

---

### Level 5 — Operational Guidance (PR Consensus Only)

**Files:** Priority 5 contexts (product, security, deployment, workflow, governance, development-rules, etc.)

**Change Process:**
1. Create PR
2. Get team consensus
3. Merge

**Timeline:** 1 day.

**Example:** "Updating commit message conventions" → PR consensus.

---

## Proposing a Change

### Step 1: Determine Level

- What file am I changing?
- What level is that file (1-5)?
- What approval process does that level require?

### Step 2: Check Before Proposing

- Read source-of-truth-policy.md
- Read architecture-locks.md
- Read decision-log.md
- Ask: Has this been decided before?
- Ask: Does this violate any locks?

### Step 3: Write Proposal

**For Level 1:** Email stakeholders with full rationale. Don't expect approval.

**For Level 2:** Write RFC (format below).

**For Level 3-5:** Create GitHub issue or PR.

### Step 4: Get Approval

- Level 1: C-level + Architecture council
- Level 2: Architecture council
- Level 3: Code reviewers
- Level 4: Design + Product
- Level 5: Team consensus

### Step 5: Document in decision-log.md

```markdown
## [Decision ID]: [Title]

**Status:** APPROVED  
**Date:** YYYY-MM-DD  
**Level:** [1-5]  
**Proposer:** [name]  
**Type:** [category]  

**Title:** [One sentence]

**Rationale:** [2-3 sentences]

**Approval:** [Who approved]

**Impact:** [What changes]
```

### Step 6: Update Affected Contexts

- Update directly affected context files
- Update decision-log.md
- Update README.md in affected folders
- Add cross-references between related contexts

### Step 7: Announce to Team

- Slack announcement
- Team meeting (if significant)
- Update onboarding materials (if affects new starters)

---

## RFC Template (Level 2 Changes)

```markdown
# RFC: [Title]

## Summary
[2-3 sentence overview]

## Problem
[Why is change needed? What's broken or missing?]

## Proposed Solution
[How does your solution address the problem?]

## Alternatives Considered
[What else could we do? Why isn't it better?]

## Rationale
[Why is this the right solution?]

## Impact
[What breaks? What needs updating? Teams affected?]

## Implementation Plan
[How will we execute this change?]

## Timeline
[How long will this take?]

## Stakeholder Approval Needed
[Who needs to sign off?]

## Related Decisions
[Links to decision-log.md entries]
```

---

## Context File Update Checklist

When changing architecture:

- [ ] Updated decision-log.md with new decision
- [ ] Updated affected context README.md files
- [ ] Updated any files linked in "Related Decisions"
- [ ] Updated cross-references with `[[context-name]]` links
- [ ] Updated context-manifest.json if structure changed
- [ ] Updated context-registry.json if new files added
- [ ] Checked anti-hallucination-rules.md for violated assumptions
- [ ] Verified no architecture-locks.md violations
- [ ] Told team about change

---

## Override Process (Changing Locked Decisions)

Only do this if absolutely necessary.

### Step 1: Document Rationale

Write comprehensive override request:
```markdown
## Override Request: [Lock ID]

**Lock:** [Lock name from architecture-locks.md]

**Current Rule:** [Current rule]

**Proposed Change:** [What you want to do instead]

**Rationale:** 
[Minimum 1 full paragraph. Why is the lock no longer valid?
What circumstances changed? What's the business case?]

**Alternatives:** [Why can't we work within current lock?]

**Risk Assessment:** [What could break? Mitigation plan?]

**Timeline:** [When needed?]

**Approvals Needed:** 
- CEO
- CTO
- Architecture council
- Affected team leads
```

### Step 2: Present to Stakeholders

- Schedule meeting with all approval signatories
- Present rationale clearly
- Answer tough questions
- Don't expect quick approval

### Step 3: Get Written Approval

- All signatories must agree in writing
- Document in decision-log.md as "override"
- Update architecture-locks.md with timestamp + override note

### Step 4: Re-Evaluate Architecture

- Changing one lock may cascade to others
- Review entire architecture for consistency
- Update multiple contexts if needed
- Possible timeline extension

### Step 5: Announce and Document

- Team announcement
- Update decision-log.md
- Update affected contexts
- Archive old context version for history

---

## Context System Health

### Regular Reviews (Monthly)

- Are contexts still accurate?
- Are any contexts contradicting each other?
- Is there outdated content?
- Do decision-log entries reflect actual state?

### When Contexts Diverge

If two contexts contradict:

1. Check source-of-truth-policy.md for hierarchy
2. Higher level wins
3. Update lower-level context to align
4. Document conflict resolution in decision-log.md
5. Add cross-reference note between files

---

## Preventing Drift

### For Claude Sessions

1. Always read architecture-locks.md first
2. Always check anti-hallucination-rules.md before assuming features
3. Check decision-log.md for prior decisions on similar topics
4. Reference context files when making decisions
5. If proposing something new, verify it's in SpecDoc.md or masterPrompt.md

### For Code Reviews

1. Check PR references relevant context files
2. Verify no violation of architecture-locks.md
3. Verify no violation of anti-hallucination-rules.md
4. Verify no violation of constraints/non-negotiable-rules.md
5. Verify no violation of development-rules/

### For Team

1. Regularly re-read Priority 1 contexts (quarterly)
2. New team members read full context before contributing
3. Onboarding includes context system overview
4. Question anything not documented in context/
5. Contribute back to contexts as you learn

---

## Questions?

- **"Is this allowed?"** → Check source-of-truth-policy.md, then architecture-locks.md, then decision-log.md
- **"Has this been decided?"** → Check decision-log.md
- **"What if I want to change this?"** → Follow change classification above
- **"What level is this?"** → Check context-manifest.json for file priority

---

**Last Updated:** 2026-05-16  
**Purpose:** Maintaining architectural coherence and preventing drift  
**Audience:** All engineers, architects, Claude sessions
