import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Template } from "@/lib/api";
import { nicheLabel } from "@/lib/site";
import { TemplateThumbnail } from "@/components/TemplateThumbnail";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500/40 hover:shadow-plate">
      <Link
        href={`/templates/${template.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-50"
        aria-label={`Detail ${template.name}`}
      >
        <TemplateThumbnail
          name={template.name}
          niche={template.niche}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-ink-700 backdrop-blur">
          <span className="inline-block h-1 w-1 rounded-full bg-accent-500" />
          {nicheLabel(template.niche)}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-xl text-ink">{template.name}</h3>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/[0.1] text-ink-400 transition-colors group-hover:border-ink group-hover:text-ink">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="text-[14.5px] leading-relaxed text-ink-500">{template.tagline}</p>
        <div className="mt-auto flex items-center justify-between border-t border-ink/[0.06] pt-4 text-[13px]">
          <Link
            href={`/templates/${template.slug}`}
            className="link-underline font-medium text-ink"
          >
            Detail template
          </Link>
          <Link
            href={`/preview/${template.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent-700 hover:text-accent-600"
          >
            Buka preview
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
