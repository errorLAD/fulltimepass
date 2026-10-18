"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, Plus, Trash2, ShieldAlert } from "lucide-react";
import { getTripDestinations, getCbiExcuses, getCbiRolesPool } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItems, getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const CBI_VERDICTS_HI = [
  "CBI Final Verdict: Agle janam mein bhi tumhara Goa trip nahi hone wala!",
  "Court Order: Prime suspect ko Lonavala ki ₹20 wali chikki kharid ke chup rehne ki saza sunayi jaati hai!",
  "Forensic Conclusion: Flight tickets check hui 0 baar, par 'Mummy ne mana kiya' excuses ready the 400 baar!",
  "Legal Ruling: Saare suspects se group admin rights turant chheen liye gaye hain!",
];

const CBI_VERDICTS_EN = [
  "FBI Final Verdict: In this lifetime and the next, this vacation is strictly not happening!",
  "Court Order: Prime suspect is sentenced to buying everyone iced coffee and staying quiet!",
  "Forensic Conclusion: Flights searched 0 times, but fake family emergency excuses prepared 400 times!",
  "Legal Ruling: All suspects are officially stripped of group chat admin rights!",
];

export default function TripCancellationCBIPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const destinations = getTripDestinations(language);
  const [destination, setDestination] = useState(destinations[0]);
  const [customDest, setCustomDest] = useState("");
  const [names, setNames] = useState<string[]>(isEn ? ["Alex", "Jordan", "Sam", "Taylor"] : ["Rahul", "Vicky", "Pooja", "Aman"]);
  const [selectedExcuses, setSelectedExcuses] = useState<string[]>([]);
  const [result, setResult] = useState<ResultCardData | null>(null);

  useEffect(() => {
    setDestination(destinations[0]);
  }, [language, destinations]);

  const addFriend = () => {
    if (names.length < 6) setNames([...names, ""]);
  };

  const removeFriend = (index: number) => {
    if (names.length > 2) setNames(names.filter((_, idx) => idx !== index));
  };

  const handleNameChange = (index: number, val: string) => {
    const updated = [...names];
    updated[index] = val;
    setNames(updated);
  };

  const toggleExcuse = (id: string) => {
    if (selectedExcuses.includes(id)) {
      setSelectedExcuses(selectedExcuses.filter((e) => e !== id));
    } else {
      setSelectedExcuses([...selectedExcuses, id]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNames = names.map((n) => n.trim()).filter((n) => n.length > 0);
    if (cleanNames.length < 2) {
      alert(isEn ? "At least 2 friends' names required for investigation!" : "Kam se kam 2 dosto ke naam likho!");
      return;
    }

    const finalDest = customDest.trim() || destination;
    const rolesPool = getCbiRolesPool(language);
    const shuffledRoles = getRandomItems(rolesPool, cleanNames.length);

    // Mastermind is the first person
    const mastermind = cleanNames[0];
    const saanp = cleanNames[1] || cleanNames[0];

    const bulletPoints = cleanNames.map((name, idx) => {
      const roleObj = shuffledRoles[idx];
      return `${name}: ${roleObj.role} — "${roleObj.desc}"`;
    });

    const verdicts = isEn ? CBI_VERDICTS_EN : CBI_VERDICTS_HI;
    const chosenVerdict = getRandomItem(verdicts);

    // Calculate deterministic trip cancellation probability
    let baseRisk = 70;
    const destLower = finalDest.toLowerCase();
    if (destLower.includes("goa") || destLower.includes("cancun") || destLower.includes("vegas")) baseRisk = 88;
    else if (destLower.includes("ladakh") || destLower.includes("alps")) baseRisk = 78;
    else if (destLower.includes("manali") || destLower.includes("miami")) baseRisk = 72;
    else if (destLower.includes("rishikesh") || destLower.includes("camping")) baseRisk = 58;

    const excuseFactor = selectedExcuses.length * 5;
    const squadFactor = (cleanNames.length - 2) * 3;
    const cancelProbability = Math.min(baseRisk + excuseFactor + squadFactor, 99);

    setResult({
      toolSlug: "trip-cancellation-cbi",
      toolTitle: isEn ? "Vacation Cancellation FBI 🚨" : "Trip Cancellation CBI 🚨",
      category: "Friends",
      targetName: `${finalDest.split("(")[0].trim()} Expedition`,
      badgeTitle: `${isEn ? "Cancellation Probability" : "Cancellation Probability"}: ${cancelProbability}% 🚨`,
      score: `${cancelProbability}%`,
      scoreLabel: isEn ? "Cancellation Probability" : "Cancellation Probability",
      subtitle: `${isEn ? "Target Destination" : "Target Destination"}: ${finalDest}`,
      description: isEn
        ? `Inquiry reveals that the ${finalDest} trip was doomed from Day 1. Prime suspect ${mastermind} initiated group hype while secretly knowing they wouldn't get PTO approved, and ${saanp} delivered the fatal last-minute excuse: 'A sudden unexpected family thing came up!'`
        : `CBI inquiry reveals that the ${finalDest} trip was doomed from Day 1. Prime suspect ${mastermind} initiated group chatter while secretly knowing they wouldn't get leave, and ${saanp} delivered the fatal last-minute excuse: "Mummy ki achanak tabiyat kharab ho gayi!"`,
      punchline: chosenVerdict,
      metrics: [
        { label: isEn ? "Crime Scene" : "Crime Scene", value: finalDest.split(" ")[0] },
        { label: isEn ? "Prime Suspect" : "Prime Suspect", value: mastermind },
        { label: isEn ? "Survival Chance" : "Survival Chance", value: `${Math.max(100 - cancelProbability, 1)}% 📉` },
      ],
      bulletPoints,
      disclaimer: isEn
        ? "Fictional Parody Report: Bureau of Comedy investigation. Strictly for fun among friends."
        : "Fictional Parody Report: Central Bureau of Bakchodi investigation. Strictly for comedy among friends.",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  const excuses = getCbiExcuses(language);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3">
          <Search className="w-4 h-4 text-cyan-600" />
          <span>FullTimePass • {isEn ? "Investigation Unit" : "Crime Investigation Unit"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Vacation Cancellation FBI 🚨" : "Trip Cancellation CBI 🚨"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Who murdered the group vacation? Enter your squad's names, pick the destination and unmask the Mastermind and Last-Minute Flake!"
            : "Who murdered the group trip? Enter your squad's names, pick the destination and unmask the Mastermind and Last-Minute Saanp!"}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="trip-cancellation-cbi" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Destination */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "1. Vacation Destination 📍" : "1. Trip Destination 📍"}
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
            >
              {destinations.map((d, idx) => (
                <option key={idx} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder={isEn ? "Or type custom destination (e.g. Hawaii, Tokyo, Lake Tahoe)..." : "Or type custom destination (e.g. Bangkok, Gokarna, Bir Billing)..."}
              value={customDest}
              onChange={(e) => setCustomDest(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Friends Input */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm sm:text-base font-bold text-slate-900">
                {isEn ? "2. Enter Suspects' Names (2 to 6 Friends) 👥" : "2. Enter Suspects' Names (2 to 6 Friends) 👥"}
              </label>
              <span className="text-xs font-semibold text-cyan-800 px-2.5 py-0.5 bg-cyan-50 border border-cyan-200 rounded-md">
                {names.length}/6 {isEn ? "suspects" : "suspects"}
              </span>
            </div>

            <div className="space-y-3">
              {names.map((name, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={isEn ? `Suspect #${idx + 1} name` : `Suspect #${idx + 1} name`}
                    value={name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                    maxLength={30}
                    required
                  />
                  {names.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeFriend(idx)}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {names.length < 6 && (
              <button
                type="button"
                onClick={addFriend}
                className="text-xs sm:text-sm font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5 cursor-pointer mt-1"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{isEn ? "Add Suspect" : "Add Suspect"}</span>
              </button>
            )}
          </div>

          {/* Excuses Checklist */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "3. Suspicious Behaviors Observed (Select All That Apply) 🔍" : "3. Suspicious Behaviors Observed (Select All That Apply) 🔍"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {excuses.map((excuse) => {
                const isSelected = selectedExcuses.includes(excuse.id);
                return (
                  <button
                    key={excuse.id}
                    type="button"
                    onClick={() => toggleExcuse(excuse.id)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-rose-50 text-rose-900 border-2 border-rose-500 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{excuse.icon}</span>
                    <span className="line-clamp-2 leading-snug">{excuse.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <Search className="w-5 h-5 stroke-[3]" />
              <span>{isEn ? "Initiate FBI Inquiry Report 🚨" : "Initiate CBI Inquiry Report 🚨"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="trip-cancellation-cbi" />
        </form>
      )}
    </div>
  );
}
