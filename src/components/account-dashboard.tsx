"use client";

import { useEffect, useState } from "react";
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
import { CreditCard, Heart, Music2, Package } from "lucide-react";

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
  const isDemoUser =
    email === "guest@lumenaimusic.com" || email === "admin@lumenaimusic.com";

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
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-lumen-gold-light">
          Member sanctuary
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-lumen-cream">
          Your sound library
        </h1>
        <p className="mt-2 text-sm text-slate-400">{email}</p>
      </header>

      {isDemoUser && (
        <div className="mb-6 rounded-2xl border border-lumen-gold/25 bg-lumen-gold/10 px-4 py-3 text-sm text-lumen-cream">
          Demo account — purchases land in your library (database when
          connected, or browser library for mock catalog). Stripe billing
          connects when you add real keys.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-base font-medium text-white">
                <CreditCard className="h-4 w-4 text-lumen-gold" />
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
                <p className="mt-2 text-sm text-slate-400">
                  Unlimited full-quality streaming for deep rest and focus
                </p>
              )}
            </div>
            {isActive ? (
              <button
                type="button"
                disabled={portalLoading || isDemoUser}
                onClick={openPortal}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5 disabled:opacity-50"
              >
                Manage billing
              </button>
            ) : (
              <a
                href="/pricing"
                className="rounded-xl bg-lumen-gold px-4 py-2 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
              >
                View plans
              </a>
            )}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white">
            <Music2 className="h-5 w-5 text-lumen-gold" />
            Owned tracks
          </h2>
          <span className="text-xs text-slate-500">
            {downloads.length} title{downloads.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-2">
          {downloads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center">
              <p className="text-slate-400">
                Your library is quiet — purchase a track or start Unlimited for
                full-length streaming.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/music"
                  className="inline-flex rounded-xl bg-lumen-gold px-4 py-2 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
                >
                  Browse music
                </a>
                <a
                  href="/pricing"
                  className="inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm text-lumen-cream hover:bg-white/5"
                >
                  Listen ad-free
                </a>
              </div>
            </div>
          ) : (
            downloads.map((download) => (
              <div
                key={download.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">
                    {download.digitalProduct.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {download.digitalProduct.tags?.slice(0, 4).join(" · ") ||
                      "Lumen AI Music"}{" "}
                    · {download.downloadCount}/{download.maxDownloads} downloads
                  </p>
                </div>
                <div className="flex gap-2">
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
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-white">
          <Heart className="h-5 w-5 text-lumen-gold" />
          Saved favorites
        </h2>
        {favoriteTracks.length === 0 ? (
          <p className="text-sm text-slate-400">
            Tap the heart on any track to save it here.
          </p>
        ) : (
          <div className="space-y-2">
            {favoriteTracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">
                    {track.digitalProduct.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {track.digitalProduct.tags.slice(0, 3).join(" · ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <FavoriteButton productId={track.digitalProductId} />
                  <PlayTrackButton
                    track={{
                      id: track.digitalProductId,
                      title: track.digitalProduct.title,
                      slug: track.digitalProduct.slug,
                      tags: track.digitalProduct.tags,
                    }}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-medium text-white">
          <Package className="h-5 w-5 text-lumen-gold" />
          Orders
        </h2>
        <div className="mt-4 space-y-2">
          {orders.length === 0 ? (
            <p className="text-sm text-slate-400">
              No server orders yet — demo checkout still adds tracks above.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white">{formatPrice(order.total)}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {order.status}
                  </p>
                </div>
                <ul className="mt-2 text-sm text-slate-300">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.title} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
