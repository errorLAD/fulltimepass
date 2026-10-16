"use client";

import React, { useState } from "react";
import { Flame, Sparkles, Check, AlertCircle } from "lucide-react";
import { ROAST_TRAITS, ROAST_STYLES, ROAST_TEMPLATES } from "@/lib/data/toolData";
import ResultCard from "@/components/shared/ResultCard";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";

export default function RoastMyFriendPage() {
  const [friendName, setFriendName] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<"friendly" | "savage" | "best_friend">("savage");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResultCardData | null>(null);

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
      setError("Dost ka naam ya nickname likho bhai! Bina naam ke kiski beizzati karoge?");
      return;
    }
    setError("");

    const name = friendName.trim();
    const templates = ROAST_TEMPLATES[selectedStyle];
    const baseTemplate = getRandomItem(templates).replace(/{name}/g, name);

    // Pick trait highlights
    const traitObjects = ROAST_TRAITS.filter((t) => selectedTraits.includes(t.id));
    const traitPunchlines = traitObjects.map((t) => t.label);

    let badge = "Certified Aukaat Out of Bounds 🔥";
    if (selectedStyle === "friendly") badge = "Pyaar Bhari Beizzati 🥰";
    if (selectedStyle === "savage") badge = "Emotional Damage Level: 999% 💀";
    if (selectedStyle === "best_friend") badge = "Chaddi-Buddy Roast Supreme 🤝";

    setResult({
      toolSlug: "roast-my-friend",
      toolTitle: "Roast My Friend 🔥",
      category: "Friends",
      targetName: name,
      badgeTitle: badge,
      subtitle: `Style: ${selectedStyle.toUpperCase()} ROAST`,
      description: baseTemplate,
      punchline: traitPunchlines.length > 0
        ? `Primary Crime: ${traitPunchlines[0]}`
        : "Harkatein aisi ki dushman bhi salute maar de!",
      metrics: [
        { label: "Savage Level", value: selectedStyle === "savage" ? "10/10 🔥" : "7/10 🌶️" },
        { label: "Brain Cells", value: "0.5% 🧠" },
        { label: "Sharam Factor", value: "Not Found ❌" },
      ],
      bulletPoints: traitPunchlines.slice(0, 3).map((tp) => `Aadat: ${tp}`),
      disclaimer: "Dil pe mat lena dost, roast sirf entertainment aur pure bhaichare ke liye hai!",
    });
  };

  const handleReset = () => {
    setResult(null);
    setFriendName("");
    setSelectedTraits([]);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mb-3">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>FullTimePass • Friend Roaster</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Roast My Friend 🔥
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Enter your friend&apos;s name, pick their toxic or funny habits, and generate a customized Hinglish roast card to blast them on WhatsApp.
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-8">
          {/* 1. Friend Name Input */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md">
            <label className="block text-sm font-bold text-white mb-2">
              Dost ka Naam ya Nickname 👤
            </label>
            <input
              type="text"
              placeholder="e.g. Bunty, Sharma Ji ka ladka, Chintu, Priya, etc."
              value={friendName}
              onChange={(e) => {
                setFriendName(e.target.value);
                if (error) setError("");
              }}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-base text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              maxLength={40}
            />
            {error && (
              <p className="text-xs font-bold text-red-400 mt-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* 2. Roast Style Selector */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md">
            <label className="block text-sm font-bold text-white mb-3">
              Roast Style Choose Karo 🎯
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROAST_STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStyle(st.id as any)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedStyle === st.id
                      ? "bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-500/10 scale-[1.02]"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-1">
                    {st.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {st.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pick Habits/Traits */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border-2 border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-white">
                Dost ki Funny Adatein (Pick 1 to 4) 🤪
              </label>
              <span className="text-xs text-slate-400">
                {selectedTraits.length}/4 selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ROAST_TRAITS.map((trait) => {
                const isSelected = selectedTraits.includes(trait.id);
                return (
                  <button
                    key={trait.id}
                    type="button"
                    onClick={() => toggleTrait(trait.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? "bg-orange-500/20 border-orange-500 text-orange-200"
                        : "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{trait.icon}</span>
                      <span>{trait.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-orange-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 shadow-desi-pop hover:shadow-desi-pop-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Generate Savage Roast Card 🔥</span>
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
