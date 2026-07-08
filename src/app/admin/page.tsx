import Link from "next/link";
import { getAdminStats } from "@/lib/admin-stats";
import { formatPrice } from "@/lib/utils";
import { DollarSign, Music, Package, ShoppingBag, TrendingUp } from "lucide-react";

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
    <div>
      {stats.usingMock && (
        <div className="mb-6 rounded-xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Showing demo dashboard data — connect PostgreSQL and run{" "}
          <code className="rounded bg-black/30 px-1">npx prisma db push</code> for live
          stats.
        </div>
      )}
      <h1 className="text-2xl font-semibold text-white">Dashboard overview</h1>
      <p className="mt-1 text-sm text-slate-400">
        Upload music, manage shop, track YouTube funnel performance
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lumen-gold/30"
          >
            <stat.icon className="h-5 w-5 text-lumen-gold" />
            <p className="mt-4 text-sm text-slate-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-lumen-gold/20 bg-lumen-gold/10 p-6">
          <h2 className="font-medium text-white">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/admin/music/new" className="rounded-full bg-lumen-gold px-4 py-2 text-sm text-white">
              Upload music
            </Link>
            <Link href="/admin/shop" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white">
              Add shop product
            </Link>
            <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white">
              View storefront
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
              <div key={i} className="flex justify-between text-sm">
                <span className="text-slate-300">{order.email}</span>
                <span className="text-lumen-gold-light">{formatPrice(order.total)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
