import Link from "next/link";
import { getAdminStats } from "@/lib/admin-stats";
import { formatPrice } from "@/lib/utils";
import {
  DollarSign,
  Music,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const cards = [
    {
      label: "Music tracks",
      value: stats.musicCount,
      icon: Music,
      href: "/admin/music",
    },
    {
      label: "Shop products",
      value: stats.shopCount,
      icon: ShoppingBag,
      href: "/admin/shop",
    },
    {
      label: "Paid orders",
      value: stats.orderCount,
      icon: Package,
      href: "/admin/orders",
    },
    {
      label: "Revenue",
      value: formatPrice(stats.revenue),
      icon: DollarSign,
      href: "/admin/analytics",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-lumen-gold-light">
          Creator console
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-lumen-cream">
          Dashboard overview
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Upload music, manage the shop, and track YouTube funnel performance
        </p>
      </header>

      {stats.usingMock && (
        <div className="mb-6 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Showing demo dashboard data — connect PostgreSQL and run{" "}
          <code className="rounded bg-black/30 px-1">npx prisma db push</code> for live
          stats.
        </div>
      )}

      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lumen-gold/30 hover:bg-white/[0.05]"
          >
            <stat.icon className="h-5 w-5 text-lumen-gold" />
            <p className="mt-4 text-sm text-slate-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/music/new"
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lumen-gold/30"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lumen-gold/15">
            <Upload className="h-5 w-5 text-lumen-gold" />
          </div>
          <div>
            <p className="font-medium text-white">Upload new track</p>
            <p className="text-sm text-slate-400">Audio, cover art, publish</p>
          </div>
        </Link>
        <a
          href="/content-studio.html"
          className="flex items-center gap-4 rounded-2xl border border-lumen-gold/20 bg-gradient-to-br from-lumen-gold/10 to-transparent p-5 transition hover:border-lumen-gold/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lumen-gold/15">
            <Sparkles className="h-5 w-5 text-lumen-gold" />
          </div>
          <div>
            <p className="font-medium text-white">Content studio</p>
            <p className="text-sm text-slate-400">Prompt packs + YouTube SEO</p>
          </div>
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-lumen-gold/20 bg-lumen-gold/10 p-6">
          <h2 className="font-medium text-white">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/admin/music/new"
              className="rounded-xl bg-lumen-gold px-4 py-2 text-sm font-medium text-lumen-midnight"
            >
              Upload music
            </Link>
            <Link
              href="/admin/shop"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Add shop product
            </Link>
            <Link
              href="/admin/analytics"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Open analytics
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="flex items-center gap-2 font-medium text-white">
            <TrendingUp className="h-4 w-4 text-lumen-gold" />
            Recent orders
          </h2>
          <div className="mt-4 space-y-3">
            {stats.recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl px-2 py-1.5 text-sm"
              >
                <span className="truncate text-slate-300">{order.email}</span>
                <span className="shrink-0 text-lumen-gold-light">
                  {formatPrice(order.total)}
                </span>
              </div>
            ))}
            {stats.recentOrders.length === 0 && (
              <p className="text-sm text-slate-400">No recent orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}