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
    tags: ["sleep", "meditation", "focus"],
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
    tags: ["ambient", "focus", "cinematic"],
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
    tags: ["deep house", "fake dj", "late night", "focus"],
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
    tags: ["deep house", "fake dj", "travel", "focus"],
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
    tags: ["deep house", "fake dj", "work", "chill"],
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
    tags: ["chamber", "strings", "cello", "sleep"],
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
    tags: ["chamber", "strings", "neoclassical", "sleep"],
    youtubeUrl: null,
    bpm: 62,
    duration: 7200,
    status: "PUBLISHED",
    featured: false,
  },
];

export const SEED_SHOP = [
  {
    title: "Silk Sleep Mask",
    slug: "silk-sleep-mask",
    description: "Light-blocking silk mask for deeper rest.",
    images: [] as string[],
    price: 2499,
    inventory: 50,
    category: "sleep-masks",
    weight: 4,
    status: "PUBLISHED" as const,
    featured: true,
  },
  {
    title: "Soft Night Cap",
    slug: "soft-night-cap",
    description: "Breathable cotton night cap for comfortable sleep.",
    images: [],
    price: 1999,
    inventory: 40,
    category: "night-caps",
    weight: 3,
    status: "PUBLISHED" as const,
    featured: true,
  },
  {
    title: "Foam Ear Plugs (10 pair)",
    slug: "foam-ear-plugs",
    description: "Noise-reducing ear plugs for focus and sleep.",
    images: [],
    price: 1299,
    inventory: 100,
    category: "ear-plugs",
    weight: 2,
    status: "PUBLISHED" as const,
    featured: false,
  },
  {
    title: "Ultrasonic Diffuser",
    slug: "ultrasonic-diffuser",
    description:
      "Quiet mist diffuser with soft ambient light — objects for rest that match the sonic world.",
    images: [],
    price: 4499,
    inventory: 25,
    category: "electronics",
    weight: 16,
    status: "PUBLISHED" as const,
    featured: false,
  },
];

export const SEED_DEMO_USERS = [
  {
    email: "admin@lumenaimusic.com",
    name: "Demo Admin",
    role: "ADMIN" as const,
  },
  {
    email: "guest@lumenaimusic.com",
    name: "Demo Guest",
    role: "CUSTOMER" as const,
  },
];

/** Homepage / catalog mood pillars */
export const MUSIC_PILLARS = [
  {
    id: "sleep",
    label: "Deep Sleep",
    blurb: "Long-form hush for rest and night wind-down",
    tags: ["sleep", "deep sleep"],
  },
  {
    id: "focus",
    label: "Focus & Study",
    blurb: "Quiet concentration without distraction",
    tags: ["focus", "study"],
  },
  {
    id: "deep-house",
    label: "Fake DJ",
    blurb: "Soft deep house for late work and travel",
    tags: ["deep house", "fake dj"],
  },
  {
    id: "chamber",
    label: "Chamber & Strings",
    blurb: "Cello, violin, and grey-gold halls",
    tags: ["chamber", "strings", "cello"],
  },
] as const;

export const MUSIC_MOOD_FILTERS = [
  "all",
  "sleep",
  "focus",
  "deep house",
  "chamber",
  "strings",
  "ambient",
  "study",
  "cinematic",
] as const;
