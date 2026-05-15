# Glossary

Human-readable explanations of key concepts. See `terminology-registry.md` for canonical definitions.

---

## What is socialCOPE?

An internal operating system for design ideation. Think of it as: *a semantic, AI-assisted infinite canvas where product teams can rapidly sketch, iterate, and share ideas — with AI handling the boring automation so humans focus on creativity.*

**NOT** Figma. **NOT** a public design tool. **NOT** pixel-perfect rendering. It's internal, semantic, fast, and automation-focused.

---

## What is a Semantic Structure?

Imagine storing a design as a tree of meanings instead of a flat image. Every button "knows" it's a button. Every section "knows" its children. Every constraint is preserved.

**Example:**
```
Project
├── Hero Section
│   ├── Heading (text: "Welcome")
│   ├── Subheading (text: "Let's get started")
│   └── CTA Button (color: primary, size: large)
├── Cards Grid
│   ├── Card (title: "Feature 1", icon: "star")
│   ├── Card (title: "Feature 2", icon: "heart")
│   └── Card (title: "Feature 3", icon: "rocket")
```

**Benefit:** AI can understand this, modify it intelligently, generate variants, etc. A flat image? AI sees only pixels.

---

## What is a Mutation?

A controlled change. Instead of "user clicks and directly edits", it's:

1. User says: "Make the button bigger"
2. System plans: "Increase button size from 16px to 20px"
3. System validates: "Does this violate any constraints? No."
4. System executes: "Update node property"
5. System logs: "Button resized, [timestamp], [user], [before/after]"
6. System renders: "Display updated canvas"

**Benefit:** Undo/redo, audit trail, no broken states, deterministic outcomes.

---

## What is Responsive Generation?

Instead of manually creating mobile versions:

```
Desktop: 3-column grid
↓ (AI analyzes constraints)
Tablet: 2-column grid
↓ (AI analyzes constraints)
Mobile: 1-column stack
```

AI understands what's important (content > layout), respects constraints (padding, hierarchy), and generates sensible mobile versions automatically.

**NOT** cloning and scaling. **NOT** manual copy-paste. Intelligent adaptation.

---

## What is AI Orchestration?

AI is the *assistant*, not the *designer*.

**User:** "Generate a mobile layout"
**AI:** "I'll convert your desktop layout to mobile by: collapsing 3-column to 1-column, hiding secondary elements, stacking vertically, preserving hierarchy."
**AI:** (Plans mutations)
**System:** (Validates, executes, displays)

**NOT:**
- "I'll design a beautiful new layout" (autonomous)
- "Here's a random concept" (uncontrolled)
- "Let me edit your canvas directly" (unsafe)

**Benefit:** Fast, predictable, safe, auditable.

---

## What is a Service Boundary?

Each service is a mini-application with its own code, database, deployment, and scaling.

**Frontend Service** owns: UI, user interaction, rendering
**Canvas Service** owns: Scene graph, mutations, data persistence
**Gateway Service** owns: Authentication, routing
**AI Orchestrator** owns: Intent planning, tool calling

**Benefit:** Can change Canvas Service without touching Frontend. Can scale AI independently. No giant entangled codebase.

---

## What is Event-Driven?

Services talk via events, not direct calls.

**Direct calls (BAD):**
```
Frontend calls Canvas.updateNode()
Canvas calls AI.generateVariant()
AI calls Export.renderPSD()
(Tight coupling, cascading failures)
```

**Event-driven (GOOD):**
```
Frontend: User updates node → Canvas publishes "node.updated" event
Export listens to "node.updated" → Queues render job
AI listens to "node.updated" → Considers responsive generation
(Loose coupling, independent scaling)
```

**Benefit:** Services don't know about each other. Easy to add new services. Scale independently.

---

## What is a Tool in AI Context?

A function AI is allowed to call.

**Examples:**
- `createComponent(type, props)` → Creates new component
- `moveComponent(id, x, y)` → Moves component
- `applyTheme(nodeId, themeName)` → Applies design system theme

**NOT:**
- Direct canvas editing
- Unvalidated changes
- Arbitrary code execution

**Benefit:** AI can only do approved things. Safe. Auditable. Predictable.

---

## What is Deterministic Behavior?

Same input → Same output. Always.

```javascript
// DETERMINISTIC ✓
generateLayout({width: 1024, cols: 3}) 
  // Always produces 3-column 1024px wide layout

// NON-DETERMINISTIC ✗
generateRandomLayout({width: 1024})
  // Different layout each time (unless seeded)
```

