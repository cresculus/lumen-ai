import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.physicalProduct.findUnique({ where: { slug } });

  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/10" />
        <div>
          <p className="text-sm uppercase tracking-wider text-violet-300">
            {product.category}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{product.title}</h1>
          <p className="mt-4 text-2xl text-violet-200">{formatPrice(product.price)}</p>
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
