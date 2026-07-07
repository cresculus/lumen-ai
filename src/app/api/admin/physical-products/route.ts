import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { uploadToR2 } from "@/lib/r2";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.physicalProduct.findMany({
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
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Math.round(Number(formData.get("price") || 0) * 100);
  const inventory = Number(formData.get("inventory") || 0);
  const category = String(formData.get("category") || "sleep-accessories").trim();
  const weight = formData.get("weight") ? Number(formData.get("weight")) : null;
  const status = String(formData.get("status") || "DRAFT");
  const featured = formData.get("featured") === "true";
  const image = formData.get("image") as File | null;

  if (!title || !price) {
    return NextResponse.json(
      { error: "Title and price are required" },
      { status: 400 },
    );
  }

  const slugBase = slugify(title);
  let slug = slugBase;
  let counter = 1;
  while (await prisma.physicalProduct.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${counter++}`;
  }

  const images: string[] = [];
  if (image) {
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imageKey = `shop/${slug}/${Date.now()}-${image.name}`;
    await uploadToR2(imageKey, imageBuffer, image.type || "image/jpeg");
    images.push(imageKey);
  }

  const product = await prisma.physicalProduct.create({
    data: {
      title,
      slug,
      description: description || null,
      images,
      price,
      inventory,
      category,
      weight,
      status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured,
    },
  });

  return NextResponse.json({ product });
}
