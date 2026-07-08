import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.digitalProduct.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const audio = formData.get("audio") as File | null;
  const cover = formData.get("cover") as File | null;
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Math.round(Number(formData.get("price") || 0) * 100);
  const tags = String(formData.get("tags") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const youtubeUrl = String(formData.get("youtubeUrl") || "").trim() || null;
  const bpm = formData.get("bpm") ? Number(formData.get("bpm")) : null;
  const duration = formData.get("duration")
    ? Number(formData.get("duration"))
    : null;
  const status = String(formData.get("status") || "DRAFT");
  const featured = formData.get("featured") === "true";

  if (!audio || !title || !price) {
    return NextResponse.json(
      { error: "Title, price, and audio file are required" },
      { status: 400 },
    );
  }

  const slugBase = slugify(title);
  let slug = slugBase;
  let counter = 1;
  while (await prisma.digitalProduct.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${counter++}`;
  }

  const audioBuffer = Buffer.from(await audio.arrayBuffer());
  const audioKey = await saveUploadedFile(
    `music/${slug}/${Date.now()}-${audio.name}`,
    audioBuffer,
    audio.type || "audio/mpeg",
  );

  let coverKey: string | null = null;
  if (cover) {
    const coverBuffer = Buffer.from(await cover.arrayBuffer());
    coverKey = await saveUploadedFile(
      `music/${slug}/cover-${Date.now()}-${cover.name}`,
      coverBuffer,
      cover.type || "image/jpeg",
    );
  }

  const product = await prisma.digitalProduct.create({
    data: {
      title,
      slug,
      description: description || null,
      audioKey,
      coverKey,
      price,
      tags,
      youtubeUrl,
      bpm,
      duration,
      status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured,
    },
  });

  return NextResponse.json({ product });
}
