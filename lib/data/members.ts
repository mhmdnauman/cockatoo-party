export type Member = {
  id: string;
  name: string;
  role: string;
  emoji: string;
  isBoss: boolean;
};

export const members: Member[] = [
  { id: "1", name: "Faez", role: "Party Commander", emoji: "👑", isBoss: true },
  { id: "2", name: "Maryam Afridi", role: "Head of Seeds", emoji: "🌟", isBoss: true },
  { id: "3", name: "Ohana", role: "Official Greeter", emoji: "🎉", isBoss: false },
  { id: "4", name: "Yousof Ahmed", role: "Bread Inspector", emoji: "🍞", isBoss: false },
  { id: "5", name: "M.Nauman", role: "Chief Noise Officer", emoji: "📣", isBoss: true },
  { id: "6", name: "Ehan Ahmed", role: "Dance Captain", emoji: "🕺", isBoss: false },
  { id: "7", name: "Lucas", role: "Snack Wrangler", emoji: "🌻", isBoss: false },
  { id: "8", name: "Mila", role: "Feather Collector", emoji: "🪶", isBoss: false },
  { id: "9", name: "Jeremy", role: "Head Squawker", emoji: "📢", isBoss: false },
];
