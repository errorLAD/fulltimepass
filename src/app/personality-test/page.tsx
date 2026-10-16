"use client";

import React, { useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import { PERSONALITY_QUESTIONS, PERSONALITY_RESULTS } from "@/lib/data/toolData";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData, QuestionOption } from "@/lib/types";

export default function PersonalityTestPage() {
  const [candidateName, setCandidateName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleQuizComplete = (
    answers: { questionId: string; selectedOption: QuestionOption }[]
  ) => {
    // Deterministic personality calculation based on votes per type
    const counts: Record<string, number> = {
      "Overthinking Minister": 0,
      "Drama Department Head": 0,
      "Bare Minimum Genius": 0,
      "Professional Procrastinator": 0,
      "Secret Mastermind": 0,
      "Certified Bakchod": 0,
    };

    answers.forEach((ans) => {
      const type = ans.selectedOption.type;
      if (type && counts[type] !== undefined) {
        counts[type] += 1;
      }
    });

    // Find highest type
    let topType = "Certified Bakchod";
    let maxVotes = -1;
    for (const [t, v] of Object.entries(counts)) {
      if (v > maxVotes) {
        maxVotes = v;
        topType = t;
      }
    }

    const typeData = PERSONALITY_RESULTS[topType] || PERSONALITY_RESULTS["Certified Bakchod"];
    const displayName = candidateName.trim() || "Desi Human";

    setResult({
      toolSlug: "personality-test",
      toolTitle: "Asli Personality Test 🧠",
      category: "Personality",
      userName: displayName,
      badgeTitle: typeData.title,
      score: typeData.badge,
      scoreLabel: "Official Avatar",
      subtitle: `"${typeData.quote}"`,
      description: typeData.desc,
      punchline: `Motto: ${typeData.desiQuote}`,
      metrics: [
        { label: "Bakchodi Quotient", value: "99.9%" },
        { label: "Overthinking Index", value: topType === "Overthinking Minister" ? "100% Max" : "50%" },
        { label: "Desi Authenticity", value: "A+ Verified" },
      ],
      bulletPoints: [
        `Superpower: ${typeData.strengths[0]}`,
        `Khamiyan: ${typeData.weaknesses[0]}`,
        `Strengths: ${typeData.strengths.slice(1).join(", ")}`,
      ],
      disclaimer: "Satirical Psychology: 100% scientifically unproven, purely for high-grade laughs!",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setCandidateName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
          <Brain className="w-4 h-4 text-amber-400" />
          <span>FullTimePass • Desi Psychology</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Asli Personality Test 🧠
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Answer 10 hilarious Indian lifestyle dilemmas to discover your true alter-ego: Are you the Overthinking Minister, Bare Minimum Genius, or Certified Bakchod?
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
              placeholder="e.g. Bunty, Riya, Sharma Ji..."
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Start 10-Question Test 🧠</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={PERSONALITY_QUESTIONS as any}
          toolTitle="Asli Personality Test"
          toolSlug="personality-test"
          accentColor="from-amber-400 via-orange-500 to-red-500"
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
