"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    q: "What do sulphur-crested cockatoos eat?",
    options: ["Seeds & nuts", "Raw meat", "Fish", "Insects only"],
    answer: 0,
  },
  {
    q: "What colour is the crest of a sulphur-crested cockatoo?",
    options: ["Red", "Blue", "Yellow", "Green"],
    answer: 2,
  },
  {
    q: "How long can cockatoos live in the wild?",
    options: ["5 years", "20–40 years", "70+ years", "2 years"],
    answer: 1,
  },
  {
    q: "What sound does a cockatoo make when it's happy?",
    options: ["Growling", "Soft chattering", "Loud screech", "Whistling"],
    answer: 3,
  },
  {
    q: "Cockatoos are native to which country?",
    options: ["Brazil", "Canada", "Australia", "Japan"],
    answer: 2,
  },
];

export default function SquawkQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const pick = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUESTIONS[current].answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setChosen(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setChosen(null);
    setDone(false);
  };

  const q = QUESTIONS[current];

  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
      {/* Progress */}
      <div className="w-full bg-amber-200 rounded-full h-3">
        <motion.div
          className="h-3 rounded-full bg-amber-500"
          animate={{ width: `${((current + (chosen !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="text-amber-700 text-sm font-bold">
        Question {Math.min(current + 1, QUESTIONS.length)} of {QUESTIONS.length}
      </p>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            className="text-center flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260 }}
          >
            <p className="text-7xl">{score >= 4 ? "🏆" : score >= 2 ? "🦜" : "😅"}</p>
            <h2 className="text-4xl font-black text-amber-900">
              {score} / {QUESTIONS.length}
            </h2>
            <p className="text-amber-700 text-lg font-semibold">
              {score === QUESTIONS.length
                ? "Perfect score! You're a cockatoo expert! 🎉"
                : score >= 3
                  ? "Great job! Faez would be proud! 🦜"
                  : "Keep learning about cockatoos! 📚"}
            </p>
            <button
              onClick={restart}
              className="mt-2 bg-purple-500 hover:bg-purple-400 text-white font-black px-8 py-3 rounded-full text-lg transition-colors"
            >
              Try Again 🔁
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={current}
            className="w-full flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/80 rounded-3xl p-6 shadow-md">
              <p className="text-xl sm:text-2xl font-black text-amber-900 leading-snug">{q.q}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.answer;
                const isPicked = chosen === i;
                const revealed = chosen !== null;

                return (
                  <motion.button
                    key={i}
                    onClick={() => pick(i)}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      "w-full px-5 py-4 rounded-2xl font-bold text-left text-sm sm:text-base transition-colors border-2",
                      !revealed
                        ? "bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-amber-900"
                        : isCorrect
                          ? "bg-emerald-400 border-emerald-500 text-white"
                          : isPicked
                            ? "bg-red-400 border-red-500 text-white"
                            : "bg-white/50 border-amber-100 text-amber-400"
                    )}
                  >
                    {revealed && isCorrect && "✅ "}
                    {revealed && isPicked && !isCorrect && "❌ "}
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {chosen !== null && (
              <motion.button
                onClick={next}
                className="self-center bg-purple-500 hover:bg-purple-400 text-white font-black px-8 py-3 rounded-full transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {current + 1 < QUESTIONS.length ? "Next Question →" : "See Results 🏆"}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
