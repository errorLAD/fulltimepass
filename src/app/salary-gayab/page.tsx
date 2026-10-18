"use client";

import React, { useState } from "react";
import { Banknote, Sparkles, AlertCircle, TrendingDown } from "lucide-react";
import { getSalaryBrackets, getExpenseSinkholes } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const SALARY_PUNCHLINES_HI = [
  "Bank Balance Update: ₹34.80 (Google Pay scratch card se umeed bachi hai)!",
  "Financial Autopsy Verdict: Salary died of 14 stab wounds from Swiggy, Zomato and iPhone EMI!",
  "Month-End Survival Strategy: Lunch skip karo aur dinner mein dost ki treat pe raid maaro!",
  "Corporate Reality: 30 din majdoori, 3 minute ki amiri, phir 27 din katora mode!",
];

const SALARY_PUNCHLINES_EN = [
  "Bank Balance Update: $4.18 (Coupons and wishful thinking are all that remain)!",
  "Financial Autopsy Verdict: Paycheck succumbed to 14 fatal punctures from DoorDash, rent, and subscriptions!",
  "Month-End Survival Strategy: Drink iced tap water for lunch and crash office pizza parties for dinner!",
  "Corporate Reality: 30 days of grinding, 3 minutes of wealthy euphoria, followed by 27 days of austerity!",
];

