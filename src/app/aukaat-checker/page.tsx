"use client";

import React, { useState } from "react";
import { Wallet, Sparkles } from "lucide-react";
import { AUKAAT_QUESTIONS } from "@/lib/data/toolData";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData, QuestionOption } from "@/lib/types";

export default function AukaatCheckerPage() {
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
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const maxScore = answers.length * 95;
    const wealthScore = Math.min(Math.round((totalScore / maxScore) * 100), 99);

    let title = "EMI Wala Ambani 💳";
    let desc = "Starbucks ki coffee haath mein, iPhone latest 24 months EMI pe, aur bank account mein exactly ₹37 bache hain. Bhai dikhawa 100%, savings -10%!";
    let punchline = "Verdict: Tapri pe wapas aao, financial salvation wahin milegi!";

    if (wealthScore >= 80) {
      title = "Middle Class Warren Buffett 📈";
      desc = "Savings account disciplined, discount coupons master, bina sale ke kuch nahi kharidte. Paisa bachana aapke DNA mein hai!";
      punchline = "Verdict: Colony ke sabse sensible citizen award goes to you!";
    } else if (wealthScore >= 50) {
      title = "Budget Ka Badshah 👑";
      desc = "Salary aate hi 3 din Nawab jaisa lifestyle, phir baaki 27 din daal-chawal aur dost se ₹100 ka udhaar mangte hue survival mode on!";
      punchline = "Verdict: Budgeting app download karo, ya dost se udhaar mangna band karo!";
    } else if (wealthScore < 30) {
      title = "Living on Dua & Cashback 🥣";
      desc = "Google Pay pe ₹3 ka cashback aane pe mini-celebration! Swiggy cart mein 40 minute tak items dekh ke delivery fee dekhte hi app close karne ki aadat.";
      punchline = "Verdict: Katora King certification delivered!";
    }

    const userNameDisplay = yourName.trim() || "Financial Legend";

    setResult({
      toolSlug: "aukaat-checker",
      toolTitle: "Aukaat Checker 💸",
      category: "Money",
      userName: userNameDisplay,
      badgeTitle: title,
      score: `${wealthScore}/100`,
      scoreLabel: "Desi Wealth Index",
      subtitle: "Satirical Financial Lifestyle Audit",
      description: desc,
      punchline,
      metrics: [
        { label: "Swiggy Addiction", value: wealthScore < 50 ? "Severe 🍕" : "Balanced" },
        { label: "EMI Burden", value: wealthScore < 45 ? "Danger Alert" : "Safe Zone" },
        { label: "Cashback Luck", value: "₹5 Max" },
      ],
      bulletPoints: [
        `Candidate: ${userNameDisplay}`,
        "Security Note: No bank credentials or sensitive financial data requested",
        "Official Recommendation: Treat your friends with tapri chai today!",
      ],
      disclaimer: "Satirical Financial Parody: Entertainment only, does not constitute real financial analysis.",
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <Wallet className="w-4 h-4 text-emerald-400" />
          <span>FullTimePass • Financial Roast</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Aukaat Checker 💸
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Discover your real financial avatar: Are you an EMI Wala Ambani, Budget Ka Badshah, or living on Dua & Cashback? 100% satirical lifestyle audit!
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : !started ? (
        <form onSubmit={handleStart} className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-slate-800 backdrop-blur-md space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Aapka Naam ya Nickname 👤
            </label>
            <input
              type="text"
              placeholder="e.g. Bunty, Harshad Mehta 2.0, Priya..."
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Check My Aukaat 💸</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={AUKAAT_QUESTIONS}
          toolTitle="Aukaat Checker"
          toolSlug="aukaat-checker"
          accentColor="from-emerald-500 via-teal-500 to-green-500"
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
