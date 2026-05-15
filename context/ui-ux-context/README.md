# UI/UX Context

User interaction patterns, workflows, command system, keyboard shortcuts.

---

## Interaction Philosophy

- **Keyboard-first** — Power users use shortcuts
- **Command-driven** — ⌘K command bar for actions
- **Floating panels** — Context menus, not modal dialogs
- **Fast feedback** → Operations complete in <100ms
- **Low friction** → Minimal clicks, direct access

---

## Command Bar (⌘K)

**Activation:** Cmd+K (Mac) / Ctrl+K (Windows)

**Features:**
- Fuzzy search across commands
- Categories (Mutations, Tools, Templates, Help)
- Keyboard-only navigation
- Recent commands
- Help text for each command

**Examples:**
- "Generate mobile layout"
- "Apply dark theme" (not available, light mode only)
- "Create button"
- "Export PSD"
- "Organize canvas"

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘K | Command bar |
| ⌘D | Duplicate selected |
| ⌘Z | Undo |
| ⌘⇧Z | Redo |
| Delete | Delete selected |
| Shift+Click | Multi-select |
| Escape | Deselect |
| ⌘G | Group |
| ⌘⇧G | Ungroup |
| ⌘L | Lock/unlock |
| ⌘E | Export |
| Space | Pan (hold) |

---

## Canvas Interaction

- **Click** — Select node
- **Double-click** — Edit text
- **Drag** — Move node
- **Resize handle** — Resize node
- **Right-click** → Context menu (move, delete, duplicate, etc.)

---

## Inspector Panel

Shows properties of selected node:
- Geometry (position, size)
- Layout (flex direction, gap, etc.)
- Typography (font, size, weight)
- Colors (fill, stroke, text)
- Advanced (constraints, effects)

---

## Floating Panels

Non-modal panels that appear contextually:
- Assets panel (right side)
- Inspector (right side)
- Component picker (floating)
- Color picker (floating)
- Context menus (at cursor)

**Characteristics:**
- Glassmorphism effect
- Subtle shadow
- Can be moved/resized
- Non-blocking (canvas still interactive)

---

## Key Files

- `interaction-patterns.md` — All patterns
- `command-system.md` — Command bar details
- `keyboard-shortcuts.md` — Full shortcut list
- `workflow-examples.md` — Common workflows

---

## Related Contexts

- [[design-system-context/]] — Visual design
- [[frontend-context/]] — Implementation

---

**Priority:** 4 | **Status:** Stub | **Last Updated:** 2026-05-16
