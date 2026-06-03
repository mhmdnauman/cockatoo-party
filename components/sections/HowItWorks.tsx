"use client";

import { motion } from "framer-motion";

const STEPS = [
  { emoji: "🕓", title: "Watch the clock", desc: "Wait for 4:45 PM Australian time. Almost there!" },
  { emoji: "🍞", title: "Grab the bread", desc: "Get a nice fresh piece of bread ready for the crew." },
  { emoji: "🌳", title: "Head outside", desc: "Go to the favourite spot where the cockatoos hang out." },
  { emoji: "🦜", title: "Party time!", desc: "Toss the bread and watch the cockatoo gang go wild!" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-orange-100 to-emerald-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-5 text-[200px] flex items-center justify-center">
        🦜
      </div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl sm:text-5xl font-black text-emerald-800 text-center mb-4">
          🎪 How the Party Works
        </h2>
        <p className="text-center text-emerald-600 text-lg mb-14">
          Faez&apos;s official cockatoo party guide 📖
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center bg-white/80 rounded-3xl p-6 shadow-md border-2 border-emerald-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px #6ee7b755" }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow">
                {i + 1}
              </div>
              <motion.span
                className="text-5xl mb-3"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                {step.emoji}
              </motion.span>
              <h3 className="font-black text-emerald-800 text-lg mb-1">{step.title}</h3>
              <p className="text-emerald-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
