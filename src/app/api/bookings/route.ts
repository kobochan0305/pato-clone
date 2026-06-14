import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const TIER_POINTS: Record<string, number> = {
  PREMIUM: 4250,
  VIP: 7000,
  ROYAL_VIP: 12500,
};

const schema = z.object({
  castId: z.string().min(1),
  type: z.enum(["PATO_CALL", "CO_PATO"]),
  area: z.string().min(1).max(100),
  note: z.string().max(500).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { guestId: session.user.id },
    include: {
      cast: { select: { displayName: true, tier: true, area: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "入力内容を確認してください" }, { status: 400 });
  }

  const { castId, type, area, note, scheduledAt } = parsed.data;

  const cast = await prisma.castProfile.findUnique({ where: { id: castId } });
  if (!cast) return NextResponse.json({ error: "キャストが見つかりません" }, { status: 404 });
  if (!cast.available) return NextResponse.json({ error: "現在対応できません" }, { status: 409 });

  const pointsCost = TIER_POINTS[cast.tier] ?? 4250;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { points: true },
  });
  if (!user || user.points < pointsCost) {
    return NextResponse.json({ error: "ポイントが不足しています" }, { status: 402 });
  }

  const [booking] = await prisma.$transaction([
    prisma.booking.create({
      data: {
        guestId: session.user.id,
        castId,
        type,
        status: "PENDING",
        pointsCost,
        area,
        note,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      },
    }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { points: { decrement: pointsCost } },
    }),
    prisma.pointTransaction.create({
      data: {
        userId: session.user.id,
        amount: -pointsCost,
        type: "USE",
        description: `${cast.displayName}への${type === "PATO_CALL" ? "夜伽CALL" : "御同伴"}予約`,
      },
    }),
  ]);

  return NextResponse.json(booking, { status: 201 });
}
