import CastList from "./CastList";

export const metadata = { title: "キャスト一覧 | pato" };

export default function CastsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-widest gold-text">
          pato
        </a>
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-xs text-zinc-400 hover:text-white transition-colors">
            マイページ
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">キャスト一覧</h1>
          <p className="text-zinc-500 text-sm">採用率10%の審査を通過したプレミアムキャスト</p>
        </div>
        <CastList />
      </div>
    </div>
  );
}
