import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [musicCount, shopCount, orderCount, revenue] = await Promise.all([
    prisma.digitalProduct.count(),
    prisma.physicalProduct.count(),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.aggregate({
      where: { status: "PAID" },
      _sum: { total: true },
    }),
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {[
        { label: "Music tracks", value: musicCount },
        { label: "Shop products", value: shopCount },
        { label: "Paid orders", value: orderCount },
        { label: "Revenue", value: formatPrice(revenue._sum.total || 0) },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-sm text-slate-400">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
      <div className="md:col-span-4 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
        <p className="text-white">Quick actions</p>
        <div className="mt-3 flex flex-wrap gap-3">
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
        </div>
      </div>
    </div>
  );
}
