"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videos, type Video } from "@/lib/data/videos";

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.play();
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-amber-950/95 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[95vw] max-h-[90vh] flex flex-col items-center"
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-amber-200 font-black text-sm flex items-center gap-2 hover:text-white transition-colors"
        >
          ✕ close
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {video.emoji}
          </motion.span>
          <h2 className="text-white font-black text-xl sm:text-2xl">{video.title}</h2>
        </div>

        {/* Video */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/40 bg-black">
          <video
            ref={ref}
            src={`/videos/${video.filename}`}
            className="max-w-[95vw] max-h-[75vh]"
            controls
            playsInline
          />
        </div>

        <p className="mt-3 text-amber-300 text-sm text-center">{video.description}</p>
      </motion.div>
    </motion.div>
  );
}

function VideoCard({ video, index, onOpen }: { video: Video; index: number; onOpen: () => void }) {
  const thumbRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-amber-200 bg-white cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, rotate: 1, scale: 1.02 }}
      onClick={onOpen}
    >
      {/* Thumbnail */}
      <div className="relative bg-amber-950 aspect-video">
        <video
          ref={thumbRef}
          src={`/videos/${video.filename}`}
          className="w-full h-full object-cover opacity-80"
          muted
          playsInline
          preload="metadata"
        />
        {/* Play overlay — always shown on card */}
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

      {/* Card info */}
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
        <code className="bg-amber-100 text-amber-800 rounded-lg px-2 py-0.5 text-sm font-black">
          public/videos/
        </code>{" "}
        and add them to{" "}
        <code className="bg-amber-100 text-amber-800 rounded-lg px-2 py-0.5 text-sm font-black">
          lib/data/videos.ts
        </code>
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

export default function VideosPage() {
  const [active, setActive] = useState<Video | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-orange-100 px-4 py-16">
      {/* Floating feather decorations */}
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
        {/* Header */}
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
          <h1 className="text-5xl sm:text-6xl font-black text-amber-900 mb-3">
            Cockatoo Videos!
          </h1>
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length === 0
            ? <EmptyState />
            : videos.map((v, i) => (
                <VideoCard key={v.id} video={v} index={i} onOpen={() => setActive(v)} />
              ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {active && <VideoModal video={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </main>
  );
}
