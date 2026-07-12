import { auth } from "@/auth";
import { hasActiveSubscription } from "@/lib/access";
import { findMockTrack, isMockId, MOCK_DEMO_AUDIO_URL } from "@/lib/mock-data";
import { prisma } from "@/lib/db";
import { resolveMediaUrl } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await params;
  const userId = session.user.id;

  if (isMockId(productId)) {
    const mock = findMockTrack(productId);
    if (!mock) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }
    return NextResponse.json({
      url: MOCK_DEMO_AUDIO_URL,
      mock: true,
      expiresIn: 600,
      title: mock.title,
    });
  }

  if (userId.startsWith("demo-")) {
    return NextResponse.json(
      { error: "Sign in with a library account to download" },
      { status: 403 },
    );
  }

  try {
    const product = await prisma.digitalProduct.findUnique({
      where: { id: productId, status: "PUBLISHED" },
    });
    if (!product) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    const subscribed = await hasActiveSubscription(userId);
    let download = await prisma.download.findUnique({
      where: {
        userId_digitalProductId: {
          userId,
          digitalProductId: productId,
        },
      },
    });

    if (!download && subscribed) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      download = await prisma.download.upsert({
        where: {
          userId_digitalProductId: { userId, digitalProductId: productId },
        },
        update: {},
        create: {
          userId,
          digitalProductId: productId,
          expiresAt,
          maxDownloads: 20,
        },
      });
    }

    if (!download) {
      return NextResponse.json({ error: "Not purchased" }, { status: 403 });
    }

    if (download.expiresAt < new Date()) {
      return NextResponse.json({ error: "Download expired" }, { status: 403 });
    }

    if (download.downloadCount >= download.maxDownloads) {
      return NextResponse.json(
        { error: "Download limit reached" },
        { status: 403 },
      );
    }

    await prisma.download.update({
      where: { id: download.id },
      data: { downloadCount: { increment: 1 } },
    });

    const url = await resolveMediaUrl(product.audioKey, 600);
    return NextResponse.json({
      url,
      expiresIn: 600,
      title: product.title,
      remaining: download.maxDownloads - download.downloadCount - 1,
    });
  } catch (error) {
    console.error("[download]", error);
    return NextResponse.json(
      { error: "File unavailable — contact support" },
      { status: 503 },
    );
  }
}
