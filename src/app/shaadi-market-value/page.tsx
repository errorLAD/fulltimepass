"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, HeartHandshake } from "lucide-react";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getShaadiQuestions, getShaadiValuations } from "@/lib/data/toolDataHelper";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function ShaadiMarketValuePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const questions = getShaadiQuestions(language);
  const valuations = getShaadiValuations(language);

  const [candidateName, setCandidateName] = useState("");
  const [ageGroup, setAgeGroup] = useState("23-26");
  const [cookingLevel, setCookingLevel] = useState(questions[0]?.options[1]?.text || "");
  const [weekendVibe, setWeekendVibe] = useState(questions[1]?.options[0]?.text || "");
  const [inLawTolerance, setInLawTolerance] = useState(questions[2]?.options[1]?.text || "");
  const [result, setResult] = useState<ResultCardData | null>(null);

  useEffect(() => {
    const q = getShaadiQuestions(language);
    setCookingLevel(q[0]?.options[1]?.text || "");
    setWeekendVibe(q[1]?.options[0]?.text || "");
    setInLawTolerance(q[2]?.options[1]?.text || "");
  }, [language]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = candidateName.trim() || (isEn ? "Single & Eligible" : "Desi Bachelor/Bachelorette");

    const currentValuations = getShaadiValuations(language);
    const selectedValuation = getRandomItem(currentValuations);

    // Calculate deterministic matrimonial traits and compatibility score
    let cookingScore = 65;
    if (cookingLevel.toLowerCase().includes("masterchef") || cookingLevel.toLowerCase().includes("round roti") || cookingLevel.toLowerCase().includes("banquet")) cookingScore = 94;
    else if (cookingLevel.toLowerCase().includes("takeout") || cookingLevel.toLowerCase().includes("zomato") || cookingLevel.toLowerCase().includes("swiggy")) cookingScore = 30;

    let ctcScore = 70;
    if (weekendVibe.toLowerCase().includes("invest") || weekendVibe.toLowerCase().includes("startup") || weekendVibe.toLowerCase().includes("hiking")) ctcScore = 90;
    else if (weekendVibe.toLowerCase().includes("16 ghante") || weekendVibe.toLowerCase().includes("couch") || weekendVibe.toLowerCase().includes("binge")) ctcScore = 40;

    let inLawToleranceScore = 65;
    if (inLawTolerance.toLowerCase().includes("feet") || inLawTolerance.toLowerCase().includes("smile") || inLawTolerance.toLowerCase().includes("charm")) inLawToleranceScore = 92;
    else if (inLawTolerance.toLowerCase().includes("ww3") || inLawTolerance.toLowerCase().includes("combat") || inLawTolerance.toLowerCase().includes("dispute")) inLawToleranceScore = 25;

    let sanskarScore = 78;
    if (ageGroup === "20-22") sanskarScore = 72;
    else if (ageGroup === "23-26") sanskarScore = 85;
    else sanskarScore = 92;

    const overallScore = Math.round((sanskarScore + cookingScore + ctcScore + inLawToleranceScore) / 4);

    setResult({
      toolSlug: "shaadi-market-value",
      toolTitle: isEn ? "Marriage Market Value 💍" : "Shaadi Market Value 💍",
      category: isEn ? "Relationship" : "Shaadi",
      userName: name,
      badgeTitle: selectedValuation.title,
      score: `${overallScore}%`,
      scoreLabel: isEn ? "Compatibility Score" : "Rishta Compatibility Score",
      subtitle: `${isEn ? "Official Valuation" : "Official Valuation"}: ${selectedValuation.value}`,
      description: selectedValuation.desc,
      punchline: selectedValuation.punchline,
      metrics: [
        { label: isEn ? "Wholesome Rating" : "Sanskar Level", value: `${sanskarScore}%`, color: "#10B981" },
        { label: isEn ? "Culinary Survival" : "Cooking Survival", value: `${cookingScore}%`, color: "#F59E0B" },
        { label: isEn ? "Career Ambition" : "CTC & Ambition", value: `${ctcScore}%`, color: "#3B82F6" },
        { label: isEn ? "In-Law Tolerance" : "Phoopaji Tolerance", value: `${inLawToleranceScore}%`, color: "#EF4444" },
      ],
      bulletPoints: [
        `${isEn ? "Candidate Age Bracket" : "Candidate Age Bracket"}: ${ageGroup} years`,
        `${isEn ? "Weekend Style" : "Weekend Protocol"}: ${weekendVibe.slice(0, 30)}...`,
        isEn
          ? "Estimated Demands: Exactly $0 (Pure Love & Endless Humor)"
          : "Estimated Dowry Demand: Exactly ₹0 (Pure Bhaichara & Laughter)",
      ],
      disclaimer: isEn
        ? "Satirical Relationship Comedy: Fictional fun only. Respecting all individuals regardless of background."
        : "Satirical Marriage Comedy: Fictional fun only. Respecting all individuals regardless of gender, income, or background.",
    });
  };

  const handleReset = () => {
    setResult(null);
    setCandidateName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-bold mb-3 shadow-xs">
          <HeartHandshake className="w-4 h-4 text-pink-600" />
          <span>FullTimePass • {isEn ? "Match Audits" : "Rishta Audits"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Marriage Market Value 💍" : "Shaadi Market Value 💍"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Enter your lifestyle details to get a hilarious matrimonial biodata card with your satirical market value. 100% light-hearted comedy!"
            : "Enter your lifestyle details to get a hilarious matrimonial biodata card with your satirical market value. 100% light-hearted desi comedy!"}
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            {/* Candidate Name */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "Your Name or Nickname 👤" : "Aapka Naam ya Nickname 👤"}
              </label>
              <input
                type="text"
                placeholder={isEn ? "e.g. Alex Cooper, Jamie Smith, Taylor..." : "e.g. Bunty Sharma, Pooja Verma, Chintu..."}
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                maxLength={40}
              />
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2.5">
                {isEn ? "Age Bracket 🎂" : "Age Bracket 🎂"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {["20-22", "23-26", "27-30", "31+"].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeGroup(age)}
                    className={`py-3 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      ageGroup === age
                        ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {age} {isEn ? "Years" : "Years"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cooking Level */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "Cooking Skills Level 🍳" : "Cooking Skills ka Level 🍳"}
              </label>
              <select
                value={cookingLevel}
                onChange={(e) => setCookingLevel(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
              >
                {questions[0]?.options.map((opt, idx) => (
                  <option key={idx} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Weekend Vibe */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "Weekend Lifestyle 🏖️" : "Weekend Lifestyle 🏖️"}
              </label>
              <select
                value={weekendVibe}
                onChange={(e) => setWeekendVibe(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
              >
                {questions[1]?.options.map((opt, idx) => (
                  <option key={idx} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            {/* In-Law Tolerance */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "In-Laws / Relatives Tolerance Level 🛡️" : "In-Laws / Relatives Tolerance Level 🛡️"}
              </label>
              <select
                value={inLawTolerance}
                onChange={(e) => setInLawTolerance(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
              >
                {questions[2]?.options.map((opt, idx) => (
                  <option key={idx} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-400 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{isEn ? "Calculate Marriage Market Value 💍" : "Calculate Shaadi Market Value 💍"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="shaadi-market-value" />
        </form>
      )}
      {result && <RelatedTools currentSlug="shaadi-market-value" />}
    </div>
  );
}
