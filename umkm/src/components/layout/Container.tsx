import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Set to true to allow content to extend full viewport width (no max). */
  fluid?: boolean;
}

/**
 * Site container. By default capped at 1280px so wide screens stay readable
 * while keeping the edge-to-edge feeling on mobile/tablet (24px gutters).
 * Use `fluid` for hero/header sections that should reach the viewport edges.
 */
export function Container({ children, className, style, fluid = false }: Props) {
  const maxWidth = fluid ? "100%" : 1280;
  return (
    <div
      className={`container ${className ?? ""}`.trim()}
      style={{ maxWidth, marginLeft: "auto", marginRight: "auto", ...style }}
    >
      {children}
    </div>
  );
}
