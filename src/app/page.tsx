"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shuffle,
  Share2,
  CheckCircle,
  Zap,
} from "lucide-react";
import { getLocalizedTools, getLocalizedCategories } from "@/lib/data/tools";
import ToolCard from "@/components/shared/ToolCard";
import BroCodeTicker from "@/components/shared/BroCodeTicker";
import { ToolCategory } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { language, t } = useLanguage();

  const allTools = getLocalizedTools(language);
  const categories = getLocalizedCategories(language);

  // Filter tools
  const filteredTools = allTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTools = allTools.filter((t) => t.featured);

  const handleRandomPick = () => {
    const random = getRandomItem(allTools);
    router.push(`/${random.slug}`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 ambient-glow">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Clean Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs mb-6">
          <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>{t("hero.badge")}</span>
        </div>

        {/* Clean Modern Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2]">
          {t("hero.title1")} <br className="hidden sm:inline" />
          <span className="funky-gradient-text">
            {t("hero.title2")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          {/* Treat Kaun Dega? Roulette Button */}
          <Link
            href="/treat-roulette"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[44px]"
          >
            <span className="text-base">🎡</span>
            <span>{t("hero.rouletteCta")}</span>
          </Link>

          {/* Udhaar Recovery Notice Button */}
          <Link
            href="/udhaar-recovery-notice"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[44px]"
          >
            <span className="text-base">📜</span>
            <span>{t("hero.udhaarCta")}</span>
          </Link>

          {/* Explore All 20 Tools Button */}
          <a
            href="#all-tools"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>{t("hero.exploreCta")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Surprise Me Button */}
          <button
            onClick={handleRandomPick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all cursor-pointer text-center min-h-[44px]"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t("nav.surpriseMe")}</span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === "en" ? "100% Free & No Sign-up" : "100% Free & No Sign-up"}</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
            <Share2 className="w-4 h-4 text-pink-600" />
            <span>{language === "en" ? "1-Click Instant Share" : "1-Click WhatsApp Share"}</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{language === "en" ? "Downloadable PNG Cards" : "Downloadable PNG Cards"}</span>
          </span>
        </div>
      </section>

      {/* 2. BRO CODE TICKER MARQUEE */}
      <BroCodeTicker />

      {/* 3. FEATURED TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {language === "en" ? "Viral on Socials & WhatsApp" : "Viral on WhatsApp & Reels"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-1">
              <span>🔥</span>
              <span>{language === "en" ? "Trending Right Now" : "Trending Right Now"}</span>
            </h2>
          </div>
          <a
            href="#all-tools"
            className="text-sm font-semibold text-slate-600 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
          >
            <span>{language === "en" ? "View All 20 Tools" : "View All 20 Tools"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR CATEGORIES & SEARCH */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {language === "en" ? "Filter By Vibe" : "Filter By Vibe"}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {language === "en" ? "Categories & Squad Mood" : "Categories & Squad Mood"}
              </h3>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder={t("filter.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-normal text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Clean Category Pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-xs font-bold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              ⚡ {language === "en" ? "All 20 Tools" : "All 20 Tools"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.label
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-xs font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALL 20 TIMEPASS TOOLS GRID */}
      <section id="all-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            {language === "en" ? "The Complete Comedy Arsenal" : "The Complete Timepass Arsenal"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            {language === "en" ? `All 20 Tools (${filteredTools.length})` : `All 20 Timepass Tools (${filteredTools.length})`}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
            {language === "en"
              ? "Pick a tool, answer funny dilemmas, get an aesthetic card, and fire away with your squad!"
              : "Pick a tool, answer funny dilemmas, get an aesthetic card, and fire away on WhatsApp!"}
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-4xl mb-3">🧐</p>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t("filter.noResults")}
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              {language === "en" ? "Change your search term or reset the category filter." : "Search term change karo ya category reset karo."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 cursor-pointer"
            >
              {language === "en" ? "Reset Filters" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-xs">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            {language === "en" ? "3 Simple Steps" : "3 Simple Steps"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8 mt-1.5">
            {language === "en" ? "How FullTimePass Works" : "How FullTimePass Works"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-bold text-base flex items-center justify-center mb-4 shadow-xs">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {language === "en" ? "Pick Your Tool" : "Pick Your Weapon"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {language === "en"
                  ? "Choose from 20 tools: roast a friend, check your moving-on score, spin the treat roulette, or issue an official debt recovery notice."
                  : "Choose from 20 tools: roast a friend, check your moving-on score, spin the treat roulette, or issue an udhaar recovery notice."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-9 h-9 rounded-xl bg-rose-500 text-white font-bold text-base flex items-center justify-center mb-4 shadow-xs">
                2
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {language === "en" ? "Answer Funny Dilemmas" : "Answer Funny Dilemmas"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {language === "en"
                  ? "Enter your friend's name or choose from hilarious relatable situations about delayed replies, coffee addictions, and procrastination."
                  : "Enter your friend's nickname or pick from hilarious Indian multiple-choice situations about late replies, Swiggy orders, and chai debates."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-bold text-base flex items-center justify-center mb-4 shadow-xs">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {language === "en" ? "Share the Laughs" : "Blast on WhatsApp"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {language === "en"
                  ? "Get an instant, high-resolution aesthetic result card. Download as PNG with one click or share it directly into your squad group chats!"
                  : "Get an instant, high-resolution aesthetic result card. Download as PNG with one click or blast it directly into your squad's WhatsApp groups!"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
