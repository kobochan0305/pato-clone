import { Quote } from "lucide-react";

const testimonials = [
  {
    role: "IT企業 代表取締役 / 40代",
    content:
      "海外からのVIPゲストの接待に利用しました。英語対応可能なキャストを短時間で手配できたのが素晴らしかったです。ビジネスシーンでも使えるクオリティ。",
    rating: 5,
  },
  {
    role: "外科医 / 38歳",
    content:
      "医師という職業柄、プライバシーへの配慮が最も重要でした。本名も顔も公開されない安心感があります。キャストの方々のレベルも申し分なく、毎週利用しています。",
    rating: 5,
  },
  {
    role: "不動産会社 役員 / 45歳",
    content:
      "急な予定でも30分以内に来てもらえたのは本当に助かりました。ゴルフの打ち上げで使いましたが、場の雰囲気を盛り上げてくれて大変好評でした。",
    rating: 5,
  },
  {
    role: "弁護士事務所 代表 / 51歳",
    content:
      "サービスとしての完成度が高く、余計な心配をせず純粋に楽しめます。VIPランクにアップしてからは更に質の高いキャストにアクセスできるようになりました。",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            利用者の声
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="dark-card rounded-2xl p-6 relative overflow-hidden">
              <Quote
                size={40}
                className="absolute top-4 right-4 text-amber-400/10"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-3.5 h-3.5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-5 relative z-10">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </div>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
