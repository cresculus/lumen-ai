import Link from "next/link";
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
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Quiet apothecary
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-lumen-cream md:text-5xl">
            Silk for the night
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Objects cut to the bar the good silk houses use: 22 momme mulberry,
            a contoured mask, an envelope pillowcase, a silk cap. Checkout is
            not open yet. Listening stays free.
          </p>
          <Link
            href="/music"
            className="mt-6 inline-block text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            Browse free listening rooms →
          </Link>
        </div>
      </header>

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
            AR/VR Rooms
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold text-lumen-cream">
            Step inside the room
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Rooms you can enter, not only hear. This section is not open yet.
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.18em] text-lumen-gold-light">
            Coming soon
          </p>
          <Link
            href="/vr"
            className="mt-6 inline-block text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            AR/VR Rooms →
          </Link>
        </div>
      </section>
    </div>
  );
}
