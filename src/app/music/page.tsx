import { MusicTrackCard } from "@/components/music-track-card";
import { getPublishedMusic } from "@/lib/catalog";

export const metadata = { title: "Music" };

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
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          Sleep & focus catalog
        </h1>
        <p className="mt-3 text-slate-400">
          Stream in the highest quality your files support. Demo tracks play sample
          audio until you upload to admin.
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
                  ? "bg-violet-500/25 text-violet-100"
                  : "border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {f}
            </a>
          );
        })}
      </div>

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
    </div>
  );
}
