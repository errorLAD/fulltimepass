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
    <div className="space-y-12 sm:space-y-16 pb-16 halftone-pattern">
      {/* 1. HERO SECTION WITH FUNKY GRAPHICS */}
      <section className="relative pt-10 sm:pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Floating Tilted Graphic Stickers */}
        <div className="hidden lg:block absolute top-8 left-6 -rotate-6 animate-floatSlow">
          <span className="funky-tape text-xs">
            🔥 100% DESI BAKCHODI
          </span>
        </div>
        <div className="hidden lg:block absolute top-12 right-8 rotate-6 animate-floatSlow" style={{ animationDelay: '1.5s' }}>
          <span className="funky-tape-pink text-xs">
            🍻 DIL PE MAT LENA BRO!
          </span>
        </div>
        <div className="hidden sm:block absolute bottom-4 left-12 rotate-3">
          <span className="funky-tape-cyan text-xs">
            ⚡ WHATSAPP READY CARDS
          </span>
        </div>
        <div className="hidden sm:block absolute bottom-8 right-14 -rotate-3">
          <span className="funky-tape-green text-xs">
            💥 ZERO BORING ADVICE
          </span>
        </div>

        {/* Comic Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-funky-yellow border-3 border-black text-black text-xs sm:text-sm font-black shadow-brutal mb-6 uppercase tracking-wider">
          <Zap className="w-4 h-4 fill-black text-black" />
          <span>India&apos;s Desi Timepass Hub & Bro Code HQ</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white max-w-5xl mx-auto leading-[1.05]">
          Bore ho rahe ho? <br className="hidden sm:inline" />
          <span className="funky-gradient-text drop-shadow-[0_4px_16px_rgba(255,230,0,0.4)]">
            Kuch timepass karte hain!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg md:text-xl text-slate-300 font-bold max-w-3xl mx-auto leading-relaxed">
          Savage friend roasts, red-flag meters, group chat cabinets, rishta market values, and recovery warrants built for your squad&apos;s WhatsApp groups.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#all-tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-black text-black bg-funky-yellow hover:bg-yellow-300 border-3 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 transition-all uppercase tracking-wider"
          >
            <Sparkles className="w-5 h-5 fill-black" />
            <span>Explore 10 Timepass Tools</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </a>

          <button
            onClick={handleRandomPick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-black text-white bg-funky-pink hover:bg-pink-600 border-3 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 transition-all uppercase tracking-wider"
          >
            <Shuffle className="w-5 h-5" />
            <span>Surprise Me (Random) 🎲</span>
          </button>
        </div>

        {/* Trust Graphic Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="sticker-badge bg-slate-900 text-funky-yellow">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Free & No Sign-up</span>
          </span>
          <span className="sticker-badge bg-slate-900 text-funky-pink">
            <Bomb className="w-3.5 h-3.5" />
            <span>Instant Downloadable PNG</span>
          </span>
          <span className="sticker-badge bg-slate-900 text-funky-neonGreen">
            <Share2 className="w-3.5 h-3.5" />
            <span>1-Click WhatsApp Share</span>
          </span>
          <span className="sticker-badge bg-slate-900 text-funky-cyan">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Annoying Popups</span>
          </span>
        </div>
      </section>

      {/* 2. BRO CODE TICKER MARQUEE */}
      <BroCodeTicker />

      {/* 3. FEATURED TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-block funky-tape-pink text-[10px] mb-1">
              VIRAL ON REELS & WHATSAPP
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              🔥 Trending Right Now
            </h2>
          </div>
          <a
            href="#all-tools"
            className="text-xs sm:text-sm font-black text-funky-yellow hover:text-yellow-300 flex items-center gap-1 uppercase"
          >
            <span>View All 10 Tools</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
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
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-3 border-black shadow-brutal">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="funky-tape text-[10px] mb-1">
                FILTER BY VIBE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                Categories & Squad Mood
              </h3>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Search tools (roast, ex, aukaat, shaadi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border-2 border-black text-sm text-white placeholder-slate-500 font-bold focus:outline-none focus:border-funky-yellow shadow-brutal"
              />
            </div>
          </div>

          {/* Neo-brutalist Category Pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-2 border-black ${
                selectedCategory === "All"
                  ? "bg-funky-yellow text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              ⚡ All 10 Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 border-2 border-black ${
                  selectedCategory === cat.label
                    ? "bg-funky-pink text-white shadow-brutal translate-x-[-1px] translate-y-[-1px]"
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
        <div className="mb-8">
          <div className="funky-tape-cyan text-[10px] mb-1">
            THE COMPLETE TIMEPASS ARSENAL
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            All 10 Timepass Tools ({filteredTools.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1">
            Pick a tool, answer funny dilemmas, get an aesthetic card, and fire away on WhatsApp!
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-950 border-3 border-black shadow-brutal">
            <p className="text-xl font-black text-funky-yellow">
              Koi tool nahi mila dost! 🤷‍♂️
            </p>
            <p className="text-xs text-slate-400 font-bold mt-1">
              Search term change karo ya category reset karo.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 rounded-xl text-xs font-black bg-funky-yellow text-black border-2 border-black shadow-brutal uppercase"
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

      {/* 6. HOW IT WORKS COMIC STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-4 border-black shadow-brutal text-center relative overflow-hidden">
          <div className="funky-tape text-[10px] mb-2">
            3 SIMPLE STEPS
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-8">
            How FullTimePass Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border-3 border-black shadow-brutal relative">
              <span className="w-10 h-10 rounded-xl bg-funky-yellow text-black font-black text-lg border-2 border-black flex items-center justify-center mb-4 shadow-brutal">
                1
              </span>
              <h3 className="text-lg font-black text-white mb-2 uppercase">
                Pick Your Weapon
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Choose from 10 tools: roast a friend, check your moving-on score, predict wedding kalesh, or issue an udhaar recovery notice.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border-3 border-black shadow-brutal relative">
              <span className="w-10 h-10 rounded-xl bg-funky-pink text-white font-black text-lg border-2 border-black flex items-center justify-center mb-4 shadow-brutal">
                2
              </span>
              <h3 className="text-lg font-black text-white mb-2 uppercase">
                Answer Funny Dilemmas
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Enter your friend&apos;s nickname or pick from hilarious Indian multiple-choice situations about late replies, Swiggy orders, and chai debates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border-3 border-black shadow-brutal relative">
              <span className="w-10 h-10 rounded-xl bg-funky-neonGreen text-black font-black text-lg border-2 border-black flex items-center justify-center mb-4 shadow-brutal">
                3
              </span>
              <h3 className="text-lg font-black text-white mb-2 uppercase">
                Blast on WhatsApp
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Get an instant, high-resolution aesthetic result card. Download as PNG with one click or blast it directly into your squad&apos;s WhatsApp groups!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
