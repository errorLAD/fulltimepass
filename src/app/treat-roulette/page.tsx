"use client";

import React, { useState, useEffect } from "react";
import {
  Dices,
  Sparkles,
  Plus,
  RotateCcw,
  Volume2,
  VolumeX,
  Shuffle,
  Users,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getTreatOccasions, getTreatEnforcementPunchlines } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import GameAudioBar from "@/components/audio/GameAudioBar";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { rouletteAudio } from "@/lib/audio/rouletteAudio";
import { useLanguage } from "@/lib/language/LanguageContext";

const WHEEL_COLORS = [
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#8B5CF6", // Purple
  "#F97316", // Orange
  "#3B82F6", // Blue
  "#EF4444", // Red
];

const SQUAD_PRESETS = {
  hi: [
    { label: "College Gang 🎓", members: ["Rahul", "Bunty", "Priya", "Amit"] },
    { label: "Chai Sutta ☕", members: ["Vicky", "Rohan", "Pooja", "Ankit", "Sneha"] },
    { label: "Office Squad 💼", members: ["Kunal", "Neha", "Siddharth", "Tanvi"] },
    { label: "Gully Boys 🏏", members: ["Chintu", "Bablu", "Guddu", "Sunny"] },
  ],
  en: [
    { label: "College Gang 🎓", members: ["Alex", "Sam", "Jordan", "Taylor"] },
    { label: "Coffee Break ☕", members: ["Chris", "Morgan", "Casey", "Riley", "Jamie"] },
    { label: "Office Lunch 💼", members: ["David", "Emma", "Lucas", "Sophie"] },
    { label: "Weekend Crew 🎉", members: ["Jake", "Chloe", "Ryan", "Maya"] },
  ],
};

