import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building,
  Calculator,
  CheckCircle2,
  Compass,
  MapPin,
  MessageCircle,
  Ruler,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Citra — Properti & Real Estate",
  description: "Preview template properti dengan listing unit, simulasi KPR, dan jadwal site visit.",
};

const units = [
  { name: "The Linden · Type Bali", price: "Rp 2,8 M", area: "180 m²", bed: 3, status: "Available" },
  { name: "The Linden · Type Aria", price: "Rp 3,4 M", area: "220 m²", bed: 4, status: "Limited" },
  { name: "The Linden · Type Cassia", price: "Rp 4,6 M", area: "300 m²", bed: 4, status: "New" },
];

export default function PropertiCitraPreview() {
  return (
    <PreviewShell templateName="Citra — Properti & Real Estate">
      <section className="relative overflow-hidden bg-[#F8F6F1]">
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium text-[#0A1830]">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[#0A1830] text-[#0A1830]">
                <Building className="h-4 w-4" />
              </span>
              Citra Living
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#unit">Unit</a>
              <a href="#fasilitas">Fasilitas</a>
              <a href="#kpr">Simulasi KPR</a>
              <a href="#visit">Site Visit</a>
            </nav>
            <a
              href="#visit"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#0A1830] px-4 text-sm text-paper hover:bg-[#1F2C44]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Site Visit
            </a>
          </div>
        </header>

        <div className="container-wide grid grid-cols-1 gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#A07A3D]">
              <span className="h-px w-8 bg-[#A07A3D]" /> Phase 2 · Pre-Launch
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] text-[#0A1830] md:text-7xl">
              Hunian yang <span className="italic text-[#A07A3D]">layak diteruskan</span> kepada generasi berikutnya.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Cluster The Linden — 60 unit eksklusif di kawasan Bintaro Selatan. Tipe 3–4 kamar
              dengan langit-langit 3,2 m, taman privat, dan sertifikat HM langsung atas nama Anda.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#visit"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0A1830] px-6 font-medium text-paper hover:bg-[#1F2C44]"
              >
                <MessageCircle className="h-4 w-4" /> Atur site visit
              </a>
              <a
                href="#unit"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#0A1830]/20 px-6 font-medium text-[#0A1830] hover:bg-[#0A1830]/5"
              >
                Lihat tipe unit <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0A1830] via-[#1F2C44] to-[#0A1830] shadow-plate">
              <div className="flex h-full flex-col justify-end p-6 text-paper">
                <span className="text-[10px] uppercase tracking-widest2 text-[#DBBB6B]">
                  The Linden Showcase
                </span>
                <h3 className="mt-2 font-display text-2xl leading-tight">
                  Render arsitektur fasad selatan dengan kolam refleksi.
                </h3>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-ink/10 bg-paper p-5 shadow-plate md:block">
              <p className="text-[10px] uppercase tracking-widest2 text-ink-400">Cicilan mulai</p>
              <p className="mt-1 font-display text-2xl text-[#0A1830]">Rp 18,5 jt/bln</p>
              <p className="mt-1 text-xs text-ink-500">DP 20% · tenor 20 tahun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unit listings */}
      <section id="unit" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#A07A3D]">Tipe Unit</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#0A1830] md:text-5xl">
                Tiga tipe, satu standar premium.
              </h2>
            </div>
            <div className="flex gap-2 text-sm">
              {["Semua", "3 KT", "4 KT", "Available"].map((c, i) => (
                <button
                  key={c}
                  className={
                    "h-9 rounded-full border px-4 " +
                    (i === 0
                      ? "border-[#0A1830] bg-[#0A1830] text-paper"
                      : "border-ink/15 text-ink-700 hover:border-[#0A1830]")
                  }
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {units.map((u) => (
              <article
                key={u.name}
                className="group overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper transition-all hover:-translate-y-0.5 hover:shadow-plate"
              >
                <div className="aspect-[5/4] bg-gradient-to-br from-[#E5E0D2] via-[#F0E9D7] to-[#E5E0D2]" />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest2 text-[#A07A3D]">{u.status}</span>
                    <span className="text-xs text-ink-500">HM · ATR/BPN</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl text-[#0A1830]">{u.name}</h3>
                  <div className="mt-3 flex items-center gap-4 text-sm text-ink-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Ruler className="h-4 w-4" /> {u.area}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4" /> {u.bed} KT
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-ink/[0.06] pt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest2 text-ink-400">Harga mulai</p>
                      <p className="font-display text-lg text-[#0A1830]">{u.price}</p>
                    </div>
                    <a
                      href="#visit"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#A07A3D] hover:text-[#7E612F]"
                    >
                      Atur kunjungan <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KPR Calculator */}
      <section id="kpr" className="border-y border-ink/[0.06] bg-[#0A1830] text-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">Simulasi KPR</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Simulasi cicilan, transparan & cepat.
            </h2>
            <p className="mt-5 max-w-md text-paper/70">
              Geser harga, DP, dan tenor — kami berikan estimasi cicilan bulanan tanpa biaya admin.
              Siap diteruskan ke bank rekanan kami.
            </p>
            <ul className="mt-6 space-y-2 text-paper/85">
              {["Rekanan 4 bank · BCA, Mandiri, BNI, BTN", "Pendampingan dokumen", "Approval 7–14 hari kerja"].map(
                (t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#DBBB6B]" /> {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl bg-paper/[0.06] p-6 backdrop-blur md:col-span-7">
            <div className="flex items-center gap-2 text-[#DBBB6B]">
              <Calculator className="h-4 w-4" />
              <span className="text-[11px] uppercase tracking-widest2">Estimator</span>
            </div>
            <div className="mt-4 grid gap-5">
              <Slider label="Harga unit" value="Rp 3.400.000.000" />
              <Slider label="DP" value="20% · Rp 680.000.000" />
              <Slider label="Tenor" value="20 tahun" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-paper/5 p-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest2 text-paper/55">Cicilan/bln</p>
                <p className="mt-1 font-display text-2xl text-paper">Rp 22,4 jt</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest2 text-paper/55">Bunga floating</p>
                <p className="mt-1 font-display text-2xl text-paper">±5,75%</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-paper/55">
              Estimasi indikatif. Kondisi final mengikuti kebijakan bank pilihan.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="fasilitas" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#A07A3D]">Fasilitas Kawasan</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#0A1830] md:text-5xl">
            Cluster yang dibangun untuk gaya hidup tenang.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: Compass, name: "Clubhouse" },
              { icon: Compass, name: "Pool 25m" },
              { icon: Compass, name: "Jogging Track" },
              { icon: Compass, name: "Garden Privat" },
              { icon: Compass, name: "24/7 Security" },
              { icon: Compass, name: "Smart Access" },
              { icon: Compass, name: "EV Charger" },
              { icon: Compass, name: "Co-Living Lounge" },
            ].map((f) => (
              <div key={f.name} className="rounded-2xl border border-ink/[0.08] bg-[#F8F6F1] p-5">
                <f.icon className="h-5 w-5 text-[#A07A3D]" />
                <p className="mt-3 font-display text-base text-[#0A1830]">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — site visit */}
      <section id="visit" className="bg-[#F8F6F1]">
        <div className="container-wide py-20 md:py-28">
          <div className="rounded-3xl bg-[#0A1830] p-10 text-paper md:p-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">Site Visit</p>
                <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                  Datang langsung. Rasakan suasananya.
                </h2>
                <p className="mt-5 max-w-md text-paper/70">
                  Marketing in-house akan menjemput Anda di pintu cluster. Tour 45 menit, lengkap
                  dengan dokumen unit, simulasi KPR, dan brosur premium.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 text-paper/70">
                  <MapPin className="h-4 w-4 text-[#DBBB6B]" /> Bintaro Sektor 9, Tangerang Selatan
                </p>
              </div>
              <a
                href="https://wa.me/628123456789?text=Halo%20Citra%20Living%2C%20saya%20ingin%20mengatur%20site%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-[#DBBB6B] px-6 font-medium text-[#0A1830] hover:bg-[#E8C97D] md:self-end"
              >
                <MessageCircle className="h-4 w-4" /> Atur kunjungan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.06] bg-paper">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Citra Living · The Linden Bintaro.</p>
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

function Slider({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] uppercase tracking-widest2 text-paper/60">{label}</span>
        <span className="text-sm font-medium text-paper">{value}</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-paper/10">
        <div className="h-full w-2/3 rounded-full bg-[#DBBB6B]" />
      </div>
    </div>
  );
}
