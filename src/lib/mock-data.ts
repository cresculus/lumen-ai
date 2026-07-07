/**
 * Mock catalog used when PostgreSQL is empty or unavailable.
 * IDs are stable so cart, player, and checkout work in demo mode.
 */

export const MOCK_DEMO_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

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

export const MOCK_MUSIC: MockDigitalProduct[] = [
  {
    id: "mock-track-deep-sleep",
    title: "Deep Sleep Ocean — 8 Hours",
    slug: "deep-sleep-ocean-8hours",
    description:
      "AI-generated ambient ocean tones for deep, uninterrupted sleep. Perfect for your YouTube funnel.",
    audioKey: "mock",
    coverKey: null,
    price: 499,
    tags: ["sleep", "deep sleep", "ambient"],
    youtubeUrl: "https://youtube.com",
    bpm: 60,
    duration: 28800,
    status: "PUBLISHED",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-track-focus-flow",
    title: "Focus Flow — Study Mix",
    slug: "focus-flow-study",
    description: "Minimal piano and soft pads for concentration and deep work.",
    audioKey: "mock",
    coverKey: null,
    price: 399,
    tags: ["focus", "study", "ambient"],
    youtubeUrl: "https://youtube.com",
    bpm: 72,
    duration: 7200,
    status: "PUBLISHED",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-track-midnight-rain",
    title: "Midnight Rain on Window",
    slug: "midnight-rain",
    description: "Gentle rain soundscape blended with warm synth pads.",
    audioKey: "mock",
    coverKey: null,
    price: 299,
    tags: ["sleep", "ambient", "rain"],
    youtubeUrl: null,
    bpm: null,
    duration: 3600,
    status: "PUBLISHED",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-track-lumen-drift",
    title: "Lumen Drift — Theta Waves",
    slug: "lumen-drift-theta",
    description: "Theta-frequency undertones for meditation and pre-sleep calm.",
    audioKey: "mock",
    coverKey: null,
    price: 349,
    tags: ["sleep", "meditation", "focus"],
    youtubeUrl: null,
    bpm: 55,
    duration: 5400,
    status: "PUBLISHED",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const MOCK_SHOP: MockPhysicalProduct[] = [
  {
    id: "mock-shop-sleep-mask",
    title: "Silk Sleep Mask",
    slug: "silk-sleep-mask",
    description: "Light-blocking silk mask for deeper rest.",
    images: [],
    price: 2499,
    inventory: 50,
    category: "sleep-masks",
    weight: 4,
    status: "PUBLISHED",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-shop-night-cap",
    title: "Soft Night Cap",
    slug: "soft-night-cap",
    description: "Breathable cotton night cap for comfortable sleep.",
    images: [],
    price: 1999,
    inventory: 40,
    category: "night-caps",
    weight: 3,
    status: "PUBLISHED",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-shop-ear-plugs",
    title: "Foam Ear Plugs (10 pair)",
    slug: "foam-ear-plugs",
    description: "Noise-reducing ear plugs for focus and sleep.",
    images: [],
    price: 1299,
    inventory: 100,
    category: "ear-plugs",
    weight: 2,
    status: "PUBLISHED",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-shop-diffuser",
    title: "Ultrasonic Diffuser",
    slug: "ultrasonic-diffuser",
    description: "Quiet mist diffuser with soft ambient light — coming to full catalog.",
    images: [],
    price: 4499,
    inventory: 25,
    category: "electronics",
    weight: 16,
    status: "PUBLISHED",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
];

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