export default function TreatRoulettePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const occasions = getTreatOccasions(language);
  const presets = isEn ? SQUAD_PRESETS.en : SQUAD_PRESETS.hi;

  const [names, setNames] = useState<string[]>(
    isEn ? ["Alex", "Sam", "Jordan", "Taylor"] : ["Rahul", "Priya", "Amit", "Bunty"]
  );
  const [newNameInput, setNewNameInput] = useState("");
  const [occasion, setOccasion] = useState(occasions[0]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [result, setResult] = useState<ResultCardData | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [announcementText, setAnnouncementText] = useState<string>("");

  useEffect(() => {
    setOccasion(occasions[0]);
  }, [language, occasions]);

  // Sync sound setting and stop audio on unmount
  useEffect(() => {
    setSoundOn(rouletteAudio.isEnabled());
    return () => {
      rouletteAudio.stopAll();
    };
  }, []);

  const handleToggleSound = () => {
    const next = rouletteAudio.toggleSound();
    setSoundOn(next);
  };

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newNameInput.trim();
    if (!trimmed) return;
    if (names.length >= 8) {
      alert(isEn ? "Maximum 8 friends allowed on the wheel!" : "Wheel par maximum 8 dost hi add ho sakte hain!");
      return;
    }
    setNames([...names, trimmed]);
    setNewNameInput("");
  };

  const removeName = (index: number) => {
    if (names.length > 2) {
      setNames(names.filter((_, idx) => idx !== index));
    } else {
      alert(isEn ? "At least 2 friends required!" : "Kam se kam 2 dost zaroori hain!");
    }
  };

  const handleShuffle = () => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    setNames(shuffled);
  };

  const spinWheel = () => {
    const cleanNames = names.map((n) => n.trim()).filter((n) => n.length > 0);
    if (cleanNames.length < 2) {
      alert(isEn ? "At least 2 friends required to spin!" : "Wheel ghumane ke liye kam se kam 2 dost zaroori hain!");
      return;
    }
    if (spinning) return;

    // Start audio sequence (clicking ticks + suspense drumroll)
    rouletteAudio.startSpinSequence(3800);

    setSpinning(true);
    setWinner(null);
    setResult(null);

    // Pick random winner
    const winnerIdx = Math.floor(Math.random() * cleanNames.length);
    const chosenName = cleanNames[winnerIdx];

    // Accurate pointer calculation: pointer is at top (270deg in standard Cartesian SVG)
    const sliceAngle = 360 / cleanNames.length;
    const centerAngle = winnerIdx * sliceAngle + sliceAngle / 2;
    const currentNormalized = rotation % 360;
    let targetOffset = (270 - centerAngle - currentNormalized) % 360;
    if (targetOffset < 0) targetOffset += 360;

    const extraSpins = 5 + Math.floor(Math.random() * 2); // 5 to 6 full spins
    const nextRotation = rotation + extraSpins * 360 + targetOffset;

    setRotation(nextRotation);

    setTimeout(() => {
      setSpinning(false);
      setWinner(chosenName);

      // Play comedy voice announcement
      const announced = rouletteAudio.playWinnerAnnouncement(chosenName, language);
      setAnnouncementText(announced.displayText);

      try {
        confetti({
          particleCount: 90,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#EC4899", "#06B6D4", "#10B981", "#8B5CF6"],
        });
      } catch (e) {}

      const punchlines = getTreatEnforcementPunchlines(language);
      const rule = getRandomItem(punchlines).replace("{name}", chosenName);

      setResult({
        toolSlug: "treat-roulette",
        toolTitle: isEn ? "Who Pays The Bill? Roulette 🎡" : "Treat Kaun Dega? Roulette 🎡",
        category: "Random Fun",
        targetName: chosenName,
        badgeTitle: isEn ? "Official Bill Sponsor Of The Day 🍕" : "Official Treat Sponsor Of The Day 🍕",
        score: chosenName.toUpperCase(),
        scoreLabel: isEn ? "Selected Payer" : "Selected Payer",
        subtitle: `${isEn ? "Occasion" : "Occasion"}: ${occasion}`,
        description: isEn
          ? `The Wheel of Fortune has spoken! Today's ${occasion} bill is officially on ${chosenName}. Zero excuses ('My battery is 1%' or 'I left my wallet') will be entertained!`
          : `Wheel of Fortune ne apna faisla suna diya hai! Aaj ki ${occasion} ka poora bill official taur par ${chosenName} pay karega. Koi bahana ('Bhai phone charging pe hai' ya 'Mera bank balance negative hai') accept nahi hoga!`,
        punchline: announced.displayText,
        metrics: [
          { label: isEn ? "Selected Payer" : "Selected Payer", value: chosenName },
          { label: isEn ? "Treat Occasion" : "Treat Occasion", value: occasion.split(" ")[0] },
          { label: isEn ? "Escape Chance" : "Escape Chance", value: "0.00% 🔒" },
        ],
        bulletPoints: [
          `${isEn ? "Squad on Wheel" : "Wheel Par Dost"}: ${cleanNames.join(", ")}`,
          `${isEn ? "Selection: 100% Fair Randomized Physics" : "Faisla: 100% Fair Randomized Physics"}`,
          `${rule}`,
        ],
        disclaimer: isEn
          ? "Fun Game Only: Fictional comedy entertainment among friends, not a legally binding contract!"
          : "Fun Game Only: Dosto ke beech masti-mazaak ke liye, koi kanuni payment contract nahi hai!",
      });
    }, 3800);
  };

  const handleReset = () => {
    rouletteAudio.stopAll();
    setWinner(null);
    setResult(null);
    setAnnouncementText("");
  };

  const cleanNames = names.map((n) => n.trim()).filter((n) => n.length > 0);
  const sliceAngle = cleanNames.length > 0 ? 360 / cleanNames.length : 180;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10" suppressHydrationWarning>
      {/* Sleek Page Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-2.5 shadow-2xs">
          <Dices className="w-3.5 h-3.5 text-amber-600" />
          <span>FullTimePass • {isEn ? "The Bill Trap Roulette" : "The Bill Trap Roulette"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {isEn ? "Who Pays The Bill? 🍕" : "Treat Kaun Dega? 🍕"}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
          {isEn
            ? "Spin the wheel to trap the friend who always vanishes when the bill arrives!"
            : "Wheel ghooma aur us dost ko pakad jo bill aate hi washroom bhaag jaata hai!"}
        </p>
      </div>

      {result ? (
        <div className="space-y-6">
          {/* Winner Celebration Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl shrink-0 p-2 rounded-2xl bg-white/15">💸</span>
              <div>
                <span className="text-[11px] sm:text-xs uppercase font-black tracking-wider text-amber-200 block">
                  {isEn ? "Official Bill Sponsor Of The Day" : "Aaj Ka Bakra (Trapped Sponsor)"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {winner}! 🎉
                </h2>
                <span className="text-xs text-amber-100 font-semibold hidden sm:inline">
                  {isEn ? `Trapped for: ${occasion}` : `Treat: ${occasion}`}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white text-slate-950 font-black text-xs sm:text-sm hover:bg-amber-50 active:scale-95 shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-amber-600 stroke-[3]" />
              <span>{isEn ? "Spin Again 🔄" : "Ghooma Phir Se 🔄"}</span>
            </button>
          </div>

          {/* Live Comedy Voice Announcement Line */}
          {announcementText && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">🎙️</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-amber-800">
                    {isEn ? "Live Audio Voice Punchline" : "Live Comedy Voice Punchline"}
                  </span>
                  {soundOn && (
                    <button
                      type="button"
                      onClick={() => {
                        if (winner) {
                          const announced = rouletteAudio.playWinnerAnnouncement(winner, language);
                          setAnnouncementText(announced.displayText);
                        }
                      }}
                      className="text-[10px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{isEn ? "New Joke" : "Nayi Line"}</span>
                    </button>
                  )}
                </div>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug italic">
                  &ldquo;{announcementText}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Shared Natural Human Voice & Sound Effects Bar */}
          <GameAudioBar
            toolSlug="treat-roulette"
            targetName={result.targetName}
            badgeTitle={result.badgeTitle}
            description={result.description}
            punchline={result.punchline}
            score={result.score}
            scoreLabel={result.scoreLabel}
            language={language}
          />

          {/* Result Card for WhatsApp Sharing & Download */}
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="treat-roulette" />
        </div>
      ) : (
        /* UNIFIED SINGLE-CARD ROULETTE DASHBOARD */
        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-slate-200 shadow-xl relative overflow-hidden">
          {/* Card Top Header: Status & Sound Toggle */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isEn ? "100% Fair Physics Engine" : "100% Fair Physics Engine"}</span>
            </div>

            <button
              type="button"
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                soundOn
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                  : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
              }`}
              title={soundOn ? "Sound Effects ON" : "Sound Effects MUTED"}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>{isEn ? "Sound ON" : "Sound ON"}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEn ? "Sound Muted" : "Sound Muted"}</span>
                </>
              )}
            </button>
          </div>

          {/* Main 2-Column Grid on Desktop, Streamlined Flow on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* LEFT / CENTER: THE ROULETTE WHEEL */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              {/* Pointer Needle at Top */}
              <div className="z-30 -mb-3 text-3xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] select-none">
                🔻
              </div>

              {/* The SVG Roulette Wheel */}
              <div
                onClick={spinWheel}
                className="relative w-64 h-64 sm:w-76 sm:h-76 flex items-center justify-center cursor-pointer group"
                title={isEn ? "Click to spin the wheel!" : "Ghumane ke liye tap karein!"}
              >
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full rounded-full border-4 border-slate-800 shadow-2xl transition-transform"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transitionDuration: spinning ? "3.8s" : "0s",
                    transitionTimingFunction: "cubic-bezier(0.15, 0.9, 0.2, 1)",
                  }}
                >
                  {cleanNames.map((name, idx) => {
                    const startAngle = idx * sliceAngle;
                    const endAngle = startAngle + sliceAngle;
                    const x1 = 100 + 100 * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = 100 + 100 * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = 100 + 100 * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = 100 + 100 * Math.sin((Math.PI * endAngle) / 180);
                    const largeArc = sliceAngle > 180 ? 1 : 0;
                    const pathData = `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;

                    // Position text along the center of the slice
                    const textAngle = startAngle + sliceAngle / 2;
                    const textRad = (Math.PI * textAngle) / 180;
                    const textX = 100 + 62 * Math.cos(textRad);
                    const textY = 100 + 62 * Math.sin(textRad);

                    return (
                      <g key={idx}>
                        <path
                          d={pathData}
                          fill={WHEEL_COLORS[idx % WHEEL_COLORS.length]}
                          stroke="#0f172a"
                          strokeWidth="2.5"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="#0f172a"
                          fontSize={cleanNames.length > 6 ? "8.5" : cleanNames.length > 4 ? "9.5" : "11"}
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                        >
                          {name.length > 8 ? name.slice(0, 8) + ".." : name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Hub with Golden Accent */}
                  <circle cx="100" cy="100" r="20" fill="#0f172a" stroke="#F59E0B" strokeWidth="3" />
                  <circle cx="100" cy="100" r="9" fill="#F59E0B" />
                </svg>

                {/* Center Spin Hint for Desktop / Hover */}
                {!spinning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-black tracking-wider uppercase">
                      Spin
                    </span>
                  </div>
                )}
              </div>

              {/* Big Prominent Action CTA Directly Below Wheel */}
              <button
                type="button"
                onClick={spinWheel}
                disabled={spinning || cleanNames.length < 2}
                className="w-full sm:w-auto mt-6 px-8 py-4 rounded-2xl text-base sm:text-lg font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 hover:from-amber-300 hover:to-orange-300 active:scale-98 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                <Dices className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
                <span>
                  {spinning
                    ? isEn ? "Spinning The Wheel..." : "Ghoom Raha Hai Wheel..."
                    : isEn ? "SPIN THE WHEEL 🎯" : "GHOOMA WHEEL 🎯"}
                </span>
              </button>
            </div>

            {/* RIGHT: CLEAN, COMPACT SETUP (OCCASION + CHIPS) */}
            <div className="lg:col-span-6 space-y-4">
              {/* 1. Treat Occasion Dropdown */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  {isEn ? "What's The Occasion? 🍕" : "Treat Kaun Si Hai? 🍕"}
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors cursor-pointer"
                >
                  {occasions.map((occ, idx) => (
                    <option key={idx} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Friends on Wheel (Interactive Chips + Quick Add) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isEn ? "Friends on Wheel (2 to 8)" : "Wheel Par Dost (2 se 8)"}</span>
                  </label>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    {cleanNames.length}/8 {isEn ? "friends" : "dost"}
                  </span>
                </div>

                {/* Quick Add Input Bar */}
                <form onSubmit={handleAddName} className="flex gap-2">
                  <input
                    type="text"
                    value={newNameInput}
                    onChange={(e) => setNewNameInput(e.target.value)}
                    placeholder={isEn ? "Type name & press Enter..." : "Dost ka naam likho..."}
                    maxLength={20}
                    disabled={names.length >= 8}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!newNameInput.trim() || names.length >= 8}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{isEn ? "Add" : "Add"}</span>
                  </button>
                </form>

                {/* Interactive Friend Chips Cloud */}
                <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 min-h-[76px]">
                  {names.map((name, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800 hover:border-slate-300 transition-all"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: WHEEL_COLORS[idx % WHEEL_COLORS.length] }}
                      />
                      <span className="truncate max-w-[110px]">{name}</span>
                      {names.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeName(idx)}
                          className="w-4 h-4 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer ml-0.5"
                          title={isEn ? "Remove" : "Hatao"}
                          aria-label={`Remove ${name}`}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. 1-Click Quick Squad Presets */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isEn ? "1-Click Squad Presets" : "1-Click Squad Presets"}
                  </span>
                  <button
                    type="button"
                    onClick={handleShuffle}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                    title="Shuffle wheel order"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>{isEn ? "Shuffle Order" : "Order Badlo"}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNames(preset.members)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Viral Mini-Apps */}
      <div className="mt-8">
        <RelatedTools currentSlug="treat-roulette" />
      </div>
    </div>
  );
}
