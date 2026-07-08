/**
 * Canonical catalog seed — single source for prisma/seed.ts and docs.
 * audioKey may be a public HTTPS URL when R2 is not configured.
 */

export const SEED_DEMO_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const SEED_MUSIC = [
  {
    title: "Deep Sleep Ocean — 8 Hours",
    slug: "deep-sleep-ocean-8hours",
    description:
      "Under a slow tide of ocean hush, warm pads drift across eight uninterrupted hours. Human-curated and finished with care.",
    audioKey: SEED_DEMO_AUDIO_URL,
    coverKey: null,
    price: 499,
    tags: ["sleep", "deep sleep", "ambient"],
    youtubeUrl: "https://youtube.com",
    bpm: 60,
    duration: 28800,
    status: "PUBLISHED" as const,
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
    status: "PUBLISHED" as const,
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
    status: "PUBLISHED" as const,
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
    status: "PUBLISHED" as const,
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
    status: "PUBLISHED" as const,
    featured: true,
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
