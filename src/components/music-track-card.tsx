"use client";

import Link from "next/link";
import { PlayTrackButton } from "@/components/music-player";
import { FavoriteButton } from "@/components/favorite-button";

type MusicTrackCardProps = {
  id: string;
  title: string;
  slug: string;
  price?: number;
  tags: string[];
  description?: string | null;
  featured?: boolean;
  cover?: string | null;
  wallpaper?: string | null;
};

export function MusicTrackCard({
  id,
  title,
  slug,
  tags,
  description,
  featured,
  cover,
  wallpaper,
}: MusicTrackCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#0f1c2e]/80 p-4 transition hover:border-lumen-gold/30">
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        {featured && (
          <span className="rounded-full bg-lumen-gold/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-lumen-gold-light">
            Featured
          </span>
        )}
        <FavoriteButton productId={id} />
      </div>
      <div className="relative mb-3 w-full shrink-0 overflow-hidden rounded-lg bg-[#152238] aspect-[16/10]">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-lumen-gold/20 via-transparent to-indigo-900/30" />
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <PlayTrackButton track={{ id, title, slug, tags }} size="lg" />
        </div>
      </div>
      <p className="text-[11px] uppercase tracking-wider text-lumen-gold-light/90">
        {tags.slice(0, 2).join(" · ") || "ambient"}
      </p>
      <Link href={`/music/${slug}`}>
        <h3 className="mt-1 text-lg font-medium text-white transition group-hover:text-lumen-cream">
          {title}
        </h3>
      </Link>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">{description}</p>
      )}
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs uppercase tracking-wide text-slate-500">
          Free to listen
        </span>
        <span className="flex items-center gap-3">
          {wallpaper ? (
            <a
              href={wallpaper}
              download
              className="text-xs uppercase tracking-wide text-lumen-gold-light hover:text-lumen-cream"
            >
              Wallpaper
            </a>
          ) : null}
          <PlayTrackButton track={{ id, title, slug, tags }} size="sm" />
        </span>
      </div>
    </article>
  );
}
