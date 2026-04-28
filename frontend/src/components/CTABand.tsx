import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

type Props = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  primaryExternal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABand({
  title = "Diskusikan kebutuhan website & automation Anda.",
  description = "Tim kami akan membantu memetakan kebutuhan, memilih pendekatan paling efektif, lalu menyiapkan proposal yang transparan.",
  primaryLabel = "Chat Customer Service",
  primaryHref,
  primaryExternal = true,
  secondaryLabel = "Lihat paket pricing",
  secondaryHref = "/pricing",
}: Props) {
  const href = primaryHref ?? whatsappLink(PRESETS.general());

  return (
    <section className="relative overflow-hidden">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-14 text-paper md:px-16 md:py-20">
          <div className="absolute inset-0 grid-bg opacity-[0.07]" aria-hidden />
          <div className="relative grid grid-cols-1 items-end gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow !text-paper/60">{`Konsultasi`}</p>
              <h3 className="display mt-4 text-3xl leading-[1.15] md:text-4xl lg:text-5xl">
                {title}
              </h3>
            </div>
            <div className="flex flex-col gap-4 md:items-end md:text-right">
              <p className="max-w-md text-[15px] leading-relaxed text-paper/70 md:text-base">
                {description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href={href}
                  external={primaryExternal}
                  variant="secondary"
                  size="lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  {primaryLabel}
                </Button>
                {secondaryHref ? (
                  <Button href={secondaryHref} variant="ghost" size="lg" className="!text-paper hover:!bg-paper/10">
                    {secondaryLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
