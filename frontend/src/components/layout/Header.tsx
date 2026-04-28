"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/templates", label: "Template" },
  { href: "/services/website", label: "Custom Website" },
  { href: "/services/automation", label: "IT Automation" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-ink/[0.08] bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="text-ink ring-focus rounded-sm" aria-label="Beranda">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-[14px] tracking-wide transition-colors ring-focus",
                  active ? "text-ink" : "text-ink-500 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="text-[14px] text-ink-500 transition-colors hover:text-ink ring-focus rounded-sm"
          >
            Contact
          </Link>
          <Button
            href={whatsappLink(PRESETS.general())}
            external
            variant="primary"
            size="sm"
          >
            <MessageCircle className="h-4 w-4" />
            Chat Customer Service
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 ring-focus"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 z-30 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            className="md:hidden fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-[88%] max-w-sm overflow-y-auto border-l border-ink/[0.08] bg-paper shadow-plate"
          >
            <nav className="flex flex-col px-6 pb-12 pt-6">
              <span className="eyebrow mb-6">Menu</span>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="display border-b border-ink/[0.06] py-4 text-2xl text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="display border-b border-ink/[0.06] py-4 text-2xl text-ink"
              >
                Contact
              </Link>
              <div className="mt-8">
                <Button
                  href={whatsappLink(PRESETS.general())}
                  external
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Customer Service
                </Button>
              </div>
              <p className="mt-6 text-xs text-ink-500">
                Respons di jam kerja Senin–Jumat, 09.00–18.00 WIB. Biasanya membalas dalam 1–2 jam.
              </p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
