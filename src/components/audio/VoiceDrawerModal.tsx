"use client";

import React, { useState } from "react";
import { X, Radio, Volume2, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFunnyVoice } from "@/lib/audio/useFunnyVoice";
import FunnyVoiceSelector from "./FunnyVoiceSelector";
import SoundEffectsBar from "./SoundEffectsBar";
import { Language } from "@/lib/language/types";

interface VoiceDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function VoiceDrawerModal({
  isOpen,
  onClose,
  language,
}: VoiceDrawerModalProps) {
  const isEn = language === "en";
  const {
    selectedVoiceId,
    availableVoiceConfigs,
    soundEffects,
    speed,
    volume,
    activeSoundId,
    previewingVoiceId,
    soundEnabled,
    stinger,
    diagnostics,
    previewVoice,
    playSound,
    setSpeed,
    setVolume,
    updateStinger,
  } = useFunnyVoice(language);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-slate-300 max-h-[90vh] overflow-y-auto z-10 text-slate-900 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-sm">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {isEn ? "Natural Voices & Sound Effects" : "Natural Aawaz & Sound Effects"}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {isEn
                    ? "Selected neural voice is remembered across all 20 mini-apps!"
                    : "Chuni hui neural aawaz poori website ke sabhi games mein chalegi!"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Selector */}
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

          {/* Sound Effects */}
          <div className="pt-3 border-t">
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

          {/* Done Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-base shadow-md hover:from-amber-300 hover:to-orange-400 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{isEn ? "Done & Apply Across All Games" : "Save & Sabhi Games Mein Chalao"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
