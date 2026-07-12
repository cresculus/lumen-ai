import { prisma } from "@/lib/db";
import { sendPurchaseEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { grantYearlySleepMaskGift } from "@/lib/subscription";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

type CartItem = {
  type: "DIGITAL" | "PHYSICAL";
  productId: string;
  quantity: number;
};

async function syncSubscription(
  subscription: Stripe.Subscription,
  userId: string,
) {
  const periodEnd = subscription.items.data[0]?.current_period_end;
  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id,
      status: subscription.status,
      currentPeriodEnd: periodEnd
        ? new Date(periodEnd * 1000)
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id,
      status: subscription.status,
      currentPeriodEnd: periodEnd
        ? new Date(periodEnd * 1000)
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === "subscription" && session.metadata?.userId) {
      const subId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;
      if (subId) {
        const subscription = await stripe.subscriptions.retrieve(subId);
        await syncSubscription(subscription, session.metadata.userId);
        if (session.customer && typeof session.customer === "string") {
          await prisma.user.update({
            where: { id: session.metadata.userId },
            data: { stripeCustomerId: session.customer },
          });
        }
        if (session.metadata.plan === "yearly") {
          await grantYearlySleepMaskGift(session.metadata.userId);
        }
      }
      return NextResponse.json({ received: true });
    }

    if (!session.metadata?.userId || !session.metadata.cart) {
      return NextResponse.json({ received: true });
    }

    const existing = await prisma.order.findUnique({
      where: { stripeSessionId: session.id },
    });
    if (existing) {
      return NextResponse.json({ received: true });
    }

    const cart = JSON.parse(session.metadata.cart) as CartItem[];
    const shipping = session.metadata.shipping
      ? JSON.parse(session.metadata.shipping)
      : null;

    let total = 0;
    const orderItems: {
      productType: "DIGITAL" | "PHYSICAL";
      digitalProductId?: string;
      physicalProductId?: string;
      title: string;
      quantity: number;
      priceAtPurchase: number;
    }[] = [];

    for (const item of cart) {
      if (item.type === "DIGITAL") {
        const product = await prisma.digitalProduct.findUnique({
          where: { id: item.productId },
        });
        if (!product) continue;
        total += product.price * item.quantity;
        orderItems.push({
          productType: "DIGITAL",
          digitalProductId: product.id,
          title: product.title,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        });
      } else {
        const product = await prisma.physicalProduct.findUnique({
          where: { id: item.productId },
        });
        if (!product) continue;
        total += product.price * item.quantity;
        orderItems.push({
          productType: "PHYSICAL",
          physicalProductId: product.id,
          title: product.title,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        });
        await prisma.physicalProduct.update({
          where: { id: product.id },
          data: { inventory: { decrement: item.quantity } },
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: session.metadata.userId,
        status: "PAID",
        total,
        stripeSessionId: session.id,
        stripePaymentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
        shippingName: shipping?.name,
        shippingLine1: shipping?.line1,
        shippingLine2: shipping?.line2,
        shippingCity: shipping?.city,
        shippingState: shipping?.state,
        shippingZip: shipping?.zip,
        shippingCountry: shipping?.country,
        utmSource: session.metadata.utmSource || null,
        utmMedium: session.metadata.utmMedium || null,
        utmCampaign: session.metadata.utmCampaign || null,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    for (const item of orderItems) {
      if (item.productType === "DIGITAL" && item.digitalProductId) {
        await prisma.download.upsert({
          where: {
            userId_digitalProductId: {
              userId: session.metadata.userId,
              digitalProductId: item.digitalProductId,
            },
          },
          create: {
            userId: session.metadata.userId,
            digitalProductId: item.digitalProductId,
            expiresAt,
          },
          update: { expiresAt, downloadCount: 0 },
        });
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.metadata.userId },
    });

    if (user?.email) {
      await sendPurchaseEmail({
        to: user.email,
        orderId: order.id,
        items: order.items.map((i) => i.title),
      });
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata.userId;
    if (userId) {
      await syncSubscription(subscription, userId);
    }
  }

  return NextResponse.json({ received: true });
}
