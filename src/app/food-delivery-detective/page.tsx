"use client";

import React, { useState } from "react";
import { UtensilsCrossed, Sparkles, Navigation } from "lucide-react";
import { getDeliveryDelayOptions, getHungerLevels, getFoodCrimeLogs } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem, getRandomItems } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const DELIVERY_PUNCHLINES_HI = [
  "Rider's Telepathic Status: 'Bhaiya thoda sa French fries taste kar raha tha, bas 5 minute mein aaya!'",
  "Hangry Alert: Order aane se pehle agar rider mila, toh use kidnap karke poora bag chheen liya jayega!",
  "GPS Anomaly: Rider has completed 14 laps of a random roundabout while listening to Punjabi drill beats!",
  "Culinary Tragedy: Khana itna thanda ho chuka hai ki fridge mein rakhne ki zaroorat nahi bachi!",
];

const DELIVERY_PUNCHLINES_EN = [
  "Courier's Telepathic Status: 'Just quality-testing a few of your french fries, arriving in 5 minutes!'",
  "Hangry Alert: If you spot the delivery driver, you are prepared to intercept the bag like a linebacker!",
  "GPS Anomaly: Courier has completed 14 laps of a random roundabout while listening to upbeat dance beats!",
  "Culinary Tragedy: Food has reached absolute zero; no refrigeration will be required upon arrival!",
];

export default function FoodDeliveryDetectivePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const delayOptions = getDeliveryDelayOptions(language);
  const hungerLevels = getHungerLevels(language);

  const [foodItem, setFoodItem] = useState(isEn ? "Double Cheeseburger & Truffle Fries" : "Chicken Biryani & Garlic Naan");
  const [selectedDelayIndex, setSelectedDelayIndex] = useState(1);
  const [selectedHungerIndex, setSelectedHungerIndex] = useState(2);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const delay = delayOptions[selectedDelayIndex] || delayOptions[0];
    const hunger = hungerLevels[selectedHungerIndex] || hungerLevels[0];

    const item = foodItem.trim() || (isEn ? "Midnight Takeout" : "Midnight Khana");
    const crimeLogs = getFoodCrimeLogs(language);
    const pickedLogs = getRandomItems(crimeLogs, 2);
    const punchlines = isEn ? DELIVERY_PUNCHLINES_EN : DELIVERY_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    // Calculate deterministic Delivery Desperation Index (0-100)
    const delayPoints = selectedDelayIndex === 2 ? 92 : selectedDelayIndex === 1 ? 68 : 35;
    const hungerPoints = selectedHungerIndex === 2 ? 96 : selectedHungerIndex === 1 ? 70 : 40;
    const desperationIndex = Math.min(Math.round((delayPoints + hungerPoints) / 2), 99);

    setResult({
      toolSlug: "food-delivery-detective",
      toolTitle: isEn ? "Food Delivery Detective 🍕" : "Food Delivery Detective 🍕",
      category: "Random Fun",
      targetName: `${isEn ? "Missing" : "Missing"}: ${item}`,
      badgeTitle: isEn ? "GPS Conspiracy Confirmed 🚨" : "GPS Conspiracy Confirmed 🚨",
      score: `${desperationIndex}%`,
      scoreLabel: isEn ? "Delivery Desperation Index" : "Delivery Desperation Index",
      subtitle: `${isEn ? "Target Order" : "Target Order"}: ${item} • ${delay.label}`,
      description: isEn
        ? `This isn't just dinner—it's an international missing-bag mystery! Our forensic investigation shows your delivery courier made 4 inexplicable U-turns, visited a convenience store, and has been idling 200 feet from your doorstep for 15 minutes.`
        : `Bhai khana nahi, ab delivery partner ki real-time location par PhD thesis submit hone wali hai! Hamari detective team ne paya ki delivery rider ne 4 U-turns liye, Sharma ji ki tapri pe samosa khaya aur ab aapke ghar se exactly 200 meter door ruk ke call disconnect kar raha hai.`,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "Hangry Level" : "Hunger Level", value: hunger.label.split(" ")[0] },
        { label: isEn ? "Roundabout Circles" : "Roundabout Loops", value: isEn ? "8 Laps 🔄" : "8 Circles 🔄" },
        { label: isEn ? "Food Temperature" : "Food Temperature", value: isEn ? "Room Temp 🧊" : "Sub-Zero 🧊" },
      ],
      bulletPoints: [
        `${isEn ? "Target Case Item" : "Case Item"}: ${item}`,
        `${isEn ? "Courier Log 1" : "Suspect Log 1"}: ${pickedLogs[0]}`,
        `${isEn ? "Courier Log 2" : "Suspect Log 2"}: ${pickedLogs[1] || crimeLogs[0]}`,
      ],
      disclaimer: isEn
        ? "Satirical Food Parody: Made in honor of late-night delivery cravings. Respect our hardworking delivery drivers!"
        : "Satirical Food Parody: Made in honor of late-night delivery cravings. Respect our real delivery heroes!",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold mb-3">
          <UtensilsCrossed className="w-4 h-4 text-orange-600" />
          <span>FullTimePass • {isEn ? "Hangry Investigation Bureau" : "Hangry Investigation Bureau"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Food Delivery Detective 🍕" : "Food Delivery Detective 🍕"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Not just waiting for dinner—you're writing an investigative thesis on your courier's GPS location! Decode your order's mysterious road journey."
            : "Khana nahi, ab delivery partner ki location par PhD chal rahi hai! Decode your order's mysterious road journey."}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="food-delivery-detective" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Food Item */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "What Food Did You Order That Hasn't Arrived? 🍔" : "Kya Order Kiya Tha Jo Abhi Tak Nahi Aaya? 🍔"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Cheese Burst Pizza, Double Cheeseburger, Pad Thai, Tacos..." : "e.g. Cheese Burst Pizza, Butter Chicken, Momos, Dosa..."}
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
              maxLength={50}
              required
            />
          </div>

          {/* Delay */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "How Long Have You Been Staring At The Map? 🛵" : "Kitni Der Se Map Ko Ghoor Rahe Ho? 🛵"}
            </label>
            <div className="space-y-2.5">
              {delayOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDelayIndex(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                    selectedDelayIndex === idx
                      ? "bg-orange-50 border-2 border-orange-500 text-orange-950 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hunger Level */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Your Current Hangry Level 🦖" : "Aapka Current Bhookh Level 🦖"}
            </label>
            <div className="space-y-2.5">
              {hungerLevels.map((h, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedHungerIndex(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedHungerIndex === idx
                      ? "bg-rose-50 border-2 border-rose-500 text-rose-950 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold uppercase text-slate-900">{h.label}</span>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{h.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-300 hover:to-amber-400 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              <span>{isEn ? "Investigate Delivery Roadblocks 🍕" : "Track Delivery Roadblocks 🍕"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="food-delivery-detective" />
        </form>
      )}
    </div>
  );
}
