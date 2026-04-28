import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Template } from "@/lib/api";
import { nicheLabel } from "@/lib/site";
import { TemplateThumbnail } from "@/components/TemplateThumbnail";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all hover:border-ink-200 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-50">
        <TemplateThumbnail name={template.name} niche={template.niche} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-700 backdrop-blur">
          {nicheLabel(template.niche)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-xl text-ink">{template.name}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-400 transition-colors group-hover:text-ink" />
        </div>
        <p className="text-[14.5px] leading-relaxed text-ink-500">{template.tagline}</p>
      </div>
    </Link>
  );
}
