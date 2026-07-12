import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { ProductCard } from "@/components/product-card";
import {
  getChannelTracks,
  getFeaturedShop,
  getMusicByPillar,
  type CatalogMusic,
  type CatalogShopItem,
} from "@/lib/catalog";
import { MUSIC_PILLARS } from "@/lib/seed-data";

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
  const [shop, channel, ...pillarTracks] = await Promise.all([
    getFeaturedShop(3),
    getChannelTracks(4),
    ...MUSIC_PILLARS.map((p) => getMusicByPillar(p.id, 3)),
  ]);

  return (
    <div>
      {/* Brand hero */}
      <section className="relative min-h-[88vh] overflow-hidden border-b border-white/5">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,162,39,0.18),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(15,40,70,0.9),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(232,212,138,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-lumen-gold/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[36rem] w-[36rem] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-900/40 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 md:justify-center md:pb-24 md:pt-20">
          <p className="mb-5 font-display text-2xl text-lumen-gold-light md:text-3xl">
            Lumen AI Music
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-lumen-cream md:text-6xl">
            Sound, Woven in Light
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Hand-finished ambient sanctuaries for deep rest and focus — AI
            composition, human curation, ad-free on your own library.
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
          </div>
        </div>
      </section>

      {/* Pillar rails */}
      {MUSIC_PILLARS.map((pillar, index) => {
        const tracks = pillarTracks[index] || [];
        if (tracks.length === 0) return null;
        return (
          <section
            key={pillar.id}
            className="border-b border-white/5 px-4 py-14"
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-medium text-lumen-cream">
                    {pillar.label}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{pillar.blurb}</p>
                </div>
                <Link
                  href={`/music?tag=${encodeURIComponent(pillar.tags[0])}`}
                  className="shrink-0 text-sm text-lumen-gold-light hover:text-lumen-cream"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tracks.map((track) => (
                  <MusicTrackCardLazy key={track.id} track={track} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* From the channel */}
      {channel.length > 0 && (
        <section className="border-b border-white/5 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
                From the channel
              </p>
              <h2 className="font-display mt-2 text-2xl font-medium text-lumen-cream">
                Heard on YouTube — finished here
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Long-form pieces from Lumen AI Music, available to own or stream
                ad-free in your library.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {channel.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-lumen-gold-light/80">
                      {track.tags.slice(0, 2).join(" · ")}
                    </p>
                    <Link
                      href={`/music/${track.slug}`}
                      className="mt-1 block truncate text-lg text-lumen-cream hover:text-white"
                    >
                      {track.title}
                    </Link>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {track.youtubeUrl && (
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:text-white"
                      >
                        Watch
                      </a>
                    )}
                    <Link
                      href={`/music/${track.slug}`}
                      className="rounded-full bg-lumen-gold/20 px-4 py-2 text-sm text-lumen-cream hover:bg-lumen-gold/30"
                    >
                      Own / stream
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
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
