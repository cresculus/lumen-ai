import { findMockTrack, isMockId, MOCK_DEMO_AUDIO_URL } from "@/lib/mock-data";
import { getSessionStreamAccess } from "@/lib/access";
import { prisma } from "@/lib/db";
import { getSignedDownloadUrl } from "@/lib/r2";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;

  if (isMockId(productId)) {
    const mock = findMockTrack(productId);
    if (!mock) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }
    const { access } = await getSessionStreamAccess(productId);
    return NextResponse.json({
      url: MOCK_DEMO_AUDIO_URL,
      access,
      mock: true,
      track: {
        id: mock.id,
        title: mock.title,
        slug: mock.slug,
        tags: mock.tags,
        duration: mock.duration,
      },
    });
  }

  const product = await prisma.digitalProduct.findUnique({
    where: { id: productId, status: "PUBLISHED" },
  });

  if (!product) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const { access } = await getSessionStreamAccess(productId);

  try {
    const url = await getSignedDownloadUrl(
      product.audioKey,
      access === "preview" ? 600 : 3600,
    );

    return NextResponse.json({
      url,
      access,
      track: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        tags: product.tags,
        duration: product.duration,
      },
    });
  } catch {
    return NextResponse.json({
      url: MOCK_DEMO_AUDIO_URL,
      access,
      mock: true,
      track: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        tags: product.tags,
        duration: product.duration,
      },
    });
  }
}
