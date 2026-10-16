"use client";

import React, { useState } from "react";
import { Sparkles, HeartHandshake } from "lucide-react";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData } from "@/lib/types";
import { SHAADI_QUESTIONS } from "@/lib/data/toolData";

export default function ShaadiMarketValuePage() {
  const [candidateName, setCandidateName] = useState("");
  const [ageGroup, setAgeGroup] = useState("23-26");
  const [cookingLevel, setCookingLevel] = useState(SHAADI_QUESTIONS[0].options[1].text);
  const [weekendVibe, setWeekendVibe] = useState(SHAADI_QUESTIONS[1].options[0].text);
  const [inLawTolerance, setInLawTolerance] = useState(SHAADI_QUESTIONS[2].options[1].text);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = candidateName.trim() || "Desi Bachelor/Bachelorette";

    // Humorous value calculations based on comical traits
    let fictionalValue = "₹2.5 Crore Duas + 1 Platonic Samosa";
    let title = "Sanskaari Disruptor 🕉️";
    let desc = "Expectations international, cooking skills Maggi tak! Subah uthne ka koi guarantee nahi hai, par dil saaf aur Netflix password shared hai.";
    let punchline = "Special Feature: Fufaji ke naraz hone par instant cold drink provide karne ki shamta.";

    if (cookingLevel.includes("MasterChef")) {
      fictionalValue = "₹5 Crore Duas + Unlimited Paneer Tikka";
      title = "High Demand Gourmet Rishta 🍳";
      desc = "Khana itna lajawab banate hain ki sasuraal wale roz shaam ko dinner ka wait karenge. Biodata certified A+!";
    } else if (weekendVibe.includes("16 ghante")) {
      fictionalValue = "Priceless (Zero Warranty, Maximum Sleep)";
      title = "Kumbhkaran Edition 🛌";
      desc = "Shaadi ke baad inko disturb mat karna jab tak chai ready na ho. Peaceful partner, zero interference in household politics!";
    }

    setResult({
      toolSlug: "shaadi-market-value",
      toolTitle: "Shaadi Market Value 💍",
      category: "Shaadi",
      userName: name,
      badgeTitle: title,
      score: fictionalValue,
      scoreLabel: "Satirical Market Valuation",
      subtitle: "Official Matrimonial Parody Biodata",
      description: desc,
      punchline,
      metrics: [
        { label: "Cooking Level", value: cookingLevel.slice(0, 16) + "..." },
        { label: "Drama Resistance", value: "85% 💪" },
        { label: "Rishta Status", value: "Trending in NRI Circles" },
      ],
      bulletPoints: [
        `Candidate Age Bracket: ${ageGroup} years`,
        `Weekend Protocol: ${weekendVibe.slice(0, 24)}...`,
        "Family Guarantee: No dowry, only good vibes & high laughter!",
      ],
      disclaimer: "Satirical Marriage Comedy: Fictional fun only. Respecting all individuals regardless of gender, income, or background.",
    });
  };

  const handleReset = () => {
    setResult(null);
    setCandidateName("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3">
          <HeartHandshake className="w-4 h-4 text-pink-400" />
          <span>FullTimePass • Rishta Audits</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Shaadi Market Value 💍
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Enter your lifestyle details to get a hilarious matrimonial biodata card with your satirical market value. 100% light-hearted desi comedy!
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md space-y-5">
            {/* Candidate Name */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Aapka Naam ya Nickname 👤
              </label>
              <input
                type="text"
                placeholder="e.g. Bunty Sharma, Pooja Verma, Chintu..."
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                maxLength={40}
              />
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Age Bracket 🎂
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {["20-22", "23-26", "27-30", "31+"].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeGroup(age)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      ageGroup === age
                        ? "bg-pink-500 text-slate-950 border-pink-400 shadow-sm"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {age} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Cooking Level */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Cooking Skills ka Level 🍳
              </label>
              <select
                value={cookingLevel}
                onChange={(e) => setCookingLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                {SHAADI_QUESTIONS[0].options.map((opt, idx) => (
                  <option key={idx} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Weekend Vibe */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Weekend Lifestyle 🏖️
              </label>
              <select
                value={weekendVibe}
                onChange={(e) => setWeekendVibe(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                {SHAADI_QUESTIONS[1].options.map((opt, idx) => (
                  <option key={idx} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Sasuraal Tolerance */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                In-Laws / Relatives Tolerance Level 🛡️
              </label>
              <select
                value={inLawTolerance}
                onChange={(e) => setInLawTolerance(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                {SHAADI_QUESTIONS[2].options.map((opt, idx) => (
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-400 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Calculate Shaadi Market Value 💍</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
