type Props = { id: string };

// Bread shape as a clipPath definition — reusable by id
export default function BreadClipDef({ id }: Props) {
  return (
    <defs>
      <clipPath id={id}>
        {/* Bread loaf top silhouette */}
        <path d="M10 80 Q0 60 5 35 Q8 10 30 8 Q50 2 70 8 Q92 10 95 35 Q100 60 90 80 Q85 90 50 92 Q15 90 10 80Z" />
      </clipPath>
    </defs>
  );
}

// Standalone bread outline SVG for decorative use
export function BreadOutlineSVG({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crust outer */}
      <path
        d="M10 80 Q0 60 5 35 Q8 10 30 8 Q50 2 70 8 Q92 10 95 35 Q100 60 90 80 Q85 90 50 92 Q15 90 10 80Z"
        fill="#d97706"
        stroke="#92400e"
        strokeWidth="1.5"
      />
      {/* Crust inner bevel */}
      <path
        d="M15 76 Q6 58 11 37 Q14 16 32 14 Q50 9 68 14 Q86 16 89 37 Q94 58 85 76 Q80 85 50 87 Q20 85 15 76Z"
        fill="#f59e0b"
      />
      {/* Bread inner (soft) */}
      <path
        d="M20 72 Q13 56 18 39 Q22 22 38 20 Q50 16 62 20 Q78 22 82 39 Q87 56 80 72 Q75 80 50 82 Q25 80 20 72Z"
        fill="#fde68a"
      />
      {/* Holes/texture */}
      <ellipse cx="38" cy="48" rx="4" ry="3" fill="#fcd34d" opacity="0.6" />
      <ellipse cx="55" cy="38" rx="3" ry="2.5" fill="#fcd34d" opacity="0.6" />
      <ellipse cx="65" cy="58" rx="3.5" ry="2.5" fill="#fcd34d" opacity="0.6" />
      <ellipse cx="42" cy="65" rx="3" ry="2" fill="#fcd34d" opacity="0.5" />
    </svg>
  );
}
