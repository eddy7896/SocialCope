# AI System Context

AI orchestration, tool registry, and safety constraints.

---

## Overview

AI in socialCOPE is:
- **Orchestrator** — Understands user intent and plans
- **Planner** — Generates structured mutations
- **Constrained** — Can only call approved tools
- **Auditable** — Every operation logged
- **Safe** — Cannot directly edit canvas or execute arbitrary code

AI is NOT:
- Autonomous generator of random designs
- Direct DOM manipulator
- Unvalidated operation executor
- Uncontrolled creative agent

---

## AI Processing Pipeline

```
User Command (e.g., "Generate mobile layout")
    ↓
1. Intent Classification
   └─ Parse: Is this a layout command? Style command? Organization?
    ↓
2. Context Analysis
   └─ Analyze: What's the current scene graph? What are constraints?
    ↓
3. Mutation Planning
   └─ Plan: What mutations achieve the intent?
    ↓
4. Tool Selection
   └─ Select: Which approved tools to call?
    ↓
5. Mutation Generation
   └─ Generate: Structured mutation JSON
    ↓
6. Constraint Validation
   └─ Validate: Do mutations respect constraints?
    ↓
7. Mutation Execution
   └─ Execute: Pass to mutation engine
    ↓
8. Audit Logging
   └─ Log: "AI generated 3 mutations for mobile layout"
    ↓
9. User Notification
   └─ Show: "Generated mobile layout (3 changes)"
```

---

## Intent Classification

**First step:** Understanding what user wants.

**Examples:**
- "Generate mobile layout" → Intent: `responsive.generate`, scope: `mobile`, target: `current_layout`
- "Make this button bigger" → Intent: `node.resize`, target: `selected_button`, direction: `increase`
- "Apply dark theme" → Intent: `theme.apply`, theme: `dark_enterprise`
- "Organize canvas" → Intent: `canvas.organize`, strategy: `auto`

**Output:** Structured intent object for planner.

---

## Tool Registry

**Approved tools AI can call.** Each tool:
- Has validated inputs
- Has predictable output
- Is safe (no side effects outside mutation engine)
- Is logged

### Layout Tools
- `createComponent(type, parentId, props)` → Create new component
- `moveComponent(nodeId, parentId, position)` → Move to parent
- `resizeComponent(nodeId, width, height)` → Change size
- `deleteComponent(nodeId)` → Remove component
- `duplicateComponent(nodeId, count)` → Clone node

### Styling Tools
- `applyTheme(nodeId, themeName)` → Apply design system theme
- `updateColor(nodeId, colorKey, colorValue)` → Change color
- `updateTypography(nodeId, fontName, fontSize)` → Change text style
- `updateSpacing(nodeId, paddingKey, value)` → Change padding/margin

### Layout Tools
- `alignGrid(nodeIds, alignment)` → Align multiple nodes
- `distributeNodes(nodeIds, spacing)` → Even spacing
- `createGrid(rows, cols)` → Create grid layout
- `createStack(direction, spacing)` → Create stack

### Responsive Tools
- `generateResponsive(nodeId, breakpoint)` → Mobile/tablet variant
- `applyResponsiveRule(nodeId, rule)` → Add responsive constraint

### Organization Tools
- `organizeCanvas(strategy)` → Auto-organize (group by type, auto-layout)
- `createVariant(nodeId, variantName)` → Create design variant

### Workflow Tools
- `applyTemplate(templateId, targetId)` → Apply design template
- `createSnapshot(projectId, snapshotName)` → Save version
- `restoreSnapshot(snapshotId)` → Restore version

---

## Tool Constraints

**What tools CANNOT do:**
- Direct DOM manipulation
- Unvalidated mutations
- Arbitrary code execution
- Access files outside system
- Bypass constraint validation

**What tools MUST do:**
- Return structured mutations
- Respect all constraints
- Log all operations
- Handle errors gracefully
- Support undo/redo

---

## AI Orchestration Features

### 1. Deterministic Behavior
Same intent → Same mutations always.

```javascript
// Given identical scene graph and intent
generateMobileLayout(desktopScene)
// Always produces same mobile layout mutations
// (no randomization without seeds)
```

### 2. Constraint Awareness
AI understands and respects constraints.

```javascript
resizeButton(button, 30)
// REJECTED: Button height 30px violates minimum 44px
// AI suggests: "Use minimum height 44px"
// User can accept suggestion or modify
```

