"use client";

import React, { useState, useEffect } from "react";
import { Flag, Sparkles, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { getRedFlagQuestions, getRedFlagDiagnoses } from "@/lib/data/toolDataHelper";
import { redFlagSoundEngine } from "@/lib/audio/redFlagAudio";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData, QuestionOption } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function RedFlagMeterPage() {
  const { language } = useLanguage();
  const [partnerName, setPartnerName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [lastPercentage, setLastPercentage] = useState(50);

  const questions = getRedFlagQuestions(language);
  const diagnoses = getRedFlagDiagnoses(language);

  useEffect(() => {
    setSoundEnabled(redFlagSoundEngine.isEnabled());
    return () => {
      redFlagSoundEngine.stopAll();
    };
  }, []);

  const handleToggleSound = () => {
    const next = redFlagSoundEngine.toggleSound();
    setSoundEnabled(next);
    if (!next) {
      setIsPlayingAudio(false);
    }
  };

  const handleReplayAnnouncement = () => {
    const defaultPartner = language === "en" ? "Your Partner" : "Aapka Partner";
    const nameToDisplay = partnerName.trim() || defaultPartner;
    const announcement = redFlagSoundEngine.playRedFlagAnnouncement(nameToDisplay, lastPercentage, language);
    setCurrentAnnouncement(announcement.displayText);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 5500);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleQuizComplete = (
    answers: { questionId: string; selectedOption: QuestionOption }[]
  ) => {
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const minPossible = 15;
    const maxPossible = 285;
    const percentage = Math.min(Math.max(Math.round(((totalScore - minPossible) / (maxPossible - minPossible)) * 100), 0), 99);
    setLastPercentage(percentage);

    let chosenDiag: any;
    if (percentage <= 30) {
      chosenDiag = getRandomItem(diagnoses.safe);
    } else if (percentage <= 65) {
      chosenDiag = getRandomItem(diagnoses.moderate);
    } else {
      chosenDiag = getRandomItem(diagnoses.danger);
    }

    const nameToDisplay = partnerName.trim() || (language === "en" ? "Your Special Someone" : "Aapka Partner");

    // Play humorous voice announcement and alarm sounds
    const announcement = redFlagSoundEngine.playRedFlagAnnouncement(nameToDisplay, percentage, language);
    setCurrentAnnouncement(announcement.displayText);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 5500);

    const toolTitle = language === "en" ? "Partner Red Flag Meter 🚩" : "GF/BF Red Flag Meter 🚩";

    setResult({
      toolSlug: "red-flag-meter",
      toolTitle,
      category: "Relationships",
      targetName: nameToDisplay,
      badgeTitle: chosenDiag.title,
      score: `${percentage}%`,
      scoreLabel: language === "en" ? "Red Flag Quotient" : "Red Flag Quotient",
      subtitle: language === "en" ? "Certified Satirical Relationship Audit" : "Entertainment Certified Relationship Audit",
      description: chosenDiag.desc,
      punchline: chosenDiag.punchline,
      metrics: [
        { label: language === "en" ? "Drama Level" : "Drama Level", value: `${Math.min(percentage + 10, 100)}% 🎭` },
        { label: language === "en" ? "Reply Speed" : "Reply Speed", value: percentage > 50 ? (language === "en" ? "404 Not Found ⏳" : "404 Not Found ⏳") : (language === "en" ? "Instant ⚡" : "Instant ⚡") },
        { label: language === "en" ? "Loyalty Score" : "Loyalty Score", value: `${100 - percentage}% 💚` },
      ],
      bulletPoints: language === "en"
        ? [
            "Audit Status: 100% Satirical Relationship Comedy",
            `Subject Audited: ${nameToDisplay}`,
            "Safety Advisory: Do not use this result as justification for a real argument!",
          ]
        : [
            "Audit Status: 100% Satirical Relationship Entertainment",
            `Subject Analyzed: ${nameToDisplay}`,
            "Safety Warning: Iss result ko real fight ka reason mat banana dost!",
          ],
      disclaimer: language === "en"
        ? "Official Comedy Certificate: Fictional humor only, not genuine psychological evaluation."
        : "Official Joke Certificate: Fictional fun for entertainment only, not a genuine character assessment.",
    });
  };

  const handleReset = () => {
    redFlagSoundEngine.stopAll();
    setIsPlayingAudio(false);
    setCurrentAnnouncement("");
    setResult(null);
    setStarted(false);
    setPartnerName("");
  };

  // Audio Announcement Banner above ResultCard
  const audioBanner = currentAnnouncement ? (
    <div className="p-4 sm:p-5 rounded-3xl bg-rose-50/95 border-2 border-rose-300 shadow-xs flex items-start gap-3.5 relative z-10 animate-fade-in">
      <div
        className={`w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${
          isPlayingAudio ? "animate-pulse" : ""
        }`}
      >
        <Volume2 className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
            <span>{language === "en" ? "Comedy Voice Announcement" : "Desi Loudspeaker Announcement"}</span>
            {isPlayingAudio && (
              <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </span>
          <button
            type="button"
            onClick={handleToggleSound}
            className="text-xs font-bold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-rose-200 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span>{soundEnabled ? "Mute" : "Unmute"}</span>
          </button>
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          &ldquo;{currentAnnouncement}&rdquo;
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={handleReplayAnnouncement}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 bg-white hover:bg-rose-100/60 border border-rose-300 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-rose-700 ${isPlayingAudio ? "animate-spin" : ""}`} />
            <span>{language === "en" ? "Play Another Joke 🎲" : "Play Another Joke 🎲"}</span>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // Dedicated Audio Action Button inside the toolbar
  const audioAction = (
    <button
      type="button"
      onClick={handleReplayAnnouncement}
      className="w-full py-3.5 px-5 rounded-2xl text-sm sm:text-base font-extrabold text-slate-900 bg-gradient-to-r from-rose-100 via-rose-50 to-amber-100 hover:from-rose-200 hover:to-amber-200 border-2 border-rose-300 transition-all flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md cursor-pointer"
    >
      <Volume2 className={`w-4 h-4 text-rose-700 ${isPlayingAudio ? "animate-bounce" : ""}`} />
      <span>{language === "en" ? "Replay Audio Voiceover 🔊" : "Replay Lal Qila Voiceover 🔊"}</span>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-3.5">
          <Flag className="w-4 h-4 text-rose-600" />
          <span>FullTimePass • Relationship Lab</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {language === "en" ? "Partner Red Flag Meter 🚩" : "GF/BF Red Flag Meter 🚩"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {language === "en"
            ? "Check how toxic, green-flag or chaotic your partner or crush is. Answer 3 quick dilemmas to reveal their official percentage certificate!"
            : "Check how toxic, safe or chaotic your partner or crush is. Answer 3 quick dilemmas to reveal their official percentage certificate!"}
        </p>
      </div>

      {result ? (
        <ResultCard
          data={result}
          onReset={handleReset}
        />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div>
            <label className="block text-base font-semibold text-slate-900 mb-2.5">
              {language === "en" ? "Partner / Crush Name (Optional) 💘" : "Partner / Crush ka Naam (Optional) 💘"}
            </label>
            <input
              type="text"
              placeholder={
                language === "en"
                  ? "e.g. Alex, Sam, My Ex, Future Crush..."
                  : "e.g. Rahul, Simran, My Ex, Future Wifey..."
              }
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base font-normal text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              maxLength={40}
            />
            <p className="text-sm text-slate-500 mt-2.5 font-normal">
              {language === "en" ? "Leave blank if you prefer an anonymous audit!" : "Khali chhod doge toh bhi test chalega!"}
            </p>
          </div>

          {/* Comedy Voiceover Toggle Pill */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🎙️</span>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {language === "en" ? "Comedy Voice Announcements" : "Desi Comedy Voiceover"}
                </span>
                <span className="text-[11px] text-slate-600 font-medium">
                  {language === "en"
                    ? "Plays comedic warning alarms and satirical voice commentary"
                    : "Plays funny alarm & sarcastic \"Lal Qila\" voiceover"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                  : "bg-white text-slate-600 border-slate-300"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "Sound ON" : "Muted"}</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>{language === "en" ? "Start Red Flag Test (3 Questions) 🚩" : "Start Red Flag Test (3 Questions) 🚩"}</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={questions}
          toolTitle={language === "en" ? "Red Flag Meter" : "Red Flag Meter"}
          toolSlug="red-flag-meter"
          accentColor="from-rose-500 via-red-500 to-amber-500"
          onComplete={handleQuizComplete}
        />
      )}
      <RelatedTools currentSlug="red-flag-meter" />
    </div>
  );
}
