"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  Zap,
  Radio,
  Thermometer,
  Battery,
  BatteryCharging,
  Sparkles,
  Target,
  Clock,
  RotateCw,
} from "lucide-react";

export interface RealMeterProps {
  score?: string | number;
  scoreLabel?: string;
  className?: string;
  variant?:
    | "speedometer"
    | "radial-ring"
    | "segmented-battery"
    | "kalesh-thermometer"
    | "radar-scanner"
    | "flame-gauge"
    | "trait-spectrum"
    | "roulette-wheel";
  toolSlug?: string;
  metrics?: { label: string; value: string; color?: string }[];
  targetName?: string;
}

// Map tool slug to bespoke meter style
export function getMeterVariantForTool(slug?: string): RealMeterProps["variant"] {
  if (!slug) return "speedometer";

  switch (slug) {
    case "red-flag-meter":
    case "ex-yaad-meter":
    case "reply-ka-bhikhari":
    case "photo-delete-meter":
      return "speedometer";

    case "aukaat-checker":
    case "main-character-syndrome":
    case "fake-richness":
    case "salary-gayab":
      return "radial-ring";

    case "kal-se-pakka":
    case "chai-startup-founder":
      return "segmented-battery";

    case "shaadi-kalesh-predictor":
      return "kalesh-thermometer";

    case "trip-cancellation-cbi":
    case "food-delivery-detective":
      return "radar-scanner";

    case "roast-my-friend":
      return "flame-gauge";

    case "treat-roulette":
      return "roulette-wheel";

    case "personality-test":
    case "shaadi-market-value":
      return "trait-spectrum";

    default:
      return "speedometer";
  }
}

export default function RealMeter({
  score = "50%",
  scoreLabel = "Score",
  className = "",
  variant,
  toolSlug,
  metrics,
  targetName,
}: RealMeterProps) {
  // Determine effective variant
  const effectiveVariant = variant || getMeterVariantForTool(toolSlug);

  // Parse numeric percentage from score string (e.g. "8%", "85%", "₹187")
  let numericValue = 50;
  const scoreStr = String(score ?? "50%").trim();
  const match = scoreStr.match(/\d+(\.\d+)?/);
  if (match) {
    numericValue = Math.min(Math.max(parseFloat(match[0]), 0), 100);
  } else {
    numericValue = 85;
  }

  // Animation trigger state
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(numericValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [numericValue]);

  // Render appropriate meter style
  switch (effectiveVariant) {
    case "radial-ring":
      return (
        <RadialRingMeter
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          toolSlug={toolSlug}
        />
      );

    case "segmented-battery":
      return (
        <SegmentedBatteryMeter
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          toolSlug={toolSlug}
        />
      );

    case "kalesh-thermometer":
      return (
        <KaleshThermometer
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
        />
      );

    case "radar-scanner":
      return (
        <RadarScannerMeter
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          toolSlug={toolSlug}
        />
      );

    case "flame-gauge":
      return (
        <FlameIntensityMeter
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          targetName={targetName}
        />
      );

    case "trait-spectrum":
      return (
        <TraitSpectrumMeter
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          toolSlug={toolSlug}
          metrics={metrics}
        />
      );

    case "roulette-wheel":
      return (
        <RouletteWheelMeter
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          targetName={targetName}
        />
      );

    case "speedometer":
    default:
      return (
        <SpeedometerGauge
          numericValue={animatedValue}
          rawScore={scoreStr}
          scoreLabel={scoreLabel}
          className={className}
          toolSlug={toolSlug}
        />
      );
  }
}

/* =========================================================================
   1. SPEEDOMETER (ANALOG NEEDLE GAUGE - LIGHT MODERN DESIGN)
   Used for: red-flag-meter, ex-yaad-meter, reply-ka-bhikhari, photo-delete-meter
   ========================================================================= */
