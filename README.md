# Lumen AI

Creator commerce platform: sell AI-generated sleep/focus music and wellness products. YouTube is the funnel; this site handles auth, purchases, downloads, and shop.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind
- **PostgreSQL** via Prisma
- **Auth.js** (Google + GitHub OAuth)
- **Stripe** checkout + webhooks
- **Cloudflare R2** for audio/images
- **Resend** for email
- **Railway** deployment

## Local setup

### 1. Prerequisites

- Node.js 20+
- Docker Desktop (for local Postgres + Redis)
- GitHub account
- Railway account (for deploy)

### 2. Install and configure

```bash
cd lumen-ai
cp .env.example .env
npm install
```

Edit `.env` with your values (see **Environment variables** below).

### 3. Start local database

```bash
docker compose up -d
```

### 4. Push database schema

```bash
npm run db:push
npm run db:seed
```

### 5. Run dev server

```bash
npm run dev
```

Open http://localhost:3000

---

## Environment variables

| Variable | Where to get it |
|----------|-----------------|
| `AUTH_SECRET` | Run: `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID/SECRET` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `AUTH_GITHUB_ID/SECRET` | [GitHub Developer Settings](https://github.com/settings/developers) |
| `ADMIN_EMAIL` | Your email — becomes admin on first sign-in |
| `R2_*` | [Cloudflare R2](https://dash.cloudflare.com/) |
| `STRIPE_*` | [Stripe Dashboard](https://dashboard.stripe.com/) |
| `RESEND_API_KEY` | [Resend](https://resend.com/) |

### OAuth redirect URLs

**Local:**
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

**Production (replace domain):**
- `https://yourdomain.com/api/auth/callback/google`
- `https://yourdomain.com/api/auth/callback/github`

---

## Push to GitHub

### 1. Create repo on GitHub

1. Go to https://github.com/new
2. Name it `lumen-ai` (or your choice)
3. Do **not** initialize with README (we already have one)
4. Create repository

### 2. Push from your machine

```bash
cd lumen-ai
git add .
git commit -m "Initial Lumen AI Phase 1 scaffold"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lumen-ai.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Deploy on Railway

### 1. Create Railway project

1. Go to https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Select your `lumen-ai` repo
4. Railway auto-detects Next.js

### 2. Add PostgreSQL

1. In your Railway project: **+ New** → **Database** → **PostgreSQL**
2. Railway injects `DATABASE_URL` into your app automatically

### 3. Set environment variables

In Railway → your app service → **Variables**, add:

```
NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app
AUTH_SECRET=<generate with openssl rand -base64 32>
AUTH_URL=https://your-app.up.railway.app
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
ADMIN_EMAIL=your@email.com
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=lumen-ai-assets
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
RESEND_API_KEY=re_...
EMAIL_FROM=orders@yourdomain.com
```

### 4. Run database migration on Railway

After first deploy, open Railway **Shell** for your app service:

```bash
npx prisma db push
npx prisma db seed
```

### 5. Stripe webhook (production)

1. Stripe Dashboard → **Developers** → **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Events: `checkout.session.completed`
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET` in Railway

### 6. Custom domain (optional)

Railway → Settings → **Networking** → add custom domain (e.g. `lumenai.com`)

Update:
- `NEXT_PUBLIC_APP_URL`
- `AUTH_URL`
- OAuth redirect URLs in Google/GitHub

---

## Admin workflow

1. Sign in with Google/GitHub using your `ADMIN_EMAIL`
2. Go to `/admin`
3. **Upload music** → `/admin/music/new`
4. Copy the UTM link shown in admin → paste in YouTube video description
5. **Add shop products** → `/admin/shop`
6. View orders and YouTube analytics → `/admin/orders`, `/admin/analytics`

### YouTube link template

```
https://yourdomain.com/music/track-slug?utm_source=youtube&utm_medium=video&utm_campaign=track-slug
```

---

## Project structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── api/            # Auth, Stripe, uploads, downloads
│   ├── music/          # Digital music catalog
│   ├── shop/           # Physical products
│   ├── account/        # User library + orders
│   └── cart/           # Shopping cart
├── components/
├── lib/                # db, auth, stripe, r2, email
└── auth.ts             # Auth.js config
prisma/
└── schema.prisma       # Database models
```

---

## Phase 1 checklist

- [x] Next.js scaffold
- [x] PostgreSQL + Prisma schema
- [x] Google + GitHub OAuth
- [x] Admin dashboard (music upload, shop, orders, analytics)
- [x] Public music + shop pages
- [x] Cart + Stripe checkout
- [x] Digital download library
- [x] YouTube UTM tracking
- [x] Railway deploy config
- [ ] Your API keys configured
- [ ] Pushed to GitHub
- [ ] Deployed on Railway
- [ ] First track uploaded
- [ ] Stripe webhook live

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Sync schema to database |
| `npm run db:seed` | Seed sample shop products |
| `npm run db:studio` | Open Prisma Studio |
