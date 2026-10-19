"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { QuizQuestion, QuestionOption } from "@/lib/types";
import { useLanguage } from "@/lib/language/LanguageContext";
import QuestionAudioButton from "@/components/audio/QuestionAudioButton";

interface QuizRunnerProps {
  questions: QuizQuestion[];
  toolTitle: string;
  toolSlug: string;
  onComplete: (answers: { questionId: string; selectedOption: QuestionOption }[]) => void;
  accentColor?: string;
}

export default function QuizRunner({
  questions,
  toolTitle,
  toolSlug,
  onComplete,
  accentColor = "from-funky-yellow to-funky-pink",
}: QuizRunnerProps) {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedOption: QuestionOption }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(null);

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (option: QuestionOption) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQ.id),
      { questionId: currentQ.id, selectedOption },
    ];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      const nextAnswer = newAnswers.find(
        (a) => a.questionId === questions[currentIndex + 1].id
      );
      setSelectedOption(nextAnswer ? nextAnswer.selectedOption : null);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevAnswer = answers.find(
        (a) => a.questionId === questions[prevIdx].id
      );
      setSelectedOption(prevAnswer ? prevAnswer.selectedOption : null);
    }
  };

  const nextLabel =
    currentIndex + 1 === questions.length
      ? language === "en"
        ? "Reveal Result 🎉"
        : "Asli Result Dekho 🎯"
      : language === "en"
      ? "Next Question"
      : "Agla Sawaal";

  const dilemmaLabel =
    language === "en"
      ? `Question #${currentIndex + 1}`
      : `Dilemma #${currentIndex + 1}`;

  const backLabel = language === "en" ? "Back" : "Peechhe";

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-amber-700 font-bold uppercase tracking-wider text-[11px]">
            {toolTitle}
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            {t("quiz.question", "Question")} {currentIndex + 1} {t("quiz.of", "of")} {questions.length} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Animated Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl p-4 sm:p-8 bg-white border border-slate-200 shadow-xl"
        >
          {/* Question Text */}
          <div className="mb-7">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full">
                {dilemmaLabel}
              </span>
              <QuestionAudioButton
                questionText={currentQ.question}
                options={currentQ.options}
                questionIndex={currentIndex}
                language={language}
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug tracking-tight">
              {currentQ.question}
            </h2>
            {currentQ.hint && (
              <p className="text-sm text-amber-800 font-medium mt-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 fill-amber-500" />
                <span>{currentQ.hint}</span>
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3.5 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption?.text === option.text;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-3.5 sm:p-5 min-h-[52px] rounded-2xl border transition-all duration-150 flex items-start justify-between gap-3 sm:gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 border-amber-500 text-slate-950 font-bold shadow-md"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected
                          ? "bg-slate-950 text-amber-400 border-slate-950"
                          : "bg-white text-slate-700 border-slate-300 shadow-xs"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <p className="text-base sm:text-lg font-semibold leading-relaxed">
                        {option.text}
                      </p>
                      {option.subtext && (
                        <p className={`text-sm mt-1 leading-relaxed ${isSelected ? "text-slate-950/80 font-medium" : "text-slate-500 font-normal"}`}>
                          {option.subtext}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 mt-1">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-slate-950 fill-slate-950" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backLabel}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedOption}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{nextLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
