import { prisma } from "@/lib/db";
import {
  MOCK_ADMIN_STATS,
  MOCK_MUSIC,
  MOCK_RECENT_ORDERS,
  MOCK_SHOP,
} from "@/lib/mock-data";

export async function getAdminStats() {
  try {
    const [musicCount, shopCount, orderCount, revenue, recentOrders] =
      await Promise.all([
        prisma.digitalProduct.count(),
        prisma.physicalProduct.count(),
        prisma.order.count({ where: { status: "PAID" } }),
        prisma.order.aggregate({
          where: { status: "PAID" },
          _sum: { total: true },
        }),
        prisma.order.findMany({
          where: { status: "PAID" },
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { user: true },
        }),
      ]);

    const usingMock = musicCount === 0 && shopCount === 0;

    return {
      usingMock,
      musicCount: musicCount || MOCK_ADMIN_STATS.musicCount,
      shopCount: shopCount || MOCK_ADMIN_STATS.shopCount,
      orderCount: orderCount || MOCK_ADMIN_STATS.orderCount,
      revenue: revenue._sum.total || MOCK_ADMIN_STATS.revenue,
      recentOrders:
        recentOrders.length > 0
          ? recentOrders.map((o) => ({
              email: o.user.email || "unknown",
              total: o.total,
            }))
          : MOCK_RECENT_ORDERS,
      musicCatalog: musicCount
        ? await prisma.digitalProduct.findMany({ orderBy: { createdAt: "desc" } })
        : MOCK_MUSIC,
      shopCatalog: shopCount
        ? await prisma.physicalProduct.findMany({ orderBy: { createdAt: "desc" } })
        : MOCK_SHOP,
    };
  } catch {
    return {
      usingMock: true,
      musicCount: MOCK_ADMIN_STATS.musicCount,
      shopCount: MOCK_ADMIN_STATS.shopCount,
      orderCount: MOCK_ADMIN_STATS.orderCount,
      revenue: MOCK_ADMIN_STATS.revenue,
      recentOrders: MOCK_RECENT_ORDERS,
      musicCatalog: MOCK_MUSIC,
      shopCatalog: MOCK_SHOP,
    };
  }
}
