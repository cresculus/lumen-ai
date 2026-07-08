import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { BuyButton } from "@/components/buy-button";
import { PlayTrackButton } from "@/components/music-player";
import { hasActiveSubscription } from "@/lib/access";
import { getPublishedMusicBySlug } from "@/lib/catalog";
import { buildUtmUrl, formatDuration, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const track = await getPublishedMusicBySlug(slug);
  if (!track) return { title: "Track not found" };
  return {
    title: track.title,
    description: track.description || "Lumen AI Music — hand-curated ambient",
  };
}

export default async function MusicDetailPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();
  const track = await getPublishedMusicBySlug(slug);

  if (!track) notFound();

  const subscribed =
    session?.user?.id && !session.user.id.startsWith("mock-")
      ? await hasActiveSubscription(session.user.id)
      : false;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = buildUtmUrl(`${appUrl}/music/${track.slug}`, track.slug);

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
            Human-curated · finished with care
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
            {track.duration && <span>{formatDuration(track.duration)}</span>}
            {track.bpm && <span>{track.bpm} BPM</span>}
            <span className="text-lumen-gold-light">Lossless stream</span>
          </div>
          <p className="mt-6 text-3xl text-lumen-gold-light">{formatPrice(track.price)}</p>
          {track.description && (
            <p className="mt-4 leading-relaxed text-slate-300">{track.description}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <PlayTrackButton
              track={{
                id: track.id,
                title: track.title,
                slug: track.slug,
                tags: track.tags,
              }}
            />
            <BuyButton
              productId={track.id}
              title={track.title}
              price={track.price}
              slug={track.slug}
              type="DIGITAL"
            />
            <Link
              href="/pricing"
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-white hover:bg-white/5"
            >
              Subscribe
            </Link>
            {track.youtubeUrl && (
              <Link
                href={track.youtubeUrl}
                target="_blank"
                className="rounded-full border border-white/10 px-6 py-2.5 text-sm text-slate-300 hover:text-white"
              >
                YouTube
              </Link>
            )}
          </div>
          <p className="mt-8 break-all text-xs text-slate-600">
            Funnel link: {shareUrl}
          </p>
        </div>
      </div>
    </div>
  );
}
