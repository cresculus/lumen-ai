import Link from "next/link";
import { PhotoHeader } from "@/components/photo-header";
import { ProductCard } from "@/components/product-card";
import { getPublishedShop } from "@/lib/catalog";

export const metadata = {
  title: "Shop",
  description:
    "22 momme mulberry silk for the night — mask, pillowcase, sleep cap, and eye pillow. Checkout coming soon.",
};

export default async function ShopPage() {
  const products = await getPublishedShop();

  return (
    <div className="w-full bg-[#0a1525]">
      <PhotoHeader
        image="/shop/silk-pillowcase.jpg"
        eyebrow="22 momme silk"
        title="Silk for the night"
      >
        <p className="text-lg text-slate-200">
          A contoured mask, an envelope pillowcase, and a silk cap, made to sit
          beside a room. Checkout is not open yet.
        </p>
        <Link
          href="/music"
          className="mt-6 inline-block text-sm text-lumen-gold-light hover:text-lumen-cream"
        >
          Listen free →
        </Link>
      </PhotoHeader>

      <div className="mx-auto max-w-6xl px-4 py-12 pb-28 md:py-16">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 px-6 py-20 text-center">
            <p className="font-display text-2xl text-lumen-cream">
              Shop opening soon
            </p>
            <p className="mt-3 text-slate-400">
              Meanwhile, leave a room on and rest.
            </p>
            <Link
              href="/music"
              className="mt-6 inline-flex rounded-full bg-lumen-gold/20 px-5 py-2.5 text-sm text-lumen-cream hover:bg-lumen-gold/30"
            >
              Explore Rooms
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                slug={product.slug}
                description={product.description}
                href={`/shop/${product.slug}`}
                image={product.images[0]}
                badge={product.featured ? "Featured" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Augmented reality · Virtual reality
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold text-lumen-cream">
            Augmented Reality and Virtual Reality rooms
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Listening rooms for augmented reality and virtual reality. This
            section is not open yet.
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.18em] text-lumen-gold-light">
            Coming soon
          </p>
          <Link
            href="/vr"
            className="mt-6 inline-block text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            AR/VR rooms →
          </Link>
        </div>
      </section>
    </div>
  );
}
