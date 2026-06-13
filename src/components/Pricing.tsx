import { Check } from "lucide-react";

const plans = [
  {
    name: "プレミアム",
    nameEn: "Premium",
    pricePerHalf: "5,100",
    points: "4,250",
    color: "zinc",
    features: [
      "30分 4,250ポイント",
      "キャスト指名可能",
      "PATO CALL対応",
      "CO-PATO対応",
      "24時間サポート",
    ],
    cta: "プレミアムで始める",
    popular: false,
  },
  {
    name: "VIP",
    nameEn: "VIP",
    pricePerHalf: "8,400",
    points: "7,000",
    color: "gold",
    features: [
      "30分 7,000ポイント",
      "VIPキャスト指名",
      "PATO CALL優先対応",
      "CO-PATO対応",
      "24時間専用サポート",
      "VIPバッジ付与",
    ],
    cta: "VIPで始める",
    popular: true,
  },
  {
    name: "ロイヤルVIP",
    nameEn: "Royal VIP",
    pricePerHalf: "15,000",
    points: "12,500",
    color: "platinum",
    features: [
      "30分 12,500ポイント",
      "ロイヤルキャスト指名",
      "即時PATO CALL対応",
      "専任コンシェルジュ",
      "24時間専用ホットライン",
      "ロイヤルVIPバッジ",
      "限定イベント招待",
    ],
    cta: "ロイヤルVIPで始める",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            シンプルな料金体系
          </h2>
          <p className="text-zinc-500 text-sm">
            1ポイント = 約1.2円。まずは無料登録からどうぞ。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "luxury-border bg-[#141414] shadow-xl shadow-amber-900/10"
                  : "border border-[#2a2a2a] bg-[#141414]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="gold-gradient text-black text-xs font-bold px-4 py-1 rounded-full">
                    人気No.1
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-5">
                <p className="text-xs text-zinc-500 font-medium mb-1">
                  {plan.nameEn}
                </p>
                <h3 className={`text-xl font-bold ${plan.popular ? "gold-text" : "text-white"}`}>
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-6 pb-5 border-b border-[#2a2a2a]">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-white">
                    ¥{plan.pricePerHalf}
                  </span>
                  <span className="text-zinc-500 text-sm mb-1">/ 30分</span>
                </div>
                <p className="text-xs text-zinc-600 mt-1">
                  {plan.points}ポイント相当
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        plan.popular ? "text-amber-400" : "text-zinc-500"
                      }`}
                    />
                    <span className="text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full font-semibold py-3 rounded-xl text-sm transition-all ${
                  plan.popular
                    ? "gold-gradient text-black hover:opacity-90"
                    : "bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#3a3a3a] text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          ※ 表示金額は税込です。ポイントの有効期限は購入から180日間です。
        </p>
      </div>
    </section>
  );
}
