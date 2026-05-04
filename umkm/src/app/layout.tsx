import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeBootstrapScript } from "@/components/ui/ThemeToggle";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { config } from "@/config/app.config";

export const metadata: Metadata = {
  title: {
    default: `${config.brand.name} — ${config.brand.tagline}`,
    template: `%s · ${config.brand.name}`
  },
  description: config.brand.tagline,
  robots: { index: true, follow: true }
};

export const viewport = {
  themeColor: "#16A34A",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script
          // Sets data-theme before paint to prevent FOUC on reload.
          dangerouslySetInnerHTML={{ __html: ThemeBootstrapScript }}
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingChatButton />
      </body>
    </html>
  );
}
