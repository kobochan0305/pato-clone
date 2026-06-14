import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function pexels(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=533&fit=crop`;
}

const castData = [
  { name: "Ai",     age: 24, area: "東京",  tier: "PREMIUM",   bio: "社交的で明るい性格です。ビジネス接待からカジュアルなお食事まで幅広く対応します。モデル経験あり。",   rating: 4.9, reviewCount: 213, photo: pexels(35390360) },
  { name: "Haruka", age: 27, area: "東京",  tier: "VIP",       bio: "元客室乗務員。英語対応可能。上品な立ち振る舞いと会話力が自慢です。",                                    rating: 4.8, reviewCount: 187, photo: pexels(29384024) },
  { name: "Mio",    age: 22, area: "大阪",  tier: "PREMIUM",   bio: "関西出身のフレンドリーなキャストです。場を盛り上げるのが得意です。",                                    rating: 4.9, reviewCount: 145, photo: pexels(29384032) },
  { name: "Saki",   age: 26, area: "東京",  tier: "ROYAL_VIP", bio: "経営者・役員の接待を専門とするトップキャスト。ワイン・茶道の資格保有。",                                rating: 5.0, reviewCount: 98,  photo: pexels(31256203) },
  { name: "Nana",   age: 23, area: "名古屋", tier: "PREMIUM",  bio: "大学院在学中。知的な会話が得意です。アート・文化系の話題で盛り上がりましょう。",                        rating: 4.7, reviewCount: 162, photo: pexels(31403197) },
  { name: "Rina",   age: 25, area: "東京",  tier: "VIP",       bio: "元宝塚出身。ダンス・歌が得意。エンターテイメント性の高いパートナーをお探しの方へ。",                    rating: 4.8, reviewCount: 201, photo: pexels(10285637) },
  { name: "Yuki",   age: 28, area: "東京",  tier: "VIP",       bio: "料理研究家としても活動中。食に関する深い知識で会話が弾みます。",                                        rating: 4.7, reviewCount: 134, photo: pexels(4594134) },
  { name: "Kana",   age: 21, area: "福岡",  tier: "PREMIUM",   bio: "明るくエネルギッシュなキャスト。ゴルフ経験あり。アウトドア系のお誘いも歓迎。",                          rating: 4.6, reviewCount: 89,  photo: pexels(31391549) },
  { name: "Mei",    age: 29, area: "東京",  tier: "ROYAL_VIP", bio: "国際弁護士補佐として活動。法律・国際ビジネスの知識も豊富。完全プライベート対応。",                      rating: 4.9, reviewCount: 67,  photo: pexels(31219578) },
  { name: "Aoi",    age: 24, area: "大阪",  tier: "VIP",       bio: "ピアニスト。音楽・芸術系の話題が得意。上品な雰囲気でご一緒します。",                                    rating: 4.8, reviewCount: 112, photo: pexels(34497892) },
  { name: "Hana",   age: 26, area: "横浜",  tier: "PREMIUM",   bio: "元ファッションモデル。トレンドに敏感でおしゃれなお出かけにぴったり。",                                  rating: 4.7, reviewCount: 155, photo: pexels(31316741) },
  { name: "Risa",   age: 23, area: "東京",  tier: "VIP",       bio: "フリーランスデザイナー。クリエイティブな会話が得意です。",                                              rating: 4.8, reviewCount: 178, photo: pexels(37989665) },
];

async function main() {
  console.log("Seeding...");

  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@pato.dev" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@pato.dev",
      passwordHash: await bcrypt.hash("admin1234", 12),
      role: "ADMIN",
      points: 0,
    },
  });

  // Test guest user
  await prisma.user.upsert({
    where: { email: "guest@pato.dev" },
    update: {},
    create: {
      name: "テストユーザー",
      email: "guest@pato.dev",
      passwordHash: await bcrypt.hash("password123", 12),
      role: "GUEST",
      points: 50000,
      pointTxs: {
        create: [
          { amount: 50000, type: "PURCHASE", description: "ポイント購入 50,000pt" },
        ],
      },
    },
  });

  // Cast users
  for (const cast of castData) {
    const email = `${cast.name.toLowerCase()}@cast.pato.dev`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: cast.name,
        email,
        passwordHash: await bcrypt.hash("cast1234", 12),
        role: "CAST",
        points: 0,
      },
    });

    await prisma.castProfile.upsert({
      where: { userId: user.id },
      update: { photos: JSON.stringify([cast.photo]) },
      create: {
        userId: user.id,
        displayName: cast.name,
        age: cast.age,
        bio: cast.bio,
        area: cast.area,
        tier: cast.tier,
        available: true,
        rating: cast.rating,
        reviewCount: cast.reviewCount,
        subAreas: JSON.stringify([cast.area]),
        photos: JSON.stringify([cast.photo]),
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
