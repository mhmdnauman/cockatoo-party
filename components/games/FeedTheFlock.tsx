"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlyingCockatooSVG from "@/components/svg/FlyingCockatooSVG";
import CockatooSVG from "@/components/svg/CockatooSVG";

type Bird    = { id: number; y: number; fromLeft: boolean; speed: number; fed: boolean };
type Perched = { id: number; slot: 0 | 1; fed: boolean };   // slot 0 = left tree, 1 = right tree

const MAX_ESCAPED = 5;

// ── Inline mini tree SVG ──────────────────────────────────────────────────
function MiniTree({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      width="90" height="160"
      viewBox="0 0 90 160"
      fill="none"
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* trunk */}
      <rect x="38" y="100" width="14" height="60" rx="5" fill="#7c5c30" />
      {/* root flare */}
      <ellipse cx="45" cy="158" rx="18" ry="5" fill="#6b4c1e" opacity="0.6" />
      {/* branch right — perch */}
      <path d="M48 88 Q68 80 84 78" stroke="#7B5818" strokeWidth="5" strokeLinecap="round" />
      {/* branch left */}
      <path d="M42 96 Q24 88 10 86" stroke="#7B5818" strokeWidth="4" strokeLinecap="round" />
      {/* canopy layers */}
      <ellipse cx="45" cy="72" rx="38" ry="30" fill="#4a7a42" />
      <ellipse cx="43" cy="56" rx="30" ry="24" fill="#3d9148" />
      <ellipse cx="46" cy="38" rx="22" ry="20" fill="#2ea84e" />
      <ellipse cx="40" cy="30" rx="10" ry="7"  fill="#60cc70" opacity="0.3" />
      {/* branch canopy blobs */}
      <ellipse cx="82" cy="74" rx="13" ry="10" fill="#3d9148" />
      <ellipse cx="12" cy="82" rx="12" ry="9"  fill="#3d9148" />
    </svg>
  );
}

