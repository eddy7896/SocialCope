# socialCOPE

## Internal AI-Assisted Design Ideation Operating System

### Complete Technical Specification, Architecture Guide, System Design, Flowcharts & Claude Implementation Guide

Platform Type: Internal Modular Creative Infrastructure System
Primary Objective: Rapid UI Ideation, Design Automation, Semantic Canvas Intelligence, and Workflow Acceleration
---

# 1. Executive Vision

socialCOPE (Create Once, Publish Everywhere) is an internal AI-assisted infinite-canvas operating system built for high-speed product ideation, UI skeleton generation, workflow visualization, campaign structuring, and semantic design automation.

The platform is NOT intended to compete with:

- Figma
- Canva
- Framer
- Adobe

Instead, socialCOPE acts as:

> A semantic creative operating layer for internal product, marketing, and systems teams.

The system focuses on:

- Speed
- Automation
- Semantic structure
- AI orchestration
- Responsive generation
- Infinite visual collaboration
- Workflow compression

The primary goal is:

> Reduce idea-to-visualization time from hours to minutes.

---

# 2. Core Philosophy

## 2.1 Semantic-First Architecture

The platform MUST NOT treat designs as flattened visuals.

Instead:

- Every object is semantic
- Every layout is structured
- Every component is metadata-aware
- Every AI operation is mutation-driven

This enables:

- Intelligent AI editing
- Responsive automation
- Safe mutations
- Reusable design systems
- Automation workflows
- Future scalability

---

## 2.2 AI as an Automation Layer

AI in socialCOPE is NOT intended for:

- Generating random creatives
- Full autonomous design
- Pixel-art rendering

AI SHOULD:

- Automate repetitive workflows
- Assist layouting
- Apply design systems
- Generate responsive variants
- Organize canvas structures
- Assist ideation
- Execute semantic mutations

AI acts as:

> A constrained semantic orchestration engine.

---

# 3. High-Level System Architecture

```text
┌─────────────────────────────────────────────┐
│                 Frontend                    │
│       Next.js + Tailwind + tldraw          │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                API Gateway                  │
│      Authentication + Routing Layer         │
└─────────────────────────────────────────────┘
                     │
 ┌───────────────────┼───────────────────┐
 │                   │                   │
 ▼                   ▼                   ▼
Canvas Service   AI Orchestrator    Asset Service
 │                   │                   │
 ▼                   ▼                   ▼
Realtime Layer   Local AI Runtime    Cloudflare R2
(Yjs/Hocuspocus) (Ollama/vLLM)       Object Storage
 │                   │
 ▼                   ▼
Mutation Engine   Tool Registry
 │
 ▼
Semantic Scene Graph
 │
 ▼
Export Service
```

---

# 4. Recommended Infrastructure Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router |
| Styling | Tailwind CSS |
| Canvas | tldraw |
| Realtime | Yjs + Hocuspocus |
| API Gateway | Fastify / NestJS |
| AI Runtime | Ollama / vLLM |
| Local Models | Qwen 2.5 Coder |
| Database | PostgreSQL |
| Queue System | Redis + BullMQ |
| Object Storage | Cloudflare R2 |
| Export Engine | Puppeteer + ag-psd |
| Container Runtime | Docker |
| Reverse Proxy | Traefik |
| Infrastructure | KVM VPS |

---

# 5. Containerized Microservice Architecture

## IMPORTANT

The system MUST NOT use a monorepo architecture.

Instead:

- independent repositories
- isolated deployments
- isolated scaling
- isolated containers

---

# 6. Recommended Service Structure

```text
/services
   /frontend-service
   /gateway-service
   /canvas-service
   /ai-orchestrator-service
   /llm-runtime-service
   /asset-service
   /template-service
   /realtime-service
   /export-service
   /auth-service
   /analytics-service
```

---

# 7. Service Responsibilities

## 7.1 Frontend Service

### Responsibilities

- UI rendering
- Canvas rendering
- User interaction
- WebSocket client
- Semantic visualization

