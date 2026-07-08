import { MusicTrackCard } from "@/components/music-track-card";
import { getPublishedMusic } from "@/lib/catalog";

export const metadata = {
  title: "Music",
  description:
    "Hand-curated ambient soundscapes for deep sleep, focus, and cinematic drift.",
};

const filters = ["all", "sleep", "focus", "ambient", "study", "deep sleep"];

export default async function MusicPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const activeTag = tag && tag !== "all" ? tag : undefined;
  const tracks = await getPublishedMusic(activeTag);

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
          Human-curated and finished with care. Stream in the highest quality
          your files support — preview free, own or subscribe for the full drift.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const href = f === "all" ? "/music" : `/music?tag=${encodeURIComponent(f)}`;
          const active = (activeTag || "all") === f || (!activeTag && f === "all");
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
          No tracks in this collection yet. New weavings arrive soon.
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
