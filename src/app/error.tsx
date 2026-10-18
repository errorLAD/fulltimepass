"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Flame } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors safely
    console.error("Runtime application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6">
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-3xl shadow-sm">
          🚨
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            Bakchodi Glitch
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Arre Yaar! Something Goofed Up
          </h1>
          <p className="text-sm text-slate-600 font-normal leading-relaxed">
            Lagta hai server pe kisi ne chai gira di! Don&apos;t worry, your data wasn&apos;t lost because we never ask for your secrets anyway.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          <p className="font-medium text-slate-700 mb-2">Want to jump right back in?</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-amber-700 font-semibold">
            <Link href="/roast-my-friend" className="hover:underline">
              🔥 Roast My Friend
            </Link>
            <span>•</span>
            <Link href="/red-flag-meter" className="hover:underline">
              🚩 Red Flag Meter
            </Link>
            <span>•</span>
            <Link href="/treat-roulette" className="hover:underline">
              🍕 Treat Roulette
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
