import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION ?? "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY!,
  },
});

const schema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "入力内容を確認してください" }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Cognitoにユーザー作成（失敗しても登録は続行）
  try {
    await cognitoClient.send(new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: "name", Value: name }],
    }));
    await cognitoClient.send(new AdminConfirmSignUpCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: email,
    }));
  } catch {
    // Cognitoエラーは無視してDBのみで続行
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "GUEST",
      points: 12000,
      pointTxs: {
        create: {
          amount: 12000,
          type: "BONUS",
          description: "新規登録ボーナス ¥12,000クーポン",
        },
      },
    },
    select: { id: true, name: true, email: true, points: true },
  });

  return NextResponse.json({ user }, { status: 201 });
}