**Benefit:** Tests pass. Users can reproduce issues. AI is predictable.

---

## What is a Constraint?

A rule that must be respected.

**Examples:**
- Button height ≥ 44px (accessibility)
- Content padding ≥ 16px (whitespace)
- Text width ≤ 70 chars per line (readability)
- Grid columns ≤ 12 (layout sanity)

**How they work:** Before executing mutations, system checks constraints. If violated, mutation is rejected.

**Benefit:** Prevents design violations. Maintains consistency.

---

## What is Rollback?

Undo. Revert a mutation.

**How it works:**
1. Mutation executed: Button color changed red → blue
2. Audit log: `{id: 42, before: red, after: blue, timestamp}`
3. User hits Undo
4. System replays: `{id: 42, revert: true}` → Button back to red

**Benefit:** Users can experiment without fear. No "oops" moments.

---

## What is the Audit Trail?

Complete record of every change.

```
[2026-05-16 10:23:45] user: john, action: resize_button, node: btn_001, before: {w: 100, h: 40}, after: {w: 120, h: 50}
[2026-05-16 10:24:12] user: john, action: change_color, node: btn_001, before: #2563EB, after: #DC2626
[2026-05-16 10:25:00] user: jane, action: apply_theme, nodes: [*], theme: enterprise
```

**Benefit:** Compliance. Debugging. Understanding history. Accountability.

---

## What is the Light Mode Design?

Strict light theme. No dark mode.

**Colors:**
- Canvas background: light gray (#FAFAFA)
- Panels: white (#FFFFFF)
- Text: dark gray (#111827)
- Accents: blue (#2563EB)

**Aesthetic:** Enterprise, clean, minimal, professional. Like Linear, Notion, Stripe.

---

## What is Keyboard-First?

Power users don't click menus. They use shortcuts.

**Examples:**
- ⌘K → Command bar (type actions)
- ⌘D → Duplicate selected
- ⌘Z → Undo
- Shift+Click → Multi-select
- Escape → Deselect

**Benefit:** Fast workflows. Reduced friction. Professional UX.

---

## What is Local-First AI?

AI runs on your machine, not someone else's servers.

**Options:**
- Ollama: Easy local LLM runner
- vLLM: Fast local inference
- llama.cpp: Lightweight C++ implementation

**Models:** Qwen, DeepSeek, Phi (not GPT, not Claude)

**Benefit:** Privacy. Control. Offline capability. No API lock-in.

---

## What is PostgreSQL for?

Storing structured data that has relationships.

**Examples:**
- Project metadata (name, owner, created_at)
- Scene graph structure (node hierarchies)
- User data (roles, teams, permissions)
- Audit logs (who changed what when)

**NOT:** Large assets (use R2 instead).

---

## What is Cloudflare R2?

Storing large files: assets, exports, generated images.

**Examples:**
- User-uploaded images
- Exported PSD/SVG/PDF files
- Generated responsive variants
- Snapshots for versioning

**Benefit:** Cheap, scalable, doesn't clog database.

---

## What is BullMQ?

Job queue for long-running tasks.

**Examples:**
- Export PSD file (takes 10 seconds)
- Generate responsive variants (takes 5 seconds)
- Optimize image (takes 2 seconds)

**How it works:**
1. Frontend requests export
2. System queues job
3. Return immediately to user
4. Worker processes job in background
5. Notify user when done

**Benefit:** UI stays responsive. Scales to many workers.

---

## What is Presence?

Knowing who else is on the canvas right now.

- John's cursor is at (500, 300)
- Mary is selecting the hero section
- Bob just deleted a component

**Powered by:** Yjs + Hocuspocus

**Benefit:** Multiplayer collaboration, real-time awareness.

---

## What is CRDT?

Conflict-free Replicated Data Type. Allows two people to edit simultaneously without conflicts.

**Example:**
- John adds button at position 100
- Mary adds button at position 200
- Both changes sync automatically, no merge conflict

**Used by:** Yjs, Figma, Google Docs

---

## Remember

- **Speed > Perfection** — Fast iteration beats perfect polish
- **Semantic > Pixels** — Structure beats images
- **AI Assists > AI Generates** — Humans decide, AI helps
- **Modular > Monolithic** — Independent services beat one giant app
- **Deterministic > Random** — Predictable beats magical
- **Auditable > Hidden** — Transparency beats mystery

Read `architecture-locks.md` for the 10 immutable rules.

---

**Questions?** Check the relevant context folder or ask the team.
