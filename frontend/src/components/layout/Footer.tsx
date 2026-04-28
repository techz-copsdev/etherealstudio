import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Studio",
    links: [
      { href: "/about", label: "Tentang" },
      { href: "/portfolio", label: "Pekerjaan" },
      { href: "/contact", label: "Kontak" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { href: "/templates", label: "Templates" },
      { href: "/services/website", label: "Custom Website" },
      { href: "/services/automation", label: "IT Automation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 bg-paper">
      <div className="rule" />
      <div className="frame grid grid-cols-12 gap-x-8 gap-y-16 py-20 md:py-28">
        {/* Brand block */}
        <div className="col-span-12 md:col-span-7">
          <span className="marker">— Studio</span>
          <Link href="/" className="mt-5 block" aria-label="Beranda">
            <span className="display block text-5xl leading-[0.95] md:text-7xl lg:text-[112px]">
              <span className="display-italic">{site.brand.split(" ")[0]}</span>{" "}
              {site.brand.split(" ").slice(1).join(" ")}
            </span>
          </Link>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink/70">
            Studio digital independen. Kami merancang landing page,
            website custom, dan IT automation untuk bisnis yang ingin
            tumbuh tanpa kompromi pada detail.
          </p>
        </div>

        {/* Contact + Index */}
        <div className="col-span-12 grid grid-cols-2 gap-10 md:col-span-5 md:grid-cols-2">
          <div>
            <span className="marker">— Hubungi</span>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed">
              <li>
                <a
                  href={whatsappLink(PRESETS.general())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anchor"
                >
                  WhatsApp →
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="anchor">
                  {site.email}
                </a>
              </li>
              <li className="text-ink/55">
                Senin–Jumat
                <br />
                09.00–18.00 WIB
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <span className="marker">— {col.title}</span>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="anchor">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rule" />
      <div className="frame flex flex-col items-start justify-between gap-3 py-6 text-[12px] text-ink/55 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {site.brand} · Jakarta · Indonesia
        </p>
        <p className="font-mono uppercase tracking-widest3">
          Closing via direct chat — bukan checkout.
        </p>
      </div>
    </footer>
  );
}
