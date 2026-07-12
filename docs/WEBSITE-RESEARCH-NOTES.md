# Lumen Website — Research Notes (GitHub mirrors)

**Date:** 2026-07-11  
**Goal:** Study open-source repos that mirror Lumen (music catalog + player + paid library + physical shop), then implement upgrades — **notes first, code later**.  
**Live site checked:** https://www.lumenaimusic.com/

---

## 1. What Lumen already is (baseline)

| Layer | Current state |
|-------|----------------|
| Stack | Next.js 16 · Prisma · PostgreSQL · Auth.js · Stripe · Cloudflare R2 · Railway |
| Storefront | `/` hero, featured music, quiet apothecary shop |
| Catalog | `/music`, `/music/[slug]`, tag filters, mock fallback |
| Player | Global bottom player, 60s preview vs full stream |
| Commerce | Cart + Stripe/demo checkout; `/pricing` subscriptions |
| Library | `/account` — owned tracks + subscription status |
| Admin | Upload music, shop CRUD, orders, analytics |
| Brand | Indigo + grey-gold · “Sound, Woven in Light” |

**Verdict:** Core product shape exists. Gaps are polish, trust, catalog depth, Fake DJ / YouTube funnel alignment, and “real library” UX — not a greenfield rebuild.

---

## 2. Live site snapshot (2026-07-11)

Observed on www.lumenaimusic.com:

- Hero + featured soundscapes (Gravity Drift, Theta Waves, Focus Flow, Deep Sleep Ocean, Midnight Rain) work.
- Play buttons present on cards.
- Quiet apothecary (night cap, sleep mask, diffuser) present.
- **Nav felt thin in guest view** (Cart + Sign in prominent; full Music / Shop / Pricing / About / Library more visible when signed in as Demo Guest — matches user paste).
- Still reading as **demo catalog** until DB seed + R2 audio are production-complete.
- **YouTube rule still applies until site is “ready”:** no site URLs in YT descriptions yet — so site polish is a gate for funnel links.

---

## 3. GitHub repos surveyed (mirrors)

### A. Closest commercial twins

