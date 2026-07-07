import Link from "next/link";
import { MusicTrackCard } from "@/components/music-track-card";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  let music: Awaited<ReturnType<typeof prisma.digitalProduct.findMany>> = [];
  let shop: Awaited<ReturnType<typeof prisma.physicalProduct.findMany>> = [];

  try {
    [music, shop] = await Promise.all([
      prisma.digitalProduct.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 6,
      }),
      prisma.physicalProduct.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 3,
      }),
    ]);
  } catch {
    // DB may not be ready during deploy
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-300/90">
            From YouTube to calm
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            AI sleep & focus music — stream in full quality
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Preview free. Subscribe for unlimited lossless streaming, or buy tracks
            to own. Plus a curated shop for better rest.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-violet-500 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:bg-violet-400"
            >
              Listen now
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white hover:bg-white/5"
            >
              View plans
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/10 px-7 py-3.5 text-sm text-slate-300 hover:text-white"
            >
              Wellness shop
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-white">Featured music</h2>
            <p className="mt-1 text-sm text-slate-400">Tap play — 60s preview, subscribe for full</p>
          </div>
          <Link href="/music" className="text-sm text-violet-300 hover:text-violet-200">
            View catalog →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {music.length === 0 ? (
            <p className="col-span-full text-slate-500">Upload tracks from admin to get started.</p>
          ) : (
            music.map((track) => (
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
            ))
          )}
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-medium text-white">Sleep & focus shop</h2>
            <Link href="/shop" className="text-sm text-violet-300 hover:text-violet-200">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {shop.length === 0 ? (
              <p className="text-slate-500">Add products in admin.</p>
            ) : (
              shop.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  slug={product.slug}
                  price={product.price}
                  description={product.description}
                  href={`/shop/${product.slug}`}
                  badge={product.category}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
