import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export type StreamAccess = "full" | "preview";

/**
 * Listening is free on the site. Monetization is wellness shop, not track paywalls.
 */
export async function getStreamAccess(
  _userId: string | undefined,
  _digitalProductId: string,
  _role?: string,
): Promise<StreamAccess> {
  return "full";
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
  try {
    const sub = await prisma.subscription.findUnique({ where: { userId } });
    if (!sub || sub.status !== "active") return false;
    if (sub.currentPeriodEnd && sub.currentPeriodEnd < new Date()) return false;
    return true;
  } catch {
    return false;
  }
}
