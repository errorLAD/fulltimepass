"use client";

import React, { useState } from "react";
import { Volume2, Pause, Sparkles } from "lucide-react";
import { useFunnyVoice } from "@/lib/audio/useFunnyVoice";
import { Language } from "@/lib/language/types";
import { QuestionOption } from "@/lib/types";

interface QuestionAudioButtonProps {
  questionText: string;
  options: QuestionOption[];
  questionIndex: number;
  language: Language;
}

export default function QuestionAudioButton({
  questionText,
  options,
  questionIndex,
  language,
}: QuestionAudioButtonProps) {
  const isEn = language === "en";
  const { speechState, soundEnabled, selectedVoiceConfig, speak, pause, resume } =
    useFunnyVoice(language);

  const [isPlayingThisQuestion, setIsPlayingThisQuestion] = useState(false);

  const handleToggle = () => {
    if (isPlayingThisQuestion && speechState === "playing") {
      pause();
      return;
    }
    if (isPlayingThisQuestion && speechState === "paused") {
      resume();
      return;
    }

    // Prepare speech script for question & options
    let script = "";
    if (isEn) {
      script = `Question number ${questionIndex + 1}! ... ${questionText} ... ... Here are your options: ... `;
      options.forEach((opt, idx) => {
        script += `Option ${idx + 1}: ${opt.text}. ... `;
      });
    } else {
      script = `Sawaal number ${questionIndex + 1}! ... ${questionText} ... ... Suniye options: ... `;
      options.forEach((opt, idx) => {
        script += `Option ${idx + 1}: ${opt.text}. ... `;
      });
    }

    setIsPlayingThisQuestion(true);

    speak({
      text: script,
      language,
      onEnd: () => setIsPlayingThisQuestion(false),
      onError: () => setIsPlayingThisQuestion(false),
    });
  };

  const isSpeaking = isPlayingThisQuestion && speechState === "playing";

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!soundEnabled}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
        isSpeaking
          ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md animate-pulse ring-2 ring-amber-300"
          : "bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-950 border-slate-200 hover:border-amber-300"
      } ${!soundEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
      title={
        isEn
          ? `Read question in ${selectedVoiceConfig.label} voice`
          : `${selectedVoiceConfig.labelHi} ki aawaz mein sawaal suno`
      }
    >
      {isSpeaking ? (
        <>
          <Pause className="w-3.5 h-3.5 fill-current" />
          <span>{isEn ? "Pause Sawaal" : "Sawaal Roko ⏸️"}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
          <span>{isEn ? "Read Question 🔊" : "Suno Sawaal 🔊"}</span>
        </>
      )}
      <span className="text-[10px] text-amber-700 font-bold hidden sm:inline">
        ({selectedVoiceConfig.emoji} {isEn ? selectedVoiceConfig.label : selectedVoiceConfig.labelHi})
      </span>
    </button>
  );
}
