"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Flame, FastForward, Sparkles } from "lucide-react";
import { roastAudio } from "@/lib/audio/roastAudio";
import { Language } from "@/lib/language/types";

interface RoastRevealSuspenseProps {
  friendName: string;
  language: Language;
  onComplete: () => void;
}

export default function RoastRevealSuspense({
  friendName,
  language,
  onComplete,
}: RoastRevealSuspenseProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const suspensePhases =
    language === "en"
      ? [
          { at: 10, text: "Scanning toxic quirks & habits... 🔍" },
          { at: 40, text: `Synthesizing ${friendName}'s savage flaw report... 🔥` },
          { at: 70, text: "Calculating emotional damage quotient... 🚑" },
          { at: 92, text: "Adding lethal squad punchlines... ⚡" },
          { at: 100, text: "Roast ready! Brace yourself! 💀" },
        ]
      : [
          { at: 10, text: "Dost ki ajeeb aadataon ka audit chalu hai... 🔍" },
          { at: 40, text: `${friendName} ki asli crime report ban rahi hai... 🔥` },
          { at: 70, text: "Emotional damage calculate ho raha hai... 🚑" },
          { at: 92, text: "Lethal punchline assemble ho rahi hai... ⚡" },
          { at: 100, text: "Beizzati tayyar hai! Dil thaam ke baitho! 💀" },
        ];

  useEffect(() => {
    // 1. Play dramatic drumroll
    roastAudio.playSound("drumroll", 0.9);

    // 2. Animate progress bar over ~2.4 seconds
    const intervalTime = 30;
    const totalDuration = 2400;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            roastAudio.playSound("whoosh", 0.6);
            onCompleteRef.current();
          }, 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSkip = () => {
    roastAudio.stopAll();
    roastAudio.playSound("whoosh", 0.6);
    onCompleteRef.current();
  };

  // Find current phrase based on progress
  const currentPhrase =
    suspensePhases.find((p) => progress <= p.at)?.text || suspensePhases[suspensePhases.length - 1].text;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-400 shadow-2xl text-center relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

      {/* Animated Drum & Fire Header */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-5">
        <motion.div
          animate={{
            scale: [1, 1.15, 1, 1.2, 1],
            rotate: [0, -6, 6, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.7,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-lg mb-3"
        >
          <span className="text-4xl select-none">🥁</span>
        </motion.div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-bounce" />
          <span>{language === "en" ? "Roast Reveal Drumroll" : "Bhaari Beizzati Loading"}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {language === "en" ? (
            <>Cooking brutal roast for <span className="text-amber-600">{friendName}</span>...</>
          ) : (
            <><span className="text-amber-600">{friendName}</span> ki beizzati pak rahi hai...</>
          )}
        </h3>
      </div>

      {/* Suspense Status Message */}
      <div className="min-h-[44px] flex items-center justify-center mb-6 relative z-10">
        <p className="text-sm sm:text-base font-bold text-slate-700 animate-pulse">
          {currentPhrase}
        </p>
      </div>

      {/* High-voltage Animated Progress Bar */}
      <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 mb-6 z-10 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full shadow-sm"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Skip Button */}
      <div className="flex items-center justify-center gap-3 relative z-10">
        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all shadow-xs cursor-pointer border border-slate-300"
        >
          <FastForward className="w-4 h-4 text-amber-600" />
          <span>{language === "en" ? "Skip Drumroll ⏩" : "Direct Beizzati Dekho ⏩"}</span>
        </button>
      </div>

      {/* Audio hint notice */}
      <p className="mt-4 text-[11px] font-semibold text-slate-400 relative z-10">
        {language === "en"
          ? "🔊 Audio playing via Web Audio API • Tap skip anytime"
          : "🔊 Dramatic drumroll baj raha hai • Skip dabakar turant dekhein"}
      </p>
    </motion.div>
  );
}
