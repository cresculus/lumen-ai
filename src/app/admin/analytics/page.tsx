import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminAnalyticsPage() {
  const [events, youtubeOrders, topProducts] = await Promise.all([
    prisma.analyticsEvent.groupBy({
      by: ["utmCampaign"],
      where: { utmSource: "youtube" },
      _count: { _all: true },
      orderBy: { _count: { utmCampaign: "desc" } },
      take: 10,
    }),
    prisma.order.groupBy({
      by: ["utmCampaign"],
      where: { utmSource: "youtube", status: "PAID" },
      _count: { _all: true },
      _sum: { total: true },
    }),
    prisma.orderItem.groupBy({
      by: ["title"],
      _count: { _all: true },
      orderBy: { _count: { title: "desc" } },
      take: 10,
    }),
  ]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-medium text-white">YouTube traffic</h2>
        <div className="space-y-2">
          {events.length === 0 ? (
            <p className="text-slate-400">No UTM events yet.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.utmCampaign || "unknown"}
                className="flex justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <span className="text-slate-300">{event.utmCampaign || "unknown"}</span>
                <span className="text-white">{event._count._all} views</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium text-white">YouTube conversions</h2>
        <div className="space-y-2">
          {youtubeOrders.length === 0 ? (
            <p className="text-slate-400">No YouTube-attributed orders yet.</p>
          ) : (
            youtubeOrders.map((row) => (
              <div
                key={row.utmCampaign || "unknown"}
                className="flex justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <span className="text-slate-300">{row.utmCampaign || "unknown"}</span>
                <span className="text-white">
                  {row._count._all} orders · {formatPrice(row._sum.total || 0)}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium text-white">Top products</h2>
        <div className="space-y-2">
          {topProducts.map((product) => (
            <div
              key={product.title}
              className="flex justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span className="text-slate-300">{product.title}</span>
              <span className="text-white">{product._count._all} sold</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
