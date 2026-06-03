"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Member } from "@/lib/data/members";
import BreadSliceSVG from "@/components/svg/BreadSliceSVG";

type Props = { member: Member; index: number };

export default function BreadCard({ member, index }: Props) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{ y: -10, rotate: 2, scale: 1.06 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      {/* Boss crown */}
      {member.isBoss && (
        <motion.div
          className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl z-20 drop-shadow-md"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          👑
        </motion.div>
      )}

      {/* Card wrapper — responsive size */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          "w-[120px] h-[128px] sm:w-[150px] sm:h-[160px]"
        )}
        style={{
          filter: member.isBoss
            ? "drop-shadow(0 0 10px #fbbf24bb) drop-shadow(0 3px 6px #92400e88)"
            : "drop-shadow(0 3px 8px #92400e66)",
        }}
      >
        {/* SVG fills the wrapper */}
        <div className="absolute inset-0">
          <BreadSliceSVG isBoss={member.isBoss} />
        </div>

        {/* Content — clipped to bread area, padded away from crust edges */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 w-[72%] h-[72%] mb-2 text-center overflow-hidden">
          <span className="text-xl sm:text-2xl leading-none drop-shadow-sm">{member.emoji}</span>
          <span className={cn(
            "font-black leading-tight mt-0.5 text-amber-900 w-full truncate",
            member.isBoss ? "text-[11px] sm:text-[12px]" : "text-[10px] sm:text-[11px]"
          )}>
            {member.name}
          </span>
          <span className="text-[8px] sm:text-[9px] text-amber-800 leading-tight w-full line-clamp-2 opacity-90">
            {member.role}
          </span>
          {member.isBoss && (
            <span className="mt-0.5 text-[7px] font-black tracking-widest uppercase bg-amber-800 text-amber-100 rounded-full px-1.5 py-0.5">
              Boss
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
