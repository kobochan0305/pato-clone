"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, MapPin, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";

type Cast = {
  id: string;
  displayName: string;
  age: number;
  area: string;
  tier: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  bio: string;
};

const AREAS = ["all", "東京", "大阪", "名古屋", "横浜", "福岡"];
const TIERS = ["all", "PREMIUM", "VIP", "ROYAL_VIP"];
const TIER_LABEL: Record<string, string> = {
  all: "すべて",
  PREMIUM: "プレミアム",
  VIP: "VIP",
  ROYAL_VIP: "ロイヤルVIP",
};
const TIER_COLOR: Record<string, string> = {
  PREMIUM: "text-zinc-400 bg-zinc-800",
  VIP: "text-amber-400 bg-amber-900/30",
  ROYAL_VIP: "text-purple-300 bg-purple-900/30",
};

export default function CastList() {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [area, setArea] = useState("all");
  const [tier, setTier] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (area !== "all") params.set("area", area);
    if (tier !== "all") params.set("tier", tier);

    const res = await fetch(`/api/casts?${params}`);
    const data = await res.json();
    setCasts(data.casts);
    setTotal(data.total);
    setPages(data.pages);
    setLoading(false);
  }, [page, area, tier]);

  useEffect(() => { load(); }, [load]);

  function handleFilter(newArea: string, newTier: string) {
    setArea(newArea);
    setTier(newTier);
    setPage(1);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Area filter */}
        <div className="flex items-center gap-2 bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-2">
          <MapPin size={14} className="text-zinc-500" />
          <select
            value={area}
            onChange={(e) => handleFilter(e.target.value, tier)}
            className="bg-transparent text-sm text-zinc-300 outline-none cursor-pointer"
          >
            {AREAS.map((a) => (
              <option key={a} value={a} className="bg-[#1a1a1a]">
                {a === "all" ? "エリアすべて" : a}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="text-zinc-500" />
        </div>

        {/* Tier filter */}
        <div className="flex items-center gap-2 bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-2">
          <Filter size={14} className="text-zinc-500" />
          <select
            value={tier}
            onChange={(e) => handleFilter(area, e.target.value)}
            className="bg-transparent text-sm text-zinc-300 outline-none cursor-pointer"
          >
            {TIERS.map((t) => (
              <option key={t} value={t} className="bg-[#1a1a1a]">
                {TIER_LABEL[t]}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="text-zinc-500" />
        </div>

        <span className="text-xs text-zinc-500 self-center ml-auto">
          {total}名在籍
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="dark-card rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-[#1e1e1e]" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-[#2a2a2a] rounded w-2/3" />
                <div className="h-3 bg-[#2a2a2a] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {casts.map((cast) => (
            <Link
              key={cast.id}
              href={`/casts/${cast.id}`}
              className="dark-card rounded-2xl overflow-hidden group hover:border-amber-500/20 transition-all duration-300 cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-light text-zinc-600">
                    {cast.displayName[0]}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${TIER_COLOR[cast.tier]}`}>
                    {TIER_LABEL[cast.tier]}
                  </span>
                </div>
                {cast.available && (
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400">対応可</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs font-medium">{cast.rating}</span>
                  <span className="text-zinc-400 text-xs">({cast.reviewCount})</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white">{cast.displayName}</h3>
                  <span className="text-xs text-zinc-500">{cast.age}歳</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500 mb-2">
                  <MapPin size={11} />
                  {cast.area}
                </div>
                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {cast.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                page === i + 1
                  ? "gold-gradient text-black"
                  : "bg-[#1a1a1a] text-zinc-400 hover:bg-[#2a2a2a]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
