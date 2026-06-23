# Baked Growth — Corporate Website

Premium, multilingual (FR/EN), CMS-enabled corporate website for Baked Growth — parent company of the Baked super-app ecosystem (EXPRESSbakēd, FOODbakēd, MARTbakēd, SHOPbakēd, AUTObakēd, IMMObakēd).

**Stack**: Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · PostgreSQL · Prisma ORM · JWT auth

---

## 1. Project structure

```
/app/frontend/
├── prisma/
│   ├── schema.prisma        ← PostgreSQL schema (10 models)
│   └── seed.ts              ← Seeds admin + apps + jobs + settings
├── messages/
│   ├── fr.json              ← French translations
│   └── en.json              ← English translations
├── public/
│   └── uploads/             ← Local image uploads (Hostinger-friendly)
├── src/
│   ├── app/
│   │   ├── page.tsx                 ← Public homepage
│   │   ├── layout.tsx               ← Root layout (fonts, i18n)
│   │   ├── globals.css
│   │   ├── manifest.ts              ← PWA manifest
│   │   ├── sitemap.ts               ← Auto-generated sitemap.xml
│   │   ├── robots.ts                ← robots.txt
│   │   ├── careers/                 ← /careers page
│   │   ├── admin/                   ← Protected /admin CMS
│   │   │   ├── login/
│   │   │   ├── page.tsx             ← Dashboard
│   │   │   ├── applications/        ← Manage 6 baked apps
│   │   │   ├── messages/            ← Contact inbox
│   │   │   ├── jobs/                ← Careers CMS + applications view
│   │   │   ├── settings/            ← Site/homepage/social settings
│   │   │   ├── blog/                ← (Phase 2)
│   │   │   └── news/                ← (Phase 2)
│   │   └── api/                     ← Next.js API routes
│   │       ├── contact/             ← Public contact form
│   │       ├── careers/             ← Public job application
│   │       ├── auth/login,logout/   ← Admin auth
│   │       └── admin/*              ← Protected admin endpoints
│   ├── components/site/             ← Public site components
│   ├── i18n/I18nProvider.tsx        ← Custom React Context i18n
│   └── lib/{prisma,auth,utils}.ts
├── .env / .env.example
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── Dockerfile
└── docker-compose.yml
```

## 2. Local development (Emergent environment)

PostgreSQL and the Next.js app are already running via supervisor. To re-seed the database:

```bash
cd /app/frontend
yarn db:push       # sync schema
yarn db:seed       # seed admin user + apps + jobs
```

- **Public site**: `http://localhost:3000` (or the Emergent preview URL)
- **Admin panel**: `/admin/login`
  - Email: `admin@baked.group`
  - Password: `BakedAdmin2025!`

## 3. Environment variables

See `.env.example`. All variables are required for production:

| Variable | Description |
| -------- | ----------- |
| `DATABASE_URL` | PostgreSQL connection string (works for MySQL too if you change provider in schema.prisma). |
| `JWT_SECRET` | Long random string used to sign admin sessions. **Change in prod.** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials. |
| `NEXT_PUBLIC_SITE_URL` | Public canonical URL (used in SEO and sitemap). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Displayed contact email. |
| `NEXT_PUBLIC_{FACEBOOK,LINKEDIN,INSTAGRAM,TIKTOK,YOUTUBE}_URL` | Social links. |
| `SMTP_HOST/PORT/USER/PASSWORD/FROM/TO` | Optional — when set, contact form emails are forwarded. |

## 4. Hostinger VPS deployment

```bash
# 1. SSH into your VPS and install Node 20+ and PostgreSQL
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs postgresql postgresql-contrib

# 2. Create a database
sudo -u postgres psql -c "CREATE USER baked WITH PASSWORD 'STRONG_PASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE baked_growth OWNER baked;"

# 3. Clone your repo and install
git clone <your-repo> /var/www/baked-growth
cd /var/www/baked-growth/frontend
cp .env.example .env
nano .env            # set DATABASE_URL, JWT_SECRET, etc.
yarn install
yarn prisma migrate deploy
yarn db:seed

# 4. Build
yarn build

# 5. Run with PM2
sudo npm install -g pm2
pm2 start npm --name baked-growth -- run prod
pm2 save
pm2 startup

# 6. Configure nginx as reverse proxy (Hostinger Business uses Apache/LiteSpeed too):
#   server {
#     server_name baked.group www.baked.group;
#     location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; }
#   }
# Then run certbot for HTTPS.
```

## 5. Vercel deployment

```bash
# Vercel auto-detects Next.js. Just push to a connected git repo, OR:
npx vercel
```

In the Vercel dashboard, set the environment variables (`DATABASE_URL` pointing to a managed PG like Neon/Supabase/Railway, `JWT_SECRET`, etc.).

## 6. Docker deployment

```bash
cd /app/frontend
cp .env.example .env   # set passwords + secrets
docker-compose up -d --build
```

The compose file provisions PostgreSQL, runs migrations, seeds the admin user, and starts the app on port 3000.

## 7. About the FastAPI proxy (`/app/backend/server.py`)

The Emergent Kubernetes ingress routes `/api/*` to port 8001 by convention, while Next.js wants to serve its API routes on port 3000. The FastAPI service in `/app/backend/` is a **thin transparent proxy** that forwards every `/api/*` request to `localhost:3000/api/*`.

**For Hostinger, Vercel, AWS, or any standard deployment, you do NOT need this proxy.** Next.js handles `/api/*` natively. Simply ignore `/app/backend` and deploy only `/app/frontend`.

## 8. SEO

- `robots.txt` and `sitemap.xml` are auto-generated by Next.js (`src/app/robots.ts`, `src/app/sitemap.ts`).
- `manifest.json` for PWA generated by `src/app/manifest.ts`.
- Meta tags, OpenGraph, Twitter Card, structured locale alternates are set in `src/app/layout.tsx`.

## 9. CMS feature matrix

| Module | Status | Location |
| ------ | ------ | -------- |
| Authentication (JWT + bcrypt) | ✅ | `/admin/login` |
| Dashboard (stats + recent messages) | ✅ | `/admin` |
| Applications management (6 apps) | ✅ | `/admin/applications` |
| Homepage content (FR + EN) | ✅ | `/admin/settings` → Homepage tab |
| Site settings (contact, social, footer, branding) | ✅ | `/admin/settings` |
| Contact messages inbox | ✅ | `/admin/messages` |
| Job openings CRUD + applications inbox | ✅ | `/admin/jobs` |
| Blog CRUD | 🟡 Schema ready, full editor in Phase 2 | `/admin/blog` |
| News CRUD | 🟡 Schema ready, full editor in Phase 2 | `/admin/news` |
| Image upload | 🟡 Stored URLs work today; uploader Phase 2 | — |

## 10. Resetting the admin password

```bash
cd /app/frontend
ADMIN_PASSWORD="newStrongPassword" yarn db:seed
```

The seed script is idempotent and upserts the admin user.

## 11. License

Proprietary © Baked Growth. All rights reserved.
