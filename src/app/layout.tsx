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
  title: "pato - No.1エンタメマッチングサービス",
  description:
    "本物を知っている人だけが使っている。最短30分で厳選キャストがあなたのもとへ。15,000名以上の厳選キャストからあなただけのエンタメ体験を。",
  keywords: "マッチング, エンタメ, キャスト, エグゼクティブ, パト",
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
