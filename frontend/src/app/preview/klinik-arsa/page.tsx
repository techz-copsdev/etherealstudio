import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  Star,
  Syringe,
  Activity,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Arsa — Klinik & Healthcare",
  description:
    "Preview template klinik dengan booking janji temu via WhatsApp, profil dokter, dan jadwal layanan.",
};

const services = [
  { icon: Stethoscope, name: "Konsultasi Umum", desc: "Pemeriksaan dokter umum dengan rekam medis terstruktur." },
  { icon: HeartPulse, name: "Kardiologi", desc: "EKG, echocardiography, dan konsultasi spesialis jantung." },
  { icon: Syringe, name: "Vaksinasi", desc: "Vaksinasi anak dan dewasa sesuai jadwal Kemenkes." },
  { icon: Activity, name: "Medical Check-Up", desc: "Paket MCU eksekutif, pre-employment, dan pranikah." },
];

const doctors = [
  { name: "dr. Ratih Kusuma, Sp.PD", role: "Spesialis Penyakit Dalam", schedule: "Sen–Jum · 09–13 WIB" },
  { name: "dr. Ardyansyah, Sp.JP", role: "Spesialis Jantung & Pembuluh Darah", schedule: "Sel & Kam · 14–18 WIB" },
  { name: "dr. Maulida Hapsari", role: "Dokter Umum", schedule: "Setiap hari · 09–20 WIB" },
];

const testimonials = [
  {
    name: "Bunda Anissa",
    role: "Pasien sejak 2022",
    quote:
      "Booking via WhatsApp cepat, antrian jelas, dokter sabar menjelaskan. Selalu jadi rujukan keluarga kami.",
  },
  {
    name: "Pak Daniel",
    role: "Pasien MCU eksekutif",
    quote:
      "MCU lengkap, hasil keluar 1 hari. Tim mengingatkan jadwal kontrol via WhatsApp — sangat profesional.",
  },
];

