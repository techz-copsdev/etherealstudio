import type { Metadata } from "next";
import Link from "next/link";
import { fetchTemplates } from "@/lib/api";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitText";
import { NICHES, nicheLabel } from "@/lib/site";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Showroom Templates",
  description:
    "Showroom template landing page profesional per niche bisnis. Buka preview asli, lihat strukturnya, lalu konsultasikan kebutuhan Anda.",
};

type SearchParams = { searchParams?: Promise<{ niche?: string }> };

export default async function TemplatesPage({ searchParams }: SearchParams) {
  const sp = (await searchParams) ?? {};
  const niche = sp.niche?.toUpperCase();
  const all = await safeFetch();
  const filtered = niche ? all.filter((t) => t.niche === niche) : all;

  const counts = NICHES.reduce<Record<string, number>>((acc, n) => {
    acc[n.value] = all.filter((t) => t.niche === n.value).length;
    return acc;
  }, {});

  return (
    <>
      {/* —— HEADER —— */}
      <section className="pt-12 md:pt-20 lg:pt-28">
        <div className="frame">
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <p className="marker">— Showroom</p>
              <p className="marker mt-2">{all.length} arah</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display text-[40px] leading-[0.95] text-ink sm:text-[64px] md:text-[100px] lg:text-[140px]">
                <SplitLines
                  lines={[
                    <>Sepuluh arah,</>,
                    <>
                      satu <em className="display-italic">standar</em>.
                    </>,
                  ]}
                />
              </h1>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-12 gap-x-8 md:mt-20">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <Reveal y={20} delay={0.3}>
                <p className="text-balance text-[17px] leading-[1.55] text-ink/75 md:text-[20px] md:leading-[1.5]">
                  Showroom kami berisi sepuluh template lengkap — masing-masing
                  dirancang untuk satu industri spesifik. Buka, telusuri, lalu
                  putuskan apakah perlu disesuaikan, dirombak, atau dijadikan
                  starting point untuk arah baru.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="rule" />
        </div>
      </section>

      {/* —— FILTER —— */}
      <section className="sticky top-[57px] z-20 bg-paper/85 backdrop-blur-sm md:top-[81px]">
        <div className="frame">
          <div className="-mx-2 flex items-center gap-1 overflow-x-auto px-2 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterChip href="/templates" label="Semua" count={all.length} active={!niche} />
            {NICHES.map((n) => (
              <FilterChip
                key={n.value}
                href={`/templates?niche=${n.value}`}
                label={n.label}
                count={counts[n.value] ?? 0}
                active={niche === n.value}
              />
            ))}
          </div>
        </div>
        <div className="rule" />
      </section>

      {/* —— LIST (editorial, full-width rows) —— */}
      <section className="py-16 md:py-24">
        <div className="frame">
          {niche ? (
            <p className="mb-10 marker">
              Menampilkan {filtered.length} untuk {nicheLabel(niche)}
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <div className="border-y border-ink/10 py-20 text-center">
              <h3 className="display-md text-3xl text-ink md:text-4xl">
                Belum ada untuk filter ini.
              </h3>
              <p className="mt-4 text-ink/60">
                Kami bisa membuatkan custom landing page untuk bisnis Anda.
              </p>
              <Link href="/services/website" className="anchor mt-8 inline-block text-[14px]">
                Lihat layanan custom website →
              </Link>
            </div>
          ) : (
            <div>
              {filtered.map((t, i) => (
                <Reveal key={t.id} y={20} delay={i * 0.04}>
                  <Link
                    href={`/preview/${t.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-t border-ink/10 transition-colors duration-500 hover:bg-ink hover:text-paper"
                    style={{ transitionTimingFunction: "var(--easing)" }}
                  >
                    <div className="grid grid-cols-12 items-baseline gap-x-8 px-2 py-7 md:py-12">
                      <span className="col-span-2 font-mono text-[12px] tracking-widest3 text-ink/40 group-hover:text-paper/40 md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-10 md:col-span-6">
                        <span className="display block text-[28px] leading-[1.05] md:text-[44px] lg:text-[60px]">
                          {t.name}
                        </span>
                        <span className="mt-3 block max-w-md text-[13px] text-ink/55 group-hover:text-paper/60 md:text-[14px]">
                          {t.tagline}
                        </span>
                      </span>
                      <span className="col-span-12 mt-4 text-[12px] uppercase tracking-widest2 text-ink/55 group-hover:text-paper/55 md:col-span-3 md:col-start-8 md:mt-0 md:text-right">
                        {t.niche}
                      </span>
                      <span className="col-span-12 mt-3 hidden text-[13px] tracking-wide md:col-span-2 md:col-start-11 md:mt-0 md:flex md:items-center md:justify-end md:gap-2 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                        Open <span>→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
              <div className="border-t border-ink/10" />
            </div>
          )}
        </div>
      </section>

      <div className="rule" />

      {/* —— CTA (oversized) —— */}
      <section className="py-24 md:py-36">
        <div className="frame">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <p className="marker">— Tidak cocok?</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <Reveal y={20}>
                <h2 className="display text-[36px] leading-[1.0] text-ink md:text-[72px] lg:text-[100px]">
                  Mari rancang dari{" "}
                  <em className="display-italic">nol</em>.
                </h2>
              </Reveal>
              <Reveal y={16} delay={0.1}>
                <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-ink/70 md:text-[18px]">
                  Beri tahu kami industri, target, dan apa yang ingin Anda
                  capai dalam 90 hari ke depan. Kami akan menyusun struktur
                  funnel yang dirancang khusus untuk bisnis Anda.
                </p>
              </Reveal>
              <Reveal y={10} delay={0.15}>
                <div className="mt-12 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(PRESETS.general())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-solid"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Diskusi via WhatsApp
                    <span className="text-paper/60">→</span>
                  </a>
                  <Link href="/contact" className="pill">
                    Form konsultasi
                    <span className="text-ink/40">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function safeFetch() {
  try {
    return await fetchTemplates();
  } catch {
    return [];
  }
}

function FilterChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "group inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-[12px] tracking-wide transition-all duration-500 " +
        (active
          ? "bg-ink text-paper"
          : "border border-ink/15 text-ink/70 hover:border-ink hover:text-ink")
      }
      style={{ transitionTimingFunction: "var(--easing)" }}
    >
      {label}
      <span
        className={
          "font-mono text-[10px] tabular-nums " +
          (active ? "text-paper/55" : "text-ink/40")
        }
      >
        {String(count).padStart(2, "0")}
      </span>
    </Link>
  );
}
