"use client";

import { motion } from "framer-motion";
import BreadCard from "@/components/ui/BreadCard";
import { members } from "@/lib/data/members";
import CockatooSVG from "@/components/svg/CockatooSVG";

export default function MemberTree() {
  const bosses = members.filter((m) => m.isBoss);
  const crew = members.filter((m) => !m.isBoss);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 to-yellow-100 relative overflow-hidden">
      {/* Decorative cockatoos — only on larger screens */}
      <div className="hidden md:block absolute left-0 bottom-0 opacity-20 -scale-x-100">
        <CockatooSVG size={160} />
      </div>
      <div className="hidden md:block absolute right-0 bottom-0 opacity-20">
        <CockatooSVG size={160} />
      </div>

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-5xl font-black text-amber-900 text-center mb-2">
          🍞 The Party Members
        </h2>
        <p className="text-center text-amber-600 text-base sm:text-lg mb-14 sm:mb-16">
          Every loaf has its place in the party tree 🌳
        </p>

        {/* Boss row */}
        <div className="mb-6 text-center">
          <motion.span
            className="inline-block bg-amber-800 text-amber-100 font-black uppercase tracking-widest text-xs px-5 py-1.5 rounded-full mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            👑 Boss Members
          </motion.span>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-2">
            {bosses.map((m, i) => (
              <BreadCard key={m.id} member={m} index={i} />
            ))}
          </div>
        </div>

        {/* Connector */}
        <motion.div
          className="flex flex-col items-center my-4 sm:my-6"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ transformOrigin: "top" }}
        >
          <div className="w-0.5 h-8 sm:h-10 bg-amber-400" />
          <div className="w-20 sm:w-24 h-0.5 bg-amber-400 -mt-px" />
          <div className="text-amber-500 text-xs font-bold tracking-widest uppercase mt-1">party crew</div>
        </motion.div>

        {/* Crew row */}
        <div className="text-center">
          <motion.span
            className="inline-block bg-orange-500 text-white font-black uppercase tracking-widest text-xs px-5 py-1.5 rounded-full mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            🦜 Party Members
          </motion.span>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-2">
            {crew.map((m, i) => (
              <BreadCard key={m.id} member={m} index={bosses.length + i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