export default function KlinikArsaPreview() {
  return (
    <PreviewShell templateName="Arsa — Klinik & Healthcare">
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: "radial-gradient(circle at 20% 0%, #DDEBE2 0%, transparent 60%)" }}
          aria-hidden
        />
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium text-[#1F4A3E]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1F4A3E] text-paper">
                <HeartPulse className="h-4 w-4" />
              </span>
              Klinik Arsa
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#layanan" className="hover:text-[#1F4A3E]">Layanan</a>
              <a href="#dokter" className="hover:text-[#1F4A3E]">Dokter</a>
              <a href="#jadwal" className="hover:text-[#1F4A3E]">Jadwal</a>
              <a href="#lokasi" className="hover:text-[#1F4A3E]">Lokasi</a>
            </nav>
            <a
              href="#booking"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1F4A3E] px-4 text-sm text-paper hover:bg-[#163931]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Booking
            </a>
          </div>
        </header>

        <div className="container-wide relative grid grid-cols-1 gap-12 pb-20 pt-10 md:pb-28 md:pt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#1F4A3E]">
              <span className="h-px w-8 bg-[#1F4A3E]" /> Klinik Pratama Tersertifikasi
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] text-[#0E2A22] md:text-6xl">
              Layanan kesehatan yang bisa{" "}
              <span className="italic text-[#1F4A3E]">dipercaya</span>, dekat di hati keluarga.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Klinik Arsa hadir dengan dokter umum dan spesialis, peralatan modern, dan booking
              janji temu yang ringkas via WhatsApp. Antrian terkontrol, rekam medis terjaga.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#1F4A3E] px-6 font-medium text-paper hover:bg-[#163931]"
              >
                <MessageCircle className="h-4 w-4" /> Booking janji temu
              </a>
              <a
                href="#layanan"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#1F4A3E]/30 px-6 font-medium text-[#1F4A3E] hover:bg-[#1F4A3E]/5"
              >
                Lihat layanan <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { v: "12+", l: "Tahun pengalaman" },
                { v: "8", l: "Dokter spesialis" },
                { v: "20rb+", l: "Pasien terlayani" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl text-[#0E2A22] md:text-3xl">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest2 text-ink-400">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[24px] bg-[#1F4A3E] p-6 text-paper shadow-plate">
              <p className="text-[11px] uppercase tracking-widest2 text-[#A8C4B5]">
                Booking ringkas via WhatsApp
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight">
                Jadwal Anda, kami bantu siapkan dalam menit.
              </h3>
              <ol className="mt-6 space-y-4 text-[14px]">
                {[
                  "Pilih layanan & dokter",
                  "Isi form ringkas (nama, no. HP, keluhan)",
                  "Tim CS mengkonfirmasi via WhatsApp",
                  "Datang sesuai jadwal — tanpa antri panjang",
                ].map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-paper text-[11px] font-medium text-[#1F4A3E]">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <a
                href="#booking"
                className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-paper text-[#1F4A3E] hover:bg-paper/90"
              >
                <MessageCircle className="h-4 w-4" /> Booking sekarang
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3 text-[12px] text-ink-500">
              <ShieldCheck className="h-4 w-4 text-[#1F4A3E]" />
              Data Anda dijaga sesuai standar rekam medis
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="layanan" className="border-t border-ink/[0.06] bg-[#F4F8F5]">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A3E]">Layanan</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#0E2A22] md:text-5xl">
            Pelayanan komprehensif untuk seluruh keluarga.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#1F4A3E]/15 bg-[#1F4A3E]/15 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.name} className="bg-paper p-8">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1F4A3E]/10 text-[#1F4A3E]">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl text-[#0E2A22]">{s.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="dokter" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A3E]">Profil Dokter</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#0E2A22] md:text-5xl">
                Tim dokter berpengalaman.
              </h2>
            </div>
            <a href="#booking" className="text-sm text-[#1F4A3E] hover:underline">
              Lihat semua dokter →
            </a>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {doctors.map((d) => (
              <div key={d.name} className="rounded-2xl border border-ink/[0.08] bg-paper p-6">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1F4A3E] to-[#0E2A22]" />
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#1F4A3E]/10 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-[#1F4A3E]">
                  <CalendarClock className="h-3 w-3" /> {d.schedule}
                </div>
                <h3 className="mt-3 font-display text-lg text-[#0E2A22]">{d.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{d.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule + Testimonial split */}
      <section id="jadwal" className="border-t border-ink/[0.06] bg-[#0E2A22] text-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-widest2 text-[#A8C4B5]">Jadwal Operasional</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Buka setiap hari, kecuali libur nasional.
            </h2>
            <ul className="mt-8 space-y-3 text-[15px]">
              {[
                ["Senin – Jumat", "08.00 – 21.00 WIB"],
                ["Sabtu", "08.00 – 18.00 WIB"],
                ["Minggu", "09.00 – 15.00 WIB"],
                ["Layanan darurat", "24 jam (telepon)"],
              ].map(([d, t]) => (
                <li key={d} className="flex items-center justify-between border-b border-paper/10 pb-3">
                  <span className="text-paper/80">{d}</span>
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <a
              href="tel:+622112345678"
              className="mt-8 inline-flex items-center gap-2 text-[#DDB75F] hover:text-[#E8C97D]"
            >
              <Phone className="h-4 w-4" /> +62 21 1234 5678
            </a>
          </div>

          <div className="md:col-span-7 space-y-5">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-paper/[0.06] p-6 backdrop-blur">
                <div className="flex items-center gap-1 text-[#DDB75F]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-lg leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-paper/70">
                  <span className="text-paper">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Location + Booking CTA */}
      <section id="lokasi" className="bg-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A3E]">Lokasi</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-[#0E2A22] md:text-5xl">
              Mudah dijangkau dari pusat kota.
            </h2>
            <p className="mt-5 text-ink-600">
              Klinik Arsa berada di Jl. Sudirman Kav. 18, Jakarta Pusat. Akses MRT, parkir luas,
              dan ramah disabilitas.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1F4A3E]/20 px-4 py-2 text-sm text-[#1F4A3E]">
              <MapPin className="h-4 w-4" /> Jl. Sudirman Kav. 18, Jakarta Pusat
            </div>
          </div>
          <div id="booking" className="rounded-3xl bg-[#1F4A3E] p-8 text-paper md:p-12">
            <p className="text-[11px] uppercase tracking-widest2 text-[#A8C4B5]">Booking Janji Temu</p>
            <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
              Siap menerima Anda hari ini.
            </h3>
            <p className="mt-4 text-paper/80">
              Tim CS akan memastikan dokter yang tepat, jadwal terdekat, dan pengingat otomatis
              sebelum Anda datang.
            </p>
            <ul className="mt-6 space-y-2 text-[15px]">
              {["Konfirmasi dalam <30 menit di jam kerja", "Reminder H-1 via WhatsApp", "Tanpa biaya admin booking"].map(
                (t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#DDB75F]" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <a
              href="https://wa.me/628123456789?text=Halo%20Klinik%20Arsa%2C%20saya%20ingin%20booking%20janji%20temu."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-paper px-6 font-medium text-[#1F4A3E] hover:bg-paper/90"
            >
              <MessageCircle className="h-4 w-4" /> Booking via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.06] bg-[#F4F8F5]">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Klinik Arsa. Praktek kesehatan keluarga.</p>
          <p>
            <Link href="/templates" className="text-[#1F4A3E] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
