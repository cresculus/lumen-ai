import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { prisma } from "@/lib/db";
import { buildUtmUrl, formatPrice } from "@/lib/utils";

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
  const track = await prisma.digitalProduct.findUnique({ where: { slug } });

  if (!track || track.status !== "PUBLISHED") {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = buildUtmUrl(`${appUrl}/music/${track.slug}`, track.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/10" />
        <div>
          <p className="text-sm uppercase tracking-wider text-violet-300">
            {track.tags.join(" · ") || "ambient"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{track.title}</h1>
          <p className="mt-4 text-2xl text-violet-200">{formatPrice(track.price)}</p>
          {track.description && (
            <p className="mt-4 text-slate-300">{track.description}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <BuyButton
              productId={track.id}
              title={track.title}
              price={track.price}
              slug={track.slug}
              type="DIGITAL"
            />
            {track.youtubeUrl && (
              <Link
                href={track.youtubeUrl}
                target="_blank"
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-white hover:bg-white/5"
              >
                Watch on YouTube
              </Link>
            )}
          </div>
          <p className="mt-6 break-all text-xs text-slate-500">
            YouTube link: {shareUrl}
          </p>
        </div>
      </div>
    </div>
  );
}
