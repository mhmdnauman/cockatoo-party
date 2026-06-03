"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = { className?: string; height?: number; flipped?: boolean; delay?: number };

export default function TreeSVG({ className, height = 260, flipped = false, delay = 0 }: Props) {
  const w = height * 0.55;

  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 110 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* ── Trunk ── */}
      <motion.g
        style={{ transformOrigin: "55px 220px" }}
        animate={{ rotate: [0, 1.5, -1, 0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* Root flare */}
        <path d="M42 220 Q40 200 44 185 L55 178 L66 185 Q70 200 68 220Z" fill="#7c5c30" />
        {/* Main trunk */}
        <path d="M44 185 Q42 150 46 120 Q50 95 55 80 Q60 95 64 120 Q68 150 66 185Z" fill="#8B6914" />
        {/* Bark texture */}
        <path d="M50 160 Q53 155 50 148" stroke="#7c5c30" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <path d="M58 170 Q61 164 59 156" stroke="#7c5c30" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <path d="M52 130 Q55 124 53 116" stroke="#7c5c30" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        {/* ── Branches ── */}
        {/* Left branch */}
        <motion.path
          d="M50 120 Q35 108 20 105"
          stroke="#7B6020"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ transformOrigin: "50px 120px" }}
          animate={{ rotate: [0, 2, -1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.3 }}
        />
        {/* Right branch */}
        <motion.path
          d="M60 110 Q76 96 92 90"
          stroke="#7B6020"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ transformOrigin: "60px 110px" }}
          animate={{ rotate: [0, -2, 1, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
        />
        {/* Small mid-left branch */}
        <path d="M52 140 Q40 132 30 130" stroke="#7B6020" strokeWidth="2.5" strokeLinecap="round" />

        {/* ── Canopy layers (eucalyptus — blue-green) ── */}
        {/* Back layer */}
        <motion.ellipse
          cx="55" cy="65" rx="38" ry="32"
          fill="#5a8a5e"
          style={{ transformOrigin: "55px 65px" }}
          animate={{ rotate: [0, 1, -0.8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.1 }}
        />
        {/* Mid layer */}
        <motion.ellipse
          cx="52" cy="52" rx="32" ry="26"
          fill="#4a9660"
          style={{ transformOrigin: "52px 52px" }}
          animate={{ rotate: [0, -1.5, 1, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }}
        />
        {/* Top layer */}
        <motion.ellipse
          cx="56" cy="36" rx="25" ry="22"
          fill="#3aaa5c"
          style={{ transformOrigin: "56px 36px" }}
          animate={{ rotate: [0, 2, -1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: delay + 0.2 }}
        />
        {/* Highlight sheen */}
        <ellipse cx="48" cy="28" rx="10" ry="7" fill="#6ec87a" opacity="0.35" />

        {/* Left canopy blob (overhanging left branch) */}
        <motion.ellipse
          cx="22" cy="100" rx="16" ry="12"
          fill="#4a9660"
          style={{ transformOrigin: "22px 100px" }}
          animate={{ rotate: [0, 3, -2, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
        />
        {/* Right canopy blob */}
        <motion.ellipse
          cx="88" cy="86" rx="14" ry="11"
          fill="#4a9660"
          style={{ transformOrigin: "88px 86px" }}
          animate={{ rotate: [0, -3, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.7 }}
        />

        {/* ── Hanging eucalyptus leaves ── */}
        {[
          { x: 28, y: 108, rot: 20,  len: 18, d: 0.2 },
          { x: 18, y: 106, rot: -15, len: 14, d: 0.5 },
          { x: 86, y: 92,  rot: -25, len: 16, d: 0.3 },
          { x: 94, y: 90,  rot: 10,  len: 12, d: 0.7 },
          { x: 38, y: 90,  rot: 35,  len: 15, d: 0.1 },
          { x: 68, y: 84,  rot: -30, len: 13, d: 0.6 },
        ].map((l, i) => (
          <motion.path
            key={i}
            d={`M${l.x} ${l.y} Q${l.x + Math.cos((l.rot * Math.PI) / 180) * l.len * 0.5} ${l.y + l.len * 0.6} ${l.x + Math.cos((l.rot * Math.PI) / 180) * l.len} ${l.y + l.len}`}
            stroke="#3aaa5c"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transformOrigin: `${l.x}px ${l.y}px` }}
            animate={{ rotate: [0, l.rot > 0 ? 4 : -4, 0] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: delay + l.d }}
          />
        ))}
      </motion.g>
    </svg>
  );
}
