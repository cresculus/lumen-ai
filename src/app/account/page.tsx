import { auth } from "@/auth";
import { AccountDashboard } from "@/components/account-dashboard";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const isDemo = session.user.id.startsWith("mock-");

  const [downloads, orders, subscription] = isDemo
    ? [[], [], null]
    : await Promise.all([
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
        prisma.subscription.findUnique({
          where: { userId: session.user.id },
        }),
      ]);

  return (
    <AccountDashboard
      email={session.user.email || ""}
      userId={session.user.id}
      subscription={subscription}
      downloads={downloads}
      orders={orders}
    />
  );
}
