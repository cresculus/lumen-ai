"use client";

import { useState } from "react";
import { DownloadButton } from "@/components/download-button";
import { PlayTrackButton } from "@/components/music-player";
import { SignOutButton } from "@/components/oauth-buttons";
import { formatPrice } from "@/lib/utils";
import {
  CreditCard,
  Filter,
  List,
  Search,
  Sparkles,
} from "lucide-react";

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

export function AccountDashboard({
  email,
  userId: _userId,
  subscription,
  downloads,
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
  const [query, setQuery] = useState("");
  const isActive = subscription?.status === "active";
  const isDemoUser =
    email === "guest@lumenaimusic.com" || email === "admin@lumenaimusic.com";

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

  const filtered = downloads.filter((d) =>
    d.digitalProduct.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Top chrome */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0f18]/90 px-4 py-4 backdrop-blur-xl md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>Library</span>
              <span className="text-white/20">/</span>
              <span className="truncate font-medium text-white">My Workspace</span>
            </div>
            <p className="mt-1 truncate text-xs text-white/35">{email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
            <Search className="h-4 w-4 text-white/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search library"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70"
          >
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70"
          >
            <List className="h-3.5 w-3.5" />
            Newest
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 md:px-6">
        {isDemoUser && (
          <div className="mb-5 rounded-2xl border border-lumen-gold/25 bg-lumen-gold/10 px-4 py-3 text-sm text-lumen-cream">
            Demo account — purchases and library use the live database. Stripe
            billing connects when you add real keys.
          </div>
        )}

        {/* Subscription card */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-[15px] font-medium text-white">
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
                <p className="mt-2 text-sm text-white/45">
                  Subscribe for unlimited full-quality streaming
                </p>
              )}
            </div>
            {isActive ? (
              <button
                type="button"
                disabled={portalLoading || isDemoUser}
                onClick={openPortal}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5 disabled:opacity-50"
              >
                Manage billing
              </button>
            ) : (
              <a
                href="/pricing"
                className="rounded-full bg-gradient-to-r from-lumen-gold to-amber-300 px-4 py-2 text-sm font-medium text-lumen-midnight"
              >
                Upgrade to Premier
              </a>
            )}
          </div>
        </section>

        {/* Create CTA strip */}
        <a
          href="/content-studio.html"
          className="mb-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
        >
          <div className="flex h-[50px] w-[60px] items-center justify-center rounded-lg bg-white/5">
            <Sparkles className="h-6 w-6 text-lumen-gold" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-white">Create New</p>
            <p className="text-[13px] text-white/40">
              Open Content Studio · pack prompts for Suno
            </p>
          </div>
        </a>

        {/* Clip list */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white/70">Your tracks</h2>
          <span className="text-xs text-white/35">
            {filtered.length} song{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-1">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
              <p className="text-white/50">No songs in your library yet</p>
              <a
                href="/music"
                className="mt-4 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
              >
                Explore music
              </a>
            </div>
          ) : (
            filtered.map((download) => (
              <div
                key={download.id}
                className="group flex items-center gap-3 rounded-2xl border border-transparent px-2 py-2.5 transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-lumen-gold/30 to-indigo-600/30">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <PlayTrackButton
                      track={{
                        id: download.digitalProductId,
                        title: download.digitalProduct.title,
                        slug: download.digitalProduct.slug,
                        tags: download.digitalProduct.tags,
                      }}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-white">
                    {download.digitalProduct.title}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[12px] text-white/40">
                    {download.digitalProduct.tags?.slice(0, 6).join(", ") ||
                      "Lumen AI Music"}{" "}
                    · {download.downloadCount}/{download.maxDownloads} downloads
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <PlayTrackButton
                    track={{
                      id: download.digitalProductId,
                      title: download.digitalProduct.title,
                      slug: download.digitalProduct.slug,
                      tags: download.digitalProduct.tags,
                    }}
                    size="sm"
                    className="!shadow-none"
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

        {/* Orders */}
        <section className="mt-10">
          <h2 className="text-sm font-medium text-white/70">Orders</h2>
          <div className="mt-3 space-y-2">
            {orders.length === 0 ? (
              <p className="text-sm text-white/40">
                No orders yet — try demo checkout from the cart.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-white">{formatPrice(order.total)}</p>
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      {order.status}
                    </p>
                  </div>
                  <ul className="mt-2 text-sm text-white/55">
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
    </div>
  );
}
