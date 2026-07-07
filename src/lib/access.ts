import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export type StreamAccess = "full" | "preview";

export async function getStreamAccess(
  userId: string | undefined,
  digitalProductId: string,
  role?: string,
): Promise<StreamAccess> {
  if (role === "ADMIN") return "full";

  if (userId) {
    const [subscription, download] = await Promise.all([
      prisma.subscription.findUnique({ where: { userId } }),
      prisma.download.findUnique({
        where: {
          userId_digitalProductId: { userId, digitalProductId },
        },
      }),
    ]);

    if (subscription?.status === "active") {
      const periodValid =
        !subscription.currentPeriodEnd ||
        subscription.currentPeriodEnd > new Date();
      if (periodValid) return "full";
    }

    if (download && download.expiresAt > new Date()) return "full";
  }

  return "preview";
}

export async function getSessionStreamAccess(digitalProductId: string) {
  const session = await auth();
  const access = await getStreamAccess(
    session?.user?.id,
    digitalProductId,
    session?.user?.role,
  );
  return { session, access };
}

export async function hasActiveSubscription(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub || sub.status !== "active") return false;
  if (sub.currentPeriodEnd && sub.currentPeriodEnd < new Date()) return false;
  return true;
}
