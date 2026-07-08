import { auth } from "@/auth";
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

  const download = await prisma.download.findUnique({
    where: {
      userId_digitalProductId: {
        userId: session.user.id,
        digitalProductId: productId,
      },
    },
    include: { digitalProduct: true },
  });

  if (!download) {
    return NextResponse.json({ error: "Not purchased" }, { status: 403 });
  }

  if (download.expiresAt < new Date()) {
    return NextResponse.json({ error: "Download expired" }, { status: 403 });
  }

  if (download.downloadCount >= download.maxDownloads) {
    return NextResponse.json({ error: "Download limit reached" }, { status: 403 });
  }

  await prisma.download.update({
    where: { id: download.id },
    data: { downloadCount: { increment: 1 } },
  });

  try {
    const url = await resolveMediaUrl(download.digitalProduct.audioKey, 600);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[download]", error);
    return NextResponse.json(
      { error: "File unavailable — contact support" },
      { status: 503 },
    );
  }
}
