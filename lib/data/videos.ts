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
];