### Stack

- Next.js
- Tailwind
- tldraw

---

## 7.2 Gateway Service

### Responsibilities

- API aggregation
- Authentication
- Routing
- Session handling
- Rate limiting

### Stack

- Fastify
- NestJS

---

## 7.3 Canvas Service

### Responsibilities

- Scene graph management
- Object mutations
- Layout constraints
- Semantic storage
- Canvas synchronization

---

## 7.4 AI Orchestrator Service

### Responsibilities

- Prompt interpretation
- Intent classification
- Mutation planning
- Tool calling
- Semantic automation

### IMPORTANT

AI NEVER directly edits the canvas.

AI only generates:

- semantic mutations
- tool calls
- structured actions

---

## 7.5 LLM Runtime Service

### Responsibilities

- Local model execution
- Inference serving
- Tool call generation

### Recommended Runtime

- Ollama
- vLLM

### Recommended Models

- Qwen 2.5 Coder
- DeepSeek Coder
- Phi-4

---

## 7.6 Asset Service

### Responsibilities

- Upload management
- Asset optimization
- Thumbnail generation
- Asset metadata
- CDN references

### Storage

Cloudflare R2

---

## 7.7 Template Service

### Responsibilities

- Design systems
- Semantic templates
- Automation recipes
- Layout presets
- Brand systems

---

## 7.8 Export Service

### Responsibilities

- PSD exports
- PDF exports
- SVG exports
- Render pipelines
- Export workers

### Stack

- Puppeteer
- ag-psd

---

## 7.9 Realtime Service

### Responsibilities

- Presence engine
- Cursor sync
- CRDT synchronization
- Multiplayer collaboration

### Stack

- Yjs
- Hocuspocus

---

# 8. Cloudflare R2 Architecture

## R2 MUST STORE

### Assets

- Images
- Uploads
- Screenshots
- References
- Export files

### Templates

- Scene templates
- JSON structures
- Design systems

### Generated Outputs

- Responsive variants
- Cached renders
- Snapshots

---

# 9. Database Design Philosophy

## IMPORTANT

DO NOT store flattened canvas blobs only.

Instead:

Store:

- semantic scene trees
- metadata
- relationships
- layout systems
- constraints

---

# 10. Semantic Scene Graph Structure

## Example

```json
{
  "projectId": "001",
  "nodes": [
    {
      "id": "hero_01",
      "type": "hero_section",
      "layout": "split",
      "style": "enterprise",
      "children": [
        {
          "type": "heading",
          "text": "Manage Teams Better"
        }
      ]
    }
  ]
}
```

---

# 11. Mutation Engine

## CRITICAL CORE SYSTEM

ALL operations MUST pass through the mutation engine.

This includes:

- AI operations
- User operations
- Automation workflows
- Responsive generation
- Layout transformations

---

# 12. Mutation Format

```json
{
  "operation": "add_component",
  "target": "dashboard_01",
  "payload": {
    "type": "metric_card"
  }
}
```

---

# 13. AI Architecture

## Core Principle

AI does NOT:

- edit pixels
- manipulate DOM
- directly mutate frontend state

AI DOES:

- plan
- analyze
- orchestrate
- generate semantic mutations

---

# 14. AI Processing Pipeline

```text
User Intent
    │
    ▼
Intent Classifier
    │
    ▼
Scene Analyzer
    │
    ▼
Mutation Planner
    │
    ▼
Constraint Validator
    │
    ▼
Mutation Engine
    │
    ▼
Canvas Renderer
```

---

# 15. AI Tool Registry

```ts
const tools = {
  createComponent,
  moveComponent,
  resizeComponent,
  alignGrid,
  applyTheme,
  generateResponsive,
  duplicateArtboard,
  optimizeSpacing,
  createVariant,
  organizeCanvas
}
```

---

# 16. Example AI Workflow

## User Input

```text
Generate mobile layout
```

---

## AI Context

```json
{
  "layoutType": "dashboard",
  "selectedNodes": ["analytics_grid"]
}
```

