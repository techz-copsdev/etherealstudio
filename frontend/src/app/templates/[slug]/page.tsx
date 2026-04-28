import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Monitor, Smartphone, MessageCircle } from "lucide-react";
import { fetchTemplate, fetchTemplates } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { TemplateThumbnail } from "@/components/TemplateThumbnail";
import { TemplateCard } from "@/components/TemplateCard";
import { CTABand } from "@/components/CTABand";
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
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke template
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                {nicheLabel(template.niche)}
              </div>
              <h1 className="display mt-4 text-4xl leading-[1.05] text-ink md:text-5xl">
                {template.name}
              </h1>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500 md:text-lg">
                {template.tagline}
              </p>
              <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink-700">
                {template.description}
              </p>

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
                {template.previewUrl ? (
                  <Button href={template.previewUrl} external variant="outline" size="lg">
                    Buka demo
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-6">
              <PreviewFrames template={template} />
            </div>
          </div>
        </div>
      </Section>

      <Section pad="md" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Apa yang Anda dapat</p>
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
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
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
            <h3 className="display text-2xl text-ink md:text-3xl">
              Template lain di kategori {nicheLabel(template.niche)}
            </h3>
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
          description="Beri tahu detail bisnis Anda — kami akan menyesuaikan copy, brand, dan integrasi WhatsApp dalam beberapa hari kerja."
        />
      </Section>
    </>
  );
}

function PreviewFrames({ template }: { template: { name: string; niche: string } }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Desktop */}
      <div className="col-span-12 lg:col-span-9">
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-ink-100 bg-paper px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-ink-400">
              <Monitor className="h-3.5 w-3.5" /> Desktop
            </div>
          </div>
          <TemplateThumbnail name={template.name} niche={template.niche} className="w-full" />
        </div>
      </div>

      {/* Mobile */}
      <div className="col-span-12 lg:col-span-3">
        <div className="mx-auto w-[180px] overflow-hidden rounded-[28px] border border-ink-100 bg-white shadow-soft">
          <div className="flex items-center justify-center border-b border-ink-100 bg-paper py-2 text-[10px] text-ink-400">
            <Smartphone className="mr-1 h-3 w-3" /> Mobile
          </div>
          <div className="aspect-[9/16] overflow-hidden">
            <TemplateThumbnail name={template.name} niche={template.niche} className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
