"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Bread = { id: number; x: number; y: number; speed: number };

const W = 600;
const H = 420;
const BREAD_SIZE = 48;
const MAX_MISSES = 3;

export default function CatchTheBread() {
  const [breads, setBreads] = useState<Bread[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const nextId = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAll = useCallback(() => {
    if (tickRef.current)  clearInterval(tickRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  }, []);

  const start = useCallback(() => {
    setBreads([]);
    setScore(0);
    setMisses(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running) return;

    // Spawn bread every 1.2s
    spawnRef.current = setInterval(() => {
      const speed = 2 + Math.random() * 2.5;
      setBreads((b) => [
        ...b,
        { id: nextId.current++, x: Math.random() * (W - BREAD_SIZE), y: -BREAD_SIZE, speed },
      ]);
    }, 1200);

    // Tick: move bread down
    tickRef.current = setInterval(() => {
      setBreads((prev) => {
        const next: Bread[] = [];
        let newMisses = 0;
        for (const b of prev) {
          if (b.y > H) { newMisses++; }
          else next.push({ ...b, y: b.y + b.speed });
        }
        if (newMisses > 0) {
          setMisses((m) => {
            const total = m + newMisses;
            if (total >= MAX_MISSES) {
              setRunning(false);
              setGameOver(true);
            }
            return total;
          });
        }
        return next;
      });
    }, 16);

    return stopAll;
  }, [running, stopAll]);

  const catchBread = (id: number) => {
    setBreads((b) => b.filter((br) => br.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scoreboard */}
      <div className="flex gap-8 text-center">
        <div className="bg-amber-100 rounded-2xl px-6 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Score</p>
          <p className="text-4xl font-black text-amber-900">{score}</p>
        </div>
        <div className="bg-red-100 rounded-2xl px-6 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-red-700">Misses</p>
          <p className="text-4xl font-black text-red-600">{misses} / {MAX_MISSES}</p>
        </div>
      </div>

      {/* Game area */}
      <div
        className="relative rounded-3xl overflow-hidden border-4 border-amber-300 bg-gradient-to-b from-sky-200 to-amber-100 cursor-pointer select-none"
        style={{ width: "min(100%, 600px)", aspectRatio: "600/420" }}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-emerald-600 opacity-60 rounded-b-3xl" />

        {/* Falling bread */}
        <AnimatePresence>
          {breads.map((b) => (
            <motion.div
              key={b.id}
              className="absolute text-4xl cursor-pointer z-10"
              style={{ left: `${(b.x / W) * 100}%`, top: `${(b.y / H) * 100}%` }}
              initial={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => catchBread(b.id)}
              title="Catch!"
            >
              🍞
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Overlay: start / game over */}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20 rounded-3xl gap-4">
            {gameOver ? (
              <>
                <p className="text-6xl">😢</p>
                <p className="text-3xl font-black text-white">Game Over!</p>
                <p className="text-white font-semibold">You caught <span className="text-amber-300 font-black">{score}</span> breads</p>
              </>
            ) : (
              <>
                <p className="text-6xl animate-bounce">🍞</p>
                <p className="text-2xl font-black text-white">Catch the falling bread!</p>
                <p className="text-white/80 text-sm">Don&apos;t let {MAX_MISSES} pieces hit the ground</p>
              </>
            )}
            <button
              onClick={start}
              className="mt-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-black text-lg px-8 py-3 rounded-full transition-colors"
            >
              {gameOver ? "Play Again 🎮" : "Start Game 🎮"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
