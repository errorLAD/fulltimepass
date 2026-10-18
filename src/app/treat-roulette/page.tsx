"use client";

import React, { useState, useEffect } from "react";
import {
  Dices,
  Sparkles,
  Plus,
  Trash2,
  ArrowRight,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getTreatOccasions, getTreatEnforcementPunchlines } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
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
  "#F97316", // Orange
  "#8B5CF6", // Purple
];

export default function TreatRoulettePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const occasions = getTreatOccasions(language);
  const [names, setNames] = useState<string[]>(isEn ? ["Alex", "Sam", "Jordan", "Taylor"] : ["Rahul", "Priya", "Amit", "Bunty"]);
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

  // Initialize sound settings and cleanup audio on unmount
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

  const addName = () => {
    if (names.length < 8) setNames([...names, ""]);
  };

  const removeName = (index: number) => {
    if (names.length > 2) setNames(names.filter((_, idx) => idx !== index));
  };

  const handleNameChange = (index: number, val: string) => {
    const updated = [...names];
    updated[index] = val;
    setNames(updated);
  };

  const spinWheel = () => {
    const cleanNames = names.map((n) => n.trim()).filter((n) => n.length > 0);
    if (cleanNames.length < 2) {
      alert(isEn ? "At least 2 friends' names required to spin the wheel!" : "Kam se kam 2 dosto ke naam chahiye wheel ghumane ke liye!");
      return;
    }
    if (spinning) return;

    // Start sound sequence right on click (clicks + suspense drumroll)
    rouletteAudio.startSpinSequence(3800);

    setSpinning(true);
    setWinner(null);
    setResult(null);

    // Random winner index
    const winnerIdx = Math.floor(Math.random() * cleanNames.length);
    const chosenName = cleanNames[winnerIdx];

    // Compute slice angles
    const sliceAngle = 360 / cleanNames.length;
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const targetDegree = extraSpins * 360 + (360 - (winnerIdx * sliceAngle + sliceAngle / 2));

    setRotation(targetDegree);

    setTimeout(() => {
      setSpinning(false);
      setWinner(chosenName);

      // Play dramatic pause + comedic sting + playful voice in chosen language
      const announced = rouletteAudio.playWinnerAnnouncement(chosenName, language);
      setAnnouncementText(announced.displayText);

      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#EC4899", "#06B6D4", "#10B981"],
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
          ? `The Wheel of Fortune has spoken! Today's ${occasion} bill is officially on ${chosenName}. Zero excuses ('My phone battery is 1%' or 'I left my wallet') will be entertained!`
          : `Wheel of Fortune ne apna faisla suna diya hai! Aaj ki ${occasion} ka poora bill official taur par ${chosenName} pay karega. Koi bahana ('Bhai phone charging pe hai' ya 'Mera bank balance negative hai') accept nahi hoga!`,
        punchline: announced.displayText,
        metrics: [
          { label: isEn ? "Selected Payer" : "Selected Payer", value: chosenName },
          { label: isEn ? "Treat Occasion" : "Treat Occasion", value: occasion.split(" ")[0] },
          { label: isEn ? "Escape Chance" : "Escape Chance", value: "0.00% 🔒" },
        ],
        bulletPoints: [
          `${isEn ? "Wheel Participants" : "Wheel Participants"}: ${cleanNames.join(", ")}`,
          `${isEn ? "Selection Mechanism: 100% Fair Randomized Physics" : "Selection Mechanism: 100% Fair Randomized Physics"}`,
          `${rule}`,
        ],
        disclaimer: isEn
          ? "Fun Game Only: Fictional entertainment among friends, not a legally binding payment contract!"
          : "Fun Game Only: Fictional entertainment among friends, not a legally binding payment contract!",
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
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" suppressHydrationWarning>
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-xs">
          <Dices className="w-4 h-4 text-amber-600" />
          <span>FullTimePass • {isEn ? "The Bill Trap Roulette" : "The Bill Trap Roulette"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Who Pays The Bill? 🍕" : "Treat Kaun Dega? 🍕"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Spin the wheel and trap that friend who always disappears when the check arrives! 100% fair, unbiased & hilarious with live comedic voice effects."
            : "Spin the wheel and trap that friend who always disappears when the bill arrives! 100% fair, unbiased & hilarious with live Indian comedy voice effects."}
        </p>
      </div>

      {result ? (
        <div className="space-y-6">
          {/* Result Audio & Replay Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 max-w-xl mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">💸</span>
              <div>
                <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                  {isEn ? "Selected Bill Payer:" : "Selected Bill Payer:"} <span className="text-emerald-600">{winner}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  {soundOn
                    ? isEn ? "🔊 Comedic audio voice active" : "🔊 Indian comedy voice active"
                    : isEn ? "🔇 Sound effects muted" : "🔇 Sound effects muted"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {soundOn && winner && (
                <button
                  type="button"
                  onClick={() => {
                    const announced = rouletteAudio.playWinnerAnnouncement(winner, language);
                    setAnnouncementText(announced.displayText);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors shadow-2xs cursor-pointer"
                  title="Replay winner audio announcement with new joke"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>{isEn ? "Replay Voice (New Line) 📢" : "Replay Voice (New Line) 📢"}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleToggleSound}
                className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer shadow-2xs ${
                  soundOn
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                }`}
                title={soundOn ? "Mute Game Sound" : "Enable Game Sound"}
              >
                {soundOn ? (
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </button>
            </div>
          </div>

          {/* Live Audio Dialogue Banner */}
          {winner && (
            <div className="max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-xs flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">🎙️</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-800">
                    {isEn ? "Live Comedy Voice Line" : "Live Comedy Voice Line"}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-full">
                    {isEn ? "Changes Every Time 🔄" : "Changes Every Time 🔄"}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  &ldquo;{announcementText || (isEn ? `Trapped! Today's designated payer is ${winner}! Pull out your card, zero excuses!` : `Fas gaya bhaiiii! Aaj ka gareeb hai ${winner}! UPI kholo, sharam chhodo, treat do!`)}&rdquo;
                </p>
              </div>
            </div>
          )}

          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="treat-roulette" />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-8">
          {/* THE ANIMATED ROULETTE WHEEL */}
          <div className="p-4 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Top Wheel Control Bar with Sound Toggle */}
            <div className="w-full flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isEn ? "100% Fair Physics" : "100% Fair Physics"}</span>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={handleToggleSound}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                  soundOn
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                }`}
                aria-label={soundOn ? "Mute Game Sound" : "Enable Game Sound"}
                title={soundOn ? "Sound Effects ON (Click to Mute)" : "Sound Effects MUTED (Click to Enable)"}
              >
                {soundOn ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    <span>{isEn ? "Sound ON 🔊" : "Sound ON 🔊"}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isEn ? "Sound OFF 🔇" : "Sound OFF 🔇"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Pointer arrow on top */}
            <div className="z-30 -mb-3 text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              🔻
            </div>

            {/* Rotating SVG Wheel */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full rounded-full border-4 border-slate-800 shadow-2xl transition-transform cubic-bezier"
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

                  // text angle
                  const textAngle = startAngle + sliceAngle / 2;
                  const textRad = (Math.PI * textAngle) / 180;
                  const textX = 100 + 60 * Math.cos(textRad);
                  const textY = 100 + 60 * Math.sin(textRad);

                  return (
                    <g key={idx}>
                      <path
                        d={pathData}
                        fill={WHEEL_COLORS[idx % WHEEL_COLORS.length]}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill="#0f172a"
                        fontSize={cleanNames.length > 5 ? "8" : "10"}
                        fontWeight="800"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      >
                        {name.length > 8 ? name.slice(0, 8) + ".." : name}
                      </text>
                    </g>
                  );
                })}
                {/* Center Hub */}
                <circle cx="100" cy="100" r="18" fill="#0f172a" stroke="#F59E0B" strokeWidth="3" />
                <circle cx="100" cy="100" r="8" fill="#F59E0B" />
              </svg>
            </div>

            {/* Spin CTA Button */}
            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning || cleanNames.length < 2}
              className="mt-6 px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Dices className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
              <span>{spinning ? (isEn ? "Spinning The Wheel..." : "Ghoom Raha Hai Wheel...") : (isEn ? "SPIN THE WHEEL 🎯" : "GHOOMA WHEEL 🎯")}</span>
            </button>
          </div>

          {/* Friends & Occasion Setup Form */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                {isEn ? "What's The Occasion? 🍕" : "Treat Kaun Si Hai? 🍕"}
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              >
                {occasions.map((occ, idx) => (
                  <option key={idx} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-sm sm:text-base font-bold text-slate-900">
                  {isEn ? "Enter Friends on Wheel (2 to 8) 👥" : "Enter Friends on Wheel (2 to 8) 👥"}
                </label>
                <span className="text-xs font-semibold text-amber-900 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg">
                  {names.length}/8 {isEn ? "friends" : "friends"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {names.map((name, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center text-slate-950 shrink-0"
                      style={{ backgroundColor: WHEEL_COLORS[idx % WHEEL_COLORS.length] }}
                    >
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      placeholder={isEn ? `Friend #${idx + 1}` : `Friend #${idx + 1}`}
                      value={name}
                      onChange={(e) => handleNameChange(idx, e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      maxLength={20}
                      required
                    />
                    {names.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeName(idx)}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {names.length < 8 && (
                <button
                  type="button"
                  onClick={addName}
                  className="mt-3.5 text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{isEn ? "Add Friend to Wheel" : "Add Friend to Wheel"}</span>
                </button>
              )}
            </div>
          </div>
          <RelatedTools currentSlug="treat-roulette" />
        </div>
      )}
    </div>
  );
}
