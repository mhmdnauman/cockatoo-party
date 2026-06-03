"use client";

import { motion } from "framer-motion";
import FeatherSVG from "@/components/svg/FeatherSVG";

const FEATHERS = [
  { x: "8%",  delay: 0,    duration: 7,  size: 28, color: "#f97316", rotate: 20 },
  { x: "20%", delay: 1.5,  duration: 9,  size: 22, color: "#fbbf24", rotate: -30 },
  { x: "40%", delay: 0.8,  duration: 8,  size: 32, color: "#fb923c", rotate: 10 },
  { x: "60%", delay: 2.2,  duration: 7,  size: 20, color: "#f97316", rotate: -15 },
  { x: "75%", delay: 0.3,  duration: 10, size: 36, color: "#fbbf24", rotate: 25 },
  { x: "88%", delay: 1.8,  duration: 8,  size: 24, color: "#34d399", rotate: -20 },
  { x: "30%", delay: 3,    duration: 9,  size: 18, color: "#fb923c", rotate: 35 },
  { x: "55%", delay: 0.5,  duration: 6,  size: 30, color: "#fbbf24", rotate: -10 },
];

export default function FloatingFeathers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {FEATHERS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: f.x }}
          initial={{ y: -80, opacity: 0, rotate: f.rotate }}
          animate={{ y: "110vh", opacity: [0, 0.9, 0.9, 0], rotate: f.rotate + 360 }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: Math.random() * 4 + 2,
          }}
        >
          <FeatherSVG size={f.size} color={f.color} />
        </motion.div>
      ))}
    </div>
  );
}
