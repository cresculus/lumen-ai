import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const analyticsSchema = z.object({
  event: z.string(),
  page: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(request: Request) {
  const body = analyticsSchema.parse(await request.json());

  await prisma.analyticsEvent.create({
    data: {
      event: body.event,
      page: body.page,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
    },
  });

  return NextResponse.json({ ok: true });
}
