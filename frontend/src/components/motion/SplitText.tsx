"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: string;
  className?: string;
  italicWords?: string[];
  delay?: number;
  stagger?: number;
};

export function SplitText({
  children,
  className,
  italicWords = [],
  delay = 0.05,
  stagger = 0.04,
}: Props) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => {
          const isItalic = italicWords.includes(w.replace(/[.,—]/g, ""));
          return (
            <span key={i}>
              {isItalic ? <em className="display-italic">{w}</em> : w}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => {
        const cleaned = word.replace(/[.,—]/g, "");
        const isItalic = italicWords.includes(cleaned);
        return (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              initial={{ y: "108%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {isItalic ? <em className="display-italic">{word}</em> : word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function SplitLines({
  lines,
  className,
  delay = 0.05,
  stagger = 0.06,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          {reduce ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.9,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
