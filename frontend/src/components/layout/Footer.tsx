import Link from "next/link";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Layanan",
    links: [
      { href: "/templates", label: "Template Showroom" },
      { href: "/services/website", label: "Custom Website" },
      { href: "/services/automation", label: "IT Automation" },
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
    <footer className="relative mt-12 overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 grid-bg-dark opacity-40" aria-hidden />
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" aria-hidden />

      <div className="container-wide relative grid grid-cols-1 gap-14 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Link href="/" className="text-paper" aria-label="Beranda">
            <Logo variant="dark" />
          </Link>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/70">
            Premium digital service provider. Kami merancang landing page, website custom, dan
            IT automation untuk bisnis yang ingin tumbuh secara serius.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-paper/80">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 hover:text-accent-300"
            >
              <Mail className="h-4 w-4 text-accent-400" /> {site.email}
            </a>
            <a
              href={whatsappLink(PRESETS.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:text-accent-300"
            >
              <MessageCircle className="h-4 w-4 text-accent-400" /> WhatsApp Customer Service
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-10 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-medium uppercase tracking-widest2 text-accent-400">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-[15px] text-paper/85 hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest2 text-accent-400">
              Operasional
            </h4>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/75">
              Senin–Jumat<br />09.00–18.00 WIB
            </p>
            <p className="mt-3 text-[13px] text-paper/55">
              Project remote untuk klien di seluruh Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-6 text-xs text-paper/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
            Premium service · Closing via direct chat, bukan checkout buta.
          </p>
        </div>
      </div>
    </footer>
  );
}
