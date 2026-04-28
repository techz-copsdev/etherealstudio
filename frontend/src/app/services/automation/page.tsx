import type { Metadata } from "next";
import { ArrowUpRight, Bot, Database, GitBranch, LineChart, MessageCircle, Workflow, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "IT Automation & System Development",
  description:
    "WhatsApp automation, CRM integration, lead management, internal dashboard, dan workflow otomatis untuk efisiensi tim.",
};

const services = [
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "WhatsApp Automation",
    description:
      "Auto-reply terstruktur, broadcast tersegmentasi, hingga handover ke human untuk pertanyaan kompleks.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "CRM Integration",
    description:
      "Hubungkan website, WhatsApp, dan internal system ke CRM. Tidak ada lead yang hilang di tengah jalan.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Lead Management",
    description:
      "Capture, kualifikasi, dan distribusi lead ke sales secara otomatis berdasarkan prioritas atau wilayah.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Workflow Automation",
    description:
      "Otomatisasi proses bisnis berulang: approval, notifikasi, status update, hingga reporting harian.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Internal Dashboard",
    description:
      "Dashboard untuk owner & manager: KPI, performa channel, aktivitas tim, dan health metric bisnis.",
  },
  {
    icon: <Bot className="h-5 w-5" />,
    title: "Custom Admin System",
    description:
      "Admin panel khusus untuk operasional tim: input data, manajemen konten, hingga konfigurasi otomasi.",
  },
];

const flow = [
  { k: "01", t: "Discovery", d: "Audit proses saat ini, identifikasi bottleneck, dan tujuan otomatisasi." },
  { k: "02", t: "Blueprint", d: "Rancang flow, integrasi sistem, dan rule otomatisasi." },
  { k: "03", t: "Build", d: "Implementasi, testing, dan integrasi ke sistem yang sudah berjalan." },
  { k: "04", t: "Iterate", d: "Monitoring, tuning rule, dan ekspansi ke proses lain." },
];

export default function AutomationServicePage() {
  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <p className="eyebrow">IT Automation & System Development</p>
          <h1 className="display mt-6 max-w-4xl text-4xl leading-[1.05] text-ink md:text-6xl">
            Pekerjaan repetitif tim Anda, kami otomatisasi.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
            Solusi end-to-end untuk efisiensi operasional: dari WhatsApp automation, CRM, hingga
            internal dashboard. Tim tetap berkonsentrasi pada hal strategis.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsappLink(PRESETS.automation())} external variant="primary" size="lg">
              <MessageCircle className="h-4 w-4" />
              Diskusikan kebutuhan automation
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              Lihat studi kasus
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Layanan"
            title="Enam area otomatisasi yang paling berdampak."
            description="Kombinasi yang paling sering kami implementasikan untuk klien skala UMKM hingga corporate."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-ink-100 bg-white p-7">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 bg-paper text-ink">
                  {s.icon}
                </div>
                <h3 className="display mt-6 text-xl text-ink">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader eyebrow="Proses" title="Empat tahap, fokus pada hasil." />
          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 md:grid-cols-4">
            {flow.map((step) => (
              <li key={step.k} className="bg-paper p-8">
                <div className="text-xs font-medium tracking-[0.18em] text-ink-400">{step.k}</div>
                <div className="display mt-4 text-xl text-ink">{step.t}</div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Integrasi"
              title="Bekerja dengan tools yang sudah Anda pakai."
              description="Kami tidak memaksa Anda mengganti sistem. Kami integrasikan apa yang sudah berjalan."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "WhatsApp Business API",
                "Google Sheets",
                "Notion",
                "Airtable",
                "Slack",
                "HubSpot",
                "Zoho CRM",
                "Pipedrive",
                "Mailchimp",
                "Stripe / Midtrans",
                "Xendit",
                "Custom API",
              ].map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-ink-100 bg-white px-3 py-2.5 text-[13.5px] text-ink-700"
                >
                  <GitBranch className="h-3.5 w-3.5 text-ink-400" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section pad="lg">
        <CTABand
          title="Mulai dari proses paling memakan waktu."
          description="Cerita workflow harian tim Anda — kami bantu identifikasi proses yang paling cepat memberikan ROI."
          primaryHref={whatsappLink(PRESETS.automation())}
        />
      </Section>
    </>
  );
}
