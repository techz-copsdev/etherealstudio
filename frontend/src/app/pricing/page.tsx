import type { Metadata } from "next";
import Link from "next/link";
import { Check, MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Paket Website & Automation",
  description: "Paket transparan untuk landing page, website custom, dan IT automation. Custom quotation untuk kebutuhan kompleks.",
};

const plans = [
  {
    name: "Basic",
    label: "Untuk yang baru memulai",
    price: "Mulai 4,5 jt",
    period: "/ project",
    description:
      "Landing page profesional menggunakan template, dikustomisasi untuk brand dan integrasi WhatsApp Anda.",
    features: [
      "1 landing page (template)",
      "Custom copy & branding ringan",
      "Integrasi WhatsApp",
      "SEO basic & Open Graph",
      "Hosting setup (1 tahun)",
      "Garansi revisi 14 hari",
    ],
    ctaLabel: "Pilih Basic",
    plan: "Basic",
  },
  {
    name: "Pro",
    label: "Paling populer",
    price: "Mulai 9,5 jt",
    period: "/ project",
    description:
      "Landing page atau company profile custom dengan struktur konversi yang dirancang khusus.",
    features: [
      "1–3 halaman premium",
      "Custom UI / UX",
      "Form konsultasi terstruktur",
      "WhatsApp routing & analytics",
      "Studi kasus & testimoni section",
      "Garansi revisi 30 hari",
    ],
    ctaLabel: "Pilih Pro",
    plan: "Pro",
    featured: true,
  },
  {
    name: "Premium",
    label: "Untuk bisnis serius",
    price: "Mulai 22 jt",
    period: "/ project",
    description:
      "Website + sales funnel + automation. Cocok untuk klinik multi-cabang, kontraktor, atau corporate.",
    features: [
      "Website multi-page premium",
      "Sales funnel & lead routing",
      "WhatsApp automation (basic)",
      "Admin panel terpisah",
      "Analytics & dashboard",
      "Garansi revisi 60 hari",
    ],
    ctaLabel: "Pilih Premium",
    plan: "Premium",
  },
  {
    name: "Custom",
    label: "Solusi sesuai kebutuhan",
    price: "Quotation",
    period: "",
    description:
      "Untuk kebutuhan kompleks: marketplace, multi-tenant SaaS, automation skala enterprise, atau integrasi sistem internal.",
    features: [
      "Discovery & blueprint",
      "Custom system development",
      "Integrasi multi-platform",
      "Dedicated project lead",
      "Maintenance & SLA",
      "NDA tersedia",
    ],
    ctaLabel: "Request Quotation",
    plan: "Custom",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <p className="eyebrow">Pricing</p>
          <h1 className="display mt-6 max-w-3xl text-4xl leading-[1.05] text-ink md:text-6xl">
            Paket transparan. Tanpa biaya tersembunyi.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
            Setiap paket dirancang untuk tahap bisnis berbeda. Bila tidak ada yang cocok, kami buat
            quotation custom sesuai kebutuhan.
          </p>
        </div>
      </Section>

      <Section pad="md" bordered>
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-7",
                  p.featured ? "border-ink shadow-soft" : "border-ink-100",
                )}
              >
                {p.featured ? (
                  <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-ink px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-paper">
                    {p.label}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                    {p.label}
                  </span>
                )}

                <h3 className="display mt-4 text-2xl text-ink">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="display text-3xl text-ink">{p.price}</span>
                  {p.period ? <span className="text-sm text-ink-400">{p.period}</span> : null}
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-500">{p.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href={whatsappLink(PRESETS.pricing(p.plan))}
                    external
                    variant={p.featured ? "primary" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {p.ctaLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Apa yang termasuk"
              title="Setiap paket sudah termasuk pondasi yang dibutuhkan untuk launch."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
              {[
                "Discovery & strategy session",
                "Copywriting konversi",
                "Responsive desktop & mobile",
                "SEO meta & structured data",
                "Setup hosting & domain",
                "Integrasi Google Analytics",
                "WhatsApp deep link",
                "Training admin panel",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader eyebrow="FAQ" title="Pertanyaan yang paling sering ditanyakan." />
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {[
              {
                q: "Apakah ada biaya bulanan?",
                a: "Tidak ada biaya wajib bulanan. Hosting & domain dibayar tahunan. Maintenance opsional, sesuai kebutuhan.",
              },
              {
                q: "Berapa lama waktu pengerjaan?",
                a: "Basic 7–14 hari kerja. Pro 14–21 hari kerja. Premium & Custom tergantung kompleksitas, biasanya 4–8 minggu.",
              },
              {
                q: "Bagaimana proses pembayaran?",
                a: "DP 50% di awal, 50% saat go-live. Untuk paket Custom, pembayaran bertahap mengikuti milestone.",
              },
              {
                q: "Apakah saya bisa minta revisi?",
                a: "Ya, tiap paket sudah termasuk masa garansi revisi. Di luar masa garansi, revisi mengikuti rate jam kerja yang transparan.",
              },
            ].map((qa) => (
              <div key={qa.q}>
                <h4 className="display text-lg text-ink">{qa.q}</h4>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{qa.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent-700"
            >
              Masih ada pertanyaan? Hubungi kami
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section pad="lg">
        <CTABand title="Tidak yakin paket yang tepat? Kami bantu petakan." />
      </Section>
    </>
  );
}
