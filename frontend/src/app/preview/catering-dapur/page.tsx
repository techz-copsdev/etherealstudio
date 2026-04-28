import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Leaf,
  MessageCircle,
  Soup,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Dapur — Catering & Kuliner",
  description: "Preview template catering dengan paket menu, gallery hidangan, dan order WhatsApp.",
};

const packages = [
  {
    name: "Prasmanan Klasik",
    price: "Rp 65.000",
    unit: "/pax",
    items: ["1 nasi", "3 lauk", "2 sayur", "Sambal & lalap", "Buah segar", "Minuman"],
    pop: false,
  },
  {
    name: "Prasmanan Premium",
    price: "Rp 95.000",
    unit: "/pax",
    items: ["Nasi 3 jenis", "5 lauk premium", "3 sayur", "Soup", "Pencuci mulut", "Welcome drink"],
    pop: true,
  },
  {
    name: "Nasi Box Eksekutif",
    price: "Rp 48.000",
    unit: "/box",
    items: ["Nasi", "Lauk utama", "Sayur", "Sambal", "Kerupuk", "Air mineral"],
    pop: false,
  },
];

export default function CateringDapurPreview() {
  return (
    <PreviewShell templateName="Dapur — Catering & Kuliner">
      <section className="relative overflow-hidden bg-[#FAF1E5]">
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium text-[#5A2D14]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7A3F1A] text-paper">
                <ChefHat className="h-4 w-4" />
              </span>
              Dapur Madu
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#paket">Paket</a>
              <a href="#menu">Menu</a>
              <a href="#proses">Proses</a>
              <a href="#order">Order</a>
            </nav>
            <a
              href="#order"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#7A3F1A] px-4 text-sm text-paper hover:bg-[#5A2D14]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Order
            </a>
          </div>
        </header>

        <div className="container-wide grid grid-cols-1 gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#7A3F1A]">
              <span className="h-px w-8 bg-[#7A3F1A]" /> Catering Event · 2014
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] text-[#3A1D0E] md:text-7xl">
              Hidangan rumah <span className="italic text-[#7A3F1A]">untuk acara terbaik Anda.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Catering harian, prasmanan event, hingga corporate gathering. Bumbu segar, tim chef
              berpengalaman, dan pengantaran tepat waktu di seluruh Jabodetabek.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#order"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#7A3F1A] px-6 font-medium text-paper hover:bg-[#5A2D14]"
              >
                <MessageCircle className="h-4 w-4" /> Order untuk event Anda
              </a>
              <a
                href="#paket"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#7A3F1A]/30 px-6 font-medium text-[#7A3F1A] hover:bg-[#7A3F1A]/5"
              >
                Lihat paket <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink-700">
              {[
                { i: Users, t: "1.200+ event" },
                { i: Leaf, t: "Bumbu segar harian" },
                { i: Truck, t: "Antar tepat waktu" },
              ].map((x) => (
                <span key={x.t} className="inline-flex items-center gap-2">
                  <x.i className="h-4 w-4 text-[#7A3F1A]" /> {x.t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="aspect-square rounded-3xl bg-gradient-to-br from-[#E8C088] via-[#C9885B] to-[#7A3F1A]"
                />
              ))}
            </div>
            <div className="mt-3 rounded-3xl bg-paper p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="h-5 w-5 text-[#7A3F1A]" />
                <p className="font-display text-lg text-[#3A1D0E]">Halal MUI · Bersertifikat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="paket" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7A3F1A]">Paket Menu</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#3A1D0E] md:text-5xl">
            Tiga paket, fleksibel sesuai kebutuhan acara.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <article
                key={p.name}
                className={
                  "relative flex h-full flex-col rounded-3xl border p-7 " +
                  (p.pop
                    ? "border-[#7A3F1A] bg-[#7A3F1A] text-paper shadow-plate"
                    : "border-ink/[0.08] bg-[#FAF1E5] text-[#3A1D0E]")
                }
              >
                {p.pop ? (
                  <span className="absolute -top-3 right-6 rounded-full bg-[#DBBB6B] px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-[#3A1D0E]">
                    Paling Populer
                  </span>
                ) : null}
                <Soup className={"h-6 w-6 " + (p.pop ? "text-[#DBBB6B]" : "text-[#7A3F1A]")} />
                <h3 className="mt-5 font-display text-xl">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl">{p.price}</span>
                  <span className={"text-sm " + (p.pop ? "text-paper/70" : "text-ink-500")}>
                    {p.unit}
                  </span>
                </div>
                <ul className="mt-6 space-y-2.5 text-[14.5px]">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <CheckCircle2
                        className={
                          "mt-0.5 h-4 w-4 shrink-0 " + (p.pop ? "text-[#DBBB6B]" : "text-[#7A3F1A]")
                        }
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href="#order"
                  className={
                    "mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full font-medium " +
                    (p.pop
                      ? "bg-[#DBBB6B] text-[#3A1D0E] hover:bg-[#E8C97D]"
                      : "bg-[#3A1D0E] text-paper hover:bg-[#7A3F1A]")
                  }
                >
                  Order paket ini <ArrowRight className="h-4 w-4" />
                </a>
                <p
                  className={
                    "mt-3 text-center text-xs " + (p.pop ? "text-paper/60" : "text-ink-500")
                  }
                >
                  Min. 50 pax · custom menu tersedia
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Menu strip / gallery */}
      <section id="menu" className="bg-[#FAF1E5]">
        <div className="container-wide py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#7A3F1A]">Galeri Hidangan</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#3A1D0E] md:text-5xl">
                Beberapa menu favorit klien kami.
              </h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-gradient-to-br from-[#E8C088] via-[#C9885B] to-[#7A3F1A]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Order */}
      <section id="order" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="rounded-[28px] bg-[#3A1D0E] p-10 text-paper md:p-16">
            <p className="text-[11px] uppercase tracking-widest2 text-[#DBBB6B]">Order Acara</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
              Punya acara? Kami siapkan dari menu hingga pengantaran.
            </h2>
            <p className="mt-5 max-w-2xl text-paper/75">
              Beri tahu kami: tanggal, jumlah pax, dan tipe acara. Tim CS akan mengirim opsi paket
              + estimasi dalam 30 menit (jam kerja).
            </p>
            <a
              href="https://wa.me/628123456789?text=Halo%20Dapur%20Madu%2C%20saya%20mau%20pesan%20catering%20untuk%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#DBBB6B] px-6 font-medium text-[#3A1D0E] hover:bg-[#E8C97D]"
            >
              <MessageCircle className="h-4 w-4" /> Order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.06] bg-[#FAF1E5]">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Dapur Madu Catering · Halal MUI.</p>
          <p>
            <Link href="/templates" className="text-[#7A3F1A] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
