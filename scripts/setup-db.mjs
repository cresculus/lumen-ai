import { execSync } from "node:child_process";

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit" });
}

async function main() {
  // Wallpapers and the public site must boot even when Postgres is not linked.
  // Railway only injects DATABASE_URL after a Postgres plugin is attached.
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL is not set. Skipping prisma db push.");
    return;
  }

  // Sync schema only (Favorite model, etc). Do NOT seed sample products —
  // catalog falls back to mock data when the DB catalog is empty, or use Admin → Music to upload real tracks.
  run("npx prisma db push");

  if (process.env.RUN_DB_SEED === "true") {
    run("npx tsx prisma/seed.ts");
    console.log("Database seeded.");
  } else {
    console.log("Database schema synced (seed skipped).");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
