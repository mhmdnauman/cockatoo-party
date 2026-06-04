"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EMOJIS = ["🦜", "🍞", "🌿", "🌻", "🪶", "🌳", "☀️", "🎉"];

type Card = { id: number; emoji: string; matched: boolean; flipped: boolean };

function buildDeck(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((emoji, i) => ({ id: i, emoji, matched: false, flipped: false }));
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const init = () => {
    setCards(buildDeck());
    setSelected([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  };

  useEffect(() => { init(); }, []);

  const flip = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;
    if (selected.length === 1 && selected[0] === id) return;

    const next = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    setCards(next);
    const newSel = [...selected, id];
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newSel.map((sid) => next.find((c) => c.id === sid)!);
      if (a.emoji === b.emoji) {
        const matched = next.map((c) => newSel.includes(c.id) ? { ...c, matched: true } : c);
        setCards(matched);
        setSelected([]);
        if (matched.every((c) => c.matched)) setWon(true);
      } else {
        setLocked(true);
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newSel.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6 text-center">
        <div className="bg-emerald-100 rounded-2xl px-6 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Moves</p>
          <p className="text-4xl font-black text-emerald-900">{moves}</p>
        </div>
        <div className="bg-teal-100 rounded-2xl px-6 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700">Matched</p>
          <p className="text-4xl font-black text-teal-900">{cards.filter((c) => c.matched).length / 2} / {EMOJIS.length}</p>
        </div>
      </div>

      {won && (
        <motion.div
          className="bg-emerald-400 text-white font-black text-xl px-8 py-4 rounded-2xl text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          🎉 You won in {moves} moves!
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-3 w-full max-w-md">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => flip(card.id)}
            className={cn(
              "aspect-square rounded-2xl text-4xl flex items-center justify-center font-bold shadow-md transition-colors border-2",
              card.matched
                ? "bg-emerald-200 border-emerald-400 cursor-default"
                : card.flipped
                  ? "bg-amber-100 border-amber-400"
                  : "bg-amber-800 border-amber-900 hover:bg-amber-700 cursor-pointer"
            )}
            whileTap={{ scale: 0.92 }}
            animate={{ rotateY: card.flipped || card.matched ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {card.flipped || card.matched ? card.emoji : ""}
          </motion.button>
        ))}
      </div>

      <button
        onClick={init}
        className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-black px-8 py-3 rounded-full text-sm transition-colors"
      >
        🔀 New Game
      </button>
    </div>
  );
}
