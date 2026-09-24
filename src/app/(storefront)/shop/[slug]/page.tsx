import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedShopBySlug } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedShopBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description:
      product.description ||
      "Silk for the night from Lumen Listening Rooms. Checkout coming soon.",
  };
}

export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedShopBySlug(slug);

  if (!product) notFound();

  const image = product.images[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/shop"
        className="text-sm text-lumen-gold-light hover:text-lumen-cream"
      >
        ← Back to shop
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-[#0a1525]">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div>
          <p className="text-sm uppercase tracking-wider text-lumen-gold-light">
            {product.category}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-lumen-cream">
            {product.title}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-lumen-gold-light">
            Coming soon
          </p>
          {product.description && (
            <p className="mt-4 text-slate-300">{product.description}</p>
          )}
          <p className="mt-4 text-sm text-slate-400">
            Payment is not open yet. These pieces stay listed so you can see
            what is coming.
          </p>
          <Link
            href="/music"
            className="mt-8 inline-block text-sm text-slate-400 hover:text-lumen-cream"
          >
            Free rooms →
          </Link>
        </div>
      </div>
    </div>
  );
}
