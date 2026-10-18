"use client";

import React from "react";
import { useLanguage } from "@/lib/language/LanguageContext";
import { Globe, Sparkles } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "pill" | "compact" | "footer";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "pill",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === "compact") {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
          language === "hi"
            ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
            : "bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100"
        } ${className}`}
        title={`Current: ${language === "hi" ? "Hinglish (India)" : "English (Global)"}. Click to switch.`}
        aria-label="Switch Language"
      >
        <span className="text-sm">{language === "hi" ? "🇮🇳" : "🌐"}</span>
        <span>{language === "hi" ? "Hinglish" : "English"}</span>
      </button>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 ${className}`}>
        <button
          onClick={() => setLanguage("hi")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            language === "hi"
              ? "bg-white text-amber-900 shadow-xs border border-amber-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
          aria-pressed={language === "hi"}
        >
          <span>🇮🇳</span>
          <span>Hinglish</span>
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            language === "en"
              ? "bg-white text-blue-900 shadow-xs border border-blue-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
          aria-pressed={language === "en"}
        >
          <span>🌐</span>
          <span>English</span>
        </button>
      </div>
    );
  }

  // Default "pill" segmented switcher for Desktop & Mobile Header
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200 shadow-2xs backdrop-blur-xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => setLanguage("hi")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "hi"
            ? "bg-white text-amber-950 shadow-sm border border-amber-300 scale-[1.02]"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
        }`}
        title="Switch to natural desi Hinglish"
        aria-pressed={language === "hi"}
      >
        <span className="text-sm">🇮🇳</span>
        <span>Hinglish</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "en"
            ? "bg-white text-slate-950 shadow-sm border border-blue-300 scale-[1.02]"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
        }`}
        title="Switch to full English"
        aria-pressed={language === "en"}
      >
        <span className="text-sm">🌐</span>
        <span>English</span>
      </button>
    </div>
  );
}
