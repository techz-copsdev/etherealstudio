import type { Metadata } from "next";
import Link from "next/link";
import { fetchTemplates } from "@/lib/api";
import { TemplateCard } from "@/components/TemplateCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { NICHES } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Template Landing Page",
  description:
    "Galeri template landing page profesional per niche bisnis. Preview desktop & mobile, lalu pilih untuk dikustomisasi.",
};

type SearchParams = { searchParams?: Promise<{ niche?: string }> };

export default async function TemplatesPage({ searchParams }: SearchParams) {
  const sp = (await searchParams) ?? {};
  const niche = sp.niche?.toUpperCase();
  const templates = await safeFetch(niche);

  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <p className="eyebrow">Template Showroom</p>
          <h1 className="display mt-6 max-w-3xl text-4xl leading-[1.1] text-ink md:text-6xl">
            Pilih template yang dirancang untuk industri Anda.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
            Setiap template dirancang per niche dengan struktur konversi yang sudah teruji. Gunakan
            apa adanya, atau jadikan basis untuk versi custom.
          </p>
        </div>
      </Section>

      <Section pad="sm" bordered>
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            <FilterPill href="/templates" label="Semua" active={!niche} />
            {NICHES.map((n) => (
              <FilterPill
                key={n.value}
                href={`/templates?niche=${n.value}`}
                label={n.label}
                active={niche === n.value}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section pad="md" bordered>
        <div className="container-wide">
          {templates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 px-8 py-16 text-center">
              <h3 className="display text-2xl text-ink">Belum ada template untuk filter ini.</h3>
              <p className="mt-3 text-ink-500">
                Sementara, kami bisa membuatkan custom landing page untuk bisnis Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Tidak menemukan yang cocok?"
            title="Kami buat custom sesuai industri & funnel Anda."
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

async function safeFetch(niche?: string) {
  try {
    return await fetchTemplates({ niche });
  } catch {
    return [];
  }
}

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm text-paper"
          : "inline-flex h-9 items-center rounded-full border border-ink-200 px-4 text-sm text-ink-700 hover:border-ink hover:text-ink"
      }
    >
      {label}
    </Link>
  );
}
