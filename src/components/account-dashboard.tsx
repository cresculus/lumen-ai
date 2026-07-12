"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { PlayTrackButton } from "@/components/music-player";
import { FavoriteButton } from "@/components/favorite-button";
import {
  readDemoFavorites,
  readDemoLibrary,
  type DemoLibraryTrack,
} from "@/lib/demo-library";
import { findMockTrack } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Heart, Headphones } from "lucide-react";

type DownloadRow = {
  id: string;
  digitalProductId: string;
  downloadCount: number;
  maxDownloads: number;
  digitalProduct: { title: string; slug: string; tags: string[] };
};

type OrderRow = {
  id: string;
  total: number;
  status: string;
  utmCampaign: string | null;
  items: { id: string; title: string; quantity: number }[];
};

function toDownloadRow(track: DemoLibraryTrack): DownloadRow {
  return {
    id: track.id,
    digitalProductId: track.digitalProductId,
    downloadCount: track.downloadCount,
    maxDownloads: track.maxDownloads,
    digitalProduct: {
      title: track.title,
      slug: track.slug,
      tags: track.tags,
    },
  };
}

function LibraryCard({
  track,
  showDownload,
}: {
  track: DownloadRow;
  showDownload?: boolean;
}) {
  const { digitalProduct: p, digitalProductId } = track;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] transition hover:border-lumen-gold/35 hover:shadow-xl hover:shadow-lumen-gold/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-lumen-gold/35 via-[#152238] to-lumen-midnight">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(232,212,138,0.4),transparent_58%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(248,244,237,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <PlayTrackButton
            track={{
              id: digitalProductId,
              title: p.title,
              slug: p.slug,
              tags: p.tags,
            }}
            size="lg"
          />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[10px] text-slate-200 backdrop-blur-sm">
          <Headphones className="h-3 w-3" />
          Owned
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton productId={digitalProductId} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-wider text-lumen-gold-light/90">
          {p.tags.slice(0, 2).join(" · ") || "ambient"}
        </p>
        <Link href={`/music/${p.slug}`}>
          <h3 className="mt-1 font-display text-xl text-lumen-cream transition group-hover:text-white">
            {p.title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <PlayTrackButton
            track={{
              id: digitalProductId,
              title: p.title,
              slug: p.slug,
              tags: p.tags,
            }}
            size="sm"
          />
          {showDownload && (
            <DownloadButton productId={digitalProductId} title={p.title} />
          )}
        </div>
      </div>
    </article>
  );
}

