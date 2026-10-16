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
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { ToolDefinition } from "@/lib/types";

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
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = iconMap[tool.icon] || Flame;

  return (
    <div className="group relative rounded-2xl p-0.5 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/80 hover:from-orange-500 hover:via-pink-500 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/10 flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-between p-6 rounded-[14px] bg-slate-900/90 backdrop-blur-md">
        <div>
          {/* Header row: Icon & Badge */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr ${tool.gradient} shadow-md shadow-black/40 group-hover:scale-110 group-hover:rotate-3 transition-transform`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {tool.category}
              </span>
              {tool.badge && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {tool.badge}
                </span>
              )}
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1 mb-1">
            {tool.title}
          </h3>
          <p className="text-xs font-semibold text-amber-400/90 italic mb-2 line-clamp-1">
            &ldquo;{tool.tagline}&rdquo;
          </p>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-300">
            Instant Desi Result ⚡
          </span>
          <Link
            href={`/${tool.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 transition-all shadow-desi-pop-sm group-hover:translate-x-0.5"
          >
            <span>Start Timepass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
