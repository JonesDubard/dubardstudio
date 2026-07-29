# Architecture — Dubard Studio site

**Status:** Evolving (Migration Phase 0–1)  
**Decision:** Evolve existing Next.js app — not a rebuild.  
**Doctrine:** Verdant Engineering Handbook + `WEBSITES/dubard-studio/*`

## Significant decisions

| Decision | Choice | Why |
|----------|--------|-----|
| App root | Single Next app at repo root (`src/`) | One marketing site; monorepo `apps/web` would be rewrite-adjacent |
| Hosting | Netlify + `output: 'export'` | Preserve Forms, Identity/Git Gateway, current deploy |
| Styles | Layered CSS: `tokens` → `base` → `typography` → `layout` → `globals` (components) | Tokenize without visual redesign |
| Fonts | `next/font` (Plus Jakarta Sans, DM Mono) | Performance; same type character |
| Components | `layout/` · `sections/` · `forms/` · `feedback/` | Reuse markup; prepare Phase 2 routes |
| CMS | Keep Decap; additive loaders; wire existing fields | No editor downtime |
| SEO | `metadataBase`, `app/robots.ts`, `app/sitemap.ts` | Foundation before IA expansion |
| Identity widget | `/admin` only | Avoid marketing-page JS weight |

## Folder map

```text
src/
  app/                 # App Router — Home + IA routes (Phase 2)
  components/
    layout/            # SkipLink, Header, Footer, SiteShell, PageIntro
    sections/          # Reusable section blocks (home teasers + pages)
    work/              # ProjectCard
    forms/             # ContactForm
    feedback/          # BackToTop, TestimonialsCarousel
  styles/              # Design tokens + foundational CSS
  lib/                 # content, seo, site, fonts, whatsapp
docs/                  # architecture, a11y, performance, redirects, assets
content/               # CMS source of truth
public/admin/          # Decap
```

## Routes (Phase 2)

See `docs/redirects.md` for the canonical sitemap paths.

## Naming

- React components: `PascalCase`
- Modules under `lib/`: `kebab-case` or single-purpose camel files (`content.ts`, `seo.ts`)
- CSS tokens: `--semantic-name`

## Related

- Verdant: `WEBSITES/dubard-studio/migration-strategy.md`
- Verdant: `WEBSITES/dubard-studio/handbook-compliance-plan.md`
