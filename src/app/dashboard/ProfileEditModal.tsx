"use client";

import { useState, useRef } from "react";
import { X, Camera, User, Check } from "lucide-react";

type Gender = "MALE" | "FEMALE" | "UNSET";

type Props = {
  initialName: string | null;
  initialGender: Gender;
  initialImage: string | null;
  onClose: () => void;
  onSave: (data: { name: string; gender: Gender; image: string }) => void;
};

export default function ProfileEditModal({
  initialName,
  initialGender,
  initialImage,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName ?? "");
  const [gender, setGender] = useState<Gender>(initialGender);
  const [image, setImage] = useState(initialImage ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      setError("ニックネームを入力してください");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), gender, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("保存に失敗しました");
      onSave({ name: data.name, gender: data.gender, image: data.image ?? "" });
    } catch {
      setError("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">プロフィール編集</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Photo */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] overflow-hidden flex items-center justify-center">
              {image ? (
                <img src={image} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-zinc-600" />
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full gold-gradient flex items-center justify-center border-2 border-[#141414] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Camera size={13} className="text-black" />
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploading && <p className="text-xs text-zinc-500">アップロード中...</p>}
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">ニックネーム</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            placeholder="ニックネームを入力"
            className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">性別</label>
          <div className="grid grid-cols-3 gap-2">
            {(["MALE", "FEMALE", "UNSET"] as Gender[]).map((g) => {
              const labels = { MALE: "男性", FEMALE: "女性", UNSET: "未設定" };
              const selected = gender === g;
              return (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    selected
                      ? "border-amber-500/60 bg-amber-500/10 text-amber-400"
                      : "border-[#2a2a2a] bg-[#1e1e1e] text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {selected && <Check size={12} />}
                  {labels[g]}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="w-full gold-gradient text-black font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "保存中..." : "保存する"}
        </button>
      </div>
    </div>
  );
}
