type SliceProps = {
  isBoss?: boolean;
  width?: number | string;
  height?: number | string;
};

export default function BreadSliceSVG({ isBoss = false, width = "100%", height = "100%" }: SliceProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Crust background (full slice) ── */}
      {/* Wide rect body, organic bumpy crown copied from reference shape:
          bottom flat, sides straight, top has left-shoulder rise,
          big left dome, shallow dip, smaller right dome, right shoulder drop */}
      <path
        d="M6 112
           L6 52
           C6 44 10 34 18 26
           C24 20 30 14 40 11
           C48 8  54 10 58 15
           C60 18 62 18 64 15
           C68 10 76 8  84 12
           C94 17 108 30 112 46
           L114 112
           Z"
        fill={isBoss ? "#b5651d" : "#c47a2b"}
        stroke="#3b1a06"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ── Inner crumb fill ── */}
      <path
        d="M13 110
           L13 53
           C13 46 17 37 24 30
           C30 24 36 19 44 17
           C50 15 55 17 58 21
           C61 17 66 15 72 17
           C80 19 88 26 95 34
           C103 43 107 52 107 58
           L107 110
           Z"
        fill={isBoss ? "#f5deb3" : "#f5e6c8"}
      />

      {/* ── Holes (reference style — organic blobs scattered on crumb) ── */}
      {/* Top-left zone */}
      <ellipse cx="30" cy="38" rx="4"   ry="5.5" fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.35" />
      <ellipse cx="48" cy="32" rx="3.5" ry="4.5" fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.3" />
      {/* Mid-left */}
      <ellipse cx="24" cy="60" rx="3.5" ry="5"   fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.3" />
      <ellipse cx="36" cy="72" rx="3"   ry="4"   fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.28" />
      {/* Mid-right */}
      <ellipse cx="78" cy="42" rx="3.5" ry="5"   fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.3" />
      <ellipse cx="90" cy="58" rx="3"   ry="4.5" fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.28" />
      {/* Bottom zone */}
      <ellipse cx="30" cy="90" rx="3"   ry="3.5" fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.25" />
      <ellipse cx="56" cy="84" rx="3.5" ry="4"   fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.28" />
      <ellipse cx="82" cy="88" rx="3"   ry="3.5" fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.25" />
      {/* Centre */}
      <ellipse cx="60" cy="60" rx="4"   ry="5"   fill={isBoss ? "#c8a052" : "#d4aa60"} opacity="0.22" />

      {/* ── Boss glow ── */}
      {isBoss && (
        <path
          d="M6 112 L6 52 C6 44 10 34 18 26 C24 20 30 14 40 11 C48 8 54 10 58 15 C60 18 62 18 64 15 C68 10 76 8 84 12 C94 17 108 30 112 46 L114 112 Z"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
      )}
    </svg>
  );
}
