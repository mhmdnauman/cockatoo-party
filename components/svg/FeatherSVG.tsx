import { cn } from "@/lib/utils";

type Props = { className?: string; size?: number; color?: string };

export default function FeatherSVG({ className, size = 40, color = "#f97316" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M20 75 Q5 55 8 35 Q10 15 20 5 Q30 15 32 35 Q35 55 20 75Z"
        fill={color}
        opacity="0.85"
      />
      <path d="M20 75 L20 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M20 30 Q12 25 8 22" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <path d="M20 40 Q28 35 32 32" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <path d="M20 50 Q13 46 9 44" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <path d="M20 60 Q27 56 31 54" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
