import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Cockatoo Party — Faez's Daily Feeding Fiesta",
    template: "%s | Cockatoo Party",
  },
  description:
    "Every day at 4:45 PM Australian time, Faez feeds the cockatoos. Join the party! 🍞🦜",
  keywords: ["cockatoo", "cockatoo party", "Faez", "bird feeding", "Australia"],
  authors: [{ name: "Faez" }],
  creator: "Faez",

  // Open Graph
  openGraph: {
    title: "🦜 Cockatoo Party — Faez's Daily Feeding Fiesta",
    description:
      "Every day at 4:45 PM Australian time, Faez feeds the cockatoos. Join the party! 🍞🦜",
    url: "https://cockatoo-party.vercel.app",
    siteName: "Cockatoo Party",
    locale: "en_AU",
    type: "website",
  },

  // Twitter / X card
  twitter: {
    card: "summary",
    title: "🦜 Cockatoo Party",
    description: "Faez's daily cockatoo feeding at 4:45 PM Australian time 🍞",
  },

  // PWA / browser chrome
  themeColor: "#f97316",
  colorScheme: "light",

  // Robots
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
