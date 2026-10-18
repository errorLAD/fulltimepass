"use client";

import React, { useState } from "react";
import { Clapperboard, Sparkles } from "lucide-react";
import { getMainCharacterQuestions } from "@/lib/data/toolDataHelper";
import QuizRunner from "@/components/shared/QuizRunner";
import ResultCard from "@/components/shared/ResultCard";
import RelatedTools from "@/components/shared/RelatedTools";
import { ResultCardData, QuestionOption } from "@/lib/types";
import { getRandomItem } from "@/lib/utils";
import { useLanguage } from "@/lib/language/LanguageContext";

const MAIN_CHARACTER_DIAGNOSES_HI = {
  high: [
    {
      title: "Yash Raj Films Living Protagonist 💃🎬",
      desc: "Corridor walk slow-motion mein, hawa mein baal udte hue, aur shower lete waqt 2019 ke school argument ka savage monologue! Auto window se baarish dekhte waqt Arijit Singh ki voice mein sochna aapki daily activity hai.",
      punchline: "Director's Note: Camera off hai bhai, auto wala pichhle 10 minute se ₹40 ka fare maang raha hai!",
    },
    {
      title: "Bollywood Drama Emperor / Empress 👑",
      desc: "Hero/Heroine entry 100%, background score continuous, par audience mein sirf mummy aur ek confused colony ka kutta! Har stranger ki 2-second eye contact pe 3-season love story timeline draft kar lete ho.",
      punchline: "Film Award: Best dramatic pause while waiting for Maggi to boil!",
    },
  ],
  moderate: [
    {
      title: "Casual Main Character (Side Hero Energy) 🕶️",
      desc: "KGF wala attitude tabhi activate hota hai jab earphones pe favorite beats bajti hain. Jaise hi earphones nikaalo, wapas middle-class Indian citizen mode on!",
      punchline: "Director's Note: Thoda drama theek hai, par traffic signal pe slow-mo walk avoid karein.",
    },
  ],
  low: [
    {
      title: "Background Junior Artist (Grounded Realist) 🚶‍♂️",
      desc: "Aapko koi shauk nahi hai fake slow-motion ka! Metro mein chupchap kone mein earphone lagake normal insaan jaisa travel karte ho. Zero melodrama, maximum peace of mind.",
      punchline: "Aura Verdict: 100% Reality, 0% Karan Johar influence.",
    },
  ],
};

const MAIN_CHARACTER_DIAGNOSES_EN = {
  high: [
    {
      title: "Hollywood Living Protagonist 💃🎬",
      desc: "Slow-motion hallway strolls, imaginary camera zooms, and ferocious shower debates from 2017! Staring out the rainy bus window pretending to be in an indie film is your primary daily activity.",
      punchline: "Director's Note: The camera is off, and the bus driver wants you to tap your transit card!",
    },
    {
      title: "Cinematic Melodrama Royalty 👑",
      desc: "Main character entrance 100%, mental soundtrack continuous, but your only audience is your cat and a bewildered barista! A 2-second eye contact with a stranger sends you into a 3-season romantic arc.",
      punchline: "Oscar Category: Best dramatic pause while waiting for toast to pop!",
    },
  ],
  moderate: [
    {
      title: "Casual Main Character (Sidekick Energy) 🕶️",
      desc: "Action hero swagger activates only when your favorite bass drop hits the headphones. The second the earbuds come out, you immediately snap back to paying rent and eating cereal!",
      punchline: "Director's Note: A little cinematic flair is fine, just avoid dramatic slow-mo turns at grocery checkout.",
    },
  ],
  low: [
    {
      title: "Background Extra (Grounded Realist) 🚶‍♂️",
      desc: "Zero desire for theatrical slow-motion! You ride public transit peacefully in the corner minding your own business. Zero melodrama, maximum peace of mind.",
      punchline: "Aura Verdict: 100% Reality, 0% Cinematic delusions.",
    },
  ],
};