export default function FeedTheFlock() {
  const [birds,    setBirds]    = useState<Bird[]>([]);
  const [perched,  setPerched]  = useState<Perched[]>([
    { id: 1000, slot: 0, fed: false },
    { id: 1001, slot: 1, fed: false },
  ]);
  const [score,    setScore]    = useState(0);
  const [escaped,  setEscaped]  = useState(0);
  const [running,  setRunning]  = useState(false);
  const [over,     setOver]     = useState(false);
  const nextId   = useRef(1002);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);

  const stop = useCallback(() => {
    clearInterval(spawnRef.current!);
    clearInterval(tickRef.current!);
  }, []);

  const start = useCallback(() => {
    setBirds([]);
    setPerched([
      { id: 1000, slot: 0, fed: false },
      { id: 1001, slot: 1, fed: false },
    ]);
    setScore(0);
    setEscaped(0);
    setOver(false);
    scoreRef.current = 0;
    setRunning(true);
  }, []);

  // Respawn a perched bird after it was fed
  const respawnPerched = useCallback((slot: 0 | 1) => {
    setTimeout(() => {
      setPerched((prev) => {
        if (prev.some((p) => p.slot === slot && !p.fed)) return prev;
        return [...prev.filter((p) => p.slot !== slot), { id: nextId.current++, slot, fed: false }];
      });
    }, 2500);
  }, []);

  useEffect(() => {
    if (!running) return;

    const interval = () => Math.max(600, 1400 - scoreRef.current * 8);
    const spawn = () => {
      const fromLeft = Math.random() > 0.5;
      const speed    = 0.4 + Math.random() * 0.5 + scoreRef.current * 0.005;
      setBirds((b) => [...b, { id: nextId.current++, y: 12 + Math.random() * 50, fromLeft, speed, fed: false }]);
    };

    spawnRef.current = setInterval(spawn, interval());
    const reschedule = setInterval(() => {
      clearInterval(spawnRef.current!);
      spawnRef.current = setInterval(spawn, interval());
    }, 5000);

    tickRef.current = setInterval(() => {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }, 500);

    return () => { stop(); clearInterval(reschedule); };
  }, [running, stop]);

  const feedFlying = (id: number) => {
    setBirds((prev) => prev.map((b) => b.id === id && !b.fed ? { ...b, fed: true } : b));
    setScore((s) => { const ns = s + 10; scoreRef.current = ns; return ns; });
    setTimeout(() => setBirds((prev) => prev.filter((b) => b.id !== id)), 600);
  };

  const feedPerched = (id: number, slot: 0 | 1) => {
    setPerched((prev) => prev.map((p) => p.id === id && !p.fed ? { ...p, fed: true } : p));
    setScore((s) => { const ns = s + 5; scoreRef.current = ns; return ns; });
    setTimeout(() => {
      setPerched((prev) => prev.filter((p) => p.id !== id));
      respawnPerched(slot);
    }, 700);
  };

  const onEscape = useCallback((id: number) => {
    setBirds((prev) => prev.filter((b) => b.id !== id));
    setEscaped((e) => {
      const ne = e + 1;
      if (ne >= MAX_ESCAPED) { setRunning(false); setOver(true); }
      return ne;
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <div className="bg-rose-100 rounded-2xl px-6 py-3 text-center shadow">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-700">Fed</p>
          <p className="text-4xl font-black text-rose-900">{Math.floor(score / 10)}</p>
        </div>
        <div className="bg-red-100 rounded-2xl px-6 py-3 text-center shadow">
          <p className="text-xs font-bold uppercase tracking-widest text-red-700">Escaped</p>
          <p className="text-4xl font-black text-red-600">{escaped} / {MAX_ESCAPED}</p>
        </div>
      </div>

      <div
        className="relative rounded-3xl overflow-hidden border-4 border-rose-300 bg-gradient-to-b from-sky-200 to-amber-100"
        style={{ width: "min(100%, 560px)", height: "360px" }}
      >
        {/* Clouds */}
        <div className="absolute top-3 left-10 opacity-40 pointer-events-none">
          <svg width="90" height="44" viewBox="0 0 90 44" fill="none">
            <ellipse cx="45" cy="32" rx="40" ry="16" fill="white" />
            <ellipse cx="32" cy="24" rx="22" ry="18" fill="white" />
            <ellipse cx="58" cy="22" rx="20" ry="16" fill="white" />
          </svg>
        </div>
        <div className="absolute top-6 right-14 opacity-25 pointer-events-none">
          <svg width="70" height="36" viewBox="0 0 70 36" fill="none">
            <ellipse cx="35" cy="26" rx="30" ry="13" fill="white" />
            <ellipse cx="24" cy="18" rx="18" ry="14" fill="white" />
            <ellipse cx="48" cy="17" rx="16" ry="13" fill="white" />
          </svg>
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-emerald-600 opacity-50 rounded-b-3xl pointer-events-none" />

        {/* ── LEFT TREE ── */}
        <div className="absolute bottom-6 left-0 pointer-events-none">
          <MiniTree />
        </div>
        {/* Perched bird on left tree branch */}
        <AnimatePresence>
          {perched.filter((p) => p.slot === 0).map((p) => (
            <motion.div
              key={p.id}
              className="absolute cursor-pointer z-10"
              style={{ bottom: "44%", left: "44px" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={p.fed ? { scale: 1.3, opacity: 0 } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => feedPerched(p.id, 0)}
              whileHover={{ scale: 1.1 }}
              title="Feed me!"
            >
              <div className="relative">
                <CockatooSVG size={52} />
                {p.fed && (
                  <motion.div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl pointer-events-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.5 }}
                  >
                    🍞
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ── RIGHT TREE ── */}
        <div className="absolute bottom-6 right-0 pointer-events-none">
          <MiniTree flipped />
        </div>
        {/* Perched bird on right tree branch */}
        <AnimatePresence>
          {perched.filter((p) => p.slot === 1).map((p) => (
            <motion.div
              key={p.id}
              className="absolute cursor-pointer z-10"
              style={{ bottom: "44%", right: "44px" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={p.fed ? { scale: 1.3, opacity: 0 } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => feedPerched(p.id, 1)}
              whileHover={{ scale: 1.1 }}
              title="Feed me!"
            >
              <div className="relative">
                <CockatooSVG size={52} flipped />
                {p.fed && (
                  <motion.div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl pointer-events-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.5 }}
                  >
                    🍞
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ── Flying birds ── */}
        <AnimatePresence>
          {birds.map((b) => (
            <motion.div
              key={b.id}
              className="absolute cursor-pointer z-20"
              style={{ top: `${b.y}%` }}
              initial={{ x: b.fromLeft ? "-20%" : "120%", opacity: 1 }}
              animate={b.fed ? { scale: 1.3, opacity: 0 } : { x: b.fromLeft ? "130%" : "-30%" }}
              transition={b.fed ? { duration: 0.5 } : { duration: 8 / b.speed, ease: "linear" }}
              onAnimationComplete={() => { if (!b.fed) onEscape(b.id); }}
              onClick={() => feedFlying(b.id)}
              whileHover={{ scale: 1.1 }}
            >
              <div className="relative">
                <FlyingCockatooSVG size={100} flipped={!b.fromLeft} />
                {b.fed && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    🍞
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Overlay */}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl gap-4 z-30">
            {over ? (
              <>
                <p className="text-5xl">🦜💨</p>
                <p className="text-3xl font-black text-white">They all flew away!</p>
                <p className="text-white font-semibold">
                  You fed <span className="text-yellow-300 font-black">{Math.floor(score / 10)}</span> cockatoos
                </p>
              </>
            ) : (
              <>
                <p className="text-5xl animate-bounce">🦜</p>
                <p className="text-2xl font-black text-white text-center px-4">Tap cockatoos to feed them!</p>
                <p className="text-white/80 text-sm text-center px-2">Flying ones score 10pts · Perched ones score 5pts</p>
                <p className="text-white/70 text-xs">Don&apos;t let {MAX_ESCAPED} flying ones escape!</p>
              </>
            )}
            <button
              onClick={start}
              className="bg-rose-400 hover:bg-rose-300 text-white font-black px-8 py-3 rounded-full text-lg transition-colors"
            >
              {over ? "Play Again 🎮" : "Start 🎮"}
            </button>
          </div>
        )}
      </div>
      <p className="text-rose-600 text-xs font-semibold">🌳 Perched = 5pts &nbsp;·&nbsp; 🦜 Flying = 10pts</p>
    </div>
  );
}
