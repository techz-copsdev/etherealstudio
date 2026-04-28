import type { Metadata } from "next";
import { Check, MessageCircle, ArrowUpRight, Globe2, FileCode2, Layers, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Custom Website Service",
  description:
    "Pembuatan website custom: company profile, landing page, sales funnel, corporate website, dan website dengan sistem custom.",
};

const offerings = [
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: "Company Profile",
    description:
      "Website resmi perusahaan dengan struktur premium: tentang, layanan, klien, sertifikasi, hingga form proposal.",
    bullets: ["Halaman About strategis", "Listing layanan & paket", "Klien & partner", "Form request proposal"],
  },
  {
    icon: <FileCode2 className="h-5 w-5" />,
    title: "Landing Page Konversi Tinggi",
    description:
      "Single-page yang dirancang untuk satu tujuan: konversi maksimal dari traffic iklan dan SEO.",
    bullets: [
      "Headline & sub-headline strategis",
      "Section testimonial & studi kasus",
      "Lead capture & WhatsApp routing",
      "A/B test ready",
    ],
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Sales Funnel Website",
    description:
      "Multi-step funnel: lead magnet, qualifying questions, dan handover ke sales / WhatsApp untuk closing.",
    bullets: ["Multi-step intake form", "Routing otomatis ke sales", "Email/WA notification", "Funnel analytics"],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Website Sistem Custom",
    description:
      "Membership area, marketplace ringan, booking system, atau dashboard internal — kami rancang sesuai workflow.",
    bullets: ["Auth & role management", "Custom database", "API integration", "Admin dashboard"],
  },
];

export default function CustomWebsiteServicePage() {
  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <p className="eyebrow">Custom Website Service</p>
          <h1 className="display mt-6 max-w-4xl text-4xl leading-[1.05] text-ink md:text-6xl">
            Website yang dirancang seserius bisnis Anda.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
            Dari company profile premium hingga website dengan sistem custom — kami merancang
            arsitektur, copy, dan UI untuk hasil yang membantu Anda menutup deal lebih banyak.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsappLink(PRESETS.customWebsite())} external variant="primary" size="lg">
              <MessageCircle className="h-4 w-4" />
              Diskusikan kebutuhan
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              Lihat pricing
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Lini Layanan"
            title="Empat tipe website yang paling sering kami kerjakan."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 bg-paper text-ink">
                  {o.icon}
                </div>
                <h3 className="display mt-6 text-2xl text-ink">{o.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{o.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Stack & arsitektur"
            title="Modern, tanpa overengineering."
            description="Kami memilih stack berdasarkan kebutuhan project — bukan trend. Frontend & backend selalu dipisah agar mudah di-redesign atau di-replatform di masa depan."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StackCard
              title="Frontend"
              items={["Next.js / React", "TypeScript", "Tailwind CSS", "Static & ISR rendering"]}
            />
            <StackCard
              title="Backend"
              items={["Node.js / Express atau Python", "PostgreSQL / MySQL", "REST atau GraphQL API", "Admin panel terpisah"]}
            />
            <StackCard
              title="Operations"
              items={["CI/CD otomatis", "Monitoring & error tracking", "Backup terjadwal", "SEO & analytics"]}
            />
          </div>
        </div>
      </Section>

      <Section pad="lg">
        <CTABand
          title="Siap merancang website yang serius?"
          description="Cerita kebutuhan bisnis Anda. Kami siapkan proposal beserta opsi pendekatan dalam 1–2 hari kerja."
          primaryHref={whatsappLink(PRESETS.customWebsite())}
        />
      </Section>
    </>
  );
}

function StackCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-7">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">{title}</div>
      <ul className="mt-5 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="text-[14.5px] text-ink-700">
            · {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
