import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitText";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { fetchTemplates } from "@/lib/api";
import type { Template } from "@/lib/api";

export const revalidate = 60;

async function safeFetchFeatured(): Promise<Template[]> {
  try {
    const all = await fetchTemplates();
    return all.slice(0, 4);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await safeFetchFeatured();

  return (
    <>
      {/* —— HERO ——————————————————————————————————————————————————————— */}
      <section className="relative pt-12 md:pt-20 lg:pt-28">
        <div className="frame">
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10">
            <div className="col-span-12 md:col-span-2">
              <p className="marker">— Index 00</p>
              <p className="marker mt-2">Studio</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <h1 className="display text-[44px] leading-[0.92] text-ink sm:text-[68px] md:text-[110px] lg:text-[148px] xl:text-[176px]">
                <SplitLines
                  lines={[
                    <>Komposisi</>,
                    <>
                      <em className="display-italic">premium</em> yang
                    </>,
                    <>fokus pada konversi.</>,
                  ]}
                  delay={0.15}
                  stagger={0.1}
                />
              </h1>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-10 md:mt-24">
            <div className="col-span-12 md:col-span-2 md:col-start-3">
              <Reveal delay={0.4} y={20}>
                <p className="marker">— 00 / a</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-7">
              <Reveal delay={0.45} y={20}>
                <p className="text-balance text-[18px] leading-[1.55] text-ink/80 md:text-[22px] md:leading-[1.5]">
                  Studio digital untuk pelaku bisnis di Indonesia. Kami merancang
                  landing page, website custom, dan IT automation yang dibuat per
                  bisnis — bukan template, bukan kit yang dirakit.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3 md:mt-20">
            <Reveal delay={0.55} y={10}>
              <a
                href={whatsappLink(PRESETS.general())}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-solid"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Mulai percakapan
                <span className="text-paper/60">→</span>
              </a>
            </Reveal>
            <Reveal delay={0.6} y={10}>
              <Link href="/templates" className="pill">
                Lihat showroom
                <span className="text-ink/40">→</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className="rule" />
        </div>
      </section>

      {/* —— 01 / STUDIO STATEMENT ——————————————————————————————————————— */}
      <section className="py-24 md:py-36">
        <div className="frame">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <p className="marker">— 01</p>
                <p className="marker mt-1.5">Pendekatan</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <Reveal y={20}>
                <p className="display-md text-[28px] leading-[1.18] text-ink md:text-[44px] md:leading-[1.12] lg:text-[56px]">
                  Kami menulis ulang halaman, bukan menambal-nambal.
                  Setiap project dibuka dengan diskusi produk, audit
                  konversi, dan pemetaan funnel — sebelum satu garis pun
                  digambar. Tujuannya bukan website yang cantik. Tujuannya
                  adalah <em className="display-italic">closing</em>.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* —— 02 / TEMPLATES (editorial list, not card grid) ————————————— */}
      <section className="py-20 md:py-32">
        <div className="frame">
          <div className="mb-16 grid grid-cols-12 gap-x-8 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <p className="marker">— 02</p>
                <p className="marker mt-1.5">Showroom</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <Reveal y={20}>
                <h2 className="display text-[40px] leading-[0.98] text-ink md:text-[80px] lg:text-[112px]">
                  Sepuluh{" "}
                  <em className="display-italic">arah</em>,
                  <br />
                  satu standar.
                </h2>
              </Reveal>
              <Reveal y={20} delay={0.1}>
                <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-ink/70 md:text-[18px]">
                  Setiap template di showroom kami dibuat penuh — bukan
                  thumbnail, bukan mockup. Buka, telusuri, lalu pilih
                  yang paling cocok untuk industri Anda. Atau diskusikan
                  arah baru dari nol.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Editorial list of templates — numbered, full-width row each */}
          <div>
            {featured.length === 0 ? (
              <Reveal y={20}>
                <p className="text-ink/60">
                  Showroom akan tampil setelah backend tersambung.{" "}
                  <Link href="/templates" className="anchor">
                    Lihat semua →
                  </Link>
                </p>
              </Reveal>
            ) : (
              featured.map((t, i) => (
                <Reveal key={t.slug} y={24} delay={i * 0.05}>
                  <Link
                    href={`/preview/${t.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-t border-ink/10 transition-colors duration-500 hover:bg-ink hover:text-paper"
                    style={{ transitionTimingFunction: "var(--easing)" }}
                  >
                    <div className="grid grid-cols-12 items-baseline gap-x-8 px-2 py-7 md:py-10">
                      <span className="col-span-2 font-mono text-[12px] tracking-widest3 text-ink/40 group-hover:text-paper/40 md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-10 md:col-span-7">
                        <span className="display block text-[28px] leading-[1.05] md:text-[44px] lg:text-[56px]">
                          {t.name}
                        </span>
                      </span>
                      <span className="col-span-12 mt-3 text-[13px] uppercase tracking-widest2 text-ink/55 group-hover:text-paper/55 md:col-span-3 md:col-start-9 md:mt-0 md:text-right">
                        {t.niche}
                      </span>
                      <span className="col-span-12 mt-4 hidden md:col-span-7 md:col-start-2 md:mt-0 md:flex md:justify-end md:gap-2 md:text-[13px] md:tracking-wide md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                        Open preview <span>→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))
            )}
            <div className="border-t border-ink/10" />
          </div>

          <div className="mt-12 flex justify-end">
            <Reveal y={10}>
              <Link href="/templates" className="pill">
                Lihat semua sepuluh
                <span className="text-ink/40">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* —— 03 / LAYANAN (2-col editorial, not feature grid) ————————— */}
      <section className="py-20 md:py-32">
        <div className="frame">
          <div className="mb-16 grid grid-cols-12 gap-x-8 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <p className="marker">— 03</p>
                <p className="marker mt-1.5">Layanan</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <Reveal y={20}>
                <h2 className="display text-[40px] leading-[0.98] text-ink md:text-[80px] lg:text-[112px]">
                  Dua disiplin,
                  <br />
                  <em className="display-italic">satu</em> arah.
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-8 gap-y-16">
            <article className="col-span-12 md:col-span-6">
              <Reveal y={20}>
                <p className="marker mb-4">— 03 / a</p>
                <h3 className="display-md text-[28px] leading-[1.05] text-ink md:text-[44px]">
                  Custom Website &amp; Landing Page
                </h3>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70 md:text-[16px]">
                  Landing page konversi tinggi, company profile, sales
                  funnel, hingga corporate website. Arsitektur frontend
                  yang ringan, stack modern, tanpa template builder.
                </p>
                <ul className="mt-8 divide-y divide-ink/10 text-[14px]">
                  {[
                    "Landing page closing",
                    "Company profile",
                    "Sales funnel multi-step",
                    "Corporate / multi-locale",
                  ].map((s, i) => (
                    <li key={s} className="flex items-baseline gap-6 py-3">
                      <span className="font-mono text-[11px] text-ink/40">
                        0{i + 1}
                      </span>
                      <span className="text-ink/85">{s}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services/website"
                  className="anchor mt-10 inline-block text-[14px]"
                >
                  Selengkapnya tentang Website →
                </Link>
              </Reveal>
            </article>

            <article className="col-span-12 md:col-span-5 md:col-start-8">
              <Reveal y={20} delay={0.08}>
                <p className="marker mb-4">— 03 / b</p>
                <h3 className="display-md text-[28px] leading-[1.05] text-ink md:text-[44px]">
                  IT Automation &amp; System
                </h3>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70 md:text-[16px]">
                  WhatsApp automation, CRM integration, internal
                  dashboard, lead routing, workflow operasional. Kami
                  membangun sistem yang menghapus kerja repetitif.
                </p>
                <ul className="mt-8 divide-y divide-ink/10 text-[14px]">
                  {[
                    "WhatsApp automation",
                    "CRM integration",
                    "Lead management",
                    "Internal admin dashboard",
                  ].map((s, i) => (
                    <li key={s} className="flex items-baseline gap-6 py-3">
                      <span className="font-mono text-[11px] text-ink/40">
                        0{i + 1}
                      </span>
                      <span className="text-ink/85">{s}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services/automation"
                  className="anchor mt-10 inline-block text-[14px]"
                >
                  Selengkapnya tentang Automation →
                </Link>
              </Reveal>
            </article>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* —— 04 / PRINSIP (numbered, not card grid) ——————————————————— */}
      <section className="py-20 md:py-32">
        <div className="frame">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <p className="marker">— 04</p>
                <p className="marker mt-1.5">Prinsip kerja</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <ol className="divide-y divide-ink/10">
                {[
                  {
                    n: "01",
                    h: "Dialog dulu, kontrak kemudian.",
                    p: "Konsultasi dilakukan langsung dengan owner studio. Tidak ada CS skrip.",
                  },
                  {
                    n: "02",
                    h: "Konversi sebagai metric utama.",
                    p: "Setiap halaman diuji ulang dengan funnel analytics — bukan sekadar tampil.",
                  },
                  {
                    n: "03",
                    h: "Frontend dan backend dipisah bersih.",
                    p: "Anda bisa redesign tampilan tanpa membongkar sistem yang sudah jalan.",
                  },
                  {
                    n: "04",
                    h: "Closing via percakapan.",
                    p: "WhatsApp adalah pintu kerja kami — bukan checkout buta yang dingin.",
                  },
                ].map((item, i) => (
                  <Reveal key={item.n} y={16} delay={i * 0.06}>
                    <li className="grid grid-cols-12 items-baseline gap-x-8 py-7 md:py-10">
                      <span className="col-span-12 font-mono text-[11px] tracking-widest3 text-ink/40 md:col-span-1">
                        {item.n}
                      </span>
                      <h3 className="col-span-12 display-md text-[24px] leading-[1.15] text-ink md:col-span-7 md:text-[32px]">
                        {item.h}
                      </h3>
                      <p className="col-span-12 mt-3 max-w-md text-[15px] leading-relaxed text-ink/65 md:col-span-4 md:col-start-9 md:mt-0">
                        {item.p}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* —— 05 / CTA (oversized question, type-only) ———————————————— */}
      <section className="bg-ink py-24 text-paper md:py-40">
        <div className="frame">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <p className="marker text-paper/55">— 05</p>
                <p className="marker mt-1.5 text-paper/55">Mulai</p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <Reveal y={20}>
                <h2 className="display text-[40px] leading-[0.98] text-paper md:text-[80px] lg:text-[120px]">
                  Mau mulai dari{" "}
                  <em className="display-italic">mana</em>?
                </h2>
              </Reveal>
              <Reveal y={16} delay={0.1}>
                <p className="mt-10 max-w-xl text-[16px] leading-relaxed text-paper/70 md:text-[18px]">
                  Cerita singkat soal bisnis Anda. Apa yang sudah jalan,
                  apa yang macet, dan apa yang Anda kejar tahun ini.
                  Kami balas dalam 1–2 jam di jam kerja.
                </p>
              </Reveal>
              <Reveal y={10} delay={0.15}>
                <div className="mt-12 flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappLink(PRESETS.general())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-paper px-6 py-3 text-[14px] tracking-wide text-ink transition-colors duration-500 hover:bg-accent hover:text-paper"
                    style={{ transitionTimingFunction: "var(--easing)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    WhatsApp
                    <span className="text-ink/40">→</span>
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 rounded-full border border-paper/25 px-6 py-3 text-[14px] tracking-wide text-paper transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink"
                    style={{ transitionTimingFunction: "var(--easing)" }}
                  >
                    Form konsultasi
                    <span className="text-paper/40">→</span>
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
