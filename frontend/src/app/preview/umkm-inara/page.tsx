import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Inara — UMKM & Usaha Lokal",
  description: "Preview template UMKM dengan katalog produk, lokasi, dan pemesanan WhatsApp.",
};

const products = [
  { name: "Sambal Roa Special", price: "Rp 65.000", desc: "Pedas khas Manado · 250 gram" },
  { name: "Bumbu Rendang Asli", price: "Rp 48.000", desc: "Resep keluarga · 200 gram" },
  { name: "Kerupuk Udang Premium", price: "Rp 35.000", desc: "Udang segar 100% · 250 gram" },
  { name: "Madu Hutan Sumbawa", price: "Rp 95.000", desc: "Multiflora · 500 ml" },
  { name: "Kopi Arabica Gayo", price: "Rp 110.000", desc: "Single origin · 250 gram" },
  { name: "Cokelat Bali Artisan", price: "Rp 75.000", desc: "70% dark · 80 gram" },
];

export default function UmkmInaraPreview() {
  return (
    <PreviewShell templateName="Inara — UMKM & Usaha Lokal">
      <section className="relative overflow-hidden bg-[#FBF6E6]">
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium text-[#5C4515]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7E612F] text-paper">
                <ShoppingBag className="h-4 w-4" />
              </span>
              Inara Pantry
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#produk">Produk</a>
              <a href="#cara">Cara Pesan</a>
              <a href="#lokasi">Lokasi</a>
              <a href="#kontak">Kontak</a>
            </nav>
            <a
              href="#produk"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#7E612F] px-4 text-sm text-paper hover:bg-[#5C4515]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Order
            </a>
          </div>
        </header>

        <div className="container-wide grid grid-cols-1 gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#7E612F]">
              <span className="h-px w-8 bg-[#7E612F]" /> Sejak 2019 · Resep Rumahan
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] text-[#3A2A0A] md:text-7xl">
              Cita rasa rumahan, <span className="italic text-[#7E612F]">dikemas premium</span> untuk meja Anda.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Inara Pantry menjual sambal, bumbu, kopi, dan camilan otentik dari berbagai daerah —
              dibuat fresh setiap minggu. Pesan via WhatsApp, kami antar same-day di Jabodetabek.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#produk"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#7E612F] px-6 font-medium text-paper hover:bg-[#5C4515]"
              >
                <ShoppingBag className="h-4 w-4" /> Lihat produk
              </a>
              <a
                href="https://wa.me/628123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#7E612F]/30 px-6 font-medium text-[#7E612F] hover:bg-[#7E612F]/5"
              >
                <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink-700">
              {[
                { i: Truck, t: "Same-day Jabodetabek" },
                { i: Utensils, t: "Tanpa pengawet" },
                { i: Banknote, t: "COD tersedia" },
              ].map((x) => (
                <span key={x.t} className="inline-flex items-center gap-2">
                  <x.i className="h-4 w-4 text-[#7E612F]" /> {x.t}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="aspect-square rounded-3xl bg-gradient-to-br from-[#E8CC74] via-[#C99B3F] to-[#7E612F] shadow-soft"
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-3xl bg-paper p-5 shadow-soft">
              <div className="flex items-center gap-1 text-[#7E612F]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-ink-500">4,9 · 1.150+ pelanggan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produk" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#7E612F]">Etalase</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#3A2A0A] md:text-5xl">
                Pilihan minggu ini.
              </h2>
            </div>
            <div className="flex gap-2 text-sm">
              {["Semua", "Bumbu", "Sambal", "Kopi", "Camilan"].map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className={
                    "h-9 rounded-full border px-4 " +
                    (i === 0
                      ? "border-[#7E612F] bg-[#7E612F] text-paper"
                      : "border-ink/15 text-ink-700 hover:border-[#7E612F]")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/[0.06] bg-paper transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="aspect-square bg-gradient-to-br from-[#E8CC74] via-[#C99B3F] to-[#7E612F]" />
                <div className="p-5">
                  <h3 className="font-display text-base text-[#3A2A0A]">{p.name}</h3>
                  <p className="mt-1 text-xs text-ink-500">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-3">
                    <span className="font-display text-base text-[#3A2A0A]">{p.price}</span>
                    <a
                      href={`https://wa.me/628123456789?text=Halo%20Inara%2C%20saya%20mau%20pesan%20${encodeURIComponent(p.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#7E612F] hover:text-[#5C4515]"
                    >
                      Pesan <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section id="cara" className="bg-[#FBF6E6]">
        <div className="container-wide py-20 md:py-24">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7E612F]">Cara Pesan</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#3A2A0A] md:text-5xl">
            3 langkah ringkas, pesanan langsung ke dapur kami.
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/[0.08] bg-ink/[0.08] md:grid-cols-3">
            {[
              { k: "01", t: "Pilih produk", d: "Klik 'Pesan' di setiap produk — chat WhatsApp otomatis terbuka." },
              { k: "02", t: "Konfirmasi alamat", d: "CS bantu hitung ongkir dan total tagihan." },
              { k: "03", t: "Bayar & terima", d: "Transfer / QRIS / COD. Kami antar same-day." },
            ].map((s) => (
              <li key={s.k} className="bg-paper p-7">
                <div className="text-xs uppercase tracking-widest2 text-ink-400">{s.k}</div>
                <h3 className="mt-3 font-display text-xl text-[#3A2A0A]">{s.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="lokasi" className="bg-paper">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-[#7E612F]">Workshop</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-[#3A2A0A] md:text-4xl">
              Kunjungi langsung di Cipete.
            </h2>
            <p className="mt-4 text-ink-600">
              Anda bisa cicipi sample sebelum membeli. Open booking untuk private tasting & gift hampers.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#7E612F]" /> Jl. Cipete Raya No. 14, Jakarta Selatan
              </li>
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#7E612F]" /> Senin–Sabtu · 09.00–18.00 WIB
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#7E612F]" /> +62 812 3456 789
              </li>
            </ul>
          </div>
          <div id="kontak" className="rounded-3xl bg-[#3A2A0A] p-8 text-paper md:p-12">
            <p className="text-[11px] uppercase tracking-widest2 text-[#E8CC74]">Hampers & Korporat</p>
            <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
              Mau bikin hampers untuk klien Anda?
            </h3>
            <p className="mt-4 text-paper/75">
              Min. 20 pcs. Custom packaging dengan logo brand Anda. Tim kami bantu kurasi paket
              sesuai budget dan tema acara.
            </p>
            <a
              href="https://wa.me/628123456789?text=Halo%20Inara%2C%20saya%20mau%20diskusi%20hampers%20korporat."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#E8CC74] px-6 font-medium text-[#3A2A0A] hover:bg-[#F2D88A]"
            >
              <MessageCircle className="h-4 w-4" /> Diskusi hampers
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.06] bg-[#FBF6E6]">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Inara Pantry · Local goods, kemas premium.</p>
          <p>
            <Link href="/templates" className="text-[#7E612F] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
