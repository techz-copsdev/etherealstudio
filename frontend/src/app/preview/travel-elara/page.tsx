import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Camera,
  Compass,
  MapPin,
  MessageCircle,
  Plane,
  Sun,
  Users,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Elara — Travel & Tour",
  description: "Preview template travel dengan paket wisata, itinerary, dan booking via WhatsApp.",
};

const trips = [
  {
    name: "Bali Hidden Gems · 4D3N",
    price: "Rp 4.250.000",
    unit: "/pax",
    duration: "4 hari 3 malam",
    next: "12–15 Mei",
    spots: "3 slot tersisa",
    tag: "Paling diminati",
  },
  {
    name: "Lombok Sunrise Tour · 5D4N",
    price: "Rp 5.850.000",
    unit: "/pax",
    duration: "5 hari 4 malam",
    next: "20–24 Mei",
    spots: "Open booking",
    tag: "Honeymoon ready",
  },
  {
    name: "Yogyakarta Heritage · 3D2N",
    price: "Rp 2.950.000",
    unit: "/pax",
    duration: "3 hari 2 malam",
    next: "18–20 Mei",
    spots: "5 slot",
    tag: "Family friendly",
  },
];

const itinerary = [
  { d: "Day 01", t: "Tiba di Denpasar", desc: "Welcome drink, transfer ke villa, sunset di Tanah Lot." },
  { d: "Day 02", t: "Ubud Cultural Day", desc: "Sacred Monkey Forest, sawah Tegalalang, art village Mas." },
  { d: "Day 03", t: "Hidden Beach", desc: "Pantai Nyang Nyang, Uluwatu cliff, Kecak Dance." },
  { d: "Day 04", t: "Souvenir & Pulang", desc: "Sukawati market, transfer airport, drop off." },
];

