# Accessibility checklist — Dubard Studio

Target posture: **WCAG 2.2 AA** (Verdant Engineering Handbook / website blueprint).

## Foundation (Phase 0–1) — implement now

| Check | Status |
|-------|--------|
| Skip link to main content | Done |
| `lang` on `html` | Done |
| Visible `:focus-visible` on controls | Done |
| Form fields have visible labels | Done |
| Icon-only controls have accessible names | Done |
| `prefers-reduced-motion` honored in CSS | Done |
| Non-interactive elements not in tab order | Done (service cards) |
| Decorative images `alt=""` / `aria-hidden` | Done |
| Carousel respects reduced motion (no auto-rotate) | Done |

## Launch gate (Phase 5) — later

| Check | Status |
|-------|--------|
| Manual keyboard pass: Home, Work, Case, Contact | Pending routes |
| Automated axe/lighthouse a11y on critical paths | Pending CI |
| Accessibility statement page | Pending |
| Carousel pause / reduced-motion behavior if kept | Pending |
| Qualified form errors announced | Pending |

Evidence of passes should be recorded here or linked from PRs before launch.
