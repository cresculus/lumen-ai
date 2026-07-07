import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { createBillingPortal } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "No billing account" }, { status: 400 });
  }

  try {
    const url = await createBillingPortal(user.stripeCustomerId);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Portal failed" },
      { status: 503 },
    );
  }
}
