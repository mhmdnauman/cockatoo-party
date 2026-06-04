import { notFound } from "next/navigation";
import { games } from "@/lib/data/games";
import CatchTheBread from "@/components/games/CatchTheBread";
import MemoryMatch from "@/components/games/MemoryMatch";
import SquawkQuiz from "@/components/games/SquawkQuiz";
import CockatooClicker from "@/components/games/CockatooClicker";
import DodgeTheFeathers from "@/components/games/DodgeTheFeathers";
import FeedTheFlock from "@/components/games/FeedTheFlock";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  return { title: game?.title ?? "Game" };
}

const GAME_MAP: Record<string, React.ComponentType> = {
  "catch-the-bread":   CatchTheBread,
  "memory-match":      MemoryMatch,
  "squawk-quiz":       SquawkQuiz,
  "cockatoo-clicker":  CockatooClicker,
  "dodge-the-feathers": DodgeTheFeathers,
  "feed-the-flock":    FeedTheFlock,
};

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  const GameComponent = GAME_MAP[slug];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-orange-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm mb-8 hover:text-amber-600 transition-colors"
        >
          ← Back to Games
        </Link>

        {/* Game header */}
        <div className="text-center mb-8">
          <p className="text-6xl mb-2">{game.emoji}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-amber-900">{game.title}</h1>
          <p className="text-amber-700 mt-2">{game.description}</p>
        </div>

        {/* Game canvas */}
        <GameComponent />
      </div>
    </main>
  );
}
