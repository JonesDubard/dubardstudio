# Redirects & legacy URLs

Phase 2 introduced real App Router paths. Primary chrome no longer uses hash links.

## Canonical routes

| Path | Role |
|------|------|
| `/` | Home |
| `/work/` | Work index |
| `/work/{slug}/` | Case / project |
| `/services/` | Services |
| `/approach/` | Approach |
| `/studio/` | Studio |
| `/verdant/` | Verdant relationship |
| `/contact/` | Contact (primary inquiry) |
| `/book/` | Consultation booking request (Wave A) |
| `/resources/` | Resource library (Wave A) |
| `/fit/` | Fit checklist (Wave B) |
| `/privacy/` | Privacy |
| `/accessibility/` | Accessibility statement |
| `/success/` | Form thank-you (`noindex`) |

## Hash fragments

URLs like `/#work` or `/#contact` **cannot** be redirected by Netlify—the fragment is client-only. Old bookmarks will land on Home; users should use the new paths above.

## Trailing slashes

`next.config.js` sets `trailingSlash: true`. Prefer `/work/` over `/work`.
