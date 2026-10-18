"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Sparkles, Clock, Award } from "lucide-react";
import { getGoalOptions, getProcrastinationExcuses } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const PROCRASTINATION_PUNCHLINES_HI = [
  "Next Tentative Start Date: 32nd December 2038 (Subject to Mausam and Mood)!",
  "National Award: Olympic Gold Medal in 5-minute Alarm Snoozing!",
  "Procrastinator's Creed: Kal kare so parso, itni bhi kya jaldi hai jab jeena hai barso!",
  "Scientific Fact: Adrenaline rush arrives only 14 seconds before final submission deadline!",
];

const PROCRASTINATION_PUNCHLINES_EN = [
  "Next Tentative Start Date: December 32nd, 2038 (Subject to mood, atmospheric pressure, and weather)!",
  "Distinguished Award: Olympic Gold Medal in 5-minute alarm snoozing!",
  "Procrastinator's Creed: Why do today what you can comfortably postpone until the next decade?",
  "Scientific Law: Creative adrenaline only arrives exactly 14 seconds before the final deadline!",
];

export default function KalSePakkaPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const goalOptions = getGoalOptions(language);
  const excusesList = getProcrastinationExcuses(language);

  const [userName, setUserName] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(goalOptions[0]?.id || "gym");
  const [selectedExcuses, setSelectedExcuses] = useState<string[]>([
    "one_more_reel",
    "monday_rule",
  ]);
  const [daysDelayed, setDaysDelayed] = useState("847");
  const [result, setResult] = useState<ResultCardData | null>(null);

  useEffect(() => {
    if (goalOptions.length > 0 && !goalOptions.some((g) => g.id === selectedGoalId)) {
      setSelectedGoalId(goalOptions[0].id);
    }
  }, [language, goalOptions, selectedGoalId]);

  const toggleExcuse = (id: string) => {
    if (selectedExcuses.includes(id)) {
      setSelectedExcuses(selectedExcuses.filter((e) => e !== id));
    } else {
      setSelectedExcuses([...selectedExcuses, id]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = userName.trim() || (isEn ? "The Chronic Procrastinator" : "The Chronic Procrastinator");
    const goalObj = goalOptions.find((g) => g.id === selectedGoalId) || goalOptions[0];
    const pickedExcuses = excusesList.filter((ex) => selectedExcuses.includes(ex.id));

    const totalDays = parseInt(daysDelayed) || 847;
    const excuseScore = pickedExcuses.reduce((acc, ex) => acc + ex.score, 0);
    const delayFactor = Math.min(Math.floor(totalDays / 30) * 5, 25);
    const procCapacity = Math.min(30 + excuseScore + delayFactor, 99);

    const punchlines = isEn ? PROCRASTINATION_PUNCHLINES_EN : PROCRASTINATION_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    setResult({
      toolSlug: "kal-se-pakka",
      toolTitle: isEn ? "'Starting Tomorrow' Certificate 🛋️" : "Kal Se Pakka Generator 🛋️",
      category: "Personality",
      userName: candidate,
      badgeTitle: isEn ? "Supreme Snooze Grandmaster 🏅" : "Supreme Snooze Champion 🏅",
      score: `${procCapacity}%`,
      scoreLabel: isEn ? "Procrastination Battery Level" : "Procrastination Battery Capacity",
      subtitle: `${isEn ? "Target Goal" : "Target Goal"}: ${goalObj.label} (${totalDays} ${isEn ? "Days Delayed" : "Days Delayed"})`,
      description: isEn
        ? `Day ${totalDays} of '${goalObj.label}'. Candidate marked it on 4 calendar apps, set 14 alarms, bought new athletic sneakers, but repeated 'Definitely starting tomorrow' until 'Tomorrow' filed a restraining order! Biological energy conservation level: 99.9%.`
        : `Day ${totalDays} of '${goalObj.label}'. Candidate ne 4 baar calendar pe mark kiya, 14 alarm set kiye, naye gym shoes kharide, par 'Kal se pakka' bol bol ke Kal ne bhi ab candidate ko WhatsApp pe block kar diya hai! Energy conservation level 999%.`,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "Target Delayed" : "Target Postponed", value: `${totalDays} ${isEn ? "Days" : "Days"} ⏳` },
        { label: isEn ? "Excuses Formulated" : "Excuses Invented", value: `${pickedExcuses.length * 14}+ 🧠` },
        { label: isEn ? "Action Taken" : "Action Taken", value: "0.00% 🛋️" },
      ],
      bulletPoints: [
        `${isEn ? "Primary Rationalization" : "Primary Bahana"}: ${pickedExcuses.length > 0 ? pickedExcuses[0].label : (isEn ? "Social Media Spiral" : "Reels Trap")}`,
        isEn
          ? "Special Talent: Creative adrenaline only ignites 12 seconds before the hard deadline"
          : "Specialty: Adrenaline rush arrives only 12 seconds before final deadline",
        isEn
          ? "Personal Creed: Why start today when tomorrow offers unlimited postponement potential!"
          : "Motto: Aaj ka kaam kal pe chhod do, aur kal ka parso pe!",
      ],
      disclaimer: isEn
        ? "Satirical Motivation Certificate: Fictional humor. Put down your phone and go get it done!"
        : "Satirical Motivation Certificate: Fictional humor. Ab phone band karo aur kaam pe lago!",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span>FullTimePass • {isEn ? "National Procrastination Board" : "National Procrastination Board"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "'Starting Tomorrow' Generator 🛋️" : "Kal Se Pakka Generator 🛋️"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Day 847 of 'Starting tomorrow'. Even 'Tomorrow' blocked your phone number! Generate your official procrastination honors certificate."
            : "Day 847: Kal se pakka. Kal ne bhi ab block kar diya! Generate your official procrastination honors certificate."}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="kal-se-pakka" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Candidate Name */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Your Name or Nickname 👤" : "Aapka Shubh Naam 👤"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Alex, Sleeping Beauty, Sloth King..." : "e.g. Bunty, Lazy Legend, Sleeping Beauty..."}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Goal Selector */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Which Life Goal Is Getting Postponed? 🎯" : "Kaun Sa Goal Kal Pe Postpone Ho Raha Hai? 🎯"}
            </label>
            <div className="space-y-2.5">
              {goalOptions.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGoalId(g.id)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                    selectedGoalId === g.id
                      ? "bg-amber-50 border-2 border-amber-500 text-amber-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Days Postponed */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "How Many Days Have You Been Saying 'Tomorrow'? ⏳" : "Kitne Din Ho Gaye ‘Kal Se Pakka’ Bolte Hue? ⏳"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {["47", "120", "365", "847"].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDaysDelayed(days)}
                  className={`py-3 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    daysDelayed === days
                      ? "bg-rose-50 text-rose-900 border-2 border-rose-500 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {isEn ? `Day ${days}` : `Day ${days}`}
                </button>
              ))}
            </div>
          </div>

          {/* Procrastination Habits */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Your Go-To Rationalizations (Pick Habits) 🧐" : "Aapke Favorite Bahane (Pick Habits) 🧐"}
            </label>
            <div className="space-y-2.5">
              {excusesList.map((excuse) => {
                const isSelected = selectedExcuses.includes(excuse.id);
                return (
                  <button
                    key={excuse.id}
                    type="button"
                    onClick={() => toggleExcuse(excuse.id)}
                    className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium leading-relaxed transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-900 border-2 border-emerald-500 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {excuse.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <Calendar className="w-5 h-5 stroke-[2.5]" />
              <span>{isEn ? "Issue Procrastination Certificate 🛋️" : "Issue Procrastination Certificate 🛋️"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="kal-se-pakka" />
        </form>
      )}
    </div>
  );
}
