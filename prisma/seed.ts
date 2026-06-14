import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const castData = [
  { name: "Ai",     age: 24, area: "東京",  tier: "PREMIUM",   bio: "社交的で明るい性格です。ビジネス接待からカジュアルなお食事まで幅広く対応します。モデル経験あり。",     rating: 4.9, reviewCount: 213, photo: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Haruka", age: 27, area: "東京",  tier: "VIP",       bio: "元客室乗務員。英語対応可能。上品な立ち振る舞いと会話力が自慢です。",                                      rating: 4.8, reviewCount: 187, photo: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Mio",    age: 22, area: "大阪",  tier: "PREMIUM",   bio: "関西出身のフレンドリーなキャストです。場を盛り上げるのが得意です。",                                      rating: 4.9, reviewCount: 145, photo: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Saki",   age: 26, area: "東京",  tier: "ROYAL_VIP", bio: "経営者・役員の接待を専門とするトップキャスト。ワイン・茶道の資格保有。",                                  rating: 5.0, reviewCount: 98,  photo: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Nana",   age: 23, area: "名古屋", tier: "PREMIUM",  bio: "大学院在学中。知的な会話が得意です。アート・文化系の話題で盛り上がりましょう。",                          rating: 4.7, reviewCount: 162, photo: "https://randomuser.me/api/portraits/women/5.jpg" },
  { name: "Rina",   age: 25, area: "東京",  tier: "VIP",       bio: "元宝塚出身。ダンス・歌が得意。エンターテイメント性の高いパートナーをお探しの方へ。",                      rating: 4.8, reviewCount: 201, photo: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Yuki",   age: 28, area: "東京",  tier: "VIP",       bio: "料理研究家としても活動中。食に関する深い知識で会話が弾みます。",                                          rating: 4.7, reviewCount: 134, photo: "https://randomuser.me/api/portraits/women/7.jpg" },
  { name: "Kana",   age: 21, area: "福岡",  tier: "PREMIUM",   bio: "明るくエネルギッシュなキャスト。ゴルフ経験あり。アウトドア系のお誘いも歓迎。",                            rating: 4.6, reviewCount: 89,  photo: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Mei",    age: 29, area: "東京",  tier: "ROYAL_VIP", bio: "国際弁護士補佐として活動。法律・国際ビジネスの知識も豊富。完全プライベート対応。",                        rating: 4.9, reviewCount: 67,  photo: "https://randomuser.me/api/portraits/women/9.jpg" },
  { name: "Aoi",    age: 24, area: "大阪",  tier: "VIP",       bio: "ピアニスト。音楽・芸術系の話題が得意。上品な雰囲気でご一緒します。",                                      rating: 4.8, reviewCount: 112, photo: "https://randomuser.me/api/portraits/women/10.jpg" },
  { name: "Hana",   age: 26, area: "横浜",  tier: "PREMIUM",   bio: "元ファッションモデル。トレンドに敏感でおしゃれなお出かけにぴったり。",                                    rating: 4.7, reviewCount: 155, photo: "https://randomuser.me/api/portraits/women/11.jpg" },
  { name: "Risa",   age: 23, area: "東京",  tier: "VIP",       bio: "フリーランスデザイナー。クリエイティブな会話が得意です。",                                                rating: 4.8, reviewCount: 178, photo: "https://randomuser.me/api/portraits/women/12.jpg" },
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
      update: {},
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
