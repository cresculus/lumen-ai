import { auth } from "@/auth";
import { AccountDashboard } from "@/components/account-dashboard";
import { getPublishedShop } from "@/lib/catalog";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = { title: "Library" };

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { tab } = await searchParams;
  const userId = session.user.id;
  const isOfflineDemo = userId === "demo-guest";

  let downloads: Parameters<typeof AccountDashboard>[0]["downloads"] = [];
  let orders: Parameters<typeof AccountDashboard>[0]["orders"] = [];
  let subscription: Parameters<typeof AccountDashboard>[0]["subscription"] = null;

  if (!isOfflineDemo) {
    try {
      const [d, o, s] = await Promise.all([
        prisma.download.findMany({
          where: { userId },
          include: { digitalProduct: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.order.findMany({
          where: { userId },
          include: { items: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.subscription.findUnique({
          where: { userId },
        }),
      ]);
      downloads = d;
      orders = o;
      subscription = s;
    } catch (error) {
      console.warn("[account] Failed to load library data", error);
    }
  }

  const shopProducts = await getPublishedShop();

  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20 text-slate-400">Loading…</div>}>
      <AccountDashboard
        email={session.user.email || ""}
        userId={userId}
        subscription={subscription}
        downloads={downloads}
        orders={orders}
        shopProducts={shopProducts}
        initialTab={tab === "shop" ? "shop" : "library"}
      />
    </Suspense>
  );
}
