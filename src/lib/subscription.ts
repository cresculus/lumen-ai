import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export type SubscriptionPlan = "monthly" | "yearly";

const YEARLY_GIFT_SLUG = "silk-sleep-mask";
const YEARLY_GIFT_CAMPAIGN = "yearly-subscription-gift";

export function getSubscriptionPriceId(plan: SubscriptionPlan = "monthly") {
  if (plan === "yearly") {
    return process.env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID || "";
  }
  return process.env.STRIPE_SUBSCRIPTION_PRICE_ID || "";
}

export async function grantYearlySleepMaskGift(userId: string) {
  const mask = await prisma.physicalProduct.findFirst({
    where: { slug: YEARLY_GIFT_SLUG },
  });
  if (!mask) return;

  const existing = await prisma.order.findFirst({
    where: { userId, utmCampaign: YEARLY_GIFT_CAMPAIGN },
  });
  if (existing) return;

  await prisma.order.create({
    data: {
      userId,
      status: "PAID",
      total: 0,
      utmCampaign: YEARLY_GIFT_CAMPAIGN,
      items: {
        create: {
          productType: "PHYSICAL",
          physicalProductId: mask.id,
          title: "Yearly gift: Silk Sleep Mask",
          quantity: 1,
          priceAtPurchase: 0,
        },
      },
    },
  });
}

export async function createSubscriptionCheckout({
  userId,
  email,
  customerId,
  plan = "monthly",
}: {
  userId: string;
  email: string;
  customerId?: string | null;
  plan?: SubscriptionPlan;
}) {
  const stripe = getStripe();
  const priceId = getSubscriptionPriceId(plan);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!stripe || !priceId) {
    const label = plan === "yearly" ? "Yearly" : "Monthly";
    throw new Error(
      `${label} subscription is not configured. Add STRIPE${plan === "yearly" ? "_YEARLY" : ""}_SUBSCRIPTION_PRICE_ID.`,
    );
  }

  let stripeCustomerId = customerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { userId },
    });
    stripeCustomerId = customer.id;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/account?subscribed=1`,
    cancel_url: `${appUrl}/pricing`,
    metadata: { userId, type: "subscription", plan },
    subscription_data: {
      metadata: { userId, plan },
    },
  });

  return { url: checkoutSession.url, stripeCustomerId };
}

export async function createBillingPortal(customerId: string) {
  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!stripe) throw new Error("Stripe is not configured");

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/account`,
  });

  return portal.url;
}
