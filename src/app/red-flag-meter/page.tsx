"use client";

import React, { useState } from "react";
import { Flag, Sparkles } from "lucide-react";
import { RED_FLAG_QUESTIONS } from "@/lib/data/toolData";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData, QuestionOption } from "@/lib/types";

export default function RedFlagMeterPage() {
  const [partnerName, setPartnerName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleQuizComplete = (
    answers: { questionId: string; selectedOption: QuestionOption }[]
  ) => {
    // Total max potential score across questions
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const maxScore = answers.length * 60;
    const percentage = Math.min(Math.round((totalScore / maxScore) * 100), 99);

    let title = "Walking Red Fort 🚩";
    let desc = "Bhai/Behen, inka toxicity quotient dekh ke Chernobyl ke scientists bhi PPE suit pehen lein. Reply 8 ghante baad aur Instagram pe 24/7 online!";
    let punchline = "Recommendation: Turant bhag jao aur block list update karo!";

    if (percentage <= 25) {
      title = "Pure Green Forest 🌲";
      desc = "Itne green flag hain ki lagta hai bhagwan ne direct heaven se bheja hai. Sambhal ke rakhna, aisi prajati willupt ho chuki hai!";
      punchline = "Recommendation: Turant rishta pakka karo!";
    } else if (percentage <= 55) {
      title = "Yellow Signal with Minor Drama ⚠️";
      desc = "Kuch ajeeb aadatain hain (like reels hide karna ya fake excuses), par normal human beings jaisi hain. Pyar aur momos se theek ho sakte hain.";
      punchline = "Recommendation: Regular monitoring aur WiFi password track karo!";
    } else if (percentage <= 80) {
      title = "High Voltage Toxic Hazard ⚡🚩";
      desc = "Inke mood swings ka koi schedule nahi hai. Ek minute mein 'baby' agle minute mein silent treatment aur 3 saal purana screenshot!";
      punchline = "Recommendation: Emotional insurance policy karwa lo!";
    }

    const nameToDisplay = partnerName.trim() || "Your Special Someone";

    setResult({
      toolSlug: "red-flag-meter",
      toolTitle: "GF/BF Red Flag Meter 🚩",
      category: "Relationship",
      targetName: nameToDisplay,
      badgeTitle: title,
      score: `${percentage}%`,
      scoreLabel: "Red Flag Quotient",
      subtitle: "Entertainment Certified Relationship Audit",
      description: desc,
      punchline,
      metrics: [
        { label: "Drama Level", value: `${Math.min(percentage + 10, 100)}% 🎭` },
        { label: "Reply Speed", value: percentage > 50 ? "404 Not Found" : "Instant ⚡" },
        { label: "Loyalty Score", value: `${100 - percentage}% 💚` },
      ],
      bulletPoints: [
        "Audit Status: 100% Satirical Relationship Entertainment",
        `Subject Analyzed: ${nameToDisplay}`,
        "Safety Warning: Iss result ko real fight ka reason mat banana dost!",
      ],
      disclaimer: "Official Joke Certificate: Fictional fun for entertainment only, not a genuine character assessment.",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setPartnerName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-3">
          <Flag className="w-4 h-4 text-rose-500" />
          <span>FullTimePass • Relationship Lab</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          GF/BF Red Flag Meter 🚩
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Check how toxic, safe or chaotic your partner or crush is. Answer 6 hilarious real-world relationship dilemmas to reveal their official percentage certificate!
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-slate-800 backdrop-blur-md space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Partner / Crush ka Naam (Optional) 💘
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul, Simran, My Ex, Future Wifey..."
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              maxLength={40}
            />
            <p className="text-xs text-slate-400 mt-2">
              Khali chhod doge toh bhi test chalega!
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-black text-white bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>Start Red Flag Test 🚩</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={RED_FLAG_QUESTIONS}
          toolTitle="Red Flag Meter"
          toolSlug="red-flag-meter"
          accentColor="from-rose-500 via-red-500 to-amber-500"
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
