import { prisma } from "@/lib/db";
import {
  MOCK_MUSIC,
  MOCK_SHOP,
  type MockDigitalProduct,
  type MockPhysicalProduct,
} from "@/lib/mock-data";

export type CatalogMusic = MockDigitalProduct;
export type CatalogShopItem = MockPhysicalProduct;

async function safe<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    console.error("[catalog] database error:", error);
    return null;
  }
}

export function mockCatalogEnabled() {
  return process.env.ENABLE_MOCK_CATALOG === "true";
}

export async function isDatabaseConnected() {
  const result = await safe(() => prisma.$queryRaw`SELECT 1`);
  return result !== null;
}

export async function getPublishedMusic(tag?: string): Promise<CatalogMusic[]> {
  const db = await safe(() =>
    prisma.digitalProduct.findMany({
      where: {
        status: "PUBLISHED",
        ...(tag ? { tags: { has: tag } } : {}),
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  );

  if (db !== null) {
    if (db.length === 0 && mockCatalogEnabled()) {
      return tag
        ? MOCK_MUSIC.filter((t) => t.tags.includes(tag))
        : MOCK_MUSIC;
    }
    return db as CatalogMusic[];
  }

  if (mockCatalogEnabled()) {
    return tag
      ? MOCK_MUSIC.filter((t) => t.tags.includes(tag))
      : MOCK_MUSIC;
  }

  return [];
}

export async function getPublishedMusicBySlug(
  slug: string,
): Promise<CatalogMusic | null> {
  const db = await safe(() =>
    prisma.digitalProduct.findUnique({ where: { slug } }),
  );

  if (db !== null) {
    if (db.status === "PUBLISHED") return db as CatalogMusic;
    return null;
  }

  if (mockCatalogEnabled()) {
    return MOCK_MUSIC.find((t) => t.slug === slug) ?? null;
  }

  return null;
}

export async function getPublishedShop(): Promise<CatalogShopItem[]> {
  const db = await safe(() =>
    prisma.physicalProduct.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  );

  if (db !== null) {
    if (db.length === 0 && mockCatalogEnabled()) return MOCK_SHOP;
    return db as CatalogShopItem[];
  }

  if (mockCatalogEnabled()) return MOCK_SHOP;
  return [];
}

export async function getPublishedShopBySlug(
  slug: string,
): Promise<CatalogShopItem | null> {
  const db = await safe(() =>
    prisma.physicalProduct.findUnique({ where: { slug } }),
  );

  if (db !== null) {
    if (db.status === "PUBLISHED") return db as CatalogShopItem;
    return null;
  }

  if (mockCatalogEnabled()) {
    return MOCK_SHOP.find((p) => p.slug === slug) ?? null;
  }

  return null;
}

export async function getFeaturedMusic(limit = 6) {
  const all = await getPublishedMusic();
  return all.slice(0, limit);
}

export async function getFeaturedShop(limit = 3) {
  const all = await getPublishedShop();
  return all.slice(0, limit);
}

export function isUsingMockCatalog(items: { id: string }[]) {
  return items.length > 0 && items.every((i) => i.id.startsWith("mock-"));
}

export async function getCatalogMode(): Promise<"database" | "mock" | "empty"> {
  const connected = await isDatabaseConnected();
  if (!connected) {
    return mockCatalogEnabled() ? "mock" : "empty";
  }

  const count = await safe(() =>
    prisma.digitalProduct.count({ where: { status: "PUBLISHED" } }),
  );

  if (count === null) return mockCatalogEnabled() ? "mock" : "empty";
  if (count > 0) return "database";
  return mockCatalogEnabled() ? "mock" : "empty";
}
