# Frontend Context

UI layer: Next.js, tldraw, Tailwind CSS, component architecture.

---

## Stack

- **Framework:** Next.js App Router
- **Canvas:** tldraw
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** React hooks + WebSocket (not Redux)
- **Package Manager:** npm/pnpm

---

## Architecture

**Pages:**
- Dashboard → Projects list
- Editor → Canvas + tools + inspector
- Settings → User preferences
- Templates → Design templates library

**Components:**
- Canvas wrapper (tldraw + custom handlers)
- Mutation indicators (showing real-time changes)
- Inspector panel (node properties)
- Command bar (⌘K shortcuts)
- Floating toolbars

**State Management:**
- React Context for global UI state
- WebSocket listener for canvas updates
- Local state for UI interactions
- NO Redux (keep it simple)

---

## Key Features

- Light mode only (strict color palette)
- Keyboard-first workflows (⌘K command bar)
- Floating contextual panels
- Real-time cursor/presence sync
- Undo/redo support
- Responsive (desktop + tablet)

---

## Key Files

- `component-structure.md` — Component hierarchy
- `state-management.md` — How state flows
- `canvas-api.md` — tldraw integration

---

## Related Contexts

- [[design-system-context/]] — Colors, spacing, components
- [[ui-ux-context/]] — Interaction patterns
- [[architecture-context/]] — System architecture
- [[mutation-engine-context/]] — How changes flow

---

**Priority:** 3 | **Status:** Stub | **Last Updated:** 2026-05-16
