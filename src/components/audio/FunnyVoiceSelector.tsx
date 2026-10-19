"use client";

import React from "react";
import { Check, Volume2, Sparkles, Radio, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  FunnyVoiceId,
  FunnyVoiceConfig,
  VoiceDiagnostics,
} from "@/lib/audio/funnyVoiceTypes";
import { Language } from "@/lib/language/types";

interface FunnyVoiceSelectorProps {
  voices: FunnyVoiceConfig[];
  selectedVoiceId: FunnyVoiceId;
  previewingVoiceId: FunnyVoiceId | null;
  onSelectAndPreview: (voiceId: FunnyVoiceId) => void;
  language: Language;
  diagnostics?: VoiceDiagnostics;
  compact?: boolean;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
}

export default function FunnyVoiceSelector({
  voices,
  selectedVoiceId,
  previewingVoiceId,
  onSelectAndPreview,
  language,
  diagnostics,
  compact = false,
  speed = 1.0,
  onSpeedChange,
  volume = 1.0,
  onVolumeChange,
}: FunnyVoiceSelectorProps) {
  const isEn = language === "en";

  const speedOptions = [
    { label: "0.85x", val: 0.85, name: isEn ? "Slow" : "Dheere" },
    { label: "1.0x", val: 1.0, name: isEn ? "Normal" : "Normal" },
    { label: "1.15x", val: 1.15, name: isEn ? "Fast" : "Tez" },
    { label: "1.3x", val: 1.3, name: isEn ? "Rapid" : "Super Tez" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Title & Instructions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{isEn ? "Choose Natural Voice Style" : "Natural Funny Aawaz Chuno"}</span>
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{voices.length} {isEn ? "Neural Voices" : "Real Aawazein"}</span>
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
          {isEn ? "Tap card to test & select" : "Tap karke preview suno aur chuno"}
        </span>
      </div>

      {/* Voice Cards Grid */}
      <div
        className={`grid gap-2.5 ${
          compact
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {voices.map((v) => {
          const isSelected = selectedVoiceId === v.id;
          const isPreviewing = previewingVoiceId === v.id;

          return (
            <motion.button
              key={v.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectAndPreview(v.id)}
              className={`group relative text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-950 text-white border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/30"
                  : "bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              {/* Active selection glow accent */}
              {isSelected && (
                <div
                  className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${v.gradient} opacity-20 blur-xl pointer-events-none`}
                />
              )}

              {/* Top Row: Emoji, Name, Active Badge / Speaker Icon */}
              <div className="flex items-start justify-between gap-2 mb-2 relative z-10 w-full">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl sm:text-3xl shrink-0 p-1 rounded-xl bg-slate-100/10">
                    {v.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4
                        className={`text-sm sm:text-base font-black truncate leading-tight ${
                          isSelected ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {isEn ? v.label : v.labelHi}
                      </h4>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold block truncate ${
                        isSelected ? "text-amber-300" : "text-amber-700"
                      }`}
                    >
                      {isEn ? v.tagline : v.taglineHi}
                    </span>
                  </div>
                </div>

                {/* Right Badge / Status */}
                <div className="shrink-0">
                  {isSelected ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{isEn ? "Active" : "Set"}</span>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-amber-100 text-slate-400 group-hover:text-amber-700 flex items-center justify-center transition-colors">
                      <Volume2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Neural Tag & Description */}
              <div className="my-1.5 relative z-10 flex items-center justify-between text-[10px]">
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-mono font-medium ${
                  isSelected ? "bg-slate-900 text-amber-300 border border-slate-800" : "bg-slate-100 text-slate-600"
                }`}>
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>Neural AI</span>
                </span>
                <span className={`text-[9px] truncate max-w-[120px] ${
                  isSelected ? "text-slate-400" : "text-slate-500"
                }`}>
                  {isEn ? v.neuralVoiceNameEn?.split(" ")[0] : v.neuralVoiceNameHi?.split(" ")[0]}
                </span>
              </div>

              {/* Sample Catchphrase & Preview State */}
              <div
                className={`mt-1 pt-2 border-t text-[11px] font-medium leading-snug relative z-10 flex items-center justify-between gap-2 ${
                  isSelected
                    ? "border-slate-800 text-slate-300"
                    : "border-slate-100 text-slate-600"
                }`}
              >
                <p className="truncate italic">
                  &ldquo;{isEn ? v.previewEn : v.previewHi}&rdquo;
                </p>

                {/* Equalizer Wave / Preview Pill */}
                {isPreviewing ? (
                  <span className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-black animate-pulse">
                    <span className="w-1 h-2.5 bg-slate-950 animate-bounce inline-block" />
                    <span className="w-1 h-3.5 bg-slate-950 animate-bounce delay-75 inline-block" />
                    <span className="w-1 h-2 bg-slate-950 animate-bounce delay-150 inline-block" />
                  </span>
                ) : (
                  <span
                    className={`shrink-0 text-[10px] font-bold ${
                      isSelected ? "text-amber-400" : "text-slate-400"
                    }`}
                  >
                    {isEn ? "Preview ▶" : "Suno ▶"}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Voice Controls: Speed Modifier & Volume */}
      {(onSpeedChange || onVolumeChange) && (
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Speaking Speed Controls */}
          {onSpeedChange && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="font-bold text-slate-700 whitespace-nowrap">
                {isEn ? "Speaking Speed:" : "Bolne Ki Speed:"}
              </span>
              <div className="flex items-center gap-1">
                {speedOptions.map((opt) => {
                  const isActive = Math.abs(speed - opt.val) < 0.05;
                  return (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => onSpeedChange(opt.val)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-slate-950 shadow-xs scale-105"
                          : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Volume Slider */}
          {onVolumeChange && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Volume2 className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="font-bold text-slate-700 whitespace-nowrap">
                {isEn ? "Volume:" : "Volume:"}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-24 sm:w-28 accent-amber-500 cursor-pointer"
                aria-label="Volume slider"
              />
              <span className="font-mono text-[11px] text-slate-600 font-bold w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Honest Device Speech Diagnostics (Never pretends unavailable voices exist!) */}
      {diagnostics && (
        <div className="pt-1.5 px-3 py-2 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-600 text-[11px] font-medium flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {diagnostics.isNeuralActive ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
              <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            )}
            <span className="font-semibold">{isEn ? diagnostics.engineSummary : diagnostics.engineSummaryHi}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            {diagnostics.isNeuralActive
              ? "Microsoft Edge Neural TTS (Zero-Cost)"
              : "Browser Web Speech Fallback"}
          </span>
        </div>
      )}
    </div>
  );
}
