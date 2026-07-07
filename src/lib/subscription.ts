import { getStripe } from "@/lib/stripe";

export function getSubscriptionPriceId() {
  return process.env.STRIPE_SUBSCRIPTION_PRICE_ID || "";
}

export async function createSubscriptionCheckout({
  userId,
  email,
  customerId,
}: {
  userId: string;
  email: string;
  customerId?: string | null;
}) {
  const stripe = getStripe();
  const priceId = getSubscriptionPriceId();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!stripe || !priceId) {
    throw new Error("Stripe subscription is not configured");
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
    metadata: { userId, type: "subscription" },
    subscription_data: {
      metadata: { userId },
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
