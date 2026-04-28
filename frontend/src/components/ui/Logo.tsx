import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { className?: string; variant?: "default" | "dark" };

export function Logo({ className, variant = "default" }: Props) {
  const isDark = variant === "dark";
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2.5 leading-none",
        isDark ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span className="display-italic text-[22px] tracking-tight">{site.brand.split(" ")[0]}</span>
      <span className="display text-[22px]">{site.brand.split(" ").slice(1).join(" ")}</span>
    </span>
  );
}
