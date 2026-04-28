import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Hammer,
  HardHat,
  MessageCircle,
  Ruler,
  Scale,
  Truck,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Batas — Kontraktor & Konstruksi",
  description:
    "Preview template kontraktor dengan kalkulator estimasi, portofolio project, dan sertifikasi.",
};

const projects = [
  { name: "Rumah Tinggal · Bintaro", area: "320 m²", year: "2024" },
  { name: "Renovasi Cafe · Kemang", area: "180 m²", year: "2023" },
  { name: "Gudang Logistik · Tangerang", area: "1.200 m²", year: "2023" },
  { name: "Office Fit-Out · SCBD", area: "640 m²", year: "2024" },
];

const certifications = [
  { name: "SBU Konstruksi K-2", issuer: "LPJK Nasional" },
  { name: "ISO 9001:2015", issuer: "Quality Management" },
  { name: "K3 Konstruksi", issuer: "Kemnaker RI" },
  { name: "HKI Anggota Resmi", issuer: "Himpunan Kontraktor" },
];

export default function KontraktorBatasPreview() {
  return (
    <PreviewShell templateName="Batas — Kontraktor & Konstruksi">
      <section className="relative overflow-hidden bg-[#0F0E0A] text-[#F2EEE6]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 16px)",
          }}
          aria-hidden
        />
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium">
              <span className="grid h-8 w-8 place-items-center rounded-sm bg-[#C9A961] text-[#0F0E0A]">
                <HardHat className="h-4 w-4" />
              </span>
              BATAS Kontraktor
            </div>
            <nav className="hidden items-center gap-7 text-sm text-[#F2EEE6]/70 md:flex">
              <a href="#layanan">Layanan</a>
              <a href="#proyek">Proyek</a>
              <a href="#estimator">Estimator</a>
              <a href="#kontak">Kontak</a>
            </nav>
            <a
              href="#estimator"
              className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-[#C9A961] px-4 text-sm font-medium text-[#0F0E0A] hover:bg-[#D9BC7A]"
            >
              Estimasi RAB
            </a>
          </div>
        </header>

        <div className="container-wide relative grid grid-cols-1 gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#C9A961]">
              <span className="h-px w-8 bg-[#C9A961]" /> Sejak 2009 · 240+ Proyek
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.02] md:text-7xl">
              Bangun yang <span className="italic text-[#C9A961]">tahan lama</span>,<br />
              dikerjakan oleh tim yang serius.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#F2EEE6]/70 md:text-lg">
              Kontraktor general untuk rumah tinggal, renovasi commercial, dan fit-out office.
              Estimasi RAB transparan, timeline terkunci, dan progress harian via WhatsApp.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#estimator"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#C9A961] px-6 font-medium text-[#0F0E0A] hover:bg-[#D9BC7A]"
              >
                <Ruler className="h-4 w-4" /> Hitung estimasi RAB
              </a>
              <a
                href="#proyek"
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-[#F2EEE6]/30 px-6 font-medium hover:bg-[#F2EEE6]/5"
              >
                Lihat portofolio <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {projects.slice(0, 4).map((p, i) => (
                <div
                  key={p.name}
                  className="aspect-[4/3] rounded-sm border border-[#F2EEE6]/10 bg-gradient-to-br from-[#1A1814] to-[#0F0E0A] p-4"
                >
                  <span className="text-[10px] uppercase tracking-widest2 text-[#C9A961]">
                    {String(i + 1).padStart(2, "0")} · {p.year}
                  </span>
                  <div className="mt-2 font-display text-sm leading-tight">{p.name}</div>
                  <div className="mt-1 text-[10px] text-[#F2EEE6]/50">{p.area}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="layanan" className="bg-[#F2EEE6] text-[#0F0E0A]">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7A6428]">Lini Pekerjaan</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
            Lima lini pekerjaan, satu standar pengerjaan.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 md:grid-cols-3">
            {[
              { icon: Building2, name: "Rumah Tinggal", desc: "Bangun baru, renovasi total, dan extension." },
              { icon: Hammer, name: "Renovasi Komersial", desc: "Cafe, restoran, retail, dan studio." },
              { icon: Truck, name: "Gudang & Industri", desc: "Workshop, gudang logistik, dan light industrial." },
              { icon: Ruler, name: "Office Fit-Out", desc: "Interior office turn-key dengan timeline ketat." },
              { icon: Award, name: "MEP & Finishing", desc: "Instalasi mekanikal, elektrikal, dan finishing detail." },
              { icon: Scale, name: "Konsultasi RAB", desc: "Pendampingan RAB & value engineering." },
            ].map((s) => (
              <div key={s.name} className="bg-[#F2EEE6] p-8">
                <s.icon className="h-6 w-6 text-[#7A6428]" />
                <h3 className="mt-5 font-display text-xl">{s.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section id="estimator" className="border-y border-ink/10 bg-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-widest2 text-[#7A6428]">Estimator RAB</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              3 menit, dapat estimasi awal.
            </h2>
            <p className="mt-5 text-ink-600">
              Isi form ringkas. Tim kami mengirim ringkasan estimasi dan rencana tinjauan lokasi
              ke WhatsApp Anda.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-ink-700">
              {["RAB awal · range realistik", "Timeline pengerjaan", "Kebutuhan dokumen IMB/PBG"].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7A6428]" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <form className="space-y-4 rounded-sm border border-ink/10 bg-[#F2EEE6] p-8 md:col-span-7">
            <Field label="Tipe project" placeholder="Rumah tinggal / renovasi / office / lain-lain" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Luas bangunan (m²)" placeholder="cth. 180" type="number" />
              <Field label="Lokasi" placeholder="Kota / wilayah" />
            </div>
            <Field label="Nama" placeholder="Nama Anda" />
            <Field label="No. WhatsApp" placeholder="cth. 0812-3456-7890" />
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#0F0E0A] font-medium text-[#F2EEE6] hover:bg-[#1A1814]"
            >
              <MessageCircle className="h-4 w-4" /> Kirim ke WhatsApp
            </button>
            <p className="text-[11px] text-ink-500">
              Estimasi awal · bukan penawaran final. Kunjungan lokasi gratis untuk wilayah Jabodetabek.
            </p>
          </form>
        </div>
      </section>

      {/* Projects gallery */}
      <section id="proyek" className="bg-[#0F0E0A] text-[#F2EEE6]">
        <div className="container-wide py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#C9A961]">Portofolio</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                Beberapa pekerjaan terakhir.
              </h2>
            </div>
            <span className="hidden text-sm text-[#F2EEE6]/60 md:inline">240+ proyek selesai</span>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <article key={p.name} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br from-[#1A1814] to-[#0F0E0A]">
                  <div className="flex h-full items-end p-5">
                    <span className="text-5xl font-display text-[#C9A961]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="mt-1 text-xs text-[#F2EEE6]/55">{p.area} · {p.year}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-[#F2EEE6]">
        <div className="container-wide py-20 md:py-24">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7A6428]">Sertifikasi & Keanggotaan</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Legalitas & standar keselamatan terjaga.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {certifications.map((c) => (
              <div key={c.name} className="rounded-sm border border-ink/10 bg-paper p-5">
                <Award className="h-5 w-5 text-[#7A6428]" />
                <h3 className="mt-3 font-display text-base">{c.name}</h3>
                <p className="mt-1 text-xs text-ink-500">{c.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="rounded-sm bg-[#0F0E0A] p-10 text-[#F2EEE6] md:p-16">
            <p className="text-[11px] uppercase tracking-widest2 text-[#C9A961]">Diskusi Project</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
              Sudah punya gambaran project Anda?
            </h2>
            <p className="mt-5 max-w-2xl text-[#F2EEE6]/70">
              Kirim brief singkat ke WhatsApp kami — Anda akan mendapat panggilan tinjauan lokasi
              dalam 24 jam kerja.
            </p>
            <a
              href="https://wa.me/628123456789?text=Halo%20BATAS%2C%20saya%20ingin%20diskusi%20project%20konstruksi."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-sm bg-[#C9A961] px-6 font-medium text-[#0F0E0A] hover:bg-[#D9BC7A]"
            >
              <MessageCircle className="h-4 w-4" /> Diskusikan project
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-[#F2EEE6]">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} BATAS Kontraktor. Build to last.</p>
          <p>
            <Link href="/templates" className="text-[#7A6428] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-ink-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 block h-11 w-full rounded-sm border border-ink/15 bg-paper px-4 text-[15px] outline-none transition-colors focus:border-[#7A6428]"
      />
    </label>
  );
}
