import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  LayoutTemplate,
  Code2,
  Workflow,
  ShieldCheck,
  Sparkles,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { TemplateCard } from "@/components/TemplateCard";
import { fetchTemplates } from "@/lib/api";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await safeFetchFeatured();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.5]" aria-hidden />
        <div className="container-wide relative grid grid-cols-1 gap-16 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Premium Digital Service Provider</p>
            <h1 className="display mt-6 text-4xl leading-[1.05] text-ink md:text-6xl lg:text-[68px]">
              Website yang dirancang untuk{" "}
              <span className="italic text-accent-600">mengonversi</span>, bukan sekadar tampil.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
              Kami merancang landing page, website custom, dan IT automation untuk bisnis serius —
              UMKM, klinik, kontraktor, properti, hingga corporate. Pilih template, preview,
              konsultasikan kebutuhan Anda, lalu kami eksekusi.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={whatsappLink(PRESETS.general())} external variant="primary" size="lg">
                <MessageCircle className="h-4 w-4" />
                Diskusikan kebutuhan Anda
              </Button>
              <Button href="/templates" variant="outline" size="lg">
                Lihat template
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 text-[15px] text-ink-600 sm:grid-cols-2">
              {[
                "Konsultasi langsung dengan owner",
                "Closing via WhatsApp, bukan checkout buta",
                "Frontend & backend terpisah, scalable",
                "Fokus konversi, bukan style asal jadi",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* TRUST / METRICS STRIP */}
      <Section pad="sm" bordered>
        <div className="container-wide grid grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { value: "120+", label: "Project diluncurkan" },
            { value: "11", label: "Industri vertikal" },
            { value: "+187%", label: "Rata-rata uplift konversi" },
            { value: "≤14 hari", label: "Timeline landing page" },
          ].map((m) => (
            <div key={m.label}>
              <div className="display text-3xl text-ink md:text-4xl">{m.value}</div>
              <div className="mt-2 text-sm text-ink-500">{m.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Layanan"
            title="Tiga lini layanan yang saling melengkapi."
            description="Mulai dari template siap pakai hingga sistem otomasi internal — kami menyusun pendekatan yang sesuai dengan tahap bisnis Anda."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <ServiceCard
              icon={<LayoutTemplate className="h-5 w-5" />}
              title="Template Landing Page"
              description="Pilih dari koleksi template per niche. Customize copy, brand, dan integrasi WhatsApp lalu siap launch."
              href="/templates"
              cta="Lihat template"
            />
            <ServiceCard
              icon={<Code2 className="h-5 w-5" />}
              title="Custom Website"
              description="Company profile, sales funnel, corporate website, hingga website dengan sistem custom yang sesuai workflow Anda."
              href="/services/website"
              cta="Pelajari layanan"
            />
            <ServiceCard
              icon={<Workflow className="h-5 w-5" />}
              title="IT Automation"
              description="WhatsApp automation, CRM, lead management, internal dashboard, dan workflow otomatis untuk efisiensi tim."
              href="/services/automation"
              cta="Pelajari layanan"
            />
          </div>
        </div>
      </Section>

      {/* FEATURED TEMPLATES */}
      <Section pad="lg" bordered>
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Template Pilihan"
              title="Template paling sering dipilih klien."
              description="Setiap template dirancang per industri — bukan cuma desain, tetapi struktur konversi yang sudah teruji."
            />
            <Link
              href="/templates"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent-700"
            >
              Lihat semua template
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </Section>

      {/* WHY US */}
      <Section pad="lg" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Mengapa kami"
              title="Kami memposisikan diri sebagai partner, bukan vendor cetakan."
              description="Setiap project dimulai dari pertanyaan strategis. Kami tidak membuat website cantik yang gagal mendatangkan lead."
            />
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            <Pillar
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Trust-first design"
              description="Setiap section dibangun untuk meningkatkan kepercayaan: testimoni, sertifikasi, transparansi pricing, lokasi, dan studi kasus."
            />
            <Pillar
              icon={<Gauge className="h-5 w-5" />}
              title="Performance & SEO"
              description="Stack modern (Next.js 14), bobot ringan, structured data, sitemap otomatis, dan optimasi Core Web Vitals."
            />
            <Pillar
              icon={<Workflow className="h-5 w-5" />}
              title="Operational automation"
              description="Lead masuk langsung dialirkan ke WhatsApp atau CRM. Tidak ada lead yang hilang di tengah jalan."
            />
            <Pillar
              icon={<Sparkles className="h-5 w-5" />}
              title="Premium craft"
              description="Typography kuat, whitespace generous, hierarki tajam. Bukan template AI generator — dibuat seperti high-end agency."
            />
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Proses"
            title="Empat tahap. Transparan. Terstruktur."
          />
          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 md:grid-cols-4">
            {[
              {
                k: "01",
                t: "Konsultasi",
                d: "Anda chat ke customer service. Kami pahami bisnis, target audience, dan tujuan utama project.",
              },
              {
                k: "02",
                t: "Pilih pendekatan",
                d: "Template siap pakai, custom website, atau gabungan dengan automation. Kami sodorkan opsi paling efektif.",
              },
              {
                k: "03",
                t: "Eksekusi",
                d: "Tim kami merancang & develop. Anda dapat preview di setiap milestone, bukan hanya di akhir.",
              },
              {
                k: "04",
                t: "Launch & support",
                d: "Go live, training admin panel, hingga dukungan iterasi pasca-launch agar konversi naik konsisten.",
              },
            ].map((step) => (
              <li key={step.k} className="bg-paper p-8">
                <div className="text-xs font-medium tracking-[0.18em] text-ink-400">{step.k}</div>
                <div className="display mt-4 text-xl text-ink">{step.t}</div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* TARGET INDUSTRIES */}
      <Section pad="md" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Industri yang kami layani"
            title="Bisnis kami pelajari, bukan sekadar dipoles."
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {[
              "UMKM",
              "Klinik",
              "Kontraktor",
              "Properti",
              "Catering",
              "Travel",
              "Wedding Organizer",
              "Gym & Fitness",
              "Skincare",
              "Corporate",
              "Konsultan",
              "Edukasi",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-ink-200 px-4 py-1.5 text-sm text-ink-700"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section pad="lg">
        <CTABand />
      </Section>
    </>
  );
}

async function safeFetchFeatured() {
  try {
    const items = await fetchTemplates({ featured: true });
    return items.slice(0, 3);
  } catch {
    return [];
  }
}

function ServiceCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-8 transition-all hover:border-ink-200 hover:shadow-soft"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 bg-paper text-ink">
        {icon}
      </div>
      <h3 className="display mt-6 text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{description}</p>
      <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-accent-700">
        {cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function Pillar({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-100 bg-paper text-ink">
        {icon}
      </div>
      <div>
        <h4 className="display text-lg text-ink">{title}</h4>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{description}</p>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
        <div className="flex items-center gap-1.5 border-b border-ink-100 bg-paper px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="ml-3 text-[11px] tracking-[0.14em] text-ink-400">
            studio.id/preview/klinik
          </span>
        </div>
        <div className="grid grid-cols-12 gap-4 p-6">
          <div className="col-span-12">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-600">
              Klinik · Healthcare
            </div>
            <div className="display mt-3 text-[26px] leading-tight text-ink">
              Perawatan yang terpercaya, jadwal yang fleksibel.
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
              Booking janji temu langsung ke WhatsApp. Tidak ada antrean panjang.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex h-7 items-center rounded-full bg-ink px-3 text-[11px] font-medium text-paper">
                Booking via WhatsApp
              </span>
              <span className="inline-flex h-7 items-center rounded-full border border-ink-200 px-3 text-[11px] text-ink-700">
                Lihat layanan
              </span>
            </div>
          </div>
          <div className="col-span-7 mt-4 h-24 rounded-lg bg-accent-50" />
          <div className="col-span-5 mt-4 grid grid-rows-2 gap-2">
            <div className="rounded-lg bg-ink-50" />
            <div className="rounded-lg bg-ink-50" />
          </div>
          <div className="col-span-12 mt-2 h-2 w-3/4 rounded bg-ink-100" />
          <div className="col-span-12 h-2 w-2/3 rounded bg-ink-100" />
          <div className="col-span-12 h-2 w-1/2 rounded bg-ink-100" />
        </div>
      </div>

      {/* Floating chip */}
      <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-soft md:block">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Lead masuk
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-ink">
          <MessageCircle className="h-4 w-4 text-accent-600" />
          +12 WhatsApp / hari
        </div>
      </div>
    </div>
  );
}