export default function MainCharacterSyndromePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [candidateName, setCandidateName] = useState("");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ResultCardData | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleQuizComplete = (
    answers: { questionId: string; selectedOption: QuestionOption }[]
  ) => {
    const totalScore = answers.reduce((acc, curr) => acc + curr.selectedOption.score, 0);
    const minScore = 30;
    const maxScore = 285;
    const syndromePercent = Math.min(Math.max(Math.round(((totalScore - minScore) / (maxScore - minScore)) * 100), 0), 99);

    const diagnoses = isEn ? MAIN_CHARACTER_DIAGNOSES_EN : MAIN_CHARACTER_DIAGNOSES_HI;
    let chosenDiag: any;
    if (syndromePercent >= 75) {
      chosenDiag = getRandomItem(diagnoses.high);
    } else if (syndromePercent >= 45) {
      chosenDiag = getRandomItem(diagnoses.moderate);
    } else {
      chosenDiag = getRandomItem(diagnoses.low);
    }

    const nameToDisplay = candidateName.trim() || (isEn ? "The Main Character" : "The Main Character");

    setResult({
      toolSlug: "main-character-syndrome",
      toolTitle: isEn ? "Main Character Syndrome 🎬" : "Main Character Syndrome 🎬",
      category: "Personality",
      userName: nameToDisplay,
      badgeTitle: chosenDiag.title,
      score: `${syndromePercent}%`,
      scoreLabel: isEn ? "Melodrama Quotient" : "Melodrama Quotient",
      subtitle: isEn ? "Official Cinematic Delusion Audit" : "Official Bollywood Delusion Audit",
      description: chosenDiag.desc,
      punchline: chosenDiag.punchline,
      metrics: [
        { label: isEn ? "Slow-Mo Swagger" : "Slow-Mo Walk", value: `${syndromePercent}% 🚶‍♂️` },
        { label: isEn ? "Imaginary Audience" : "Imaginary Audience", value: isEn ? "Entire Street 👀" : "Colony Street 👀" },
        { label: isEn ? "Shower Monologues" : "Shower Speech", value: isEn ? "Oscar Worthy 🏆" : "Oscar Winner 🏆" },
      ],
      bulletPoints: isEn
        ? [
            "Aura Assessment: 100% Cinematic Melodrama",
            "Internal Soundtrack: Dramatic acoustic score playing on loop",
            "Prescription: Stop staring dramatically into the rain!",
          ]
        : [
            "Aura Assessment: 100% Cinematic Melodrama",
            "Theme Song: Relentless sad acoustic violin playing in head",
            "Prescription: Stop staring dramatically into the rain!",
          ],
      disclaimer: isEn
        ? "Satirical Cinematic Psychology: 100% fictional fun. You are the star of your own life anyway!"
        : "Satirical Bollywood Psychology: 100% fictional fun. You are the star of your own life anyway!",
    });
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
  };

  const questions = getMainCharacterQuestions(language);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-3">
          <Clapperboard className="w-4 h-4 text-purple-600" />
          <span>FullTimePass • {isEn ? "Cinematic Delusion Unit" : "Bollywood Melodrama Unit"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {isEn ? "Main Character Syndrome 🎬" : "Main Character Syndrome 🎬"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {isEn
            ? "Do you rehearse victory speeches in the shower and imagine slow-motion walks in transit? Answer 3 quick questions for your Cinematic Delusion Audit!"
            : "Do you rehearse victory speeches in the shower and imagine slow-motion walks in auto? Answer 3 quick questions to calculate your official Bollywood Melodrama Quotient!"}
        </p>
      </div>

      {result ? (
        <>
          <ResultCard data={result} onReset={handleReset} />
          <RelatedTools currentSlug="main-character-syndrome" />
        </>
      ) : !started ? (
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleStart} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-900 mb-2.5">
                {isEn ? "Your Protagonist Name 🌟" : "Aapka Hero / Heroine Naam 🌟"}
              </label>
              <input
                type="text"
                placeholder={isEn ? "e.g. Neo, Elle Woods, Tony Stark, Katniss..." : "e.g. Kabir Singh, Simran, Poo, Anjali..."}
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                maxLength={40}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl text-base font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>{isEn ? "Start Melodrama Test (3 Questions) 🎬" : "Start Melodrama Test (3 Questions) 🎬"}</span>
            </button>
          </form>
          <RelatedTools currentSlug="main-character-syndrome" />
        </div>
      ) : (
        <QuizRunner
          questions={questions as any}
          toolTitle={isEn ? "Main Character Syndrome" : "Main Character Syndrome"}
          toolSlug="main-character-syndrome"
          accentColor="from-purple-500 via-pink-500 to-amber-500"
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
