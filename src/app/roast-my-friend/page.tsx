"use client";

import React, { useState, useEffect } from "react";
import { Flame, Sparkles, Check, AlertCircle, Volume2 } from "lucide-react";
import {
  getRoastTraits,
  getRoastStyles,
  getRoastTemplates,
  getRoastTraitBurns,
} from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import RoastAudioControls from "@/components/roast/RoastAudioControls";
import RoastRevealSuspense from "@/components/roast/RoastRevealSuspense";
import { roastAudio } from "@/lib/audio/roastAudio";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

export default function RoastMyFriendPage() {
  const { language } = useLanguage();
  const [friendName, setFriendName] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<"friendly" | "savage" | "best_friend">("savage");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResultCardData | null>(null);
  const [pendingResult, setPendingResult] = useState<ResultCardData | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    return () => {
      roastAudio.stopAll();
    };
  }, []);

  const traits = getRoastTraits(language);
  const styles = getRoastStyles(language);
  const templatesMap = getRoastTemplates(language);
  const burnsMap = getRoastTraitBurns(language);

  const toggleTrait = (traitId: string) => {
    if (selectedTraits.includes(traitId)) {
      setSelectedTraits(selectedTraits.filter((t) => t !== traitId));
    } else {
      if (selectedTraits.length >= 4) {
        return; // Max 4 traits for focused punch
      }
      setSelectedTraits([...selectedTraits, traitId]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) {
      setError(
        language === "en"
          ? "Please enter your friend's name or nickname first!"
          : "Dost ka naam ya nickname likho bhai! Bina naam ke kiski beizzati karoge?"
      );
      return;
    }
    setError("");

    const name = friendName.trim();
    const templates = templatesMap[selectedStyle];
    const baseTemplate = getRandomItem(templates).replace(/{name}/g, name);

    // Pick trait highlights & custom targeted burns
    const traitBurns: string[] = [];
    const bulletPoints: string[] = [];

    selectedTraits.forEach((traitId) => {
      const burns = burnsMap[traitId];
      if (burns && burns.length > 0) {
        const pickedBurn = getRandomItem(burns).replace(/{name}/g, name);
        traitBurns.push(pickedBurn);
      }
      const traitObj = traits.find((t) => t.id === traitId);
      if (traitObj) {
        bulletPoints.push(`${traitObj.icon} ${traitObj.label}`);
      }
    });

    // Synthesize full roast description
    let fullDescription = baseTemplate;
    const reportHeader = language === "en" ? "\n\n🔥 Official Flaw Report:\n" : "\n\n🔥 Asli Crime Report:\n";
    if (traitBurns.length > 0) {
      fullDescription += reportHeader + traitBurns.slice(0, 2).join("\n\n");
    }

    // Dynamic punchline
    let punchline = "";
    if (traitBurns.length > 2) {
      punchline = language === "en" ? `Bonus Roast: ${traitBurns[2]}` : `Bonus Beizzati: ${traitBurns[2]}`;
    } else if (selectedStyle === "savage") {
      punchline = language === "en"
        ? "Warning: Hanging out with this individual requires comprehensive mental insurance!"
        : "Warning: Iske sath baithne se pehle dimaag ka insurance karwana zaroori hai!";
    } else if (selectedStyle === "best_friend") {
      punchline = language === "en"
        ? "Final Advice: In your next lifetime, vet your best friends a bit more carefully!"
        : "Final Advice: Agle janam mein dosti karne se pehle 4 baar sochna padega!";
    } else {
      punchline = language === "en"
        ? "Squad Verdict: Totally unhinged, but family nonetheless. Don't let them escape without paying!"
        : "Squad Verdict: Bakchod hai par apna bhai hai, treat ke bina mat chhodna!";
    }

    // Calculate deterministic Savage Meter score (0-100)
    const baseSavage = selectedStyle === "savage" ? 84 : selectedStyle === "best_friend" ? 64 : 36;
    const traitBonus = selectedTraits.length * 4;
    const savageScore = Math.min(baseSavage + traitBonus, 99);

    let savageBadge = language === "en" ? "Playful Banter Level 😊" : "Friendly Banter Level 😊";
    if (savageScore >= 80) {
      savageBadge = language === "en" ? "Nuclear Level Savage Roast 💀" : "Nuclear Level Savage Roast 💀";
    } else if (savageScore >= 55) {
      savageBadge = language === "en" ? "Spicy Squad Burn 🔥" : "Spicy Bhai-Log Burn 🔥";
    }

    const defaultBullets = language === "en"
      ? [
          "Habit: Advising Fortune 500 CEOs over cheap coffee",
          "Habit: Vanishing to the restroom when the check drops",
          "Habit: Saying '5 mins away' while still wrapped in bed sheets",
        ]
      : [
          "Aadat: Tapri pe baith ke Ambani ko business tips dena",
          "Aadat: Treat ke time washroom mein gayab ho jana",
          "Aadat: 'Bas 5 minute mein pahunch raha hoon' bol ke sona",
        ];

    const cardData: ResultCardData = {
      toolSlug: "roast-my-friend",
      toolTitle: "Roast My Friend 🔥",
      category: "Friends",
      targetName: name,
      badgeTitle: savageBadge,
      score: `${savageScore}%`,
      scoreLabel: language === "en" ? "Savage Meter Score" : "Savage Meter Score",
      subtitle: `Official Mode: ${selectedStyle.toUpperCase()} ROAST`,
      description: fullDescription,
      punchline,
      metrics: [
        { label: language === "en" ? "Savage Intensity" : "Savage Intensity", value: `${savageScore}% 🔥` },
        { label: language === "en" ? "Emotional Damage" : "Emotional Damage", value: `${Math.min(savageScore + 5, 100)}% 🚑` },
        { label: language === "en" ? "Recovery Chance" : "Recovery Chance", value: savageScore > 75 ? "0.01% 📉" : "85% 🩹" },
      ],
      bulletPoints: bulletPoints.length > 0 ? bulletPoints : defaultBullets,
      disclaimer: language === "en"
        ? "Don't take it to heart—roasts are strictly for harmless entertainment and squad love!"
        : "Dil pe mat lena dost, roast sirf entertainment aur pure bhaichare ke liye hai!",
    };

    setPendingResult(cardData);
    setIsRevealing(true);
  };

  const handleReset = () => {
    roastAudio.stopAll();
    setResult(null);
    setPendingResult(null);
    setIsRevealing(false);
    setFriendName("");
    setSelectedTraits([]);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-2xs">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>FullTimePass • Roast Laboratory 🔥</span>
          <span className="text-amber-300">•</span>
          <span className="flex items-center gap-1 text-amber-900 font-extrabold">
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === "en" ? "Funny Roast Voice & Audio FX 🔊" : "Roast Voice & Sound Effects 🔊"}</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          Roast My Friend 🔥
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {language === "en"
            ? "Enter your friend's name, choose their funny or toxic habits, and generate a customized savage roast card with lethal punchlines to share with your squad."
            : "Enter your friend's name, pick their toxic or funny habits, and generate a customized Hinglish roast card with lethal punchlines to blast them on WhatsApp."}
        </p>
      </div>

      {isRevealing && pendingResult ? (
        <RoastRevealSuspense
          friendName={pendingResult.targetName || friendName}
          language={language}
          onComplete={() => {
            setResult(pendingResult);
            setIsRevealing(false);
          }}
        />
      ) : result ? (
        <ResultCard
          data={result}
          onReset={handleReset}
          audioAction={
            <RoastAudioControls
              friendName={result.targetName || friendName}
              description={result.description}
              punchline={result.punchline}
              language={language}
            />
          }
        />
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* 1. Friend Name Input */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2.5">
              {language === "en" ? "Friend's Name or Nickname 👤" : "Dost ka Naam ya Nickname 👤"}
            </label>
            <input
              type="text"
              placeholder={
                language === "en"
                  ? "e.g. Alex, Dave, Sarah, Jordan, etc."
                  : "e.g. Bunty, Sharma Ji ka ladka, Chintu, Priya, etc."
              }
              value={friendName}
              onChange={(e) => {
                setFriendName(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              maxLength={40}
            />
            {error && (
              <p className="text-xs sm:text-sm font-semibold text-rose-600 mt-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* 2. Roast Style Selector */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <label className="block text-sm sm:text-base font-bold text-slate-900 mb-3">
              {language === "en" ? "Choose Roast Style 🎯" : "Roast Style Choose Karo 🎯"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {styles.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStyle(st.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStyle === st.id
                      ? "bg-amber-100/80 border-2 border-amber-500 text-slate-900 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold mb-1 text-slate-900">
                    {st.label}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {st.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pick Habits/Traits */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between mb-3.5">
              <label className="block text-sm sm:text-base font-bold text-slate-900">
                {language === "en" ? "Friend's Quirks & Flaws (Pick 1 to 4) 🤪" : "Dost ki Funny Adatein (Pick 1 to 4) 🤪"}
              </label>
              <span className="text-xs font-semibold text-amber-800 px-2.5 py-0.5 bg-amber-50 border border-amber-200 rounded-md">
                {selectedTraits.length}/4 selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {traits.map((trait) => {
                const isSelected = selectedTraits.includes(trait.id);
                return (
                  <button
                    key={trait.id}
                    type="button"
                    onClick={() => toggleTrait(trait.id)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-semibold flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-rose-50 border-2 border-rose-500 text-rose-900 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{trait.icon}</span>
                      <span>{trait.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-rose-600 stroke-[3] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>{language === "en" ? "Generate Roast Card 🔥" : "Generate Savage Roast Card 🔥"}</span>
              </span>
            </button>
          </div>
          <RelatedTools currentSlug="roast-my-friend" />
        </form>
      )}
      {result && <RelatedTools currentSlug="roast-my-friend" />}
    </div>
  );
}
