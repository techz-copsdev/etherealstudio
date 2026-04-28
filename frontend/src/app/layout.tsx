import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Chrome } from "@/components/layout/Chrome";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Premium Landing Page, Website Custom & IT Automation`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "jasa landing page",
    "jasa pembuatan website",
    "template landing page",
    "custom website",
    "IT automation",
    "WhatsApp automation",
    "company profile",
    "website klinik",
    "website kontraktor",
    "website properti",
  ],
  authors: [{ name: site.brand }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} — Premium Landing Page, Website Custom & IT Automation`,
    description: site.description,
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
