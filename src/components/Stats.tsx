const demographics = [
  { label: "経営者・役員", pct: 42 },
  { label: "会社員（管理職）", pct: 28 },
  { label: "医師・弁護士等", pct: 16 },
  { label: "その他専門職", pct: 14 },
];

const incomeData = [
  { label: "1,000〜2,000万", pct: 38, highlight: true },
  { label: "2,000〜5,000万", pct: 22, highlight: true },
  { label: "5,000万以上", pct: 10, highlight: true },
  { label: "〜1,000万", pct: 30, highlight: false },
];

export default function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            User Data
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            利用者の<span className="gold-text">70%以上</span>が
            <br className="sm:hidden" />
            年収1,000万円超
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            経営者・役員・医師・弁護士など、各業界のエグゼクティブが
            日常的に利用するプラットフォームです。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Income Chart */}
          <div className="dark-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-zinc-400 mb-5">
              年収分布
            </h3>
            <div className="space-y-3">
              {incomeData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={item.highlight ? "text-amber-400" : "text-zinc-500"}>
                      {item.label}
                    </span>
                    <span className={item.highlight ? "text-amber-400 font-medium" : "text-zinc-500"}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.highlight
                          ? "gold-gradient"
                          : "bg-[#3a3a3a]"
                      }`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <p className="text-xs text-zinc-500">
                <span className="text-amber-400 font-semibold">70%以上</span>が年収1,000万円超
              </p>
            </div>
          </div>

          {/* Profession Chart */}
          <div className="dark-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-zinc-400 mb-5">
              職業分布
            </h3>
            <div className="space-y-3">
              {demographics.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">{item.label}</span>
                    <span className="text-zinc-400">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full gold-gradient"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <p className="text-xs text-zinc-500">
                <span className="text-amber-400 font-semibold">経営者・役員</span>が最多
              </p>
            </div>
          </div>
        </div>

        {/* Key Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: "500,000+", label: "累計マッチング数" },
            { value: "15,000+", label: "登録キャスト数" },
            { value: "10%", label: "キャスト採用率" },
            { value: "24/7", label: "サポート体制" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="dark-card rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold gold-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
