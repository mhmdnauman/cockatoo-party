"use client";

import { motion } from "framer-motion";
import CockatooSVG from "@/components/svg/CockatooSVG";
import SunSVG from "@/components/svg/SunSVG";
import TreeSVG from "@/components/svg/TreeSVG";
import ScrollArrowSVG from "@/components/svg/ScrollArrowSVG";
import FloatingFeathers from "@/components/ui/FloatingFeathers";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-200 via-yellow-50 to-amber-100 px-4 pt-16 pb-24">
      <FloatingFeathers />

      {/* Sun — smaller on mobile */}
      <motion.div
        className="absolute top-6 right-6 sm:top-8 sm:right-12 opacity-90"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <SunSVG size={64} />
        <span className="sr-only">Sun</span>
      </motion.div>

      {/* Clouds */}
      {[
        { left: "4%",  top: "12%", scale: 0.7,  delay: 0 },
        { left: "60%", top: "8%",  scale: 0.55, delay: 2 },
        { left: "76%", top: "20%", scale: 0.45, delay: 1 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: c.left, top: c.top, scale: c.scale }}
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        >
          <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
            <ellipse cx="50" cy="35" rx="45" ry="20" fill="white" opacity="0.85" />
            <ellipse cx="35" cy="28" rx="25" ry="20" fill="white" opacity="0.85" />
            <ellipse cx="62" cy="26" rx="22" ry="18" fill="white" opacity="0.85" />
          </svg>
        </motion.div>
      ))}

      {/* Scene: trees + cockatoos */}
      <div className="relative z-10 flex items-end justify-center w-full max-w-3xl mb-2">

        {/* Left tree — hidden on xs, smaller on sm */}
        <motion.div
          className="hidden xs:block flex-shrink-0 sm:block"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TreeSVG height={160} delay={0} />
        </motion.div>

        {/* Left cockatoo */}
        <motion.div
          className="float flex-shrink-0 -mr-2 sm:-mr-4"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <CockatooSVG size={100} flipped />
        </motion.div>

        {/* Centre cockatoo */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="float flex-shrink-0"
          style={{ animationDelay: "0.5s" }}
        >
          <CockatooSVG size={140} />
        </motion.div>

        {/* Right cockatoo */}
        <motion.div
          className="float flex-shrink-0 -ml-2 sm:-ml-4"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          style={{ animationDelay: "1s" }}
        >
          <CockatooSVG size={95} />
        </motion.div>

        {/* Right tree */}
        <motion.div
          className="hidden xs:block flex-shrink-0 sm:block"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <TreeSVG height={140} flipped delay={0.8} />
        </motion.div>
      </div>

      {/* Ground strip */}
      <div className="relative z-10 w-full max-w-3xl h-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 opacity-60 blur-sm -mt-1 mb-6" />

      {/* Headline */}
      <motion.div
        className="relative z-10 text-center px-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
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
        </p>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-bold tracking-widest uppercase text-amber-700 opacity-80">
          scroll
        </span>
        <ScrollArrowSVG size={34} color="#b45309" />
      </motion.div>
    </section>
  );
}
