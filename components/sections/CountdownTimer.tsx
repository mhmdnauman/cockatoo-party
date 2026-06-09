"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getSecondsUntilFeeding(): { secs: number; isTuesday: boolean } {
  const now = new Date();

  // Get current date parts in Sydney time
  const sydneyParts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
    weekday: "long",
  }).formatToParts(now);

  const p = (type: string) => sydneyParts.find((x) => x.type === type)?.value ?? "0";
  const weekday = sydneyParts.find((x) => x.type === "weekday")?.value ?? "";
  const isTuesday = weekday === "Tuesday";

  // Build a Date representing today's 4:45 PM Sydney time
  // Use Date.UTC trick: construct an ISO string from Sydney date parts
  const year  = parseInt(p("year"));
  const month = parseInt(p("month")) - 1; // 0-indexed
  const day   = parseInt(p("day"));

  // "Australia/Sydney" 16:45:00 — find the UTC ms for that moment
  // We do this by constructing the Sydney midnight in UTC then adding offset
  // Simplest: use Intl to find UTC offset by comparing parsed local time vs UTC
  const sydneyHour = parseInt(p("hour"));
  const sydneyMin  = parseInt(p("minute"));
  const sydneySec  = parseInt(p("second"));

  // UTC offset in seconds = (sydneyTime - utcTime)
  const sydneyTotalSec = sydneyHour * 3600 + sydneyMin * 60 + sydneySec;
  const utcTotalSec    = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
  // Handle day boundary wrap
  let offsetSec = sydneyTotalSec - utcTotalSec;
  if (offsetSec > 14 * 3600)  offsetSec -= 24 * 3600;
  if (offsetSec < -14 * 3600) offsetSec += 24 * 3600;

  // Build Sydney midnight as UTC ms
  const sydneyMidnightUTC = Date.UTC(year, month, day) - offsetSec * 1000;
  const feedingUTC = sydneyMidnightUTC + (16 * 3600 + 45 * 60) * 1000;

  let diff = feedingUTC - now.getTime();

  // If feeding already passed today, move to next day
  if (diff <= 0) diff += 24 * 3600 * 1000;

  // If that next feeding lands on a Tuesday (in Sydney), skip to Wednesday
  const nextFeedingDate = new Date(now.getTime() + diff);
  const nextWeekday = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "long",
  }).format(nextFeedingDate);
  if (nextWeekday === "Tuesday") diff += 24 * 3600 * 1000;

  return { secs: Math.round(diff / 1000), isTuesday };
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
  const [isTuesday, setIsTuesday] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const { secs, isTuesday } = getSecondsUntilFeeding();
      setSecs(secs);
      setIsTuesday(isTuesday);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const isFeeding = mounted && secs === 0;

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
          <span className="block text-sm text-amber-500 font-bold mt-1">(no Tuesdays 🙅 birds need rest too!)</span>
        </p>

        {isTuesday && mounted ? (
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ rotate: [0, -10, 10, -10, 0], y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              😴
            </motion.div>
            <p className="text-2xl sm:text-3xl font-black text-amber-800">
              It&apos;s Tuesday — Day Off! 🦜
            </p>
            <p className="text-amber-600 font-semibold text-base sm:text-lg">
              The cockatoos are chilling today. See you Wednesday! 🌿
            </p>
            <div className="flex items-start justify-center gap-2 sm:gap-4 mt-4 opacity-50">
              {mounted && <FlipUnit value={pad(h)} label="hours" />}
              <span className="text-3xl sm:text-5xl font-black text-amber-800 mt-3 sm:mt-4">:</span>
              {mounted && <FlipUnit value={pad(m)} label="mins" />}
              <span className="text-3xl sm:text-5xl font-black text-amber-800 mt-3 sm:mt-4">:</span>
              {mounted && <FlipUnit value={pad(s)} label="secs" />}
            </div>
            <p className="text-xs text-amber-500 font-bold">til Wednesday&apos;s party 🎉</p>
          </motion.div>
        ) : isFeeding ? (
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
