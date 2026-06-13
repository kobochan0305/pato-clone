"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-widest gold-text">
            pato
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#services" className="hover:text-white transition-colors">
            サービス
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            使い方
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            料金
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            よくある質問
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
            ログイン
          </a>
          <a href="/register" className="gold-gradient text-black font-semibold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
            無料登録
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-[#2a2a2a] px-4 py-4 space-y-3">
          {["サービス", "使い方", "料金", "よくある質問"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-zinc-400 hover:text-white py-2 border-b border-[#2a2a2a] text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="/register" className="block w-full gold-gradient text-black font-semibold text-sm px-5 py-3 rounded-full mt-2 text-center">
            無料登録する
          </a>
        </div>
      )}
    </header>
  );
}
