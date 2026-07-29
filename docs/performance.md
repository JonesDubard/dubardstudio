# Performance budgets — Dubard Studio

Aligned with website blueprint / Engineering Handbook. Values are **posture targets** for the evolve path (static export; images pre-optimized).

| Metric | Target posture | Notes |
|--------|----------------|-------|
| LCP (Home) | Fast on mid-tier mobile | Hero asset must be compressed; never multi‑MB PNG |
| INP | Responsive nav/theme/form | Minimal client JS; Identity not on marketing pages |
| CLS | Stable hero/type | Explicit image width/height |
| Fonts | Non-blocking | `next/font` with `display: swap` |
| Third-party JS | Admin only where possible | Netlify Identity on `/admin` |

## Phase 1 status

Hero LCP asset compressed: **~12.1 MB PNG → ~95 KB JPEG** (`public/images/hero-mockup.jpg`).  
Identity widget removed from marketing layout. Fonts via `next/font`.

See `docs/asset-inventory.md`.

1. Do not commit `.next/` or `out/`.
2. Prefer modern formats (WebP/AVIF) when replacing assets.
3. Do not “fix” performance by removing accessibility.
4. Document regressions in PR notes against this budget.
