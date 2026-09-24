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

export const SEED_MUSIC: SeedMusic[] = [
  {
    title: "Deep Sleep Ocean — 8 Hours",
    slug: "deep-sleep-ocean-8hours",
    description:
      "Under a slow tide of ocean hush, warm pads drift across eight uninterrupted hours. Human-curated and finished with care.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 499,
    tags: ["sleep", "deep sleep", "ambient"],
    youtubeUrl: null,
    bpm: 60,
    duration: 28800,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Focus Flow — Study Mix",
    slug: "focus-flow-study",
    description:
      "Minimal piano and soft pads woven for concentration and deep work — serene, never distracting.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 399,
    tags: ["focus", "study", "ambient"],
    youtubeUrl: null,
    bpm: 72,
    duration: 7200,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Midnight Rain on Window",
    slug: "midnight-rain",
    description:
      "Gentle rain against glass, blended with warm synth pads — a quiet room at the edge of night.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 299,
    tags: ["sleep", "ambient", "rain"],
    youtubeUrl: null,
    bpm: null,
    duration: 3600,
    status: "PUBLISHED",
    featured: false,
  },
  {
    title: "Lumen Drift — Theta Waves",
    slug: "lumen-drift-theta",
    description:
      "Theta-frequency undertones for meditation and pre-sleep calm — slow, luminous, hand-finished.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 349,
    tags: ["sleep", "meditation"],
    youtubeUrl: null,
    bpm: 55,
    duration: 5400,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Gravity Drift",
    slug: "gravity-drift",
    description:
      "Cinematic post-grunge ambient rock — warm analog pads, distant brushed-guitar haze, and slow-evolving grit-soft texture. No vocals.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 499,
    tags: ["focus", "cinematic", "ambient", "fantasy", "quiet kingdom"],
    youtubeUrl: "https://youtu.be/DgVomr2gb4I",
    bpm: 90,
    duration: 8040,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Late Night — Deep House Chill",
    slug: "late-night-deep-house-chill",
    description:
      "Warm bass, rolling drums, and no vocals — late work, night drives, and quiet hours when the city slows.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 449,
    tags: ["deep house", "fake dj", "late night"],
    youtubeUrl: "https://youtu.be/N4lPRQzaatc",
    bpm: 122,
    duration: 7200,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Late Train Drip",
    slug: "late-train-drip",
    description:
      "Soft deep house for work sessions and night travel — city blur through a rainy window, pulse steady, no vocals.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 399,
    tags: ["deep house", "fake dj", "travel", "late night"],
    youtubeUrl: null,
    bpm: 120,
    duration: 7200,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Late Set Drift",
    slug: "late-set-drift",
    description:
      "After-hours deep house for coffee and work chill — booth glow energy, continuous groove, instrumental only.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 449,
    tags: ["deep house", "fake dj", "chill", "late night"],
    youtubeUrl: null,
    bpm: 123,
    duration: 7200,
    status: "PUBLISHED",
    featured: false,
  },
  {
    title: "Dark Strings — Chamber Night",
    slug: "dark-strings-chamber-night",
    description:
      "Low cello and violin in grey-gold light — cinematic chamber hush for deep rest, not clinical sleep pads.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 499,
    tags: ["chamber", "strings", "cello", "focus", "fantasy", "quiet kingdom"],
    youtubeUrl: null,
    bpm: 58,
    duration: 10800,
    status: "PUBLISHED",
    featured: true,
  },
  {
    title: "Grey Gold Room",
    slug: "grey-gold-room",
    description:
      "String quartet fog in an empty hall — soft god rays, floating dust, and long-form stillness.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 399,
    tags: ["chamber", "strings", "neoclassical", "focus", "fantasy"],
    youtubeUrl: null,
    bpm: 62,
    duration: 7200,
    status: "PUBLISHED",
    featured: false,
  },
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
  "focus",
  "sleep",
  "fantasy",
  "late night",
  "chamber",
  "ambient",
  "study",
] as const;
