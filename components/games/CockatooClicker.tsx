"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CockatooSVG from "@/components/svg/CockatooSVG";

type Upgrade = { id: string; label: string; desc: string; cost: number; perClick: number; perSec: number; owned: number };

const BASE_UPGRADES: Omit<Upgrade, "owned">[] = [
  { id: "beak",    label: "Stronger Beak",    desc: "+2 seeds per click",  cost: 10,   perClick: 2,  perSec: 0   },
  { id: "friend",  label: "Cockatoo Friend",  desc: "1 seed/sec",          cost: 50,   perClick: 0,  perSec: 1   },
  { id: "tree",    label: "Seed Tree",        desc: "5 seeds/sec",         cost: 200,  perClick: 0,  perSec: 5   },
  { id: "flock",   label: "Full Flock",       desc: "20 seeds/sec",        cost: 800,  perClick: 0,  perSec: 20  },
  { id: "crest",   label: "Golden Crest",     desc: "+20 seeds per click", cost: 500,  perClick: 20, perSec: 0   },
];

type FloatLabel = { id: number; x: number; y: number; val: number };

export default function CockatooClicker() {
  const [seeds, setSeeds] = useState(0);
  const [total, setTotal] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(
    BASE_UPGRADES.map((u) => ({ ...u, owned: 0 }))
  );
  const [floats, setFloats] = useState<FloatLabel[]>([]);
  const floatId = useRef(0);

  const perClick = upgrades.reduce((acc, u) => acc + u.perClick * u.owned, 1);
  const perSec   = upgrades.reduce((acc, u) => acc + u.perSec   * u.owned, 0);

  // Auto-collect seeds per second
  useEffect(() => {
    if (perSec === 0) return;
    const id = setInterval(() => {
      setSeeds((s) => s + perSec);
      setTotal((t) => t + perSec);
    }, 1000);
    return () => clearInterval(id);
  }, [perSec]);

  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    setSeeds((s) => s + perClick);
    setTotal((t) => t + perClick);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFloats((f) => [...f, { id: floatId.current++, x, y, val: perClick }]);
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

        {/* Clickable cockatoo */}
        <div
          className="relative cursor-pointer select-none"
          onClick={click}
        >
          <motion.div whileTap={{ scale: 0.93 }} transition={{ duration: 0.08 }}>
            <CockatooSVG size={180} />
          </motion.div>

          {/* Floating +n labels */}
          <AnimatePresence>
            {floats.map((f) => (
              <motion.div
                key={f.id}
                className="absolute pointer-events-none font-black text-amber-700 text-lg"
                style={{ left: f.x, top: f.y }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -50 }}
                exit={{}}
                transition={{ duration: 0.7 }}
                onAnimationComplete={() =>
                  setFloats((prev) => prev.filter((fl) => fl.id !== f.id))
                }
              >
                +{f.val} 🌻
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="text-amber-700 font-semibold text-sm">Total seeds: {Math.floor(total).toLocaleString()}</p>
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
                <span className="text-xs font-black text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full">
                  ×{u.owned}
                </span>
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
