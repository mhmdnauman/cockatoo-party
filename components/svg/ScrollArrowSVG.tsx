type Props = { className?: string; size?: number; color?: string };

export default function ScrollArrowSVG({ className, size = 36, color = "#b45309" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer ring */}
      <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="2" strokeOpacity="0.35" />
      {/* First chevron */}
      <path
        d="M11 13 L18 20 L25 13"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />
      {/* Second chevron */}
      <path
        d="M11 19 L18 26 L25 19"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
