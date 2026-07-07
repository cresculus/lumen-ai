import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { createSubscriptionCheckout } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
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
