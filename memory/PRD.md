# Baked Group — PRD

## Original Problem Statement (verbatim summary)
Build a premium, modern, multilingual corporate website for Baked Group (domain: baked.group, email: contact@baked.group), parent company of the Baked super-app ecosystem (EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd). Must look like Uber/Bolt/Grab/Careem/Glovo/Airbnb. Multi-language FR (default) + EN with instant switch and localStorage persistence. **Must include a secure Admin Panel (CMS) at /admin** with PostgreSQL database, no MongoDB, no Emergent vendor lock-in. Stack: **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion + Prisma + PostgreSQL + JWT auth**. Deployable to Hostinger VPS, Vercel, AWS, Docker.

## Architecture
- **Next.js 15 + App Router** in `/app/frontend` (port 3000)
- **PostgreSQL 15** managed by supervisor (port 5432, user=baked, db=baked_growth)
- **Prisma ORM** with 10 models (AdminUser, SiteSettings, HomepageContent, Application, ContactMessage, JobOpening, JobApplication, BlogPost, NewsArticle)
- **JWT auth** via `jose` + httpOnly cookies + bcrypt password hashing
- **Custom React Context i18n** (no next-intl), instant client-side FR/EN switching, localStorage persistence
- **FastAPI proxy on port 8001** — transparently forwards /api/* to localhost:3000/api/*; required ONLY by Emergent ingress rules; **NOT used on Hostinger/Vercel/etc.**
- Fonts: Chivo (headings) + Manrope (body) via next/font/google
- SEO: auto-generated sitemap.xml, robots.txt, manifest.json, full OG/Twitter meta

## Implemented (Phase 1) — 2025-12-23
### Public site
- ✅ Sticky glassmorphic Header with **uploaded baked.jpeg brand logo**, nav, FR/EN dropdown, Download CTA, mobile hamburger
- ✅ Full-viewport Hero with parallax dark city BG, foreground image, 6 floating glowing service icons (AUTO icon updated to red #E5484D), gold-highlighted CONNECTER/CONNECTING
- ✅ About section (white) with 4 icon cards (Mission, Vision, Innovation, Community)
- ✅ Ecosystem grid: 6 white cards with brand-colored prefix — **uploaded brand wordmark images for EXPRESSbakēd, SHOPbakēd, AUTObakēd (red), IMMObakēd; SVG fallback with macron for FOODbakēd and MARTbakēd** (pending user-provided assets)
- ✅ Why Baked dark section: 4 benefit cards + 3 animated counters (6+, 1, 100%)
- ✅ Mobile App Showcase: 5 floating phone mockups with per-color neon glow (orange/green/red/purple), Apple/Play "Coming Soon" buttons
- ✅ Careers split section with team photo, gold-pluses decoration, gold outlined CTA → /careers page
- ✅ Contact section: form (name/email/phone/company/message) with validation, info cards, map placeholder, social icons
- ✅ Premium footer: **uploaded baked.jpeg at top + giant SVG wordmark with macron at bottom**, 4 columns, bottom language selector
- ✅ `/careers` page with job list + apply modal (saves JobApplication)

### Brand assets
- Five user-provided logo images stored locally in `/app/frontend/public/logos/`:
  - `baked.jpeg` (main wordmark, white on black) — used in Header, Footer top, Admin login + sidebar
  - `express.jpeg`, `shop.jpeg`, `auto.jpeg`, `immo.jpeg` (each on white BG) — used in Ecosystem cards
  - FOODbakēd & MARTbakēd: SVG text fallback until user provides those assets
- Application model gained `logoImage` String field; AppsEditor in admin can edit each app's logo URL

### CMS (/admin)
- ✅ Login (`/admin/login`) — JWT cookie, bcrypt
- ✅ Dashboard (stats: apps, total messages, unread, open jobs + recent messages)
- ✅ Applications editor: edit prefix, color, icon, FR/EN description, illustration URL, order, enable/disable
- ✅ Messages inbox: list + detail view, mark read/unread, delete, reply by email
- ✅ Jobs CMS: create/edit/delete openings (FR + EN), publish toggle, view applications inbox
- ✅ Settings (tabbed): Contact info, Social URLs, Footer & Branding, Homepage content (hero/about/careers image, all FR + EN)
- 🟡 Blog: schema ready, stub editor page (Phase 2)
- 🟡 News: schema ready, stub editor page (Phase 2)

### Infrastructure
- ✅ PostgreSQL installed, supervised, seeded
- ✅ FastAPI proxy at /app/backend/server.py (Emergent-only)
- ✅ Dockerfile + docker-compose.yml for self-hosted deployments
- ✅ README.md with Hostinger VPS + Vercel + Docker deployment guides
- ✅ .env.example for portable configuration
- ✅ robots.ts, sitemap.ts, manifest.ts (Next.js metadata APIs)

## User personas
- **End user**: visitor learning about Baked ecosystem, downloading app, contacting, applying for jobs (FR or EN)
- **Admin/Owner**: edits all content via /admin without touching code

## P0 (done)
- Stack: Next.js 15 + TS + Prisma + PG ✅
- All public sections + i18n ✅
- /admin with auth, applications, messages, settings, jobs ✅
- Hostinger/Docker/Vercel docs ✅
- **2026-02-24 — Strict brand identity rename ("Baked" → "bakēd"):** Replaced all visible text occurrences of "Baked" / "BAKED" / "Baked Group" with "bakēd" / "bakēd Group" (lowercase b, macron over e) across Hero, Why-section, Footer, About-Us page (paragraphs, "bakēd GROUP EN BREF" headline, "Pourquoi choisir bakēd ?", CTA), Services page (hero badge, "SUPER APPLICATION bakēd", grid copy, Africa section, CTA), Careers job descriptions, admin Dashboard/Messages/Applications strings, contact-route SMTP from-address/subject, manifest, all SEO metadata (layout/about-us/services pages), translation files (messages/en.json + fr.json), Prisma schema defaults, and seed.ts (companyName, copyrightText, jobOpening descs — upserts made idempotent on `update`). Verified by testing agent (iteration_14.json) — 100% pass, zero visible "Baked"/"BAKED" remaining in body text across /, /about-us, /services, /careers in FR + EN. Intentionally retained internal identifiers: CSS classes `rounded-baked`/`baked-wordmark`, file path `/logos/baked-header.png`, email/domain `baked.group`, social handle `bakedgroup`, React component/function names (`WhyBaked`, `BakedEnBref`, `WhyChooseBaked`), data-testid values.
- **2026-02-24 — UI refinement pass (4 changes):** (1) Hero headline reduced to `xl:text-[3rem] text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[2.75rem]` with `leading-[1.05]` and inline `textWrap: balance` — now wraps to exactly 3 lines at desktop 1440 in both FR & EN (verified iteration_17.json). (2) `/services` SUPER APPLICATION section now has two premium "Coming Soon" download buttons (Apple App Store + Google Play, disabled, side-by-side on desktop / stacked on mobile, testids `superapp-appstore-btn` / `superapp-playstore-btn`). (3) Replaced "Learn more" / "En savoir plus" CTA on all 6 service cards (/services ServicesGrid) AND all 6 ecosystem cards (homepage Ecosystem) with "Download App" / "Télécharger l'app" linking to `/#mobile` (the existing MobileShowcase) — testids `service-card-cta-0..5` and `ecosystem-arrow-{slug}`. (4) Logo macron alignment fix in `Logo.tsx`: span `top` 0.18em→0.06em, height 0.12em→0.09em, width 0.62em→0.55em so the bar sits above the 'e' rather than overlapping. Verified iteration_17.json — 100% acceptance (10/10 criteria including responsive tablet/mobile and brand-spelling regressions).
- **2026-02-24 — Phase 2 Admin CMS — Blog & News Full CRUD (P1):** Built complete content-management UI for both Blog and News articles. (a) New REST endpoints `GET|POST /api/admin/blog` + `PUT|DELETE /api/admin/blog/:id` and the same for `/api/admin/news`, all gated by `getAdminSession()`. Auto-slugify from titleEn when slug missing. (b) Replaced the previous stub pages at `/admin/blog` and `/admin/news` with full SSR pages that fetch posts/articles and render new client components `BlogManager.tsx` + `NewsManager.tsx` — list, create, edit, delete, publish-toggle, all bilingual (FR/EN tabs), with optimistic UI + rollback on PUT failure, toast notifications via sonner, and 30+ testids. (c) Dashboard updated to a 6-tile layout including Blog posts count and News articles count. (d) **CRITICAL pre-existing security bug fixed in `/app/backend/server.py`:** the shared `httpx.AsyncClient` was persisting cookies in its jar, leaking authenticated admin sessions to all subsequent proxy callers. Fix: `cookies=None` on client init + `_client.cookies.clear()` before every forwarded request + `cookies={}` on the per-request call. Verified via automated regression test `test_proxy_does_not_leak_cookies_between_calls`. (e) Test suite: `/app/backend/tests/test_admin_cms_security.py` — 19 cases (12 unauth-401 across all admin endpoints + cookie-leak regression + Blog & News CRUD lifecycle + 4 public-page smoke). Verified iteration_18.json — 19/19 backend + 14/14 frontend UI flows PASS.

## P1 — Phase 2 backlog
- Blog full editor (rich text, categories, featured image upload, SEO meta)
- News full editor
- File upload to `/public/uploads` with image cropping
- Replace stock placeholder images with custom ones provided by owner
- Per-section enable/disable toggles for homepage sections
- Multi-currency / multi-region in CMS

## P2 — Future ideas
- Newsletter signup module
- Multi-admin roles (editor, viewer)
- Analytics dashboard (page views, message stats)
- SMTP autoconfig wizard
- Custom domain redirect from baked.growth → baked.group
- Press kit downloadable page
- Investors page with metrics

## Default admin credentials
See `/app/memory/test_credentials.md`.
