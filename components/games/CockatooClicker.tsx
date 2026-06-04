"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import CockatooSVG from "@/components/svg/CockatooSVG";

type Upgrade = { id: string; label: string; desc: string; cost: number; perClick: number; perSec: number; owned: number };

const BASE_UPGRADES: Omit<Upgrade, "owned">[] = [
  { id: "beak",   label: "Stronger Beak",   desc: "+2 seeds per click",  cost: 10,  perClick: 2,  perSec: 0  },
  { id: "friend", label: "Cockatoo Friend", desc: "1 seed/sec",          cost: 50,  perClick: 0,  perSec: 1  },
  { id: "tree",   label: "Seed Tree",       desc: "5 seeds/sec",         cost: 200, perClick: 0,  perSec: 5  },
  { id: "flock",  label: "Full Flock",      desc: "20 seeds/sec",        cost: 800, perClick: 0,  perSec: 20 },
  { id: "crest",  label: "Golden Crest",    desc: "+20 seeds per click", cost: 500, perClick: 20, perSec: 0  },
];

const RAGE_TIERS = [
  { threshold: 60, label: "🤯 ABSOLUTE CHAOS!", bg: "from-red-500 to-orange-500",   tint: "bg-red-400/20",    multiplier: 5 },
  { threshold: 30, label: "😡 GOING MAD!",      bg: "from-orange-500 to-amber-400", tint: "bg-orange-300/20", multiplier: 3 },
  { threshold: 10, label: "😤 GETTING EXCITED!", bg: "from-amber-400 to-yellow-300", tint: "bg-yellow-200/20", multiplier: 2 },
] as const;

const FEATHER_COLORS = ["#f97316", "#fbbf24", "#fb923c", "#fde047", "#34d399"];

type FloatLabel = { id: number; x: number; y: number; val: number };
type Feather = { id: number; angle: number; dist: number; color: string };

function getCurrentTier(streak: number) {
  return RAGE_TIERS.find((t) => streak >= t.threshold) ?? null;
}

