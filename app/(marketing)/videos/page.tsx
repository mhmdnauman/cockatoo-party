"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videos, type Video } from "@/lib/data/videos";

// ─── TikTok-style modal ───────────────────────────────────────────────────────

function VideoModal({
  index,
  onClose,
  onNext,
  onPrev,
}: {
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const video = videos[index];
  const ref = useRef<HTMLVideoElement>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const touchStartY = useRef<number | null>(null);
  const busy = useRef(false);

  // Autoplay whenever index changes — ref is always mounted
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.src = `/videos/${videos[index].filename}`;
    el.load();
    el.play().catch(() => {});
  }, [index]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const go = useCallback((direction: 1 | -1) => {
    if (busy.current) return;
    const next = index + direction;
    if (next < 0 || next >= videos.length) return;
    busy.current = true;
    setDir(direction);
    setTimeout(() => { busy.current = false; }, 350);
    if (direction === 1) onNext();
    else onPrev();
  }, [index, onNext, onPrev]);

  // Mouse wheel
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) go(1);
      else if (e.deltaY < -30) go(-1);
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [go]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") go(1);
      if (e.key === "ArrowUp")   go(-1);
      if (e.key === "Escape")    onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50)  go(1);
    else if (diff < -50) go(-1);
    touchStartY.current = null;
  };

  const slideVariants = {
    enter:  (d: number) => ({ y: d > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit:   (d: number) => ({ y: d > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-900 font-black flex items-center justify-center shadow-lg transition-colors"
      >
        ✕
      </button>

      {/* Prev arrow */}
      {index > 0 && (
        <button
          onClick={() => go(-1)}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 text-amber-300 hover:text-white transition-colors"
        >
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 12L12 2l10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">prev</span>
        </button>
      )}

      {/* Next arrow */}
      {index < videos.length - 1 && (
        <button
          onClick={() => go(1)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 text-amber-300 hover:text-white transition-colors"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">next</span>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 2l10 10L22 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {videos.map((_, i) => (
          <motion.div
            key={i}
            className={`rounded-full transition-all ${i === index ? "bg-amber-400 w-2.5 h-2.5" : "bg-white/30 w-2 h-2"}`}
            animate={{ scale: i === index ? 1.2 : 1 }}
          />
        ))}
      </div>

      {/* Animated info overlay — slides on swipe */}
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 whitespace-nowrap"
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {video.emoji}
          </motion.span>
          <h2 className="text-white font-black text-lg sm:text-xl">{video.title}</h2>
          <span className="text-amber-500 text-xs font-bold">{index + 1} / {videos.length}</span>
        </motion.div>
      </AnimatePresence>

      {/* Single persistent video element — never unmounts, just swaps src */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30 bg-black">
        <video
          ref={ref}
          className="max-w-[95vw] max-h-[75vh]"
          controls
          playsInline
          preload="auto"
        />
      </div>

      {/* Preload adjacent videos */}
      {videos[index - 1] && (
        <link rel="preload" as="video" href={`/videos/${videos[index - 1].filename}`} />
      )}
      {videos[index + 1] && (
        <link rel="preload" as="video" href={`/videos/${videos[index + 1].filename}`} />
      )}

      <AnimatePresence custom={dir} mode="wait">
        <motion.p
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-3 text-amber-400 text-sm text-center px-4"
        >
          {video.description}
        </motion.p>
      </AnimatePresence>

      {videos.length > 1 && (
        <p className="mt-2 text-amber-600 text-[11px] font-bold tracking-widest uppercase">
          scroll or swipe to browse 🦜
        </p>
      )}
    </motion.div>
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────

function VideoCard({ video, index, onOpen }: { video: Video; index: number; onOpen: () => void }) {
  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-amber-200 bg-white cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, rotate: 1, scale: 1.02 }}
      onClick={onOpen}
    >
      <div className="relative bg-amber-950 aspect-video">
        <video
          src={`/videos/${video.filename}`}
          className="w-full h-full object-cover opacity-80"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-950/40">
          <motion.div
            className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5.5l11 6.5-11 6.5V5.5Z" fill="#92400e" />
            </svg>
          </motion.div>
          <span className="mt-2 text-amber-200 text-xs font-bold tracking-widest uppercase">
            tap to watch 🦜
          </span>
        </div>
      </div>
      <div className="px-5 py-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="flex items-start gap-3">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          >
            {video.emoji}
          </motion.span>
          <div>
            <h2 className="font-black text-amber-900 text-lg leading-tight">{video.title}</h2>
            <p className="text-amber-700 text-sm mt-0.5 leading-snug">{video.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      className="col-span-full flex flex-col items-center gap-5 py-20 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-8xl"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        🎬
      </motion.span>
      <h2 className="text-3xl font-black text-amber-900">No videos yet!</h2>
      <p className="text-amber-700 max-w-sm text-base font-medium">
        Drop some <span className="font-black">.mp4</span> files into{" "}
        <code className="bg-amber-100 text-amber-800 rounded-lg px-2 py-0.5 text-sm font-black">public/videos/</code>{" "}
        and add them to{" "}
        <code className="bg-amber-100 text-amber-800 rounded-lg px-2 py-0.5 text-sm font-black">lib/data/videos.ts</code>
      </p>
      <motion.div
        className="text-5xl flex gap-3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🦜 🍞 🦜
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VideosPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-orange-100 px-4 py-16">
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20 select-none" aria-hidden>
        {["8%", "88%", "45%"].map((left, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{ left, top: "-40px" }}
            animate={{ y: "110vh", rotate: 360 }}
            transition={{ duration: 10 + i * 3, delay: i * 2, repeat: Infinity, ease: "linear" }}
          >
            🪶
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎥
          </motion.div>
          <h1 className="text-5xl sm:text-6xl font-black text-amber-900 mb-3">Cockatoo Videos!</h1>
          <p className="text-amber-700 text-lg font-medium">
            Watch the gang in action — squawking, munching & partying! 🦜🍞
          </p>
          <motion.div
            className="mt-4 inline-block bg-amber-800 text-amber-100 font-black text-sm px-5 py-2 rounded-full"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {videos.length} {videos.length === 1 ? "video" : "videos"} 🌟
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length === 0
            ? <EmptyState />
            : videos.map((v, i) => (
                <VideoCard key={v.id} video={v} index={i} onOpen={() => setActiveIndex(i)} />
              ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <VideoModal
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNext={() => setActiveIndex((i) => Math.min(videos.length - 1, (i ?? 0) + 1))}
            onPrev={() => setActiveIndex((i) => Math.max(0, (i ?? 0) - 1))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
