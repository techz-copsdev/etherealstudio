import Link from "next/link";
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
      <div className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex h-11 max-w-[1480px] items-center justify-between gap-4 px-6 lg:px-12">
          <Link
            href="/templates"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-ink/55 hover:text-ink"
          >
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">{site.brand}</span>
            <span className="hidden text-ink/30 sm:inline">/</span>
            <span className="text-ink">{templateName}</span>
          </Link>
          <a
            href={whatsappLink(PRESETS.preview(templateName))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-ink hover:text-accent"
          >
            <span className="hidden sm:inline">Gunakan template</span>
            <span className="sm:hidden">Pakai</span>
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="rule" />
      </div>
      {children}
    </div>
  );
}