---

## AI Output

```json
{
  "operations": [
    {
      "tool": "generateResponsive",
      "args": {
        "target": "analytics_grid",
        "device": "mobile"
      }
    }
  ]
}
```

---

# 17. Recommended UI Modes

## 17.1 UI Builder Mode

Used for:

- Dashboards
- Apps(webb/mobile)
- SaaS layouts
- Internal tools

---

## 17.2 Campaign Mode

Used for:

- Social layouts
- Campaign structures
- Marketing flows
- Ad permutations

---

## 17.3 Strategy Mode

Used for:

- Product mapping
- System diagrams
- Workflows
- Ecosystem planning

---

## 17.4 Moodboard Mode

Used for:

- Inspiration collection
- Visual references
- Design direction

---

# 18. Infinite Canvas Design Philosophy

The infinite canvas should function as:

> Visual operating memory.

The canvas stores:

- UI concepts
- flows
- screenshots
- references
- ideas
- automation structures
- design systems
- semantic layouts

---

# 19. Design System Architecture

## Design Systems MUST include

### Tokens

- colors
- spacing
- typography
- shadows
- radii

### Components

- buttons
- cards
- inputs
- navbars
- analytics widgets

### Presets

- enterprise
- fintech
- minimal
- dashboard
- editorial

---
create new components and also pre-fetch design assets code/stylig from design systems or libraries

# 20. Responsive Generation System

## DO NOT use static cloning only

Instead use:

- semantic constraints
- adaptive layouts
- layout intelligence
- responsive rules

---

# 21. Responsive Flow

```text
Desktop Layout
      │
      ▼
Constraint Analysis
      │
      ▼
Responsive Rule Engine
      │
      ▼
Semantic Mutation Generation
      │
      ▼
Tablet + Mobile Variants
```

---

# 22. Internal Event Architecture

## Recommended Approach

Event-driven communication.

---

# 23. Event Example

## User Action

```text
Generate social variants
```

---

## Event

```json
{
  "event": "variant.generate.social"
}
```

---

## Services Listening

- export-service
- template-service
- analytics-service

---

# 24. Queue Architecture

## Queue System

Use:

- Redis
- BullMQ

---

# 25. Queue Responsibilities

### AI Tasks

- responsive generation
- organization
- semantic analysis

### Export Tasks

- PSD rendering
- SVG rendering
- PDF generation

### Asset Tasks

- optimization
- compression
- thumbnails

---

# 26. Recommended Deployment Architecture

```text
Internet
   │
   ▼
Traefik Reverse Proxy
   │
   ▼
Gateway Service
   │
 ┌─┼───────────────┐
 │ │               │
 ▼ ▼               ▼
Frontend        Canvas Service
                 │
                 ▼
              PostgreSQL
                 │
                 ▼
               Redis
                 │
 ┌───────────────┼───────────────┐
 ▼               ▼               ▼
AI Runtime   Export Workers   Asset Service
                                   │
                                   ▼
                            Cloudflare R2
```

---

# 27. Docker Compose Example Structure

```yaml
services:
  frontend:
  gateway:
  canvas:
  ai-orchestrator:
  llm-runtime:
  postgres:
  redis:
  export-service:
  asset-service:
  realtime-service:
```

---

# 28. Security Architecture

## IMPORTANT

Even internally:

- isolate services
- use internal networks
- signed mutations
- service tokens
- role validation

---

# 29. Internal AI Security Model

AI MUST NEVER:

- execute arbitrary code
- access unrestricted APIs
- mutate raw frontend state

AI MUST ONLY:

- use approved tools
- generate structured mutations

---

# 30. Recommended UX Philosophy

## UX MUST prioritize

- speed
- keyboard-first workflows
- command-driven interactions
- minimal friction
- contextual actions

---

# 31. Recommended Interaction System

## Floating Command Bar

```text
⌘ + K
```

Examples:

```text
Generate mobile layout
```

```text
Create KPI section
```

