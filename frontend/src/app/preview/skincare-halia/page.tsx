import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Droplet,
  Flower,
  Leaf,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Halia — Skincare & Beauty",
  description:
    "Preview template skincare e-commerce dengan katalog produk, ingredient highlight, dan order WhatsApp.",
};

const products = [
  { name: "Ginger Glow Serum", desc: "Vitamin C 10% + niacinamide", price: "Rp 285.000", note: "Brightening" },
  { name: "Rice Cleansing Foam", desc: "Rice bran extract + amino acid", price: "Rp 145.000", note: "Daily wash" },
  { name: "Calm Recovery Cream", desc: "Centella + ceramide", price: "Rp 320.000", note: "Sensitive skin" },
  { name: "Aqua Sun SPF 50+", desc: "Mineral filter, no white cast", price: "Rp 215.000", note: "Daily SPF" },
];

export default function SkincareHaliaPreview() {
  return (
    <PreviewShell templateName="Halia — Skincare & Beauty">
      <section className="relative overflow-hidden bg-[#FAF1EC]">
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium text-[#5A3225]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#5A3225] text-paper">
                <Flower className="h-4 w-4" />
              </span>
              Halia
            </div>
            <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
              <a href="#produk">Produk</a>
              <a href="#bahan">Ingredients</a>
              <a href="#hasil">Hasil Nyata</a>
              <a href="#order">Order</a>
            </nav>
            <a
              href="#order"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#5A3225] px-4 text-sm text-paper hover:bg-[#7A4A3B]"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Order
            </a>
          </div>
        </header>

        <div className="container-wide grid grid-cols-1 gap-12 pb-24 pt-16 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#7A4A3B]">
              <span className="h-px w-8 bg-[#7A4A3B]" /> BPOM Halal · Made in Indonesia
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] text-[#3D1F14] md:text-7xl">
              Skincare yang <span className="italic text-[#7A4A3B]">jujur</span> dengan kulit Anda.
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              Diformulasikan dengan bahan aktif kuat dan rangkaian botani lokal. Tanpa fragrance
              berlebih, tanpa janji ajaib — hanya rutin yang bisa Anda jalani.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#order"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#5A3225] px-6 font-medium text-paper hover:bg-[#7A4A3B]"
              >
                <ShoppingBag className="h-4 w-4" /> Belanja koleksi
              </a>
              <a
                href="#bahan"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#5A3225]/30 px-6 font-medium text-[#5A3225] hover:bg-[#5A3225]/5"
              >
                Pelajari ingredients <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-ink-700">
              <span className="inline-flex items-center gap-1 text-[#7A4A3B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span>4,9 / 5 · 2.400+ ulasan</span>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E8C9B8] via-[#C99A7A] to-[#7A4A3B]" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-ink/[0.08] bg-paper p-4 shadow-plate sm:block">
              <Award className="h-5 w-5 text-[#7A4A3B]" />
              <p className="mt-2 text-xs uppercase tracking-widest2 text-ink-500">Halal MUI · BPOM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produk" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#7A4A3B]">Bestseller</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#3D1F14] md:text-5xl">
                Empat produk yang paling sering re-order.
              </h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article
                key={p.name}
                className="group flex flex-col rounded-2xl border border-ink/[0.06] bg-[#FAF1EC] p-5 transition-all hover:-translate-y-0.5 hover:bg-paper hover:shadow-plate"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-[#E8C9B8] via-[#C99A7A] to-[#7A4A3B]" />
                <span className="mt-4 self-start rounded-full bg-[#7A4A3B]/10 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-[#7A4A3B]">
                  {p.note}
                </span>
                <h3 className="mt-3 font-display text-base text-[#3D1F14]">{p.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-3 text-sm">
                  <span className="font-display text-base text-[#3D1F14]">{p.price}</span>
                  <a href="#order" className="text-[#7A4A3B] hover:text-[#5A3225]">
                    Order →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section id="bahan" className="border-y border-ink/[0.06] bg-[#FAF1EC]">
        <div className="container-wide grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-widest2 text-[#7A4A3B]">Ingredient Story</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-[#3D1F14] md:text-5xl">
              Botani lokal, sains modern.
            </h2>
            <p className="mt-5 text-ink-600">
              Halia (jahe) menjadi ingredient hero kami — anti-oksidan kuat, brightening, dan
              menenangkan kulit reaktif. Dipadukan dengan formulasi clinical grade.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/[0.06] bg-ink/[0.06] md:grid-cols-2">
              {[
                { i: Sparkles, n: "Vitamin C 10%", d: "Stabilized · brightening tanpa iritasi." },
                { i: Droplet, n: "Niacinamide 5%", d: "Skin barrier & pore care." },
                { i: Leaf, n: "Centella Asiatica", d: "Soothing & redness reduction." },
                { i: Flower, n: "Ginger Extract", d: "Anti-oksidan botani lokal khas Halia." },
              ].map((b) => (
                <div key={b.n} className="bg-paper p-6">
                  <b.i className="h-5 w-5 text-[#7A4A3B]" />
                  <h3 className="mt-3 font-display text-lg text-[#3D1F14]">{b.n}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real results */}
      <section id="hasil" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7A4A3B]">Real Results</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-[#3D1F14] md:text-5xl">
            Foto sebelum/sesudah dari real customer.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <article key={n} className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-[#FAF1EC]">
                <div className="grid grid-cols-2 gap-px">
                  <div className="aspect-square bg-gradient-to-br from-[#C99A7A] to-[#7A4A3B]">
                    <span className="m-3 inline-block rounded-full bg-paper/85 px-2 py-0.5 text-[10px] uppercase tracking-widest2 text-[#5A3225]">
                      Sebelum
                    </span>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-[#F2D4BD] to-[#C99A7A]">
                    <span className="m-3 inline-block rounded-full bg-paper/85 px-2 py-0.5 text-[10px] uppercase tracking-widest2 text-[#5A3225]">
                      8 minggu
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base text-[#3D1F14]">Nadia · 27 tahun</h3>
                  <p className="mt-1 text-xs text-ink-500">Routine: Cleanser → Serum → SPF</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-600">
                    &ldquo;Tone kulit jadi lebih merata, dark spot bekas jerawat juga memudar.&rdquo;
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="order" className="bg-[#FAF1EC]">
        <div className="container-wide py-20 md:py-28">
          <div className="rounded-3xl bg-[#3D1F14] p-10 text-paper md:p-16">
            <p className="text-[11px] uppercase tracking-widest2 text-[#E8C9B8]">Order</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
              Mulai rutin Anda dengan rekomendasi dari skin advisor kami.
            </h2>
            <ul className="mt-7 grid max-w-2xl grid-cols-1 gap-2 text-paper/85 md:grid-cols-2">
              {["Konsultasi gratis via WhatsApp", "Free shipping pembelian ≥ Rp 350rb", "30-day return policy", "Cashback poin Halia"].map(
                (t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C9B8]" /> {t}
                  </li>
                ),
              )}
            </ul>
            <a
              href="https://wa.me/628123456789?text=Halo%20Halia%2C%20saya%20butuh%20rekomendasi%20skincare."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#E8C9B8] px-6 font-medium text-[#3D1F14] hover:bg-[#F2D4BD]"
            >
              <MessageCircle className="h-4 w-4" /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.06] bg-paper">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Halia Skincare · BPOM & Halal MUI.</p>
          <p>
            <Link href="/templates" className="text-[#7A4A3B] hover:underline">
              Template oleh Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
