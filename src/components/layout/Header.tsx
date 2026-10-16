"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Search, Flame, Heart, Shuffle } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                FullTime<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Pass</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold ml-1 border border-orange-500/30">.in</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block -mt-0.5">
                India's Desi Timepass Hub 🇮🇳
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-200 hover:text-orange-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#all-tools"
              className="text-sm font-semibold text-slate-200 hover:text-orange-400 transition-colors"
            >
              All 10 Tools
            </Link>
            <Link
              href="/#categories"
              className="text-sm font-semibold text-slate-200 hover:text-orange-400 transition-colors"
            >
              Categories
            </Link>

            {/* Random Tool Surprise Button */}
            <button
              onClick={handleRandomTool}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 hover:border-purple-400 hover:text-white transition-all shadow-sm"
              title="Pick a random timepass tool"
            >
              <Shuffle className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Random Tool</span>
            </button>

            <Link
              href="/#all-tools"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-xl shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Bore Ho Rahe Ho?</span>
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleRandomTool}
              className="p-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20"
              title="Random Tool"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            🏠 Home
          </Link>
          <Link
            href="/#all-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            🎮 All 10 Timepass Tools
          </Link>
          <Link
            href="/#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            🏷️ Categories
          </Link>
          <button
            onClick={handleRandomTool}
            className="w-full text-left px-3 py-2 text-base font-semibold text-purple-300 hover:bg-slate-900 rounded-lg flex items-center justify-between"
          >
            <span>🎲 Surprise Me (Random Tool)</span>
            <Shuffle className="w-4 h-4" />
          </button>
          <div className="pt-2">
            <Link
              href="/#all-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-xl shadow-desi-pop"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Timepass Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
