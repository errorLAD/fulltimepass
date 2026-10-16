"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  ArrowRight,
  Shuffle,
  Share2,
  Smile,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/data/tools";
import ToolCard from "@/components/shared/ToolCard";
import { ToolCategory } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter tools
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTools = TOOLS.filter((t) => t.featured);

  const handleRandomPick = () => {
    const random = getRandomItem(TOOLS);
    router.push(`/${random.slug}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Decorative ambient glowing circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-orange-500/15 via-pink-500/10 to-yellow-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Small Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/10 mb-6">
          <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
          <span>India&apos;s #1 Desi Timepass & Entertainment Hub</span>
        </div>

        {/* Big Catchy Desi Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] sm:leading-[1.15]">
          Bore ho rahe ho?{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500">
            Kuch timepass karte hain!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          10 savage roasts, red-flag meters, group chat cabinets, rishta value calculators, and recovery notices made for Indian friend groups, couples & WhatsApp squads.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#all-tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Explore 10 Timepass Tools</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <button
            onClick={handleRandomPick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-slate-600 transition-all shadow-sm"
          >
            <Shuffle className="w-5 h-5 text-purple-400" />
            <span>Surprise Me (Random Tool)</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>100% Free & No Sign-up</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-orange-400" />
            <span>WhatsApp Ready Cards</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-amber-400" />
            <span>Pure Desi Hinglish Comedy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Zero Annoying Popups</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              🔥 Most Viral
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Trending Right Now
            </h2>
          </div>
          <a
            href="#all-tools"
            className="text-xs sm:text-sm font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES & SEARCH FILTER */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Pick Your Vibe
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Popular Categories
              </h3>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search tools (e.g. roast, ex, shaadi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === "All"
                  ? "bg-orange-500 text-slate-950 shadow-desi-pop-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              ⚡ All 10 Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.label
                    ? "bg-orange-500 text-slate-950 shadow-desi-pop-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ALL 10 TIMEPASS TOOLS GRID */}
      <section id="all-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Full Desi Catalog
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            All 10 Timepass Tools ({filteredTools.length})
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Pick a tool, answer hilarious questions, generate your custom card, and share the drama!
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-lg font-bold text-slate-300">
              Koi tool nahi mila dost! 🤷‍♂️
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Search query clear karo ya category change karo.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 text-slate-950"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-center relative overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Super Simple Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-10">
            How FullTimePass Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <span className="w-10 h-10 rounded-xl bg-orange-500 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-desi-pop-sm">
                1
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Choose Your Weapon
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick from 10 handcrafted desi tools: roast a friend, check your moving-on score, predict wedding kalesh, or generate group chat roles.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <span className="w-10 h-10 rounded-xl bg-pink-500 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-desi-pop-sm">
                2
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Answer Desi Questions
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill in funny inputs or answer 3-6 relatable multiple-choice questions about your daily habits, spending, and lifestyle choices.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <span className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center mb-4 shadow-desi-pop-sm">
                3
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Download & Share on WhatsApp
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get an instant, high-resolution aesthetic result card. Download as PNG with one click or blast it directly into your WhatsApp groups!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
