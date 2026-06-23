# Baked Growth — PRD

## Original Problem Statement (verbatim summary)
Build a premium, modern, multilingual corporate website for Baked Growth (domain: baked.group, email: contact@baked.group), parent company of the Baked super-app ecosystem (EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd). Must look like Uber/Bolt/Grab/Careem/Glovo/Airbnb. Multi-language FR (default) + EN with instant switch and localStorage persistence. **Must include a secure Admin Panel (CMS) at /admin** with PostgreSQL database, no MongoDB, no Emergent vendor lock-in. Stack: **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion + Prisma + PostgreSQL + JWT auth**. Deployable to Hostinger VPS, Vercel, AWS, Docker.

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
- ✅ Sticky glassmorphic Header with logo, nav, FR/EN dropdown, Download CTA, mobile hamburger
- ✅ Full-viewport Hero with parallax dark city BG, foreground image, 6 floating glowing service icons, gold-highlighted CONNECTER/CONNECTING
- ✅ About section (white) with 4 icon cards (Mission, Vision, Innovation, Community)
- ✅ Ecosystem grid: 6 white cards with brand-colored prefix (EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd), illustrations, hover lift, circular arrow buttons matching brand color
- ✅ Why Baked dark section: 4 benefit cards + 3 animated counters (6+, 1, 100%)
- ✅ Mobile App Showcase: 5 floating phone mockups with per-color neon glow (orange/green/blue/purple), Apple/Play "Coming Soon" buttons
- ✅ Careers split section with team photo, gold-pluses decoration, gold outlined CTA → /careers page
- ✅ Contact section: form (name/email/phone/company/message) with validation, info cards, map placeholder, social icons
- ✅ Premium footer: 4 columns (Download, Discover, Help, Social), bottom language selector, giant centered baked wordmark
- ✅ `/careers` page with job list + apply modal (saves JobApplication)

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
