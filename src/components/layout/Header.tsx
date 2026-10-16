"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Shuffle, Flame, Zap, Trophy } from "lucide-react";
import { TOOLS } from "@/lib/data/tools";
import { getRandomItem } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleRandomTool = () => {
    const randomTool = getRandomItem(TOOLS);
    router.push(`/${randomTool.slug}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 border-b-4 border-black backdrop-blur-md shadow-brutal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Funky Comic Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-funky-yellow border-3 border-black p-1 shadow-brutal group-hover:rotate-6 group-hover:scale-105 transition-all flex items-center justify-center">
              <Flame className="w-7 h-7 text-black fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-white">
                  FULLTIME<span className="text-funky-yellow">PASS</span>
                </span>
                <span className="funky-tape text-[9px] -rotate-3">
                  .IN
                </span>
              </div>
              <p className="text-[10px] text-funky-neonGreen font-black tracking-widest uppercase hidden sm:block">
                ⚡ BRO CODE & TIMEPASS HQ
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border-2 border-black text-[11px] font-black text-funky-neonGreen shadow-brutal">
              <span className="w-2 h-2 rounded-full bg-funky-neonGreen animate-ping" />
              <span>BAKCHODI MODE: ON</span>
            </div>

            <Link
              href="/"
              className="text-xs font-black uppercase tracking-wider text-slate-200 hover:text-funky-yellow transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#all-tools"
              className="text-xs font-black uppercase tracking-wider text-slate-200 hover:text-funky-yellow transition-colors"
            >
              10 Tools
            </Link>
            <Link
              href="/#categories"
              className="text-xs font-black uppercase tracking-wider text-slate-200 hover:text-funky-yellow transition-colors"
            >
              Categories
            </Link>

            {/* Random Tool Button */}
            <button
              onClick={handleRandomTool}
              className="sticker-badge bg-funky-pink text-white hover:bg-pink-500 cursor-pointer"
              title="Pick a random timepass tool"
            >
              <Shuffle className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
              <span>SURPRISE ME 🎲</span>
            </button>

            {/* Main Action Button */}
            <Link
              href="/#all-tools"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black text-black bg-funky-yellow hover:bg-yellow-300 border-3 border-black rounded-xl shadow-brutal hover:shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-black fill-black" />
              <span>BORE HO RAHE HO?</span>
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={handleRandomTool}
              className="p-2 rounded-xl bg-funky-pink border-2 border-black text-white shadow-brutal"
              title="Random Tool"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-funky-yellow border-2 border-black text-black shadow-brutal"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-3 border-black bg-slate-950 p-4 space-y-3 font-black text-sm uppercase">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl bg-slate-900 border-2 border-black text-white hover:bg-slate-800"
          >
            🏠 Home
          </Link>
          <Link
            href="/#all-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl bg-slate-900 border-2 border-black text-white hover:bg-slate-800"
          >
            🎮 10 Funky Desi Tools
          </Link>
          <Link
            href="/#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl bg-slate-900 border-2 border-black text-white hover:bg-slate-800"
          >
            🏷️ Categories
          </Link>
          <button
            onClick={handleRandomTool}
            className="w-full text-left p-3 rounded-xl bg-funky-pink text-white border-2 border-black shadow-brutal flex items-center justify-between"
          >
            <span>🎲 Surprise Me (Random Tool)</span>
            <Shuffle className="w-4 h-4" />
          </button>
          <div className="pt-2">
            <Link
              href="/#all-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-black bg-funky-yellow border-3 border-black rounded-xl shadow-brutal"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Explore Timepass Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