export default function TravelElaraPreview() {
  return (
    <PreviewShell templateName="Elara — Travel & Tour">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2A3E] via-[#1F4A66] to-[#0F2A3E] text-paper">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.18) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(219,187,107,0.2) 0%, transparent 35%)",
          }}
          aria-hidden
        />
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#DBBB6B] text-[#0F2A3E]">
                <Plane className="h-4 w-4" />
              </span>
              Elara Travel
            </div>
            <nav className="hidden items-center gap-7 text-sm text-paper/75 md:flex">
              <a href="#trip">Open Trip</a>
              <a href="#itinerary">Itinerary</a>
              <a href="#galeri">Galeri</a>
              <a href="#booking">Booking</a>
            </nav>
            <a
              href="#booking"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#DBBB6B] px-4 text-sm font-medium text-[#0F2A3E] hover:bg-[#E8C97D]"
            >
              Book Trip
            </a>
          </div>
        </header>

        <div className="container-wide relative grid grid-cols-1 gap-12 pb-24 pt-16 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">
              <span className="h-px w-8 bg-[#DBBB6B]" /> Open Trip · Bali · Lombok · Yogyakarta
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.02] md:text-7xl">
              Petualangan yang <span className="italic text-[#DBBB6B]">layak diingat,</span> bukan sekadar dilewatkan.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-paper/75 md:text-lg">
              Elara Travel menyusun perjalanan kelompok kecil — maks. 12 peserta — dengan kurator
              lokal, akomodasi pilihan, dan momen yang tidak Anda dapat dari paket biasa.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#DBBB6B] px-6 font-medium text-[#0F2A3E] hover:bg-[#E8C97D]"
              >
                <MessageCircle className="h-4 w-4" /> Konsultasi travel
              </a>
              <a
                href="#trip"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-paper/30 px-6 font-medium hover:bg-paper/10"
              >
                Open trip terdekat <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { i: Users, v: "Max 12", l: "peserta/trip" },
                { i: Compass, v: "30+", l: "destinasi" },
                { i: Sun, v: "98%", l: "repeat client" },
              ].map((s) => (
                <div key={s.l} className="border-l border-paper/15 pl-4">
                  <s.i className="h-4 w-4 text-[#DBBB6B]" />
                  <div className="mt-2 font-display text-2xl">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest2 text-paper/55">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1F4A66] via-[#2D6A8C] to-[#0F2A3E]">
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-paper/[0.08] p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-[#DBBB6B]" /> Tegalalang Rice Terrace
                  </span>
                  <span className="text-xs text-paper/60">Ubud · Bali</span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug">
                  &ldquo;Pemandangan paling magis dari trip ini.&rdquo; — Putri H.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trips */}
      <section id="trip" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A66]">Open Trip Terdekat</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#0F2A3E] md:text-5xl">
                Tiga keberangkatan bulan ini.
              </h2>
            </div>
            <div className="flex gap-2 text-sm">
              {["Mei", "Juni", "Juli"].map((m, i) => (
                <button
                  key={m}
                  type="button"
                  className={
                    "h-9 rounded-full border px-4 " +
                    (i === 0
                      ? "border-[#0F2A3E] bg-[#0F2A3E] text-paper"
                      : "border-ink/15 text-ink-700 hover:border-[#0F2A3E]")
                  }
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {trips.map((t) => (
              <article
                key={t.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper transition-all hover:-translate-y-0.5 hover:shadow-plate"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#2D6A8C] via-[#1F4A66] to-[#0F2A3E]" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="self-start rounded-full bg-[#DBBB6B]/15 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-[#7E612F]">
                    {t.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-[#0F2A3E]">{t.name}</h3>
                  <ul className="mt-4 space-y-1.5 text-[13.5px] text-ink-600">
                    <li className="flex items-center gap-2">
                      <CalendarRange className="h-4 w-4 text-[#1F4A66]" /> {t.duration}
                    </li>
                    <li className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-[#1F4A66]" /> Berikutnya: {t.next}
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#1F4A66]" /> {t.spots}
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/[0.06] pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest2 text-ink-400">Mulai</p>
                      <p className="font-display text-lg text-[#0F2A3E]">{t.price}<span className="text-sm text-ink-500">{t.unit}</span></p>
                    </div>
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#1F4A66] hover:text-[#0F2A3E]"
                    >
                      Book <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="border-y border-ink/[0.06] bg-[#F2EDE5]">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A66]">Itinerary</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-[#0F2A3E] md:text-5xl">
              Bali Hidden Gems · 4D3N
            </h2>
            <p className="mt-5 text-ink-600">
              Bukan jalur turistik standar. Kurator kami menyusun jalur yang lebih sepi, lebih
              dekat dengan kultur, dan lebih layak diabadikan.
            </p>
          </div>
          <div className="md:col-span-8">
            <ol className="relative ml-2 border-l border-[#1F4A66]/30">
              {itinerary.map((d) => (
                <li key={d.d} className="mb-8 ml-6">
                  <span className="absolute -left-[7px] grid h-3 w-3 place-items-center rounded-full bg-[#1F4A66]">
                    <span className="h-1 w-1 rounded-full bg-paper" />
                  </span>
                  <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A66]">{d.d}</p>
                  <h3 className="mt-2 font-display text-xl text-[#0F2A3E]">{d.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{d.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeri" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#1F4A66]">Galeri Trip</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#0F2A3E] md:text-5xl">
                Cerita yang dibawa pulang oleh peserta kami.
              </h2>
            </div>
            <span className="hidden text-sm text-ink-500 md:inline-flex md:items-center md:gap-1.5">
              <Camera className="h-4 w-4" /> 1.200+ foto
            </span>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={
                  "rounded-2xl bg-gradient-to-br from-[#2D6A8C] via-[#1F4A66] to-[#0F2A3E] " +
                  (i % 3 === 0 ? "aspect-[4/5]" : "aspect-square")
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="booking" className="bg-[#0F2A3E] text-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">Booking</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                Konsultasi gratis dengan travel curator.
              </h2>
              <p className="mt-5 max-w-md text-paper/75">
                Cerita rencana liburan Anda — tanggal, gaya, budget. Kami susun opsi yang paling
                cocok dalam 1×24 jam.
              </p>
            </div>
            <a
              href="https://wa.me/628123456789?text=Halo%20Elara%20Travel%2C%20saya%20mau%20konsultasi%20open%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-[#DBBB6B] px-6 font-medium text-[#0F2A3E] hover:bg-[#E8C97D] md:self-end"
            >
              <MessageCircle className="h-4 w-4" /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-paper/10 bg-[#0F2A3E] text-paper">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-paper/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Elara Travel & Tour.</p>
          <p>
            <Link href="/templates" className="text-[#DBBB6B] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
