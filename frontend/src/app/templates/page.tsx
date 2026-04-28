import type { Metadata } from "next";
import Link from "next/link";
import { fetchTemplates } from "@/lib/api";
import { TemplateCard } from "@/components/TemplateCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { NICHES, nicheLabel } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Template Showroom",
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
      <section className="relative overflow-hidden border-b border-ink/[0.06]">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[620px] rounded-full bg-accent-500/10 blur-3xl"
          aria-hidden
        />
        <div className="container-wide relative pb-12 pt-16 md:pb-16 md:pt-24">
          <Reveal>
            <p className="eyebrow">Template Showroom · {all.length} Template</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-6 max-w-4xl text-balance text-4xl leading-[1.05] text-ink md:text-6xl lg:text-[64px]">
              Template yang dirancang untuk{" "}
              <span className="gold-italic">industri Anda.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
              Setiap template adalah halaman lengkap yang bisa Anda buka langsung —
              bukan sekadar thumbnail. Pilih niche di bawah, telusuri, lalu buka{" "}
              <span className="text-ink">preview asli</span> untuk melihat layout, copy,
              dan flow konversinya.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter rail */}
      <section className="sticky top-16 z-20 border-b border-ink/[0.06] bg-paper/80 backdrop-blur md:top-20">
        <div className="container-wide">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0">
            <FilterPill href="/templates" label="Semua" count={all.length} active={!niche} />
            {NICHES.map((n) => (
              <FilterPill
                key={n.value}
                href={`/templates?niche=${n.value}`}
                label={n.label}
                count={counts[n.value] ?? 0}
                active={niche === n.value}
              />
            ))}
          </div>
        </div>
      </section>

      <Section pad="md">
        <div className="container-wide">
          {niche ? (
            <p className="mb-8 text-sm text-ink-500">
              Menampilkan {filtered.length} template untuk{" "}
              <span className="text-ink">{nicheLabel(niche)}</span>.
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink/15 px-8 py-20 text-center">
              <h3 className="display text-2xl text-ink">Belum ada template untuk filter ini.</h3>
              <p className="mt-3 text-ink-500">
                Sementara, kami bisa membuatkan custom landing page untuk bisnis Anda.
              </p>
              <Link
                href="/services/website"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink"
              >
                Lihat layanan custom website
              </Link>
            </div>
          ) : (
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {filtered.map((t) => (
                <StaggerItem key={t.id}>
                  <TemplateCard template={t} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Tidak menemukan yang cocok?"
            title={
              <>
                Kami buat custom sesuai{" "}
                <span className="gold-italic">industri & funnel</span> Anda.
              </>
            }
            description="Beri tahu kebutuhan Anda — kami siapkan struktur landing page yang dirancang khusus, lengkap dengan automation."
          />
        </div>
      </Section>

      <Section pad="lg">
        <CTABand />
      </Section>
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

function FilterPill({
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
        "group inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm transition-colors " +
        (active
          ? "bg-ink text-paper"
          : "border border-ink/[0.08] text-ink-700 hover:border-ink hover:bg-cream/50")
      }
    >
      {label}
      <span
        className={
          "rounded-full px-1.5 text-[10px] font-medium tabular-nums " +
          (active ? "bg-paper/15 text-paper" : "bg-ink/[0.06] text-ink-500 group-hover:bg-ink/10")
        }
      >
        {count}
      </span>
    </Link>
  );
}
