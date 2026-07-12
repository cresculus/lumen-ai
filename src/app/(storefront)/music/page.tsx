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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
          Sound sanctuaries
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-lumen-cream md:text-4xl">
          Curated soundscapes
        </h1>
        <p className="mt-3 text-slate-400">
          Human-curated and finished with care. Preview free — own a track or
          subscribe for the full drift.
        </p>
      </div>

      <form action="/music" method="get" className="mt-8 flex flex-wrap gap-3">
        {activeTag && (
          <input type="hidden" name="tag" value={activeTag} />
        )}
        <input
          type="search"
          name="q"
          defaultValue={query || ""}
          placeholder="Search sleep, deep house, strings…"
          className="min-w-[16rem] flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-lumen-cream placeholder:text-slate-500 outline-none focus:border-lumen-gold/40"
        />
        <button
          type="submit"
          className="rounded-full bg-lumen-gold/20 px-5 py-2.5 text-sm text-lumen-cream hover:bg-lumen-gold/30"
        >
          Search
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {MUSIC_MOOD_FILTERS.map((f) => {
          const href =
            f === "all"
              ? query
                ? `/music?q=${encodeURIComponent(query)}`
                : "/music"
              : `/music?tag=${encodeURIComponent(f)}${
                  query ? `&q=${encodeURIComponent(query)}` : ""
                }`;
          const active =
            (activeTag || "all") === f || (!activeTag && f === "all");
          return (
            <a
              key={f}
              href={href}
              className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${
                active
                  ? "bg-lumen-gold/25 text-lumen-cream"
                  : "border border-white/10 text-slate-400 hover:text-lumen-cream"
              }`}
            >
              {f}
            </a>
          );
        })}
      </div>

      {tracks.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">
          No tracks match this mood. Try another filter or clear search.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
