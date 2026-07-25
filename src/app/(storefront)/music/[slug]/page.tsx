import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/favorite-button";
import { PlayTrackButton } from "@/components/music-player";
import { getPublishedMusicBySlug } from "@/lib/catalog";
import { formatDuration } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const YOUTUBE_CHANNEL = "https://www.youtube.com/@lumenlistening";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const track = await getPublishedMusicBySlug(slug);
  if (!track) return { title: "Room not found" };
  return {
    title: track.title,
    description:
      track.description ||
      "Lumen Listening Rooms — a quiet room for feeling, focus & soft resets",
  };
}

export default async function MusicDetailPage({ params }: Props) {
  const { slug } = await params;
  const track = await getPublishedMusicBySlug(slug);

  if (!track) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-lumen-gold/30 via-lumen-midnight/40 to-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayTrackButton
              track={{
                id: track.id,
                title: track.title,
                slug: track.slug,
                tags: track.tags,
              }}
              size="lg"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-lumen-gold-light">
            {track.tags.join(" · ") || "ambient"}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-lumen-cream md:text-5xl">
            {track.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Free to listen · human-curated
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
            {track.duration && <span>{formatDuration(track.duration)}</span>}
            {track.bpm && <span>{track.bpm} BPM</span>}
          </div>
          {track.description && (
            <p className="mt-6 leading-relaxed text-slate-300">
              {track.description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PlayTrackButton
              track={{
                id: track.id,
                title: track.title,
                slug: track.slug,
                tags: track.tags,
              }}
            />
            <FavoriteButton productId={track.id} />
            <Link
              href={track.youtubeUrl || YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-white hover:bg-white/5"
            >
              YouTube
            </Link>
            <Link
              href="/shop"
              className="rounded-full bg-lumen-gold px-6 py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Shop wellness
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Rooms are free. Sleep masks and quiet essentials are in the Shop.
          </p>
        </div>
      </div>
    </div>
  );
}
