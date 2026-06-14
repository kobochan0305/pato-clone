import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const photos: Record<string, string[]> = {
  Ai:     ["https://randomuser.me/api/portraits/women/1.jpg"],
  Haruka: ["https://randomuser.me/api/portraits/women/2.jpg"],
  Mio:    ["https://randomuser.me/api/portraits/women/3.jpg"],
  Saki:   ["https://randomuser.me/api/portraits/women/4.jpg"],
  Nana:   ["https://randomuser.me/api/portraits/women/5.jpg"],
  Rina:   ["https://randomuser.me/api/portraits/women/6.jpg"],
  Yuki:   ["https://randomuser.me/api/portraits/women/7.jpg"],
  Kana:   ["https://randomuser.me/api/portraits/women/8.jpg"],
  Mei:    ["https://randomuser.me/api/portraits/women/9.jpg"],
  Aoi:    ["https://randomuser.me/api/portraits/women/10.jpg"],
  Hana:   ["https://randomuser.me/api/portraits/women/11.jpg"],
  Risa:   ["https://randomuser.me/api/portraits/women/12.jpg"],
};

async function main() {
  for (const [name, urls] of Object.entries(photos)) {
    const result = await prisma.castProfile.updateMany({
      where: { displayName: name },
      data: { photos: JSON.stringify(urls) },
    });
    console.log(`${name}: updated ${result.count} row(s)`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
