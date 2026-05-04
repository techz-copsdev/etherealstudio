import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Full-width container with consistent side padding. Edge-to-edge by design —
 * no fixed max-width on most screens.
 */
export function Container({ children, className, style }: Props) {
  return (
    <div className={`container ${className ?? ""}`.trim()} style={style}>
      {children}
    </div>
  );
}
