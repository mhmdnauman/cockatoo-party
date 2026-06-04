"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = { className?: string; size?: number; flipped?: boolean };

export default function FlyingCockatooSVG({ className, size = 180, flipped = false }: Props) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 200 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* ══ LEFT WING ══ */}
      <motion.g
        style={{ transformOrigin: "88px 52px" }}
        animate={{ rotate: [0, -18, 0, 18, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Wing shape — broad, tapered primaries */}
        <path
          d="M88 52
             C72 44 48 30 22 18
             C14 28 18 40 28 46
             C42 52 60 52 76 54
             Z"
          fill="#ede8d0"
        />
        {/* Primary feather divisions */}
        <path d="M76 54 C60 50 42 46 22 38" stroke="#c8c0a0" strokeWidth="1"   strokeLinecap="round" opacity="0.7" />
        <path d="M76 54 C58 48 38 40 20 28" stroke="#c8c0a0" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        <path d="M76 54 C62 52 46 50 30 46" stroke="#c8c0a0" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
        {/* Wing underside shadow */}
        <path
          d="M88 52 C72 46 50 34 28 22 C20 30 22 40 30 46 C48 52 66 54 76 54Z"
          fill="#c8c0a0"
          opacity="0.2"
        />
      </motion.g>

      {/* ══ RIGHT WING ══ */}
      <motion.g
        style={{ transformOrigin: "112px 52px" }}
        animate={{ rotate: [0, 18, 0, -18, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M112 52
             C128 44 152 30 178 18
             C186 28 182 40 172 46
             C158 52 140 52 124 54
             Z"
          fill="#ede8d0"
        />
        <path d="M124 54 C140 50 158 46 178 38" stroke="#c8c0a0" strokeWidth="1"   strokeLinecap="round" opacity="0.7" />
        <path d="M124 54 C142 48 162 40 180 28" stroke="#c8c0a0" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        <path d="M124 54 C138 52 154 50 170 46" stroke="#c8c0a0" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
        <path
          d="M112 52 C128 46 150 34 172 22 C180 30 178 40 170 46 C152 52 134 54 124 54Z"
          fill="#c8c0a0"
          opacity="0.2"
        />
      </motion.g>

      {/* ══ BODY — horizontal, streamlined in flight ══ */}
      <ellipse cx="100" cy="56" rx="22" ry="13" fill="#f2ece0" />
      {/* Body underside */}
      <ellipse cx="100" cy="60" rx="18" ry="8" fill="#e0d8c8" opacity="0.5" />

      {/* ══ TAIL — fanned out behind ══ */}
      <path d="M79 56 Q68 60 58 72" stroke="#ddd8b0" strokeWidth="4"   strokeLinecap="round" />
      <path d="M80 58 Q70 64 62 76" stroke="#e8e4bc" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M81 60 Q74 66 70 78" stroke="#eeead0" strokeWidth="3"   strokeLinecap="round" />

      {/* ══ HEAD ══ */}
      <circle cx="118" cy="48" r="16" fill="#f5f0e2" />
      {/* Head highlight */}
      <ellipse cx="114" cy="43" rx="7" ry="5" fill="white" opacity="0.18" />

      {/* Yellow cheek patch */}
      <ellipse cx="127" cy="52" rx="8" ry="6" fill="#f6c90e" opacity="0.9" />
      <ellipse cx="127" cy="52" rx="6" ry="4" fill="#fde047" opacity="0.45" />

      {/* Eye ring */}
      <circle cx="114" cy="45" r="6"   fill="#e0d8d0" />
      <circle cx="114" cy="45" r="5"   fill="#d8d0c8" opacity="0.5" />
      <circle cx="114" cy="45" r="3.8" fill="#0f0a06" />
      <circle cx="113" cy="44" r="1.2" fill="white"   opacity="0.88" />

      {/* Hooked beak — black, pointing forward-right */}
      <path
        d="M130 47 Q136 45 140 48 Q143 52 140 56 Q136 59 131 57 Q128 54 128 50 Q128 47 130 47Z"
        fill="#1c1c1c"
      />
      <path d="M130 47 Q136 46 140 50" stroke="#3a3a3a" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M131 54 Q135 55 139 53" fill="#2e2e2e" stroke="none" />
      {/* Cere */}
      <ellipse cx="130" cy="48" rx="3" ry="2" fill="#e8e0d0" opacity="0.65" />

      {/* ══ CREST — swept back, flat in flight ══ */}
      <motion.g
        style={{ transformOrigin: "118px 36px" }}
        animate={{ rotate: [0, 4, -2, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M116 36 C118 28 124 22 132 20" stroke="#f6c90e" strokeWidth="3"   strokeLinecap="round" fill="none" />
        <path d="M116 35 C120 26 128 18 138 16" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M117 34 C122 24 132 16 142 14" stroke="#f6c90e" strokeWidth="3"   strokeLinecap="round" fill="none" />
        <path d="M118 34 C124 24 136 18 146 18" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="132" cy="20" rx="2.5" ry="1.5" fill="#f6c90e" transform="rotate(-20 132 20)" />
        <ellipse cx="138" cy="16" rx="3"   ry="1.5" fill="#fde047" transform="rotate(-30 138 16)" />
        <ellipse cx="142" cy="14" rx="3"   ry="1.5" fill="#f6c90e" transform="rotate(-35 142 14)" />
        <ellipse cx="146" cy="18" rx="2.5" ry="1.5" fill="#fbbf24" transform="rotate(-40 146 18)" />
      </motion.g>
    </svg>
  );
}
