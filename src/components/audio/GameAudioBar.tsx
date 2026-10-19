"use client";

import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Radio,
  Sliders,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFunnyVoice } from "@/lib/audio/useFunnyVoice";
import { getContextualAudioLabel } from "@/lib/audio/funnyVoiceEngine";
import FunnyVoiceSelector from "./FunnyVoiceSelector";
import SoundEffectsBar from "./SoundEffectsBar";
import { Language } from "@/lib/language/types";

interface GameAudioBarProps {
  toolSlug: string;
  toolTitle?: string;
  badgeTitle?: string;
  targetName?: string;
  description: string;
  punchline?: string;
  score?: number | string;
  scoreLabel?: string;
  customAudioTitle?: string;
  customAudioSubtitle?: string;
  language: Language;
  showVoiceSelector?: boolean;
  showSoundEffects?: boolean;
  defaultExpanded?: boolean;
}

export default function GameAudioBar({
  toolSlug,
  toolTitle,
  badgeTitle,
  targetName,
  description,
  punchline,
  score,
  scoreLabel,
  customAudioTitle,
  customAudioSubtitle,
  language,
  showVoiceSelector = true,
  showSoundEffects = true,
  defaultExpanded = false,
}: GameAudioBarProps) {
  const isEn = language === "en";
  const [drawerOpen, setDrawerOpen] = useState(defaultExpanded);

  const {
    speechState,
    soundEnabled,
    selectedVoiceId,
    selectedVoiceConfig,
    availableVoiceConfigs,
    soundEffects,
    speed,
    volume,
    activeSoundId,
    previewingVoiceId,
    stinger,
    diagnostics,
    previewVoice,
    toggleMute,
    setSpeed,
    setVolume,
    playSound,
    speak,
    pause,
    resume,
    stop,
    replay,
    updateStinger,
  } = useFunnyVoice(language);

  // Compute Contextual Titles
  const defaultMeta = getContextualAudioLabel(toolSlug, language);
  const heroTitle = customAudioTitle || defaultMeta.title;
  const heroSubtitle = customAudioSubtitle || defaultMeta.subtitle;

  // Build spoken text script
  const buildSpeechContent = (): { text: string; intro?: string } => {
    let script = "";

    if (targetName) {
      if (isEn) {
        script += `Here is the official report for ${targetName}! ... ... `;
      } else {
        script += `Sunno sab log, yeh hai ${targetName} ka official result! ... ... `;
      }
    }

    if (badgeTitle) {
      if (isEn) {
        script += `Title awarded: ${badgeTitle}! ... ... `;
      } else {
        script += `Official khitaab mila hai: ${badgeTitle}! ... ... `;
      }
    }

    if (score !== undefined && scoreLabel) {
      script += `${scoreLabel}: ${score}. ... `;
    }

    script += description;

    return { text: script };
  };

  const handleHeroAction = () => {
    if (speechState === "loading") {
      stop();
      return;
    }
    if (speechState === "playing") {
      pause();
    } else if (speechState === "paused") {
      resume();
    } else {
      const { text, intro } = buildSpeechContent();
      speak({
        text,
        intro,
        punchline,
        language,
        voiceStyle: selectedVoiceId,
      });
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* 1. HERO CONTEXTUAL AUDIO BAR */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-xl overflow-hidden group">
        <div className="bg-slate-950 rounded-[22px] p-4 sm:p-5 relative overflow-hidden">
          {/* Subtle animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Control Bar: Active Voice Badge & Mute Toggle */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80 relative z-10">
            {/* Active Voice Style Indicator */}
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-amber-300 transition-colors cursor-pointer group/pill"
              title="Change Voice Style"
            >
              <span className="text-base">{selectedVoiceConfig.emoji}</span>
              <span className="text-slate-200">
                {isEn ? "Voice:" : "Aawaz:"}{" "}
                <strong className="text-amber-400">
                  {isEn ? selectedVoiceConfig.label : selectedVoiceConfig.labelHi}
                </strong>
              </span>
              <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover/pill:text-amber-400 ml-1 transition-colors" />
            </button>

            {/* Mute / Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              className={`p-2 rounded-xl transition-all border cursor-pointer ${
                soundEnabled
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  : "bg-rose-950/70 border-rose-800/80 text-rose-400"
              }`}
              title={
                soundEnabled
                  ? isEn
                    ? "Mute all audio"
                    : "Mute karein"
                  : isEn
                  ? "Unmute audio"
                  : "Unmute karein"
              }
              aria-label={soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Center Action: Prominent Contextual Button + Secondary Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
            {/* Hero Contextual Button */}
            <button
              type="button"
              onClick={handleHeroAction}
              disabled={!soundEnabled}
              className={`flex-1 flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 rounded-2xl text-base sm:text-lg font-black tracking-wide transition-all shadow-lg cursor-pointer ${
                speechState === "loading"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white animate-pulse"
                  : speechState === "playing"
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white animate-pulse"
                  : speechState === "paused"
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950"
                  : "bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 active:scale-98"
              } ${!soundEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {speechState === "loading" ? (
                <>
                  <div className="w-7 h-7 rounded-xl bg-slate-950/40 text-white flex items-center justify-center shrink-0">
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight uppercase font-black">
                      {isEn ? "Generating Neural Voice... 🎙️" : "Neural Aawaz Taiyaar Ho Rahi Hai... 🎙️"}
                    </span>
                    <span className="text-[11px] block font-semibold opacity-90">
                      {selectedVoiceConfig.emoji}{" "}
                      {isEn ? selectedVoiceConfig.label : selectedVoiceConfig.labelHi}{" "}
                      • {isEn ? "Synthesizing audio..." : "Audio load ho raha hai..."}
                    </span>
                  </div>
                </>
              ) : speechState === "playing" ? (
                <>
                  <Pause className="w-6 h-6 shrink-0 fill-current" />
                  <div className="text-left">
                    <span className="block leading-tight uppercase font-black">
                      {isEn ? "Pause Audio Voice" : "Aawaz Roko (Pause)"}
                    </span>
                    <span className="text-[11px] block font-semibold opacity-90">
                      {selectedVoiceConfig.emoji}{" "}
                      {isEn ? selectedVoiceConfig.label : selectedVoiceConfig.labelHi}{" "}
                      {isEn ? "Speaking..." : "Bol raha hai..."}
                    </span>
                  </div>
                </>
              ) : speechState === "paused" ? (
                <>
                  <Play className="w-6 h-6 shrink-0 fill-current ml-0.5" />
                  <div className="text-left">
                    <span className="block leading-tight uppercase font-black">
                      {isEn ? "Resume Audio Voice" : "Dobara Suno (Resume)"}
                    </span>
                    <span className="text-[11px] block font-semibold opacity-90">
                      {isEn ? "Click to continue" : "Chalu rakhne ke liye tap karein"}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-7 h-7 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 fill-amber-400 ml-0.5" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight uppercase font-black">
                      {heroTitle}
                    </span>
                    <span className="text-[11px] block font-semibold text-slate-800">
                      {selectedVoiceConfig.emoji}{" "}
                      {isEn ? selectedVoiceConfig.label : selectedVoiceConfig.labelHi}{" "}
                      • {heroSubtitle}
                    </span>
                  </div>
                </>
              )}
            </button>

            {/* Secondary Action Controls: Stop, Replay, Expand Voices */}
            <div className="flex items-center justify-end gap-2 shrink-0">
              {/* Replay Button */}
              <button
                type="button"
                onClick={replay}
                disabled={!soundEnabled}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                title={isEn ? "Replay from start" : "Shuru se dubara suno"}
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span className="sm:hidden">{isEn ? "Replay" : "Dubara"}</span>
              </button>

              {/* Stop Button */}
              {speechState !== "idle" && (
                <button
                  type="button"
                  onClick={stop}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold transition-colors cursor-pointer"
                  title={isEn ? "Stop audio" : "Audio band karein"}
                >
                  <Square className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span className="sm:hidden">{isEn ? "Stop" : "Stop"}</span>
                </button>
              )}

              {/* Toggle Voice Style Drawer */}
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>{isEn ? "Voices & SFX" : "Aawaz Badlo"}</span>
                {drawerOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-400" />
                )}
              </button>
            </div>
          </div>

          {/* Speaking Equalizer Waves Animation */}
          {speechState === "playing" && (
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-300 relative z-10">
              <span className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {isEn ? "Now playing in" : "Abhi chal rahi hai:"}{" "}
                <strong className="text-white">
                  {selectedVoiceConfig.emoji}{" "}
                  {isEn ? selectedVoiceConfig.label : selectedVoiceConfig.labelHi}
                </strong>
              </span>
              <div className="flex items-center gap-1 h-3">
                <span className="w-1 h-full bg-amber-400 animate-pulse rounded-full" />
                <span className="w-1 h-2 bg-amber-400 animate-bounce rounded-full delay-75" />
                <span className="w-1 h-full bg-amber-400 animate-pulse rounded-full delay-150" />
                <span className="w-1 h-2 bg-amber-400 animate-bounce rounded-full delay-100" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. EXPANDABLE VOICE STYLES & SOUND EFFECTS DRAWER */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xl space-y-6">
              {/* Voice Style Selector with Live Preview */}
              {showVoiceSelector && (
                <FunnyVoiceSelector
                  voices={availableVoiceConfigs}
                  selectedVoiceId={selectedVoiceId}
                  previewingVoiceId={previewingVoiceId}
                  onSelectAndPreview={previewVoice}
                  language={language}
                  diagnostics={diagnostics}
                  speed={speed}
                  onSpeedChange={setSpeed}
                  volume={volume}
                  onVolumeChange={setVolume}
                />
              )}

              {/* Sound Effects Bar */}
              {showSoundEffects && (
                <div className="pt-2 border-t border-slate-200">
                  <SoundEffectsBar
                    soundEffects={soundEffects}
                    activeSoundId={activeSoundId}
                    onPlaySound={playSound}
                    soundEnabled={soundEnabled}
                    language={language}
                    currentStinger={stinger}
                    onStingerChange={updateStinger}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
