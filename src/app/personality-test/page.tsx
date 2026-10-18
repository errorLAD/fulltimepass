"use client";

import React, { useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import { getPersonalityQuestions, getPersonalityResults } from "@/lib/data/toolDataHelper";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData, QuestionOption } from "@/lib/types";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function PersonalityTestPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

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
    const personalityResults = getPersonalityResults(language);

    // Deterministic personality calculation based on votes per type
    const counts: Record<string, number> = {
      "Overthinking Minister": 0,
      "Drama Department Head": 0,
      "Bare Minimum Genius": 0,
      "Professional Procrastinator": 0,
      "Secret Mastermind": 0,
      "Certified Bakchod": 0,
      "Certified Chaos Champion": 0,
    };

    answers.forEach((ans) => {
      const type = ans.selectedOption.type;
      if (type && counts[type] !== undefined) {
        counts[type] += 1;
      }
    });

    // Combine chaos types
    counts["Certified Bakchod"] += counts["Certified Chaos Champion"];

    // Find highest type
    let topType = "Certified Bakchod";
    let maxVotes = -1;
    for (const [t, v] of Object.entries(counts)) {
      if (v > maxVotes) {
        maxVotes = v;
        topType = t;
      }
    }

    const typeData =
      (personalityResults as any)[topType] ||
      (personalityResults as any)["Certified Chaos Champion"] ||
      (personalityResults as any)["Certified Bakchod"] ||
      Object.values(personalityResults)[0];

    const displayName = candidateName.trim() || (isEn ? "Human Wonder" : "Desi Human");

    // Calculate real trait dimension scores based on quiz answers
    const totalQ = Math.max(answers.length, 1);
    const overthinkingScore = Math.min(Math.round(((counts["Overthinking Minister"] * 2 + counts["Secret Mastermind"]) / totalQ) * 50) + 25, 99);
    const procrastinationScore = Math.min(Math.round(((counts["Professional Procrastinator"] * 2 + counts["Bare Minimum Genius"]) / totalQ) * 50) + 25, 99);
    const dramaScore = Math.min(Math.round(((counts["Drama Department Head"] * 2 + counts["Overthinking Minister"]) / totalQ) * 50) + 20, 99);
    const hustleScore = Math.min(Math.round(((counts["Certified Bakchod"] * 2 + counts["Bare Minimum Genius"]) / totalQ) * 50) + 30, 99);

    const dominantScore = Math.max(overthinkingScore, procrastinationScore, dramaScore, hustleScore);

    setResult({
      toolSlug: "personality-test",
      toolTitle: isEn ? "True Personality Test 🧠" : "Asli Personality Test 🧠",
      category: "Personality",
      userName: displayName,
      badgeTitle: typeData.title,
      score: `${dominantScore}%`,
      scoreLabel: `${typeData.title} Index`,
      subtitle: `"${typeData.quote}"`,
      description: typeData.desc,
      punchline: `Motto: ${typeData.desiQuote || typeData.quote}`,
      metrics: [
        { label: isEn ? "Overthinking" : "Overthinking", value: `${overthinkingScore}%`, color: "#A855F7" },
        { label: isEn ? "Procrastination" : "Procrastination", value: `${procrastinationScore}%`, color: "#F59E0B" },
        { label: isEn ? "Drama Quotient" : "Drama Quotient", value: `${dramaScore}%`, color: "#EC4899" },
        { label: isEn ? "Improv & Hustle" : "Desi Jugaad", value: `${hustleScore}%`, color: "#10B981" },
      ],
      bulletPoints: [
        `Superpower: ${typeData.strengths?.[0] || "Quick wit & survival"}`,
        `${isEn ? "Kryptonite" : "Khamiyan"}: ${typeData.weaknesses?.[0] || "Zero patience for boredom"}`,
        `${isEn ? "Key Superpowers" : "Strengths"}: ${(typeData.strengths?.slice(1) || []).join(", ") || "Humor, Loyalty"}`,
      ],
      disclaimer: isEn
        ? "Satirical Psychology: 100% scientifically unproven, purely for high-grade laughs!"
        : "Satirical Psychology: 100% scientifically unproven, purely for high-grade laughs!",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
    setCandidateName("");
  };

  const questions = getPersonalityQuestions(language);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
          <Brain className="w-4 h-4 text-amber-600" />
          <span>FullTimePass • {isEn ? "Comedy Psychology" : "Desi Psychology"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "True Personality Test 🧠" : "Asli Personality Test 🧠"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Answer 3 quick dilemmas to discover your true satirical alter-ego: Are you the Overthinking Minister, Bare Minimum Genius, or Chaos Commander?"
            : "Answer 3 quick Indian lifestyle dilemmas to discover your true alter-ego: Are you the Overthinking Minister, Bare Minimum Genius, or Certified Bakchod?"}
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
              placeholder={isEn ? "e.g. Alex, Sam, Jordan, Taylor..." : "e.g. Bunty, Riya, Sharma Ji..."}
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{isEn ? "Start Personality Test (3 Questions) 🧠" : "Start Personality Test (3 Questions) 🧠"}</span>
          </button>
        </form>
      ) : (
        <QuizRunner
          questions={questions as any}
          toolTitle={isEn ? "True Personality Test" : "Asli Personality Test"}
          toolSlug="personality-test"
          accentColor="from-amber-400 via-orange-500 to-red-500"
          onComplete={handleQuizComplete}
        />
      )}

      {(!started || result) && <RelatedTools currentSlug="personality-test" />}
    </div>
  );
}