```text
Apply EasyIO theme
```

```text
Organize canvas
```

---

# 32. Recommended Visual Design System

## Aesthetic Direction

STRICT LIGHT MODE

---

# 33. Core Colors

| Element | Color |
|---|---|
| Canvas Background | #FAFAFA |
| Floating Panels | #FFFFFF |
| Borders | #E5E5E5 |
| Primary Text | #111827 |
| Secondary Text | #4B5563 |
| Accent | #2563EB |

---

# 34. Visual Style Principles

## Design Language

- Minimal
- Spatial
- Enterprise-modern
- Systematic
- Low-noise
- High-clarity

---

# 35. Recommended UI Inspirations

## Product References

### Canvas + Collaboration

- Figma
- FigJam
- Miro
- tldraw

### System UI

- Linear
- Notion
- Framer
- Arc Browser

### Dashboard Design

- Stripe Dashboard
- Vercel
- Retool

### Command UX

- Raycast
- Warp Terminal
- Cursor

---

# 36. Design Rules

## Panels

- Glassmorphism blur
- Subtle shadows
- 1px borders
- Rounded corners

## Layouts

- Grid-first
- Consistent spacing
- Minimal clutter
- Large whitespace

## Motion

- Soft easing
- Fast transitions
- Spatial animation

---

# 37. Recommended Animation System

## Use

- Framer Motion

---

# 38. Recommended Spacing System

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| xxl | 48px |

---

# 39. Internal Automation Recipes

## Examples

### Recipe: SaaS Dashboard

- create layout
- generate cards
- apply grid
- add analytics widgets

### Recipe: Campaign Set

- duplicate layouts
- generate aspect ratios
- apply branding
- export variants

---

# 40. Future AI Expansion

## Future Capabilities

### Visual Understanding

- screenshot analysis
- layout extraction
- reference matching

### Predictive Assistance

- automatic spacing
- smart alignment
- hierarchy recommendations

### Design Intelligence

- balance scoring
- readability analysis
- density optimization

---

# 41. Development Roadmap

## Phase 1

Foundation

- Next.js setup
- tldraw integration
- semantic scene graph
- PostgreSQL
- Docker infrastructure

---

## Phase 2

Realtime Collaboration

- Yjs integration
- Hocuspocus
- presence engine

---

## Phase 3

Mutation Engine

- structured operations
- semantic actions
- constraint validation

---

## Phase 4

AI Orchestration

- local LLM runtime
- tool calling
- command workflows

---

## Phase 5

Responsive Engine

- semantic responsive generation
- adaptive layouts

---

## Phase 6

Export Infrastructure

- PSD exports
- vector exports
- render workers

---

# 42. Recommended Claude Code Instructions

## Claude MUST

- generate modular architecture
- avoid monorepo assumptions
- use semantic structures
- separate services cleanly
- use TypeScript strictly
- use Tailwind only
- avoid dark mode
- prioritize maintainability
- use clean service boundaries

---

# 43. Recommended Claude Design Instructions

## Claude Design MUST

- prioritize clarity
- use large whitespace
- maintain strict light mode
- avoid clutter
- design for speed
- optimize keyboard-first workflows
- use floating contextual interfaces
- use enterprise-modern aesthetics
- avoid unnecessary complexity

---

# 44. Final Platform Vision

socialCOPE is NOT a traditional design tool.

It is:

> An internal semantic visual operating system for rapid ideation, automation, collaboration, and intelligent workflow acceleration.

The platform should evolve into:

- EasyIO's visual operating memory
- automation orchestration layer
- semantic design engine
- collaborative creative infrastructure
- AI-assisted systems thinking workspace

---

# 45. Final Core Principles

## ALWAYS PRIORITIZE

### Speed over perfection

### Semantic structure over pixel manipulation

### Automation over repetitive manual work

### Modularity over monolithic architecture

### AI orchestration over uncontrolled generation

### Workflow acceleration over feature bloat

### Internal scalability over public-market complexity

---

# END OF SPECIFICATION
