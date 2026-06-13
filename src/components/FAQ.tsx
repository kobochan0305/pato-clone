"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "登録は無料ですか？",
    a: "はい、ゲスト（利用者）の新規登録は完全無料です。登録後、ポイントを購入することでサービスをご利用いただけます。",
  },
  {
    q: "キャストはどのように審査されていますか？",
    a: "書類審査・写真審査・面接の3段階審査を実施し、採用されるのは応募者の約10%のみです。採用後も定期的な品質チェックを行い、高いサービス品質を維持しています。",
  },
  {
    q: "領収書は発行してもらえますか？",
    a: "はい、領収書の発行に対応しています。用途は「接待交際費」などとして発行可能です。詳細はサポートへお問い合わせください。",
  },
  {
    q: "何歳から利用できますか？",
    a: "ゲスト・キャストともに18歳以上の方のみご利用いただけます。年齢確認のため、公的身分証明書の提出が必要です。",
  },
  {
    q: "個人情報は安全ですか？",
    a: "本名・電話番号・顔写真はすべて非公開設定となっており、相手方に開示されることはありません。SSL暗号化通信と厳格な個人情報管理体制で保護しています。",
  },
  {
    q: "使えない場所はありますか？",
    a: "ホテルの客室・個人宅などのプライベートな居室でのご利用はお断りしています。レストラン・バー・ゴルフ場などの公共の場でのご利用をお願いします。",
  },
  {
    q: "支払い方法を教えてください。",
    a: "クレジットカード（VISA・Mastercard・JCB・AMEX）、Apple Pay、Google Pay、コンビニ決済に対応しています。購入ポイントの有効期限は180日間です。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            よくある質問
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                openIndex === i
                  ? "border-amber-500/30 bg-[#141414]"
                  : "border-[#2a2a2a] bg-[#141414]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-medium text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-amber-400 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
