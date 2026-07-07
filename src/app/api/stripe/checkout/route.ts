import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      type: z.enum(["DIGITAL", "PHYSICAL"]),
      productId: z.string(),
      quantity: z.number().int().min(1).max(10),
    }),
  ),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional(),
  shipping: z
    .object({
      name: z.string(),
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      country: z.string().default("US"),
    })
    .optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 },
    );
  }

  const body = checkoutSchema.parse(await request.json());
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let hasPhysical = false;

  for (const item of body.items) {
    if (item.type === "DIGITAL") {
      const product = await prisma.digitalProduct.findUnique({
        where: { id: item.productId, status: "PUBLISHED" },
      });
      if (!product) {
        return NextResponse.json(
          { error: `Digital product not found: ${item.productId}` },
          { status: 404 },
        );
      }
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: product.title },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });
    } else {
      hasPhysical = true;
      const product = await prisma.physicalProduct.findUnique({
        where: { id: item.productId, status: "PUBLISHED" },
      });
      if (!product) {
        return NextResponse.json(
          { error: `Physical product not found: ${item.productId}` },
          { status: 404 },
        );
      }
      if (product.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient inventory for ${product.title}` },
          { status: 400 },
        );
      }
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: product.title },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });
    }
  }

  if (hasPhysical && !body.shipping) {
    return NextResponse.json(
      { error: "Shipping address required for physical products" },
      { status: 400 },
    );
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email || undefined,
    line_items: lineItems,
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cart`,
    metadata: {
      userId: session.user.id,
      cart: JSON.stringify(body.items),
      utmSource: body.utm?.source || "",
      utmMedium: body.utm?.medium || "",
      utmCampaign: body.utm?.campaign || "",
      shipping: body.shipping ? JSON.stringify(body.shipping) : "",
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
