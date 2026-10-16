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
  Zap,
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

  // Different tape color per category for maximum funky graphic pop
  const getTapeStyle = (cat: string) => {
    switch (cat) {
      case "Friends":
        return "funky-tape -rotate-2";
      case "Relationship":
        return "funky-tape-pink rotate-2";
      case "Money":
        return "funky-tape-green -rotate-1";
      case "Personality":
        return "funky-tape-cyan rotate-3";
      case "Shaadi":
        return "funky-tape rotate-1";
      default:
        return "funky-tape";
    }
  };

  return (
    <div className="comic-card rounded-2xl relative flex flex-col justify-between p-6 overflow-hidden group">
      {/* Funky Corner Tape Graphic */}
      <div className="absolute -top-1.5 -right-2 z-10">
        <span className={`${getTapeStyle(tool.category)} text-[10px]`}>
          {tool.badge || `${tool.category.toUpperCase()} 💥`}
        </span>
      </div>

      <div>
        {/* Header Icon + Number */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${tool.gradient} border-3 border-black shadow-brutal group-hover:rotate-6 group-hover:scale-105 transition-all`}
          >
            <IconComponent className="w-7 h-7 text-white stroke-[2.5]" />
          </div>

          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-black text-funky-yellow border border-slate-700 tracking-wider">
            #{tool.displayOrder.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white group-hover:text-funky-yellow transition-colors line-clamp-1 mb-1 tracking-tight">
          {tool.title}
        </h3>

        {/* Catchy Desi Punchline */}
        <div className="p-2 rounded-xl bg-black/60 border border-slate-800 my-2.5">
          <p className="text-xs font-black text-funky-yellow italic line-clamp-1">
            &ldquo;{tool.tagline}&rdquo;
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-800 flex items-center justify-between gap-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-funky-neonGreen flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-funky-neonGreen fill-funky-neonGreen" />
          <span>INSTANT FUN</span>
        </span>

        <Link
          href={`/${tool.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-black bg-funky-yellow hover:bg-yellow-300 border-2 border-black shadow-brutal active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider group-hover:bg-funky-neonGreen"
        >
          <span>Try Kar Bhai</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
