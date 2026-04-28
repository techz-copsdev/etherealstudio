import { cn } from "@/lib/utils";

/**
 * Procedurally-generated SVG mock of a per-niche landing page. Used in the
 * gallery card to suggest the layout before user opens the full preview.
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
  const id = `bg-${niche.toLowerCase()}`;

  return (
    <svg
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      aria-label={`${name} preview`}
      role="img"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
      </defs>

      <rect width="480" height="360" fill={`url(#${id})`} />

      {/* Top-right gold dot motif */}
      <circle cx="430" cy="40" r="6" fill="#B8924E" opacity="0.85" />
      <circle cx="430" cy="40" r="14" fill="none" stroke="#B8924E" opacity="0.25" />

      {/* Browser frame */}
      <rect x="32" y="40" width="416" height="288" rx="14" fill="#FFFFFF" />
      <rect x="32" y="40" width="416" height="30" rx="14" fill="#F4F2EC" />
      <circle cx="48" cy="55" r="3" fill="#C8D2E0" />
      <circle cx="60" cy="55" r="3" fill="#C8D2E0" />
      <circle cx="72" cy="55" r="3" fill="#C8D2E0" />
      <rect x="92" y="49" width="180" height="12" rx="3" fill="#ECEAE2" />

      {/* Eyebrow */}
      <rect x="56" y="92" width="60" height="6" rx="2" fill={palette.accent} />

      {/* Headline */}
      <rect x="56" y="108" width="270" height="14" rx="3" fill="#0A1830" />
      <rect x="56" y="128" width="220" height="14" rx="3" fill="#0A1830" />

      {/* Description */}
      <rect x="56" y="156" width="320" height="6" rx="2" fill="#99A8BF" />
      <rect x="56" y="170" width="270" height="6" rx="2" fill="#99A8BF" />

      {/* CTAs */}
      <rect x="56" y="196" width="100" height="26" rx="13" fill="#0A1830" />
      <rect x="64" y="206" width="56" height="6" rx="2" fill="#FBFAF6" />
      <rect x="166" y="196" width="90" height="26" rx="13" fill="none" stroke="#0A1830" strokeWidth="1.2" />
      <rect x="180" y="206" width="56" height="6" rx="2" fill="#0A1830" opacity="0.65" />

      {/* Right visual block */}
      <rect x="320" y="92" width="100" height="170" rx="10" fill={palette.tile} />
      <rect x="332" y="124" width="76" height="6" rx="2" fill="#FFFFFF" opacity="0.8" />
      <rect x="332" y="136" width="50" height="6" rx="2" fill="#FFFFFF" opacity="0.55" />
      <circle cx="370" cy="190" r="22" fill="#FBFAF6" opacity="0.85" />
      <rect x="332" y="226" width="76" height="20" rx="6" fill="#FBFAF6" opacity="0.18" />

      {/* Feature row */}
      <rect x="56" y="246" width="62" height="46" rx="6" fill="#F4F2EC" />
      <rect x="124" y="246" width="62" height="46" rx="6" fill="#F4F2EC" />
      <rect x="192" y="246" width="62" height="46" rx="6" fill="#F4F2EC" />

      {/* Footer band */}
      <rect x="56" y="304" width="364" height="14" rx="3" fill="#F4F2EC" />
      <rect x="64" y="309" width="56" height="4" rx="2" fill="#99A8BF" />
      <rect x="132" y="309" width="40" height="4" rx="2" fill="#99A8BF" />
    </svg>
  );
}

function paletteFor(niche: string) {
  switch (niche) {
    case "KLINIK":
      return { bgStart: "#EFF4F0", bgEnd: "#E0EAE2", accent: "#1F4A3E", tile: "#1F4A3E" };
    case "KONTRAKTOR":
      return { bgStart: "#F2EEE6", bgEnd: "#E5DECB", accent: "#3F4A2E", tile: "#3F4A2E" };
    case "PROPERTI":
      return { bgStart: "#EEF1F6", bgEnd: "#DDE3EC", accent: "#0A1830", tile: "#0A1830" };
    case "CATERING":
      return { bgStart: "#FAEFE2", bgEnd: "#F1DCBE", accent: "#7A3F1A", tile: "#7A3F1A" };
    case "TRAVEL":
      return { bgStart: "#E8EFF4", bgEnd: "#CCDAE3", accent: "#1F4A66", tile: "#1F4A66" };
    case "WEDDING":
      return { bgStart: "#F4ECEB", bgEnd: "#E6D5D2", accent: "#6B2C2C", tile: "#6B2C2C" };
    case "GYM":
      return { bgStart: "#0A1830", bgEnd: "#1F2C44", accent: "#B8924E", tile: "#B8924E" };
    case "SKINCARE":
      return { bgStart: "#F4EEEA", bgEnd: "#E8DCD3", accent: "#7A4A3B", tile: "#7A4A3B" };
    case "UMKM":
      return { bgStart: "#FBF6EB", bgEnd: "#F0E1B9", accent: "#7E612F", tile: "#7E612F" };
    case "CORPORATE":
      return { bgStart: "#F0F1F4", bgEnd: "#DDE0E8", accent: "#0A1830", tile: "#0A1830" };
    default:
      return { bgStart: "#F4F6FA", bgEnd: "#E5EAF1", accent: "#0A1830", tile: "#0A1830" };
  }
}
