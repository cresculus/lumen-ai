import { execSync } from "node:child_process";

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit" });
}

async function main() {
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
