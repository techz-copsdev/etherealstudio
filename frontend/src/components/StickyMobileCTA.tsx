"use client";

import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-4 bottom-4 z-30 transition-all duration-700 pb-safe-bottom ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      aria-hidden={!show}
    >
      <a
        href={whatsappLink(PRESETS.general())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-full bg-ink px-5 py-3.5 text-paper"
      >
        <span className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[13px] tracking-wide">Konsultasi via WhatsApp</span>
        </span>
        <span className="text-paper/60">→</span>
      </a>
    </div>
  );
}
