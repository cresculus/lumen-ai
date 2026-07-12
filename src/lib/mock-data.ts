/**
 * Mock catalog used when PostgreSQL is empty or unavailable.
 * Built from seed-data so demo and seeded DB stay aligned.
 */

import {
  SEED_DEMO_AUDIO_URL,
  SEED_MUSIC,
  SEED_SHOP,
} from "@/lib/seed-data";

export const MOCK_DEMO_AUDIO_URL = SEED_DEMO_AUDIO_URL;

export type MockDigitalProduct = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  audioKey: string;
  coverKey: string | null;
  price: number;
  tags: string[];
  youtubeUrl: string | null;
  bpm: number | null;
  duration: number | null;
  status: "PUBLISHED";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type MockPhysicalProduct = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  images: string[];
  price: number;
  inventory: number;
  category: string;
  weight: number | null;
  status: "PUBLISHED";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const now = new Date();

export const MOCK_MUSIC: MockDigitalProduct[] = SEED_MUSIC.map((track) => ({
  id: `mock-track-${track.slug}`,
  title: track.title,
  slug: track.slug,
  description: track.description,
  audioKey: "mock",
  coverKey: track.coverKey,
  price: track.price,
  tags: track.tags,
  youtubeUrl: track.youtubeUrl,
  bpm: track.bpm,
  duration: track.duration,
  status: "PUBLISHED" as const,
  featured: track.featured,
  createdAt: now,
  updatedAt: now,
}));

export const MOCK_SHOP: MockPhysicalProduct[] = SEED_SHOP.map((product) => ({
  id: `mock-shop-${product.slug}`,
  title: product.title,
  slug: product.slug,
  description: product.description,
  images: product.images,
  price: product.price,
  inventory: product.inventory,
  category: product.category,
  weight: product.weight,
  status: "PUBLISHED" as const,
  featured: product.featured,
  createdAt: now,
  updatedAt: now,
}));

export const MOCK_ADMIN_STATS = {
  musicCount: MOCK_MUSIC.length,
  shopCount: MOCK_SHOP.length,
  orderCount: 12,
  revenue: 28447,
};

export const MOCK_RECENT_ORDERS = [
  { email: "listener@gmail.com", total: 499 },
  { email: "youtube.fan@outlook.com", total: 3798 },
  { email: "guest@lumenaimusic.com", total: 1299 },
];

export function isMockId(id: string) {
  return id.startsWith("mock-");
}

export function findMockTrack(idOrSlug: string) {
  return MOCK_MUSIC.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
}

export function findMockShopItem(idOrSlug: string) {
  return MOCK_SHOP.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function isMockAuthEnabled() {
  return process.env.ENABLE_MOCK_AUTH !== "false";
}
