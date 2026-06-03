"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getSecondsUntilFeeding(): number {
  const now = new Date();
  const aestOffset = 10 * 60;
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const aestMinutes = (utcMinutes + aestOffset) % (24 * 60);
  const feedingMinutes = 16 * 60 + 45;
  let diff = feedingMinutes - aestMinutes;
  if (diff < 0) diff += 24 * 60;
  return diff * 60 - now.getUTCSeconds();
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-amber-900 text-amber-50 text-3xl sm:text-4xl md:text-5xl font-black shadow-lg"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ perspective: 400 }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [secs, setSecs] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSecs(getSecondsUntilFeeding());
    const id = setInterval(() => setSecs(getSecondsUntilFeeding()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const isFeeding = secs === 0;

  return (
    <section className="relative py-16 sm:py-24 px-6 bg-gradient-to-b from-amber-100 to-orange-100 overflow-hidden">
      <div className="absolute left-2 bottom-0 opacity-10 text-[80px] sm:text-[120px] select-none">🦜</div>
      <div className="absolute right-2 bottom-0 opacity-10 text-[70px] sm:text-[100px] select-none">🦜</div>

      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-5xl font-black text-amber-900 mb-2">
          ⏰ Next Feeding In
        </h2>
        <p className="text-amber-700 mb-8 sm:mb-10 text-base sm:text-lg">
          4:45 PM Australian Time — daily bread drop! 🍞
        </p>

        {isFeeding ? (
          <motion.div
            className="text-3xl sm:text-5xl font-black text-orange-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🎉 IT&apos;S FEEDING TIME! 🦜🦜🦜
          </motion.div>
        ) : (
          <div className="flex items-start justify-center gap-2 sm:gap-4">
            {mounted && <FlipUnit value={pad(h)} label="hours" />}
            <span className="text-3xl sm:text-5xl font-black text-amber-800 mt-3 sm:mt-4">:</span>
            {mounted && <FlipUnit value={pad(m)} label="mins" />}
            <span className="text-3xl sm:text-5xl font-black text-amber-800 mt-3 sm:mt-4">:</span>
            {mounted && <FlipUnit value={pad(s)} label="secs" />}
          </div>
        )}

        <motion.p
          className="mt-6 sm:mt-8 text-amber-600 font-semibold text-base sm:text-lg"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌿 Get the bread ready, Faez! 🌿
        </motion.p>
      </motion.div>
    </section>
  );
}
