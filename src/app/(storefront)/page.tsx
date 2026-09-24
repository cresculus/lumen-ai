import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getPublishedShop } from "@/lib/catalog";

const YOUTUBE = "https://www.youtube.com/@lumenlistening";

export default async function HomePage() {
  const products = await getPublishedShop();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const shopPreview = (featured.length ? featured : products).slice(0, 3);

  return (
    <div className="w-full bg-[#0a1525]">
      <section className="relative min-h-[78vh] md:min-h-[88vh]">
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 md:min-h-[88vh] md:justify-center md:pb-24 md:pt-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lumen-listening-rooms-logo.svg"
            alt="Lumen Listening Rooms"
            className="mb-5 h-10 w-auto md:h-12"
          />
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-lumen-cream md:text-6xl">
            Quiet rooms for feeling, focus &amp; soft resets
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Long-form listening stays free. This shop is for the objects that
            deepen rest — sleep masks, soft nights, and calm essentials that
            match the rooms.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold-light"
            >
              Shop wellness
            </Link>
            <Link
              href="/music"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              Free rooms
            </Link>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Quiet apothecary
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display max-w-xl text-3xl font-semibold text-lumen-cream md:text-4xl">
              Silk for the night
            </h2>
            <Link
              href="/shop"
              className="text-sm text-lumen-gold-light hover:text-lumen-cream"
            >
              View all →
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-slate-400">
            22 momme mulberry silk, made to sit beside a room. Checkout is coming soon.
          </p>

          {shopPreview.length === 0 ? (
            <p className="mt-10 text-slate-500">Products arriving soon.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shopPreview.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  href={`/shop/${product.slug}`}
                  image={product.images[0]}
                  badge={product.featured ? "Featured" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Augmented reality · Virtual reality
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold text-lumen-cream md:text-4xl">
            Augmented Reality and Virtual Reality rooms
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Listening rooms for augmented reality and virtual reality. This
            section is not open yet.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-lumen-gold-light">
            Coming soon
          </p>
          <Link
            href="/vr"
            className="mt-8 inline-block text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            AR/VR rooms →
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Listening
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold text-lumen-cream md:text-4xl">
            Rooms stay free
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            High-quality rooms, free to listen. Preview them here or watch the
            full video on YouTube. This site has no ads.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              Explore Rooms
            </Link>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
