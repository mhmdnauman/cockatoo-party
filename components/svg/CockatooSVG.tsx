"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = { className?: string; size?: number; flipped?: boolean };

export default function CockatooSVG({ className, size = 200, flipped = false }: Props) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* ── Perch ── */}
      <rect x="10" y="178" width="140" height="7" rx="3.5" fill="#7c5c30" />
      <rect x="10" y="178" width="140" height="2.5" rx="1.5" fill="#a07828" opacity="0.45" />

      {/* ── Tail feathers — long, flat, swept back-left ── */}
      <path d="M58 162 Q44 172 36 188" stroke="#ddd8b0" strokeWidth="5"   strokeLinecap="round" />
      <path d="M64 165 Q52 176 48 192" stroke="#e8e4bc" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M72 167 Q64 180 62 196" stroke="#eeead0" strokeWidth="4"   strokeLinecap="round" />
      <path d="M80 168 Q76 182 76 198" stroke="#e8e4bc" strokeWidth="4"   strokeLinecap="round" />
      <path d="M88 167 Q86 181 88 196" stroke="#ddd8b0" strokeWidth="3.5" strokeLinecap="round" />

      {/* ── Body — plump, perched upright ── */}
      <path
        d="M52 168
           Q36 158 34 134
           Q32 110 44 94
           Q54 80 80 77
           Q106 74 116 90
           Q128 106 126 132
           Q124 154 110 166
           Q96 178 80 178
           Q64 178 52 168Z"
        fill="#f2ece0"
      />
      {/* Left body shadow */}
      <path
        d="M52 168 Q36 158 34 134 Q32 110 44 94 Q54 80 66 78 L64 178 Q64 178 52 168Z"
        fill="#c8c0a0"
        opacity="0.3"
      />
      {/* Chest feather texture lines */}
      <path d="M60 120 Q68 115 76 118" stroke="#d8d0b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M58 132 Q67 126 76 130" stroke="#d8d0b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M60 144 Q69 138 78 142" stroke="#d8d0b8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* ── Wing — folded, visible on right ── */}
      <path
        d="M110 164 Q122 152 124 130 Q126 108 116 92
           Q112 102 110 120 Q108 142 110 164Z"
        fill="#e4dcc0"
        stroke="#c0b890"
        strokeWidth="1"
      />
      {/* Wing primary feather tips */}
      <path d="M114 156 Q124 160 122 170" stroke="#b8b090" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M112 146 Q122 148 122 158" stroke="#b8b090" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M111 136 Q121 136 121 146" stroke="#b8b090" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M111 126 Q120 124 120 134" stroke="#b8b090" strokeWidth="1"   strokeLinecap="round" />

      {/* ── Neck ── */}
      <path
        d="M60 94 Q64 80 80 76 Q96 72 102 84
           Q108 94 104 102 Q98 86 80 86 Q62 88 60 94Z"
        fill="#f2ece0"
      />

      {/* ── Head ── */}
      <circle cx="80" cy="68" r="28" fill="#f5f0e2" />
      {/* Subtle underside shadow */}
      <ellipse cx="80" cy="88" rx="22" ry="9" fill="#c8c0a0" opacity="0.2" />
      {/* Head highlight */}
      <ellipse cx="74" cy="58" rx="12" ry="9" fill="white" opacity="0.2" />

      {/* ── Yellow ear/cheek patch ── */}
      <ellipse cx="97" cy="74" rx="12" ry="9"  fill="#f6c90e" opacity="0.9" />
      <ellipse cx="97" cy="74" rx="9"  ry="6.5" fill="#fde047" opacity="0.5" />

      {/* ── Bare eye-ring (pale grey-blue skin) ── */}
      <circle cx="70" cy="63" r="9"   fill="#e8e0d8" />
      <circle cx="70" cy="63" r="7.5" fill="#ddd5cc" opacity="0.6" />
      {/* Eye — dark brown/black */}
      <circle cx="70" cy="63" r="5.8" fill="#0f0a06" />
      {/* Iris shimmer */}
      <circle cx="70" cy="63" r="5.8" stroke="#2a1a0a" strokeWidth="1.2" fill="none" />
      {/* Catchlight */}
      <circle cx="68.5" cy="61.5" r="1.8" fill="white" opacity="0.88" />
      <circle cx="72"   cy="65"   r="0.9" fill="white" opacity="0.35" />

      {/* ── Hooked beak — black, facing left ── */}
      {/* Upper mandible — large downward curve */}
      <path
        d="M60 70
           Q52 68 47 73
           Q43 79 47 85
           Q52 90 60 88
           Q66 86 68 80
           Q68 73 60 70Z"
        fill="#1c1c1c"
      />
      {/* Upper mandible ridge highlight */}
      <path d="M60 70 Q54 69 49 75" stroke="#3a3a3a" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Lower mandible */}
      <path
        d="M60 83 Q55 83 52 87
           Q55 91 60 90
           Q66 89 68 85
           Q65 83 60 83Z"
        fill="#2e2e2e"
      />
      {/* Cere (fleshy base of beak) */}
      <ellipse cx="61" cy="71" rx="4" ry="2.5" fill="#e8e0d0" opacity="0.7" />

      {/* ══ CREST — sulphur yellow, sweeping BACKWARD over the head ══
           All feathers root at the forehead (~x75,y44) and arc backward
           toward the back of the head (x95–115, y30–50).
           The classic cockatoo fan swept rearward. */}
      <motion.g
        style={{ transformOrigin: "80px 46px" }}
        animate={{ rotate: [0, 6, -4, 2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Feather 1 — lowest, barely lifted, sweeps to back of head */}
        <path
          d="M75 46 C78 38 90 34 100 38"
          stroke="#f6c90e" strokeWidth="3" strokeLinecap="round" fill="none"
        />
        {/* Feather 2 */}
        <path
          d="M75 44 C76 34 88 26 102 30"
          stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" fill="none"
        />
        {/* Feather 3 — middle height */}
        <path
          d="M76 42 C76 30 86 20 104 22"
          stroke="#f6c90e" strokeWidth="3.5" strokeLinecap="round" fill="none"
        />
        {/* Feather 4 — tall, arcs back */}
        <path
          d="M77 40 C77 26 88 14 106 16"
          stroke="#fde047" strokeWidth="4" strokeLinecap="round" fill="none"
        />
        {/* Feather 5 — tallest, sweeps furthest back */}
        <path
          d="M78 38 C80 22 92 10 110 12"
          stroke="#f6c90e" strokeWidth="4" strokeLinecap="round" fill="none"
        />
        {/* Feather 6 — outermost, tips behind head */}
        <path
          d="M80 38 C84 22 98 12 114 16"
          stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"
        />

        {/* Feather tip blobs */}
        <ellipse cx="100" cy="38" rx="3"   ry="2"   fill="#f6c90e" transform="rotate(20 100 38)"  />
        <ellipse cx="102" cy="30" rx="3"   ry="2"   fill="#fde047" transform="rotate(10 102 30)"  />
        <ellipse cx="104" cy="22" rx="3.5" ry="2"   fill="#f6c90e" transform="rotate(5 104 22)"   />
        <ellipse cx="106" cy="16" rx="3.5" ry="2.2" fill="#fde047" transform="rotate(-5 106 16)"  />
        <ellipse cx="110" cy="12" rx="4"   ry="2.2" fill="#f6c90e" transform="rotate(-12 110 12)" />
        <ellipse cx="114" cy="16" rx="3.5" ry="2"   fill="#fbbf24" transform="rotate(-18 114 16)" />
      </motion.g>

      {/* ── Feet — zygodactyl, gripping perch ── */}
      {/* Left foot — 2 forward, 2 back */}
      <path d="M64 178 Q57 182 53 186" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 178 Q61 184 59 190" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 178 Q70 183 72 188" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 178 Q67 185 66 191" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right foot */}
      <path d="M96 178 Q89 182 86 186" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M96 178 Q93 184 91 190" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M96 178 Q102 182 105 186" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M96 178 Q99 185 98 191" stroke="#b89020" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
