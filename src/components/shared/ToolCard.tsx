"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  Flag,
  HeartCrack,
  Users,
  Sparkles,
  Wallet,
  MessageSquare,
  Brain,
  FileText,
  PartyPopper,
  Search,
  Clock,
  Banknote,
  Calendar,
  Clapperboard,
  UtensilsCrossed,
  Camera,
  Coins,
  Coffee,
  Dices,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { ToolDefinition } from "@/lib/types";
import { useLanguage } from "@/lib/language/LanguageContext";

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Flag,
  HeartCrack,
  Users,
  Sparkles,
  Wallet,
  MessageSquare,
  Brain,
  FileText,
  PartyPopper,
  Search,
  Clock,
  Banknote,
  Calendar,
  Clapperboard,
  UtensilsCrossed,
  Camera,
  Coins,
  Coffee,
  Dices,
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { language } = useLanguage();
  const IconComponent = iconMap[tool.icon] || Flame;

  const title = language === "en" ? tool.titleEn || tool.title : tool.title;
  const tagline = language === "en" ? tool.taglineEn || tool.tagline : tool.tagline;
  const description = language === "en" ? tool.descriptionEn || tool.description : tool.description;
  const badge = language === "en" ? tool.badgeEn || tool.badge : tool.badge;
  const playLabel = language === "en" ? "Play Now" : "Try Now 🔥";

  return (
    <div className="tool-card relative flex flex-col justify-between p-5 group bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-amber-400 transition-all">
      {/* Stretched clickable overlay for optimal mobile touch accessibility */}
      <Link
        href={`/${tool.slug}`}
        aria-label={`Play ${title}`}
        className="absolute inset-0 z-0 rounded-2xl"
      />

      <div className="relative z-10 pointer-events-none">
        {/* Header Icon + Number + Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-tr ${tool.gradient} shadow-sm group-hover:scale-105 transition-transform`}
          >
            <IconComponent className="w-5 h-5 text-white stroke-[2.2]" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-500 border border-slate-200 font-mono">
              #{tool.displayOrder.toString().padStart(2, "0")}
            </span>
            {badge && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1.5 tracking-tight">
          {title}
        </h3>

        {/* Catchy Punchline */}
        <p className="text-xs sm:text-sm font-medium text-amber-800 line-clamp-1 mb-2">
          &ldquo;{tagline}&rdquo;
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          {tool.category}
        </span>

        <Link
          href={`/${tool.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-amber-400 hover:text-slate-950 border border-slate-200 hover:border-amber-400 transition-all group-hover:border-amber-400/60"
        >
          <span>{playLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
