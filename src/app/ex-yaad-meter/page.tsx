"use client";

import React, { useState } from "react";
import { HeartCrack, Sparkles } from "lucide-react";
import { EX_YAAD_QUESTIONS } from "@/lib/data/toolData";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData, QuestionOption } from "@/lib/types";

export default function ExYaadMeterPage() {
  const [yourName, setYourName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleQuizComplete = (
    answers: { questionId: string; selectedOption: QuestionOption }[]
  ) => {
    // Total grief score
    const totalGrief = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const maxGrief = answers.length * 100;
    const griefPercent = Math.min(Math.round((totalGrief / maxGrief) * 100), 100);

    // Moving on score is inverse of grief percent
    const movingOnScore = Math.max(100 - griefPercent, 3); // minimum 3% for fun

    let title = "Devdas Pro Max 🍺";
    let desc = "Bhai moving on status: 12%. Profile checking: daily attendance! Ek sad song bajte hi phone utha ke unka 'Last Seen' check karne ki aadat gayi nahi hai.";
    let punchline = "Prescription: Ek plate spicy momo khao aur Arijit Singh ki playlist delete karo!";

    if (movingOnScore >= 80) {
      title = "Freedom Fighter 🦅 (Completely Healed)";
      desc = "Kamaal kar diya dost! Ex ki yaad toh door, agar wo road pe saamne aa jaye toh tum 'Excuse me bhaiya/didi' bol ke nikal jaoge. Respect!";
      punchline = "Prescription: Party do squad ko, tum officially free ho chuke ho!";
    } else if (movingOnScore >= 50) {
      title = "Almost Healed (Relapse Hazard) ⚠️";
      desc = "Din mein sab theek rehta hai, par raat ko 2:30 AM purani photo dekh ke halki si aah nikal jaati hai. Reel scroll karte waqt sambhal ke raho!";
      punchline = "Prescription: Phone ko raat ko doosre kamre mein charge lagao.";
    } else if (movingOnScore >= 25) {
      title = "Nostalgia Ka Mareez 📻";
      desc = "Unhone move on karke naye relationships bana liye, aur tum abhi bhi 2021 ke birthday text ka screenshot zoom karke dekh rahe ho!";
      punchline = "Prescription: Friend ko bolo tumhara Instagram temporarily block kare!";
    }

    const userNameDisplay = yourName.trim() || "Heartbreak Champion";

    setResult({
      toolSlug: "ex-yaad-meter",
      toolTitle: "Ex Yaad Aa Rahi Hai Meter 💔",
      category: "Relationship",
      userName: userNameDisplay,
      badgeTitle: title,
      score: `${movingOnScore}%`,
      scoreLabel: "Moving-On Score",
      subtitle: "Official Heartbreak Recovery Diagnosis",
      description: desc,
      punchline,
      metrics: [
        { label: "Profile Stalking", value: movingOnScore < 50 ? "Daily 24/7" : "Zero %" },
        { label: "Arijit Addiction", value: movingOnScore < 40 ? "Fatal 🎧" : "Under Control" },
        { label: "Recovery Stage", value: `${movingOnScore}% Healed` },
      ],
      bulletPoints: [
        "Diagnostic Tool: FullTimePass Broken Heart Sensor",
        `Patient: ${userNameDisplay}`,
        "Satirical Advice: Move on nahi ho raha toh nayi hobby dhoondo dost!",
      ],
      disclaimer: "100% Comedy Therapy • Koi bhi dil todne ka real claim nahi karta.",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setYourName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
          <HeartCrack className="w-4 h-4 text-purple-400" />
          <span>FullTimePass • Dil Ka Doctor</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Ex Yaad Aa Rahi Hai Meter 💔
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Are you truly over them or just one sad Punjabi song away from an emotional breakdown? Calculate your real Moving-On score!
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-slate-800 backdrop-blur-md space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Apna Naam ya Nickname 👤
            </label>
            <input
              type="text"
              placeholder="e.g. Kabir, Devdas, Anjali, Anonymous Lover..."
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-black text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>Check My Moving-On Status 💔</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={EX_YAAD_QUESTIONS}
          toolTitle="Ex Yaad Meter"
          toolSlug="ex-yaad-meter"
          accentColor="from-purple-500 via-indigo-500 to-pink-500"
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
