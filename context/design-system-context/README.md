# Design System Context

Visual design system: colors, typography, spacing, component library.

---

## Design Language

**Aesthetic:** Enterprise-modern, spatial, minimal, systematic

**Inspirations:** Linear, Notion, FigJam, Stripe, Vercel

**Values:**
- High clarity (no visual confusion)
- Large whitespace (breathing room)
- Professional appearance
- Fast interaction
- Low noise

---

## Color Palette

| Use | Color | Hex |
|-----|-------|-----|
| Canvas background | Light gray | #FAFAFA |
| Panels | White | #FFFFFF |
| Primary text | Dark gray | #111827 |
| Secondary text | Medium gray | #4B5563 |
| Borders | Light gray | #E5E5E5 |
| Accent/Primary | Blue | #2563EB |
| Danger | Red | #DC2626 |
| Success | Green | #16A34A |
| Warning | Orange | #EA580C |

**Constraints:**
- Light mode ONLY
- No dark mode (locked decision)
- Contrast ratio ≥ 4.5:1 for accessibility

---

## Typography

| Type | Font | Size | Weight | Line Height |
|------|------|------|--------|-------------|
| h1 | System | 32px | 700 | 40px |
| h2 | System | 24px | 700 | 32px |
| h3 | System | 20px | 600 | 28px |
| Body | System | 16px | 400 | 24px |
| Small | System | 14px | 400 | 20px |
| Caption | System | 12px | 400 | 16px |

**Font Stack:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

---

## Spacing Scale

| Token | Pixels |
|-------|--------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| xxl | 48px |

**Usage:** Padding, margins, gaps all use this scale

---

## Component Library

**Buttons:**
- Primary (accent blue)
- Secondary (gray)
- Danger (red)
- Sizes: sm, md, lg
- States: default, hover, active, disabled

**Forms:**
- Input, Textarea, Select
- Labels, Error messages
- Validation states

**Cards:**
- Rounded corners, subtle shadow
- Padding: md (16px)
- Border: 1px light gray

**Panels:**
- Glassmorphism blur effect
- Subtle shadow
- 1px border
- Rounded corners

---

## Key Files

- `colors.md` — Color specifications and usage
- `typography.md` — Font family, sizing, weights
- `spacing.md` — Spacing scale and usage
- `components.md` — Component specifications
- `animations.md` — Motion and easing

---

## Related Contexts

- [[ui-ux-context/]] — Interaction design
- [[frontend-context/]] — Implementation with Tailwind
- [[design-system-context/]] → Auto-applied by AI via themes

---

**Priority:** 4 | **Status:** Stub | **Last Updated:** 2026-05-16
