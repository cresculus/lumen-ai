import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { ProductCard } from "@/components/product-card";
import {
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
  const [music, shop] = await Promise.all([
    getFeaturedMusic(6),
    getFeaturedShop(3),
  ]);

  const usingMock = music[0]?.id.startsWith("mock-") ?? false;

  return (
    <div>
      {usingMock && (
        <div className="border-b border-amber-400/20 bg-amber-500/10 px-4 py-2 text-center text-sm text-amber-100">
          Demo catalog active —{" "}
          <Link href="/login" className="underline hover:text-white">
            sign in
          </Link>{" "}
          to test cart, dashboard, and playback.
        </div>
      )}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-300/90">
            From YouTube to calm
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            AI sleep & focus music — stream in full quality
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Preview free. Subscribe for unlimited lossless streaming, or buy tracks
            to own. Plus a curated shop for better rest.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-violet-500 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:bg-violet-400"
            >
              Listen now
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/5"
            >
              Sign in
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/10 px-7 py-3.5 text-sm text-slate-300 hover:text-white"
            >
              Wellness shop
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-white">Featured music</h2>
            <p className="mt-1 text-sm text-slate-400">
              Tap play — 60s preview, subscribe for full
            </p>
          </div>
          <Link href="/music" className="text-sm text-violet-300 hover:text-violet-200">
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
            <h2 className="text-2xl font-medium text-white">Sleep & focus shop</h2>
            <Link href="/shop" className="text-sm text-violet-300 hover:text-violet-200">
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
