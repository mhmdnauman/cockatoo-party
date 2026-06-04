import type { Metadata } from "next";
import Link from "next/link";
import { games } from "@/lib/data/games";
import GamesGrid from "@/components/games/GamesGrid";

export const metadata: Metadata = {
  title: "Games",
  description: "Play fun cockatoo-themed games!",
};

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-orange-100 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl font-black text-amber-900 mb-3">
            🎮 Cockatoo Games
          </h1>
          <p className="text-amber-700 text-lg font-medium">
            Pick a game and start playing, Faez! 🦜
          </p>
        </div>
        <GamesGrid games={games} />
      </div>
    </main>
  );
}
