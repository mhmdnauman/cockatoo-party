"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Game } from "@/lib/data/games";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy:   "bg-emerald-500 text-white",
  Medium: "bg-amber-500 text-white",
  Hard:   "bg-red-500 text-white",
};

export default function GamesGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {games.map((game, i) => (
        <motion.div
          key={game.slug}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.1 }}
          whileHover={{ y: -8, scale: 1.03 }}
        >
          <Link href={`/games/${game.slug}`} className="block h-full">
            <div className={`relative h-full rounded-3xl bg-gradient-to-br ${game.color} p-1 shadow-xl`}>
              <div className="h-full bg-white/20 backdrop-blur-sm rounded-[20px] p-7 flex flex-col gap-4">
                {/* Emoji */}
                <motion.span
                  className="text-6xl"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                >
                  {game.emoji}
                </motion.span>

                {/* Title + difficulty */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-2xl font-black text-white leading-tight">{game.title}</h2>
                  <span className={`shrink-0 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${DIFFICULTY_COLOR[game.difficulty]}`}>
                    {game.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/90 text-sm leading-relaxed flex-1">{game.description}</p>

                {/* CTA */}
                <div className="mt-2 inline-flex items-center gap-2 bg-white/30 hover:bg-white/50 transition-colors text-white font-black text-sm px-5 py-2.5 rounded-full w-fit">
                  Play Now →
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
