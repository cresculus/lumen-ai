import { execSync } from "node:child_process";

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit" });
}

async function main() {
  run("npx prisma db push");
  run("npx tsx prisma/seed.ts");
  console.log("Database ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
