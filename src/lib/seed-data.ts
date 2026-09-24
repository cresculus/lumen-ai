/**
 * Canonical catalog seed — single source for prisma/seed.ts and mock-data.
 * audioKey may be a public HTTPS URL when R2 is not configured.
 */

export const SEED_DEMO_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export type SeedMusic = {
  title: string;
  slug: string;
  description: string;
  audioKey: string;
  coverKey: string | null;
  price: number;
  tags: string[];
  youtubeUrl: string | null;
  bpm: number | null;
  duration: number | null;
  status: "PUBLISHED";
  featured: boolean;
};

const PREVIEW =
  "High-quality room recording. This page plays a short preview. The full video is free on YouTube. This site has no ads.";

function room(entry: {
  title: string;
  slug: string;
  youtubeId: string;
  tags: string[];
  cover?: string;
  featured?: boolean;
}): SeedMusic {
  return {
    title: entry.title,
    slug: entry.slug,
    description: PREVIEW,
    audioKey: `/previews/${entry.slug}.m4a`,
    coverKey: entry.cover ?? null,
    price: 0,
    tags: entry.tags,
    youtubeUrl: `https://www.youtube.com/watch?v=${entry.youtubeId}`,
    bpm: null,
    duration: 70,
    status: "PUBLISHED",
    featured: entry.featured ?? false,
  };
}

export const SEED_MUSIC: SeedMusic[] = [
  room({ title: "Tin Roof", slug: "tin-roof", youtubeId: "dkGIe9hW5TA", tags: ["rooms", "sleep"], cover: "/wallpapers/preview/tin-roof.jpg", featured: true }),
  room({ title: "The Jazz Club", slug: "jazz-club", youtubeId: "Bb9Cghtntog", tags: ["rooms", "late night"], cover: "/wallpapers/preview/jazz-club.jpg", featured: true }),
  room({ title: "The Cupola", slug: "cupola", youtubeId: "NVNXA8gG6jA", tags: ["space", "focus"], cover: "/wallpapers/preview/cupola.jpg", featured: true }),
  room({ title: "Europa", slug: "europa", youtubeId: "KLjgcyj3Nzw", tags: ["space"], cover: "/wallpapers/preview/europa.jpg" }),
  room({ title: "Mars", slug: "mars", youtubeId: "ZpNVQh-da0M", tags: ["space"], cover: "/wallpapers/preview/mars.jpg" }),
  room({ title: "Mission Control", slug: "mission-control", youtubeId: "qzQd_lgV4xw", tags: ["space", "focus"], cover: "/wallpapers/preview/mission-control.jpg" }),
  room({ title: "Saturn", slug: "saturn", youtubeId: "ckPLN1yqcAA", tags: ["space"], cover: "/wallpapers/preview/saturn.jpg" }),
  room({ title: "The Moon", slug: "moon", youtubeId: "JGIbcV_Avwg", tags: ["space"], cover: "/wallpapers/preview/moon.jpg" }),
  room({ title: "The Sun", slug: "the-sun", youtubeId: "6Ys05gkE7MU", tags: ["space"], cover: "/wallpapers/preview/the-sun.jpg" }),
  room({ title: "The Void", slug: "the-void", youtubeId: "618_5ICuaEU", tags: ["space"], cover: "/wallpapers/preview/the-void.jpg" }),
  room({ title: "Voyager", slug: "voyager", youtubeId: "ijGfb_rB2vg", tags: ["space"], cover: "/wallpapers/preview/voyager.jpg" }),
  room({ title: "Buenos Aires", slug: "buenos-aires", youtubeId: "RpeWHQI1ikA", tags: ["tour", "late night"] }),
  room({ title: "Florence", slug: "florence", youtubeId: "LX_PoIugdoU", tags: ["tour"] }),
  room({ title: "Istanbul", slug: "istanbul", youtubeId: "_xRFlKpi9_w", tags: ["tour"] }),
  room({ title: "Kyoto", slug: "kyoto", youtubeId: "7ZgZRrfU18I", tags: ["tour", "sleep"] }),
  room({ title: "Lake Como", slug: "lake-como", youtubeId: "QpnG0pOU-Gs", tags: ["tour", "sleep"] }),
  room({ title: "Lisbon", slug: "lisbon", youtubeId: "yw9SCHRLqx0", tags: ["tour"] }),
  room({ title: "Miami", slug: "miami", youtubeId: "MG7zZl7qwFs", tags: ["tour", "late night"] }),
  room({ title: "Tokyo", slug: "tokyo", youtubeId: "chgeO60ThVQ", tags: ["tour", "late night"] }),
];

