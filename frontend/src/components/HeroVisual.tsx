"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Layered hero visual — three offset "plates" suggesting overlapping
 * landing-page previews. Pure SVG, no stock imagery. The plates shift slightly
 * on mount for a single, restrained reveal.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  const ease = [0.22, 0.61, 0.36, 1] as const;
  const enter = (delay: number, dx = 0, dy = 16) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: dx, y: dy },
    animate: reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <div className="relative aspect-[5/6] w-full max-w-md mx-auto lg:mx-0">
      {/* Soft gold halo */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[40px] bg-accent-500/10 blur-3xl"
        aria-hidden
      />

      {/* Back plate — navy, "automation panel" */}
      <motion.div
        {...enter(0.05, 12, 18)}
        className="absolute right-[-4%] top-[6%] h-[58%] w-[64%] rounded-[18px] bg-ink p-5 text-paper shadow-plate"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-500" />
          <span className="text-[10px] uppercase tracking-widest2 text-paper/60">
            Automation
          </span>
        </div>
        <div className="display mt-4 text-lg leading-snug">
          Lead masuk → WhatsApp → CRM
        </div>
        <div className="mt-5 space-y-2">
          {[68, 92, 54, 80].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="h-1.5 flex-1 rounded-full bg-paper/10">
                <span
                  className="block h-full rounded-full bg-accent-500"
                  style={{ width: `${w}%` }}
                />
              </span>
              <span className="text-[10px] tabular-nums text-paper/50">{w}%</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-paper/10 pt-3 text-[10px] text-paper/50">
          <span>Today</span>
          <span className="text-accent-300">+42 leads</span>
        </div>
      </motion.div>

      {/* Front plate — paper, "landing page mock" */}
      <motion.div
        {...enter(0.18, -16, 24)}
        className="absolute left-[-2%] bottom-[6%] h-[68%] w-[72%] overflow-hidden rounded-[20px] border border-ink/[0.06] bg-paper shadow-plate"
      >
        <div className="flex items-center gap-1.5 border-b border-ink/[0.06] px-4 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <span className="ml-3 h-2 w-32 rounded-full bg-ink/[0.06]" />
        </div>
        <div className="space-y-3 p-5">
          <span className="inline-block text-[9px] uppercase tracking-widest2 text-accent-600">
            Klinik Arsa
          </span>
          <h4 className="display text-[20px] leading-tight text-ink">
            Layanan kesehatan yang bisa{" "}
            <span className="gold-italic">dipercaya.</span>
          </h4>
          <div className="flex gap-2">
            <span className="h-1.5 flex-1 rounded-full bg-ink/10" />
            <span className="h-1.5 w-12 rounded-full bg-ink/10" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-md border border-ink/[0.06] bg-ink/[0.03]"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-ink px-3 text-[10px] font-medium text-paper">
              Booking via WhatsApp
            </span>
            <span className="text-[10px] text-ink-500">→ +6281…</span>
          </div>
        </div>
      </motion.div>

      {/* Floating gold tag */}
      <motion.div
        {...enter(0.36, 0, 14)}
        className="absolute right-[2%] bottom-[10%] flex items-center gap-2 rounded-full border border-accent-500/30 bg-paper px-3 py-1.5 shadow-soft"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        <span className="text-[10px] font-medium uppercase tracking-widest2 text-ink">
          10 Niches Ready
        </span>
      </motion.div>
    </div>
  );
}
