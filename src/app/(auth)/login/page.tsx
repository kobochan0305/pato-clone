import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold tracking-widest gold-text">
            pato
          </a>
          <p className="text-zinc-500 text-sm mt-2">アカウントにログイン</p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-zinc-600 mt-6">
          アカウントをお持ちでない方は{" "}
          <a href="/register" className="text-amber-400 hover:underline">
            新規登録
          </a>
        </p>
      </div>
    </div>
  );
}
