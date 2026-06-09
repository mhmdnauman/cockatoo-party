"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <footer className="bg-amber-900 text-amber-100 py-14 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-5 text-[160px] flex items-center justify-center">
        🦜
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-10"
      >
        {/* Brand */}
        <div>
          <p className="text-3xl font-black mb-1">🦜 Cockatoo Party</p>
          <p className="text-amber-300 font-semibold">Every day at 4:45 PM Australian Time</p>
        </div>

        {/* QR section */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 bg-amber-800/60 border-2 border-amber-600/50 rounded-3xl px-8 py-6 w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* QR code */}
          <div className="relative shrink-0 cursor-pointer" onClick={() => setQrOpen(true)}>
            {/* Decorative wiggle border */}
            <motion.div
              className="absolute -inset-2 rounded-2xl border-4 border-dashed border-amber-400/60"
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative bg-white rounded-xl p-2 shadow-xl"
              whileHover={{ scale: 1.08 }}
            >
              <Image
                src="/qr/qr-code.png"
                alt="Cockatoo Party QR Code"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </motion.div>
          </div>

          {/* Text */}
          <div className="text-left sm:text-left text-center">
            <motion.p
              className="font-black text-lg text-amber-100 leading-tight"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📱 Scan &amp; Join the Party!
            </motion.p>
            <p className="text-amber-300 text-sm mt-1 leading-snug">
              Share with friends &amp; family so everyone can join Faez&apos;s daily cockatoo fiesta 🎉
            </p>
            <div className="flex justify-center sm:justify-start">
              <a
                href="/qr/qr-code.png"
                download="cockatoo-party-qr.png"
                className="mt-3 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-black text-sm px-4 py-2 rounded-full transition-colors"
              >
                🖨️ Download &amp; Print
              </a>
            </div>
          </div>
        </motion.div>

        <p className="text-amber-400 text-sm">Made with 🍞 and ❤️ for Faez</p>
      </motion.div>

      {/* QR modal */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/90 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setQrOpen(false)}
          >
            <motion.div
              className="relative bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setQrOpen(false)}
                className="absolute -top-4 -right-4 w-9 h-9 bg-amber-400 hover:bg-amber-300 text-amber-900 font-black rounded-full shadow-lg flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <p className="font-black text-amber-900 text-lg">📱 Scan to Join!</p>
              <Image
                src="/qr/qr-code.png"
                alt="Cockatoo Party QR Code"
                width={280}
                height={280}
                className="rounded-xl"
              />
              <a
                href="/qr/qr-code.png"
                download="cockatoo-party-qr.png"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-black text-sm px-5 py-2.5 rounded-full transition-colors"
              >
                🖨️ Download &amp; Print
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