function SpeedometerGauge({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  toolSlug,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  toolSlug?: string;
}) {
  const needleAngle = -90 + (numericValue / 100) * 180;

  // Determine meter zone calibrated to specific tool
  let zoneInfo = {
    color: "#059669",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    label: "SAFE ZONE",
    subLabel: "Optimal Status",
    icon: CheckCircle2,
  };

  if (toolSlug === "ex-yaad-meter") {
    // For Moving-On Score: High is Safe/Healed, Low is Devdas
    if (numericValue >= 70) {
      zoneInfo = {
        color: "#059669",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        label: "HEALED ZONE",
        subLabel: "Moved On & Healed ✨",
        icon: CheckCircle2,
      };
    } else if (numericValue >= 40) {
      zoneInfo = {
        color: "#D97706",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-700",
        label: "RECOVERY ZONE",
        subLabel: "Healing In Progress 🩹",
        icon: AlertTriangle,
      };
    } else {
      zoneInfo = {
        color: "#DC2626",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        label: "DEVDAS ZONE",
        subLabel: "Profile Stalker Alert 💔",
        icon: AlertTriangle,
      };
    }
  } else if (toolSlug === "photo-delete-meter") {
    // For Photo Upload Percentage: High is Efficient, Low is Delete Specialist
    if (numericValue >= 60) {
      zoneInfo = {
        color: "#059669",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        label: "CONFIDENT POSTER",
        subLabel: "Low Storage Wastage 📸",
        icon: CheckCircle2,
      };
    } else if (numericValue >= 25) {
      zoneInfo = {
        color: "#D97706",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-700",
        label: "FILTER OVERTHINKER",
        subLabel: "Moderate Delete Ratio 🤳",
        icon: AlertTriangle,
      };
    } else {
      zoneInfo = {
        color: "#DC2626",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        label: "DELETE HOARDER",
        subLabel: "99% Selfies Deleted 🗑️",
        icon: AlertTriangle,
      };
    }
  } else {
    // Red-flag & Reply-bhikhari: High is DANGER, Low is SAFE
    if (numericValue >= 70) {
      zoneInfo = {
        color: "#DC2626",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        label: "DANGER ZONE",
        subLabel: toolSlug === "reply-ka-bhikhari" ? "Self-Respect RIP 🪦" : "Nuclear Red Flag 🚩",
        icon: AlertTriangle,
      };
    } else if (numericValue >= 35) {
      zoneInfo = {
        color: "#D97706",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-700",
        label: "CAUTION ZONE",
        subLabel: toolSlug === "reply-ka-bhikhari" ? "Anxiety Growing ⚠️" : "Moderate Toxicity Alert ⚠️",
        icon: AlertTriangle,
      };
    } else {
      zoneInfo = {
        color: "#059669",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        label: "SAFE ZONE",
        subLabel: toolSlug === "reply-ka-bhikhari" ? "Patient & Dignified 🧘" : "Green Flag Confirmed 🌿",
        icon: CheckCircle2,
      };
    }
  }

  const ZoneIcon = zoneInfo.icon;
  const cx = 120;
  const cy = 125;
  const ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const isHealedReversed = toolSlug === "ex-yaad-meter";
  const isPhotoDelete = toolSlug === "photo-delete-meter";
  const isReversed = isHealedReversed || isPhotoDelete;

  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-slate-200/90 shadow-md select-none text-slate-900 ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
          ANALOG GAUGE
        </span>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-extrabold uppercase ${zoneInfo.bgColor} ${zoneInfo.borderColor} ${zoneInfo.textColor}`}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: zoneInfo.color }} />
          <span>{zoneInfo.label}</span>
        </div>
      </div>

      {/* SVG Analog Gauge */}
      <div className="relative w-full aspect-[240/145] flex items-center justify-center">
        <svg viewBox="0 0 240 145" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="meter-green" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="meter-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="meter-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="light-needle-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.25)" />
            </filter>
          </defs>

          {/* Subdued Background Track */}
          <path
            d="M 32 125 A 88 88 0 0 1 208 125"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="13"
            strokeLinecap="round"
          />

          {/* 3 Calibrated Color Zones */}
          <path
            d="M 32 125 A 88 88 0 0 1 76 48.8"
            fill="none"
            stroke={isReversed ? "url(#meter-red)" : "url(#meter-green)"}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 78 47.1 A 88 88 0 0 1 162 47.1"
            fill="none"
            stroke="url(#meter-yellow)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 164 48.8 A 88 88 0 0 1 208 125"
            fill="none"
            stroke={isReversed ? "url(#meter-green)" : "url(#meter-red)"}
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Calibrated Ticks & Numbers */}
          {ticks.map((t) => {
            const rad = Math.PI * (1 - t / 100);
            const isMajor = t % 20 === 0;
            const rInner = isMajor ? 72 : 76;
            const rOuter = 82;
            const x1 = cx + rInner * Math.cos(rad);
            const y1 = cy - rInner * Math.sin(rad);
            const x2 = cx + rOuter * Math.cos(rad);
            const y2 = cy - rOuter * Math.sin(rad);

            const rText = 61;
            const tx = cx + rText * Math.cos(rad);
            const ty = cy - rText * Math.sin(rad);

            return (
              <g key={t}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? "#64748B" : "#CBD5E1"}
                  strokeWidth={isMajor ? 1.8 : 1}
                />
                {isMajor && (
                  <text
                    x={tx}
                    y={ty + 3}
                    fill="#64748B"
                    fontSize="8"
                    fontWeight="700"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {t}
                  </text>
                )}
              </g>
            );
          })}

          {/* Zone Labels */}
          <text
            x="36"
            y="140"
            fill={isReversed ? "#DC2626" : "#059669"}
            fontSize="8"
            fontWeight="800"
            textAnchor="middle"
          >
            {isHealedReversed ? "DEVDAS" : isPhotoDelete ? "DELETE" : "SAFE"}
          </text>
          <text
            x="120"
            y="27"
            fill="#D97706"
            fontSize="8"
            fontWeight="800"
            textAnchor="middle"
          >
            {isHealedReversed ? "HEALING" : isPhotoDelete ? "FILTER" : "CAUTION"}
          </text>
          <text
            x="204"
            y="140"
            fill={isReversed ? "#059669" : "#DC2626"}
            fontSize="8"
            fontWeight="800"
            textAnchor="middle"
          >
            {isHealedReversed ? "HEALED" : isPhotoDelete ? "POSTER" : "DANGER"}
          </text>

          {/* Needle Group */}
          <g
            transform={`rotate(${needleAngle}, 120, 125)`}
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: "120px 125px",
              transition: "transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            filter="url(#light-needle-shadow)"
          >
            <path d="M 117.5 125 L 118 139 L 122 139 L 122.5 125 Z" fill="#334155" />
            <path d="M 117 125 L 119.3 43 L 120.7 43 L 123 125 Z" fill="#0F172A" />
            <path d="M 119.2 125 L 119.6 45 L 120.4 45 L 120.8 125 Z" fill="#EF4444" />
          </g>

          {/* Center Hub */}
          <circle cx="120" cy="125" r="14" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="120" cy="125" r="8" fill="#334155" />
          <circle cx="120" cy="125" r="3.5" fill="#EF4444" />
        </svg>
      </div>

      {/* Digital Readout */}
      <div className="-mt-3 pt-3 pb-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-center relative z-10 shadow-xs">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {numericValue}%
          </span>
        </div>
        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
          {scoreLabel}
        </span>
        <div
          className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${zoneInfo.bgColor} ${zoneInfo.borderColor} ${zoneInfo.textColor}`}
        >
          <ZoneIcon className="w-3.5 h-3.5" />
          <span>{zoneInfo.subLabel}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. RADIAL RING (CIRCULAR PROGRESS HUD - LIGHT MODERN DESIGN)
   Used for: aukaat-checker, main-character-syndrome, fake-richness, salary-gayab
   ========================================================================= */
