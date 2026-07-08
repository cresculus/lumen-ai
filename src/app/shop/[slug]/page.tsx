import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { getPublishedShopBySlug } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedShopBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-lumen-gold/20 to-lumen-midnight/40" />
        <div>
          <p className="text-sm uppercase tracking-wider text-lumen-gold-light">
            {product.category}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-lumen-cream">
            {product.title}
          </h1>
          <p className="mt-4 text-2xl text-lumen-gold-light">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-slate-400">
            {product.inventory > 0
              ? `${product.inventory} in stock`
              : "Out of stock"}
          </p>
          {product.description && (
            <p className="mt-4 text-slate-300">{product.description}</p>
          )}
          <div className="mt-8">
            <BuyButton
              productId={product.id}
              title={product.title}
              price={product.price}
              slug={product.slug}
              type="PHYSICAL"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
