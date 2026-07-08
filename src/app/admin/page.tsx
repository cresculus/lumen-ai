import Link from "next/link";
import { getAdminStats } from "@/lib/admin-stats";
import { formatPrice } from "@/lib/utils";
import {
  DollarSign,
  Filter,
  List,
  Music,
  Package,
  Search,
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
      {/* Workspace header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Workspaces</span>
            <span className="text-white/20">/</span>
            <span className="font-medium text-white">Creator Hub</span>
          </div>
          <p className="mt-1 text-sm text-white/45">
            Upload music, manage shop, track YouTube funnel performance
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5 hover:text-white"
        >
          View storefront
        </Link>
      </div>

      {stats.usingMock && (
        <div className="mb-6 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Showing demo dashboard data — connect PostgreSQL and run{" "}
          <code className="rounded bg-black/30 px-1">npx prisma db push</code> for live
          stats.
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
          <Search className="h-4 w-4 text-white/35" />
          <span className="text-sm text-white/30">Search catalog…</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">
          <List className="h-3.5 w-3.5" />
          Newest
        </span>
      </div>

      {/* Create row */}
      <div className="mb-8 grid gap-2 sm:grid-cols-2">
        <Link
          href="/admin/music/new"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
        >
          <div className="flex h-[50px] w-[60px] items-center justify-center rounded-lg bg-white/5">
            <Upload className="h-6 w-6 text-white/70 group-hover:text-lumen-gold" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-white">Upload New Track</p>
            <p className="text-[13px] text-white/40">Add audio · cover · publish</p>
          </div>
        </Link>
        <a
          href="/content-studio.html"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
        >
          <div className="flex h-[50px] w-[60px] items-center justify-center rounded-lg bg-gradient-to-br from-lumen-gold/25 to-indigo-500/20">
            <Sparkles className="h-6 w-6 text-lumen-gold" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-white">Content Studio</p>
            <p className="text-[13px] text-white/40">Pack Suno prompts · YouTube SEO</p>
          </div>
        </a>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <stat.icon className="h-5 w-5 text-lumen-gold" />
            <p className="mt-4 text-sm text-white/45">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-lumen-gold/25 bg-gradient-to-br from-lumen-gold/15 to-transparent p-6">
          <h2 className="font-medium text-white">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/admin/music/new"
              className="rounded-full bg-gradient-to-r from-lumen-gold to-amber-300 px-4 py-2 text-sm font-medium text-lumen-midnight"
            >
              Upload music
            </Link>
            <Link
              href="/admin/shop"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Add shop product
            </Link>
            <Link
              href="/admin/analytics"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Analytics
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="flex items-center gap-2 font-medium text-white">
            <TrendingUp className="h-4 w-4 text-lumen-gold" />
            Recent orders
          </h2>
          <div className="mt-4 space-y-3">
            {stats.recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl px-2 py-1.5 text-sm hover:bg-white/[0.03]"
              >
                <span className="truncate text-white/70">{order.email}</span>
                <span className="shrink-0 text-lumen-gold-light">
                  {formatPrice(order.total)}
                </span>
              </div>
            ))}
            {stats.recentOrders.length === 0 && (
              <p className="text-sm text-white/40">No recent orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
