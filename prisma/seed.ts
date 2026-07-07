import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const shopProducts = [
    {
      title: "Silk Sleep Mask",
      slug: "silk-sleep-mask",
      description: "Light-blocking sleep mask for deeper rest.",
      images: [] as string[],
      price: 2499,
      inventory: 50,
      category: "sleep-masks",
      status: "PUBLISHED" as const,
      featured: true,
    },
    {
      title: "Soft Night Cap",
      slug: "soft-night-cap",
      description: "Breathable night cap for comfortable sleep.",
      images: [],
      price: 1999,
      inventory: 40,
      category: "night-caps",
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
      status: "PUBLISHED" as const,
      featured: false,
    },
  ];

  const musicTracks = [
    {
      title: "Deep Sleep Ocean — 8 Hours",
      slug: "deep-sleep-ocean-8hours",
      description: "AI-generated ambient ocean tones for deep sleep.",
      audioKey: "seed/placeholder.mp3",
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
      description: "Minimal tones for concentration.",
      audioKey: "seed/placeholder.mp3",
      coverKey: null,
      price: 399,
      tags: ["focus", "study"],
      youtubeUrl: null,
      bpm: 72,
      duration: 7200,
      status: "PUBLISHED" as const,
      featured: true,
    },
  ];

  for (const product of shopProducts) {
    await prisma.physicalProduct.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  for (const track of musicTracks) {
    await prisma.digitalProduct.upsert({
      where: { slug: track.slug },
      update: track,
      create: track,
    });
  }

  console.log("Seed complete — shop + music");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
