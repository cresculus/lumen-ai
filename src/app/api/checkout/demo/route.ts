import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const demoCheckoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      quantity: z.number(),
      price: z.number(),
      type: z.enum(["DIGITAL", "PHYSICAL"]),
    }),
  ),
  total: z.number(),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const body = demoCheckoutSchema.parse(await request.json());

  console.log("[demo-checkout]", {
    userId: session.user.id,
    email: session.user.email,
    items: body.items,
    total: body.total,
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Demo order placed successfully",
    orderId: `demo-${Date.now()}`,
  });
}
