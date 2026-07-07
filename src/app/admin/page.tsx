import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { DollarSign, Music, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const [musicCount, shopCount, orderCount, revenue, recentOrders] =
    await Promise.all([
      prisma.digitalProduct.count(),
      prisma.physicalProduct.count(),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.aggregate({
        where: { status: "PAID" },
        _sum: { total: true },
      }),
      prisma.order.findMany({
        where: { status: "PAID" },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { user: true },
      }),
    ]);

  const stats = [
    {
      label: "Music tracks",
      value: musicCount,
      icon: Music,
      href: "/admin/music",
    },
    {
      label: "Shop products",
      value: shopCount,
      icon: ShoppingBag,
      href: "/admin/shop",
    },
    {
      label: "Paid orders",
      value: orderCount,
      icon: Package,
      href: "/admin/orders",
    },
    {
      label: "Revenue",
      value: formatPrice(revenue._sum.total || 0),
      icon: DollarSign,
      href: "/admin/analytics",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Dashboard overview</h1>
      <p className="mt-1 text-sm text-slate-400">
        Upload music, manage shop, track YouTube funnel performance
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30 hover:bg-white/[0.05]"
          >
            <stat.icon className="h-5 w-5 text-violet-400" />
            <p className="mt-4 text-sm text-slate-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-6">
          <h2 className="font-medium text-white">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin/music/new"
              className="rounded-full bg-violet-500 px-4 py-2 text-sm text-white"
            >
              Upload music
            </Link>
            <Link
              href="/admin/shop"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white"
            >
              Add shop product
            </Link>
            <Link
              href="/admin/analytics"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white"
            >
              View analytics
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="flex items-center gap-2 font-medium text-white">
            <TrendingUp className="h-4 w-4 text-violet-400" />
            Recent orders
          </h2>
          <div className="mt-4 space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-slate-500">No orders yet</p>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-slate-300">{order.user.email}</span>
                  <span className="text-violet-200">{formatPrice(order.total)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
