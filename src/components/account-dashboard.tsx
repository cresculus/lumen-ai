"use client";

import { useState } from "react";
import { DownloadButton } from "@/components/download-button";
import { PlayTrackButton } from "@/components/music-player";
import { formatPrice } from "@/lib/utils";
import { CreditCard, Music2 } from "lucide-react";

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
  subscription,
  downloads,
  orders,
}: {
  email: string;
  subscription: {
    status: string;
    currentPeriodEnd: Date | null;
  } | null;
  downloads: DownloadRow[];
  orders: OrderRow[];
}) {
  const [portalLoading, setPortalLoading] = useState(false);
  const isActive = subscription?.status === "active";

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Your account</h1>
      <p className="mt-2 text-slate-400">{email}</p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-medium text-white">
              <CreditCard className="h-5 w-5 text-violet-400" />
              Lumen Unlimited
            </h2>
            {isActive ? (
              <p className="mt-2 text-sm text-emerald-300/90">
                Active
                {subscription?.currentPeriodEnd && (
                  <> · renews {subscription.currentPeriodEnd.toLocaleDateString()}</>
                )}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-400">
                Subscribe for unlimited full-quality streaming
              </p>
            )}
          </div>
          {isActive ? (
            <button
              type="button"
              disabled={portalLoading}
              onClick={openPortal}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Manage billing
            </button>
          ) : (
            <a
              href="/pricing"
              className="rounded-full bg-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-400"
            >
              Subscribe
            </a>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-medium text-white">
          <Music2 className="h-5 w-5 text-violet-400" />
          Music library
        </h2>
        <div className="mt-4 space-y-3">
          {downloads.length === 0 && !isActive ? (
            <p className="text-slate-400">
              Purchase tracks or subscribe to build your library.
            </p>
          ) : (
            downloads.map((download) => (
              <div
                key={download.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="text-white">{download.digitalProduct.title}</p>
                  <p className="text-sm text-slate-400">
                    Downloads: {download.downloadCount}/{download.maxDownloads}
                  </p>
                </div>
                <div className="flex gap-2">
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
        <h2 className="text-xl font-medium text-white">Orders</h2>
        <div className="mt-4 space-y-3">
          {orders.length === 0 ? (
            <p className="text-slate-400">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white">{formatPrice(order.total)}</p>
                  <p className="text-sm text-slate-400">{order.status}</p>
                </div>
                <ul className="mt-2 text-sm text-slate-300">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.title} × {item.quantity}
                    </li>
                  ))}
                </ul>
                {order.utmCampaign && (
                  <p className="mt-2 text-xs text-slate-500">
                    YouTube: {order.utmCampaign}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
