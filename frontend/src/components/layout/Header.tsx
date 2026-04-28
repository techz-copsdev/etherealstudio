"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/templates", label: "Templates", index: "01" },
  { href: "/services/website", label: "Website", index: "02" },
  { href: "/services/automation", label: "Automation", index: "03" },
  { href: "/portfolio", label: "Work", index: "04" },
  { href: "/about", label: "Studio", index: "05" },
  { href: "/contact", label: "Contact", index: "06" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const jakarta = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(jakarta);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/85 backdrop-blur-sm">
      <div className="frame flex items-center justify-between py-5 md:py-6">
        <Link href="/" aria-label="Beranda" className="group">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "anchor text-[13px] tracking-wide transition-colors duration-300",
                  active ? "text-ink" : "text-ink/60 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <span className="marker hidden lg:inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-ink/40" />
            Jakarta · {time || "—"}
          </span>
          <a
            href={whatsappLink(PRESETS.general())}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Konsultasi</span>
            <span className="text-ink/40 group-hover:text-paper/60">→</span>
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        >
          <span
            className={cn(
              "block h-px w-5 bg-ink transition-transform duration-300 ease-out",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-ink transition-transform duration-300 ease-out",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div className="rule" />

      <AnimatePresence>
        {open ? (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-30 overflow-y-auto bg-paper"
          >
            <div className="frame flex h-full flex-col py-10">
              <span className="marker mb-8">Index</span>
              <nav className="flex flex-1 flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="display group flex items-baseline justify-between border-b border-ink/10 py-5 text-4xl text-ink"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[11px] tracking-widest3 text-ink/40">{item.index}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10"
              >
                <a
                  href={whatsappLink(PRESETS.general())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-solid w-full justify-center"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Konsultasi via WhatsApp
                </a>
                <p className="marker mt-6">
                  Jakarta · {time || "—"} · Senin–Jumat 09.00–18.00
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
