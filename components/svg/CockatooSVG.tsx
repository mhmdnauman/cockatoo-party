import { cn } from "@/lib/utils";

type Props = { className?: string; size?: number; flipped?: boolean };

export default function CockatooSVG({ className, size = 200, flipped = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Body */}
      <ellipse cx="100" cy="130" rx="48" ry="55" fill="#fffde7" />
      <ellipse cx="100" cy="130" rx="48" ry="55" fill="url(#bodyGrad)" />

      {/* Wing left */}
      <ellipse cx="62" cy="135" rx="22" ry="38" fill="#f5f5dc" transform="rotate(-15 62 135)" />
      {/* Wing right */}
      <ellipse cx="138" cy="135" rx="22" ry="38" fill="#f5f5dc" transform="rotate(15 138 135)" />

      {/* Wing detail lines */}
      <path d="M68 110 Q55 130 60 155" stroke="#e0d8a0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M63 112 Q50 135 55 158" stroke="#e0d8a0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M132 110 Q145 130 140 155" stroke="#e0d8a0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M137 112 Q150 135 145 158" stroke="#e0d8a0" strokeWidth="1.5" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="100" cy="85" rx="36" ry="34" fill="#fffde7" />
      <ellipse cx="100" cy="85" rx="36" ry="34" fill="url(#headGrad)" />

      {/* Cheek patches (yellow) */}
      <ellipse cx="78" cy="95" rx="12" ry="9" fill="#fbbf24" opacity="0.8" />
      <ellipse cx="122" cy="95" rx="12" ry="9" fill="#fbbf24" opacity="0.8" />

      {/* Eyes */}
      <circle cx="86" cy="80" r="7" fill="white" />
      <circle cx="114" cy="80" r="7" fill="white" />
      <circle cx="88" cy="80" r="4.5" fill="#1a1a1a" />
      <circle cx="116" cy="80" r="4.5" fill="#1a1a1a" />
      <circle cx="89.5" cy="78.5" r="1.5" fill="white" />
      <circle cx="117.5" cy="78.5" r="1.5" fill="white" />

      {/* Beak */}
      <path d="M92 95 Q100 110 108 95 Q100 98 92 95Z" fill="#f59e0b" />
      <path d="M92 95 Q100 102 108 95" stroke="#d97706" strokeWidth="1" />

      {/* Crest feathers (animated via CSS class on parent) */}
      <g className="wiggle" style={{ transformOrigin: "100px 55px" }}>
        <path d="M100 55 Q95 30 88 15" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M100 55 Q105 25 112 10" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M100 55 Q100 22 100 5" stroke="#fbbf24" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M100 55 Q90 28 80 18" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M100 55 Q110 28 120 18" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="88" cy="15" r="5" fill="#f97316" />
        <circle cx="112" cy="10" r="5" fill="#f97316" />
        <circle cx="100" cy="5" r="6" fill="#fbbf24" />
        <circle cx="80" cy="18" r="4" fill="#fb923c" />
        <circle cx="120" cy="18" r="4" fill="#fb923c" />
      </g>

      {/* Tail */}
      <path d="M80 178 Q100 200 120 178" fill="#f5f5dc" stroke="#e0d8a0" strokeWidth="1.5" />
      <path d="M85 178 Q100 205 115 178" fill="#fffde7" />
      <path d="M100 178 L100 205" stroke="#e0d8a0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M92 178 L88 207" stroke="#e0d8a0" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M108 178 L112 207" stroke="#e0d8a0" strokeWidth="1.2" strokeLinecap="round" />

      {/* Feet */}
      <path d="M88 182 Q84 190 78 192 M88 182 Q86 192 82 196 M88 182 Q90 192 88 196" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M112 182 Q116 190 122 192 M112 182 Q114 192 118 196 M112 182 Q110 192 112 196" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />

      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f5f5dc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="headGrad" cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fffde7" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
