# Semantic Engine Context

Semantic node hierarchy, scene graphs, and metadata-aware structures.

---

## Overview

All data in socialCOPE is **semantic**. Never visual-only. Every object knows what it is, what it contains, and what constraints apply.

**Example:**
```json
{
  "projectId": "proj_001",
  "nodes": [
    {
      "id": "hero_section_01",
      "type": "hero_section",
      "layout": "split",
      "children": [
        {
          "id": "heading_01",
          "type": "heading",
          "text": "Welcome",
          "metadata": {
            "fontSize": "48px",
            "fontWeight": "700"
          }
        }
      ]
    }
  ]
}
```

---

## Core Concepts

### Node
A semantic unit. Has type, metadata, children, layout rules.

**Properties:**
- `id` — unique identifier
- `type` — semantic type (section, button, text, etc.)
- `layout` — layout mode (flex, grid, absolute, etc.)
- `children` — child nodes
- `metadata` — styling, constraints, properties
- `constraints` — size/position rules

### Scene Graph
Hierarchical tree of all nodes in a project.

**Characteristics:**
- Preserves hierarchy and nesting
- Metadata-aware (styling, constraints)
- Inheritance (parent → child styles)
- Relationship-aware (links between nodes)
- Query-able (find nodes by type, property)

### Metadata
Information about a node's appearance and behavior.

**Includes:**
- Color, typography, spacing
- Layout behavior (flex direction, gap)
- Interaction states (hover, active)
- Animation properties
- Custom properties

---

## Semantic Types (Taxonomy)

### Sections
- `hero_section` — Above-fold content
- `card_section` — Grid of cards
- `feature_section` — Feature showcase
- `testimonial_section` — User testimonials
- `footer_section` — Footer content

### Components
- `button` — Interactive button
- `input` — Form input
- `textarea` — Multi-line input
- `select` — Dropdown
- `card` — Content card
- `badge` — Label/tag

### Text
- `heading` — h1-h6 heading
- `paragraph` — Body text
- `label` — Form label
- `caption` — Small text

### Containers
- `container` — Generic wrapper
- `grid` — Grid layout
- `stack` — Vertical/horizontal stack

### Media
- `image` — Image asset
- `icon` — Icon component
- `video` — Video embed

---

## Constraints System

Rules that MUST be respected during mutations.

**Examples:**
- Button height ≥ 44px (accessibility)
- Text line length ≤ 70 characters (readability)
- Spacing ≥ 8px (minimum gap)
- Grid columns ≤ 12 (layout sanity)
- Container width 100%-1200px (responsiveness)

**How They Work:**
1. Before mutation, system checks constraints
2. If violated, mutation rejected with error
3. User sees why mutation failed
4. User can adjust and retry

---

## Responsive Rules

How layouts adapt to different screen sizes.

**Rules:**
- Desktop 3-column → Tablet 2-column → Mobile 1-column
- Font 32px → 24px → 18px
- Gap 32px → 24px → 16px
- Images 100% width (responsive)

**Engine:** Constraint-based. Same rules applied consistently.

---

## Storage

### Schema
Stored in PostgreSQL with:
- Nodes table (id, type, parent_id, metadata_json)
- Relationships table (source_id, target_id, type)
- Constraints table (node_id, rule_name, value)
- Metadata table (node_id, key, value)

### Query Patterns
- Find all nodes of type `button` → Semantic query
- Find all nodes with constraint `height >= 44px` → Constraint query
- Find children of node `hero_01` → Hierarchy query
- Find nodes with property `color === '#2563EB'` → Metadata query

---

## Mutation Constraints

When mutations pass through mutation engine:

1. **Validate** — Does new structure conform to semantic rules?
2. **Check constraints** — Do changes violate any constraints?
3. **Preserve hierarchy** — Are parent-child relationships intact?
4. **Update metadata** — Is all metadata consistent?
5. **Preserve relationships** — Are node links preserved?

---

## Design System Integration

Design tokens applied to semantic structures:

```json
{
  "id": "button_01",
  "type": "button",
  "variant": "primary",  // Applies design system token
  "size": "lg",          // Size from design system
  "metadata": {
    // Computed from design system
    "backgroundColor": "#2563EB",
    "padding": "12px 24px",
    "fontSize": "16px"
  }
}
```

---

## Responsive Generation

Given desktop scene graph:
```
3-column grid
└─ Card A, Card B, Card C
```

Generate mobile variant:
```
1-column stack
└─ Card A, Card B, Card C  (stacked vertically)
```

**Not cloning.** Applying responsive rules intelligently.

---

## Key Files

- `spec.md` — Detailed semantic specification
- `node-schema.md` — Node structure and properties
- `hierarchy-rules.md` — Nesting and hierarchy rules
- `constraint-spec.md` — Constraint definitions and validation
- `responsive-rules.md` — Responsive generation logic

---

## Related Contexts

- [[mutation-engine-context/]] — How mutations work on semantics
- [[architecture-context/]] — Where semantics are stored
- [[storage-context/]] — PostgreSQL schema
- [[design-system-context/]] — Design tokens
- [[ai-system-context/]] — How AI understands semantics

---

## Status

- **Locked:** Yes (architecture-locks.md)
- **Priority:** 2
- **Last Updated:** 2026-05-16

---

**Read this when:** Implementing canvas features, mutations, responsive generation  
**Key principle:** All structures are semantic hierarchies, never visual blobs
