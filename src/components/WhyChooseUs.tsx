import { Crown, Shield, Star, Users, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "厳選されたキャスト",
    subtitle: "採用率わずか10%",
    desc: "応募者の中から書類審査・面接・写真審査を経て採用されるのはわずか10%。採用後も定期的な品質チェックを実施し、常に高い水準を維持しています。",
    points: [
      "15,000名以上の登録キャスト",
      "採用後も定期品質チェック",
      "パートナー提携による特別サービス",
    ],
  },
  {
    icon: Crown,
    title: "柔軟な体験プラン",
    subtitle: "24時間365日対応",
    desc: "プライベートからビジネス接待まで、あらゆるシーンに対応。急な予定変更にも最短30分で対応します。領収書発行にも対応しているため、経費計上も可能です。",
    points: [
      "ビジネス・プライベート両対応",
      "領収書発行サービスあり",
      "完全プライバシー保護",
    ],
  },
  {
    icon: Star,
    title: "会員限定システム",
    subtitle: "ランク制度で特別体験",
    desc: "紳士的な行動を認定するバッジシステムと、利用実績に応じてランクアップするグレード制度。上位会員だけが体験できるVIP限定コンテンツをご用意しています。",
    points: [
      "ジェントルマンバッジ認定",
      "グレードランクアップ制度",
      "VIP限定イベント・キャスト",
    ],
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            Why 夜伽会
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            エグゼクティブが選ぶ
            <br />
            <span className="gold-text">3つの理由</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            「本物思考」に拘った、他にはないプレミアムな体験をご提供します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="dark-card rounded-2xl p-6 hover:border-amber-500/20 transition-colors duration-300 group"
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-black" />
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-amber-400 font-medium mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {pillar.desc}
                </p>

                <ul className="space-y-2">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-zinc-400"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-amber-400 mt-0.5 shrink-0"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Safety note */}
        <div className="mt-10 luxury-border rounded-2xl p-6 bg-[#141414] flex flex-col sm:flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
            <Shield size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">
              安心・安全なサービス設計
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              年齢確認（公的身分証明書）・24時間モニタリング・本名/電話番号/顔写真の非公開設定など、
              プライバシーと安全性を最優先に設計しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
