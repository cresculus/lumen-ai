import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = [
    {
      title: "Silk Sleep Mask",
      slug: "silk-sleep-mask",
      description: "Light-blocking sleep mask for deeper rest.",
      images: [],
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

  for (const product of products) {
    await prisma.physicalProduct.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
