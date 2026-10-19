"use client";

import React from "react";
import { Sparkles, Music, Laugh, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  FunnySoundId,
  SoundEffectDef,
} from "@/lib/audio/funnyVoiceTypes";
import { Language } from "@/lib/language/types";

interface SoundEffectsBarProps {
  soundEffects: SoundEffectDef[];
  activeSoundId: FunnySoundId | null;
  onPlaySound: (soundId: FunnySoundId) => void;
  soundEnabled: boolean;
  language: Language;
  currentStinger?: FunnySoundId | null;
  onStingerChange?: (soundId: FunnySoundId | null) => void;
}

export default function SoundEffectsBar({
  soundEffects,
  activeSoundId,
  onPlaySound,
  soundEnabled,
  language,
  currentStinger,
  onStingerChange,
}: SoundEffectsBarProps) {
  const isEn = language === "en";

  // Filter to 5 primary requested sounds (+ bonus if needed)
  const primarySounds = soundEffects.filter((s) =>
    ["drumroll", "laugh", "fail", "cheer", "whoosh"].includes(s.id)
  );

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-amber-500" />
          <span>{isEn ? "Funny Sound Effects (SFX)" : "Funny Sound Effects (SFX)"}</span>
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          {isEn ? "Tap to play sound" : "Tap karke sound bajao"}
        </span>
      </div>

      {/* Sound Effect Quick-Tap Buttons */}
      <div className="grid grid-cols-5 gap-2">
        {primarySounds.map((s) => {
          const isActive = activeSoundId === s.id;
          return (
            <motion.button
              key={s.id}
              type="button"
              whileTap={{ scale: 0.94 }}
              disabled={!soundEnabled}
              onClick={() => onPlaySound(s.id)}
              className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer text-center relative overflow-hidden ${
                isActive
                  ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/50 scale-102"
                  : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs"
              } ${!soundEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isEn ? s.description : s.descriptionHi}
            >
              <span className={`text-xl sm:text-2xl mb-1 ${isActive ? "animate-bounce" : ""}`}>
                {s.emoji}
              </span>
              <span className="text-[10px] sm:text-xs font-bold leading-tight truncate w-full">
                {isEn ? s.label.split(" ")[1] || s.label : s.labelHi.split(" ")[0] || s.labelHi}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Optional Stinger Audio Toggle */}
      {onStingerChange && (
        <div className="flex items-center justify-between gap-2 pt-1 px-1 text-[11px] text-slate-600">
          <span className="font-medium">
            {isEn ? "Auto sound effect at finish:" : "Voice khatam hone par sound:"}
          </span>
          <div className="flex items-center gap-1">
            {[
              { id: "laugh", label: "😂 Laugh" },
              { id: "drumroll", label: "🥁 Drumroll" },
              { id: "fail", label: "💀 Fail" },
              { id: null, label: isEn ? "None" : "Off" },
            ].map((opt) => (
              <button
                key={opt.id || "none"}
                type="button"
                onClick={() => onStingerChange(opt.id as FunnySoundId | null)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                  currentStinger === opt.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