export function AccountDashboard({
  email,
  userId: _userId,
  subscription,
  downloads: serverDownloads,
  orders,
}: {
  email: string;
  userId: string;
  subscription: {
    status: string;
    currentPeriodEnd: Date | null;
  } | null;
  downloads: DownloadRow[];
  orders: OrderRow[];
}) {
  const [portalLoading, setPortalLoading] = useState(false);
  const [downloads, setDownloads] = useState(serverDownloads);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const isActive = subscription?.status === "active";
  const isDemoUser = email === "guest@lumenaimusic.com";

  useEffect(() => {
    const local = readDemoLibrary().map(toDownloadRow);
    if (local.length === 0) {
      setDownloads(serverDownloads);
      return;
    }
    const byId = new Map(
      serverDownloads.map((d) => [d.digitalProductId, d] as const),
    );
    for (const row of local) {
      if (!byId.has(row.digitalProductId)) byId.set(row.digitalProductId, row);
    }
    setDownloads([...byId.values()]);
  }, [serverDownloads]);

  useEffect(() => {
    setFavoriteIds(readDemoFavorites());
  }, []);

  async function openPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not open billing");
    } finally {
      setPortalLoading(false);
    }
  }

  const favoriteTracks = favoriteIds
    .map((id) => {
      const owned = downloads.find((d) => d.digitalProductId === id);
      if (owned) return owned;
      const mock = findMockTrack(id);
      if (!mock) return null;
      return toDownloadRow({
        id: `fav-${id}`,
        digitalProductId: id,
        title: mock.title,
        slug: mock.slug,
        tags: mock.tags,
        downloadCount: 0,
        maxDownloads: 0,
      });
    })
    .filter(Boolean) as DownloadRow[];

  return (
    <div className="w-full">
      {/* Full-bleed hero, content locked to nav width (max-w-6xl) */}
      <section className="relative w-full overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(201,162,39,0.2),transparent_50%),radial-gradient(ellipse_at_88%_60%,rgba(15,35,60,0.95),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(232,212,138,0.11)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-lumen-gold/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-950/50 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
                Your library
              </p>
              <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-lumen-cream md:text-6xl">
                Listening room
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-300">
                Soundscapes you own and favorites you keep — full width of the
                Lumen sanctuary, ready whenever you need quiet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/music"
                  className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold-light"
                >
                  Browse soundscapes
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
                >
                  {isActive ? "Manage Unlimited" : "Unlock Unlimited"}
                </Link>
              </div>
              {isDemoUser && (
                <p className="mt-6 text-xs text-slate-500">
                  Guest session — sign in with Google to keep purchases across
                  devices.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-lumen-gold/25 bg-lumen-gold/[0.07] p-6 backdrop-blur-sm md:p-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-lumen-gold-light">
                Membership
              </p>
              <h2 className="font-display mt-2 text-2xl text-lumen-cream">
                Lumen Unlimited
              </h2>
              {isActive ? (
                <p className="mt-2 text-sm text-emerald-300/90">
                  Active
                  {subscription?.currentPeriodEnd && (
                    <>
                      {" "}
                      · renews{" "}
                      {subscription.currentPeriodEnd.toLocaleDateString()}
                    </>
                  )}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Full-length streaming across the catalog — no ads, no sixty
                  second cutoff.
                </p>
              )}
              <div className="mt-5">
                {isActive ? (
                  <button
                    type="button"
                    disabled={portalLoading || isDemoUser}
                    onClick={openPortal}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white hover:bg-white/5 disabled:opacity-50"
                  >
                    Manage billing
                  </button>
                ) : (
                  <Link
                    href="/pricing"
                    className="inline-flex rounded-full bg-lumen-gold px-5 py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
                  >
                    View plans
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owned — same width as Music catalog */}
      <section className="w-full border-b border-white/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-lumen-cream">
                Owned tracks
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {downloads.length} title{downloads.length === 1 ? "" : "s"} ·
                play anytime
              </p>
            </div>
            <Link
              href="/music"
              className="text-sm text-lumen-gold-light hover:text-lumen-cream"
            >
              Add more →
            </Link>
          </div>

          {downloads.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-20 text-center md:px-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.1),transparent_60%)]" />
              <p className="relative font-display text-3xl text-lumen-cream md:text-4xl">
                The room is still empty
              </p>
              <p className="relative mx-auto mt-4 max-w-lg text-base text-slate-400">
                Own a soundscape or start Unlimited — then this wall fills with
                everything you can play ad-free.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/music"
                  className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
                >
                  Browse music
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-white/15 px-7 py-3.5 text-sm text-lumen-cream hover:bg-white/5"
                >
                  Listen ad-free
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {downloads.map((download) => (
                <LibraryCard
                  key={download.id}
                  track={download}
                  showDownload
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Favorites */}
      <section className="w-full border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
          <div className="mb-8 flex items-center gap-3">
            <Heart className="h-5 w-5 text-lumen-gold" />
            <div>
              <h2 className="font-display text-3xl text-lumen-cream">
                Saved favorites
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Hearts from the catalog gather here
              </p>
            </div>
          </div>

          {favoriteTracks.length === 0 ? (
            <p className="text-slate-500">
              Browse music and tap the heart — favorites land on this wall.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTracks.map((track) => (
                <LibraryCard key={track.id} track={track} />
              ))}
            </div>
          )}
        </div>
      </section>

      {orders.length > 0 && (
        <section className="w-full">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <h2 className="font-display text-2xl text-lumen-cream">Orders</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-lumen-cream">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {order.status}
                    </p>
                  </div>
                  <ul className="mt-2 text-sm text-slate-400">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
