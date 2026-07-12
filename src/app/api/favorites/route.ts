import { auth } from "@/auth";
import { isMockId } from "@/lib/mock-data";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  productId: z.string().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ favorites: [] });
  }

  if (session.user.id.startsWith("demo-")) {
    return NextResponse.json({ favorites: [], local: true });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      select: { digitalProductId: true },
    });
    return NextResponse.json({
      favorites: favorites.map((f) => f.digitalProductId),
    });
  } catch (error) {
    console.warn("[favorites] list failed", error);
    return NextResponse.json({ favorites: [], local: true });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const { productId } = bodySchema.parse(await request.json());

  if (session.user.id.startsWith("demo-") || isMockId(productId)) {
    return NextResponse.json({
      ok: true,
      local: true,
      productId,
      message: "Use client favorites for demo catalog",
    });
  }

  try {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_digitalProductId: {
          userId: session.user.id,
          digitalProductId: productId,
        },
      },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ ok: true, favorited: false, productId });
    }

    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        digitalProductId: productId,
      },
    });
    return NextResponse.json({ ok: true, favorited: true, productId });
  } catch (error) {
    console.error("[favorites]", error);
    return NextResponse.json(
      { error: "Could not update favorite" },
      { status: 500 },
    );
  }
}
