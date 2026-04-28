import { cn } from "@/lib/utils";

/**
 * Procedurally-generated SVG thumbnail used as placeholder until real screenshots
 * are uploaded. Each niche gets a distinct composition so the gallery still feels
 * varied without relying on stock imagery or AI-generated art.
 */
export function TemplateThumbnail({
  name,
  niche,
  className,
}: {
  name: string;
  niche: string;
  className?: string;
}) {
  const palette = paletteFor(niche);

  return (
    <svg
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      aria-label={`${name} preview`}
      role="img"
    >
      <defs>
        <linearGradient id={`bg-${niche}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
      </defs>

      <rect width="480" height="360" fill={`url(#bg-${niche})`} />

      {/* Browser chrome */}
      <rect x="32" y="32" width="416" height="296" rx="14" fill="#FFFFFF" />
      <rect x="32" y="32" width="416" height="34" rx="14" fill="#F2F3F6" />
      <circle cx="50" cy="49" r="4" fill="#D5D9E2" />
      <circle cx="64" cy="49" r="4" fill="#D5D9E2" />
      <circle cx="78" cy="49" r="4" fill="#D5D9E2" />
      <rect x="100" y="42" width="200" height="14" rx="4" fill="#E7E9EE" />

      {/* Hero block */}
      <rect x="56" y="86" width="160" height="14" rx="3" fill={palette.accent} opacity="0.85" />
      <rect x="56" y="108" width="280" height="22" rx="4" fill="#0B0F19" />
      <rect x="56" y="138" width="240" height="22" rx="4" fill="#0B0F19" />
      <rect x="56" y="180" width="320" height="10" rx="3" fill="#AEB4C2" />
      <rect x="56" y="196" width="260" height="10" rx="3" fill="#AEB4C2" />

      <rect x="56" y="226" width="120" height="34" rx="17" fill="#0B0F19" />
      <rect x="186" y="226" width="120" height="34" rx="17" fill="none" stroke="#0B0F19" strokeWidth="1.5" />

      {/* Right visual block */}
      <rect x="320" y="82" width="100" height="170" rx="10" fill={palette.tile} />
      <rect x="332" y="120" width="76" height="6" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="332" y="132" width="50" height="6" rx="2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="370" cy="186" r="22" fill="#FFFFFF" opacity="0.85" />

      {/* Footer band */}
      <rect x="56" y="280" width="364" height="36" rx="8" fill="#F6F7F9" />
      <rect x="68" y="294" width="80" height="8" rx="2" fill="#AEB4C2" />
      <rect x="160" y="294" width="60" height="8" rx="2" fill="#AEB4C2" />
      <rect x="232" y="294" width="48" height="8" rx="2" fill="#AEB4C2" />
    </svg>
  );
}

function paletteFor(niche: string) {
  switch (niche) {
    case "KLINIK":
      return { bgStart: "#EAF6F2", bgEnd: "#D2EDE4", accent: "#0F5C4A", tile: "#0F5C4A" };
    case "KONTRAKTOR":
      return { bgStart: "#F2F0EB", bgEnd: "#E5E1D6", accent: "#3F4A2E", tile: "#3F4A2E" };
    case "PROPERTI":
      return { bgStart: "#EEF1F6", bgEnd: "#DDE3EC", accent: "#22273A", tile: "#22273A" };
    case "CATERING":
      return { bgStart: "#FAF1E8", bgEnd: "#F2DFCC", accent: "#8A4B1E", tile: "#8A4B1E" };
    case "TRAVEL":
      return { bgStart: "#E8F0F4", bgEnd: "#D2DFE8", accent: "#1F4A66", tile: "#1F4A66" };
    case "WEDDING":
      return { bgStart: "#F4ECEB", bgEnd: "#E6D5D2", accent: "#6B2C2C", tile: "#6B2C2C" };
    case "GYM":
      return { bgStart: "#0B0F19", bgEnd: "#22273A", accent: "#F2C14E", tile: "#F2C14E" };
    case "SKINCARE":
      return { bgStart: "#F4EEEA", bgEnd: "#E8DCD3", accent: "#7A4A3B", tile: "#7A4A3B" };
    case "UMKM":
      return { bgStart: "#F6F4EE", bgEnd: "#E8E3D5", accent: "#0F5C4A", tile: "#0F5C4A" };
    case "CORPORATE":
      return { bgStart: "#F0F1F4", bgEnd: "#DDE0E8", accent: "#0B0F19", tile: "#0B0F19" };
    default:
      return { bgStart: "#F6F7F9", bgEnd: "#ECEEF2", accent: "#0F5C4A", tile: "#0F5C4A" };
  }
}
