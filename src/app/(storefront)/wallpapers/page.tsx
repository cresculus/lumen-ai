import type { Metadata } from "next";
import { wallpapers } from "@/lib/wallpapers";

export const metadata: Metadata = {
  title: "4K Wallpapers",
  description:
    "Free 3840×2160 desktop wallpapers from Lumen Listening Rooms. Tin Roof, The Jazz Club, and the space rooms.",
};

export default function WallpapersPage() {
  const series = ["Rooms", "Space", "With Iselin"] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-[11px] uppercase tracking-[0.32em] text-lumen-gold-light">
        Wallpapers
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium text-lumen-cream md:text-5xl">
        Take the room with you
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
        Desktop wallpapers from the listening rooms, plus Iselin in the room.
        Wide files are 3840×2160. Phone files are 2160×3840. Free for your own screen.
      </p>

      {series.map((name) => {
        const items = wallpapers.filter((w) => w.series === name);
        return (
          <section key={name} className="mt-12">
            <h2 className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
              {name}
            </h2>
            <div className={`mt-4 grid gap-5 ${name === "With Iselin" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
              {items.map((wall) => {
                const tall = wall.wide === false;
                return (
                <article
                  key={wall.slug}
                  id={wall.slug}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-lumen-midnight"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/wallpapers/preview/${wall.file}`}
                    alt={wall.title}
                    className={tall ? "aspect-[9/16] w-full object-cover" : "aspect-video w-full object-cover"}
                    width={tall ? 540 : 960}
                    height={tall ? 960 : 540}
                  />
                  <div className="flex items-center justify-between gap-3 px-4 py-4">
                    <div>
                      <h3 className="font-display text-xl text-lumen-cream">
                        {wall.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                        {tall ? "2160 × 3840" : "3840 × 2160"}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap justify-end gap-2">
                      <a
                        href={`https://www.youtube.com/watch?v=${wall.youtubeId}`}
                        className="rounded-full border border-white/20 px-4 py-2 text-sm text-lumen-cream hover:border-lumen-gold/50"
                      >
                        Watch the room
                      </a>
                      <a
                        href={`/wallpapers/4k/${wall.file}`}
                        download={`Lumen ${wall.title} 4K.jpg`}
                        className="rounded-full bg-lumen-gold px-4 py-2 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
                      >
                        Download 4K
                      </a>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
