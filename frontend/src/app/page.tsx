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
import { HeroVisual } from "@/components/HeroVisual";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { fetchTemplates } from "@/lib/api";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { NICHES } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await safeFetchFeatured();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.6]" aria-hidden />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl"
          aria-hidden
        />

        <div className="container-wide relative grid grid-cols-1 gap-16 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-24">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <p className="eyebrow">Premium Digital Service Studio · Est. Jakarta</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="display mt-7 text-balance text-4xl leading-[1.04] text-ink md:text-6xl lg:text-[70px]">
                Website yang dirancang untuk{" "}
                <span className="gold-italic">mengonversi</span>,{" "}
                <span className="text-ink-400">bukan</span> sekadar tampil.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
                Kami merancang landing page, website custom, dan IT automation untuk bisnis serius —
                UMKM, klinik, kontraktor, properti, hingga corporate. Pilih template, lihat preview
                penuh per industri, lalu konsultasikan kebutuhan Anda.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
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
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 text-[15px] text-ink-600 sm:grid-cols-2">
                {[
                  "Konsultasi langsung dengan owner",
                  "Closing via WhatsApp, bukan checkout buta",
                  "Frontend & backend terpisah, scalable",
                  "Fokus konversi, bukan style asal jadi",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <section className="relative border-y border-ink/[0.06] bg-cream/40 py-6">
        <Marquee speed={48} className="text-ink-500">
          {NICHES.map((n) => (
            <span
              key={n.value}
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-widest2"
            >
              <span className="h-1 w-1 rounded-full bg-accent-500" />
              {n.label}
            </span>
          ))}
        </Marquee>
      </section>

      {/* METRICS */}
      <Section pad="sm" bordered>
        <div className="container-wide">
          <Stagger className="grid grid-cols-2 gap-x-10 gap-y-12 md:grid-cols-4">
            {[
              { value: "120+", label: "Project diluncurkan" },
              { value: "10", label: "Industri vertikal" },
              { value: "+187%", label: "Rata-rata uplift konversi" },
              { value: "≤14 hari", label: "Timeline landing page" },
            ].map((m, i) => (
              <StaggerItem key={m.label}>
                <div className="relative">
                  <span className="absolute -left-3 top-1 h-6 w-px bg-accent-500/60" />
                  <div className="display text-[34px] leading-none text-ink md:text-[44px]">
                    {m.value}
                  </div>
                  <div className="mt-3 text-[13px] uppercase tracking-widest2 text-ink-400">
                    {String(i + 1).padStart(2, "0")} · {m.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* SERVICES */}
      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Layanan"
            title={
              <>
                Tiga lini layanan yang saling{" "}
                <span className="gold-italic">melengkapi.</span>
              </>
            }
            description="Mulai dari template siap pakai hingga sistem otomasi internal — kami menyusun pendekatan yang sesuai dengan tahap bisnis Anda."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
            <StaggerItem>
              <ServiceCard
                idx="01"
                icon={<LayoutTemplate className="h-5 w-5" />}
                title="Template Landing Page"
                description="Pilih dari koleksi template per niche. Lihat preview asli, customize copy, brand, dan integrasi WhatsApp lalu siap launch."
                href="/templates"
                cta="Lihat showroom"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                idx="02"
                icon={<Code2 className="h-5 w-5" />}
                title="Custom Website"
                description="Company profile, sales funnel, corporate website, hingga website dengan sistem custom yang sesuai workflow Anda."
                href="/services/website"
                cta="Pelajari layanan"
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                idx="03"
                icon={<Workflow className="h-5 w-5" />}
                title="IT Automation"
                description="WhatsApp automation, CRM, lead management, internal dashboard, dan workflow otomatis untuk efisiensi tim."
                href="/services/automation"
                cta="Pelajari layanan"
              />
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      {/* FEATURED TEMPLATES */}
      <Section pad="lg" bordered>
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Template Pilihan"
              title={
                <>
                  Template paling sering <span className="gold-italic">dipilih</span> klien.
                </>
              }
              description="Setiap template dirancang per industri — bukan cuma desain, tetapi struktur konversi yang sudah teruji. Buka preview untuk melihat langsung."
            />
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent-700"
            >
              Lihat semua template
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {featured.map((t) => (
              <StaggerItem key={t.id}>
                <TemplateCard template={t} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* WHY US */}
      <Section pad="lg" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Mengapa kami"
              title={
                <>
                  Kami partner, <br />
                  <span className="gold-italic">bukan vendor cetakan.</span>
                </>
              }
              description="Setiap project dimulai dari pertanyaan strategis. Kami tidak membuat website cantik yang gagal mendatangkan lead."
            />
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            <Pillar
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Trust-first design"
              description="Setiap section dibangun untuk meningkatkan kepercayaan: testimoni, sertifikasi, lokasi, dan studi kasus yang relevan."
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
            title={
              <>
                Empat tahap. <span className="gold-italic">Transparan.</span> Terstruktur.
              </>
            }
          />
          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-ink/[0.08] bg-ink/[0.06] md:grid-cols-4">
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
              <li key={step.k} className="group relative bg-paper p-8 transition-colors hover:bg-cream/40">
                <span className="absolute left-8 top-8 inline-block h-6 w-px bg-accent-500/70 transition-all duration-300 group-hover:h-8" />
                <div className="ml-4 text-xs font-medium uppercase tracking-widest2 text-ink-400">
                  {step.k}
                </div>
                <div className="display ml-4 mt-3 text-xl text-ink">{step.t}</div>
                <p className="ml-4 mt-3 text-[14.5px] leading-relaxed text-ink-500">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section pad="md" bordered>
        <div className="container-wide">
          <SectionHeader
            eyebrow="Industri yang kami layani"
            title="Bisnis kami pelajari, bukan sekadar dipoles."
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {NICHES.map((n) => (
              <Link
                key={n.value}
                href={`/templates?niche=${n.value}`}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/[0.1] px-4 py-2 text-[13px] text-ink-600 transition-all hover:border-accent-500 hover:bg-cream/40 hover:text-ink"
              >
                <span className="h-1 w-1 rounded-full bg-accent-500 transition-all group-hover:w-2" />
                {n.label}
              </Link>
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
    const all = await fetchTemplates({ featured: true });
    return all.slice(0, 6);
  } catch {
    return [];
  }
}

function ServiceCard({
  idx,
  icon,
  title,
  description,
  href,
  cta,
}: {
  idx: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col rounded-2xl border border-ink/[0.08] bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-plate"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/[0.08] bg-cream/40 text-accent-700">
          {icon}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-widest2 text-ink-400">
          {idx}
        </span>
      </div>
      <h3 className="display mt-7 text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{description}</p>
      <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        {cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
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
    <div>
      <span className="grid h-10 w-10 place-items-center rounded-full border border-accent-500/30 bg-cream/40 text-accent-700">
        {icon}
      </span>
      <h4 className="display mt-5 text-xl text-ink">{title}</h4>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
