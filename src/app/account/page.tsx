import { auth } from "@/auth";
import { AccountDashboard } from "@/components/account-dashboard";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [downloads, orders, subscription] = await Promise.all([
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
      subscription={subscription}
      downloads={downloads}
      orders={orders}
    />
  );
}
