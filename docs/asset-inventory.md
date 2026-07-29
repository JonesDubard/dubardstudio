# Asset inventory — Phase 1

Recorded 2026-07-21 as part of Migration Phase 1 (performance / hygiene).

## Deployed hero

| Asset | Role | Size |
|-------|------|------|
| `public/images/hero-mockup.jpg` | Active hero (`content/settings.json` → `heroImage`) | ~95 KB (was ~12.1 MB PNG) |
| `public/images/Mocku.png` | **Removed from deploy path** after compression | was ~12.1 MB |

## In use (CMS / content)

| Asset | Used by |
|-------|---------|
| `/images/hero-mockup.jpg` | Site settings hero |
| `/images/Profilepic.jpeg` | Site settings profile |
| `/images/FilterMe.jpeg` | Project: restaurant-filter-menu |
| `/images/Mocsahomepage.jpeg` | Project: ngo-landing-page |
| `/images/Moschify.jpeg` | Project: business-website-demo |
| `/images/Lucina.jpg` | Testimonial |
| `/images/Licosteam.jpg` | Testimonial |
| `/images/Icons/*` | Service / social icons |

## Present under `public/images/` but unused by content (candidates to remove later)

| Asset | Notes |
|-------|-------|
| `Mockup.jpeg` | Not referenced in `content/` |
| `Portfolio.jpeg` | Not referenced |
| `slipdesk.png` | Not referenced |
| `tiky_mobile_desktop_view.png` | Not referenced |
| `Mocsa.jpeg` | Not referenced |

These do not block Phase 1 exit. Prefer deleting or archiving outside `public/` before Phase 2 to keep static export lean.

## Other hygiene

| Item | Status |
|------|--------|
| `.next/` / `out/` gitignore | Done (Phase 0) |
| Unused npm dep `react-intersection-observer` | Removed (Phase 0) |
| Netlify Identity on marketing pages | Removed; admin-only (Phase 0) |
| Root `files/` resume PDF vs `public/files/` | Review manually; keep company profile in `public/files/` |
| Brace-expansion `{public/` folder if present | Remove manually if still on disk |

## Baseline metrics

No Search Console export captured in-repo. Before Phase 2, capture:

1. Lighthouse (mobile) Home LCP / CLS / INP  
2. Deployed page weight (Network panel)  
3. Indexed URL count if GSC available  

Target posture: see `docs/performance.md`.
