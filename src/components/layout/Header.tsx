"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Shuffle, Flame } from "lucide-react";
import { TOOLS } from "@/lib/data/tools";
import { getRandomItem } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();

  const handleRandomTool = () => {
    const randomTool = getRandomItem(TOOLS);
    router.push(`/${randomTool.slug}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 border-b border-slate-200/90 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sleek Modern Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                FULLTIME<span className="text-amber-500">PASS</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">.in</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t("nav.home", "Home")}
            </Link>
            <Link
              href="/#all-tools"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t("nav.allTools", "All 20 Tools")}
            </Link>
            <Link
              href="/#categories"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t("nav.categories", "Categories")}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher variant="pill" />

            {/* Random Tool Button */}
            <button
              onClick={handleRandomTool}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-semibold text-slate-800 transition-all cursor-pointer"
              title="Pick a random timepass tool"
            >
              <Shuffle className="w-4 h-4 text-amber-600" />
              <span>{t("nav.surpriseMe", "Surprise Me 🎲")}</span>
            </button>

            {/* Main Action Button */}
            <Link
              href="/#all-tools"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-xl shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{t("nav.explore", "Explore 20 Tools")}</span>
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher variant="compact" />

            <button
              onClick={handleRandomTool}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-amber-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Surprise Me - Random Tool"
              aria-label="Pick Random Tool"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 p-4 space-y-2 text-sm font-bold shadow-lg">
          <div className="pb-2 flex items-center justify-between">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Select Language:</span>
            <LanguageSwitcher variant="pill" />
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100"
          >
            🏠 {t("nav.home", "Home")}
          </Link>
          <Link
            href="/#all-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100"
          >
            🎮 {language === "hi" ? "All 20 Desi Tools" : "All 20 Comedy Tools"}
          </Link>
          <Link
            href="/#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100"
          >
            🏷️ {t("nav.categories", "Categories")}
          </Link>
          <button
            onClick={handleRandomTool}
            className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 flex items-center justify-between"
          >
            <span>🎲 {t("nav.surpriseMe", "Surprise Me (Random Tool)")}</span>
            <Shuffle className="w-4 h-4" />
          </button>
          <div className="pt-2">
            <Link
              href="/#all-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-slate-950 font-bold text-sm sm:text-base bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{t("nav.explore", "Explore All 20 Tools")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
