import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import CastDetail from "./CastDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cast = await prisma.castProfile.findUnique({ where: { id } });
  if (!cast) return { title: "Not found" };
  return { title: `${cast.displayName} | 夜伽会` };
}

export default async function CastPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [cast, session] = await Promise.all([
    prisma.castProfile.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, createdAt: true } },
        reviewsReceived: {
          include: { reviewer: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    }),
    auth(),
  ]);

  if (!cast) notFound();

  return (
    <CastDetail
      cast={JSON.parse(JSON.stringify(cast))}
      isLoggedIn={!!session?.user?.id}
    />
  );
}
