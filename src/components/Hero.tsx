import { MessageCircle, Phone, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 luxury-border rounded-full px-4 py-1.5 mb-8 bg-[#141414]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs text-amber-400 font-medium tracking-widest uppercase">
            Z李 監修 — 公式マッチング
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
          <span className="text-white">Z李が暴いてきた業界を、</span>
          <br />
          <span className="gold-text">今度は正しく作る。</span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          業界の裏を知り尽くした男が選んだ、15,000名のキャスト。
          <br className="hidden sm:block" />
          嘘のない夜を、本物の男に。
        </p>

        {/* Z李 Quote */}
        <div className="mb-10 mx-auto max-w-lg">
          <div className="luxury-border bg-[#141414] rounded-2xl p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shrink-0 text-black font-bold text-xs">
                Z李
              </div>
              <div>
                <p className="text-xs text-amber-400 font-medium mb-1 tracking-wider">監修コメント — Z李</p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  「俺が長年この業界の裏を暴いてきたからこそ、本物だけを残したサービスが作れた。採用率10%の審査を俺自身が設計した。」
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="gold-text font-bold text-lg">500,000+</span>
            <span>累計マッチング数</span>
          </div>
          <div className="w-px bg-[#2a2a2a] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="gold-text font-bold text-lg">15,000+</span>
            <span>登録キャスト数</span>
          </div>
          <div className="w-px bg-[#2a2a2a] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="gold-text font-bold text-lg">採用率10%</span>
            <span>厳選基準</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a href="/register" className="flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base shadow-lg shadow-green-900/30">
            <MessageCircle size={20} />
            LINEで始める
          </a>
          <a href="/register" className="flex items-center justify-center gap-3 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#3a3a3a] text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base">
            <Phone size={20} />
            電話番号で登録
          </a>
        </div>

        <p className="text-xs text-zinc-600 mb-3">登録無料・年齢確認あり（18歳以上）</p>

        <a href="/casts" className="text-xs text-zinc-500 hover:text-amber-400 transition-colors underline underline-offset-2">
          登録せずにキャストを見る →
        </a>
      </div>

      {/* Coupon Banner */}
      <div className="relative z-10 mt-12 mx-4">
        <div className="luxury-border bg-[#141414] rounded-2xl px-6 py-4 inline-flex items-center gap-4 shadow-xl">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-xs">¥</span>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-0.5">新規登録限定</p>
            <p className="text-sm font-semibold text-white">
              <span className="gold-text font-bold text-base">¥12,000</span>{" "}
              分のクーポンプレゼント
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
