import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Globe2,
  LineChart,
  MessageCircle,
  ShieldCheck,
  Users2,
  Briefcase,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Jaya — Corporate Profile",
  description:
    "Preview template corporate profile dengan visi, layanan B2B, klien, studi kasus, dan kontak.",
};

export default function CorporateJayaPreview() {
  return (
    <PreviewShell templateName="Jaya — Corporate Profile">
      <section className="relative overflow-hidden bg-paper">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 0%, rgba(10,24,48,0.04) 100%), repeating-linear-gradient(90deg, rgba(10,24,48,0.04) 0px, rgba(10,24,48,0.04) 1px, transparent 1px, transparent 80px)",
          }}
          aria-hidden
        />
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium text-[#0A1830]">
              <span className="grid h-8 w-8 place-items-center rounded-sm bg-[#0A1830] text-paper">
                <Building2 className="h-4 w-4" />
              </span>
              JAYA Group
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#layanan">Layanan</a>
              <a href="#klien">Klien</a>
              <a href="#kasus">Studi Kasus</a>
              <a href="#kontak">Kontak</a>
            </nav>
            <a
              href="#kontak"
              className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-[#0A1830] px-4 text-sm text-paper hover:bg-[#1F2C44]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Hubungi
            </a>
          </div>
        </header>

        <div className="container-wide relative grid grid-cols-1 gap-12 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#A07A3D]">
              <span className="h-px w-8 bg-[#A07A3D]" /> Established 2008 · ISO 9001 & 27001
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.04] text-[#0A1830] md:text-7xl">
              Mitra strategis untuk{" "}
              <span className="gold-italic">pertumbuhan</span> bisnis Anda.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Jaya Group adalah konsultan B2B yang mendukung perusahaan menengah hingga enterprise
              dalam digitalisasi proses, governance, dan ekspansi pasar.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#kontak"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#0A1830] px-6 font-medium text-paper hover:bg-[#1F2C44]"
              >
                <MessageCircle className="h-4 w-4" /> Atur pertemuan
              </a>
              <a
                href="#kasus"
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-[#0A1830]/20 px-6 font-medium text-[#0A1830] hover:bg-[#0A1830]/5"
              >
                Lihat studi kasus <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink/[0.08] bg-ink/[0.08]">
              {[
                { v: "16+", l: "Tahun pengalaman" },
                { v: "120+", l: "Klien aktif" },
                { v: "9", l: "Negara penugasan" },
                { v: "240+", l: "Project selesai" },
              ].map((s) => (
                <div key={s.l} className="bg-paper p-7">
                  <div className="font-display text-3xl text-[#0A1830] md:text-4xl">{s.v}</div>
                  <div className="mt-2 text-xs uppercase tracking-widest2 text-ink-400">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="layanan" className="border-t border-ink/[0.06] bg-[#F4F5F8]">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#A07A3D]">Lini Layanan</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#0A1830] md:text-5xl">
            Empat lini layanan, terintegrasi sebagai satu solusi.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: LineChart, n: "Strategy & Advisory", d: "Strategic roadmap, market entry, M&A advisory." },
              { i: Globe2, n: "Digital Transformation", d: "Process automation, ERP/CRM, data platform." },
              { i: ShieldCheck, n: "Risk & Governance", d: "ISO 27001, audit IT, BCP/DRP, kepatuhan regulator." },
              { i: Users2, n: "Talent & Org Design", d: "Restrukturisasi, executive search, leadership development." },
            ].map((s) => (
              <article
                key={s.n}
                className="flex flex-col rounded-sm border border-ink/[0.08] bg-paper p-7 transition-all hover:border-[#0A1830]"
              >
                <s.i className="h-6 w-6 text-[#0A1830]" />
                <h3 className="mt-5 font-display text-xl text-[#0A1830]">{s.n}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{s.d}</p>
                <a
                  href="#kontak"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#A07A3D] hover:text-[#7E612F]"
                >
                  Pelajari <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="klien" className="bg-paper">
        <div className="container-wide py-20 md:py-24">
          <p className="text-[11px] uppercase tracking-widest2 text-[#A07A3D]">Dipercaya Oleh</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#0A1830] md:text-4xl">
            Lintas sektor — dari banking hingga manufacturing.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink/[0.08] bg-ink/[0.08] md:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="grid h-24 place-items-center bg-paper">
                <span className="font-display text-sm uppercase tracking-widest2 text-ink-400">
                  CLIENT {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section id="kasus" className="border-y border-ink/[0.06] bg-[#0A1830] text-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">Studi Kasus</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                Hasil terukur, bukan slide deck.
              </h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                tag: "Banking · Mid-size",
                title: "Digitalisasi proses kredit dari 14 hari → 36 jam",
                desc: "Otomasi underwriting + integrasi credit bureau. NPL turun 1,8% YoY.",
              },
              {
                tag: "Manufacturing",
                title: "ERP migration tanpa downtime untuk 3 plant",
                desc: "Migrasi SAP ke S/4HANA. Cycle time produksi −22%, biaya logistik −14%.",
              },
              {
                tag: "Retail · 120 outlet",
                title: "Loyalty program & data unification",
                desc: "Single customer view → repeat rate naik 38% dalam 9 bulan.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="rounded-sm border border-paper/10 bg-paper/[0.03] p-7 backdrop-blur transition-colors hover:bg-paper/[0.05]"
              >
                <span className="text-[10px] uppercase tracking-widest2 text-[#DBBB6B]">
                  {c.tag}
                </span>
                <h3 className="mt-3 font-display text-lg leading-snug">{c.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-paper/70">{c.desc}</p>
                <a href="#kontak" className="mt-6 inline-flex items-center gap-1 text-sm text-[#DBBB6B] hover:text-paper">
                  Diskusikan <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-widest2 text-[#A07A3D]">Mengapa Kami</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-[#0A1830] md:text-5xl">
              Konsultan yang <span className="gold-italic">turun ke lapangan.</span>
            </h2>
            <p className="mt-5 text-ink-600">
              Bukan PowerPoint pretensius. Tim senior kami terlibat langsung dari diagnostic hingga
              implementasi.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                "Senior consultant ≥ 10 tahun pengalaman",
                "Kombinasi konsultan + engineer in-house",
                "Pricing transparan, milestone-based",
                "Output measurable (KPI yang disepakati)",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-[#A07A3D]" />
                  <CheckCircle2 className="hidden" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="bg-[#F4F5F8]">
        <div className="container-wide py-20 md:py-28">
          <div className="rounded-sm bg-[#0A1830] p-10 text-paper md:p-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">Engagement</p>
                <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                  Mari diskusi 30 menit.
                </h2>
                <p className="mt-5 max-w-md text-paper/70">
                  Tanpa biaya. Anda akan mendapat 2–3 rekomendasi praktis yang bisa langsung dieksekusi
                  oleh tim Anda — terlepas Anda menggunakan kami atau tidak.
                </p>
              </div>
              <a
                href="https://wa.me/628123456789?text=Halo%20JAYA%20Group%2C%20saya%20mau%20diskusi%20advisory."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 self-start rounded-sm bg-[#DBBB6B] px-6 font-medium text-[#0A1830] hover:bg-[#E8C97D] md:self-end"
              >
                <MessageCircle className="h-4 w-4" /> Atur diskusi
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.06] bg-paper">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} JAYA Group · ISO 9001 & 27001 Certified.</p>
          <p>
            <Link href="/templates" className="text-[#A07A3D] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
