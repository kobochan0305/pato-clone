import { Zap, MessageSquare, Clock, Calendar } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            2つのサービスで
            <br />
            あなたのニーズに応える
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* PATOCALL */}
          <div className="relative luxury-border rounded-2xl p-8 bg-[#141414] overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-400/8 transition-colors" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5">
                <Zap size={22} className="text-black" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                PATO CALL
              </h3>
              <p className="text-amber-400 text-sm font-medium mb-4">
                最短30分でキャストが来る
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                場所・時間・キャストの条件を指定するだけ。
                最短30分で厳選キャストがあなたのもとへ直行します。
                急な接待や思い立ったその日に対応可能。
              </p>

              <div className="space-y-2 mb-6">
                {[
                  { icon: Clock, text: "最短30分で到着" },
                  { icon: Clock, text: "24時間365日対応" },
                  { icon: Clock, text: "場所指定で呼び出し" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon size={14} className="text-amber-400 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              <button className="w-full gold-gradient text-black font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">
                PATO CALLを使う
              </button>
            </div>
          </div>

          {/* KOPATO */}
          <div className="relative border border-[#2a2a2a] rounded-2xl p-8 bg-[#141414] overflow-hidden group hover:border-zinc-600/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/2 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/3 transition-colors" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center mb-5">
                <MessageSquare size={22} className="text-zinc-300" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                CO-PATO
              </h3>
              <p className="text-zinc-400 text-sm font-medium mb-4">
                メッセージで日程調整
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                気になるキャストに直接メッセージを送り、
                日程・場所・内容を個別に相談して予約。
                お気に入りのキャストと継続的な関係を築けます。
              </p>

              <div className="space-y-2 mb-6">
                {[
                  { icon: MessageSquare, text: "キャストと直接やり取り" },
                  { icon: Calendar, text: "事前日程調整で安心" },
                  { icon: Calendar, text: "リピート利用にも最適" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon size={14} className="text-zinc-500 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#3a3a3a] text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                CO-PATOを使う
              </button>
            </div>
          </div>
        </div>

        {/* Use cases */}
        <div className="mt-10">
          <p className="text-center text-xs text-zinc-500 mb-5 uppercase tracking-widest">
            こんなシーンで使われています
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "ビジネス接待",
              "ゴルフラウンド",
              "クルージング",
              "友人との会食",
              "記念日のディナー",
              "ホテルラウンジ",
              "バー・クラブ",
              "観劇・エンタメ",
            ].map((scene) => (
              <span
                key={scene}
                className="px-4 py-2 rounded-full text-xs text-zinc-400 bg-[#1a1a1a] border border-[#2a2a2a]"
              >
                {scene}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
