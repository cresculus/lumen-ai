import { getCatalogMode } from "@/lib/catalog";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  let database = false;
  let tracks = 0;

  try {
    await prisma.$queryRaw`SELECT 1`;
    database = true;
    tracks = await prisma.digitalProduct.count({
      where: { status: "PUBLISHED" },
    });
  } catch {
    database = false;
  }

  const catalog = await getCatalogMode();

  return NextResponse.json({
    status: "ok",
    database,
    catalog,
    publishedTracks: tracks,
  });
}
