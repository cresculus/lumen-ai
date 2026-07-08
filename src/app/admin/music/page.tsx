import Link from "next/link";
import { prisma } from "@/lib/db";
import { buildUtmUrl, formatPrice } from "@/lib/utils";

export default async function AdminMusicPage() {
  const tracks = await prisma.digitalProduct.findMany({
    orderBy: { createdAt: "desc" },
  });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium text-white">Music catalog</h2>
        <Link
          href="/admin/music/new"
          className="rounded-full bg-lumen-gold px-4 py-2 text-sm text-white"
        >
          Upload new track
        </Link>
      </div>
      <div className="space-y-3">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">{track.title}</p>
                <p className="text-sm text-slate-400">
                  {track.status} · {formatPrice(track.price)}
                </p>
              </div>
              <code className="max-w-full overflow-x-auto text-xs text-slate-400">
                {buildUtmUrl(`${appUrl}/music/${track.slug}`, track.slug)}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
