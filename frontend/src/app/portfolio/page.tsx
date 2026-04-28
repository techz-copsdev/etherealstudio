import type { Metadata } from "next";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { TemplateThumbnail } from "@/components/TemplateThumbnail";
import { fetchPortfolio } from "@/lib/api";
import { nicheLabel } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio & Case Study",
  description: "Studi kasus project yang kami kerjakan: tantangan, pendekatan, dan hasil bisnis.",
};

export default async function PortfolioPage() {
  const cases = await fetchPortfolio().catch(() => []);

  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <p className="eyebrow">Portfolio & Case Study</p>
          <h1 className="display mt-6 max-w-4xl text-4xl leading-[1.05] text-ink md:text-6xl">
            Hasil yang kami pertanggungjawabkan, bukan sekadar showcase.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
            Kami fokus pada metrik bisnis: konversi, lead masuk, efisiensi tim, dan kualitas
            prospect — bukan hanya estetika.
          </p>
        </div>
      </Section>

      <Section pad="md" bordered>
        <div className="container-wide">
          {cases.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 px-8 py-16 text-center">
              <h3 className="display text-2xl text-ink">Studi kasus akan segera kami tampilkan.</h3>
              <p className="mt-3 text-ink-500">Sementara, hubungi kami untuk melihat case study spesifik industri Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:gap-16">
              {cases.map((c, i) => (
                <article
                  key={c.id}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div className={i % 2 === 0 ? "lg:col-span-5" : "lg:order-2 lg:col-span-5"}>
                    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
                      <TemplateThumbnail
                        name={c.client}
                        niche={c.niche}
                        className="aspect-[4/3] w-full"
                      />
                    </div>
                  </div>

                  <div className={i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-7"}>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
                      {c.industry} · {nicheLabel(c.niche)}
                    </div>
                    <h2 className="display mt-3 text-2xl leading-tight text-ink md:text-3xl">
                      {c.client}
                    </h2>
                    <p className="mt-4 max-w-prose text-[15.5px] leading-relaxed text-ink-700">
                      {c.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                      <CaseBlock label="Tantangan" value={c.challenge} />
                      <CaseBlock label="Solusi" value={c.solution} />
                      <CaseBlock
                        label="Hasil"
                        value={c.outcome}
                        accent
                        icon={<TrendingUp className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section pad="lg">
        <CTABand
          title="Ingin hasil serupa untuk bisnis Anda?"
          description="Cerita kondisi bisnis Anda saat ini — kami siapkan analisis & pendekatan yang relevan."
        />
      </Section>
    </>
  );
}

function CaseBlock({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: string;
  accent?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
        {icon}
        {label}
      </div>
      <p
        className={
          accent
            ? "mt-3 display text-xl leading-tight text-accent-700"
            : "mt-3 text-[14px] leading-relaxed text-ink-700"
        }
      >
        {value}
      </p>
    </div>
  );
}
