"use client";

import { MessageCircle, ArrowRight } from "lucide-react";
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
      className={`md:hidden fixed inset-x-3 bottom-3 z-30 transition-all duration-300 ease-out pb-safe-bottom ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!show}
    >
      <a
        href={whatsappLink(PRESETS.general())}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-full bg-ink px-5 py-3.5 text-paper shadow-plate ring-1 ring-accent-500/30"
      >
        <span className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-500 text-ink">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span className="text-sm leading-tight">
            <span className="block text-[10px] uppercase tracking-widest2 text-accent-400">
              Konsultasi
            </span>
            <span className="block font-medium">Chat Customer Service</span>
          </span>
        </span>
        <ArrowRight className="h-4 w-4 text-paper/70 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
