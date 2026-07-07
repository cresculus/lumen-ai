import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/db";

export const metadata = { title: "Shop" };

export default async function ShopPage() {
  const products = await prisma.physicalProduct.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Sleep & focus shop</h1>
      <p className="mt-2 text-slate-400">
        Night caps, sleep masks, ear plugs, and more for better rest.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
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
