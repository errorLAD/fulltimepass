"use client";

import React, { useState } from "react";
import { PartyPopper, Sparkles } from "lucide-react";
import { getKaleshQuestions, getKaleshDiagnoses } from "@/lib/data/toolDataHelper";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData, QuestionOption } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function ShaadiKaleshPredictorPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

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
    // Calibrated Shaadi Kalesh probability mapping based on 3 questions
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const minScore = 40;
    const maxScore = 293;
    const kaleshPercent = Math.min(Math.max(Math.round(((totalScore - minScore) / (maxScore - minScore)) * 100), 0), 99);

    const diagnoses: any = getKaleshDiagnoses(language);
    let chosenDiag: any;
    if (kaleshPercent <= 35) {
      chosenDiag = getRandomItem(diagnoses.calm);
    } else if (kaleshPercent <= 65) {
      chosenDiag = getRandomItem(diagnoses.moderate);
    } else {
      chosenDiag = getRandomItem(diagnoses.riot);
    }

    const coupleName = weddingName.trim() || (isEn ? "The Grand Wedding" : "The Royal Desi Wedding");

    setResult({
      toolSlug: "shaadi-kalesh-predictor",
      toolTitle: isEn ? "Wedding Drama Predictor 🥁" : "Shaadi Kalesh Predictor 🥁",
      category: isEn ? "Relationship" : "Shaadi",
      targetName: coupleName,
      badgeTitle: chosenDiag.title,
      score: `${kaleshPercent}%`,
      scoreLabel: isEn ? "Drama Probability" : "Kalesh Probability",
      subtitle: isEn ? "Official Wedding Drama Forecast" : "Official Indian Wedding Drama Forecast",
      description: chosenDiag.desc,
      punchline: chosenDiag.punchline,
      metrics: [
        { label: isEn ? "Offended Relative Risk" : "Fufaji Offense Risk", value: kaleshPercent > 50 ? "99.9% 😾" : "40%" },
        { label: isEn ? "Catering Catastrophe" : "Paneer Shortage", value: kaleshPercent > 60 ? (isEn ? "Critical 🧀" : "Critical 🧀") : (isEn ? "Controlled" : "Controlled") },
        { label: isEn ? "Chaotic Dance Floor" : "Naagin Dance", value: isEn ? "Guaranteed at 11 PM 🕺" : "Compulsory at 11 PM 🐍" },
      ],
      bulletPoints: isEn
        ? [
            "Prediction 1: Guests will swarm the appetizer buffet within 4 seconds of opening",
            "Prediction 2: Distant relatives will critique table placements and lighting",
            "Prediction 3: Party favors will undergo extensive auntie quality inspection",
          ]
        : [
            "Prediction 1: Barati log buffet gate khulte hi tsunami ban jayenge",
            "Prediction 2: Photocopy album mein 50 door ke rishtedaar judge karenge",
            "Prediction 3: Return gift ke mithai ke dibbe ka post-mortem pakka hai",
          ],
      disclaimer: isEn
        ? "Fictional Comedy Predictor: Made for wedding laughter, do not fire your wedding planner!"
        : "Fictional Comedy Predictor: Made for wedding laughter, do not cancel your wedding planner!",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setWeddingName("");
  };

  const questions = getKaleshQuestions(language);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-3">
          <PartyPopper className="w-4 h-4 text-purple-600" />
          <span>FullTimePass • {isEn ? "Wedding Intelligence" : "Wedding Intelligence"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Wedding Drama Predictor 🥁" : "Shaadi Kalesh Predictor 🥁"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Will dramatic relatives take offense over table seating? Will someone hijack the DJ mic after midnight? Answer 3 quick questions to calculate the exact wedding drama quotient!"
            : "Will Fufaji get offended over cold paneer? Will Chachaji hijack the DJ mic for Naagin dance? Answer 3 quick questions to calculate the exact wedding drama quotient!"}
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2.5">
              {isEn ? "Couple / Wedding Event Title 👰🤵" : "Couple / Family Wedding Title 👰🤵"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Alex & Jordan's Big Day, Smith Wedding..." : "e.g. Rahul Weds Simran, Gupta Ji Ki Shaadi..."}
              value={weddingName}
              onChange={(e) => setWeddingName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{isEn ? "Predict Wedding Drama (3 Questions) 🥁" : "Calculate Kalesh Probability (3 Questions) 🥁"}</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={questions}
          toolTitle={isEn ? "Wedding Drama Predictor" : "Shaadi Kalesh Predictor"}
          toolSlug="shaadi-kalesh-predictor"
          accentColor="from-purple-500 via-pink-500 to-amber-500"
          onComplete={handleQuizComplete}
        />
      )}
      <RelatedTools currentSlug="shaadi-kalesh-predictor" />
    </div>
  );
}
