import { ProductCard } from "@/components/product-card";
import { getPublishedShop } from "@/lib/catalog";

export const metadata = {
  title: "Shop",
  description:
    "A quiet apothecary of wellness essentials — candles, journals, and objects for rest.",
};

export default async function ShopPage() {
  const products = await getPublishedShop();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm uppercase tracking-[0.25em] text-lumen-gold-light">
        Quiet apothecary
      </p>
      <h1 className="font-display mt-2 text-3xl font-semibold text-lumen-cream">
        Wellness for the drift
      </h1>
      <p className="mt-2 text-slate-400">
        Candles, journals, and objects that match the sonic world — curated for
        restful rituals and gentle presence.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            slug={product.slug}
            price={product.price}
            description={product.description}
            href={`/shop/${product.slug}`}
            badge={product.category}
          />
        ))}
      </div>
    </div>
  );
}
