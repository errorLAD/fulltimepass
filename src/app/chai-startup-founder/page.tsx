"use client";

import React, { useState, useEffect } from "react";
import { Coffee, Sparkles, Rocket, TrendingUp } from "lucide-react";
import { getStartupIdeas, getPreRevenueHabits } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const STARTUP_PUNCHLINES_HI = [
  "VC Verdict: SoftBank rejected proposal after discovering your .ai domain cost more than entire company net worth!",
  "Angel Investor Feedback: 'Idea revolutionary hai, par pehle tapri wale ka ₹140 udhaar chukao!'",
  "Runway Alert: Exactly 2 cutting chais, 1 bun maska, and ₹18 left in current account!",
  "LinkedIn Reality: 'Building in stealth' means secretly searching for 9-to-5 jobs on Naukri.com!",
];

const STARTUP_PUNCHLINES_EN = [
  "VC Feedback: SoftBank rejected proposal after discovering your .ai domain cost more than company net worth!",
  "Angel Investor Note: 'Revolutionary vision, but please settle your $14 coffee tab first!'",
  "Runway Alert: Exactly 2 cold brews, 1 pastry, and $18.40 remaining in company checking account!",
  "LinkedIn Reality: 'Building in stealth' means secretly searching for corporate 9-to-5 jobs on LinkedIn!",
];

const STARTUP_VALUATIONS_HI = [
  "₹100 Cr (Pre-Revenue)",
  "₹420 Cr (Pre-Idea)",
  "$10 Million (Pre-Product)",
  "3 Samosas & 1 Cutting Chai",
];

const STARTUP_VALUATIONS_EN = [
  "$100 Million (Pre-Revenue)",
  "$420 Million (Pre-Idea)",
  "$10 Million (Pre-Product)",
  "3 Iced Lattes & 1 Croissant",
];

export default function ChaiStartupFounderPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const ideas = getStartupIdeas(language);
  const habits = getPreRevenueHabits(language);

  const [founderName, setFounderName] = useState("");
  const [selectedIdea, setSelectedIdea] = useState(ideas[0] || "");
  const [customIdea, setCustomIdea] = useState("");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([
    "domain_logo",
    "linkedin_stealth",
  ]);
  const [result, setResult] = useState<ResultCardData | null>(null);

  useEffect(() => {
    setSelectedIdea(ideas[0] || "");
  }, [language, ideas]);

  const toggleHabit = (id: string) => {
    if (selectedHabits.includes(id)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== id));
    } else {
      setSelectedHabits([...selectedHabits, id]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = founderName.trim() || (isEn ? "The Stealth Founder" : "The Stealth Founder");
    const idea = customIdea.trim() || selectedIdea;
    const pickedHabits = habits.filter((h) => selectedHabits.includes(h.id));

    const valuations = isEn ? STARTUP_VALUATIONS_EN : STARTUP_VALUATIONS_HI;
    const valuation = getRandomItem(valuations);
    const punchlines = isEn ? STARTUP_PUNCHLINES_EN : STARTUP_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    // Calculate deterministic pitch power capacity score (0-100)
    const pitchPower = Math.min(30 + selectedHabits.length * 14, 99);

    setResult({
      toolSlug: "chai-startup-founder",
      toolTitle: isEn ? "Coffee Shop Startup Founder 🚀" : "Chai Pe Startup Founder 🚀",
      category: "Personality",
      userName: name,
      badgeTitle: isEn ? "Unicorn In The Making (Customers Imaginary) 🦄" : "Unicorn In Making (Customer Imaginary) 🦄",
      score: `${pitchPower}%`,
      scoreLabel: isEn ? "Pitch Power Capacity" : "Pitch Power Capacity",
      subtitle: `${isEn ? "Startup Pitch" : "Startup Pitch"}: "${idea}" • ${valuation}`,
      description: isEn
        ? `48-slide pitch deck finalized, black turtleneck acquired, but ground reality is that paying customers are 100% imaginary and the pre-seed round was spent on oat-milk cold brews and premium domain renewals!`
        : `Pitch deck 48 slides ka ready hai, Steve Jobs jaisi black turtle-neck pehen li hai, par ground reality yeh hai ki customer abhi imaginary hai aur seed funding tapri ki adrak chai aur bun-maska pe spend ho chuki hai!`,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "MRR (Revenue)" : "MRR (Revenue)", value: isEn ? "$0.00 📉" : "₹0.00 📉" },
        { label: isEn ? "LinkedIn Wisdom" : "LinkedIn Gyaan", value: "Unlimited 📈" },
        { label: isEn ? "Runway Left" : "Runway Left", value: isEn ? "2 Cold Brews ☕" : "2 Samosas 🥟" },
      ],
      bulletPoints: pickedHabits.map((h) => `${isEn ? "Founder Habit" : "Founder Habit"}: ${h.label}`),
      disclaimer: isEn
        ? "Satirical Startup Parody: Made for the tech startup and cafe hustler community. Build something real!"
        : "Satirical Startup Parody: Made for the Indian startup and tapri hustler community. Build something real!",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-xs">
          <Rocket className="w-4 h-4 text-amber-600" />
          <span>FullTimePass • {isEn ? "Cafe Venture Capital Lab" : "Tapri Venture Capital Lab"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Coffee Shop Startup Founder 🚀" : "Chai Pe Startup Founder 🚀"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Pitch deck ready, product coming soon, paying customers strictly imaginary! Evaluate your revolutionary pre-revenue unicorn startup."
            : "Pitch deck ready, product coming soon, customer abhi imaginary! Evaluate your revolutionary tapri chai unicorn startup."}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="chai-startup-founder" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Founder Name */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Founder & CEO Name 👤" : "Founder & CEO Shubh Naam 👤"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Jordan Musk, Alex Altman, Tech Visionary..." : "e.g. Bunty Jobs, Musk Sharma, Tech Babu..."}
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Startup Idea */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Revolutionary Startup Pitch Concept 💡" : "Revolutionary Startup Pitch Idea 💡"}
            </label>
            <div className="space-y-2.5">
              {ideas.map((idea, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdea(idea)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                    selectedIdea === idea
                      ? "bg-amber-50 border-2 border-amber-500 text-amber-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {idea}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder={isEn ? "Or type custom startup idea (e.g. AI for Roommate Dishes)..." : "Or type custom startup idea (e.g. AI for Colony Aunty Gossip)..."}
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Pre-revenue Habits */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm sm:text-base font-bold text-slate-900">
                {isEn ? "Pre-Revenue Founder Habits (Pick What Applies) 🦄" : "Pre-Revenue Founder Habits (Pick What Applies) 🦄"}
              </label>
              <span className="text-xs font-semibold text-amber-900 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg">
                {selectedHabits.length} {isEn ? "selected" : "selected"}
              </span>
            </div>

            <div className="space-y-2.5">
              {habits.map((habit) => {
                const isSelected = selectedHabits.includes(habit.id);
                return (
                  <button
                    key={habit.id}
                    type="button"
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-rose-50 text-rose-900 border-2 border-rose-500 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {habit.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <Coffee className="w-5 h-5 stroke-[2.5]" />
              <span>{isEn ? "Evaluate Term Sheet & Pitch 🚀" : "Evaluate Term Sheet & Pitch 🚀"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="chai-startup-founder" />
        </form>
      )}
    </div>
  );
}
