import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const metadata = { title: "マイページ | 夜伽会" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user, bookings] = await Promise.all([
    prisma.user.findUnique({
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
          take: 5,
        },
      },
    }),
    prisma.booking.findMany({
      where: { guestId: session.user.id },
      include: {
        cast: { select: { displayName: true, tier: true, area: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  if (!user) redirect("/login");

  return (
    <DashboardClient
      user={JSON.parse(JSON.stringify(user))}
      bookings={JSON.parse(JSON.stringify(bookings))}
    />
  );
}
