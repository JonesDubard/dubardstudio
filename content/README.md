# Content (CMS)

Git-based content for Decap CMS.

## Local editing (no password)

On `localhost`, Decap uses **local backend** — not Netlify Identity.

1. Terminal A: `npm run dev`
2. Terminal B: `npm run cms`
3. Open [http://localhost:3000/admin/](http://localhost:3000/admin/)

Edits save straight into `content/` on disk. No login required.

## Production editing (Netlify Identity)

On the live Netlify site, login is **Netlify Identity** (invite-only)—not a generic site password.

1. Netlify → **Site configuration → Identity** → Enable Identity  
2. Registration: **Invite only**  
3. Enable **Git Gateway**  
4. **Identity → Invite users** → your email  
5. Accept the invite email and set a password on the **live** site URL  
6. Open `https://your-site.netlify.app/admin/`

Password reset: Netlify Identity → your user → or “Forgot password” on the live `/admin` login (emails only work if Identity email is configured).

## Collections

| Path | Role |
|------|------|
| `settings.json` | Site-wide settings (title, hero, SEO defaults, home CTA/studio teaser, contact, about) |
| `services.json` | Services list (fit / non-fit) |
| `projects/*.md` | Case studies |
| `people/*.md` | Studio people (name, role, short bio, photo — light roster on `/studio/`) |
| `resources/*.md` | Resource library (Wave A — ungated) |
| `testimonials/*.md` | Quotes |
| `pages/*.md` | Modeled page drafts (Phase 3; public routes use page components until fully wired) |

## Loader

Application reads via `src/lib/content.ts`. Prefer CMS fields over hardcoded JSX.

## Phase 3 note

- **Settings:** SEO defaults, OG image, Verdant URL, home bands, contact channels  
- **Services:** fit / non-fit (including Essential / Standard — no public prices)  
- **Case studies:** business fields + optional `seoDescription`  
- **Pages collection:** available in Decap for drafts; full route migration can continue later  
- **Phone UX:** public site is optimized for thumb navigation (large taps, no iOS input zoom, full-width CTAs)

**Do not put retainer prices in CMS.** Use `verdant-ecosystem/SUBSIDIARIES/dubard-studio/pricing-internal.md`.
