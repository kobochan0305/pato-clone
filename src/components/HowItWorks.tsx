import { UserPlus, Search, CreditCard, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "無料登録",
    desc: "LINEまたは電話番号で30秒登録。年齢確認後すぐにご利用いただけます。",
  },
  {
    icon: Search,
    step: "02",
    title: "キャストを選ぶ",
    desc: "エリア・タイプ・雰囲気などの条件で絞り込み。プロフィールを確認してお気に入りを見つけます。",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "ポイントを購入",
    desc: "必要な分だけチャージ。クレジットカード・電子マネーに対応。領収書発行も可能です。",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "マッチング開始",
    desc: "夜伽CALLなら最短30分、御同伴なら事前にメッセージで日程を調整してスタート。",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            4ステップで
            <br />
            すぐに始められる
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                      <Icon size={24} className="text-amber-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full gold-gradient flex items-center justify-center">
                      <span className="text-black text-[9px] font-bold">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="/register" className="inline-block gold-gradient text-black font-semibold px-10 py-4 rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-900/20">
            今すぐ無料登録する
          </a>
          <p className="mt-3 text-xs text-zinc-600">
            登録無料 · 随時退会可能
          </p>
        </div>
      </div>
    </section>
  );
}
