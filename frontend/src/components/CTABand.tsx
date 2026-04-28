import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  primaryExternal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABand({
  eyebrow = "Konsultasi",
  title = "Diskusikan kebutuhan website & automation Anda.",
  description = "Tim kami akan membantu memetakan kebutuhan, memilih pendekatan paling efektif, lalu menyiapkan proposal yang transparan.",
  primaryLabel = "Chat Customer Service",
  primaryHref,
  primaryExternal = true,
  secondaryLabel = "Lihat template",
  secondaryHref = "/templates",
}: Props) {
  const href = primaryHref ?? whatsappLink(PRESETS.general());

  return (
    <section className="relative">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-ink/[0.06] bg-ink px-6 py-16 text-paper md:px-16 md:py-24">
            <div className="absolute inset-0 grid-bg-dark opacity-50" aria-hidden />
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
              aria-hidden
            />

            <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="eyebrow-on-dark">{eyebrow}</span>
                <h3 className="display mt-5 text-3xl leading-[1.1] text-balance md:text-4xl lg:text-5xl">
                  {title.split("&").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 ? <span className="gold-italic">&</span> : null}
                    </span>
                  ))}
                </h3>
              </div>
              <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right">
                <p className="max-w-md text-[15px] leading-relaxed text-paper/70 md:text-base">
                  {description}
                </p>
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <Button href={href} external={primaryExternal} variant="gold" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    {primaryLabel}
                  </Button>
                  {secondaryHref ? (
                    <Link
                      href={secondaryHref}
                      className="inline-flex items-center gap-2 text-sm text-paper/80 hover:text-paper"
                    >
                      {secondaryLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
