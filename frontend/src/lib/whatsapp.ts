import { site } from "./site";

export function whatsappLink(message: string, number: string = site.whatsappNumber): string {
  const cleaned = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export const PRESETS = {
  general: () =>
    `Halo ${site.brand}, saya ingin diskusi kebutuhan website & automation untuk bisnis saya.`,
  template: (name: string) =>
    `Halo ${site.brand}, saya tertarik menggunakan template "${name}" untuk bisnis saya. Bisa konsultasi lebih lanjut?`,
  customWebsite: () =>
    `Halo ${site.brand}, saya ingin diskusi pembuatan website custom sesuai kebutuhan bisnis saya.`,
  automation: () =>
    `Halo ${site.brand}, saya ingin diskusi kebutuhan IT automation / system development untuk bisnis saya.`,
  preview: (name: string) =>
    `Halo ${site.brand}, saya baru saja melihat preview "${name}". Bisa diskusi lanjut untuk implementasi?`,
} as const;
