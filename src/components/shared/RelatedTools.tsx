"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import { getLocalizedTools } from "@/lib/data/tools";
import { useLanguage } from "@/lib/language/LanguageContext";

interface RelatedToolsProps {
  currentSlug: string;
}

export default function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const { language } = useLanguage();
  const tools = getLocalizedTools(language);
  const currentTool = tools.find((t) => t.slug === currentSlug);

  const related = tools
    .filter((t) => t.slug !== currentSlug)
    .sort((a, b) => {
      const aSame = currentTool && a.category === currentTool.category ? 1 : 0;
      const bSame = currentTool && b.category === currentTool.category ? 1 : 0;
      if (aSame !== bSame) return bSame - aSame;
      return a.displayOrder - b.displayOrder;
    })
    .slice(0, 3);

  const heading = language === "en" ? "Try These Next!" : "Ye Bhi Try Karo Yaar!";
  const tag = language === "en" ? "More Comedy" : "More Timepass";
  const allToolsLabel = language === "en" ? "All 20 Tools" : "All 20 Tools";
  const playLabel = language === "en" ? "Play Now" : "Play Now";

  return (
    <section className="mt-14 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            {tag}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>{heading}</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </h3>
        </div>
        <Link
          href="/#all-tools"
          className="text-xs font-bold text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors"
        >
          <span>{allToolsLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.id}
            href={`/${tool.slug}`}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:bg-slate-50/80 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {tool.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  #{tool.displayOrder.toString().padStart(2, "0")}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                {tool.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{playLabel}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
