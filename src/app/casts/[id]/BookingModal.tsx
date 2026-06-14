"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, Zap, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

type Cast = { id: string; displayName: string; tier: string };

const TIER_POINTS: Record<string, number> = {
  PREMIUM: 4250,
  VIP: 7000,
  ROYAL_VIP: 12500,
};

export default function BookingModal({
  cast,
  type,
  onClose,
}: {
  cast: Cast;
  type: "PATO_CALL" | "CO_PATO";
  onClose: () => void;
}) {
  const router = useRouter();
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const pointsCost = TIER_POINTS[cast.tier];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        castId: cast.id,
        type,
        area,
        note,
        scheduledAt: scheduledAt || undefined,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "エラーが発生しました");
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#141414] luxury-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            {type === "PATO_CALL" ? (
              <Zap size={16} className="text-amber-400" />
            ) : (
              <MessageSquare size={16} className="text-zinc-400" />
            )}
            <h2 className="text-sm font-semibold text-white">
              {type === "PATO_CALL" ? "夜伽CALL" : "御同伴"} 予約
            </h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">予約が完了しました</p>
            <p className="text-xs text-zinc-500">ダッシュボードに移動します...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Cast info */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-zinc-500 text-lg font-light">
                {cast.displayName[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{cast.displayName}</p>
                <p className="text-xs text-amber-400">{pointsCost.toLocaleString()}pt / 30分</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Area */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">
                {type === "PATO_CALL" ? "指定エリア・場所" : "希望エリア"}
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors placeholder-zinc-600"
                placeholder="例: 六本木 / 銀座のレストラン"
              />
            </div>

            {/* Scheduled time for CO-PATO */}
            {type === "CO_PATO" && (
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  希望日時
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            )}

            {/* Note */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">
                備考（任意）
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors placeholder-zinc-600 resize-none"
                placeholder="ご要望があればご記入ください"
              />
            </div>

            {/* Cost */}
            <div className="flex justify-between text-sm border-t border-[#2a2a2a] pt-4">
              <span className="text-zinc-400">消費ポイント</span>
              <span className="text-amber-400 font-semibold">
                {pointsCost.toLocaleString()} pt
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-black font-semibold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  処理中...
                </>
              ) : (
                "予約を確定する"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