export const SEED_SHOP = [
  {
    title: "Night Mask",
    slug: "silk-sleep-mask",
    description:
      "Contoured mulberry silk sleep mask, specified at 22 momme. Padded cups leave room for lashes. A silk strap. Made to wear with a sleep room.",
    images: ["/shop/silk-sleep-mask.jpg"],
    price: 0,
    inventory: 0,
    category: "22 momme silk",
    weight: 4,
    status: "PUBLISHED" as const,
    featured: true,
  },
  {
    title: "Pillowcase",
    slug: "silk-pillowcase",
    description:
      "Queen pillowcase in 22 momme mulberry silk with an envelope closure. The weight serious silk makers use: denser than 19 momme, smoother than cotton.",
    images: ["/shop/silk-pillowcase.jpg"],
    price: 0,
    inventory: 0,
    category: "22 momme silk",
    weight: 8,
    status: "PUBLISHED" as const,
    featured: true,
  },
  {
    title: "Sleep Cap",
    slug: "silk-sleep-cap",
    description:
      "A gathered mulberry silk bonnet, 22 momme, with a silk tie. For long nights when the room stays on.",
    images: ["/shop/silk-sleep-cap.jpg"],
    price: 0,
    inventory: 0,
    category: "22 momme silk",
    weight: 3,
    status: "PUBLISHED" as const,
    featured: true,
  },
  {
    title: "Eye Pillow",
    slug: "silk-eye-pillow",
    description:
      "A small flax-filled pillow in a mulberry silk cover. Rest it over the eyes while a room plays. Unscented.",
    images: ["/shop/silk-eye-pillow.jpg"],
    price: 0,
    inventory: 0,
    category: "rest",
    weight: 6,
    status: "PUBLISHED" as const,
    featured: false,
  },
];

export const SEED_DEMO_USERS = [
  {
    email: "brandon.sardelli@gmail.com",
    name: "Brandon",
    role: "ADMIN" as const,
  },
  {
    email: "guest@lumenaimusic.com",
    name: "Guest",
    role: "CUSTOMER" as const,
  },
];

/** Catalog room pillars — match YouTube playlist shelves */
export const MUSIC_PILLARS = [
  {
    id: "focus",
    label: "Focus Rooms",
    blurb: "Deep work, study, and calm concentration",
    tags: ["focus", "study", "chamber", "strings"],
  },
  {
    id: "sleep",
    label: "Sleep Rooms",
    blurb: "Overnight hush for rest and insomnia nights",
    tags: ["sleep", "deep sleep"],
  },
  {
    id: "quiet-kingdom",
    label: "Quiet Kingdom",
    blurb: "Fantasy story skins for focus and soft resets",
    tags: ["fantasy", "quiet kingdom", "medieval"],
  },
  {
    id: "late-night",
    label: "Late Night Rooms",
    blurb: "Coffee hours, quiet drives, and wind-down",
    tags: ["late night", "deep house", "fake dj"],
  },
] as const;

export const MUSIC_MOOD_FILTERS = [
  "all",
  "rooms",
  "space",
  "tour",
  "sleep",
  "focus",
  "late night",
] as const;
