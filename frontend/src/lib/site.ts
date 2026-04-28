/**
 * Site-wide configuration. All env-derived values funnel through here so
 * components don't read process.env directly.
 */

export const site = {
  brand: process.env.NEXT_PUBLIC_BRAND_NAME ?? "Ethereal Studio",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@etherealstudio.id",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "628123456789",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  description:
    "Premium digital service provider — preview template landing page, jasa pembuatan website custom, dan IT automation untuk bisnis serius.",
  url: "https://etherealstudio.id",
  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
};

export const NICHES = [
  { value: "UMKM", label: "UMKM" },
  { value: "KLINIK", label: "Klinik" },
  { value: "KONTRAKTOR", label: "Kontraktor" },
  { value: "PROPERTI", label: "Properti" },
  { value: "CATERING", label: "Catering" },
  { value: "TRAVEL", label: "Travel" },
  { value: "WEDDING", label: "Wedding Organizer" },
  { value: "GYM", label: "Gym & Fitness" },
  { value: "SKINCARE", label: "Skincare" },
  { value: "CORPORATE", label: "Corporate" },
] as const;

export type NicheValue = (typeof NICHES)[number]["value"];

export function nicheLabel(value: string): string {
  const found = NICHES.find((n) => n.value === value);
  return found?.label ?? value;
}
