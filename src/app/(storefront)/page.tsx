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

function TrackCard({ track }: { track: CatalogMusic }) {
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

function ShopCard({ product }: { product: CatalogShopItem }) {
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

function Section({
  eyebrow,
  title,
  blurb,
  href,
  children,
  tone = "plain",
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  href?: string;
  children: React.ReactNode;
  tone?: "plain" | "soft";
}) {
  return (
    <section
      className={`relative isolate w-full border-b border-white/5 ${
        tone === "soft" ? "bg-white/[0.02]" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
                {eyebrow}
              </p>
            )}
            <h2
              className={`font-display text-2xl font-medium text-lumen-cream md:text-3xl ${
                eyebrow ? "mt-2" : ""
              }`}
            >
              {title}
            </h2>
            {blurb && <p className="mt-2 text-sm text-slate-400">{blurb}</p>}
          </div>
          {href && (
            <Link
              href={href}
              className="shrink-0 text-sm text-lumen-gold-light hover:text-lumen-cream"
            >
              View all →
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const pillars = await Promise.all(
    MUSIC_PILLARS.map(async (pillar) => ({
      pillar,
      tracks: await getMusicByPillar(pillar.id, 3),
    })),
  );
  const [shop, channel] = await Promise.all([
    getFeaturedShop(3),
    getChannelTracks(3),
  ]);

  return (
    <div className="w-full">
      <section className="relative min-h-[78vh] overflow-hidden border-b border-white/5 md:min-h-[88vh]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,162,39,0.18),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(15,40,70,0.9),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(232,212,138,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 md:min-h-[88vh] md:justify-center md:pb-24 md:pt-20">
          <p className="mb-5 font-display text-2xl text-lumen-gold-light md:text-3xl">
            Lumen AI Music
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-lumen-cream md:text-6xl">
            Sound Experiences
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Hand-finished ambient for deep rest and focus — AI composition,
            human curation, ad-free in your library.
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
              Go Unlimited
            </Link>
          </div>
        </div>
      </section>

      {pillars.map(({ pillar, tracks }) => {
        if (tracks.length === 0) return null;
        return (
          <Section
            key={pillar.id}
            title={pillar.label}
            blurb={pillar.blurb}
            href={`/music?tag=${encodeURIComponent(pillar.tags[0])}`}
          >
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((track) => (
                <div key={track.id} className="min-h-0 min-w-0">
                  <TrackCard track={track} />
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      {channel.length > 0 && (
        <Section
          eyebrow="YouTube"
          title="From the channel"
          blurb="Pieces that started on YouTube — own or stream them here."
          tone="soft"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {channel.map((track) => (
              <Link
                key={track.id}
                href={`/music/${track.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lumen-gold/30"
              >
                <p className="text-[11px] uppercase tracking-wider text-lumen-gold-light/80">
                  {track.tags.slice(0, 2).join(" · ")}
                </p>
                <p className="mt-2 font-display text-lg text-lumen-cream">
                  {track.title}
                </p>
                <p className="mt-3 text-sm text-lumen-gold-light">Open →</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {shop.length > 0 && (
        <Section
          title="Quiet apothecary"
          blurb="Objects for rest that match the sonic world"
          href="/shop"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {shop.map((product) => (
              <ShopCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
