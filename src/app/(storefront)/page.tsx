import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { ProductCard } from "@/components/product-card";
import {
  getCatalogMode,
  getFeaturedMusic,
  getFeaturedShop,
  type CatalogMusic,
  type CatalogShopItem,
} from "@/lib/catalog";

function MusicTrackCardLazy({ track }: { track: CatalogMusic }) {
  return (
    <MusicTrackCard
      id={track.id}
      title={track.title}
      slug={track.slug}
      price={track.price}
      tags={track.tags}
      description={track.description}
      featured={track.featured}
    />
  );
}

function ShopCardLazy({ product }: { product: CatalogShopItem }) {
  return (
    <ProductCard
      title={product.title}
      slug={product.slug}
      price={product.price}
      description={product.description}
      href={`/shop/${product.slug}`}
      badge={product.category}
    />
  );
}

export default async function HomePage() {
  const [music, shop, catalogMode] = await Promise.all([
    getFeaturedMusic(6),
    getFeaturedShop(3),
    getCatalogMode(),
  ]);

  return (
    <div>
      {catalogMode === "mock" && (
        <div className="border-b border-lumen-gold/20 bg-lumen-gold/10 px-4 py-2 text-center text-sm text-lumen-cream">
          Demo catalog — connect PostgreSQL and run{" "}
          <code className="text-lumen-gold-light">npm run db:setup</code> for the
          live library.
        </div>
      )}
      {catalogMode === "empty" && (
        <div className="border-b border-rose-400/20 bg-rose-500/10 px-4 py-2 text-center text-sm text-lumen-cream">
          Database connected but catalog is empty — run{" "}
          <code className="text-lumen-gold-light">npm run db:seed</code> or upload
          tracks in{" "}
          <Link href="/admin/music/new" className="underline hover:text-white">
            admin
          </Link>
          .
        </div>
      )}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lumen-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-lumen-gold-light">
            Sound, Woven in Light
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-lumen-cream md:text-6xl">
            Hand-finished ambient sanctuaries for deep rest &amp; focus
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            AI composition meets human curation — every piece stitched, mastered,
            and layered with care. Drift into long-form soundscapes ad-free, or
            explore our quiet apothecary of wellness essentials.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold-light"
            >
              Explore soundscapes
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              Listen ad-free
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/10 px-7 py-3.5 text-sm text-slate-300 hover:text-lumen-cream"
            >
              Wellness shop
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-lumen-cream">
              Featured soundscapes
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Human-curated · finished with care · preview free
            </p>
          </div>
          <Link
            href="/music"
            className="text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            View catalog →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {music.map((track) => (
            <MusicTrackCardLazy key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-medium text-lumen-cream">
                Quiet apothecary
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Objects for rest that match the sonic world
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm text-lumen-gold-light hover:text-lumen-cream"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {shop.map((product) => (
              <ShopCardLazy key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