| Repo | Why it mirrors Lumen | Steal / skip |
|------|----------------------|--------------|
| **[jjoej15/prod-jja-store](https://github.com/jjoej15/prod-jja-store)** Beat store | Catalog + **persistent bottom player** + purchase + **presigned S3 downloads** + Postgres. Range streaming (`206 Partial Content`) for seek. | **Steal:** ranged stream reliability, resume position per track, time-limited download after purchase, email delivery. **Skip:** PayPal-only, lease/exclusive licenses (Lumen sells finished listening products, not beat leases). |
| **[mrstevedev/bbpmusiclibrary](https://github.com/mrstevedev/bbpmusiclibrary)** Sample packs | Next.js storefront, Stripe/PayPal, **signed URL re-downloads** for lost files. | **Steal:** library re-download UX, “lost file” signed URL flow. **Skip:** WordPress/GraphQL legacy stack. |
| **[sharananurag998/opengrove](https://github.com/sharananurag998/opengrove)** Creator commerce | Digital + physical + subscriptions, cart, Stripe, MinIO, customer dashboard. | **Steal:** product-type model (digital / physical / bundle), download management UI patterns. **Skip:** multi-creator marketplace complexity. |
| **[Ankit-2145/multi-vendor-marketplace](https://github.com/Ankit-2145/multi-vendor-marketplace)** Gumroad-like | Next 15 + Payload + Stripe Connect storefronts. | **Steal:** storefront IA, category filters, product page clarity. **Skip:** multi-tenant / Connect fees — Lumen is single-brand. |

### B. Streaming / “Spotify clone” family

| Repo | Why it matters | Steal / skip |
|------|----------------|--------------|
| **[mbeps/drumroll-music](https://github.com/mbeps/drumroll-music)** | Next 16 + Tailwind 4 + **Zustand player queue** + search + favorites + playlists. | **Steal:** queue UX, search tabs, liked/library mental model. **Skip:** user-upload UGC model (Lumen is curated, not SoundCloud). |
| **[Medo-ID/Musicfy](https://github.com/Medo-ID/Musicfy)** / **[Mubassim-Khan/Spotify-Clone-Next.js](https://github.com/Mubassim-Khan/Spotify-Clone-Next.js)** | Stripe sub unlocks full stream; like songs; persistent player. | **Steal:** clear **preview vs subscribed** gating (Lumen already has 60s — tighten messaging). **Skip:** green Spotify UI; Supabase-only stacks (we keep Prisma/R2). |
| **[whopio/whop-tutorials](https://github.com/whopio/whop-tutorials)** (`gumroad-clone`, `spotify-clone`) | Modern Next 16 + Prisma patterns for digital unlocks + playlists. | **Steal:** per-track unlock + playlist ideas later. **Skip:** Whop SDK lock-in. |

### C. Already referenced in PROJECT_LOG (Session 5)

- Musicy / drumroll → global player  
- Musicfy / saas-starter → Stripe subscriptions  
- shadcn dashboard → admin shell  

Those choices still stand; this pass adds **commerce delivery** (beat store / BBP) and **library UX** (favorites, search, re-download).

---

## 4. Pattern matrix — what to implement on Lumen

| Pattern | Best reference | Lumen today | Priority |
|---------|----------------|-------------|----------|
| Persistent bottom player + seek | prod-jja-store, drumroll | Exists; verify range seek on long 2–3h files | P0 harden |
| 60s preview → buy/sub unlock | Musicfy / Spotify clones | Exists | P0 copy/UX |
| Presigned download after purchase | prod-jja-store, BBP | Partial (R2 download button) | P0 |
| Library: owned + subscribed + re-download | OpenGrove, BBP | Account page basic | P0 |
| Favorites / “save for later” | drumroll | Missing | P1 |
| Search + tag/mood filters | drumroll, marketplace | Tags only | P1 |
| Playlists / listening rooms | Spotify clones | Missing | P2 |
| Physical + digital cart | OpenGrove | Exists | P0 polish |
| Bundles (track + mask) | OpenGrove | Missing | P2 |
| License tiers (MP3/WAV exclusive) | beat store | **Not needed** | Skip |
| Multi-vendor | Gumroad clones | **Not needed** | Skip |

---

## 5. Product gaps vs brand / YouTube funnel

From brand + VIDEO-100-LOG:

1. **Catalog lag** — Fake DJ / Late Night / strings series live on YouTube before they exist as purchasable/streamable SKUs on site.
2. **Hero visual** — live homepage is gradient/text heavy; brand wants atmosphere (indigo + grey-gold, real visual plane). Don’t purple-saas; stay Lumen.
3. **Trust before linking YT → site** — Privacy/Terms exist; need real checkout, real audio, clear “ad-free library” story.
4. **Library as product** — “Open your library” should feel like a listening home (queue, continue listening, owned vs locked), not only order history.
5. **Shop secondary** — Quiet apothecary is correct; don’t let physical cards overpower soundscapes.

---

## 6. Recommended build phases (notes → later code)

### Phase A — Trust & funnel gate (do first)
- Seed real tracks that match YT releases (Gravity Drift, Late Night deep house, strings sleep).
- Confirm stream + download paths with real R2 files.
- Guest nav always shows Music · Shop · Pricing · About (parity with signed-in paste).
- Library empty-state → clear CTAs (pricing + music).

### Phase B — Steal from beat store / BBP
- Harden `/api/stream` for long-form seek (Range / 206 if not already).
- Purchase → library row → re-download with short-lived signed URL.
- Email receipt with download link (Resend already in deps).

### Phase C — Steal from drumroll / Musicfy
- Favorites.
- Search + mood filters (sleep / focus / deep house / strings).
- Stronger preview gate UI (“Preview · Subscribe for full length”).

### Phase D — Atmosphere & conversion
- Hero: brand-first composition + one dominant visual (hall / booth / rain — Fake DJ rotation).
- Featured rails by pillar (Sleep · Focus · Fake DJ · Chamber).
- Soft “from the channel” strip **without** overclaiming medical benefits.

### Phase E — Later
- Playlists / “Night Set” collections.
- Bundles.
- Continue-listening.

---

## 7. Explicit non-goals

- Do **not** fork a Spotify clone UI.
- Do **not** become a multi-seller marketplace.
- Do **not** sell beat leases / exclusives.
- Do **not** put medical claims on product cards.
- Do **not** paste site URLs into YouTube until Phase A is green.

---

## 8. Decision log

| Decision | Choice | Why |
|----------|--------|-----|
| Rebuild vs evolve | **Evolve existing lumen-ai** | Already matches 80% of target architecture |
| Closest code twin | prod-jja-store + drumroll + OpenGrove patterns | Commerce delivery + player + multi-product |
| Payments | Keep **Stripe** | Already wired; beat-store PayPal optional later |
| Storage | Keep **Cloudflare R2** | Same as S3 patterns in references |
| Auth | Keep **Auth.js** + demo until OAuth live | Already in place |

---

## 10. Implementation status (2026-07-11)

**Phases A–D shipped** in Session 8 (see `PROJECT_LOG.md`). Phase E (playlists/bundles) still deferred.

| Phase | Status |
|-------|--------|
| A Trust & funnel | Done |
| B Downloads / range / email | Done |
| C Favorites / search / preview UX | Done |
| D Hero / pillars / channel strip | Done |
| E Playlists / bundles | Later |

*Research only originally — implementation completed in Session 8.*
