"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { QuizQuestion, QuestionOption } from "@/lib/types";

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
  accentColor = "from-orange-500 to-pink-500",
}: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedOption: QuestionOption }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(null);

  const currentQ = questions[currentIndex];
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
      // check if next question already answered
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar & Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span className="uppercase tracking-wider text-orange-400">
            {toolTitle}
          </span>
          <span>
            Question {currentIndex + 1} of {questions.length} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${accentColor} transition-all duration-300 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Animated Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-2 border-slate-800 shadow-xl backdrop-blur-md"
        >
          {/* Question Text */}
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Scenario #{currentIndex + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.hint && (
              <p className="text-xs text-amber-400/90 font-medium mt-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentQ.hint}</span>
              </p>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption?.text === option.text;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start justify-between gap-4 ${
                    isSelected
                      ? "bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-500/10 scale-[1.01]"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-orange-500 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-semibold leading-relaxed">
                        {option.text}
                      </p>
                      {option.subtext && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {option.subtext}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 mt-0.5">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-orange-400 fill-orange-400/20" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-700" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedOption}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-desi-pop hover:shadow-desi-pop-hover active:translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>
                {currentIndex + 1 === questions.length ? "Reveal Result 🎉" : "Next Question"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
