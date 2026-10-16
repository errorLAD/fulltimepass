"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
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
  accentColor = "from-funky-yellow to-funky-pink",
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
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Funky Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
          <span className="funky-tape text-[10px]">
            {toolTitle}
          </span>
          <span className="text-funky-yellow font-black px-2 py-0.5 bg-black border border-slate-800 rounded">
            Question {currentIndex + 1} / {questions.length} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-900 border-2 border-black overflow-hidden shadow-brutal">
          <div
            className={`h-full bg-gradient-to-r ${accentColor} transition-all duration-300 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Animated Comic Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 bg-slate-950 border-4 border-black shadow-brutal-lg"
        >
          {/* Question Text */}
          <div className="mb-6">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-black bg-funky-neonGreen border border-black px-2 py-0.5 rounded shadow-brutal mb-2">
              DILEMMA #{currentIndex + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.hint && (
              <p className="text-xs text-funky-yellow font-bold mt-2 flex items-center gap-1.5 italic">
                <Sparkles className="w-3.5 h-3.5 text-funky-yellow shrink-0 fill-funky-yellow" />
                <span>{currentQ.hint}</span>
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption?.text === option.text;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 rounded-2xl border-3 transition-all duration-150 flex items-start justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-funky-yellow border-black text-black shadow-brutal translate-x-[-2px] translate-y-[-2px]"
                      : "bg-slate-900/90 border-black hover:border-funky-yellow text-white hover:bg-slate-900 shadow-brutal"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border-2 border-black ${
                        isSelected
                          ? "bg-black text-funky-yellow"
                          : "bg-black text-white"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-black leading-snug">
                        {option.text}
                      </p>
                      {option.subtext && (
                        <p className={`text-xs mt-0.5 font-bold ${isSelected ? "text-black/80" : "text-slate-400"}`}>
                          {option.subtext}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 mt-0.5">
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-black fill-black" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-700 bg-slate-950" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-slate-800">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedOption}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-funky-yellow hover:bg-yellow-300 border-3 border-black shadow-brutal active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>
                {currentIndex + 1 === questions.length ? "Reveal Result 🎉" : "Next Dilemma"}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
