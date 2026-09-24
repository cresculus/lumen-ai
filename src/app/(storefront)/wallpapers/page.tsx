import type { Metadata } from "next";
import { PhotoHeader } from "@/components/photo-header";
import { wallpaperPacks, wallpapers } from "@/lib/wallpapers";

export const metadata: Metadata = {
  title: "4K Wallpapers",
  description:
    "Free 3840×2160 desktop wallpapers from Lumen Listening Rooms. Tin Roof, The Jazz Club, and the space rooms.",
};

export default function WallpapersPage() {
  const series = ["Rooms", "Space", "Tour", "With Iselin"] as const;

  return (
    <div>
      <PhotoHeader
        image="/wallpapers/preview/kyoto.jpg"
        eyebrow="Wallpapers"
        title="Take the room with you"
      >
        <p className="text-lg leading-relaxed text-slate-200">
          Desktop files are 3840×2160. Phone files are 2160×3840. Free for your
          own screen.
        </p>
      </PhotoHeader>
      <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap gap-3">
        {wallpaperPacks.map((pack) => (
          <a
            key={pack.file}
            href={`/wallpapers/packs/${pack.file}`}
            download
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-lumen-cream hover:border-lumen-gold/50"
          >
            Download {pack.title}
          </a>
        ))}
      </div>

      {series.map((name) => {
        const items = wallpapers.filter((w) => w.series === name);
        const heading =
          name === "With Iselin"
            ? "Enjoy your rooms with Iselin. Download the wallpapers."
            : name;
        return (
          <section key={name} className="mt-12">
            <h2
              className={
                name === "With Iselin"
                  ? "font-display text-2xl text-lumen-cream"
                  : "text-[11px] uppercase tracking-[0.28em] text-slate-500"
              }
            >
              {heading}
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
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
                    className="aspect-video w-full object-cover"
                    width={960}
                    height={540}
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
    </div>
  );
}
