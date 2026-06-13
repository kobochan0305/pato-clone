import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const area = searchParams.get("area");
  const tier = searchParams.get("tier");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 12;

  const where = {
    available: true,
    ...(area && area !== "all" ? { area } : {}),
    ...(tier && tier !== "all" ? { tier } : {}),
  };

  const [casts, total] = await Promise.all([
    prisma.castProfile.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: [{ tier: "desc" }, { rating: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.castProfile.count({ where }),
  ]);

  return NextResponse.json({ casts, total, page, pages: Math.ceil(total / limit) });
}
