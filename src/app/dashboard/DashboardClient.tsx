"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Coins, Calendar, Star, LogOut, Zap, MessageSquare, Clock, CheckCircle2, XCircle, Pencil, User } from "lucide-react";
import Link from "next/link";
import ProfileEditModal from "./ProfileEditModal";

type PointTx = {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
};

type Gender = "MALE" | "FEMALE" | "UNSET";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  gender: Gender;
  points: number;
  grade: number;
  role: string;
  createdAt: string;
  pointTxs: PointTx[];
};

type Booking = {
  id: string;
  type: string;
  status: string;
  pointsCost: number;
  area: string | null;
  scheduledAt: string | null;
  createdAt: string;
  cast: { displayName: string; tier: string; area: string };
};

const STATUS_LABEL: Record<string, { label: string; color: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  PENDING: { label: "待機中", color: "text-amber-400", icon: Clock },
  ACCEPTED: { label: "確定", color: "text-green-400", icon: CheckCircle2 },
  ACTIVE: { label: "進行中", color: "text-blue-400", icon: Zap },
  COMPLETED: { label: "完了", color: "text-zinc-400", icon: CheckCircle2 },
  CANCELLED: { label: "キャンセル", color: "text-red-400", icon: XCircle },
};

const GRADE_NAMES = ["", "スタンダード", "シルバー", "ゴールド", "プラチナ", "ダイヤモンド"];

const GENDER_LABELS: Record<Gender, string> = {
  MALE: "男性",
  FEMALE: "女性",
  UNSET: "未設定",
};

export default function DashboardClient({
  user,
  bookings,
}: {
  user: User;
  bookings: Booking[];
}) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profileGender, setProfileGender] = useState<Gender>(user.gender);
  const [profileImage, setProfileImage] = useState(user.image);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {editingProfile && (
        <ProfileEditModal
          initialName={profileName}
          initialGender={profileGender}
          initialImage={profileImage}
          onClose={() => setEditingProfile(false)}
          onSave={(data) => {
            setProfileName(data.name);
            setProfileGender(data.gender);
            setProfileImage(data.image || null);
            setEditingProfile(false);
          }}
        />
      )}
      {/* Header */}
      <div className="border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-widest gold-text">
          pato
        </a>
        <div className="flex items-center gap-3">
          <Link href="/casts" className="text-xs text-zinc-400 hover:text-white transition-colors">
            キャスト一覧
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <LogOut size={14} />
            ログアウト
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Welcome */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] overflow-hidden flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={22} className="text-zinc-600" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">
                  {profileName ?? "ゲスト"}さん
                </h1>
                <button
                  onClick={() => setEditingProfile(true)}
                  className="text-zinc-500 hover:text-amber-400 transition-colors"
                  title="プロフィール編集"
                >
                  <Pencil size={13} />
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {GRADE_NAMES[user.grade] ?? "スタンダード"}会員 · {GENDER_LABELS[profileGender]}
              </p>
            </div>
          </div>
          <Link
            href="/casts"
            className="gold-gradient text-black font-semibold text-xs px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity shrink-0"
          >
            キャストを探す
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="dark-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins size={16} className="text-amber-400" />
              <span className="text-xs text-zinc-500">保有ポイント</span>
            </div>
            <div className="text-2xl font-bold gold-text">
              {user.points.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-600 mt-0.5">pt</div>
          </div>

          <div className="dark-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-zinc-400" />
              <span className="text-xs text-zinc-500">利用回数</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {bookings.filter((b) => b.status === "COMPLETED").length}
            </div>
            <div className="text-xs text-zinc-600 mt-0.5">回</div>
          </div>

          <div className="dark-card rounded-2xl p-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-amber-400" />
              <span className="text-xs text-zinc-500">グレード</span>
            </div>
            <div className="text-base font-bold text-white">
              {GRADE_NAMES[user.grade]}
            </div>
            <div className="text-xs text-zinc-600 mt-0.5">Lv.{user.grade}</div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/casts?type=PATO_CALL"
            className="flex items-center gap-3 luxury-border bg-[#141414] rounded-2xl p-4 hover:border-amber-500/40 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shrink-0">
              <Zap size={18} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">PATO CALL</p>
              <p className="text-xs text-zinc-500">最短30分でキャストを呼ぶ</p>
            </div>
          </Link>

          <Link
            href="/casts"
            className="flex items-center gap-3 border border-[#2a2a2a] bg-[#141414] rounded-2xl p-4 hover:border-zinc-600 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center shrink-0">
              <MessageSquare size={18} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">CO-PATO</p>
              <p className="text-xs text-zinc-500">日程を調整して予約</p>
            </div>
          </Link>
        </div>

        {/* Recent bookings */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-4">予約履歴</h2>
          {bookings.length === 0 ? (
            <div className="dark-card rounded-2xl p-8 text-center">
              <p className="text-zinc-500 text-sm mb-4">まだ予約がありません</p>
              <Link
                href="/casts"
                className="gold-gradient text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity inline-block"
              >
                キャストを探す
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => {
                const statusInfo = STATUS_LABEL[booking.status] ?? STATUS_LABEL.PENDING;
                const StatusIcon = statusInfo.icon;
                return (
                  <div key={booking.id} className="dark-card rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#2a2a2a] flex items-center justify-center shrink-0">
                      {booking.type === "PATO_CALL" ? (
                        <Zap size={15} className="text-amber-400" />
                      ) : (
                        <MessageSquare size={15} className="text-zinc-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-white">
                          {booking.cast.displayName}
                        </span>
                        <span className={`text-xs flex items-center gap-0.5 ${statusInfo.color}`}>
                          <StatusIcon size={11} />
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {booking.area} ·{" "}
                        {new Date(booking.createdAt).toLocaleDateString("ja-JP")}
                      </div>
                    </div>
                    <div className="text-xs text-amber-400 font-medium shrink-0">
                      -{booking.pointsCost.toLocaleString()}pt
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Point history */}
        {user.pointTxs.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">ポイント履歴</h2>
            <div className="dark-card rounded-2xl divide-y divide-[#1e1e1e]">
              {user.pointTxs.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-zinc-300">{tx.description}</p>
                    <p className="text-xs text-zinc-600">
                      {new Date(tx.createdAt).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      tx.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount.toLocaleString()}pt
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
