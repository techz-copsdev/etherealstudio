"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle cursor companion — a small dot that lags slightly behind the real cursor.
 * Disabled on touch devices and for users with prefers-reduced-motion.
 * Grows on hover over interactive elements (a, button, [data-cursor]).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || isTouch) return;
    setEnabled(true);

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onHoverIn = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t.closest('a, button, [data-cursor="hover"]')) return;
      ringRef.current?.classList.add("is-active");
    };
    const onHoverOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t.closest('a, button, [data-cursor="hover"]')) return;
      ringRef.current?.classList.remove("is-active");
    };
    const onLeave = () => {
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };
    const onEnter = () => {
      dotRef.current?.style.setProperty("opacity", "1");
      ringRef.current?.style.setProperty("opacity", "1");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHoverIn);
    window.addEventListener("mouseout", onHoverOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHoverIn);
      window.removeEventListener("mouseout", onHoverOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-ink mix-blend-difference transition-opacity duration-200 md:block"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-ink/30 mix-blend-difference transition-[width,height,border-color] duration-300 md:block"
        style={{ transform: "translate3d(-100px,-100px,0)", transitionTimingFunction: "var(--easing)" }}
      />
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button, [role="button"] { cursor: none; }
          input, textarea, select { cursor: text; }
        }
        .cursor-ring.is-active {
          width: 56px;
          height: 56px;
          border-color: rgba(184, 92, 56, 0.7);
        }
      `}</style>
    </>
  );
}
