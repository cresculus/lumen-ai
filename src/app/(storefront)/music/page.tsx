import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { getPublishedMusic } from "@/lib/catalog";
import { MUSIC_MOOD_FILTERS } from "@/lib/seed-data";
import { wallpaperForSlug, wallpaperPacks } from "@/lib/wallpapers";

export const metadata = {
  title: "Rooms",
  description:
    "Free listening rooms for focus, deep sleep, Quiet Kingdom, and late nights — leave them on.",
};

const PAGE_WIDTH = "mx-auto w-full max-w-[1400px] px-5 md:px-8";
const YOUTUBE = "https://www.youtube.com/@lumenlistening";

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
      <header className="border-b border-white/10">
        <div className={`${PAGE_WIDTH} py-10 md:py-12`}>
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Listening rooms
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-lumen-cream md:text-5xl">
            Free quiet rooms
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            High-quality rooms, free to listen. A short preview plays here. The
            full video is on YouTube. This site has no ads.
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
              placeholder="Search focus, sleep, quiet kingdom…"
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
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <p className="text-sm text-slate-400">
            {`${tracks.length} room${tracks.length === 1 ? "" : "s"}${
              activeTag ? ` · ${activeTag}` : ""
            }${query ? ` · “${query}”` : ""}`}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lumen-gold-light hover:text-lumen-cream"
            >
              YouTube →
            </a>
            <Link
              href="/shop"
              className="text-lumen-gold-light hover:text-lumen-cream"
            >
              Shop wellness →
            </Link>
            {wallpaperPacks.map((pack) => (
              <a
                key={pack.file}
                href={`/wallpapers/packs/${pack.file}`}
                download
                className="text-lumen-gold-light hover:text-lumen-cream"
              >
                {pack.title} pack
              </a>
            ))}
          </div>
        </div>

        {tracks.length === 0 ? (
          <div className="rounded-3xl border border-white/10 px-6 py-20 text-center">
            <p className="font-display text-2xl text-lumen-cream">
              Nothing in this room yet
            </p>
            <p className="mt-3 text-slate-400">
              Try another shelf or clear search.
            </p>
            <Link
              href="/music"
              className="mt-6 inline-flex rounded-full bg-lumen-gold/20 px-5 py-2.5 text-sm text-lumen-cream hover:bg-lumen-gold/30"
            >
              Show all
            </Link>
          </div>
        ) : (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tracks.map((track) => (
              <div key={track.id} className="grid-card-cell">
                <MusicTrackCard
                  id={track.id}
                  title={track.title}
                  slug={track.slug}
                  price={track.price}
                  tags={track.tags}
                  description={track.description}
                  featured={track.featured}
                  cover={track.coverKey}
                  wallpaper={
                    wallpaperForSlug(track.slug)
                      ? `/wallpapers/4k/${wallpaperForSlug(track.slug)?.file}`
                      : null
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
