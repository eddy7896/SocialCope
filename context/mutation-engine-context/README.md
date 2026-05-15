# Mutation Engine Context

How all changes flow through the system. Single source of change for entire platform.

---

## Overview

**Every change** to canvas, scene graph, or persistent data passes through the mutation engine.

**NOT:** Direct DOM edits, direct database mutations, unvalidated changes.

**ALWAYS:** Intent → Plan → Validate → Constraint Check → Execute → Audit → Render.

---

## The Mutation Pipeline

```
User Action / AI Command
    ↓
1. Intent Classification
   └─ What does user want? (e.g., "resize button")
    ↓
2. Mutation Planning
   └─ How do we execute? (e.g., update node width to 120px)
    ↓
3. Constraint Validation
   └─ Does this violate rules? (e.g., button min height 44px)
    ↓
4. Mutation Engine Execution
   └─ Execute the change
    ↓
5. Persistence
   └─ Write to PostgreSQL
    ↓
6. Audit Logging
   └─ Log: {timestamp, user, action, before, after}
    ↓
7. Event Publishing
   └─ Broadcast: "canvas.mutation.created"
    ↓
8. Client Notification
   └─ WebSocket update to frontend
    ↓
9. Canvas Rendering
   └─ Re-render updated scene graph
```

---

## Mutation Contract

Every mutation must:

1. **Be structured** — Defined schema, not arbitrary data
2. **Be validated** — Pass constraint checker
3. **Be reversible** — Can undo/redo
4. **Be auditable** — Logged with full context
5. **Be deterministic** — Same input → same output

---

## Mutation Format

```json
{
  "operation": "update_node",           // Operation type
  "targetId": "button_01",              // What to mutate
  "changes": {                          // What changed
    "metadata.width": "120px"
  },
  "constraints": {                      // Constraints to check
    "minHeight": "44px"
  },
  "metadata": {                         // Audit context
    "userId": "user_123",
    "timestamp": "2026-05-16T10:30:00Z",
    "source": "user-action"            // user-action, ai-command, system-automation
  }
}
```

---

## Mutation Types

### Data Mutations
- `update_node` — Change node properties
- `create_node` — Add new node
- `delete_node` — Remove node
- `move_node` — Change parent/position
- `duplicate_node` — Clone node

### Layout Mutations
- `update_layout` — Change layout mode
- `apply_constraint` — Add/update constraint
- `align_nodes` — Align multiple nodes
- `distribute_nodes` — Even spacing

### Style Mutations
- `apply_theme` — Apply design system theme
- `update_color` — Change color
- `update_typography` — Change font properties
- `update_spacing` — Change padding/margin

### Workflow Mutations
- `apply_template` — Apply design template
- `generate_responsive` — Create mobile variant
- `organize_canvas` — Auto-organize nodes

---

## Validation Pipeline

### Step 1: Schema Validation
Does mutation conform to mutation schema?

```json
✓ Operation type valid
✓ Target ID exists
✓ Changes have valid properties
✓ Metadata complete
```

### Step 2: Constraint Validation
Do changes violate semantic constraints?

```json
✓ Button height >= 44px
✓ Text line length <= 70 chars
✓ Spacing >= 8px
✓ Grid columns <= 12
```

### Step 3: Relationship Validation
Are hierarchy and relationships preserved?

```json
✓ Parent-child relationships intact
✓ No circular dependencies
✓ References to other nodes valid
```

### Step 4: State Validation
Is target in valid state for mutation?

```json
✓ Node exists
✓ Node is not locked
✓ User has permission
✓ No concurrent edit conflict (CRDT)
```

---

## Execution

If all validations pass:

1. **Acquire lock** — Prevent concurrent edits
2. **Execute mutation** — Update in-memory scene graph
3. **Persist** — Write to PostgreSQL
4. **Release lock** — Allow other operations
5. **Publish event** — Notify listeners
6. **Update clients** — WebSocket broadcast

**Atomicity:** Entire pipeline is atomic. If any step fails, all changes rolled back.

---

## Audit Logging

Every mutation creates audit entry:

```json
{
  "id": "audit_001",
  "timestamp": "2026-05-16T10:30:00Z",
  "userId": "user_123",
  "operation": "update_node",
  "targetId": "button_01",
  "before": {
    "metadata.width": "100px",
    "metadata.height": "40px"
  },
  "after": {
    "metadata.width": "120px",
    "metadata.height": "50px"
  },
  "source": "user-action",
  "status": "success"
}
```

**Retention:** Indefinite. Searchable by user, date, node, operation.

---

## Undo/Redo

Using audit log:

**Undo:**
```
Last mutation: button resized 100px → 120px
Undo: Create reverse mutation (120px → 100px)
Execute reverse mutation
Log: "User undid resize"
```

**Redo:**
```
Undo history: [undo_1, undo_2, ...]
Redo: Re-execute most recent undo
Log: "User redid resize"
```

**Support:** Full undo/redo stack for entire session.

---

## Error Handling

If mutation fails validation:

```json
{
  "status": "error",
  "code": "CONSTRAINT_VIOLATED",
  "message": "Button height 30px violates minimum 44px",
  "field": "metadata.height",
  "constraint": "minHeight >= 44px",
  "suggestedFix": "Use minimum height 44px"
}
```

**User sees:** Clear error message with suggestion for fix.

---

## Performance

**Goal:** Mutations complete in <100ms (user can't perceive latency).

**Optimization:**
- In-memory scene graph for fast validation
- PostgreSQL indexes on frequently queried columns
- Async logging (audit writes don't block)
- Batch mutations when possible

---

## Safety Guarantees

1. **Consistency** — Database never in invalid state
2. **Durability** — Once committed, never lost
3. **Atomicity** — Mutation entirely succeeds or fails
4. **Auditability** — Full history preserved
5. **Recoverability** — Can rollback any change

---

## Key Files

- `spec.md` — Detailed mutation engine specification
- `mutation-contracts.md` — Mutation schema definitions
- `validation-rules.md` — All validation rules
- `audit-spec.md` — Audit logging spec
- `error-handling.md` — Error codes and messages

---

## Related Contexts

- [[semantic-engine-context/]] — Semantic structures mutations apply to
- [[architecture-context/]] — Canvas service owns mutation engine
- [[ai-system-context/]] — How AI generates mutations
- [[storage-context/]] — PostgreSQL persistence

---

## Status

- **Locked:** Yes (architecture-locks.md)
- **Priority:** 2
- **Last Updated:** 2026-05-16

---

**Read this when:** Implementing mutations, canvas changes, any state modification  
**Key principle:** ALL changes through mutation engine, NEVER direct edits
