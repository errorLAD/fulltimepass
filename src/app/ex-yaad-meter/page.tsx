"use client";

import React, { useState, useEffect } from "react";
import { HeartCrack, Sparkles, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { getExYaadQuestions, getExYaadDiagnoses } from "@/lib/data/toolDataHelper";
import { exYaadSoundEngine } from "@/lib/audio/exYaadAudio";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData, QuestionOption } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function ExYaadMeterPage() {
  const { language } = useLanguage();
  const [yourName, setYourName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [lastMovingOnScore, setLastMovingOnScore] = useState(50);

  const questions = getExYaadQuestions(language);
  const diagnoses = getExYaadDiagnoses(language);

  useEffect(() => {
    setSoundEnabled(exYaadSoundEngine.isEnabled());
    return () => {
      exYaadSoundEngine.stopAll();
    };
  }, []);

  const handleToggleSound = () => {
    const next = exYaadSoundEngine.toggleSound();
    setSoundEnabled(next);
    if (!next) {
      setIsPlayingAudio(false);
    }
  };

  const handleReplayAnnouncement = () => {
    const defaultUser = language === "en" ? "Heartbreak Champion" : "Dil-Tuta Ashiq";
    const userNameDisplay = yourName.trim() || defaultUser;
    const announcement = exYaadSoundEngine.playExYaadAnnouncement(userNameDisplay, lastMovingOnScore, language);
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
    const totalGrief = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const minGrief = 15;
    const maxGrief = 285;
    const griefPercent = Math.min(Math.max(Math.round(((totalGrief - minGrief) / (maxGrief - minGrief)) * 100), 0), 100);

    const movingOnScore = Math.min(Math.max(100 - griefPercent, 1), 100);
    setLastMovingOnScore(movingOnScore);

    let chosenDiag: any;
    if (movingOnScore >= 75) {
      chosenDiag = getRandomItem(diagnoses.healed);
    } else if (movingOnScore >= 45) {
      chosenDiag = getRandomItem(diagnoses.relapse);
    } else {
      chosenDiag = getRandomItem(diagnoses.devdas);
    }

    const userNameDisplay = yourName.trim() || (language === "en" ? "Heartbreak Champion" : "Dil-Tuta Ashiq");

    // Play humorous voice announcement and sad-music/trombone sound effects
    const announcement = exYaadSoundEngine.playExYaadAnnouncement(userNameDisplay, movingOnScore, language);
    setCurrentAnnouncement(announcement.displayText);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 5500);

    const toolTitle = language === "en" ? "Missing Your Ex? Meter 💔" : "Ex Yaad Aa Rahi Hai Meter 💔";

    setResult({
      toolSlug: "ex-yaad-meter",
      toolTitle,
      category: "Relationships",
      userName: userNameDisplay,
      badgeTitle: chosenDiag.title,
      score: `${movingOnScore}%`,
      scoreLabel: language === "en" ? "Moving-On Score" : "Moving-On Score",
      subtitle: language === "en" ? "Official Heartbreak Recovery Diagnosis" : "Official Heartbreak Recovery Diagnosis",
      description: chosenDiag.desc,
      punchline: chosenDiag.punchline,
      metrics: [
        { label: language === "en" ? "Profile Stalking" : "Profile Stalking", value: movingOnScore < 45 ? (language === "en" ? "Daily 24/7 🕵️" : "Daily 24/7 🕵️") : movingOnScore < 75 ? (language === "en" ? "Once a Week 📱" : "Once a Week 📱") : (language === "en" ? "Zero % 🙅" : "Zero % 🙅") },
        { label: language === "en" ? "Sad Songs Addiction" : "Sad Song Addiction", value: movingOnScore < 45 ? (language === "en" ? "Fatal 🎧" : "Fatal 🎧") : movingOnScore < 75 ? (language === "en" ? "Moderate 📻" : "Moderate 📻") : (language === "en" ? "Immune 🧘" : "Immune 🧘") },
        { label: language === "en" ? "Recovery Stage" : "Recovery Stage", value: `${movingOnScore}% ${language === "en" ? "Healed ✨" : "Healed ✨"}` },
      ],
      bulletPoints: language === "en"
        ? [
            "Diagnostic Tool: FullTimePass Broken Heart Sensor",
            `Patient: ${userNameDisplay}`,
            "Satirical Advice: If you can't move on, pick up a new video game or gym routine!",
          ]
        : [
            "Diagnostic Tool: FullTimePass Broken Heart Sensor",
            `Patient: ${userNameDisplay}`,
            "Satirical Advice: Move on nahi ho raha toh nayi hobby dhoondo dost!",
          ],
      disclaimer: language === "en"
        ? "Official Joke Certificate: 100% comedy satire, not certified therapy."
        : "Official Joke Certificate: Fictional fun for entertainment only, not a genuine medical diagnosis.",
    });
  };

  const handleReset = () => {
    exYaadSoundEngine.stopAll();
    setIsPlayingAudio(false);
    setCurrentAnnouncement("");
    setResult(null);
    setStarted(false);
    setYourName("");
  };

  // Audio Announcement Banner above ResultCard
  const audioBanner = currentAnnouncement ? (
    <div className="p-4 sm:p-5 rounded-3xl bg-purple-50/95 border-2 border-purple-300 shadow-xs flex items-start gap-3.5 relative z-10 animate-fade-in">
      <div
        className={`w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${
          isPlayingAudio ? "animate-pulse" : ""
        }`}
      >
        <Volume2 className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-black uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
            <span>{language === "en" ? "Heartbreak Loudspeaker Announcement" : "Heartbreak Loudspeaker Announcement"}</span>
            {isPlayingAudio && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full animate-pulse">
                Speaking 🔊
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={handleToggleSound}
            className="text-xs font-bold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs hover:bg-slate-50 transition-colors"
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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 bg-white hover:bg-purple-100/60 border border-purple-300 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-purple-700 ${isPlayingAudio ? "animate-spin" : ""}`} />
            <span>{language === "en" ? "Play Another Heartbreak Joke 🎲" : "Play Another Heartbreak Joke 🎲"}</span>
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
      className="w-full py-3.5 px-5 rounded-2xl text-sm sm:text-base font-extrabold text-slate-900 bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 border-2 border-purple-300 transition-all flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md cursor-pointer"
    >
      <Volume2 className={`w-4 h-4 text-purple-700 ${isPlayingAudio ? "animate-bounce" : ""}`} />
      <span>{language === "en" ? "Replay Heartbreak Comedy Voiceover 🔊" : "Replay Heartbreak Comedy Voiceover 🔊"}</span>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-3">
          <HeartCrack className="w-4 h-4 text-purple-600" />
          <span>{language === "en" ? "FullTimePass • Heartbreak Clinic" : "FullTimePass • Dil Ka Doctor"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {language === "en" ? "Missing Your Ex? Meter 💔" : "Ex Yaad Aa Rahi Hai Meter 💔"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {language === "en"
            ? "Are you truly over them or just one midnight playlist away from an emotional breakdown? Answer 3 quick questions to calculate your real Moving-On score!"
            : "Are you truly over them or just one sad Punjabi song away from an emotional breakdown? Answer 3 quick questions to calculate your real Moving-On score!"}
        </p>
      </div>

      {result ? (
        <ResultCard
          data={result}
          onReset={handleReset}
          audioBanner={audioBanner}
          audioAction={audioAction}
        />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2.5">
              {language === "en" ? "Your Name or Nickname 👤" : "Apna Naam ya Nickname 👤"}
            </label>
            <input
              type="text"
              placeholder={
                language === "en"
                  ? "e.g. Jordan, Taylor, Anonymous Lover..."
                  : "e.g. Kabir, Devdas, Anjali, Anonymous Lover..."
              }
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Heartbreak Comedy Voiceover Toggle Pill */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🎙️</span>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {language === "en" ? "Heartbreak Voice Commentary" : "Heartbreak Comedy Voiceover"}
                </span>
                <span className="text-[11px] text-slate-600 font-medium">
                  {language === "en"
                    ? "Plays comedic sad-trombone sound effects and moving-on punchlines"
                    : "Plays funny sad-music, sad trombone & \"Move On\" jokes"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-purple-600 text-white border-purple-700 shadow-xs"
                  : "bg-white text-slate-600 border-slate-300"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "Sound ON" : "Muted"}</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>{language === "en" ? "Check My Moving-On Status (3 Questions) 💔" : "Check My Moving-On Status (3 Questions) 💔"}</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={questions}
          toolTitle={language === "en" ? "Missing Your Ex? Meter" : "Ex Yaad Meter"}
          toolSlug="ex-yaad-meter"
          accentColor="from-purple-500 via-indigo-500 to-pink-500"
          onComplete={handleQuizComplete}
        />
      )}
      <RelatedTools currentSlug="ex-yaad-meter" />
    </div>
  );
}
