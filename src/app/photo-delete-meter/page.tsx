"use client";

import React, { useState } from "react";
import { Camera, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import { getPhotoFlaws } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const PHOTO_PUNCHLINES_HI = [
  "Google Photos Obituary: Google Cloud storage sent a legal notice asking you to stop clicking 40 burst photos of a chai cup!",
  "Instagram Reality: Dost ne 45 second pose banaye, aur tumne 0.2 second mein 'Delete All' dabaya!",
  "Advice: Jo photo hai wahi upload kardo dost, koi zoom karke pixel inspection nahi karne wala!",
  "Vanity Warning: 128 GB phone storage mein 110 GB sirf same smile ki duplicate photos hain!",
];

const PHOTO_PUNCHLINES_EN = [
  "Cloud Storage Notice: Your cloud drive sent a notification asking you to stop clicking 40 burst photos of a cappuccino!",
  "Social Media Reality: Your friend held awkward poses for 45 seconds, and you tapped 'Delete All' in 0.2 seconds!",
  "Advice: Just post the photo; nobody is performing forensic pixel audits on your casual vacation selfies!",
  "Vanity Warning: Out of 128 GB of phone storage, 110 GB consists exclusively of duplicate photos with the exact same smile!",
];

export default function PhotoDeleteMeterPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const flaws = getPhotoFlaws(language);

  const [userName, setUserName] = useState("");
  const [takenCount, setTakenCount] = useState("237");
  const [uploadedCount, setUploadedCount] = useState("0");
  const [selectedFlaws, setSelectedFlaws] = useState<string[]>([
    "double_chin",
    "bad_light",
  ]);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const toggleFlaw = (id: string) => {
    if (selectedFlaws.includes(id)) {
      setSelectedFlaws(selectedFlaws.filter((f) => f !== id));
    } else {
      setSelectedFlaws([...selectedFlaws, id]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const taken = Math.max(parseInt(takenCount) || 1, 1);
    const rawUploaded = Math.max(parseInt(uploadedCount) || 0, 0);
    const uploaded = Math.min(rawUploaded, taken);
    const deleted = taken - uploaded;
    const uploadPercentage = Math.round((uploaded / taken) * 100);

    const name = userName.trim() || (isEn ? "The Photo Perfectionist" : "The Photo Perfectionist");

    let title = isEn ? "Chief Angle Officer (Purge Specialist) 📸" : "Chief Angle Officer (Delete Specialist) 📸";
    let desc = isEn
      ? `Captured ${taken} photos, experimented with 6 filters, adjusted the lighting, and how many were shared? Exactly ${uploaded} (${uploadPercentage}%)! Your phone's flash storage is crying in the corner.`
      : `${taken} photos click kiye, alag filters try kiye, lighting adjust ki, aur post kitne hue? Exactly ${uploaded} (${uploadPercentage}%)! Phone ki storage kone mein baith ke ro rahi hai.`;

    if (uploadPercentage === 0) {
      title = isEn ? "Zero Post Syndrome (Storage Assassin) 🪦" : "Zero Post Syndrome (Storage Qatil) 🪦";
      desc = isEn
        ? `Even after capturing ${taken} photos, self-doubt remains at 100%! Claiming 'the angle was unflattering', you threw the entire camera roll directly into the trash folder. 0% upload success rate!`
        : `${taken} photos lene ke baad bhi self-doubt 100%! 'Double chin dikh rahi hai' bolke pura camera roll trash folder mein phenk diya. 0% upload success rate!`;
    } else if (uploadPercentage >= 50) {
      title = isEn ? "One-Take Confident Superstar 👑" : "One-Take Confident Superstar 👑";
      desc = isEn
        ? `Photogenic legend! Out of ${taken} photos, you uploaded ${uploaded} (${uploadPercentage}% efficiency). Zero hesitation, pure camera confidence!`
        : `Photogenic legend! ${taken} photos mein se ${uploaded} upload kar diye (${uploadPercentage}% efficiency). Zero hesitation, pure camera confidence!`;
    }

    const punchlines = isEn ? PHOTO_PUNCHLINES_EN : PHOTO_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    setResult({
      toolSlug: "photo-delete-meter",
      toolTitle: isEn ? "Camera Roll Purge Meter 📸" : "Photo Kheench, Delete Kar 📸",
      category: "Random Fun",
      userName: name,
      badgeTitle: title,
      score: `${uploadPercentage}%`,
      scoreLabel: isEn ? "Actual Upload Percentage" : "Actual Upload Percentage",
      subtitle: `${taken} ${isEn ? "Photos Taken" : "Photos Taken"} → ${uploaded} ${isEn ? "Uploaded" : "Uploaded"} (${uploadPercentage}% ${isEn ? "Kept" : "Kept"})`,
      description: desc,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "Photos Taken" : "Photos Taken", value: `${taken} 📷` },
        { label: isEn ? "Photos Uploaded" : "Photos Posted", value: `${uploaded} 📤` },
        { label: isEn ? "Upload Efficiency" : "Upload Efficiency", value: `${uploadPercentage}% 🎯` },
      ],
      bulletPoints: [
        `${isEn ? "Upload Ratio" : "Upload Ratio"}: ${uploaded}/${taken} (${uploadPercentage}%)`,
        `${isEn ? "Primary Reason" : "Primary Reason"}: ${selectedFlaws.length > 0 ? selectedFlaws[0].replace("_", " ") : (isEn ? "Self Doubt" : "Self Doubt")}`,
        `${isEn ? "Storage Reclaimed" : "Storage Reclaimed"}: ${(deleted * 3.5).toFixed(0)} MB wasted on discarded bursts`,
      ],
      disclaimer: isEn
        ? "Satirical Vanity Audit: 100% fictional comedy. Pour one out for your smartphone storage!"
        : "Satirical Vanity Audit: 100% fictional comedy. Phone storage ka shok manaiye!",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-850 text-xs font-bold mb-3 shadow-xs">
          <Camera className="w-4 h-4 text-cyan-600" />
          <span>FullTimePass • {isEn ? "Selfie Waste Audit" : "Selfie Waste Audit"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Camera Roll Purge Meter 📸" : "Photo Kheench, Delete Kar 📸"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "237 photos taken, 4 filters applied, 0 uploaded! Calculate your official selfie-to-upload failure quotient."
            : "237 photos taken, 4 filters applied, 0 uploaded! Calculate your official selfie-to-upload failure quotient."}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="photo-delete-meter" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* User Name */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Your Name 👤" : "Aapka Naam 👤"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Angle Master, Selfie Star, Jordan, Taylor..." : "e.g. Angle Queen, Selfie Raja, Pooja, Bunty..."}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Counts */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                  {isEn ? "Photos Taken in One Outing? 🤳" : "Ek Outing Mein Kitni Photos Li? 🤳"}
                </label>
                <input
                  type="number"
                  value={takenCount}
                  onChange={(e) => setTakenCount(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                  min={1}
                  max={5000}
                  required
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2">
                  {isEn ? "Photos Actually Uploaded Online? 📤" : "Instagram / WhatsApp Pe Upload Kitni Hui? 📤"}
                </label>
                <input
                  type="number"
                  value={uploadedCount}
                  onChange={(e) => setUploadedCount(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                  min={0}
                  max={5000}
                  required
                />
              </div>
            </div>
          </div>

          {/* Flaws Observed */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Primary Reasons for Hitting Delete (Pick Flaws) 🧐" : "Photo Delete Karne Ka Main Bahana (Pick Flaws) 🧐"}
            </label>
            <div className="space-y-2.5">
              {flaws.map((flaw) => {
                const isSelected = selectedFlaws.includes(flaw.id);
                return (
                  <button
                    key={flaw.id}
                    type="button"
                    onClick={() => toggleFlaw(flaw.id)}
                    className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-50 text-cyan-900 border-2 border-cyan-500 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {flaw.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <Camera className="w-5 h-5 stroke-[2.5]" />
              <span>{isEn ? "Calculate Photo Purge Ratio 📸" : "Calculate Selfie Deletion Ratio 📸"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="photo-delete-meter" />
        </form>
      )}
    </div>
  );
}
