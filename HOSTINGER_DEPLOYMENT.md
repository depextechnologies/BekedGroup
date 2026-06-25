# bakēd Group — Hostinger Deployment Guide (Node.js + MySQL)

This project is now fully MySQL-based and has **no PostgreSQL dependency** of any kind.
It is ready to deploy on Hostinger's Node.js Hosting plan with the bundled MySQL/MariaDB database.

---

## 1. Prerequisites

On Hostinger:

- A **Node.js Hosting** plan (Premium / Business / Cloud).
- A **MySQL/MariaDB** database created from hPanel → Databases.
- (Optional) An email account for SMTP (e.g. `noreply@baked.group`) — used by contact / support / partner / advertising / careers forms.

You will need the following values from hPanel → Databases:

| Field      | Where to find it                      |
| ---------- | ------------------------------------- |
| Host       | usually `localhost` for shared plans |
| Port       | `3306`                                |
| Database   | the database name you created         |
| Username   | the MySQL user you created            |
| Password   | the MySQL user password               |

---

## 2. Database Setup (phpMyAdmin)

You have **three** equivalent ways to create the schema in your Hostinger database:

### Option A — Empty database + Prisma (recommended for fresh installs)

1. In hPanel → Databases, **create** an empty database (e.g. `baked_group`) and a user (e.g. `baked_user`).
2. After uploading the project code, run the SSH command:
   ```bash
   cd ~/domains/baked.group/public_html
   npx prisma generate
   npx prisma db push --skip-generate
   npx tsx prisma/seed.ts   # one-off seed of admin, settings & sample data
   ```

### Option B — Import the SQL migration file via phpMyAdmin (no SSH needed)

1. hPanel → Databases → **phpMyAdmin** → select the database you created.
2. Click **Import** tab.
3. Upload `prisma/migrations/0001_init/migration.sql`.
4. Click **Go** at the bottom. All tables will be created with the correct collation (`utf8mb4_unicode_ci`).
5. (Optional but recommended) Import `prisma/migrations/baked_growth_seed.sql` to pre-populate Admin, SiteSettings, HomepageContent, Apps, Blog/News samples and Job openings.

### Option C — Import everything (schema + data) in one shot

In phpMyAdmin → Import:

1. Upload `prisma/migrations/baked_growth_seed.sql` (it contains both `CREATE TABLE` statements and seed rows).
2. After it completes, you have a fully populated database — login with the admin credentials below.

---

## 3. Default Admin Credentials (seeded)

| Field    | Value                  |
| -------- | ---------------------- |
| Email    | `admin@baked.group`    |
| Password | `BakedAdmin2025!`      |

**Change them immediately after first login** in `/admin/settings`, or change `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` and re-run the seed.

---

## 4. Environment Variables

Copy `.env.example` → `.env` and fill in **at minimum** the database URL and JWT secret:

```env
DATABASE_URL="mysql://baked_user:STRONG_PASS@localhost:3306/baked_group"
JWT_SECRET="<paste-a-64+char-random-string-here>"
ADMIN_EMAIL="admin@baked.group"
ADMIN_PASSWORD="ChangeMeStrongPassword!"
NEXT_PUBLIC_SITE_URL="https://baked.group"
```

The `mysql://` scheme is the only one supported. **Never** use `postgresql://`.

---

## 5. Build & Start

In Hostinger's Node.js panel:

```bash
# Install
npm install --omit=dev
# (or, if yarn is available)
yarn install --production

# Build the production bundle
npm run build           # runs `next build`

# Start
npm start               # runs `next start -p $PORT`
```

Hostinger's Node.js panel will assign the `PORT` automatically. The provided `package.json` already uses it.

---

## 6. Forms & Email (optional)

All five public forms (Contact, Advertising, Support Ticket, Partner Application, Career Application) write directly to MySQL — no setup needed for that.

If you want **email notifications** in addition, fill in the `SMTP_*` block in `.env`:

```env
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_USER="noreply@baked.group"
SMTP_PASSWORD="<the email account password>"
SMTP_FROM="noreply@baked.group"
SMTP_TO="contact@baked.group"
```

Leave `SMTP_HOST` empty to disable outbound email (default).

---

## 7. Files & Uploads

User resumes (career page) and any admin-uploaded logos are stored under:

```
public/uploads/resumes/    # CV uploads (PDF / DOC / DOCX / PNG / JPG / WebP / HEIC)
public/logos/              # site logo
public/support/            # bakēd splash phone mockup
```

These directories must be writable by the Node process. On Hostinger they are simply part of the project and require no special permissions beyond standard ownership.

---

## 8. Re-running Migrations

If you change the schema later:

```bash
# Edit prisma/schema.prisma
npx prisma migrate diff \
  --from-url "$DATABASE_URL" \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0002_change.sql

# Apply it
mysql -u baked_user -p baked_group < prisma/migrations/0002_change.sql
# OR
npx prisma db push --skip-generate
```

---

## 9. Verification Checklist

After deployment, verify:

- [ ] **Site loads** at `https://baked.group/` (FR) and `?locale=en`
- [ ] **Admin login** at `/admin/login` works
- [ ] **Dashboard** loads with stats
- [ ] **Page CMS** (About / Services / Advertising / Support) loads and Save persists
- [ ] **Blog / News** publish and appear in `/blog` & `/news`
- [ ] **Contact form** on homepage saves (visible in `/admin/messages`)
- [ ] **Career application** with resume upload saves (visible in `/admin/jobs`)
- [ ] **Support ticket / Partner application / Advertising lead** save (visible in respective admin pages)
- [ ] (Optional) Email notifications are received

If `npx prisma db push` returns the message *"Your database is now in sync with your Prisma schema"*, your MySQL migration is complete and successful.

---

## 10. PostgreSQL Removal — Confirmation

- `prisma/schema.prisma` → `provider = "mysql"`
- No `pg`, `pg-native`, `postgres`, or `postgresql` packages in `package.json`
- No legacy `prisma/migrations/2025*_pg_*.sql` files in this build
- No `.env` references to `postgresql://`

This project is 100% MySQL and Hostinger-compatible.
