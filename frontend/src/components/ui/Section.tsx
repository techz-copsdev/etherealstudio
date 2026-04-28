import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Section vertical rhythm. */
  pad?: "sm" | "md" | "lg";
  bordered?: boolean;
};

const padClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
} as const;

export function Section({ id, children, className, pad = "md", bordered = false }: Props) {
  return (
    <section
      id={id}
      className={cn(padClasses[pad], bordered && "border-t border-ink-100", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <h2 className="display text-3xl leading-[1.1] text-ink md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
