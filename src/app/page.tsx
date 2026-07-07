import Link from "next/link";
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
        take: 3,
      }),
      prisma.physicalProduct.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 3,
      }),
    ]);
  } catch {
    // Database may not be connected or migrated yet during initial deploy.
  }

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-violet-300">
            From YouTube to calm
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Sleep deeper. Focus longer. Feel better.
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Lumen AI brings you AI-generated sleep and focus music, plus curated
            wellness products for your nightly routine.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white hover:bg-violet-400"
            >
              Browse music
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
            >
              Shop wellness
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-medium text-white">Featured music</h2>
          <Link href="/music" className="text-sm text-violet-300 hover:text-violet-200">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {music.length === 0 ? (
            <p className="text-slate-400">Music coming soon. Upload from admin.</p>
          ) : (
            music.map((track) => (
              <ProductCard
                key={track.id}
                title={track.title}
                slug={track.slug}
                price={track.price}
                description={track.description}
                href={`/music/${track.slug}`}
                badge={track.tags[0]}
              />
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-medium text-white">Shop picks</h2>
          <Link href="/shop" className="text-sm text-violet-300 hover:text-violet-200">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {shop.length === 0 ? (
            <p className="text-slate-400">Shop items coming soon.</p>
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
      </section>
    </div>
  );
}
