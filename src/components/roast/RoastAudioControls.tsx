"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  Sparkles,
  Music,
  Laugh,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  roastAudio,
  COMEDY_SOUNDS,
  ROAST_VOICE_STYLES,
  ComedySoundId,
  VoiceStyle,
  SpeechState,
} from "@/lib/audio/roastAudio";
import { Language } from "@/lib/language/types";

interface RoastAudioControlsProps {
  friendName: string;
  description: string;
  punchline?: string;
  language: Language;
}

export default function RoastAudioControls({
  friendName,
  description,
  punchline,
  language,
}: RoastAudioControlsProps) {
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedVoiceStyle, setSelectedVoiceStyle] = useState<VoiceStyle>("desi");
  const [activeSoundId, setActiveSoundId] = useState<ComedySoundId | null>(null);
  const [stingerSound, setStingerSound] = useState<ComedySoundId | null>("laugh");
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  useEffect(() => {
    setSoundEnabled(roastAudio.isEnabled());
    setIsSpeechSupported(roastAudio.isSpeechSupported());
    setStingerSound(roastAudio.getStingerSound());

    const unsubscribe = roastAudio.subscribeState((state) => {
      setSpeechState(state);
    });

    return () => {
      unsubscribe();
      roastAudio.stopAll();
    };
  }, []);

  const handleToggleMute = () => {
    const next = roastAudio.toggleSound();
    setSoundEnabled(next);
  };

  const handlePlayVoice = () => {
    if (speechState === "playing") {
      roastAudio.pauseRoast();
    } else if (speechState === "paused") {
      roastAudio.resumeRoast();
    } else {
      roastAudio.speakRoast({
        friendName,
        description,
        punchline,
        language,
        style: selectedVoiceStyle,
      });
    }
  };

  const handleStopVoice = () => {
    roastAudio.stopRoast();
  };

  const handleReplayVoice = () => {
    roastAudio.speakRoast({
      friendName,
      description,
      punchline,
      language,
      style: selectedVoiceStyle,
    });
  };

  const handleSoundEffect = async (soundId: ComedySoundId) => {
    setActiveSoundId(soundId);
    await roastAudio.playSound(soundId);
    setTimeout(() => {
      setActiveSoundId((prev) => (prev === soundId ? null : prev));
    }, 1200);
  };

  const handleVoiceStyleChange = (style: VoiceStyle) => {
    setSelectedVoiceStyle(style);
    if (speechState === "playing") {
      roastAudio.speakRoast({
        friendName,
        description,
        punchline,
        language,
        style,
      });
    }
  };

  const handleStingerChange = (soundId: ComedySoundId | null) => {
    setStingerSound(soundId);
    roastAudio.setStingerSound(soundId);
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. PROMINENT "SUNO APNI BEIZZATI" HERO BUTTON */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-xl overflow-hidden group">
        <div className="bg-slate-950 rounded-[22px] p-4 sm:p-5 relative overflow-hidden">
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handlePlayVoice}
              disabled={!soundEnabled}
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-3.5 py-4 px-6 rounded-2xl text-base sm:text-lg font-black tracking-wide transition-all shadow-lg cursor-pointer ${
                speechState === "playing"
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white animate-pulse"
                  : speechState === "paused"
                  ? "bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950"
                  : "bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 active:scale-98"
              } ${!soundEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {speechState === "playing" ? (
                <>
                  <Pause className="w-6 h-6 shrink-0 fill-current" />
                  <div className="text-left">
                    <span className="block leading-tight uppercase font-black">
                      {language === "en" ? "Pause Roast Voice" : "Pause Roast Voice"}
                    </span>
                    <span className="text-xs font-semibold opacity-90 block">
                      {language === "en" ? "Tap to pause speech" : "Tap karke aawaz rokein"}
                    </span>
                  </div>
                </>
              ) : speechState === "paused" ? (
                <>
                  <Play className="w-6 h-6 shrink-0 fill-current" />
                  <div className="text-left">
                    <span className="block leading-tight uppercase font-black">
                      {language === "en" ? "Resume Roast Voice ▶️" : "Resume Roast Voice ▶️"}
                    </span>
                    <span className="text-xs font-semibold opacity-90 block">
                      {language === "en" ? "Continue listening" : "Wahin se aage suno"}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-slate-950/15 flex items-center justify-center shrink-0">
                    <Volume2 className="w-6 h-6 text-slate-950 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-base sm:text-lg leading-tight uppercase font-black tracking-wide">
                      {language === "en" ? "🔊 HEAR THE ROAST 🔥" : "🔊 SUNO APNI BEIZZATI 🔥"}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-900/80 block">
                      {language === "en"
                        ? "Listen aloud in funny expressive voice"
                        : "Browser Voice mein suniye bhai ka roast"}
                    </span>
                  </div>
                </>
              )}

              {/* Animated Equalizer Waves when speaking */}
              {speechState === "playing" && (
                <div className="flex items-center gap-1 shrink-0 ml-auto pl-2">
                  {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: ["6px", "22px", "8px"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.5 + i * 0.1,
                        ease: "easeInOut",
                      }}
                      className="w-1 bg-white rounded-full inline-block"
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Quick Voice Control Pills: Replay, Stop, Mute */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              {speechState !== "idle" && (
                <button
                  type="button"
                  onClick={handleStopVoice}
                  title="Stop Audio"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-rose-300 bg-slate-900 border border-rose-500/40 hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span>{language === "en" ? "Stop" : "Stop"}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleReplayVoice}
                disabled={!soundEnabled}
                title="Replay Voice"
                className="min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-amber-300 bg-slate-900 border border-amber-500/40 hover:bg-amber-950/40 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className={`w-4 h-4 text-amber-400 ${speechState === "playing" ? "animate-spin" : ""}`} />
                <span>{language === "en" ? "Replay" : "Replay"}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                title={soundEnabled ? "Mute All Sound" : "Unmute All Sound"}
                className={`min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                  soundEnabled
                    ? "text-emerald-300 bg-slate-900 border-emerald-500/40 hover:bg-emerald-950/40"
                    : "text-rose-300 bg-rose-950/80 border-rose-500 hover:bg-rose-900"
                }`}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>Mute</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-200">Unmute</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Voice Mood / Style Selector */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 relative z-10 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              {language === "en" ? "Roast Voice Style:" : "Roast Voice Style:"}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(ROAST_VOICE_STYLES) as VoiceStyle[]).map((styleKey) => {
                const conf = ROAST_VOICE_STYLES[styleKey];
                const isSelected = selectedVoiceStyle === styleKey;
                return (
                  <button
                    key={styleKey}
                    type="button"
                    onClick={() => handleVoiceStyleChange(styleKey)}
                    className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? "bg-amber-400 text-slate-950 shadow-xs"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
                    }`}
                  >
                    <span>{conf.emoji}</span>
                    <span>{conf.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Unsupported Speech Synthesis Notice (if applicable) */}
      {!isSpeechSupported && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold text-center">
          ⚠️{" "}
          {language === "en"
            ? "Your browser does not support text-to-speech, but comedy sound effects are ready below!"
            : "Aapke browser mein speech synthesis nahi hai, par neeche diye gaye sound effects 100% chalte hain!"}
        </div>
      )}

      {/* 2. COMEDY SOUND EFFECTS SELECTOR & PREVIEW SOUNDBOARD */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
              <Laugh className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                {language === "en" ? "Comedy Sound Effects 🎉" : "Comedy Sound Effects 🎭"}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {language === "en"
                  ? "Tap any sound to preview & play funny reactions"
                  : "Kisi bhi button ko daba kar comedy sound effect suno"}
              </p>
            </div>
          </div>

          {/* Stinger Sound Selector */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              {language === "en" ? "End Stinger:" : "Roast Punchline Sound:"}
            </span>
            <select
              value={stingerSound || "none"}
              onChange={(e) =>
                handleStingerChange(
                  e.target.value === "none" ? null : (e.target.value as ComedySoundId)
                )
              }
              className="bg-transparent text-xs font-bold text-amber-900 focus:outline-none cursor-pointer"
            >
              <option value="none">None 🚫</option>
              <option value="laugh">😂 Laugh</option>
              <option value="fail">💀 Fail Sound</option>
              <option value="circus">🤡 Circus Honk</option>
              <option value="cheer">🔥 Crowd Cheer</option>
              <option value="goat">🐐 Goat Bleat</option>
              <option value="drumroll">🥁 Drumroll</option>
              <option value="whoosh">💨 Whoosh</option>
            </select>
          </div>
        </div>

        {/* 7 Sound Effects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {COMEDY_SOUNDS.map((sound) => {
            const isPlayingThis = activeSoundId === sound.id;
            return (
              <button
                key={sound.id}
                type="button"
                onClick={() => handleSoundEffect(sound.id)}
                className={`min-h-[58px] p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group active:scale-95 ${
                  isPlayingThis
                    ? "bg-amber-100 border-2 border-amber-500 text-slate-950 shadow-sm scale-102"
                    : "bg-slate-50 hover:bg-amber-50/70 border-slate-200 hover:border-amber-300 text-slate-700"
                }`}
              >
                <span className={`text-xl transition-transform ${isPlayingThis ? "animate-bounce" : "group-hover:scale-110"}`}>
                  {sound.emoji}
                </span>
                <span className="text-[11px] font-extrabold leading-tight text-slate-800 line-clamp-1">
                  {language === "en" ? sound.label : sound.labelHi}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] text-center text-slate-400 font-medium">
          {language === "en"
            ? "100% Original, royalty-free audio synthesized for mobile & desktop • Zero copyright risk"
            : "100% Original, royalty-free audio • Mobile aur Desktop dono pe bina delay ke chalta hai"}
        </p>
      </div>
    </div>
  );
}
