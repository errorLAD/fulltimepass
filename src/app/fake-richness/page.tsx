"use client";

import React, { useState } from "react";
import { Coins, Sparkles, CreditCard, ShieldAlert } from "lucide-react";
import { getFakeRichHabits } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const FAKE_RICH_PUNCHLINES_HI = [
  "Financial Reality Check: Starbucks cup mein mummy ka banaya hua jeera paani refill karke ghoomna felony hona chahiye!",
  "Card Swipe Drama: Gayatri mantra recitation during PIN entry detected 4 times!",
  "Instagram Net Worth: ₹14 Crore | Ground Reality: ₹38.50 in Google Pay!",
  "Colony Gossip: Sharma Uncle has reported your fake Zara empty paper bag to the municipal corporation!",
];

const FAKE_RICH_PUNCHLINES_EN = [
  "Financial Reality Check: Refilling tap water into an empty Starbucks cup for aesthetic vibes should be a federal offense!",
  "Card Swipe Drama: Silent prayers and heavy sweating during chip reader authorization detected!",
  "Instagram Net Worth: $10 Million | Ground Reality: $4.18 in mobile checking!",
  "Social Alert: Friends have reported your empty designer shopping bag photo prop to local authorities!",
];

export default function FakeRichnessPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const habits = getFakeRichHabits(language);

  const [userName, setUserName] = useState("");
  const [actualBalance, setActualBalance] = useState(isEn ? "$4.50 in checking" : "₹187 in GPay");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([
    "starbucks_cup",
    "credit_swipe",
  ]);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const toggleHabit = (id: string) => {
    if (selectedHabits.includes(id)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== id));
    } else {
      setSelectedHabits([...selectedHabits, id]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = userName.trim() || (isEn ? "Pretending Aristocrat" : "Kothi Bangle Impersonator");
    const pickedHabits = habits.filter((h) => selectedHabits.includes(h.id));
    const score = Math.min(pickedHabits.reduce((acc, h) => acc + h.points, 10), 99);

    let title = isEn ? "Instagram Billionaire Supreme 🏰" : "Instagram Ambani Supreme 🏰";
    let desc = isEn
      ? "Flaunting high-roller private yacht aesthetics on Instagram stories while currently ducking a $14 lunch check split from last Friday! Stop wearing tinted sunglasses indoors in poorly lit cafes."
      : "Bhai Instagram stories pe aisi lifestyle flaunt ho rahi hai jaise South Delhi ki 4 kothiyan aapke naam hon, jabki reality yeh hai ki dost ke purane ₹350 udhaar abhi bhi baaki hain! Dark shades indoors pehen ke aesthetic reels banana band karo.";

    if (score >= 80) {
      title = isEn ? "Pro Max Bougie On Credit 🎩" : "Pro Max Broke Nawab 🎩";
      desc = isEn
        ? "Sunglasses indoors, lukewarm tap water in a souvenir paper cup, and intense cardiac arrest during credit card reader authorization! 100% pretension, -500% emergency savings."
        : "Sunglasses indoors, Starbucks cup mein regular filtered water, aur card swipe karte waqt dil mein Hanuman Chalisa! Dikhawa 100%, savings -500%. Ground reality aur stories ke beech 500 light-years ka gap hai.";
    } else if (score <= 35) {
      title = isEn ? "Honest Grounded Citizen 🫡" : "Honest Middle Class Citizen 🫡";
      desc = isEn
        ? "You have zero interest in fake flex culture! You check prices, use discounts, and take pride in sensible budgeting. Pure grounded authenticity."
        : "Aap dikhawa karne mein interested nahi ho. MRP check karte ho aur bagal wali dukaan se ₹5 sasta samaan laane mein proud feel karte ho. Pure sensible Indian mindset!";
    }

    const punchlines = isEn ? FAKE_RICH_PUNCHLINES_EN : FAKE_RICH_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    setResult({
      toolSlug: "fake-richness",
      toolTitle: isEn ? "Fake Luxury Certificate 💳" : "Fake Richness Certificate 💳",
      category: "Money",
      userName: candidate,
      badgeTitle: title,
      score: `${score}%`,
      scoreLabel: isEn ? "Pretension Quotient" : "Pretension Quotient",
      subtitle: isEn ? "Official Wealth Illusion Audit" : "Official Wealth Illusion Audit",
      description: desc,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "Social Media Vibe" : "Instagram Vibe", value: isEn ? "$10 Million 🏰" : "₹14 Crore 🏰" },
        { label: isEn ? "Actual Balance" : "Actual Balance", value: actualBalance.slice(0, 16) },
        { label: isEn ? "Flex Score" : "Show-Off Score", value: `${score}% 🕶️` },
      ],
      bulletPoints: pickedHabits.map((h) => `${isEn ? "Observed" : "Caught"}: ${h.label}`),
      disclaimer: isEn
        ? "Satirical Wealth Comedy: Made for pure laughs among friends. Don't take it to heart!"
        : "Satirical Wealth Comedy: Made for pure laughs among friends. Dil pe mat lo!",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-xs">
          <Coins className="w-4 h-4 text-amber-600" />
          <span>FullTimePass • {isEn ? "Wealth Illusion Lab" : "Kothi Bangle Illusion Lab"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Fake Luxury Certificate 💳" : "Fake Richness Certificate 💳"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Instagram net worth $10 million, owes friend $4 for yesterday's iced coffee! Calculate your satirical luxury pretension score."
            : "Instagram net worth ₹8 crore, dost ke ₹350 udhaar abhi baaki! Unmask your satirical rich-kid pretension score."}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="fake-richness" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* User Name */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Your Fancy / Bougie Nickname 👤" : "Aapka Fancy / Royal Nickname 👤"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Lord Jordan, Trust-Fund Tyler, Champagne Sam..." : "e.g. Bunty Ambani, South Delhi Pookie, Nawab Sahab..."}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Actual Balance Reality */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Ground Reality (Pick Bank Balance Status) 🥣" : "Ground Reality (Pick Actual Bank State) 🥣"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isEn
                ? [
                    "$4.50 in checking account",
                    "$15 owed to friends",
                    "Waiting desperately for direct deposit",
                    "Credit card maxed out",
                  ]
                : [
                    "₹47.50 in Google Pay",
                    "₹350 dost se udhaar pending",
                    "Waiting for month-end salary",
                    "Credit Card limit maxed out",
                  ]
              ).map((bal, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActualBalance(bal)}
                  className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                    actualBalance === bal
                      ? "bg-amber-50 border-2 border-amber-500 text-amber-900 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {bal}
                </button>
              ))}
            </div>
          </div>

          {/* Pretense Habits */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm sm:text-base font-bold text-slate-900">
                {isEn ? "Fake Luxury Habits (Pick What You Flaunt) 🕶️" : "Fake Luxury Habits (Pick What You Flaunt) 🕶️"}
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <Coins className="w-5 h-5 stroke-[2.5]" />
              <span>{isEn ? "Unmask Fake Luxury Score 💳" : "Unmask Fake Richness Score 💳"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="fake-richness" />
        </form>
      )}
    </div>
  );
}
