import { auth } from "@/auth";
import { isMockId } from "@/lib/mock-data";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const demoCheckoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      quantity: z.number().int().min(1).max(10),
      price: z.number().int().min(0),
      type: z.enum(["DIGITAL", "PHYSICAL"]),
    }),
  ),
  total: z.number().int().min(0),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const body = demoCheckoutSchema.parse(await request.json());

  for (const item of body.items) {
    if (isMockId(item.productId)) {
      return NextResponse.json(
        {
          error:
            "Cart contains demo items — clear cart and add tracks from the live catalog.",
        },
        { status: 400 },
      );
    }
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      status: "PAID",
      total: body.total,
      items: {
        create: await Promise.all(
          body.items.map(async (item) => {
            if (item.type === "DIGITAL") {
              const product = await prisma.digitalProduct.findUnique({
                where: { id: item.productId, status: "PUBLISHED" },
              });
              if (!product) {
                throw new Error(`Track not found: ${item.title}`);
              }
              return {
                productType: "DIGITAL" as const,
                digitalProductId: product.id,
                title: product.title,
                quantity: item.quantity,
                priceAtPurchase: product.price,
              };
            }

            const product = await prisma.physicalProduct.findUnique({
              where: { id: item.productId, status: "PUBLISHED" },
            });
            if (!product) {
              throw new Error(`Product not found: ${item.title}`);
            }
            if (product.inventory < item.quantity) {
              throw new Error(`Insufficient inventory: ${product.title}`);
            }

            await prisma.physicalProduct.update({
              where: { id: product.id },
              data: { inventory: { decrement: item.quantity } },
            });

            return {
              productType: "PHYSICAL" as const,
              physicalProductId: product.id,
              title: product.title,
              quantity: item.quantity,
              priceAtPurchase: product.price,
            };
          }),
        ),
      },
    },
    include: { items: true },
  });

  const digitalItems = body.items.filter((i) => i.type === "DIGITAL");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  for (const item of digitalItems) {
    await prisma.download.upsert({
      where: {
        userId_digitalProductId: {
          userId: session.user.id,
          digitalProductId: item.productId,
        },
      },
      update: {
        expiresAt,
        maxDownloads: 5,
      },
      create: {
        userId: session.user.id,
        digitalProductId: item.productId,
        expiresAt,
        maxDownloads: 5,
      },
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Demo order placed — tracks added to your library",
    orderId: order.id,
  });
}
