/**
 * Central application configuration.
 *
 * Toggle `mode` between `"local"` (file-based JSON) and `"cloud"` (Supabase).
 * Override at runtime with NEXT_PUBLIC_* env vars where appropriate.
 */

export type AppMode = "local" | "cloud";

export interface AppConfig {
  mode: AppMode;
  brand: {
    name: string;
    tagline: string;
  };
  whatsappNumber: string;
  enableLiveChat: boolean;
  enableTracking: boolean;
  currency: {
    code: string;
    locale: string;
    symbol: string;
  };
  shipping: {
    defaultCost: number;
  };
  admin: {
    /** Optional simple gate. Compared client-side only — not for real auth. */
    accessCode: string;
  };
}

const env = (key: string, fallback: string): string => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

export const config: AppConfig = {
  mode: (env("NEXT_PUBLIC_APP_MODE", "local") as AppMode),
  brand: {
    name: env("NEXT_PUBLIC_BRAND_NAME", "UMKM Grosir"),
    tagline: env(
      "NEXT_PUBLIC_BRAND_TAGLINE",
      "Pesan grosir cepat, checkout langsung via WhatsApp"
    )
  },
  whatsappNumber: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "6281234567890"),
  enableLiveChat: env("NEXT_PUBLIC_ENABLE_LIVECHAT", "true") !== "false",
  enableTracking: env("NEXT_PUBLIC_ENABLE_TRACKING", "true") !== "false",
  currency: {
    code: "IDR",
    locale: "id-ID",
    symbol: "Rp"
  },
  shipping: {
    defaultCost: Number(env("NEXT_PUBLIC_DEFAULT_SHIPPING", "20000"))
  },
  admin: {
    accessCode: env("NEXT_PUBLIC_ADMIN_CODE", "admin123")
  }
};
