export type Game = {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: "Easy" | "Medium" | "Hard";
  color: string; // tailwind bg class
};

export const games: Game[] = [
  {
    slug: "catch-the-bread",
    title: "Catch the Bread",
    description: "Bread is falling from the sky! Tap or click to catch it before the cockatoos do.",
    emoji: "🍞",
    difficulty: "Easy",
    color: "from-amber-300 to-orange-400",
  },
  {
    slug: "memory-match",
    title: "Cockatoo Memory",
    description: "Flip the cards and match the cockatoo pairs. How fast can you find them all?",
    emoji: "🃏",
    difficulty: "Medium",
    color: "from-emerald-300 to-teal-400",
  },
  {
    slug: "squawk-quiz",
    title: "Squawk Quiz",
    description: "How well do you know cockatoos? Answer 5 fun questions and find out!",
    emoji: "❓",
    difficulty: "Hard",
    color: "from-purple-300 to-pink-400",
  },
  {
    slug: "cockatoo-clicker",
    title: "Cockatoo Clicker",
    description: "Click the cockatoo to collect seeds! Buy upgrades and grow your flock.",
    emoji: "🌻",
    difficulty: "Easy",
    color: "from-yellow-300 to-amber-400",
  },
  {
    slug: "dodge-the-feathers",
    title: "Dodge the Feathers",
    description: "Steer your cockatoo left and right to dodge the falling feathers. How long can you last?",
    emoji: "🪶",
    difficulty: "Medium",
    color: "from-sky-300 to-blue-400",
  },
  {
    slug: "feed-the-flock",
    title: "Feed the Flock",
    description: "Cockatoos are flying past! Tap them to toss bread before they escape.",
    emoji: "🦜",
    difficulty: "Hard",
    color: "from-rose-300 to-pink-500",
  },
];
