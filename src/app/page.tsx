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
  Zap,
  Bomb,
  Skull,
  Trophy,
} from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/data/tools";
import ToolCard from "@/components/shared/ToolCard";
import BroCodeTicker from "@/components/shared/BroCodeTicker";
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
    <div className="space-y-10 sm:space-y-14 pb-16 halftone-pattern">
      {/* 1. HERO SECTION WITH FUNKY GRAPHICS */}
      <section className="relative pt-8 sm:pt-12 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Floating Tilted Graphic Stickers */}
        <div className="hidden lg:block absolute top-6 left-6 -rotate-6 animate-floatSlow">
          <span className="funky-tape text-[10px] py-0.5 px-2">
            🔥 100% DESI BAKCHODI
          </span>
        </div>
        <div className="hidden lg:block absolute top-8 right-8 rotate-6 animate-floatSlow" style={{ animationDelay: '1.5s' }}>
          <span className="funky-tape-pink text-[10px] py-0.5 px-2">
            🍻 DIL PE MAT LENA BRO!
          </span>
        </div>
        <div className="hidden sm:block absolute bottom-2 left-10 rotate-3">
          <span className="funky-tape-cyan text-[10px] py-0.5 px-2">
            ⚡ WHATSAPP READY CARDS
          </span>
        </div>
        <div className="hidden sm:block absolute bottom-4 right-12 -rotate-3">
          <span className="funky-tape-green text-[10px] py-0.5 px-2">
            💥 ZERO BORING ADVICE
          </span>
        </div>

        {/* Comic Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-funky-yellow border-2 border-black text-black text-xs font-black shadow-brutal mb-4 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-black text-black" />
          <span>India&apos;s Desi Timepass Hub & Bro Code HQ</span>
        </div>

        {/* Scaled-down Sleek Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Bore ho rahe ho? <br className="hidden sm:inline" />
          <span className="funky-gradient-text drop-shadow-[0_2px_10px_rgba(255,230,0,0.3)]">
            Kuch timepass karte hain!
          </span>
        </h1>

        {/* Scaled-down Subtitle */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Savage friend roasts, red-flag meters, group chat cabinets, rishta market values, and recovery warrants built for your squad&apos;s WhatsApp groups.
        </p>

        {/* Hero CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#all-tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-black bg-funky-yellow hover:bg-yellow-300 border-2 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Explore 10 Timepass Tools</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </a>

          <button
            onClick={handleRandomPick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-black text-white bg-funky-pink hover:bg-pink-600 border-2 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Surprise Me (Random) 🎲</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="sticker-badge bg-slate-900 text-funky-yellow text-[10px] py-1 px-2.5">
            <CheckCircle className="w-3 h-3" />
            <span>100% Free & No Sign-up</span>
          </span>
          <span className="sticker-badge bg-slate-900 text-funky-pink text-[10px] py-1 px-2.5">
            <Bomb className="w-3 h-3" />
            <span>Downloadable PNG Cards</span>
          </span>
          <span className="sticker-badge bg-slate-900 text-funky-neonGreen text-[10px] py-1 px-2.5">
            <Share2 className="w-3 h-3" />
            <span>1-Click WhatsApp Share</span>
          </span>
          <span className="sticker-badge bg-slate-900 text-funky-cyan text-[10px] py-1 px-2.5">
            <ShieldCheck className="w-3 h-3" />
            <span>Zero Annoying Popups</span>
          </span>
        </div>
      </section>

      {/* 2. BRO CODE TICKER MARQUEE */}
      <BroCodeTicker />

      {/* 3. FEATURED TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-5">
          <div>
            <div className="inline-block funky-tape-pink text-[9px] py-0.5 px-2 mb-1">
              VIRAL ON REELS & WHATSAPP
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span>🔥</span>
              <span>Trending Right Now</span>
            </h2>
          </div>
          <a
            href="#all-tools"
            className="text-xs font-black text-funky-yellow hover:text-yellow-300 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All 10 Tools</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR CATEGORIES & SEARCH */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border-3 border-black shadow-brutal">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="funky-tape text-[9px] py-0.5 px-2 mb-1">
                FILTER BY VIBE
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase">
                Categories & Squad Mood
              </h3>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search tools (roast, ex, aukaat)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border-2 border-black text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-funky-yellow shadow-brutal"
              />
            </div>
          </div>

          {/* Neo-brutalist Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all border-2 border-black cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-funky-yellow text-black shadow-brutal"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              ⚡ All 10 Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 border-2 border-black cursor-pointer ${
                  selectedCategory === cat.label
                    ? "bg-funky-pink text-white shadow-brutal"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALL 10 TIMEPASS TOOLS GRID */}
      <section id="all-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="funky-tape-cyan text-[9px] py-0.5 px-2 mb-1">
            THE COMPLETE TIMEPASS ARSENAL
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
            All 10 Timepass Tools ({filteredTools.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Pick a tool, answer funny dilemmas, get an aesthetic card, and fire away on WhatsApp!
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-slate-950 border-3 border-black shadow-brutal">
            <p className="text-lg font-black text-funky-yellow">
              Koi tool nahi mila dost! 🤷‍♂️
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Search term change karo ya category reset karo.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-black bg-funky-yellow text-black border-2 border-black shadow-brutal uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* 6. HOW IT WORKS COMIC STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-3 border-black shadow-brutal text-center relative overflow-hidden">
          <div className="funky-tape text-[9px] py-0.5 px-2 mb-1.5">
            3 SIMPLE STEPS
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-6">
            How FullTimePass Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-900 border-2 border-black shadow-brutal relative">
              <span className="w-8 h-8 rounded-lg bg-funky-yellow text-black font-black text-sm border-2 border-black flex items-center justify-center mb-3 shadow-brutal">
                1
              </span>
              <h3 className="text-sm font-black text-white mb-1 uppercase">
                Pick Your Weapon
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Choose from 10 tools: roast a friend, check your moving-on score, predict wedding kalesh, or issue an udhaar recovery notice.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-900 border-2 border-black shadow-brutal relative">
              <span className="w-8 h-8 rounded-lg bg-funky-pink text-white font-black text-sm border-2 border-black flex items-center justify-center mb-3 shadow-brutal">
                2
              </span>
              <h3 className="text-sm font-black text-white mb-1 uppercase">
                Answer Funny Dilemmas
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Enter your friend&apos;s nickname or pick from hilarious Indian multiple-choice situations about late replies, Swiggy orders, and chai debates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-900 border-2 border-black shadow-brutal relative">
              <span className="w-8 h-8 rounded-lg bg-funky-neonGreen text-black font-black text-sm border-2 border-black flex items-center justify-center mb-3 shadow-brutal">
                3
              </span>
              <h3 className="text-sm font-black text-white mb-1 uppercase">
                Blast on WhatsApp
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Get an instant, high-resolution aesthetic result card. Download as PNG with one click or blast it directly into your squad&apos;s WhatsApp groups!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
