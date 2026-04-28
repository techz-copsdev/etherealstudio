"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

/**
 * Wraps page content with the global studio chrome (Header, Footer, sticky CTA)
 * but hides the chrome on /preview/* routes so each template preview renders
 * as a standalone landing page.
 */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPreview = pathname?.startsWith("/preview/");

  if (isPreview) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
