"use client";

import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "desktop" | "mobile";

export function PreviewEmbed({ slug, name }: { slug: string; name: string }) {
  const [mode, setMode] = useState<Mode>("desktop");

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper shadow-plate">
      <div className="flex items-center justify-between border-b border-ink/[0.08] bg-cream/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="ml-3 hidden text-[11px] text-ink-500 md:inline">
            etherealstudio.id/preview/{slug}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Tampilan desktop"
            onClick={() => setMode("desktop")}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-md transition-colors",
              mode === "desktop" ? "bg-ink text-paper" : "text-ink-500 hover:bg-ink/[0.05]",
            )}
          >
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Tampilan mobile"
            onClick={() => setMode("mobile")}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-md transition-colors",
              mode === "mobile" ? "bg-ink text-paper" : "text-ink-500 hover:bg-ink/[0.05]",
            )}
          >
            <Smartphone className="h-3.5 w-3.5" />
          </button>
          <Link
            href={`/preview/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] text-ink-600 hover:text-ink"
            title="Buka di tab baru"
          >
            <ExternalLink className="h-3 w-3" /> Buka penuh
          </Link>
        </div>
      </div>

      <div className="relative bg-cream/30 p-3 sm:p-5">
        <div
          className={cn(
            "mx-auto overflow-hidden rounded-xl border border-ink/[0.06] bg-paper shadow-soft transition-all duration-300",
            mode === "desktop" ? "w-full" : "w-[320px] max-w-full",
          )}
        >
          <div className="relative" style={{ aspectRatio: mode === "desktop" ? "16 / 11" : "9 / 16" }}>
            <iframe
              key={mode}
              src={`/preview/${slug}`}
              title={`${name} preview (${mode})`}
              loading="lazy"
              className="absolute inset-0 h-full w-full"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
