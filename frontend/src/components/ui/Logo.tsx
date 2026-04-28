import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { className?: string; variant?: "default" | "dark" };

export function Logo({ className, variant = "default" }: Props) {
  const isDark = variant === "dark";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex h-9 w-9 items-center justify-center rounded-full",
          isDark ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M9 1.2l2.31 4.68 5.16.75-3.74 3.65.88 5.14L9 12.97 4.39 15.42l.88-5.14L1.53 6.63l5.16-.75L9 1.2z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="9" cy="9" r="1.4" fill="#B8924E" />
        </svg>
      </span>
      <span className="display flex flex-col leading-none">
        <span
          className={cn(
            "text-[16px] font-medium tracking-tightish",
            isDark ? "text-paper" : "text-ink",
          )}
        >
          {site.brand}
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] uppercase tracking-widest2",
            isDark ? "text-accent-400" : "text-accent-600",
          )}
        >
          Digital Service Studio
        </span>
      </span>
    </div>
  );
}
