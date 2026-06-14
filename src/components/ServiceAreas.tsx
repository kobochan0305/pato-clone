const areas = [
  {
    city: "東京",
    districts: [
      "渋谷", "新宿", "六本木", "銀座", "赤坂",
      "恵比寿", "青山", "麻布", "秋葉原", "池袋",
      "品川", "丸の内", "上野", "浅草",
    ],
  },
  {
    city: "大阪",
    districts: [
      "梅田", "難波", "心斎橋", "北新地",
      "天満", "本町", "天王寺", "堀江",
    ],
  },
  {
    city: "名古屋",
    districts: [
      "栄", "錦", "名駅", "伏見",
      "大須", "今池", "金山",
    ],
  },
  {
    city: "その他",
    districts: [
      "福岡", "札幌", "横浜", "神戸", "京都",
      "仙台", "広島", "沖縄",
    ],
  },
];

export default function ServiceAreas() {
  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            Service Areas
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            全国主要都市で
            <br />
            ご利用いただけます
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {areas.map((area) => (
            <div key={area.city} className="dark-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full gold-gradient" />
                <h3 className="text-sm font-bold text-white">{area.city}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {area.districts.map((d) => (
                  <span
                    key={d}
                    className="text-xs text-zinc-500 bg-[#1e1e1e] px-2 py-1 rounded"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          ※ エリアは随時拡大中です。リクエストエリアはお問い合わせください。
        </p>
      </div>
    </section>
  );
}
