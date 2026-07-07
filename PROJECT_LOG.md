# Lumen AI — Project Development Log

Complete record of what was built for **Lumen AI Music** (`lumenaimusic.com`).

**GitHub:** https://github.com/cresculus/lumen-ai  
**Stack:** Next.js 16 · PostgreSQL · Prisma · Auth.js · Stripe · Cloudflare R2 · Railway

---

## Session 1 — Project vision & spec

- Defined **Lumen AI** as a creator commerce platform
- YouTube = top-of-funnel → site captures sales & retention
- Two revenue lines:
  1. **Digital music** (AI-generated sleep/focus tracks)
  2. **Physical shop** (sleep masks, night caps, ear plugs → diffusers later)
- Chose **PostgreSQL only** (not MongoDB/MySQL)
- **Redis** optional for Phase 2
- Hosting: **Railway** + **GitHub** auto-deploy

---

## Session 2 — Phase 1 scaffold

### Created
- Next.js 16 app with TypeScript, Tailwind, App Router
- Prisma schema: User, DigitalProduct, PhysicalProduct, Order, Download, AnalyticsEvent
- Auth.js v5: Google + GitHub OAuth, admin role via `ADMIN_EMAIL`
- Admin routes: music upload, shop CRUD, orders, analytics
- Public pages: `/`, `/music`, `/shop`, `/cart`, `/account`, `/login`
- Stripe one-time checkout + webhook
- Cloudflare R2 upload/download for audio
- YouTube UTM tracking on visits and orders
- Docker Compose for local Postgres
- `railway.toml` deploy config
- Pushed to **GitHub** `cresculus/lumen-ai`

---

## Session 3 — Railway deployment fixes

### Issue: Build failed (Node 18)
- Prisma 7 + Next.js 16 require Node 20.19+
- **Fix:** Added `.nvmrc` (22), `nixpacks.toml`, `engines` in package.json

### Issue: Healthcheck failed
- Homepage hit DB before ready; wrong port binding
- **Fix:** `/api/health` endpoint, `next start -H 0.0.0.0 -p $PORT`, `force-dynamic` layout

---

## Session 4 — Domain & DNS (GoDaddy + Railway)

- Railway app URL: `lumen-ai-production-824c.up.railway.app`
- Custom domain: **lumenaimusic.com** / **www.lumenaimusic.com**
- GoDaddy DNS:
  - `CNAME www → 7wizl136.up.railway.app`
  - `TXT _railway-verify → railway-verify=...`
- **www works** with SSL; root domain needs CNAME `@` or forwarding to www
- Railway custom domain limit on hobby plan — use www as primary URL

### Required Railway variables
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
AUTH_SECRET=
AUTH_URL=https://www.lumenaimusic.com
NEXT_PUBLIC_APP_URL=https://www.lumenaimusic.com
ADMIN_EMAIL=
AUTH_TRUST_HOST=true
NODE_ENV=production
```

---

## Session 5 — Dashboard & music platform upgrade

Combined patterns from open-source references:
- **Musicy / drumroll** → global music player
- **Musicfy / saas-starter** → Stripe subscriptions
- **shadcn dashboard** → admin sidebar shell

### Added
- Global **music player** (play/pause, seek, volume, queue, 60s preview)
- `/api/stream/[productId]` — lossless streaming from R2
- **Subscription model** in Prisma + `/pricing` page
- `/api/stripe/subscribe` + billing portal
- Webhook handlers for subscription lifecycle
- Admin **sidebar dashboard** (Overview, Music, Upload, Shop, Orders, Analytics)
- Redesigned homepage, music catalog with tag filters
- Music track cards with inline play buttons

---

## Session 6 — Mock data, demo auth, cart (this update)

### Demo sign-in (no OAuth required)
- **Demo Guest** → customer account, `/account`
- **Demo Admin** → admin dashboard, `/admin`
- Enabled when `ENABLE_MOCK_AUTH=true` (default)
- OAuth (Google/GitHub) still available when keys are set

### Mock catalog
- 4 demo music tracks + 4 shop products in `src/lib/mock-data.ts`
- `src/lib/catalog.ts` — tries PostgreSQL first, falls back to mock
- Demo audio URL for playback when R2 not configured
- Site works fully **before** `prisma db push`

### Shopping cart
- Persistent cart in `localStorage`
- **Cart badge** with item count in navbar
- Improved cart page with order summary
- **Demo checkout** — no Stripe needed, logs order, clears cart
- Stripe checkout still available when configured

### Admin dashboard
- Shows mock stats when DB empty
- Banner indicates demo vs live data
- Sidebar navigation to all admin modules

### New / updated files
| File | Purpose |
|------|---------|
| `src/lib/mock-data.ts` | Demo music, shop, admin stats |
| `src/lib/catalog.ts` | DB + mock catalog layer |
| `src/lib/admin-stats.ts` | Dashboard stats with fallback |
| `src/components/navbar-client.tsx` | Nav + session + cart badge |
| `src/components/oauth-buttons.tsx` | OAuth + demo sign-in |
| `src/app/api/checkout/demo/route.ts` | Demo order logging |
| `PROJECT_LOG.md` | This file |

---

## How to test locally

```bash
cd lumen-ai
npm install
npm run dev
```

1. Open http://localhost:3000
2. **Sign in** → Demo Guest or Demo Admin
3. **Music** → click play on any track
4. **Shop** → Add to cart
5. **Cart** → Demo checkout
6. **Admin** (demo admin) → Dashboard overview

---

## How to go production

```bash
# Railway Console
npx prisma db push
npx prisma db seed
```

Then configure:
- OAuth redirect URLs for `www.lumenaimusic.com`
- Stripe keys + `STRIPE_SUBSCRIPTION_PRICE_ID`
- Cloudflare R2 for real audio uploads
- Set `ENABLE_MOCK_AUTH=false` when OAuth is live

---

## Page map

| Route | Description |
|-------|-------------|
| `/` | Homepage + featured music/shop |
| `/music` | Catalog with tag filters |
| `/music/[slug]` | Track detail + player |
| `/shop` | Physical products |
| `/shop/[slug]` | Product detail |
| `/cart` | Shopping cart |
| `/pricing` | Subscription plans |
| `/login` | OAuth + demo sign-in |
| `/account` | Library, orders, subscription |
| `/admin` | Creator dashboard |
| `/admin/music/new` | Upload tracks to R2 |

---

## Architecture

```
YouTube (UTM links)
       ↓
www.lumenaimusic.com
       ├── Music player (preview / full via sub or purchase)
       ├── Shop + cart → Stripe or demo checkout
       ├── Subscriptions (Lumen Unlimited)
       └── Admin dashboard → R2 uploads → PostgreSQL
```

---

## Changelog summary

| Date | Change |
|------|--------|
| 2026-07-07 | Initial Phase 1 scaffold |
| 2026-07-07 | Railway Node 22 + healthcheck fix |
| 2026-07-07 | DNS setup lumenaimusic.com |
| 2026-07-07 | Music player + subscriptions + admin UI |
| 2026-07-07 | Mock data, demo auth, cart polish, PROJECT_LOG |

---

*Last updated: July 7, 2026*
