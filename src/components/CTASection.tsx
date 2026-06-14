import { MessageCircle, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative line */}
        <div className="flex items-center gap-4 justify-center mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-400 text-xs tracking-widest uppercase font-medium">
            Join 夜伽会
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          今すぐ、
          <br />
          <span className="gold-text">最高の体験</span>を始めよう。
        </h2>

        <p className="text-zinc-500 text-sm mb-10 max-w-md mx-auto leading-relaxed">
          無料登録で¥12,000分のクーポンをプレゼント。
          <br />
          15,000名以上の厳選キャストがあなたをお待ちしています。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/register" className="flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold px-10 py-4 rounded-full transition-all duration-200 text-base shadow-xl shadow-green-900/30">
            <MessageCircle size={20} />
            LINEで始める
          </a>
          <a href="/register" className="flex items-center justify-center gap-3 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#3a3a3a] text-white font-semibold px-10 py-4 rounded-full transition-all duration-200 text-base">
            <Phone size={20} />
            電話番号で登録
          </a>
        </div>

        <p className="mt-5 text-xs text-zinc-600">
          登録無料 · 年齢確認あり（18歳以上） · いつでも退会可能
        </p>
      </div>
    </section>
  );
}
