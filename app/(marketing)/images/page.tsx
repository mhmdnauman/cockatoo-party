"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryImages, type GalleryImage } from "@/lib/data/images";

// ─── Modal ────────────────────────────────────────────────────────────────────

function ImageModal({
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
  const image = galleryImages[index];
  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { setDir(1); onNext(); }
      if (e.key === "ArrowLeft")  { setDir(-1); onPrev(); }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-900 font-black flex items-center justify-center shadow-lg transition-colors"
      >
        ✕
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setDir(-1); onPrev(); }}
          className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-amber-400/80 hover:bg-amber-300 text-amber-900 font-black flex items-center justify-center shadow-lg transition-colors"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {index < galleryImages.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setDir(1); onNext(); }}
          className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-amber-400/80 hover:bg-amber-300 text-amber-900 font-black flex items-center justify-center shadow-lg transition-colors"
        >
          ›
        </button>
      )}

      {/* Dot indicators */}
      {galleryImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {galleryImages.map((_, i) => (
            <motion.div
              key={i}
              className={`rounded-full transition-all ${i === index ? "bg-amber-400 w-3 h-3" : "bg-white/30 w-2 h-2"}`}
            />
          ))}
        </div>
      )}

      {/* Sliding image */}
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4 px-6 max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30">
            <Image
              src={`/images/${image.filename}`}
              alt={image.title}
              width={900}
              height={900}
              className="w-full h-auto max-h-[70vh] object-contain bg-black"
            />
          </div>

          {/* Caption */}
          <div className="flex items-center gap-3">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {image.emoji}
            </motion.span>
            <div className="text-center">
              <p className="text-white font-black text-lg leading-tight">{image.title}</p>
              <p className="text-amber-400 text-sm">{image.description}</p>
            </div>
            <span className="text-amber-600 text-xs font-bold ml-2 whitespace-nowrap">
              {index + 1} / {galleryImages.length}
            </span>
          </div>

          {galleryImages.length > 1 && (
            <p className="text-amber-600 text-[11px] font-bold tracking-widest uppercase">
              ← swipe or use arrows to browse →
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Grid cell ────────────────────────────────────────────────────────────────

function GridCell({ image, index, onOpen }: { image: GalleryImage; index: number; onOpen: () => void }) {
  return (
    <motion.div
      className="relative aspect-square overflow-hidden cursor-pointer group rounded-2xl sm:rounded-none"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={onOpen}
    >
      <Image
        src={`/images/${image.filename}`}
        alt={image.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, 33vw"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-amber-950/0 group-hover:bg-amber-950/50 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1 text-center px-3">
          <span className="text-2xl">{image.emoji}</span>
          <p className="text-white font-black text-sm leading-tight drop-shadow">{image.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      className="col-span-3 flex flex-col items-center gap-5 py-20 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.span
        className="text-8xl"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        📸
      </motion.span>
      <h2 className="text-3xl font-black text-amber-900">No photos yet!</h2>
      <p className="text-amber-700 max-w-sm text-base font-medium">
        Drop images into{" "}
        <code className="bg-amber-100 text-amber-800 rounded-lg px-2 py-0.5 text-sm font-black">public/images/</code>{" "}
        and add them to{" "}
        <code className="bg-amber-100 text-amber-800 rounded-lg px-2 py-0.5 text-sm font-black">lib/data/images.ts</code>
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ImagesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-orange-100 px-4 py-16">
      {/* Floating feathers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20 select-none" aria-hidden>
        {["12%", "80%", "50%"].map((left, i) => (
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

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-7xl mb-4"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📸
          </motion.div>
          <h1 className="text-5xl sm:text-6xl font-black text-amber-900 mb-3">Party Photos!</h1>
          <p className="text-amber-700 text-lg font-medium">
            Snaps from the daily cockatoo fiesta 🦜🎉
          </p>
          <motion.div
            className="mt-4 inline-block bg-amber-800 text-amber-100 font-black text-sm px-5 py-2 rounded-full"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {galleryImages.length} {galleryImages.length === 1 ? "photo" : "photos"} 🌟
          </motion.div>
        </motion.div>

        {/* Instagram-style grid */}
        {galleryImages.length === 0 ? (
          <div className="grid grid-cols-3"><EmptyState /></div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 sm:gap-1 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200">
            {galleryImages.map((img, i) => (
              <GridCell key={img.id} image={img} index={i} onOpen={() => setActiveIndex(i)} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <ImageModal
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNext={() => setActiveIndex((i) => Math.min(galleryImages.length - 1, (i ?? 0) + 1))}
            onPrev={() => setActiveIndex((i) => Math.max(0, (i ?? 0) - 1))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
