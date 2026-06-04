"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  height?: number;
  flipped?: boolean;
  delay?: number;
};

export default function TreeSVG({ className, height = 400, flipped = false, delay = 0 }: Props) {
  const w = height * 0.6;

  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 120 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      <motion.g
        style={{ transformOrigin: "58px 260px" }}
        animate={{ rotate: [0, 1.2, -0.8, 0.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* ── Root flare ── */}
        <path d="M44 260 Q40 238 46 218 L58 210 L70 218 Q76 238 72 260Z" fill="#6b4c1e" />

        {/* ── Main trunk — thick ── */}
        <path
          d="M46 218 Q43 185 47 155 Q50 128 54 105 Q58 82 58 60
             Q62 82 62 105 Q66 128 69 155 Q73 185 70 218Z"
          fill="#8B6020"
        />
        {/* Bark texture */}
        <path d="M52 195 Q56 188 53 178" stroke="#6b4c1e" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M62 205 Q66 197 63 186" stroke="#6b4c1e" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M53 165 Q57 157 54 147" stroke="#6b4c1e" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
        <path d="M63 172 Q67 163 64 153" stroke="#6b4c1e" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />

        {/* ── Perch branch (right) — thick, where cockatoo sits ── */}
        <motion.g
          style={{ transformOrigin: "60px 148px" }}
          animate={{ rotate: [0, 1.5, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }}
        >
          <path d="M60 148 Q82 140 106 138" stroke="#7B5818" strokeWidth="6" strokeLinecap="round" />
          <path d="M60 148 Q82 140 106 138" stroke="#9B7030" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </motion.g>

        {/* ── Left branch ── */}
        <motion.g
          style={{ transformOrigin: "54px 125px" }}
          animate={{ rotate: [0, -1.5, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.2 }}
        >
          <path d="M54 125 Q36 116 16 112" stroke="#7B5818" strokeWidth="5" strokeLinecap="round" />
        </motion.g>

        {/* ── Upper-right branch ── */}
        <motion.g
          style={{ transformOrigin: "60px 95px" }}
          animate={{ rotate: [0, 2, -1.5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: delay + 0.7 }}
        >
          <path d="M60 95 Q80 84 98 80" stroke="#7B5818" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        {/* ── Canopy — 3 overlapping layers ── */}
        <motion.ellipse cx="55" cy="72" rx="46" ry="38"
          fill="#4a7a42"
          style={{ transformOrigin: "55px 72px" }}
          animate={{ rotate: [0, 1, -0.7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.1 }}
        />
        <motion.ellipse cx="52" cy="55" rx="38" ry="30"
          fill="#3d9148"
          style={{ transformOrigin: "52px 55px" }}
          animate={{ rotate: [0, -1.5, 1.2, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: delay + 0.3 }}
        />
        <motion.ellipse cx="58" cy="36" rx="28" ry="24"
          fill="#2ea84e"
          style={{ transformOrigin: "58px 36px" }}
          animate={{ rotate: [0, 2, -1.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.15 }}
        />
        {/* Canopy highlight */}
        <ellipse cx="48" cy="28" rx="13" ry="9" fill="#60cc70" opacity="0.3" />

        {/* Side canopy blobs over branches */}
        <motion.ellipse cx="18" cy="108" rx="18" ry="14"
          fill="#3d9148"
          style={{ transformOrigin: "18px 108px" }}
          animate={{ rotate: [0, 3, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
        />
        <motion.ellipse cx="98" cy="78" rx="16" ry="13"
          fill="#3d9148"
          style={{ transformOrigin: "98px 78px" }}
          animate={{ rotate: [0, -3, 2, 0] }}
          transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
        />

        {/* ── Hanging eucalyptus leaves ── */}
        {[
          { x: 22,  y: 118, a: 25,  len: 20 },
          { x: 10,  y: 114, a: -18, len: 16 },
          { x: 96,  y: 85,  a: -28, len: 18 },
          { x: 108, y: 82,  a: 12,  len: 14 },
          { x: 38,  y: 100, a: 32,  len: 17 },
          { x: 72,  y: 92,  a: -22, len: 15 },
          { x: 50,  y: 108, a: 10,  len: 13 },
        ].map((l, i) => {
          const rad = (l.a * Math.PI) / 180;
          return (
            <motion.path
              key={i}
              d={`M${l.x} ${l.y} Q${l.x + Math.cos(rad) * l.len * 0.5} ${l.y + l.len * 0.55} ${l.x + Math.cos(rad) * l.len} ${l.y + l.len}`}
              stroke="#2ea84e"
              strokeWidth="2.2"
              strokeLinecap="round"
              style={{ transformOrigin: `${l.x}px ${l.y}px` }}
              animate={{ rotate: [0, l.a > 0 ? 5 : -5, 0] }}
              transition={{ duration: 2.5 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: delay + i * 0.15 }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
