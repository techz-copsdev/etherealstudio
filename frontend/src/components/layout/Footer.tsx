import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Produk",
    links: [
      { href: "/templates", label: "Template Preview" },
      { href: "/services/website", label: "Custom Website" },
      { href: "/services/automation", label: "IT Automation" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-paper">
      <div className="container-wide grid grid-cols-1 gap-12 py-16 md:grid-cols-4 md:py-20">
        <div className="md:col-span-2 max-w-md">
          <Link href="/" className="text-ink" aria-label="Beranda">
            <Logo />
          </Link>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
            Premium digital service provider. Kami merancang landing page, website custom, dan
            IT automation untuk bisnis yang ingin tumbuh secara serius.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-ink-500">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 hover:text-ink"
            >
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <a
              href={whatsappLink(PRESETS.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-ink"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Customer Service
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
              {col.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-ink-700 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-100">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p>
            Premium service · Bukan marketplace ·
            <span className="ml-1 text-ink-700">Closing via direct chat</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
