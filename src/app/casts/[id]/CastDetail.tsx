"use client";

import { useState } from "react";
import { Star, MapPin, ArrowLeft, Zap, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import BookingModal from "./BookingModal";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  reviewer: { name: string | null };
};

type Cast = {
  id: string;
  displayName: string;
  age: number;
  bio: string;
  area: string;
  tier: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  photos: string;
  reviewsReceived: Review[];
};

const TIER_LABEL: Record<string, string> = {
  PREMIUM: "プレミアム",
  VIP: "VIP",
  ROYAL_VIP: "ロイヤルVIP",
};

const TIER_PRICE: Record<string, { half: string; points: number }> = {
  PREMIUM: { half: "¥5,100", points: 4250 },
  VIP: { half: "¥8,400", points: 7000 },
  ROYAL_VIP: { half: "¥15,000", points: 12500 },
};

export default function CastDetail({ cast }: { cast: Cast }) {
  const [bookingType, setBookingType] = useState<"PATO_CALL" | "CO_PATO" | null>(null);
  const price = TIER_PRICE[cast.tier];

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Header */}
        <div className="border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/casts" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <a href="/" className="text-xl font-bold tracking-widest gold-text">
            夜伽会
          </a>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Profile header */}
          <div className="flex gap-6 mb-8">
            {/* Photo */}
            <div className="w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden shrink-0 luxury-border bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]">
              {(() => {
                const first = JSON.parse(cast.photos ?? "[]")[0];
                return first ? (
                  <img src={first} alt={cast.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-light text-zinc-500">{cast.displayName[0]}</span>
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 min-w-0">
              {/* Tier badge */}
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block mb-2 ${
                cast.tier === "ROYAL_VIP"
                  ? "text-purple-300 bg-purple-900/30"
                  : cast.tier === "VIP"
                  ? "text-amber-400 bg-amber-900/30"
                  : "text-zinc-400 bg-zinc-800"
              }`}>
                {TIER_LABEL[cast.tier]}
              </span>

              <h1 className="text-2xl font-bold text-white mb-1">{cast.displayName}</h1>

              <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                <span>{cast.age}歳</span>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {cast.area}
                </div>
                {cast.available && (
                  <div className="flex items-center gap-1 text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>対応可</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= Math.round(cast.rating) ? "text-amber-400 fill-amber-400" : "text-zinc-600"}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">{cast.rating}</span>
                <span className="text-xs text-zinc-500">({cast.reviewCount}件)</span>
              </div>

              {/* Price */}
              <div className="text-sm text-zinc-400">
                <span className="gold-text font-bold text-base">{price.half}</span>
                <span className="text-xs ml-1">/ 30分</span>
                <span className="text-xs text-zinc-600 ml-2">({price.points}pt)</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="dark-card rounded-2xl p-5 mb-5">
            <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">プロフィール</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">{cast.bio}</p>
          </div>

          {/* Booking CTAs */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setBookingType("PATO_CALL")}
              disabled={!cast.available}
              className="flex items-center gap-3 gold-gradient text-black font-semibold px-5 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Zap size={18} />
              <div className="text-left">
                <div className="text-sm font-bold">夜伽CALLで呼ぶ</div>
                <div className="text-xs font-normal opacity-70">最短30分で到着</div>
              </div>
            </button>

            <button
              onClick={() => setBookingType("CO_PATO")}
              className="flex items-center gap-3 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#3a3a3a] text-white font-semibold px-5 py-4 rounded-xl transition-colors"
            >
              <MessageSquare size={18} className="text-zinc-400" />
              <div className="text-left">
                <div className="text-sm font-bold">御同伴でメッセージ</div>
                <div className="text-xs font-normal text-zinc-500">日程を事前調整</div>
              </div>
            </button>
          </div>

          {/* Safety notes */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["年齢確認済み", "本名非公開", "24hサポート"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-zinc-500">
                <CheckCircle2 size={12} className="text-amber-400" />
                {item}
              </div>
            ))}
          </div>

          {/* Reviews */}
          {cast.reviewsReceived.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-white mb-4">
                レビュー ({cast.reviewsReceived.length}件)
              </h2>
              <div className="space-y-3">
                {cast.reviewsReceived.map((r) => (
                  <div key={r.id} className="dark-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={11}
                            className={s <= r.rating ? "text-amber-400 fill-amber-400" : "text-zinc-600"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">
                        {r.reviewer.name ?? "匿名"}
                      </span>
                    </div>
                    {r.comment && (
                      <p className="text-sm text-zinc-400">{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingType && (
        <BookingModal
          cast={cast}
          type={bookingType}
          onClose={() => setBookingType(null)}
        />
      )}
    </>
  );
}
