"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/",       label: "Home",   emoji: "🏠" },
  { href: "/games",  label: "Games",  emoji: "🎮" },
  { href: "/videos", label: "Videos", emoji: "🎥" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-amber-900/90 backdrop-blur-sm shadow-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/" className="text-amber-100 font-black text-lg tracking-tight shrink-0">
        <span >🦜</span>
        <span className="sm:inline">Cockatoo Party</span>
      </Link>
      <div className="flex gap-1 sm:gap-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap",
              pathname === l.href
                ? "bg-amber-400 text-amber-900"
                : "text-amber-200 hover:bg-amber-800"
            )}
          >
            <span className="sm:hidden">{l.emoji}</span>
            <span className="hidden sm:inline">{l.emoji} {l.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
