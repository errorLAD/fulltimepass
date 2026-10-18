import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const eventSchema = z.object({
  toolSlug: z.string().min(1),
  eventType: z.enum(["OPEN", "COMPLETE", "DOWNLOAD", "SHARE_ATTEMPT"]),
  meta: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = eventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const { toolSlug, eventType, meta } = parsed.data;

    // Gracefully handle deployment without database configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, offline: true });
    }

    try {
      const tool = await prisma.tool.findUnique({
        where: { slug: toolSlug },
      });

      if (tool) {
        // Record individual event
        await prisma.toolEvent.create({
          data: {
            toolId: tool.id,
            eventType,
            meta: meta || {},
          },
        });

        // Update daily aggregated stats
        const todayStr = new Date().toISOString().split("T")[0];
        const updateData: Record<string, any> = {};
        if (eventType === "OPEN") updateData.opens = { increment: 1 };
        if (eventType === "COMPLETE") updateData.completions = { increment: 1 };
        if (eventType === "DOWNLOAD") updateData.downloads = { increment: 1 };
        if (eventType === "SHARE_ATTEMPT") updateData.shares = { increment: 1 };

        await prisma.dailyToolStats.upsert({
          where: {
            toolId_date: {
              toolId: tool.id,
              date: todayStr,
            },
          },
          create: {
            toolId: tool.id,
            date: todayStr,
            opens: eventType === "OPEN" ? 1 : 0,
            completions: eventType === "COMPLETE" ? 1 : 0,
            downloads: eventType === "DOWNLOAD" ? 1 : 0,
            shares: eventType === "SHARE_ATTEMPT" ? 1 : 0,
          },
          update: updateData,
        });
      }
    } catch (dbErr) {
      // In case DB is not currently connected in local dev, log and allow gracefully
      console.warn("DB logging skipped or offline:", dbErr instanceof Error ? dbErr.message : dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
