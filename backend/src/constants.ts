/**
 * Enum-like string constants. Mirrors what would be Prisma enums on Postgres.
 * Use these for validation and to keep the frontend & backend in sync.
 */

export const NICHES = [
  "UMKM",
  "KLINIK",
  "KONTRAKTOR",
  "PROPERTI",
  "CATERING",
  "TRAVEL",
  "WEDDING",
  "GYM",
  "SKINCARE",
  "CORPORATE",
  "OTHER",
] as const;
export type Niche = (typeof NICHES)[number];

export const INQUIRY_TOPICS = ["TEMPLATE", "CUSTOM_WEBSITE", "AUTOMATION", "GENERAL"] as const;
export type InquiryTopic = (typeof INQUIRY_TOPICS)[number];

export const INQUIRY_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
