import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  createSubscriptionCheckout,
  type SubscriptionPlan,
} from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  let plan: SubscriptionPlan = "monthly";
  try {
    const body = await request.json();
    if (body?.plan === "yearly" || body?.plan === "monthly") {
      plan = body.plan;
    }
  } catch {
    // default monthly when body empty
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const { url, stripeCustomerId } = await createSubscriptionCheckout({
      userId: user.id,
      email: user.email,
      customerId: user.stripeCustomerId,
      plan,
    });

    if (stripeCustomerId && stripeCustomerId !== user.stripeCustomerId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 503 },
    );
  }
}
