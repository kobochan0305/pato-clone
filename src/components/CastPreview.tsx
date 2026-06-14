import { Star, MapPin } from "lucide-react";

const casts = [
  { name: "Ai",     age: 24, area: "東京",  type: "プレミアム",  score: 4.9, count: 213, photo: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Haruka", age: 27, area: "東京",  type: "VIP",        score: 4.8, count: 187, photo: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Mio",    age: 22, area: "大阪",  type: "プレミアム",  score: 4.9, count: 145, photo: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Saki",   age: 26, area: "東京",  type: "ロイヤルVIP", score: 5.0, count: 98,  photo: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Nana",   age: 23, area: "名古屋", type: "プレミアム", score: 4.7, count: 162, photo: "https://randomuser.me/api/portraits/women/5.jpg" },
  { name: "Rina",   age: 25, area: "東京",  type: "VIP",        score: 4.8, count: 201, photo: "https://randomuser.me/api/portraits/women/6.jpg" },
];

const typeColor: Record<string, string> = {
  "プレミアム": "text-zinc-400 bg-zinc-800",
  "VIP": "text-amber-400 bg-amber-900/30",
  "ロイヤルVIP": "text-purple-300 bg-purple-900/30",
};

export default function CastPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3">
            Our Casts
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            厳選された
            <br />
            プレミアムキャスト
          </h2>
          <p className="text-zinc-500 text-sm">
            採用率10%の審査を通過した、15,000名以上のキャストが在籍。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {casts.map((cast, i) => (
            <div
              key={i}
              className="dark-card rounded-2xl overflow-hidden group hover:border-amber-500/20 transition-all duration-300 cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] overflow-hidden">
                <img src={cast.photo} alt={cast.name} className="absolute inset-0 w-full h-full object-cover" />

                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColor[cast.type]}`}>
                    {cast.type}
                  </span>
                </div>

                {/* Blur overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs font-medium">{cast.score}</span>
                  <span className="text-zinc-400 text-xs">({cast.count})</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white">{cast.name}</h3>
                  <span className="text-xs text-zinc-500">{cast.age}歳</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin size={11} />
                  {cast.area}エリア
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border border-[#3a3a3a] hover:border-amber-500/30 text-zinc-400 hover:text-white font-medium px-8 py-3 rounded-full text-sm transition-all">
            すべてのキャストを見る →
          </button>
        </div>
      </div>
    </section>
  );
}
