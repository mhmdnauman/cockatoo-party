"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/",       label: "🏠 Home"  },
  { href: "/games",  label: "🎮 Games" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-amber-900/90 backdrop-blur-sm shadow-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/" className="text-amber-100 font-black text-lg tracking-tight">
        🦜 Cockatoo Party
      </Link>
      <div className="flex gap-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-bold transition-colors",
              pathname === l.href
                ? "bg-amber-400 text-amber-900"
                : "text-amber-200 hover:bg-amber-800"
            )}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
