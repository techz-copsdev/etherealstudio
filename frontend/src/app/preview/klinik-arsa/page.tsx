import type { Metadata } from "next";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Arsa — Klinik & Healthcare",
  description:
    "Preview template klinik dengan booking janji temu via WhatsApp, profil dokter, dan jadwal layanan.",
};

const SAGE_BG = "#EAEEE6";
const SAGE_INK = "#161B16";
const SAGE_ACCENT = "#5F7058";
const SAGE_MUTE = "#7A8478";

const services = [
  {
    name: "Konsultasi Umum",
    desc: "Pemeriksaan dokter umum, screening awal, dan rekam medis terstruktur per kunjungan.",
    duration: "30 mnt",
  },
  {
    name: "Kardiologi",
    desc: "EKG, echocardiography, dan konsultasi spesialis jantung dengan rujukan internal.",
    duration: "60 mnt",
  },
  {
    name: "Vaksinasi",
    desc: "Vaksinasi anak dan dewasa sesuai jadwal Kemenkes — termasuk rappel dan booster.",
    duration: "20 mnt",
  },
  {
    name: "Medical Check-Up",
    desc: "Paket MCU eksekutif, pre-employment, dan pranikah. Hasil keluar dalam 24 jam.",
    duration: "120 mnt",
  },
  {
    name: "Estetika Medis",
    desc: "Perawatan kulit medis di bawah pengawasan dokter — bukan klinik kecantikan biasa.",
    duration: "45 mnt",
  },
];

const doctors = [
  {
    n: "01",
    name: "dr. Ratih Kusuma, Sp.PD",
    role: "Spesialis Penyakit Dalam",
    schedule: "Senin–Jumat · 09.00–13.00 WIB",
    bio: "15 tahun pengalaman di RS rujukan nasional. Fokus pada manajemen diabetes, hipertensi, dan penyakit autoimun.",
  },
  {
    n: "02",
    name: "dr. Ardyansyah Putra, Sp.JP",
    role: "Spesialis Jantung & Pembuluh Darah",
    schedule: "Selasa & Kamis · 14.00–18.00 WIB",
    bio: "Konsulen kardiologi intervensi. Praktik echocardiography dan stress test untuk skrining lanjutan.",
  },
  {
    n: "03",
    name: "dr. Maulida Hapsari",
    role: "Dokter Umum",
    schedule: "Setiap hari · 09.00–20.00 WIB",
    bio: "Dokter primer untuk konsultasi rutin, vaksinasi, dan rujukan ke spesialis sesuai kebutuhan pasien.",
  },
];

const testimonials = [
  {
    quote:
      "Booking via WhatsApp cepat, antrian jelas, dokter sabar menjelaskan. Sekarang jadi rujukan keluarga kami.",
    name: "Bunda Anissa",
    role: "Pasien sejak 2022",
  },
  {
    quote:
      "MCU lengkap, hasil keluar 1 hari. Tim mengingatkan jadwal kontrol via WhatsApp — tanpa drama.",
    name: "Pak Daniel",
    role: "Pasien MCU eksekutif",
  },
  {
    quote:
      "Yang saya cari adalah dokter yang mau mendengarkan. Saya menemukan itu di sini, dan saya tidak akan pindah.",
    name: "Ibu Prasetya",
    role: "Pasien geriatri",
  },
];

