import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { getPublishedMusic } from "@/lib/catalog";
import { MUSIC_MOOD_FILTERS } from "@/lib/seed-data";

export const metadata = {
  title: "Music",
  description:
    "Hand-curated ambient soundscapes for deep sleep, focus, deep house, and chamber strings.",
};

const PAGE_WIDTH = "mx-auto w-full max-w-[1400px] px-5 md:px-8";

export default async function MusicPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string }>;
}) {
  const { tag, q } = await searchParams;
  const activeTag = tag && tag !== "all" ? tag : undefined;
  const query = q?.trim() || undefined;
  const tracks = await getPublishedMusic({ tag: activeTag, q: query });

  const buildHref = (f: string) => {
    if (f === "all") {
      return query ? `/music?q=${encodeURIComponent(query)}` : "/music";
    }
    return `/music?tag=${encodeURIComponent(f)}${
      query ? `&q=${encodeURIComponent(query)}` : ""
    }`;
  };

  return (
    <div className="w-full bg-[#0a1525]">
      <header className="border-b border-white/10 bg-[#0f1c2e]">
        <div className={`${PAGE_WIDTH} py-10 md:py-12`}>
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Sound sanctuaries
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-lumen-cream md:text-5xl">
            Curated soundscapes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Pay per song or go Unlimited — preview free, add to cart, own in
            your Library.
          </p>

          <form
            action="/music"
            method="get"
            className="mt-8 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center"
          >
            {activeTag && <input type="hidden" name="tag" value={activeTag} />}
            <input
              type="search"
              name="q"
              defaultValue={query || ""}
              placeholder="Search sleep, deep house, strings…"
              className="w-full flex-1 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm text-lumen-cream placeholder:text-slate-500 outline-none focus:border-lumen-gold/40"
            />
            <button
              type="submit"
              className="rounded-full bg-lumen-gold px-6 py-3 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {MUSIC_MOOD_FILTERS.map((f) => {
              const active =
                (activeTag || "all") === f || (!activeTag && f === "all");
              return (
                <Link
                  key={f}
                  href={buildHref(f)}
                  className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${
                    active
                      ? "bg-lumen-gold/25 text-lumen-cream"
                      : "border border-white/10 text-slate-400 hover:border-lumen-gold/30 hover:text-lumen-cream"
                  }`}
                >
                  {f}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <div className={`${PAGE_WIDTH} py-10 pb-28 md:py-12 md:pb-32`}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <p className="text-sm text-slate-400">
            {`${tracks.length} soundscape${tracks.length === 1 ? "" : "s"}${
              activeTag ? ` · ${activeTag}` : ""
            }${query ? ` · “${query}”` : ""}`}
          </p>
          <Link
            href="/pricing"
            className="text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            Go Unlimited →
          </Link>
        </div>

        {tracks.length === 0 ? (
          <div className="rounded-3xl border border-white/10 px-6 py-20 text-center">
            <p className="font-display text-2xl text-lumen-cream">
              Nothing in this mood yet
            </p>
            <p className="mt-3 text-slate-400">
              Try another filter or clear search.
            </p>
            <Link
              href="/music"
              className="mt-6 inline-flex rounded-full bg-lumen-gold/20 px-5 py-2.5 text-sm text-lumen-cream hover:bg-lumen-gold/30"
            >
              Show all
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tracks.map((track) => (
              <MusicTrackCard
                key={track.id}
                id={track.id}
                title={track.title}
                slug={track.slug}
                price={track.price}
                tags={track.tags}
                description={track.description}
                featured={track.featured}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
