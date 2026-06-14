import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "夜伽会 — Z李 監修 公式マッチング",
  description:
    "Z李が暴いてきた業界を、今度は正しく作る。業界の裏を知り尽くした男が選んだ15,000名の厳選キャスト。嘘のない夜を、本物の男に。",
  keywords: "夜伽会, Z李, マッチング, キャスト, エグゼクティブ, 監修",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f5] antialiased">
        {children}
      </body>
    </html>
  );
}
