import { prisma } from "@/lib/db";
import {
  MOCK_MUSIC,
  MOCK_SHOP,
  type MockDigitalProduct,
  type MockPhysicalProduct,
} from "@/lib/mock-data";
import { MUSIC_PILLARS } from "@/lib/seed-data";

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
  // Default on for empty/local demos; set ENABLE_MOCK_CATALOG=false in production
  // once the live catalog is seeded.
  return process.env.ENABLE_MOCK_CATALOG !== "false";
}

export async function isDatabaseConnected() {
  const result = await safe(() => prisma.$queryRaw`SELECT 1`);
  return result !== null;
}

function filterMusic(
  tracks: CatalogMusic[],
  options?: { tag?: string; q?: string },
) {
  let result = tracks;
  if (options?.tag) {
    result = result.filter((t) => t.tags.includes(options.tag!));
  }
  if (options?.q) {
    const q = options.q.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }
  return result;
}

/** Prefer DB rows; fill gaps from mock so new Fake DJ / chamber titles show without re-seeding. */
function mergeCatalog(
  dbTracks: CatalogMusic[],
  options?: { tag?: string; q?: string },
) {
  if (!mockCatalogEnabled()) {
    return filterMusic(dbTracks, options);
  }
  const bySlug = new Map(dbTracks.map((t) => [t.slug, t]));
  for (const mock of MOCK_MUSIC) {
    if (!bySlug.has(mock.slug)) bySlug.set(mock.slug, mock);
  }
  const merged = [...bySlug.values()].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  return filterMusic(merged, options);
}

export async function getPublishedMusic(
  tagOrOptions?: string | { tag?: string; q?: string },
): Promise<CatalogMusic[]> {
  const normalized =
    typeof tagOrOptions === "string"
      ? { tag: tagOrOptions }
      : { tag: tagOrOptions?.tag, q: tagOrOptions?.q };

  const db = await safe(() =>
    prisma.digitalProduct.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  );

  if (db !== null) {
    if (db.length === 0) {
      return mockCatalogEnabled()
        ? filterMusic(MOCK_MUSIC, normalized)
        : [];
    }
    return mergeCatalog(db as CatalogMusic[], normalized);
  }

  if (mockCatalogEnabled()) {
    return filterMusic(MOCK_MUSIC, normalized);
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
    // fall through to mock if unpublished / missing live file
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
  const featured = all.filter((t) => t.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getFeaturedShop(limit = 3) {
  const all = await getPublishedShop();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getMusicByPillar(pillarId: string, limit = 3) {
  const pillar = MUSIC_PILLARS.find((p) => p.id === pillarId);
  if (!pillar) return [];
  const all = await getPublishedMusic();
  return all
    .filter((t) => pillar.tags.some((tag) => t.tags.includes(tag)))
    .slice(0, limit);
}

export async function getChannelTracks(limit = 4) {
  const all = await getPublishedMusic();
  return all.filter((t) => Boolean(t.youtubeUrl)).slice(0, limit);
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
