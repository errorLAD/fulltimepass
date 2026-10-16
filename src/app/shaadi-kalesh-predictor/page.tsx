"use client";

import React, { useState } from "react";
import { PartyPopper, Sparkles } from "lucide-react";
import { KALESH_QUESTIONS } from "@/lib/data/toolData";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData, QuestionOption } from "@/lib/types";

export default function ShaadiKaleshPredictorPage() {
  const [weddingName, setWeddingName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleQuizComplete = (
    answers: { questionId: string; selectedOption: QuestionOption }[]
  ) => {
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const maxScore = answers.length * 99;
    const kaleshPercent = Math.min(Math.round((totalScore / maxScore) * 100), 99);

    let title = "High Voltage Mohalla Riot Alert 💥";
    let desc = "Paneer khatam hote hi Fufaji ka mood off! DJ wale bhaiya ko Chachaji ne stage se utha ke Naagin dance pe lagaya, aur car parking mein Alto vs Fortuner ki ladai tay hai.";
    let punchline = "Kalesh Forecast: Bouncer bulane ki tayaari abhi se shuru kar do!";

    if (kaleshPercent <= 30) {
      title = "Sanskaari Shanti (Suspiciously Calm) 🕊️";
      desc = "Sab rishtedaar smile kar rahe hain, khana sabko mila. Lekin dhyan rakhna, shaant paani mein hi gehra kalesh chhupa hota hai!";
      punchline = "Kalesh Forecast: Mausiji ghar jaake call pe burai karengi.";
    } else if (kaleshPercent <= 65) {
      title = "Moderate Desi Tamasha 🥁";
      desc = "Thoda sa cold drink issue, thoda sa dulhe ke joota chupai mein argument. Standard North/South Indian wedding protocol maintained!";
      punchline = "Kalesh Forecast: Chachaji ko do peg pila ke shaant rakhna padega.";
    }

    const coupleName = weddingName.trim() || "The Royal Desi Wedding";

    setResult({
      toolSlug: "shaadi-kalesh-predictor",
      toolTitle: "Shaadi Kalesh Predictor 🥁",
      category: "Shaadi",
      targetName: coupleName,
      badgeTitle: title,
      score: `${kaleshPercent}%`,
      scoreLabel: "Kalesh Probability",
      subtitle: "Official Indian Wedding Drama Forecast",
      description: desc,
      punchline,
      metrics: [
        { label: "Fufaji Offense Risk", value: kaleshPercent > 50 ? "99.9% 😾" : "40%" },
        { label: "Paneer Shortage", value: kaleshPercent > 60 ? "Critical 🧀" : "Controlled" },
        { label: "Naagin Dance", value: "Compulsory at 11 PM" },
      ],
      bulletPoints: [
        "Prediction 1: Barati log buffet gate khulte hi tsunami ban jayenge",
        "Prediction 2: Photocopy album mein 50 door ke rishtedaar judge karenge",
        "Prediction 3: Return gift ke mithai ke dibbe ka post-mortem pakka hai",
      ],
      disclaimer: "Fictional Comedy Predictor: Made for wedding laughter, do not cancel your wedding planner!",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setWeddingName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
          <PartyPopper className="w-4 h-4 text-purple-400" />
          <span>FullTimePass • Wedding Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Shaadi Kalesh Predictor 🥁
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Will Fufaji get offended over cold paneer? Will Chachaji hijack the DJ mic for Naagin dance? Calculate the exact wedding drama quotient!
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-slate-800 backdrop-blur-md space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Couple / Family Wedding Title 👰🤵
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Weds Simran, Gupta Ji Ki Shaadi..."
              value={weddingName}
              onChange={(e) => setWeddingName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Predict Wedding Kalesh 🥁</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={KALESH_QUESTIONS as any}
          toolTitle="Shaadi Kalesh Predictor"
          toolSlug="shaadi-kalesh-predictor"
          accentColor="from-purple-500 via-pink-500 to-amber-500"
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
