# Dubard Studio — Portfolio Site

Next.js 14 portfolio with Decap CMS for browser-based content editing.  
**No code required to update content once deployed.**

---

## What's in the box

| Feature | How it works |
|---|---|
| Content updates | Browser CMS at `/admin` — no code, no deploy needed |
| Projects | Markdown files in `content/projects/` |
| Testimonials | Markdown files in `content/testimonials/` |
| Services | JSON file at `content/services.json` |
| Site settings | JSON file at `content/settings.json` |
| Dark mode | Persisted to localStorage, respects OS preference |
| Contact form | Netlify Forms (zero config, works out of the box) |
| WhatsApp CTA | Pre-filled message, auto-generated from your phone number |

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18 or later
- npm or yarn
- Git

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/dubard-studio.git
cd dubard-studio
npm install
```

### 2. Add your content placeholders

Copy your existing images into `public/images/`:
```
public/
  images/
    Profilepic.jpeg      ← your profile photo
    Mocku.png            ← hero mockup
    Moschify.jpeg        ← project screenshots
    Mocsahomepage.jpeg
    FilterMe.jpeg
    Lucina.jpg           ← testimonial photos
    Licosteam.jpg
    Icons/
      art.png
      code.png
      verified.png
      github.png
      linkedin.png
```

### 3. Update your phone number

Open `content/settings.json` and update `whatsapp` to your real Liberian number:
```json
"whatsapp": "+231770000000"
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Netlify — Recommended)

Netlify is free and handles Forms + CMS auth automatically.

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dubard-studio.git
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** → select your repo
4. Build settings are auto-detected via `netlify.toml`
5. Click **Deploy site**

### Step 3 — Enable Netlify Identity (for CMS login)
1. In your Netlify dashboard → **Site settings → Identity**
2. Click **Enable Identity**
3. Under **Registration**, set to **Invite only**
4. Under **Git Gateway**, click **Enable Git Gateway**
5. Go to **Identity → Invite users** → enter your email

### Step 4 — Update CMS config with your repo
Open `public/admin/config.yml` and update:
```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/dubard-studio   # ← YOUR actual repo
  branch: main
```
Commit and push this change.

### Step 5 — Accept your invitation
Check your email for the Netlify Identity invite. Click the link — it takes you to your live site to set a password.

---

## Using the CMS (How to Update Content)

Once deployed, go to: `https://your-site.netlify.app/admin`

Log in with the email/password from your invite.

### Update Site Settings (headline, bio, phone, etc.)
1. Click **Site Settings** → **General Settings**
2. Edit any field (tagline, WhatsApp, bio paragraphs, etc.)
3. Click **Save** — changes go live in ~30 seconds

### Add a New Project
1. Click **Projects → New Projects**
2. Fill in:
   - **Title** — e.g. "E-commerce site for Monrovia Boutique"
   - **Short Description** — 1–2 sentences explaining what you built
   - **Timeline** — e.g. "Jan 2025 – Feb 2025"
   - **Category** — choose from dropdown
   - **Live URL** — the project link
   - **Screenshot** — upload from your device
   - **Sort Order** — lower number = appears first
3. Click **Save** — published immediately

### Add a Testimonial
1. Click **Testimonials → New Testimonials**
2. Fill in the client's name, role, and quote
3. Upload their photo (optional)
4. Click **Save**

### Update Services
1. Click **Services → Services List**
2. Edit titles, taglines, or sub-items
3. Click **Save**

---

## Content Placeholders (Still Need Updating)

Search for `ADD CONTENT:` in the source files to find every placeholder:

| Location | What to update |
|---|---|
| `content/settings.json` | WhatsApp number (change from placeholder to your real Liberian number) |
| `content/settings.json` | `cvFile` path — add your real CV PDF to `public/files/` |
| `content/settings.json` | `heroImage` — replace with your real mockup |
| `content/projects/*.md` | Project timelines — update with real dates |
| `src/app/page.tsx` (stats row) | Update 5+, 20+, 100% to your real numbers |
| `public/admin/config.yml` | Replace `YOUR_GITHUB_USERNAME/dubard-studio` with your actual repo |

---

## File Structure

```
dubard-studio/
├── content/                  ← All editable content (managed via CMS)
│   ├── settings.json         ← Site-wide settings
│   ├── services.json         ← Services list
│   ├── projects/             ← One .md file per project
│   └── testimonials/         ← One .md file per testimonial
├── public/
│   ├── admin/                ← Decap CMS (do not rename)
│   │   ├── index.html
│   │   └── config.yml        ← CMS content schema
│   └── images/               ← Your images go here
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout + theme script
│   │   ├── page.tsx          ← Homepage (all sections)
│   │   ├── globals.css       ← All styles
│   │   └── success/          ← Post-form-submission page
│   ├── components/
│   │   ├── Header.tsx        ← Nav + theme toggle + mobile menu
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── ContactForm.tsx
│   │   └── BackToTop.tsx
│   └── lib/
│       └── content.ts        ← Reads content files (settings, projects, etc.)
├── netlify.toml              ← Netlify deploy config
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Migrating from the Old HTML Site

1. Copy your images from the old `images/` folder into `public/images/`
2. Copy your CV PDF into `public/files/`
3. Update `content/settings.json` with your real email, WhatsApp, and bios
4. Update the three `content/projects/*.md` files with real timelines
5. Delete the old HTML/CSS/JS files from your Netlify deploy

---

## Local CMS Testing (Optional)

To test the CMS locally without GitHub:

```bash
npx decap-server &   # starts local backend
npm run dev          # starts Next.js
```

Then open `http://localhost:3000/admin` — edits save to your local files.

---

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Decap CMS** (git-based, browser UI, free)
- **Netlify** (hosting + Forms + Identity)
- **CSS custom properties** (no framework — lean and fast)
- **gray-matter** (parses Markdown frontmatter)

---

## Support

Questions? WhatsApp is fastest: [wa.me/YOUR_NUMBER](https://wa.me/YOUR_NUMBER)
