"use client";

import { motion } from "framer-motion";
import CockatooSVG from "@/components/svg/CockatooSVG";
import FlyingCockatooSVG from "@/components/svg/FlyingCockatooSVG";
import SunSVG from "@/components/svg/SunSVG";
import TreeSVG from "@/components/svg/TreeSVG";
import ScrollArrowSVG from "@/components/svg/ScrollArrowSVG";
import FloatingFeathers from "@/components/ui/FloatingFeathers";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-end overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 px-4 pb-16 pt-10">
      <FloatingFeathers />

      {/* Sun */}
      <motion.div
        className="absolute top-8 right-10 sm:right-16 opacity-95"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <SunSVG size={72} />
      </motion.div>

      {/* Clouds */}
      {[
        { left: "3%",  top: "10%", scale: 0.9,  delay: 0 },
        { left: "55%", top: "6%",  scale: 0.7,  delay: 2.5 },
        { left: "72%", top: "18%", scale: 0.55, delay: 1 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: c.left, top: c.top, scale: c.scale }}
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        >
          <svg width="120" height="56" viewBox="0 0 120 56" fill="none">
            <ellipse cx="60" cy="40" rx="54" ry="22" fill="white" opacity="0.9" />
            <ellipse cx="42" cy="30" rx="30" ry="24" fill="white" opacity="0.9" />
            <ellipse cx="76" cy="28" rx="26" ry="21" fill="white" opacity="0.9" />
          </svg>
        </motion.div>
      ))}

      {/* Flying cockatoo
           Mobile: absolute above the trees in the sky
           Desktop (sm+): centred between the trees at mid-height */}
      <motion.div
        className="absolute z-20 left-1/2 -translate-x-1/2 sm:bottom-[54%] bottom-[62%]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          scale:   { duration: 0.6, delay: 0.4 },
          y:       { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
        }}
      >
        <FlyingCockatooSVG size={160} className="sm:hidden" />
        <FlyingCockatooSVG size={360} className="hidden sm:block" />
      </motion.div>

      {/* ── Main scene: two big trees with perched cockatoos ── */}
      <div className="relative z-10 flex items-end justify-center w-full max-w-4xl pt-8">

        {/* LEFT TREE */}
        <div className="relative flex-shrink-0">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <TreeSVG height={320} delay={0} />
          </motion.div>

          {/* Cockatoo perched on left tree's branch (right branch at ~55% down the tree) */}
          <motion.div
            className="absolute"
            style={{ bottom: "42%", right: "-18px" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* Subtle bob */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <CockatooSVG size={90} flipped />
            </motion.div>
          </motion.div>
        </div>

        {/* Centre spacer — ground grass tuft */}
        <div className="flex-1 flex items-end justify-center pb-2 min-w-[60px] sm:min-w-[100px]">
          {/* Grass tufts */}
          <svg width="120" height="28" viewBox="0 0 120 28" fill="none" className="opacity-70">
            <path d="M10 28 Q12 18 14 10 Q16 18 18 28" stroke="#4a7a42" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M20 28 Q22 16 25 8 Q28 16 30 28" stroke="#3d9148" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M55 28 Q57 14 60 6 Q63 14 65 28" stroke="#4a7a42" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M70 28 Q72 18 74 12 Q76 18 78 28" stroke="#3d9148" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M90 28 Q93 16 96 8 Q99 16 101 28" stroke="#4a7a42" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M105 28 Q107 20 109 14 Q111 20 113 28" stroke="#3d9148" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* RIGHT TREE */}
        <div className="relative flex-shrink-0">
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            <TreeSVG height={280} flipped delay={1} />
          </motion.div>

          {/* Cockatoo perched on right tree's branch */}
          <motion.div
            className="absolute"
            style={{ bottom: "44%", left: "-14px" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <CockatooSVG size={80} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Ground strip */}
      <div className="relative z-10 w-full max-w-4xl h-4 rounded-full bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-800 opacity-50 blur-sm mb-8" />

      {/* Headline */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-amber-900 drop-shadow-sm">
          🦜 Cockatoo Party!
        </h1>
        <p className="mt-3 text-lg sm:text-2xl font-semibold text-amber-700">
          Faez&apos;s Daily Feeding Fiesta 🎉
        </p>
        <p className="mt-2 text-sm sm:text-lg text-amber-600">
          Every day at{" "}
          <span className="font-black text-amber-600 text-lg sm:text-xl bg-white/60 rounded-xl px-3 py-0.5">
            4:45 PM 🇦🇺
          </span>
          <span className="block mt-1 text-xs sm:text-sm text-amber-500 font-bold">
            (except Tuesdays 🙅 the cockatoos have the day off!)
          </span>
        </p>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        className="relative z-10 mt-4 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-bold tracking-widest uppercase text-amber-700 opacity-80">scroll</span>
        <ScrollArrowSVG size={34} color="#b45309" />
      </motion.div>
    </section>
  );
}
