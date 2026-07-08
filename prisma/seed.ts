import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import {
  SEED_DEMO_USERS,
  SEED_MUSIC,
  SEED_SHOP,
} from "../src/lib/seed-data";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const user of SEED_DEMO_USERS) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, role: user.role },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  }

  for (const product of SEED_SHOP) {
    await prisma.physicalProduct.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  for (const track of SEED_MUSIC) {
    await prisma.digitalProduct.upsert({
      where: { slug: track.slug },
      update: {},
      create: track,
    });
  }

  console.log(
    `Seed complete — ${SEED_MUSIC.length} tracks, ${SEED_SHOP.length} shop items, ${SEED_DEMO_USERS.length} demo users`,
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
