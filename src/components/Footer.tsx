export default function Footer() {
  const links = {
    サービス: ["夜伽CALL", "御同伴", "キャスト一覧", "料金プラン"],
    サポート: ["よくある質問", "お問い合わせ", "ご利用ガイド", "利用可能エリア"],
    企業情報: ["運営会社", "プレスリリース", "採用情報", "パートナー"],
    ポリシー: ["利用規約", "プライバシーポリシー", "特定商取引法", "Cookie設定"],
  };

  return (
    <footer className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold tracking-widest gold-text mb-1">
              夜伽会
            </div>
            <p className="text-[10px] text-amber-500/70 font-medium tracking-wider mb-2">
              Z李 監修
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              業界の裏を知り尽くした男が選んだ
              <br />
              本物だけのマッチングサービス
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {["𝕏", "IG", "YT"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full border border-[#2a2a2a] flex items-center justify-center text-zinc-600 hover:text-white hover:border-[#3a3a3a] transition-colors text-xs"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-[#1e1e1e] pt-6">
          <p className="text-[10px] text-zinc-700 leading-relaxed mb-3">
            ※ 夜伽会は18歳以上の方を対象としたエンターテイメントマッチングサービスです。
            本サービスはいかなる性的サービスとも無関係であり、健全な社交・エンターテイメントを目的としています。
            サービスは飲食店・ゴルフ場・ホテルロビー等の公共の場でのみご利用いただけます。
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[10px] text-zinc-700">
              © 2024 夜伽会, Inc. All rights reserved. 監修：Z李
            </p>
            <div className="flex gap-4">
              {["利用規約", "プライバシーポリシー"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
