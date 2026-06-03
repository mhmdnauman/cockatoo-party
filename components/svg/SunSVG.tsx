import { cn } from "@/lib/utils";

type Props = { className?: string; size?: number };

export default function SunSVG({ className, size = 120 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 60 + Math.cos(angle) * 42;
        const y1 = 60 + Math.sin(angle) * 42;
        const x2 = 60 + Math.cos(angle) * 56;
        const y2 = 60 + Math.sin(angle) * 56;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* Glow */}
      <circle cx="60" cy="60" r="32" fill="#fde68a" opacity="0.5" />
      {/* Core */}
      <circle cx="60" cy="60" r="26" fill="#fbbf24" />
      <circle cx="60" cy="60" r="22" fill="#fcd34d" />
      <circle cx="52" cy="54" r="6" fill="#fde68a" opacity="0.5" />
    </svg>
  );
}