export default function SalaryGayabPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const brackets = getSalaryBrackets(language);
  const sinkholes = getExpenseSinkholes(language);

  const [candidateName, setCandidateName] = useState("");
  const [customSalary, setCustomSalary] = useState(isEn ? "4500" : "45000");
  const [selectedBracketIndex, setSelectedBracketIndex] = useState(1);
  const [selectedSinkholes, setSelectedSinkholes] = useState<string[]>([
    "emi",
    "swiggy",
    "credit_card",
  ]);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const currencySymbol = isEn ? "$" : "₹";

  const toggleSinkhole = (id: string) => {
    if (selectedSinkholes.includes(id)) {
      setSelectedSinkholes(selectedSinkholes.filter((s) => s !== id));
    } else {
      setSelectedSinkholes([...selectedSinkholes, id]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSalary = parseFloat(customSalary);
    const defaultVal = isEn ? 4500 : 45000;
    const baseSalary = !isNaN(parsedSalary) && parsedSalary > 0
      ? parsedSalary
      : (brackets[selectedBracketIndex]?.value || defaultVal);

    const pickedSinks = sinkholes.filter((s) => selectedSinkholes.includes(s.id));
    const totalDrainPercent = Math.min(
      pickedSinks.reduce((acc, s) => acc + s.drain, 0),
      100
    );

    const totalExpenses = Math.round((baseSalary * totalDrainPercent) / 100);
    const remainingSalary = Math.max(baseSalary - totalExpenses, 0);
    const percentSpent = totalDrainPercent;

    const drainCount = Math.max(selectedSinkholes.length, 1);
    const lifespanMinutes = Math.max(12 - drainCount * 1.8, 1.2).toFixed(1);

    const displayName = candidateName.trim() || (isEn ? "Corporate Trooper" : "Corporate Majdoor");
    const mainCulprit = pickedSinks.length > 0 ? pickedSinks[0].label.split(" ")[0] : (isEn ? "Takeout" : "Swiggy");
    const punchlines = isEn ? SALARY_PUNCHLINES_EN : SALARY_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    setResult({
      toolSlug: "salary-gayab",
      toolTitle: isEn ? "Paycheck Vanishing Act 💸" : "Salary Aayi, Gayab Hui 💸",
      category: "Money",
      userName: displayName,
      badgeTitle: isEn ? "Official Cause of Financial Demise 🪦" : "Official Cause of Financial Demise 🪦",
      score: `${percentSpent}%`,
      scoreLabel: isEn ? "Paycheck Vanished" : "Salary Vanished",
      subtitle: `${currencySymbol}${baseSalary.toLocaleString()} In → ${currencySymbol}${remainingSalary.toLocaleString()} Left (${percentSpent}% Spent)`,
      description: isEn
        ? `Paycheck hit the account at 9:00 AM (${currencySymbol}${baseSalary.toLocaleString()}), and by 9:0${Math.floor(Number(lifespanMinutes))} AM, ${mainCulprit} and routine bills vaporized ${percentSpent}% of the funds! Exactly ${currencySymbol}${remainingSalary.toLocaleString()} remains for the next 28 days!`
        : `Salary subah 9:00 AM account mein aayi (₹${baseSalary.toLocaleString()}), aur 9:0${Math.floor(Number(lifespanMinutes))} AM tak ${mainCulprit} aur baaki kharchon ne ${percentSpent}% raashi saaf kar di! Ab bache hain sirf ₹${remainingSalary.toLocaleString()}, aur baaki 28 din katora mode on hai!`,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "Monthly Take-Home" : "Monthly In-Hand", value: `${currencySymbol}${baseSalary.toLocaleString()}` },
        { label: isEn ? "Total Vaporized" : "Total Spent", value: `${currencySymbol}${totalExpenses.toLocaleString()}` },
        { label: isEn ? "Surviving Balance" : "Remaining Balance", value: remainingSalary > 0 ? `${currencySymbol}${remainingSalary.toLocaleString()}` : `${currencySymbol}0 (Austerity Mode 🥣)` },
      ],
      bulletPoints: pickedSinks.map((s) => `${isEn ? "Drain Vector" : "Draining Culprit"}: ${s.label} (~${s.drain}%)`),
      disclaimer: isEn
        ? "Satirical Financial Parody: Entertainment only. Form inputs are processed locally and never stored."
        : "Satirical Financial Parody: Entertainment only. Form inputs are processed locally and never stored.",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
          <Banknote className="w-4 h-4 text-emerald-600" />
          <span>FullTimePass • {isEn ? "Financial Autopsy" : "Corporate Financial Autopsy"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Paycheck Vanishing Act 💸" : "Salary Aayi, Gayab Hui 💸"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Paycheck hit your account at 9:00 AM, gone by 9:07 AM! Track your paycheck's lightning-fast demise and share the pain with coworkers."
            : "Salary 9:00 baje aayi, 9:07 par gayab! Track your salary's lightning-fast demise and share the pain with colleagues."}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="salary-gayab" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Candidate Name */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Your Name or Nickname 👤" : "Aapka Naam ya Nickname 👤"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Alex, Sam, Office Trooper..." : "e.g. Rahul, Corporate Majdoor, Priya..."}
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Salary Input */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? `1. Your Monthly In-Hand Salary (${currencySymbol}) 💼` : "1. Monthly In-Hand Salary (₹) 💼"}
            </label>
            <input
              type="number"
              placeholder={isEn ? "e.g. 4500" : "e.g. 45000"}
              value={customSalary}
              onChange={(e) => setCustomSalary(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              min={100}
              max={10000000}
            />

            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-2">
                {isEn ? "Or Pick Quick Bracket:" : "Ya fir Quick Bracket Select Karein:"}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {brackets.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedBracketIndex(idx);
                      setCustomSalary(b.value.toString());
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedBracketIndex === idx
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sinkholes */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "2. Where Did The Money Vanish? (Select All That Apply) 🕳️" : "2. Paise Kahan Gayab Hue? (Select All That Apply) 🕳️"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sinkholes.map((sink) => {
                const isSelected = selectedSinkholes.includes(sink.id);
                return (
                  <button
                    key={sink.id}
                    type="button"
                    onClick={() => toggleSinkhole(sink.id)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-950 border-2 border-emerald-500 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{sink.label}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      ~{sink.drain}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <TrendingDown className="w-5 h-5" />
              <span>{isEn ? "Conduct Paycheck Autopsy 💸" : "Salary Ki Autopsy Karein 💸"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="salary-gayab" />
        </form>
      )}
    </div>
  );
}
