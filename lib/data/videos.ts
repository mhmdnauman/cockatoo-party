export type Video = {
  id: string;
  title: string;
  filename: string; // file placed in public/videos/
  emoji: string;
  description: string;
};

export const videos: Video[] = [
  {
    id: "this-cockatoo-handshakes",
    title: "This Cockatoo Handshakes!",
    filename: "this-cockatoo-handshakes.mp4",
    emoji: "🤝",
    description: "The friendliest cockatoo in the party — coming in for a handshake!",
  },
  {
    id: "cockatoo-runs-to-dad",
    title: "Cockatoo Runs To Dad When He Comes Home!",
    filename: "Cockatoo-Runs-To-Dad-When-He-Comes-Home.mp4",
    emoji: "🏠",
    description: "The most wholesome welcome home ever — this cockatoo can’t wait!",
  },
  {
    id: "facts-about-cockatoos",
    title: "Facts About Cockatoos!",
    filename: "facts-about-cockatoos.mp4",
    emoji: "🧠",
    description: "Did you know? Cool & fun facts about our favourite birds! 🦜",
  },
];
