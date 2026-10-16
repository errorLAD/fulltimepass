"use client";

import React, { useState } from "react";
import { Flame, Sparkles, Check, AlertCircle, Zap } from "lucide-react";
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

    let badge = "Aukaat Out of Bounds 🔥";
    if (selectedStyle === "friendly") badge = "Pyaar Bhari Beizzati 🥰";
    if (selectedStyle === "savage") badge = "Emotional Damage: 999% 💀";
    if (selectedStyle === "best_friend") badge = "Chaddi-Buddy Roast 🤝";

    setResult({
      toolSlug: "roast-my-friend",
      toolTitle: "Roast My Friend 🔥",
      category: "Friends",
      targetName: name,
      badgeTitle: badge,
      subtitle: `Official Mode: ${selectedStyle.toUpperCase()} ROAST`,
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
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 halftone-pattern">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="funky-tape text-xs mb-3">
          🔥 BRO CODE ROAST LABORATORY
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
          Roast My Friend 🔥
        </h1>
        <p className="mt-3 text-xs sm:text-base text-slate-300 font-bold">
          Enter your friend&apos;s name, pick their toxic or funny habits, and generate a customized Hinglish roast card to blast them on WhatsApp.
        </p>
      </div>

      {result ? (
        <ResultCard data={result} onReset={handleReset} />
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* 1. Friend Name Input */}
          <div className="p-6 rounded-3xl bg-slate-950 border-4 border-black shadow-brutal">
            <label className="block text-sm font-black uppercase tracking-wider text-white mb-2">
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
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border-2 border-black text-base font-bold text-white placeholder-slate-500 focus:outline-none focus:border-funky-yellow transition-colors shadow-brutal"
              maxLength={40}
            />
            {error && (
              <p className="text-xs font-black text-funky-pink mt-2 flex items-center gap-1.5 uppercase">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* 2. Roast Style Selector */}
          <div className="p-6 rounded-3xl bg-slate-950 border-4 border-black shadow-brutal">
            <label className="block text-sm font-black uppercase tracking-wider text-white mb-3">
              Roast Style Choose Karo 🎯
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROAST_STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStyle(st.id as any)}
                  className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                    selectedStyle === st.id
                      ? "bg-funky-yellow border-black text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]"
                      : "bg-slate-900 border-black hover:border-funky-yellow text-slate-300 shadow-brutal"
                  }`}
                >
                  <div className="text-sm font-black uppercase mb-1">
                    {st.label}
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    {st.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pick Habits/Traits */}
          <div className="p-6 rounded-3xl bg-slate-950 border-4 border-black shadow-brutal">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-black uppercase tracking-wider text-white">
                Dost ki Funny Adatein (Pick 1 to 4) 🤪
              </label>
              <span className="text-xs font-black text-funky-yellow px-2 py-0.5 bg-black border border-slate-800 rounded">
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
                    className={`p-3 rounded-xl border-2 text-left text-xs font-black flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-funky-pink border-black text-white shadow-brutal"
                        : "bg-slate-900 border-black text-slate-300 hover:border-funky-yellow hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{trait.icon}</span>
                      <span>{trait.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-white stroke-[3] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black uppercase tracking-wider text-black bg-funky-yellow hover:bg-yellow-300 border-3 border-black shadow-brutal hover:shadow-brutal-hover active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 fill-black" />
                <span>Generate Savage Roast Card 🔥</span>
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
