"use client";

import React, { useState } from "react";
import { Wallet, Sparkles } from "lucide-react";
import { getAukaatQuestions, getAukaatDiagnoses } from "@/lib/data/toolDataHelper";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData, QuestionOption } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function AukaatCheckerPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

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
    // Calibrated wealth and lifestyle score mapping based on 3 questions
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const minScore = 30;
    const maxScore = 285;
    const wealthScore = Math.min(Math.max(Math.round(((totalScore - minScore) / (maxScore - minScore)) * 100), 0), 99);

    const diagnoses: any = getAukaatDiagnoses(language);
    let chosenDiag: any;
    if (wealthScore >= 80) {
      chosenDiag = getRandomItem(diagnoses.rich);
    } else if (wealthScore >= 55) {
      chosenDiag = getRandomItem(diagnoses.middle);
    } else if (wealthScore >= 30) {
      chosenDiag = getRandomItem(diagnoses.emi);
    } else {
      chosenDiag = getRandomItem(diagnoses.broke);
    }

    const userNameDisplay = yourName.trim() || (isEn ? "Financial Legend" : "Financial Legend");

    setResult({
      toolSlug: "aukaat-checker",
      toolTitle: isEn ? "Net Worth Reality Check 💸" : "Aukaat Checker 💸",
      category: "Money",
      userName: userNameDisplay,
      badgeTitle: chosenDiag.title,
      score: `${wealthScore}%`,
      scoreLabel: isEn ? "Middle-Class Wealth Index" : "Middle-Class Wealth Index",
      subtitle: isEn ? "Satirical Financial Lifestyle Audit" : "Satirical Financial Lifestyle Audit",
      description: chosenDiag.desc,
      punchline: chosenDiag.punchline,
      metrics: [
        { label: isEn ? "Takeout Addiction" : "Swiggy Addiction", value: wealthScore < 50 ? (isEn ? "Severe 🍕" : "Severe 🍕") : (isEn ? "Disciplined 🥗" : "Disciplined 🥗") },
        { label: isEn ? "Debt Burden" : "EMI Burden", value: wealthScore < 45 ? (isEn ? "Red Alert 🚨" : "Red Alert 🚨") : (isEn ? "Safe Zone 🛡️" : "Safe Zone 🛡️") },
        { label: isEn ? "Cashback Luck" : "Cashback Luck", value: isEn ? "$0.05 Reward Card" : "₹3 Scratch Card" },
      ],
      bulletPoints: [
        `Candidate: ${userNameDisplay}`,
        isEn
          ? "Security Note: No bank credentials or sensitive financial data requested"
          : "Security Note: No bank credentials or sensitive financial data requested",
        isEn
          ? "Official Recommendation: Treat your friends to coffee today!"
          : "Official Recommendation: Treat your friends with tapri chai today!",
      ],
      disclaimer: isEn
        ? "Satirical Financial Parody: Entertainment only, does not constitute real financial analysis."
        : "Satirical Financial Parody: Entertainment only, does not constitute real financial analysis.",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setYourName("");
  };

  const questions = getAukaatQuestions(language);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
          <Wallet className="w-4 h-4 text-emerald-600" />
          <span>FullTimePass • {isEn ? "Financial Reality Check" : "Financial Roast"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Net Worth Reality Check 💸" : "Aukaat Checker 💸"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Discover your real financial avatar: Are you an Installment Billionaire, Budget Aristocrat, or surviving on coupons & prayers? Answer 3 quick questions for your satirical lifestyle audit!"
            : "Discover your real financial avatar: Are you an EMI Wala Ambani, Budget Ka Badshah, or living on Dua & Cashback? Answer 3 quick questions for your satirical lifestyle audit!"}
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2.5">
              {isEn ? "Your Name or Nickname 👤" : "Aapka Naam ya Nickname 👤"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Warren, Jordan, Taylor, Dave..." : "e.g. Bunty, Harshad Mehta 2.0, Priya..."}
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{isEn ? "Check My Financial Reality (3 Questions) 💸" : "Check My Aukaat (3 Questions) 💸"}</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={questions}
          toolTitle={isEn ? "Net Worth Reality Check" : "Aukaat Checker"}
          toolSlug="aukaat-checker"
          accentColor="from-emerald-500 via-teal-500 to-green-500"
          onComplete={handleQuizComplete}
        />
      )}
      <RelatedTools currentSlug="aukaat-checker" />
    </div>
  );
}
