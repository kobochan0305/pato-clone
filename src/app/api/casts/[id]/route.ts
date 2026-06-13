import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cast = await prisma.castProfile.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, createdAt: true } },
      reviewsReceived: {
        include: { reviewer: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!cast) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(cast);
}
