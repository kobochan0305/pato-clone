import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      gender: true,
      points: true,
      grade: true,
      role: true,
      createdAt: true,
      pointTxs: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  return NextResponse.json(user);
}

const profileSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  gender: z.enum(["MALE", "FEMALE", "UNSET"]).optional(),
  image: z.string().max(500).optional(),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
    select: { id: true, name: true, image: true, gender: true },
  });

  return NextResponse.json(updated);
}
