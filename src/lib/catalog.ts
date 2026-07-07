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
  } catch {
    return null;
  }
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

  if (db && db.length > 0) return db as CatalogMusic[];

  return tag
    ? MOCK_MUSIC.filter((t) => t.tags.includes(tag))
    : MOCK_MUSIC;
}

export async function getPublishedMusicBySlug(
  slug: string,
): Promise<CatalogMusic | null> {
  const db = await safe(() =>
    prisma.digitalProduct.findUnique({ where: { slug } }),
  );

  if (db && db.status === "PUBLISHED") return db as CatalogMusic;

  return MOCK_MUSIC.find((t) => t.slug === slug) ?? null;
}

export async function getPublishedShop(): Promise<CatalogShopItem[]> {
  const db = await safe(() =>
    prisma.physicalProduct.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  );

  if (db && db.length > 0) return db as CatalogShopItem[];
  return MOCK_SHOP;
}

export async function getPublishedShopBySlug(
  slug: string,
): Promise<CatalogShopItem | null> {
  const db = await safe(() =>
    prisma.physicalProduct.findUnique({ where: { slug } }),
  );

  if (db && db.status === "PUBLISHED") return db as CatalogShopItem;

  return MOCK_SHOP.find((p) => p.slug === slug) ?? null;
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
