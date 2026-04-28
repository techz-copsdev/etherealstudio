import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { site } from "@/lib/site";

/**
 * Wraps a preview page with a thin "studio bar" so the visitor always knows
 * they're inside the showroom and can either go back or chat to use the
 * template. The bar is thin, classy, and fully removable visually if we ever
 * decide to render previews in iframes for screenshot purposes.
 */
export function PreviewShell({
  templateName,
  children,
}: {
  templateName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="sticky top-0 z-50 border-b border-ink/[0.06] bg-paper/85 backdrop-blur">
        <div className="container-wide flex h-12 items-center justify-between gap-4">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-[12px] text-ink-500 hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Showroom</span>
            <span className="hidden text-ink-300 sm:inline">/</span>
            <span className="text-ink">{templateName}</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] uppercase tracking-widest2 text-ink-400 md:inline">
              {site.brand} · Preview Mode
            </span>
            <a
              href={whatsappLink(PRESETS.preview(templateName))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[12px] font-medium text-paper hover:bg-ink-800"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Gunakan template ini</span>
              <span className="sm:hidden">Pakai</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
