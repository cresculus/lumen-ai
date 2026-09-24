import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getPublishedShop } from "@/lib/catalog";
import { wallpapers } from "@/lib/wallpapers";

const YOUTUBE = "https://www.youtube.com/@lumenlistening";

const HERO_ROOMS = [
  "jazz-club",
  "tin-roof",
  "kyoto",
  "cupola",
  "miami",
  "lake-como",
];

export default async function HomePage() {
  const products = await getPublishedShop();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const shopPreview = (featured.length ? featured : products).slice(0, 3);
  const rooms = HERO_ROOMS.map((slug) =>
    wallpapers.find((wall) => wall.slug === slug),
  ).filter((wall) => wall != null);

  return (
    <div className="w-full bg-[#0a1525]">
      <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wallpapers/preview/jazz-club.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1525] via-[#0a1525]/75 to-[#0a1525]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525] via-[#0a1525]/20 to-[#0a1525]/45" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-6xl flex-col justify-end px-4 pb-10 pt-16 md:pb-14">
          <p className="text-xs uppercase tracking-[0.32em] text-lumen-gold-light">
            One place at a time
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-medium leading-[0.98] text-lumen-cream md:text-7xl">
            Quiet rooms for feeling, focus, and deep rest
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
            A listening room is one world, left on. High quality. Free to
            listen. No ads on this site. The full room plays on YouTube.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Listen
            </Link>
            <Link
              href="/wallpapers"
              className="rounded-full border border-white/30 bg-black/20 px-7 py-3.5 text-sm font-medium text-lumen-cream backdrop-blur-sm hover:bg-black/40"
            >
              4K wallpapers
            </Link>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-3.5 text-sm text-slate-200 hover:text-lumen-cream"
            >
              YouTube
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {rooms.map((room) => (
              <Link
                key={room.slug}
                href={`/music/${room.slug}`}
                className="group overflow-hidden rounded-lg border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/wallpapers/preview/${room.file}`}
                  alt={room.title}
                  className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2 md:py-20">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="grid sm:grid-cols-5">
            <div className="sm:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/shop/silk-sleep-mask.jpg"
                alt="Night mask"
                className="h-full min-h-48 w-full object-cover"
              />
            </div>
            <div className="p-6 sm:col-span-3 md:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-lumen-gold-light">
                22 momme silk
              </p>
              <h2 className="font-display mt-3 text-3xl text-lumen-cream">
                Silk for the night
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                A contoured mask, an envelope pillowcase, and a silk cap, cut
                to sit beside a room. Checkout is coming soon.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block text-sm text-lumen-gold-light hover:text-lumen-cream"
              >
                See the objects →
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/vr"
          className="group relative min-h-80 overflow-hidden rounded-3xl border border-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/wallpapers/preview/cupola.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525] via-[#0a1525]/55 to-[#0a1525]/10" />
          <div className="relative flex h-full flex-col justify-end p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-lumen-gold-light">
              Coming soon
            </p>
            <h2 className="font-display mt-3 max-w-sm text-3xl text-lumen-cream md:text-4xl">
              Augmented reality and virtual reality rooms
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
              Listening rooms you can step into. Not open yet.
            </p>
          </div>
        </Link>
      </section>

      {shopPreview.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shopPreview.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                href={`/shop/${product.slug}`}
                image={product.images[0]}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
