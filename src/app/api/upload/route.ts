import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUploadUrl, BUCKET } from "@/lib/s3";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentType, ext } = await req.json();
  if (!contentType || !ext) {
    return NextResponse.json({ error: "contentType and ext are required" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(contentType)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const key = `uploads/${session.user.id}/${randomUUID()}.${ext}`;
  const uploadUrl = await getUploadUrl(key, contentType);
  const publicUrl = `https://${BUCKET}.s3.ap-northeast-1.amazonaws.com/${key}`;

  return NextResponse.json({ uploadUrl, publicUrl });
}
