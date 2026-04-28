import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarHeart,
  Camera,
  Crown,
  Flower2,
  GalleryHorizontalEnd,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Fajar — Wedding Organizer",
  description: "Preview template wedding organizer dengan paket all-in, gallery dokumentasi, dan konsultasi.",
};

const packages = [
  { name: "Intimate", price: "Mulai Rp 38 jt", desc: "≤ 80 tamu, dekorasi minimalis, dokumentasi candid." },
  { name: "Signature", price: "Mulai Rp 75 jt", desc: "150 tamu, dekorasi tematik, dokumentasi sinematik." },
  { name: "Heritage", price: "Mulai Rp 145 jt", desc: "300 tamu, full venue, MC + entertainment." },
];

export default function WeddingFajarPreview() {
  return (
    <PreviewShell templateName="Fajar — Wedding Organizer">
      <section className="relative overflow-hidden bg-[#F5EAE6]">
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium italic text-[#5C2424]">
              <Heart className="h-5 w-5 text-[#9C3D3D]" /> Fajar & Co.
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#paket">Paket</a>
              <a href="#galeri">Galeri</a>
              <a href="#proses">Proses</a>
              <a href="#kontak">Konsultasi</a>
            </nav>
            <a
              href="#kontak"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#5C2424] px-4 text-sm text-paper hover:bg-[#7A2E2E]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Konsultasi
            </a>
          </div>
        </header>

        <div className="container-wide grid grid-cols-1 gap-12 pb-24 pt-16 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#9C3D3D]">
              <span className="h-px w-8 bg-[#9C3D3D]" /> Wedding Organizer · Est. 2017
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.0] text-[#3A1818] md:text-7xl">
              Hari pernikahan, <span className="italic text-[#9C3D3D]">tenang & berkesan,</span> tanpa Anda lelah.
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Tim WO kami menangani konsep, dekorasi, vendor, hingga rundown. Anda fokus pada
              momen — kami pastikan semua berjalan sebagaimana mestinya.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#kontak"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#5C2424] px-6 font-medium text-paper hover:bg-[#7A2E2E]"
              >
                <MessageCircle className="h-4 w-4" /> Konsultasi gratis
              </a>
              <a
                href="#paket"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#5C2424]/30 px-6 font-medium text-[#5C2424] hover:bg-[#5C2424]/5"
              >
                Lihat paket <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="aspect-[3/4] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#9C3D3D] via-[#5C2424] to-[#3A1818]">
              <div className="flex h-full flex-col justify-end p-7 text-paper">
                <Sparkles className="h-5 w-5 text-[#E8CFA9]" />
                <h3 className="mt-3 font-display text-2xl italic leading-tight">
                  &ldquo;Kami menikmati hari kami, tim Fajar menjaga sisanya.&rdquo;
                </h3>
                <p className="mt-3 text-sm text-paper/70">— Inka & Reza · 2024</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-ink/10 bg-paper p-4 shadow-plate md:block">
              <Crown className="h-5 w-5 text-[#9C3D3D]" />
              <p className="mt-2 font-display text-sm text-[#3A1818]">
                420+ pasangan diberkati
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="paket" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#9C3D3D]">Paket All-in</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#3A1818] md:text-5xl">
            Tiga paket, dirancang sesuai skala acara.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((p, i) => (
              <article
                key={p.name}
                className="group relative flex h-full flex-col rounded-3xl border border-ink/[0.08] bg-[#F5EAE6] p-7 transition-all hover:-translate-y-0.5 hover:bg-paper hover:shadow-plate"
              >
                <Flower2 className="h-6 w-6 text-[#9C3D3D]" />
                <span className="mt-5 text-[11px] uppercase tracking-widest2 text-ink-400">
                  {String(i + 1).padStart(2, "0")} · Paket
                </span>
                <h3 className="mt-2 font-display text-2xl italic text-[#3A1818]">{p.name}</h3>
                <p className="mt-2 font-display text-lg text-[#9C3D3D]">{p.price}</p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">{p.desc}</p>
                <a
                  href="#kontak"
                  className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-[#5C2424] hover:text-[#7A2E2E]"
                >
                  Diskusikan paket ini <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeri" className="bg-[#F5EAE6]">
        <div className="container-wide py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#9C3D3D]">Real Wedding</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#3A1818] md:text-5xl">
                Beberapa cerita terakhir yang kami rangkai.
              </h2>
            </div>
            <span className="hidden text-sm text-ink-500 md:inline-flex md:items-center md:gap-1.5">
              <Camera className="h-4 w-4" /> 8.500+ foto
            </span>
          </div>
          <div className="mt-12 grid grid-cols-6 gap-3">
            {[
              "col-span-3 row-span-2 aspect-[3/4]",
              "col-span-3 aspect-[3/2]",
              "col-span-2 aspect-square",
              "col-span-2 aspect-square",
              "col-span-2 aspect-square",
              "col-span-3 aspect-[3/2]",
              "col-span-3 aspect-[3/2]",
            ].map((c, i) => (
              <div
                key={i}
                className={
                  c +
                  " overflow-hidden rounded-2xl bg-gradient-to-br from-[#C97B7B] via-[#9C3D3D] to-[#5C2424]"
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="proses" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#9C3D3D]">Proses</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#3A1818] md:text-5xl">
            Empat tahap, terstruktur tapi tetap personal.
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/[0.06] bg-ink/[0.06] md:grid-cols-4">
            {[
              { k: "01", t: "Konsultasi", d: "Diskusi konsep, tanggal, dan budget — tanpa biaya." },
              { k: "02", t: "Mood & Vendor", d: "Mood board, pemilihan vendor, dan negosiasi paket." },
              { k: "03", t: "Eksekusi", d: "Koordinasi vendor, fitting, rehearsal, dan timeline H-1." },
              { k: "04", t: "Hari H & Setelah", d: "On-ground team, dokumentasi, hingga souvenir digital." },
            ].map((s) => (
              <li key={s.k} className="bg-paper p-7">
                <div className="text-xs uppercase tracking-widest2 text-ink-400">{s.k}</div>
                <h3 className="mt-3 font-display text-xl italic text-[#3A1818]">{s.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="bg-[#3A1818] text-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#E8CFA9]">Konsultasi</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                Sudah punya tanggal? <br />
                <span className="italic text-[#E8CFA9]">Mari kita siapkan.</span>
              </h2>
              <p className="mt-5 max-w-md text-paper/70">
                Konsultasi awal 60 menit · gratis. Boleh datang ke studio Senayan atau call online.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-paper/70">
                <CalendarHeart className="h-4 w-4 text-[#E8CFA9]" /> Tersedia weekend by appointment
              </p>
            </div>
            <a
              href="https://wa.me/628123456789?text=Halo%20Fajar%20%26%20Co%2C%20kami%20mau%20konsultasi%20wedding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-[#E8CFA9] px-6 font-medium text-[#3A1818] hover:bg-[#F1DDB7] md:self-end"
            >
              <MessageCircle className="h-4 w-4" /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-paper/10 bg-[#3A1818] text-paper">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-paper/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Fajar & Co. Wedding Organizer.</p>
          <p>
            <Link href="/templates" className="text-[#E8CFA9] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
      <span className="sr-only">
        <GalleryHorizontalEnd /> {/* keep import used */}
      </span>
    </PreviewShell>
  );
}
