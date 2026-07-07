import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/db";

export const metadata = { title: "Music" };

export default async function MusicPage() {
  const tracks = await prisma.digitalProduct.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Sleep & focus music</h1>
      <p className="mt-2 text-slate-400">
        High-quality AI-generated tracks for sleep, study, and deep focus.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tracks.map((track) => (
          <ProductCard
            key={track.id}
            title={track.title}
            slug={track.slug}
            price={track.price}
            description={track.description}
            href={`/music/${track.slug}`}
            badge={track.tags.join(", ") || "ambient"}
          />
        ))}
      </div>
    </div>
  );
}
