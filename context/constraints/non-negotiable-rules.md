# Non-Negotiable Rules

## Platform-Level Constraints

These rules are non-negotiable. Violating them breaks the system's core philosophy.

---

## Rule 1: Speed Over Perfection

**Rule:** Optimization for speed is primary. Perfection is secondary.

**What this means:**
- Rapid ideation > pixel-perfect design
- Quick generation > mathematically optimal layouts
- Timely exports > lossless rendering

**Application:**
- UI must be fast. Prioritize performance over feature completeness
- AI generation must complete in seconds, not minutes
- Canvas must handle 1000+ objects smoothly

**Forbidden:**
- Complex rendering that slows interaction
- Over-engineered algorithms that delay generation
- Perfectionist polish at expense of speed

---

## Rule 2: Semantic Structure Over Pixel Manipulation

**Rule:** All structures are semantic hierarchies, never flattened pixels.

**What this means:**
- Every object has metadata
- Every layout is hierarchical
- Every component is reusable
- Everything is automatable

**Application:**
- Design system is semantic, not visual library
- Layouts respond to constraints, not fixed positions
- Mutations preserve structure

**Forbidden:**
- Visual-only blob storage
- Unstructured canvas data
- Pixel-level editing
- Flat SVG exports as primary format

---

## Rule 3: Automation Over Repetitive Manual Work

**Rule:** If humans repeat a task more than 3x, it should be automated.

**What this means:**
- Responsive variants generation
- Layout organization
- Design system application
- Spacing/alignment enforcement
- Asset optimization

**Application:**
- Command system provides quick automation
- Templates eliminate boilerplate
- AI assists with repetitive tasks

**Forbidden:**
- Manual copy-paste layouts
- Click-heavy workflows
- Unautomated asset processing

---

## Rule 4: Modularity Over Monolithic Architecture

**Rule:** Every service is independent. Zero monolith.

**What this means:**
- 11 isolated repositories
- 11 isolated deployments
- 11 isolated scalings
- Communication only via APIs/events

**Application:**
- Can deploy one service without touching others
- Can scale canvas-service 10x without scaling frontend
- Can replace one service implementation without others knowing

**Forbidden:**
- Monorepo structure
- Shared database across services
- Service interdependencies in code
- Shared deployment manifests

---

## Rule 5: AI Orchestration Over Uncontrolled Generation

**Rule:** AI plans and orchestrates. Never generates randomly or without user intent.

**What this means:**
- AI responds to commands, not autonomous changes
- AI calls approved tools only
- AI respects constraints
- AI mutations are auditable
- Same input always produces same output

**Application:**
- Command system explicitly requests AI actions
- Tool registry defines what AI can do
- Mutation validation checks AI output
- All AI actions logged

**Forbidden:**
- Autonomous AI redesigns
- Probabilistic mutations
- Unauditable changes
- AI direct DOM manipulation

---

## Rule 6: Workflow Acceleration Over Feature Bloat

**Rule:** Accelerate existing workflows. Don't add features outside specification.

**What this means:**
- Focus on speeding up ideation
- Focus on speeding up collaboration
- Focus on speeding up export
- NOT adding social media, video, or external integrations

**Application:**
- Command-driven UX
- Keyboard shortcuts for power users
- Fast AI-assisted actions
- Quick export paths

**Forbidden:**
- Social media integrations (outside specification)
- Video/audio features
- Complex filtering/search
- Unnecessary feature additions

---

## Rule 7: Internal Scalability Over Public-Market Complexity

**Rule:** Optimize for easyio's internal use. Don't build for generic public market.

**What this means:**
- Focus on product teams, marketing teams, systems teams
- No need for public signup, freemium tiers, or marketplace
- Security for internal network, not global internet
- Performance for internal projects, not 1M concurrent users

**Application:**
- Simpler auth (internal OIDC/SSO)
- No analytics for public funnel
- Projects measured in dozens, not millions
- Infrastructure on internal VPS

**Forbidden:**
- Public-facing features
- Freemium monetization
- Global CDN (R2 is sufficient)
- Unlimited scalability engineering

---

## Rule 8: Semantic Mutation Safety

**Rule:** Every mutation is reversible, auditable, and deterministic.

**What this means:**
- Full undo/redo support
- Complete audit trail
- Same input = same output always
- Constraint validation before execution

**Application:**
- Mutations stored in format compatible with CRDT
- Audit log preserves all changes with timestamps
- Rollback system available
- Seed-based randomness if randomization needed

**Forbidden:**
- Irreversible operations
- Untraced changes
- Non-deterministic mutation outcomes
- Constraint violations

---

## Rule 9: Deterministic Workflows

**Rule:** All automation is repeatable and deterministic.

