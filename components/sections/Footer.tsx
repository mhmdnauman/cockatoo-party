"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-10 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-5 text-[160px] flex items-center justify-center">
        🦜
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <p className="text-3xl font-black mb-1">🦜 Cockatoo Party</p>
        <p className="text-amber-300 font-semibold">
          Every day at 4:45 PM Australian Time
        </p>
        <p className="mt-4 text-amber-400 text-sm">
          Made with 🍞 and ❤️ for Faez
        </p>
      </motion.div>
    </footer>
  );
}
