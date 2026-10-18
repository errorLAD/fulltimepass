import React from "react";
import Link from "next/link";
import { Flame, Home, ArrowRight, Sparkles, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
        {/* Animated 404 Header */}
        <div className="relative inline-block">
          <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 select-none tracking-tighter">
            404
          </div>
          <span className="absolute -top-2 -right-4 text-3xl animate-bounce">
            🕵️‍♂️
          </span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Yeh Rasta Band Hai Dost!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found / Gayab Ho Gaya
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Lagta hai yeh page Goa plan ki tarah aakhri minute pe cancel ho gaya, ya phir salary ki tarah teesre din gayab ho gaya!
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Wapas Home Chalo (Desi Timepass)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Popular tools quick links */}
        <div className="pt-6 border-t border-slate-100 text-left space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center">
            🔥 Explore Viral Mini-Tools Instead:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/roast-my-friend"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 transition-colors flex items-center justify-between"
            >
              <span>🔥 Roast My Friend</span>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              href="/red-flag-meter"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 transition-colors flex items-center justify-between"
            >
              <span>🚩 Red Flag Meter</span>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              href="/treat-roulette"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 transition-colors flex items-center justify-between"
            >
              <span>🍕 Treat Roulette</span>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              href="/aukaat-checker"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 transition-colors flex items-center justify-between"
            >
              <span>💰 Aukaat Checker</span>
              <span className="text-slate-400">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
