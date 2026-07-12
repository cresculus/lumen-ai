import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { getPublishedMusic } from "@/lib/catalog";
import { MUSIC_MOOD_FILTERS } from "@/lib/seed-data";

export const metadata = {
  title: "Music",
  description:
    "Hand-curated ambient soundscapes for deep sleep, focus, deep house, and chamber strings.",
};

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
    <div className="w-full">
      <section className="relative w-full overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_10%,rgba(201,162,39,0.18),transparent_48%),radial-gradient(ellipse_at_85%_70%,rgba(12,28,50,0.9),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(232,212,138,0.1)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Sound sanctuaries
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-lumen-cream md:text-6xl">
            Curated soundscapes
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Sleep, focus, deep house, and chamber strings — preview free, own or
            subscribe for the full drift.
          </p>

          <form
            action="/music"
            method="get"
            className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          >
            {activeTag && <input type="hidden" name="tag" value={activeTag} />}
            <input
              type="search"
              name="q"
              defaultValue={query || ""}
              placeholder="Search sleep, deep house, strings…"
              className="w-full flex-1 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm text-lumen-cream placeholder:text-slate-500 outline-none focus:border-lumen-gold/40"
            />
            <button
              type="submit"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {MUSIC_MOOD_FILTERS.map((f) => {
              const active =
                (activeTag || "all") === f || (!activeTag && f === "all");
              return (
                <Link
                  key={f}
                  href={buildHref(f)}
                  className={`rounded-full px-4 py-2 text-sm capitalize transition ${
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
      </section>

      <section className="w-full">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <p className="text-sm text-slate-400">
              {`${tracks.length} soundscape${tracks.length === 1 ? "" : "s"}${
                activeTag ? ` · ${activeTag}` : ""
              }${query ? ` · “${query}”` : ""}`}
            </p>
            <Link
              href="/pricing"
              className="text-sm text-lumen-gold-light hover:text-lumen-cream"
            >
              Listen ad-free →
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
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((track) => (
                <div key={track.id} className="min-h-0 min-w-0">
                  <MusicTrackCard
                    id={track.id}
                    title={track.title}
                    slug={track.slug}
                    price={track.price}
                    tags={track.tags}
                    description={track.description}
                    featured={track.featured}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
