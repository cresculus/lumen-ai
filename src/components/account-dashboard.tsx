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
import { Heart, Sparkles } from "lucide-react";

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

function TrackArt({ title }: { title: string }) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-lumen-gold/35 via-[#1a2840] to-lumen-midnight shadow-[0_0_24px_rgba(201,162,39,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(232,212,138,0.35),transparent_60%)]" />
      <span className="absolute inset-0 flex items-center justify-center font-display text-lg text-lumen-cream/80">
        {title.slice(0, 1)}
      </span>
    </div>
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
    <div>
      {/* Listening-room hero — not a dashboard header */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(201,162,39,0.16),transparent_55%),radial-gradient(ellipse_at_90%_40%,rgba(20,40,70,0.8),transparent_50%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(232,212,138,0.1)_1px,transparent_1px)] [background-size:26px_26px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-20">
          <p className="font-display text-xl text-lumen-gold-light md:text-2xl">
            Sound, woven in light
          </p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold leading-tight text-lumen-cream md:text-5xl">
            Your listening room
          </h1>
          <p className="mt-4 max-w-lg text-slate-300">
            Owned soundscapes and saved favorites — ad-free, in one quiet place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="rounded-full bg-lumen-gold px-6 py-3 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              Browse soundscapes
            </Link>
            {!isActive && (
              <Link
                href="/pricing"
                className="rounded-full border border-lumen-cream/25 px-6 py-3 text-sm text-lumen-cream hover:bg-white/5"
              >
                Unlock Unlimited
              </Link>
            )}
          </div>
          {isDemoUser && (
            <p className="mt-6 text-xs text-slate-500">
              Exploring as a guest — sign in with Google to keep purchases across
              devices.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 md:py-16">
        {/* Membership strip */}
        <section className="relative overflow-hidden rounded-[1.75rem] border border-lumen-gold/20 bg-gradient-to-r from-lumen-gold/10 via-transparent to-transparent px-6 py-6 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-lumen-gold/15 text-lumen-gold">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-xl text-lumen-cream">
                  Lumen Unlimited
                </h2>
                {isActive ? (
                  <p className="mt-1 text-sm text-emerald-300/90">
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
                  <p className="mt-1 text-sm text-slate-400">
                    Full-length streaming across the catalog — no ads, no cutoff.
                  </p>
                )}
              </div>
            </div>
            {isActive ? (
              <button
                type="button"
                disabled={portalLoading || isDemoUser}
                onClick={openPortal}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white hover:bg-white/5 disabled:opacity-50"
              >
                Manage billing
              </button>
            ) : (
              <Link
                href="/pricing"
                className="rounded-full bg-lumen-gold px-5 py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
              >
                View plans
              </Link>
            )}
          </div>
        </section>

        {/* Owned */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-lumen-cream">
                Owned tracks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {downloads.length} title{downloads.length === 1 ? "" : "s"} in
                your room
              </p>
            </div>
          </div>

          {downloads.length === 0 ? (
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 px-6 py-16 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent_65%)]" />
              <p className="relative font-display text-2xl text-lumen-cream">
                The room is still empty
              </p>
              <p className="relative mx-auto mt-3 max-w-md text-sm text-slate-400">
                Choose a soundscape to own, or open Unlimited for the full
                catalog — then press play whenever you need quiet.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/music"
                  className="rounded-full bg-lumen-gold px-6 py-3 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
                >
                  Browse music
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm text-lumen-cream hover:bg-white/5"
                >
                  Listen ad-free
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {downloads.map((download) => (
                <li
                  key={download.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-lumen-gold/25"
                >
                  <TrackArt title={download.digitalProduct.title} />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/music/${download.digitalProduct.slug}`}
                      className="block truncate font-medium text-lumen-cream hover:text-white"
                    >
                      {download.digitalProduct.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">
                      {download.digitalProduct.tags?.slice(0, 3).join(" · ") ||
                        "Lumen AI Music"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FavoriteButton productId={download.digitalProductId} />
                    <PlayTrackButton
                      track={{
                        id: download.digitalProductId,
                        title: download.digitalProduct.title,
                        slug: download.digitalProduct.slug,
                        tags: download.digitalProduct.tags,
                      }}
                      size="sm"
                    />
                    <DownloadButton
                      productId={download.digitalProductId}
                      title={download.digitalProduct.title}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Favorites */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <Heart className="h-5 w-5 text-lumen-gold" />
            <h2 className="font-display text-2xl text-lumen-cream">
              Saved favorites
            </h2>
          </div>
          {favoriteTracks.length === 0 ? (
            <p className="text-sm text-slate-500">
              Tap the heart on any track while browsing — it gathers here.
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {favoriteTracks.map((track) => (
                <li
                  key={track.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <TrackArt title={track.digitalProduct.title} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-lumen-cream">
                      {track.digitalProduct.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {track.digitalProduct.tags.slice(0, 2).join(" · ")}
                    </p>
                  </div>
                  <PlayTrackButton
                    track={{
                      id: track.digitalProductId,
                      title: track.digitalProduct.title,
                      slug: track.digitalProduct.slug,
                      tags: track.digitalProduct.tags,
                    }}
                    size="sm"
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Orders — quieter, secondary */}
        {orders.length > 0 && (
          <section>
            <h2 className="font-display text-xl text-lumen-cream">Orders</h2>
            <div className="mt-4 space-y-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lumen-cream">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {order.status}
                    </p>
                  </div>
                  <ul className="mt-1 text-sm text-slate-400">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