### 3. Context Preservation
AI maintains semantic meaning during mutations.

```javascript
generateResponsive(layout, "mobile")
// Preserves: hierarchy, relationships, semantics
// Adapts: widths, spacing, font sizes
// Results: Valid mobile layout, not broken clone
```

### 4. Incremental Feedback
AI shows what it's planning before executing.

```javascript
// AI shows:
// - Intent understood: "Generate mobile layout"
// - Strategy: "Adapt 3-column to 1-column stack"
// - Mutations planned: 7 changes to sizing/spacing
// - Estimated impact: [visual preview]
// User approves/cancels before execution
```

---

## Local LLM Runtime

### Supported Runtimes
- **Ollama** — Easiest, batteries-included
- **vLLM** — Fastest inference
- **llama.cpp** — Lightweight C++

### Supported Models
- Qwen 2.5 Coder — Recommended for code/logic
- DeepSeek Coder — Specialized for programming
- Phi-4 — Lightweight, smaller footprint

### Deployment
```
LLM Runtime Service (Docker container)
├─ Ollama or vLLM
├─ Model file (in container)
└─ API endpoint (localhost:11434)

AI Orchestrator Service
├─ Connects to LLM Runtime via API
├─ Sends intent + context
└─ Receives mutations
```

### Why Local?
- **Privacy:** No data to cloud APIs
- **Independence:** Works without internet
- **Control:** Choose your model
- **Cost:** No per-request charges

---

## AI Safety Constraints

### 1. Tool Registry Gates
AI can ONLY call tools in approved registry. Unknown tools rejected.

### 2. Input Validation
All inputs to tools validated before execution.

### 3. Output Validation
All AI-generated mutations validated through mutation engine.

### 4. Rate Limiting
Prevent AI from spamming mutations (max N mutations per minute).

### 5. Cost Controls
If using cloud LLM (optional), enforce token budgets.

### 6. Audit Trail
Every AI operation logged with:
- Intent
- Tools called
- Mutations generated
- Constraints checked
- Result (success/error)

---

## Error Handling

**If AI generations fail validation:**

```json
{
  "status": "mutation_validation_failed",
  "mutations": [
    {mutation1},
    {mutation2 - FAILED},  // Violates constraint
    {mutation3}
  ],
  "error": "Mutation 2 violates constraint: button height < 44px",
  "suggestion": "Adjust: Use button height 44px minimum",
  "aiCanRetry": true
}
```

**AI can:**
- Adjust and retry
- Suggest alternative approach
- Defer to user decision
- Explain why it failed

---

## Conversation Context

When user gives AI command:

**Context AI receives:**
- Current scene graph (what's on canvas)
- Current design system/theme
- Constraints (what rules apply)
- User preferences (if any)
- Selection (what user selected)

**Example:**
```json
{
  "scene": { /* full scene graph */ },
  "designSystem": { /* colors, typography, spacing */ },
  "constraints": { /* minimum sizes, maximum widths, etc. */ },
  "selection": ["button_01", "button_02"],
  "userPreferences": { "compact": true }
}
```

**AI uses context to:**
- Understand current design
- Respect design system
- Apply constraints
- Tailor mutations to selection

---

## Key Files

- `spec.md` — Detailed AI system specification
- `tool-registry.md` — Complete tool definitions
- `orchestration-pipeline.md` — Step-by-step pipeline
- `safety-constraints.md` — Safety rules and guardrails
- `error-handling.md` — Error codes and recovery

---

## Related Contexts

- [[mutation-engine-context/]] — Where AI mutations are executed
- [[semantic-engine-context/]] — Semantic structures AI works with
- [[tool-contracts.md]] — Tool input/output contracts
- [[prompts/]] — Claude system prompts for AI (if using Claude API)

---

## Principles

1. **User Control** — Humans decide, AI assists
2. **Transparency** — AI shows reasoning and plans
3. **Safety** — Cannot bypass validation
4. **Determinism** — Reproducible outcomes
5. **Auditability** — Every operation logged
6. **Efficiency** — Fast planning, quick execution

---

## Status

- **Locked:** Yes (architecture-locks.md)
- **Priority:** 2
- **Last Updated:** 2026-05-16

---

**Read this when:** Implementing AI features, tool calling, intent processing  
**Key principle:** AI orchestrates, never generates autonomously