**What this means:**
- Responsive generation produces same layout every time
- Layout organization follows consistent rules
- Mutation outcomes are predictable
- No randomization without seeds

**Application:**
- Tests verify exact output
- Workflows are debuggable
- User can reproduce AI actions
- System behavior is explainable

**Forbidden:**
- Random layout generation
- Probabilistic behavior
- Non-repeatable workflows
- Unexplainable AI outputs

---

## Rule 10: Local-First Capability

**Rule:** System functions offline or on local infrastructure. Cloud dependency is optional.

**What this means:**
- Local LLM support is mandatory
- Local database can exist
- Services can run on single machine
- Cloud (R2) is optional, not required

**Application:**
- Ollama/vLLM for local inference
- PostgreSQL on localhost for development
- Docker Compose on single machine
- Works without Cloudflare (though R2 scales better)

**Forbidden:**
- Mandatory cloud API dependency
- Cloud-only authentication
- Proprietary model lock-in
- Unworkable offline

---

## Rule 11: Event-Driven Consistency

**Rule:** All asynchronous operations via queues. No polling, no blocking calls.

**What this means:**
- Export jobs queued in BullMQ
- AI generation queued
- Asset processing queued
- Events drive workflows

**Application:**
- Long operations don't block UI
- Scalability via workers
- Fault-tolerant retries
- Observable queue depths

**Forbidden:**
- Synchronous long-running calls
- Polling loops
- Direct task execution
- Queue bypass

---

## Rule 12: Enterprise-Modern UX

**Rule:** UI must feel enterprise, modern, minimal, and fast.

**What this means:**
- Light mode only, no dark mode
- Large whitespace
- Minimal clutter
- Keyboard-first interactions
- Floating contextual panels
- Command-driven workflows

**Visual Language:**
- Spatial, systematic, clean
- Inspired by Linear, Notion, FigJam, Arc, Vercel
- Low-noise, high-clarity
- Professional, not playful

**Forbidden:**
- Dark mode
- Cramped interfaces
- Modal-heavy workflows
- Cluttered panels
- Casual/playful design language

---

## Rule 13: TypeScript Strict Mode

**Rule:** All code uses TypeScript strict mode. No `any`, no unsafe casts.

**What this means:**
- `tsconfig.json` includes strict settings
- All types properly defined
- No `@ts-ignore`
- Full type safety

**Application:**
- Catch errors at build time
- Better IDE support
- More maintainable code
- Easier refactoring

**Forbidden:**
- JavaScript files (except config)
- `any` types
- Unsafe type assertions
- Disabled strict checks

---

## Rule 14: Service Boundary Enforcement

**Rule:** Each service has clear boundaries. Cross-service coupling is forbidden.

**Boundaries:**
- Frontend owns UI layer only
- Gateway owns auth + routing only
- Canvas owns scene graph only
- AI Orchestrator owns intent + planning only
- etc.

**Communication:**
- REST APIs for request/response
- Events for notifications
- Contracts define interfaces
- No shared code except types/contracts

**Forbidden:**
- Service imports from other services
- Circular dependencies
- Shared business logic
- Database sharing

---

## Rule 15: Documentation-as-Code

**Rule:** Architecture and design decisions are documented in code context, not external wikis.

**What this means:**
- decision-log.md documents why decisions were made
- architecture-locks.md locks decisions
- Code comments explain non-obvious WHY
- Context/ folders preserve institutional knowledge

**Application:**
- New team members read /context/README.md first
- Architectural decisions searchable in context/
- Design rationale preserved for years
- Future sessions don't re-debate settled decisions

**Forbidden:**
- Decisions only in Slack/email
- Architecture in external wiki (not source of truth)
- Undocumented shortcuts
- Tribal knowledge only

---

## Enforcement

**Who enforces?** Every Claude session and every developer.

**How?** Check against these rules before each code commit, design decision, or architecture proposal.

**What if violated?** Document override in decision-log.md with stakeholder approval, OR revert the violation.

**Is there flexibility?** Locks 1-10 are immutable. Rules 11-15 are enforceable but can be overridden with documented justification.

---

## Quick Checklist

Before implementing anything, verify:

- [ ] Semantic structure preserved (Rule 2)
- [ ] Speed optimized (Rule 1)
- [ ] Modularity maintained (Rule 4)
- [ ] AI orchestration not generation (Rule 5)
- [ ] Mutations auditable and reversible (Rule 8)
- [ ] Deterministic outcomes (Rule 9)
- [ ] TypeScript strict (Rule 13)
- [ ] Service boundaries respected (Rule 14)
- [ ] Documented in /context (Rule 15)

If any fail, stop and discuss before proceeding.
