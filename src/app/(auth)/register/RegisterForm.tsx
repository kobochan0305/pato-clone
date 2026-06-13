"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "登録に失敗しました");
      setLoading(false);
      return;
    }

    // Auto login after register
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    router.push("/dashboard");
    router.refresh();
  }

  const passwordStrength =
    form.password.length === 0
      ? 0
      : form.password.length < 6
      ? 1
      : form.password.length < 10
      ? 2
      : 3;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">お名前</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors placeholder-zinc-600"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">
          メールアドレス
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors placeholder-zinc-600"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">パスワード</label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors placeholder-zinc-600 pr-10"
            placeholder="6文字以上"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            onClick={() => setShowPw(!showPw)}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {/* Password strength */}
        {form.password.length > 0 && (
          <div className="flex gap-1 mt-2">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  level <= passwordStrength
                    ? level === 1
                      ? "bg-red-500"
                      : level === 2
                      ? "bg-amber-500"
                      : "bg-green-500"
                    : "bg-[#2a2a2a]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bonus highlight */}
      <div className="flex items-start gap-2.5 bg-amber-900/10 border border-amber-500/20 rounded-xl px-4 py-3">
        <CheckCircle2 size={14} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-400/80">
          登録完了後、<strong className="text-amber-400">12,000ポイント</strong>（¥12,000相当）が自動で付与されます
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full gold-gradient text-black font-semibold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            登録中...
          </>
        ) : (
          "無料で登録する"
        )}
      </button>
    </form>
  );
}
