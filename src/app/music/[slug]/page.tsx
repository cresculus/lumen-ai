import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { BuyButton } from "@/components/buy-button";
import { PlayTrackButton } from "@/components/music-player";
import { hasActiveSubscription } from "@/lib/access";
import { prisma } from "@/lib/db";
import { buildUtmUrl, formatDuration, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const track = await prisma.digitalProduct.findUnique({ where: { slug } });
  if (!track) return { title: "Track not found" };
  return {
    title: track.title,
    description: track.description || "Lumen AI music",
  };
}

export default async function MusicDetailPage({ params }: Props) {
  const { slug } = await params;
  const session = await auth();
  const track = await prisma.digitalProduct.findUnique({ where: { slug } });

  if (!track || track.status !== "PUBLISHED") {
    notFound();
  }

  const subscribed =
    session?.user?.id
      ? await hasActiveSubscription(session.user.id)
      : false;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = buildUtmUrl(`${appUrl}/music/${track.slug}`, track.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/40 via-indigo-500/20 to-slate-900">
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
          <p className="text-sm uppercase tracking-wider text-violet-300">
            {track.tags.join(" · ") || "ambient"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
            {track.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
            {track.duration && (
              <span>{formatDuration(track.duration)}</span>
            )}
            {track.bpm && <span>{track.bpm} BPM</span>}
            <span className="text-violet-300">Lossless stream</span>
          </div>
          <p className="mt-6 text-3xl text-violet-200">{formatPrice(track.price)}</p>
          {track.description && (
            <p className="mt-4 text-slate-300 leading-relaxed">{track.description}</p>
          )}
          {subscribed && (
            <p className="mt-4 rounded-lg bg-violet-500/15 px-3 py-2 text-sm text-violet-100">
              Included in your Lumen Unlimited subscription
            </p>
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
            {!subscribed && (
              <BuyButton
                productId={track.id}
                title={track.title}
                price={track.price}
                slug={track.slug}
                type="DIGITAL"
              />
            )}
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
