import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { fetchTemplate, fetchTemplates } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { TemplateCard } from "@/components/TemplateCard";
import { CTABand } from "@/components/CTABand";
import { PreviewEmbed } from "@/components/PreviewEmbed";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { nicheLabel } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchTemplate(slug).catch(() => null);
  if (!template) return { title: "Template tidak ditemukan" };
  return {
    title: template.name,
    description: template.tagline,
  };
}

export default async function TemplateDetailPage({ params }: Params) {
  const { slug } = await params;
  const template = await fetchTemplate(slug).catch(() => null);
  if (!template) notFound();

  const related = await fetchTemplates({ niche: template.niche }).catch(() => []);
  const others = related.filter((t) => t.slug !== template.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/[0.06]">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-wide relative pb-14 pt-12 md:pb-20 md:pt-16">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke showroom
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="eyebrow">{nicheLabel(template.niche)}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display mt-5 text-balance text-4xl leading-[1.05] text-ink md:text-5xl">
                  {template.name}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500 md:text-lg">
                  {template.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-ink-700">
                  {template.description}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    href={whatsappLink(PRESETS.template(template.name))}
                    external
                    variant="primary"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Gunakan template ini
                  </Button>
                  <Button
                    href={`/preview/${template.slug}`}
                    external
                    target="_blank"
                    variant="outline"
                    size="lg"
                  >
                    Buka preview asli
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <PreviewEmbed slug={template.slug} name={template.name} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Section pad="md" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Apa yang Anda dapat</span>
            <h2 className="display mt-5 text-3xl leading-tight text-ink md:text-4xl">
              Struktur konversi yang sudah dipikirkan.
            </h2>
            <p className="mt-5 text-ink-500">
              Setiap section bukan dekorasi, melainkan langkah dalam funnel: dari awareness, trust,
              hingga CTA WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {template.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-700">
                    <Check className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {others.length > 0 ? (
        <Section pad="md" bordered>
          <div className="container-wide">
            <div className="flex items-end justify-between">
              <h3 className="display text-2xl text-ink md:text-3xl">
                Lain di kategori {nicheLabel(template.niche)}
              </h3>
              <Link
                href={`/templates?niche=${template.niche}`}
                className="hidden text-sm text-ink-500 hover:text-ink md:inline-flex md:items-center md:gap-1.5"
              >
                Semua di kategori ini <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section pad="lg">
        <CTABand
          title={`Tertarik dengan ${template.name}?`}
          description="Kami bantu kustomisasi sesuai brand, copy, dan integrasi WhatsApp Anda. Diskusi pertama tanpa biaya."
          primaryHref={whatsappLink(PRESETS.template(template.name))}
        />
      </Section>
    </>
  );
}
