import { auth } from "@/auth";
import { AccountDashboard } from "@/components/account-dashboard";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Library" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

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

  return (
    <AccountDashboard
      email={session.user.email || ""}
      userId={userId}
      subscription={subscription}
      downloads={downloads}
      orders={orders}
    />
  );
}
