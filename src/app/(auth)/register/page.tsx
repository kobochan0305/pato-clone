import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold tracking-widest gold-text">
            pato
          </a>
          <p className="text-zinc-500 text-sm mt-2">無料で新規登録</p>
          <div className="inline-flex items-center gap-2 mt-3 bg-amber-900/20 border border-amber-500/30 rounded-full px-4 py-1.5">
            <span className="text-xs text-amber-400">
              登録で¥12,000クーポンプレゼント
            </span>
          </div>
        </div>

        <RegisterForm />

        <p className="text-center text-xs text-zinc-600 mt-6">
          既にアカウントをお持ちの方は{" "}
          <a href="/login" className="text-amber-400 hover:underline">
            ログイン
          </a>
        </p>

        <p className="text-center text-[10px] text-zinc-700 mt-4 leading-relaxed">
          登録することで
          <a href="#" className="underline">利用規約</a>と
          <a href="#" className="underline">プライバシーポリシー</a>に同意したものとみなします。
          18歳未満の方はご利用いただけません。
        </p>
      </div>
    </div>
  );
}
