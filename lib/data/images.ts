export type GalleryImage = {
  id: string;
  title: string;
  filename: string; // file placed in public/images/
  emoji: string;
  description: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "faiz-cockatoo-toy",
    title: "Faez & The Cockatoo Toy!",
    filename: "faiz-cockatoo-toy.jpg",
    emoji: "🧸",
    description: "Faez showing off his favourite cockatoo toy 🦜❤️",
  },
];