function RadialRingMeter({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  toolSlug,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  toolSlug?: string;
}) {
  const r = 58;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference * (1 - numericValue / 100);

  // Status colors & tags
  let color = "#0284C7";
  let gradientId = "radial-cyan";
  let statusBadge = "STABLE";
  let badgeClasses = "bg-sky-50 text-sky-800 border-sky-200";

  if (toolSlug === "aukaat-checker") {
    if (numericValue >= 75) {
      color = "#059669";
      gradientId = "radial-emerald";
      statusBadge = "CROREPATI IN DREAMS 💰";
      badgeClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
    } else if (numericValue >= 45) {
      color = "#D97706";
      gradientId = "radial-amber";
      statusBadge = "MIDDLE CLASS WARRIOR 🛒";
      badgeClasses = "bg-amber-50 text-amber-800 border-amber-200";
    } else {
      color = "#E11D48";
      gradientId = "radial-rose";
      statusBadge = "KANGAL MODE / STRUGGLE 💸";
      badgeClasses = "bg-rose-50 text-rose-800 border-rose-200";
    }
  } else if (toolSlug === "salary-gayab") {
    if (numericValue >= 75) {
      color = "#E11D48";
      gradientId = "radial-rose";
      statusBadge = "EXTREME DRAIN: KATORA MODE 🥣";
      badgeClasses = "bg-rose-50 text-rose-800 border-rose-200";
    } else if (numericValue >= 45) {
      color = "#D97706";
      gradientId = "radial-amber";
      statusBadge = "HEAVY EMI / EXPENSE DRAIN 💸";
      badgeClasses = "bg-amber-50 text-amber-800 border-amber-200";
    } else {
      color = "#059669";
      gradientId = "radial-emerald";
      statusBadge = "SURVIVABLE BALANCE LEFT 🛡️";
      badgeClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
  } else if (toolSlug === "fake-richness") {
    if (numericValue >= 75) {
      color = "#E11D48";
      gradientId = "radial-rose";
      statusBadge = "PRO MAX SHOWOFF 🕶️";
      badgeClasses = "bg-rose-50 text-rose-800 border-rose-200";
    } else if (numericValue >= 40) {
      color = "#D97706";
      gradientId = "radial-amber";
      statusBadge = "SUBTLE FLEXING DETECTED 📱";
      badgeClasses = "bg-amber-50 text-amber-800 border-amber-200";
    } else {
      color = "#059669";
      gradientId = "radial-emerald";
      statusBadge = "HONEST & GROUNDED 🫡";
      badgeClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
  } else {
    // main-character-syndrome
    if (numericValue >= 75) {
      color = "#9333EA";
      gradientId = "radial-purple";
      statusBadge = "MAX DELUSION REACHED 🌟";
      badgeClasses = "bg-purple-50 text-purple-800 border-purple-200";
    } else if (numericValue >= 40) {
      color = "#2563EB";
      gradientId = "radial-blue";
      statusBadge = "BGM PLAYING IN HEAD 🎧";
      badgeClasses = "bg-blue-50 text-blue-800 border-blue-200";
    } else {
      color = "#059669";
      gradientId = "radial-emerald";
      statusBadge = "GROUNDED IN REALITY 🌱";
      badgeClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
  }

  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-slate-200/90 shadow-md text-center select-none text-slate-900 ${className}`}
    >
      {/* Header Pill */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
          RADIAL HUD SCORE
        </span>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          INDEX v4.2
        </span>
      </div>

      {/* Circular SVG Ring */}
      <div className="relative w-44 h-44 mx-auto my-1 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="radial-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="radial-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="radial-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="radial-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <linearGradient id="radial-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Animated Progress Ring */}
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        </svg>

        {/* Center Digital Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color }}
          >
            {numericValue}%
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            CALCULATED
          </span>
        </div>
      </div>

      {/* Bottom Readout Box */}
      <div className="mt-2 pt-2.5 pb-2 px-3 rounded-2xl bg-slate-50 border border-slate-200">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          {scoreLabel}
        </span>
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-xs ${badgeClasses}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{statusBadge}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. SEGMENTED BATTERY (POWER / CAPACITY PACK - LIGHT MODERN DESIGN)
   Used for: kal-se-pakka, chai-startup-founder
   ========================================================================= */
function SegmentedBatteryMeter({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  toolSlug,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  toolSlug?: string;
}) {
  const totalBlocks = 10;
  const activeBlocks = Math.round((numericValue / 100) * totalBlocks);

  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-slate-200/90 shadow-md text-slate-900 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
            {toolSlug === "chai-startup-founder" ? "PITCH POWER" : "PROCRASTINATION BATTERY"}
          </span>
        </div>
        <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
          {numericValue}% CAPACITY
        </span>
      </div>

      {/* Battery Housing */}
      <div className="relative p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-inner my-2">
        {/* Terminal Cap on Top Right */}
        <div className="absolute -top-2 right-6 w-7 h-2 rounded-t-md bg-slate-300 border border-slate-400" />

        {/* 10 Glowing Segments */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalBlocks }).map((_, idx) => {
            const isActive = idx < activeBlocks;
            let barColor = "#10B981"; // Safe Green
            if (idx >= 7) barColor = "#EF4444"; // Red Critical
            else if (idx >= 4) barColor = "#F59E0B"; // Amber Warning

            return (
              <div
                key={idx}
                className="h-9 rounded-lg flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                style={{
                  backgroundColor: isActive ? barColor : "#E2E8F0",
                  opacity: isActive ? 1 : 0.45,
                }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20" />
                )}
                <span
                  className={`text-[10px] font-extrabold relative z-10 ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                >
                  {idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Readout Status */}
      <div className="mt-3 pt-2.5 pb-2 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {numericValue}%
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
          {scoreLabel}
        </span>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
          <span>
            {numericValue > 70
              ? "OVERLOAD: DANGER ⚠️"
              : numericValue > 40
              ? "HEAVY CHARGE ⚡"
              : "OPTIMAL BATTERY ✅"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. KALESH THERMOMETER (BOILING WEDDING DRAMA GAUGE - LIGHT MODERN DESIGN)
   Used for: shaadi-kalesh-predictor
   ========================================================================= */
function KaleshThermometer({
  numericValue,
  rawScore,
  scoreLabel,
  className,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-rose-200 shadow-md text-slate-900 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-rose-600">
          <Thermometer className="w-4 h-4 animate-bounce" />
          <span className="text-[11px] font-extrabold tracking-wider uppercase">
            KALESH HEAT INDEX
          </span>
        </div>
        <span className="text-xs font-extrabold text-rose-600">
          {numericValue}° KALESH
        </span>
      </div>

      {/* Thermometer Column */}
      <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between gap-4">
        {/* Thermometer Tube */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-36 rounded-t-full bg-white border-2 border-slate-300 relative overflow-hidden flex flex-col justify-end p-0.5 shadow-inner">
            {/* Liquid Fill */}
            <div
              className="w-full rounded-t-full bg-gradient-to-t from-rose-600 via-orange-500 to-amber-400 transition-all duration-1000 relative shadow-sm"
              style={{ height: `${numericValue}%` }}
            >
              {/* Boiling bubbles */}
              <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/80 animate-ping" />
            </div>
          </div>
          {/* Bulb */}
          <div className="-mt-1.5 w-10 h-10 rounded-full bg-rose-600 border-2 border-white shadow-md flex items-center justify-center">
            <Flame className="w-5 h-5 text-amber-200 fill-amber-200" />
          </div>
        </div>

        {/* Temperature Gradations */}
        <div className="flex-1 space-y-2 text-left text-xs font-medium">
          <div className="flex items-center justify-between text-rose-700 font-extrabold border-b border-rose-200/80 pb-1">
            <span>100° Phoopaji Meltdown</span>
            <span>💥</span>
          </div>
          <div className="flex items-center justify-between text-amber-700 font-bold border-b border-rose-200/80 pb-1">
            <span>75° Paneer Scarcity</span>
            <span>🍲</span>
          </div>
          <div className="flex items-center justify-between text-slate-700 font-semibold border-b border-rose-200/80 pb-1">
            <span>50° Taunt Exchange</span>
            <span>👀</span>
          </div>
          <div className="flex items-center justify-between text-emerald-700 font-medium">
            <span>25° Shanti Path</span>
            <span>🕊️</span>
          </div>
        </div>
      </div>

      {/* Bottom Readout */}
      <div className="mt-3 pt-2.5 pb-2 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <div className="text-3xl font-extrabold text-rose-600 tracking-tight">
          {numericValue}%
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
          {scoreLabel}
        </span>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>
            {numericValue > 70
              ? "WORLD WAR III IMMINENT 🚨"
              : numericValue > 40
              ? "MILD KALESH ALERT ⚠️"
              : "SAFE SHASTRI ZONE ✅"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. RADAR SCANNER (SONAR TARGET SCANNER - LIGHT MODERN DESIGN)
   Used for: trip-cancellation-cbi, food-delivery-detective
   ========================================================================= */
function RadarScannerMeter({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  toolSlug,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  toolSlug?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-sky-200 shadow-md text-slate-900 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-sky-700">
          <Radio className="w-4 h-4 animate-pulse" />
          <span className="text-[11px] font-extrabold tracking-wider uppercase">
            {toolSlug === "food-delivery-detective" ? "BIRYANI RADAR" : "CBI SONAR GRID"}
          </span>
        </div>
        <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
          TARGET LOCK
        </span>
      </div>

      {/* Radar Screen - Crisp Tactical Scope */}
      <div className="relative w-40 h-40 mx-auto my-2 rounded-full border-2 border-sky-400 bg-slate-900 overflow-hidden shadow-md flex items-center justify-center">
        {/* Concentric distance rings */}
        <div className="absolute w-32 h-32 rounded-full border border-sky-500/30 pointer-events-none" />
        <div className="absolute w-20 h-20 rounded-full border border-sky-500/30 pointer-events-none" />
        <div className="absolute w-10 h-10 rounded-full border border-sky-500/30 pointer-events-none" />

        {/* Crosshair lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-sky-500/30" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-full w-px bg-sky-500/30" />
        </div>

        {/* Rotating Sonar Beam */}
        <div
          className="absolute inset-0 rounded-full animate-spin pointer-events-none"
          style={{
            animationDuration: "3.5s",
            background: "conic-gradient(from 0deg, transparent 70%, rgba(6,182,212,0.45) 100%)",
          }}
        />

        {/* Target Blip */}
        <div
          className="absolute w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-ping"
          style={{ top: "32%", left: "62%" }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-rose-400"
          style={{ top: "33.5%", left: "63.5%" }}
        />

        {/* Center Pivot Reticle */}
        <Target className="w-5 h-5 text-sky-400/80 relative z-10" />
      </div>

      {/* Readout */}
      <div className="mt-2 pt-2.5 pb-2 px-3 rounded-2xl bg-sky-50/70 border border-sky-200 text-center font-sans">
        <div className="text-3xl font-extrabold text-sky-900 tracking-tight">
          {numericValue}%
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
          {scoreLabel}
        </span>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-sky-800 border border-sky-200 uppercase tracking-wider shadow-2xs">
          <span>
            {numericValue > 75
              ? "CANCELLATION CONFIRMED 🐍"
              : numericValue > 40
              ? "EXCUSES INCOMING ⚠️"
              : "TRIP ON TRACK 🏖️"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. FLAME INTENSITY GAUGE (NUCLEAR ROAST FIRE LEVEL - LIGHT MODERN DESIGN)
   Used for: roast-my-friend
   ========================================================================= */
function FlameIntensityMeter({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  targetName,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  targetName?: string;
}) {
  const levels = [
    { label: "Mild", icon: "🌶️", threshold: 20 },
    { label: "Spicy", icon: "🔥", threshold: 40 },
    { label: "Scorching", icon: "💥", threshold: 60 },
    { label: "Nuclear", icon: "☢️", threshold: 80 },
    { label: "Ash", icon: "💀", threshold: 100 },
  ];

  const activeTier = Math.min(Math.max(Math.ceil(numericValue / 20), 1), 5);

  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-amber-200 shadow-md text-slate-900 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-amber-700">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
          <span className="text-[11px] font-extrabold tracking-wider uppercase">
            ROAST INTENSITY GAUGE
          </span>
        </div>
        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 uppercase">
          LEVEL {activeTier}/5
        </span>
      </div>

      {/* 5 Fire Tiers */}
      <div className="grid grid-cols-5 gap-1.5 my-2">
        {levels.map((lvl, idx) => {
          const isActive = idx < activeTier;
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl text-center border transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-t from-orange-500 to-amber-400 border-amber-400 text-slate-950 font-black shadow-xs scale-105"
                  : "bg-slate-50 border-slate-200 text-slate-400 opacity-50"
              }`}
            >
              <div className="text-lg">{lvl.icon}</div>
              <div className="text-[9px] font-extrabold uppercase mt-1">
                {lvl.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Readout */}
      <div className="mt-3 pt-2.5 pb-2 px-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
        <div className="text-3xl font-extrabold text-amber-950 tracking-tight">
          {numericValue}%
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
          {scoreLabel}
        </span>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-amber-900 border border-amber-200 uppercase tracking-wider shadow-2xs">
          <span>
            {numericValue >= 80
              ? "HOSPITALIZATION RECOMMENDED 🚑"
              : numericValue >= 50
              ? "DIGNITY COMPROMISED 🔥"
              : "FRIENDLY BANTER CONFIRMED 😊"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. TRAIT SPECTRUM (MULTI-BAR ARCHETYPE SPECTRUM - LIGHT MODERN DESIGN)
   Used for: personality-test, shaadi-market-value
   ========================================================================= */
function TraitSpectrumMeter({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  toolSlug,
  metrics,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  toolSlug?: string;
  metrics?: { label: string; value: string; color?: string }[];
}) {
  const isShaadi = toolSlug === "shaadi-market-value";

  // If metrics are passed with calculated trait percentages, use them!
  const traitsToRender =
    metrics && metrics.length >= 2
      ? metrics.slice(0, 4).map((m, idx) => {
          const match = m.value.match(/\d+/);
          const val = match ? Math.min(Math.max(parseInt(match[0]), 0), 100) : 50;
          const palette = ["#9333EA", "#D97706", "#2563EB", "#059669"];
          return {
            label: m.label,
            val,
            color: m.color || palette[idx % palette.length],
          };
        })
      : isShaadi
      ? [
          { label: "Sanskar Level", val: 86, color: "#059669" },
          { label: "Cooking Survival", val: 42, color: "#D97706" },
          { label: "CTC / Package Power", val: 80, color: "#2563EB" },
          { label: "Phoopaji Tolerance", val: 28, color: "#DC2626" },
        ]
      : [
          { label: "Overthinking", val: 94, color: "#9333EA" },
          { label: "Procrastination", val: 88, color: "#D97706" },
          { label: "Drama Quotient", val: 76, color: "#DB2777" },
          { label: "Desi Jugaad", val: 85, color: "#059669" },
        ];

  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-slate-200/90 shadow-md text-slate-900 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
          {isShaadi ? "RISHTA SPECTRUM" : "ARCHETYPE SPECTRUM"}
        </span>
        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          {numericValue}% SCORE
        </span>
      </div>

      {/* 4 Spectrum Bars */}
      <div className="space-y-2.5 my-2">
        {traitsToRender.map((t, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">{t.label}</span>
              <span style={{ color: t.color }}>{t.val}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${t.val}%`,
                  backgroundColor: t.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Readout */}
      <div className="mt-3 pt-2.5 pb-2 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {numericValue}%
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
          {scoreLabel}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   8. ROULETTE WHEEL (BILL PAYER SPIN WHEEL - LIGHT MODERN DESIGN)
   Used for: treat-roulette
   ========================================================================= */
function RouletteWheelMeter({
  numericValue,
  rawScore,
  scoreLabel,
  className,
  targetName,
}: {
  numericValue: number;
  rawScore: string;
  scoreLabel: string;
  className?: string;
  targetName?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[300px] mx-auto rounded-3xl p-5 bg-white border-2 border-emerald-300 shadow-md text-slate-900 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <RotateCw className="w-4 h-4 animate-spin text-emerald-600" />
          <span className="text-[11px] font-extrabold tracking-wider uppercase">
            BILL PAYER WHEEL
          </span>
        </div>
        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          SPIN RESULT
        </span>
      </div>

      {/* Wheel Preview */}
      <div className="relative w-40 h-40 mx-auto my-2 rounded-full border-4 border-amber-400 bg-white overflow-hidden shadow-md flex items-center justify-center">
        {/* Pointer Arrow */}
        <div className="absolute top-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-amber-500 z-20" />

        {/* Wheel Wedges SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full rotate-45">
          <path d="M 50 50 L 50 0 A 50 50 0 0 1 100 50 Z" fill="#EF4444" />
          <path d="M 50 50 L 100 50 A 50 50 0 0 1 50 100 Z" fill="#F59E0B" />
          <path d="M 50 50 L 50 100 A 50 50 0 0 1 0 50 Z" fill="#10B981" />
          <path d="M 50 50 L 0 50 A 50 50 0 0 1 50 0 Z" fill="#3B82F6" />
        </svg>

        {/* Center Hub */}
        <div className="absolute w-10 h-10 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center font-bold text-base text-slate-950 z-10 shadow-sm">
          💸
        </div>
      </div>

      {/* Readout */}
      <div className="mt-2 pt-2.5 pb-2 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {targetName || "The Lucky Scapegoat"}
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
          Selected Bill Payer
        </span>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
          <span>NO UPI EXCUSES ACCEPTED 📱</span>
        </div>
      </div>
    </div>
  );
}
