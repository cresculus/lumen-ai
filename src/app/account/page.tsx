import { auth } from "@/auth";
import { DownloadButton } from "@/components/download-button";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [downloads, orders] = await Promise.all([
    prisma.download.findMany({
      where: { userId: session.user.id },
      include: { digitalProduct: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Your account</h1>
      <p className="mt-2 text-slate-400">Signed in as {session.user.email}</p>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-white">Music library</h2>
        <div className="mt-4 space-y-3">
          {downloads.length === 0 ? (
            <p className="text-slate-400">No purchased music yet.</p>
          ) : (
            downloads.map((download) => (
              <div
                key={download.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="text-white">{download.digitalProduct.title}</p>
                  <p className="text-sm text-slate-400">
                    Downloads: {download.downloadCount}/{download.maxDownloads}
                  </p>
                </div>
                <DownloadButton
                  productId={download.digitalProductId}
                  title={download.digitalProduct.title}
                />
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
                    From YouTube: {order.utmCampaign}
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
