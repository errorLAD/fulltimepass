"use client";

import React, { useState } from "react";
import { Clock, Sparkles, MessageCircle } from "lucide-react";
import { getReplyWaitTimes, getReplyMessageTypes } from "@/lib/data/toolDataHelper";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const SEEN_ZONE_PUNCHLINES_HI = [
  "Prescription: Phone ko flight mode pe daalo aur dimaag ko reality mode pe!",
  "Advice: Turant chat archive karo aur self-respect ka insurance claim karo!",
  "Harsh Truth: Unhone 14 reels like kar li, par tumhare '??' ka reply agle janam mein bhi nahi aane wala!",
  "Self-Respect Alert: Doosra text bhejoge toh UN Human Rights Commission me complaint darz hogi!",
];

const SEEN_ZONE_PUNCHLINES_EN = [
  "Prescription: Put your smartphone on airplane mode and your self-respect on reality mode!",
  "Advice: Archive the chat immediately and claim your emergency dignity insurance!",
  "Harsh Truth: They liked 14 Instagram memes in the past hour, but your text is growing cobwebs!",
  "Self-Respect Alert: Sending an unprompted double-text will be reported directly to international human rights!",
];

export default function ReplyKaBhikhariPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const waitTimes = getReplyWaitTimes(language);
  const messageTypes = getReplyMessageTypes(language);

  const [partnerName, setPartnerName] = useState("");
  const [selectedWaitTimeIndex, setSelectedWaitTimeIndex] = useState(2); // 8-12 hours default
  const [selectedMessageTypeIndex, setSelectedMessageTypeIndex] = useState(0);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const waitObj = waitTimes[selectedWaitTimeIndex] || waitTimes[0];
    const msgObj = messageTypes[selectedMessageTypeIndex] || messageTypes[0];

    const totalScore = Math.min(Math.round((waitObj.score + msgObj.score) / 2), 99);
    const target = partnerName.trim() || (isEn ? "Their Unresponsive Phone" : "Unka Phone");

    let title = isEn ? "Olympic Seen-Zone Martyr 🏅" : "Olympic Seen-Zone Martyr 🏅";
    let desc = isEn
      ? `It has been ${waitObj.time}! Their online status on social media is at 100% active attendance, but your '${msgObj.text}' message is gathering archaeological dust. Refreshing the chat window 45 times will not speed up their thumbs!`
      : `${waitObj.time} ho gaye hain bhai! Unki Instagram aur WhatsApp online status ki attendance 100% hai, par tumhare '${msgObj.text}' message pe dust collect ho rahi hai. Screen ko 45 baar refresh karne se reply fast nahi hota!`;

    if (totalScore >= 85) {
      title = isEn ? "Dignity in Freefall 📉" : "Dignity Minus Mein Chal Rahi Hai 📉";
      desc = isEn
        ? "Between double-texting, sending reels, and monitoring their online status, self-respect has left the premises. Even if their Wi-Fi shuts down, the reply isn't coming. High-grade digital desperation confirmed!"
        : "Double-texting karke, reels forward karke aur seen check karke tumne aukaat aur aadar dono sacrifice kar diya hai. Ab unka Wi-Fi band ho jaye tab bhi reply nahi aane wala! High-level digital begging confirmed.";
    } else if (totalScore <= 35) {
      title = isEn ? "Zen Patience Master (Safe Zone) 🧘" : "Patience Champion (Safe Zone) 🧘";
      desc = isEn
        ? "It hasn't been that long! Their phone is likely charging or they are genuinely engaged in human activities. Breathe normally, put the phone down, and avoid overthinking."
        : "Abhi zyada der nahi hui hai dost. Thoda wait kar lo, ya toh phone charging pe hai ya sach mein busy hain. Overthinking mat karo aur normal kaam pe focus karo.";
    }

    const punchlines = isEn ? SEEN_ZONE_PUNCHLINES_EN : SEEN_ZONE_PUNCHLINES_HI;
    const chosenPunchline = getRandomItem(punchlines);

    setResult({
      toolSlug: "reply-ka-bhikhari",
      toolTitle: isEn ? "Ghosting & Desperation Meter ⏳" : "Reply Ka Bhikhari Meter ⏳",
      category: "Relationships",
      targetName: `${isEn ? "Awaiting" : "Awaiting"}: ${target}`,
      badgeTitle: title,
      score: `${totalScore}%`,
      scoreLabel: isEn ? "Desperation Index" : "Bhikhari Quotient",
      subtitle: `${isEn ? "Waiting Duration" : "Waiting Duration"}: ${waitObj.time}`,
      description: desc,
      punchline: chosenPunchline,
      metrics: [
        { label: isEn ? "Activity Level" : "Online Attendance", value: isEn ? "100% Active 🟢" : "100% Active 🟢" },
        { label: isEn ? "Dignity Left" : "Self Respect Left", value: `${Math.max(100 - totalScore, 4)}% 💔` },
        { label: isEn ? "Reply Probability" : "Next Text Probability", value: totalScore > 80 ? "0.01% 💀" : "42% 🤞" },
      ],
      bulletPoints: [
        `${isEn ? "Last Message Tracked" : "Last Message Tracked"}: "${msgObj.text}"`,
        `${isEn ? "Wait Time Recorded" : "Wait Time Recorded"}: ${waitObj.label}`,
        isEn
          ? "Golden Rule: Sending a '??' double-text immediately nukes all remaining dignity!"
          : "Golden Rule: Ek message ke baad dusra question mark bhejte hi dignity zero ho jaati hai!",
      ],
      disclaimer: isEn
        ? "Satirical Waiting Audit: Pure comedy fun. Don't ruin actual relationships over delay jokes!"
        : "Satirical Waiting Audit: Pure comedy fun. Don't ruin actual relationships over delay jokes!",
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3">
          <Clock className="w-4 h-4 text-rose-600" />
          <span>FullTimePass • {isEn ? "Seen-Zone Emergency Unit" : "Seen-Zone Emergency Unit"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Ghosting & Desperation Meter ⏳" : "Reply Ka Bhikhari Meter ⏳"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Been 8 hours on delivered while they're actively posting stories online? Calculate your official Waiting Desperation Score & Dignity Status!"
            : "8 ghante ho gaye par reply nahi aaya jabki online dikh rahe hain? Calculate your official Reply Bhikhari score and dignity status!"}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="reply-ka-bhikhari" />
        </>
      ) : (
        <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
          {/* Target Name */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-2">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "Whose Reply Are You Waiting For? (Optional) 💬" : "Kiske Reply Ka Wait Kar Rahe Ho? (Optional) 💬"}
            </label>
            <input
              type="text"
              placeholder={isEn ? "e.g. Crush, Ex, Bestie, Hiring Manager, Landlord..." : "e.g. Crush, Ex, Bestie, HR Manager, Landlord..."}
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
              maxLength={40}
            />
          </div>

          {/* Wait Time */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "How Long Has Your Message Been Sitting? ⏱️" : "Kitni Der Se Message Laga Hua Hai? ⏱️"}
            </label>
            <div className="space-y-2.5">
              {waitTimes.map((wait, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedWaitTimeIndex(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedWaitTimeIndex === idx
                      ? "bg-rose-50 border-2 border-rose-500 text-rose-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold uppercase text-slate-900">{wait.time}</span>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{wait.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Type */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3.5">
            <label className="block text-sm sm:text-base font-bold text-slate-900">
              {isEn ? "What Was The Last Message You Sent? 📝" : "Aapne Last Message Kya Bheja Tha? 📝"}
            </label>
            <div className="space-y-2.5">
              {messageTypes.map((msg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedMessageTypeIndex(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedMessageTypeIndex === idx
                      ? "bg-amber-50 border-2 border-amber-500 text-amber-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-bold uppercase text-slate-900">{msg.type}</span>
                  <span className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">{msg.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <Clock className="w-5 h-5 text-white" />
              <span>{isEn ? "Calculate Desperation Score ⏳" : "Calculate Bhikhari Score ⏳"}</span>
            </button>
          </div>
          <RelatedTools currentSlug="reply-ka-bhikhari" />
        </form>
      )}
    </div>
  );
}