export default function KlinikArsaPreview() {
  return (
    <PreviewShell templateName="Arsa — Klinik & Healthcare">
      <div style={{ background: SAGE_BG, color: SAGE_INK }}>
        {/* —— Site bar (the clinic's own header) —— */}
        <div className="border-b" style={{ borderColor: "rgba(22,27,22,0.08)" }}>
          <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 lg:px-10">
            <a href="#" className="font-display text-[20px] tracking-tight" style={{ color: SAGE_INK }}>
              <em className="italic font-light">Klinik</em> Arsa
            </a>
            <nav className="hidden items-center gap-9 text-[13px] tracking-wide md:flex" style={{ color: SAGE_MUTE }}>
              <a href="#layanan" className="hover:opacity-100" style={{ opacity: 0.85 }}>Layanan</a>
              <a href="#dokter" className="hover:opacity-100" style={{ opacity: 0.85 }}>Dokter</a>
              <a href="#testimoni" className="hover:opacity-100" style={{ opacity: 0.85 }}>Testimoni</a>
              <a href="#booking" className="hover:opacity-100" style={{ opacity: 0.85 }}>Booking</a>
            </nav>
            <a
              href="#booking"
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-[12px] tracking-wide md:inline-flex"
              style={{ background: SAGE_INK, color: SAGE_BG }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: SAGE_ACCENT }} />
              Booking
            </a>
          </div>
        </div>

        {/* —— HERO (type-only, full-bleed) —— */}
        <section className="pt-16 md:pt-28 lg:pt-36">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8">
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  — Klinik / 2024
                </p>
              </div>
              <div className="col-span-12 md:col-span-10">
                <h1
                  className="font-display text-[40px] leading-[0.95] sm:text-[64px] md:text-[100px] lg:text-[136px]"
                  style={{ color: SAGE_INK }}
                >
                  Layanan kesehatan
                  <br />
                  yang <em className="italic font-light">dipercaya</em>,
                  <br />
                  dekat di hati keluarga.
                </h1>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-12 gap-x-8 md:mt-20">
              <div className="col-span-12 md:col-span-7 md:col-start-3">
                <p
                  className="text-[16px] leading-[1.55] md:text-[19px] md:leading-[1.5]"
                  style={{ color: "rgba(22,27,22,0.78)" }}
                >
                  Klinik pratama dengan dokter umum dan spesialis terverifikasi,
                  peralatan modern, dan booking janji temu yang ringkas via
                  WhatsApp. Antrian terkontrol, rekam medis terjaga, follow-up
                  yang manusiawi.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 md:mt-16">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-[13px] tracking-wide transition-all duration-500"
                style={{ background: SAGE_INK, color: SAGE_BG, transitionTimingFunction: "var(--easing)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: SAGE_ACCENT }} />
                Booking janji temu
                <span style={{ color: "rgba(234,238,230,0.55)" }}>→</span>
              </a>
              <a
                href="#layanan"
                className="inline-flex items-center gap-3 rounded-full border px-6 py-3 text-[13px] tracking-wide transition-all duration-500"
                style={{
                  borderColor: "rgba(22,27,22,0.18)",
                  color: SAGE_INK,
                  transitionTimingFunction: "var(--easing)",
                }}
              >
                Lihat layanan
                <span style={{ color: "rgba(22,27,22,0.4)" }}>→</span>
              </a>
            </div>
          </div>

          <div className="mt-24 md:mt-36">
            <div className="h-px w-full" style={{ background: "rgba(22,27,22,0.1)" }} />
          </div>
        </section>

        {/* —— 01 / STATEMENT —— */}
        <section className="py-24 md:py-36">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="grid grid-cols-12 gap-x-8 gap-y-10">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  — 01
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  Filosofi kami
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 md:col-start-4">
                <p
                  className="font-display text-[26px] leading-[1.18] md:text-[42px] md:leading-[1.12] lg:text-[52px]"
                  style={{ color: SAGE_INK }}
                >
                  Kami percaya kesehatan adalah percakapan, bukan transaksi.
                  Setiap pasien diberi waktu yang cukup, didengar dengan utuh,
                  dan dirawat dengan keilmuan dokter yang sesuai keluhannya —
                  bukan diburu menuju kasir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: "rgba(22,27,22,0.1)" }} />

        {/* —— 02 / LAYANAN (editorial list, not 3-col grid) —— */}
        <section id="layanan" className="py-24 md:py-32">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="mb-16 grid grid-cols-12 gap-x-8 md:mb-20">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  — 02
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  Layanan
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 md:col-start-4">
                <h2
                  className="font-display text-[36px] leading-[0.98] md:text-[68px] lg:text-[92px]"
                  style={{ color: SAGE_INK }}
                >
                  Lima pintu masuk,
                  <br />
                  satu standar <em className="italic font-light">perawatan</em>.
                </h2>
              </div>
            </div>

            <ol>
              {services.map((s, i) => (
                <li
                  key={s.name}
                  className="grid grid-cols-12 items-baseline gap-x-8 border-t py-7 md:py-10"
                  style={{ borderColor: "rgba(22,27,22,0.1)" }}
                >
                  <span className="col-span-2 font-mono text-[11px] tracking-[0.34em] md:col-span-1" style={{ color: "rgba(22,27,22,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="col-span-10 font-display text-[24px] leading-[1.05] md:col-span-4 md:text-[36px]"
                    style={{ color: SAGE_INK }}
                  >
                    {s.name}
                  </h3>
                  <p className="col-span-12 mt-3 max-w-md text-[14px] leading-relaxed md:col-span-5 md:col-start-6 md:mt-0 md:text-[15px]" style={{ color: "rgba(22,27,22,0.65)" }}>
                    {s.desc}
                  </p>
                  <span className="col-span-12 mt-2 font-mono text-[11px] uppercase tracking-[0.22em] md:col-span-2 md:col-start-11 md:mt-0 md:text-right" style={{ color: SAGE_MUTE }}>
                    {s.duration}
                  </span>
                </li>
              ))}
              <li className="border-t" style={{ borderColor: "rgba(22,27,22,0.1)" }} />
            </ol>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: "rgba(22,27,22,0.1)" }} />

        {/* —— 03 / DOKTER (3 cards horizontal but editorial, not generic team grid) —— */}
        <section id="dokter" className="py-24 md:py-32">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="mb-16 grid grid-cols-12 gap-x-8 md:mb-20">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  — 03
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  Dokter
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 md:col-start-4">
                <h2
                  className="font-display text-[36px] leading-[0.98] md:text-[68px] lg:text-[92px]"
                  style={{ color: SAGE_INK }}
                >
                  Tim dokter yang
                  <br />
                  benar-benar <em className="italic font-light">hadir</em>.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-8 gap-y-16">
              {doctors.map((d) => (
                <article key={d.n} className="col-span-12 md:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                    — Dokter {d.n}
                  </p>
                  <div
                    className="mt-5 aspect-[4/5] w-full overflow-hidden"
                    style={{ background: "rgba(22,27,22,0.06)" }}
                  >
                    <PortraitMark name={d.name} accent={SAGE_ACCENT} />
                  </div>
                  <h3
                    className="mt-6 font-display text-[22px] leading-[1.15] md:text-[26px]"
                    style={{ color: SAGE_INK }}
                  >
                    {d.name}
                  </h3>
                  <p className="mt-2 text-[13px] tracking-wide" style={{ color: SAGE_ACCENT }}>
                    {d.role}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "rgba(22,27,22,0.65)" }}>
                    {d.bio}
                  </p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: SAGE_MUTE }}>
                    {d.schedule}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: "rgba(22,27,22,0.1)" }} />

        {/* —— 04 / TESTIMONI (oversized pull-quotes, no card stack) —— */}
        <section id="testimoni" className="py-24 md:py-32">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="mb-16 grid grid-cols-12 gap-x-8 md:mb-20">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  — 04
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE_MUTE }}>
                  Suara pasien
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-8 gap-y-20">
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  className={
                    i === 0
                      ? "col-span-12 md:col-span-9 md:col-start-2"
                      : i === 1
                        ? "col-span-12 md:col-span-7 md:col-start-5"
                        : "col-span-12 md:col-span-8 md:col-start-2"
                  }
                >
                  <blockquote
                    className="font-display text-[26px] leading-[1.2] md:text-[40px] md:leading-[1.18] lg:text-[52px]"
                    style={{ color: SAGE_INK }}
                  >
                    <em className="italic font-light">“</em>
                    {t.quote}
                    <em className="italic font-light">”</em>
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: SAGE_MUTE }}>
                    {t.name} · {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full" style={{ background: "rgba(22,27,22,0.1)" }} />

        {/* —— 05 / BOOKING / LOKASI (final block) —— */}
        <section id="booking" className="py-24 md:py-36" style={{ background: SAGE_INK, color: SAGE_BG }}>
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="grid grid-cols-12 gap-x-8 gap-y-12">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: "rgba(234,238,230,0.55)" }}>
                  — 05
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: "rgba(234,238,230,0.55)" }}>
                  Booking &amp; Lokasi
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 md:col-start-4">
                <h2 className="font-display text-[40px] leading-[0.98] md:text-[80px] lg:text-[120px]">
                  Mau bertemu{" "}
                  <em className="italic font-light">kapan</em>?
                </h2>

                <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-10">
                  <div className="col-span-12 md:col-span-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: "rgba(234,238,230,0.55)" }}>
                      — Hubungi
                    </p>
                    <ul className="mt-5 space-y-3 text-[15px] leading-relaxed">
                      <li>
                        <a href="https://wa.me/628123456789" className="hover:underline" style={{ color: SAGE_BG }}>
                          WhatsApp · 0812-3456-789 →
                        </a>
                      </li>
                      <li style={{ color: "rgba(234,238,230,0.7)" }}>+62 21 555 9090</li>
                      <li style={{ color: "rgba(234,238,230,0.7)" }}>halo@klinikarsa.id</li>
                    </ul>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: "rgba(234,238,230,0.55)" }}>
                      — Lokasi
                    </p>
                    <p className="mt-5 text-[15px] leading-relaxed">
                      Jl. Cipete Raya 12,<br />
                      Cilandak Barat, Jakarta Selatan
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(234,238,230,0.55)" }}>
                      Senin–Sabtu · 09.00–20.00<br />
                      Minggu · 09.00–14.00
                    </p>
                  </div>
                </div>

                <div className="mt-14 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/628123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-[13px] tracking-wide transition-all duration-500"
                    style={{ background: SAGE_BG, color: SAGE_INK, transitionTimingFunction: "var(--easing)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: SAGE_ACCENT }} />
                    Booking via WhatsApp
                    <span style={{ color: "rgba(22,27,22,0.4)" }}>→</span>
                  </a>
                  <a
                    href="tel:+6221555909"
                    className="inline-flex items-center gap-3 rounded-full border px-6 py-3 text-[13px] tracking-wide"
                    style={{ borderColor: "rgba(234,238,230,0.25)", color: SAGE_BG }}
                  >
                    Telepon klinik
                    <span style={{ color: "rgba(234,238,230,0.4)" }}>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* —— Footer —— */}
        <footer className="py-10" style={{ background: SAGE_BG }}>
          <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-3 px-6 text-[12px] md:flex-row md:items-center lg:px-10" style={{ color: SAGE_MUTE }}>
            <p>© {new Date().getFullYear()} Klinik Arsa · Cilandak, Jakarta Selatan</p>
            <p className="font-mono uppercase tracking-[0.34em]">Surat Izin Praktik Lengkap · BPJS Mitra</p>
          </div>
        </footer>
      </div>
    </PreviewShell>
  );
}

/**
 * Quiet portrait mark — instead of placeholder photo, draw a calm
 * geometric monogram from the doctor's initials. Feels intentional,
 * not "stock photo missing".
 */
function PortraitMark({ name, accent }: { name: string; accent: string }) {
  const initials = name
    .replace(/^dr\.\s*/i, "")
    .split(/\s+/)
    .map((w) => w.replace(/[.,]/g, "")[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full">
      <defs>
        <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill="rgba(22,27,22,0.16)" />
        </pattern>
      </defs>
      <rect width="200" height="250" fill="rgba(22,27,22,0.04)" />
      <rect width="200" height="250" fill="url(#grain)" />
      <circle cx="100" cy="100" r="48" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="0.8" />
      <text
        x="100"
        y="116"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="44"
        fontStyle="italic"
        fontWeight="300"
        fill="#161B16"
      >
        {initials}
      </text>
      <line x1="40" y1="200" x2="160" y2="200" stroke="rgba(22,27,22,0.18)" strokeWidth="0.6" />
      <text
        x="100"
        y="220"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="7"
        letterSpacing="3"
        fill="rgba(22,27,22,0.55)"
      >
        ARSA · STAFF
      </text>
    </svg>
  );
}