export default function CockatooClicker() {
  const [seeds, setSeeds] = useState(0);
  const [total, setTotal] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(BASE_UPGRADES.map((u) => ({ ...u, owned: 0 })));
  const [floats, setFloats] = useState<FloatLabel[]>([]);
  const [streak, setStreak] = useState(0);
  const [burst, setBurst] = useState<Feather[]>([]);
  const floatId = useRef(0);
  const featherId = useRef(0);
  const streakTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTierThreshold = useRef(-1);
  const shakeControls = useAnimation();

  const basePerClick = upgrades.reduce((acc, u) => acc + u.perClick * u.owned, 1);
  const perSec = upgrades.reduce((acc, u) => acc + u.perSec * u.owned, 0);
  const currentTier = getCurrentTier(streak);
  const multiplier = currentTier?.multiplier ?? 1;
  const perClick = basePerClick * multiplier;

  // Auto seeds
  useEffect(() => {
    if (perSec === 0) return;
    const id = setInterval(() => {
      setSeeds((s) => s + perSec);
      setTotal((t) => t + perSec);
    }, 1000);
    return () => clearInterval(id);
  }, [perSec]);

  // Streak decay — reset 2s after last click
  useEffect(() => {
    if (streakTimer.current) clearTimeout(streakTimer.current);
    if (streak === 0) return;
    streakTimer.current = setTimeout(() => setStreak(0), 2000);
    return () => { if (streakTimer.current) clearTimeout(streakTimer.current); };
  }, [streak]);

  // Fire effects when crossing a new tier
  useEffect(() => {
    const tier = getCurrentTier(streak);
    const threshold = tier?.threshold ?? -1;
    if (threshold === prevTierThreshold.current) return;
    prevTierThreshold.current = threshold;
    if (!tier) return;

    const intensity = tier.threshold >= 60 ? 18 : tier.threshold >= 30 ? 10 : 5;
    shakeControls.start({
      x: [0, -intensity, intensity, -intensity / 2, intensity / 2, 0],
      transition: { duration: 0.45 },
    });

    const count = tier.threshold >= 60 ? 20 : tier.threshold >= 30 ? 12 : 6;
    const feathers: Feather[] = Array.from({ length: count }, (_, i) => ({
      id: featherId.current++,
      angle: (360 / count) * i + Math.random() * 15,
      dist: 80 + Math.random() * 70,
      color: FEATHER_COLORS[Math.floor(Math.random() * FEATHER_COLORS.length)],
    }));
    setBurst(feathers);
    setTimeout(() => setBurst([]), 900);
  }, [streak, shakeControls]);

  // Reset tier tracking when streak resets
  useEffect(() => {
    if (streak === 0) prevTierThreshold.current = -1;
  }, [streak]);

  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    setSeeds((s) => s + perClick);
    setTotal((t) => t + perClick);
    setStreak((s) => s + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    setFloats((f) => [...f, { id: floatId.current++, x: e.clientX - rect.left, y: e.clientY - rect.top, val: perClick }]);
  };

  const buy = (id: string) => {
    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const cost = Math.floor(u.cost * Math.pow(1.5, u.owned));
        if (seeds < cost) return u;
        setSeeds((s) => s - cost);
        return { ...u, owned: u.owned + 1 };
      })
    );
  };

  // Cockatoo wiggle animation per tier
  const birdAnimate =
    streak >= 60 ? { rotate: [0, 18, -18, 12, -12, 0], scale: [1, 1.14, 0.93, 1.1, 1] } :
    streak >= 30 ? { rotate: [0, 10, -10, 5, -5, 0],   scale: [1, 1.07, 0.96, 1]       } :
    streak >= 10 ? { rotate: [0, 4, -4, 0]                                               } : {};

  const birdTransition =
    streak >= 60 ? { duration: 0.22, repeat: Infinity } :
    streak >= 30 ? { duration: 0.32, repeat: Infinity } :
    streak >= 10 ? { duration: 0.5,  repeat: Infinity } :
    { duration: 0.08 };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start justify-center">
      {/* Left: clicker */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <div className="bg-amber-100 rounded-2xl px-8 py-4 text-center shadow">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Seeds</p>
          <p className="text-5xl font-black text-amber-900">{Math.floor(seeds).toLocaleString()}</p>
          {perSec > 0 && (
            <p className="text-xs text-amber-600 mt-1">{perSec}/sec · {perClick}/click</p>
          )}
        </div>

        {/* Rage banner */}
        <AnimatePresence mode="wait">
          {currentTier && (
            <motion.div
              key={currentTier.threshold}
              className={`bg-gradient-to-r ${currentTier.bg} text-white font-black text-sm px-5 py-2 rounded-full shadow-lg`}
              initial={{ scale: 0.5, opacity: 0, y: -8 }}
              animate={{ scale: [1.2, 1], opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentTier.label} ×{multiplier} seeds!
            </motion.div>
          )}
        </AnimatePresence>

        {streak > 0 && (
          <p className="text-xs font-bold text-amber-600 tracking-widest uppercase">
            🔥 {streak} click streak
          </p>
        )}

        {/* Cockatoo */}
        <motion.div animate={shakeControls}>
          <div
            className={`relative cursor-pointer select-none rounded-3xl transition-colors duration-300 ${currentTier?.tint ?? ""}`}
            onClick={click}
          >
            <motion.div animate={birdAnimate} transition={birdTransition} whileTap={{ scale: streak >= 60 ? 1.15 : 0.93 }}>
              <CockatooSVG size={180} />
            </motion.div>

            {/* Feather burst on tier unlock */}
            <AnimatePresence>
              {burst.map((f) => (
                <motion.div
                  key={f.id}
                  className="absolute pointer-events-none top-1/2 left-1/2"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
                  animate={{
                    x: Math.cos((f.angle * Math.PI) / 180) * f.dist,
                    y: Math.sin((f.angle * Math.PI) / 180) * f.dist,
                    opacity: 0,
                    scale: 1.4,
                    rotate: f.angle * 2,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <svg width="12" height="28" viewBox="0 0 12 28" fill="none">
                    <path d="M6 2 Q11 9 9 18 Q7 25 6 27 Q5 25 3 18 Q1 9 6 2Z" fill={f.color} opacity="0.9" />
                    <line x1="6" y1="3" x2="6" y2="25" stroke="white" strokeWidth="0.7" opacity="0.5" />
                  </svg>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Floating +n labels */}
            <AnimatePresence>
              {floats.map((f) => (
                <motion.div
                  key={f.id}
                  className={`absolute pointer-events-none font-black text-lg ${
                    streak >= 60 ? "text-red-600" : streak >= 30 ? "text-orange-600" : "text-amber-700"
                  }`}
                  style={{ left: f.x, top: f.y }}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -60, scale: streak >= 30 ? 1.4 : 1 }}
                  exit={{}}
                  transition={{ duration: 0.7 }}
                  onAnimationComplete={() => setFloats((prev) => prev.filter((fl) => fl.id !== f.id))}
                >
                  +{f.val} 🌻
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-amber-700 font-semibold text-sm">Total seeds: {Math.floor(total).toLocaleString()}</p>

        {/* Tier hints */}
        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
          <span className={streak >= 10 ? "text-amber-500" : "text-amber-400/50"}>😤 10</span>
          <span className="text-amber-300">·</span>
          <span className={streak >= 30 ? "text-orange-500" : "text-amber-400/50"}>😡 30</span>
          <span className="text-amber-300">·</span>
          <span className={streak >= 60 ? "text-red-500" : "text-amber-400/50"}>🤯 60</span>
        </div>
      </div>

      {/* Right: upgrades */}
      <div className="flex flex-col gap-3 w-full sm:w-64">
        <p className="font-black text-amber-900 text-lg">🌻 Upgrades</p>
        {upgrades.map((u) => {
          const cost = Math.floor(u.cost * Math.pow(1.5, u.owned));
          const canAfford = seeds >= cost;
          return (
            <motion.button
              key={u.id}
              onClick={() => buy(u.id)}
              disabled={!canAfford}
              whileHover={canAfford ? { scale: 1.03 } : {}}
              whileTap={canAfford ? { scale: 0.97 } : {}}
              className={`w-full text-left rounded-2xl p-3 border-2 transition-colors ${
                canAfford
                  ? "bg-amber-100 border-amber-400 hover:bg-amber-200 cursor-pointer"
                  : "bg-white/50 border-amber-100 cursor-not-allowed opacity-60"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-black text-amber-900 text-sm">{u.label}</span>
                <span className="text-xs font-black text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full">×{u.owned}</span>
              </div>
              <p className="text-xs text-amber-700 mt-0.5">{u.desc}</p>
              <p className="text-xs font-black text-amber-800 mt-1">🌻 {cost.toLocaleString()} seeds</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
