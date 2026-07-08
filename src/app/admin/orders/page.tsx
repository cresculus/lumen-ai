import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true, user: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h2 className="mb-4 text-xl font-medium text-white">Orders</h2>
      <div className="space-y-3">
        {orders.length === 0 ? (
          <p className="text-slate-400">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-white">{order.user.email}</p>
                <p className="text-lumen-gold-light">{formatPrice(order.total)}</p>
              </div>
              <p className="text-sm text-slate-400">{order.status}</p>
              <ul className="mt-2 text-sm text-slate-300">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
              {order.utmCampaign && (
                <p className="mt-2 text-xs text-slate-500">
                  YouTube campaign: {order.utmCampaign}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
