"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { DownloadButton } from "@/components/download-button";
import { PlayTrackButton } from "@/components/music-player";
import { FavoriteButton } from "@/components/favorite-button";
import {
  readDemoFavorites,
  readDemoLibrary,
  type DemoLibraryTrack,
} from "@/lib/demo-library";
import type { CatalogShopItem } from "@/lib/catalog";
import { findMockTrack } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Heart, Headphones, ShoppingBag, ShoppingCart } from "lucide-react";

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

type DashboardTab = "library" | "shop";

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
    <article className="group relative flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-0 transition hover:border-lumen-gold/35 hover:shadow-xl hover:shadow-lumen-gold/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-lumen-gold/35 via-[#152238] to-lumen-midnight">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(232,212,138,0.4),transparent_58%)]" />
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

function ShopCard({ product }: { product: CatalogShopItem }) {
  return (
    <article className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5">
      <div className="mb-4 aspect-[4/3] shrink-0 rounded-xl bg-gradient-to-br from-lumen-gold/20 to-lumen-midnight/40" />
      <p className="text-[11px] uppercase tracking-wider text-lumen-gold-light/90">
        {product.category}
      </p>
      <Link href={`/shop/${product.slug}`}>
        <h3 className="mt-1 font-display text-lg text-lumen-cream hover:text-white">
          {product.title}
        </h3>
      </Link>
      {product.description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
          {product.description}
        </p>
      )}
      <p className="mt-3 text-lumen-gold-light">{formatPrice(product.price)}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <BuyButton
          productId={product.id}
          title={product.title}
          price={product.price}
          slug={product.slug}
          type="PHYSICAL"
        />
        <Link
          href={`/shop/${product.slug}`}
          className="text-sm text-lumen-gold-light hover:text-lumen-cream"
        >
          Details →
        </Link>
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
  shopProducts,
  initialTab = "library",
}: {
  email: string;
  userId: string;
  subscription: {
    status: string;
    currentPeriodEnd: Date | null;
  } | null;
  downloads: DownloadRow[];
  orders: OrderRow[];
  shopProducts: CatalogShopItem[];
  initialTab?: DashboardTab;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [portalLoading, setPortalLoading] = useState(false);
  const [downloads, setDownloads] = useState(serverDownloads);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const tab: DashboardTab =
    searchParams.get("tab") === "shop" ? "shop" : initialTab;
  const isActive = subscription?.status === "active";
  const isGuest = email === "guest@lumenaimusic.com";

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

  function setTab(next: DashboardTab) {
    router.push(next === "shop" ? "/account?tab=shop" : "/account");
  }

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

  const hasOwned = downloads.length > 0;
  const hasFavorites = favoriteTracks.length > 0;

  return (
    <div className="w-full">
      <section className="relative w-full overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(201,162,39,0.2),transparent_50%),radial-gradient(ellipse_at_88%_60%,rgba(15,35,60,0.95),transparent_55%),linear-gradient(180deg,#0f1c2e_0%,#0a1525_100%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(232,212,138,0.11)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-lumen-gold-light">
            Library
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-lumen-cream md:text-6xl">
            {tab === "shop" ? "Shop" : "Listening room"}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            {tab === "shop"
              ? "Wellness essentials — add to cart and check out when ready."
              : "Tracks you own, favorites, and your cart — pay per song or go Unlimited."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/music"
              className="rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight shadow-lg shadow-lumen-gold/20 hover:bg-lumen-gold-light"
            >
              Browse Music
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
            </Link>
            {!isActive && (
              <Link
                href="/pricing"
                className="rounded-full border border-lumen-cream/25 px-7 py-3.5 text-sm font-medium text-lumen-cream hover:bg-white/5"
              >
                Go Unlimited
              </Link>
            )}
          </div>
          {isGuest && (
            <p className="mt-5 text-xs text-slate-500">
              Browsing as a guest.{" "}
              <Link href="/login" className="text-lumen-gold-light underline">
                Sign in
              </Link>{" "}
              to keep purchases on every device.
            </p>
          )}
        </div>
      </section>

      <section className="w-full border-b border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab("library")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tab === "library"
                  ? "bg-lumen-gold text-lumen-midnight"
                  : "border border-white/15 text-slate-300 hover:bg-white/5"
              }`}
            >
              Library
            </button>
            <button
              type="button"
              onClick={() => setTab("shop")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                tab === "shop"
                  ? "bg-lumen-gold text-lumen-midnight"
                  : "border border-white/15 text-slate-300 hover:bg-white/5"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Shop
            </button>
          </div>
          <Link
            href="/cart"
            className="text-sm text-lumen-gold-light hover:text-lumen-cream"
          >
            View cart →
          </Link>
        </div>
      </section>

      {!isActive && tab === "library" && (
        <section className="w-full border-b border-white/5">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8">
            <div>
              <h2 className="font-display text-xl text-lumen-cream">
                Pay per song or Unlimited
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Buy tracks from Music, or subscribe for full-catalog streaming.
              </p>
            </div>
            <Link
              href="/pricing"
              className="rounded-full bg-lumen-gold px-5 py-2.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
            >
              View plans
            </Link>
          </div>
        </section>
      )}

      {isActive && tab === "library" && (
        <section className="w-full border-b border-white/5">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8">
            <div>
              <h2 className="font-display text-xl text-lumen-cream">
                In Unlimited
              </h2>
              <p className="mt-1 text-sm text-emerald-300/90">
                Active
                {subscription?.currentPeriodEnd && (
                  <>
                    {" "}
                    · renews {subscription.currentPeriodEnd.toLocaleDateString()}
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              disabled={portalLoading || isGuest}
              onClick={openPortal}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white hover:bg-white/5 disabled:opacity-50"
            >
              Manage billing
            </button>
          </div>
        </section>
      )}

      {tab === "shop" ? (
        <section className="w-full border-b border-white/5">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
            <div className="mb-8">
              <h2 className="font-display text-3xl text-lumen-cream">
                Quiet apothecary
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Add items to cart — checkout from Cart when ready.
              </p>
            </div>
            {shopProducts.length === 0 ? (
              <p className="text-slate-500">Nothing in the shop yet.</p>
            ) : (
              <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shopProducts.map((product) => (
                  <div key={product.id} className="min-h-0 min-w-0">
                    <ShopCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="w-full border-b border-white/5">
            <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl text-lumen-cream">
                    Owned tracks
                  </h2>
                  {hasOwned && (
                    <p className="mt-2 text-sm text-slate-400">
                      {downloads.length} title{downloads.length === 1 ? "" : "s"}
                    </p>
                  )}
                </div>
                {hasOwned && (
                  <Link
                    href="/music"
                    className="text-sm text-lumen-gold-light hover:text-lumen-cream"
                  >
                    Buy more →
                  </Link>
                )}
              </div>

              {!hasOwned ? (
                <div className="rounded-3xl border border-white/10 px-6 py-16 text-center md:px-12">
                  <p className="font-display text-2xl text-lumen-cream md:text-3xl">
                    Nothing owned yet
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-slate-400">
                    Browse Music, add tracks to cart, or subscribe for Unlimited
                    streaming.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/music"
                      className="inline-flex rounded-full bg-lumen-gold px-7 py-3.5 text-sm font-medium text-lumen-midnight hover:bg-lumen-gold-light"
                    >
                      Browse Music
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex rounded-full border border-white/15 px-7 py-3.5 text-sm text-lumen-cream hover:bg-white/5"
                    >
                      Go Unlimited
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {downloads.map((download) => (
                    <div key={download.id} className="min-h-0 min-w-0">
                      <LibraryCard track={download} showDownload />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {(hasFavorites || hasOwned) && (
            <section className="w-full border-b border-white/5 bg-white/[0.02]">
              <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
                <div className="mb-8 flex items-center gap-3">
                  <Heart className="h-5 w-5 text-lumen-gold" />
                  <h2 className="font-display text-3xl text-lumen-cream">
                    Favorites
                  </h2>
                </div>

                {!hasFavorites ? (
                  <p className="text-slate-500">
                    Heart a track while browsing Music to save it here.
                  </p>
                ) : (
                  <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {favoriteTracks.map((track) => (
                      <div key={track.id} className="min-h-0 min-w-0">
                        <LibraryCard track={track} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}

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
                  {order.utmCampaign === "yearly-subscription-gift" && (
                    <p className="mt-1 text-xs text-lumen-gold-light">
                      Yearly Unlimited gift
                    </p>
                  )}
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
