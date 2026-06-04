"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import CockatooSVG from "@/components/svg/CockatooSVG";
import FeatherSVG from "@/components/svg/FeatherSVG";

const GW = 400;
const GH = 500;
const BIRD_W = 70;
const FEATHER_W = 28;

type Feather = { id: number; x: number; y: number; speed: number; rot: number; color: string };

const COLORS = ["#f97316", "#fbbf24", "#34d399", "#a78bfa", "#fb923c"];

export default function DodgeTheFeathers() {
  const [birdX, setBirdX] = useState(GW / 2 - BIRD_W / 2);
  const [feathers, setFeathers] = useState<Feather[]>([]);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);

  const birdXRef = useRef(birdX);
  const feathersRef = useRef(feathers);
  const nextId = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const mouseDown = useRef(false);
  const lastMouseX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  birdXRef.current = birdX;
  feathersRef.current = feathers;

  const stop = useCallback(() => {
    if (tickRef.current)  clearInterval(tickRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  }, []);

  const start = useCallback(() => {
    setBirdX(GW / 2 - BIRD_W / 2);
    setFeathers([]);
    setScore(0);
    scoreRef.current = 0;
    setDead(false);
    setRunning(true);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (!running) return;
    const onKey = (e: KeyboardEvent) => {
      const step = 28;
      if (e.key === "ArrowLeft")  setBirdX((x) => Math.max(0, x - step));
      if (e.key === "ArrowRight") setBirdX((x) => Math.min(GW - BIRD_W, x + step));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    // Spawn feathers
    spawnRef.current = setInterval(() => {
      const speed = 2.5 + Math.random() * 2 + scoreRef.current * 0.04;
      setFeathers((f) => [
        ...f,
        {
          id: nextId.current++,
          x: Math.random() * (GW - FEATHER_W),
          y: -40,
          speed,
          rot: Math.random() * 360,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
      ]);
    }, 900);

    // Game tick
    tickRef.current = setInterval(() => {
      scoreRef.current += 1;
      setScore(scoreRef.current);

      setFeathers((prev) => {
        const bird = { x: birdXRef.current, w: BIRD_W, y: GH - 110, h: 90 };
        let hit = false;
        const next = prev
          .map((f) => ({ ...f, y: f.y + f.speed, rot: f.rot + 3 }))
          .filter((f) => {
            if (f.y > GH) return false;
            // AABB collision (shrunk hitbox)
            const fx = f.x + 4, fw = FEATHER_W - 8;
            const fy = f.y + 4, fh = 36;
            if (
              fx < bird.x + bird.w - 10 &&
              fx + fw > bird.x + 10 &&
              fy < bird.y + bird.h - 10 &&
              fy + fh > bird.y
            ) {
              hit = true;
              return false;
            }
            return true;
          });
        if (hit) {
          setRunning(false);
          setDead(true);
        }
        return next;
      });
    }, 16);

    return stop;
  }, [running, stop]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const scale = (containerRef.current?.offsetWidth ?? GW) / GW;
    const dx = (e.touches[0].clientX - touchStartX.current) / scale;
    touchStartX.current = e.touches[0].clientX;
    setBirdX((x) => Math.max(0, Math.min(GW - BIRD_W, x + dx)));
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    mouseDown.current = true;
    lastMouseX.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown.current || lastMouseX.current === null) return;
    const scale = (containerRef.current?.offsetWidth ?? GW) / GW;
    const dx = (e.clientX - lastMouseX.current) / scale;
    lastMouseX.current = e.clientX;
    setBirdX((x) => Math.max(0, Math.min(GW - BIRD_W, x + dx)));
  };
  const onMouseUp = () => { mouseDown.current = false; lastMouseX.current = null; };
  const onMouseLeave = () => { mouseDown.current = false; lastMouseX.current = null; };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-sky-100 rounded-2xl px-8 py-3 text-center shadow">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Score</p>
        <p className="text-4xl font-black text-sky-900">{score}</p>
      </div>

      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden border-4 border-sky-300 bg-gradient-to-b from-sky-200 to-amber-100 touch-none select-none cursor-grab active:cursor-grabbing"
        style={{ width: "min(100%, 400px)", aspectRatio: "400/500" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {/* Feathers */}
        {feathers.map((f) => (
          <div
            key={f.id}
            className="absolute"
            style={{
              left: `${(f.x / GW) * 100}%`,
              top:  `${(f.y / GH) * 100}%`,
              transform: `rotate(${f.rot}deg)`,
            }}
          >
            <FeatherSVG size={FEATHER_W} color={f.color} />
          </div>
        ))}

        {/* Cockatoo */}
        <div
          className="absolute"
          style={{
            left: `${(birdX / GW) * 100}%`,
            bottom: "8%",
            width: `${(BIRD_W / GW) * 100}%`,
          }}
        >
          <CockatooSVG size={BIRD_W} />
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-emerald-600 opacity-50 rounded-b-3xl" />

        {/* Overlay */}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl gap-4 z-20">
            {dead ? (
              <>
                <p className="text-5xl">💥</p>
                <p className="text-3xl font-black text-white">Ouch!</p>
                <p className="text-white font-semibold">Score: <span className="text-yellow-300 font-black">{score}</span></p>
              </>
            ) : (
              <>
                <p className="text-5xl animate-bounce">🪶</p>
                <p className="text-2xl font-black text-white text-center px-4">Dodge the falling feathers!</p>
                <p className="text-white/80 text-sm text-center px-4">Arrow keys or swipe to move</p>
              </>
            )}
            <button
              onClick={start}
              className="bg-sky-400 hover:bg-sky-300 text-sky-900 font-black px-8 py-3 rounded-full text-lg transition-colors"
            >
              {dead ? "Try Again 🎮" : "Start 🎮"}
            </button>
          </div>
        )}
      </div>
      <p className="text-sky-700 text-xs font-semibold">⬅ Arrow keys or swipe ➡</p>
    </div>
  );
}
