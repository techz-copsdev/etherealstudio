"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingCart, CheckCircle2 } from "lucide-react";
import { config } from "@/config/app.config";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV = [
  { href: "/#produk", label: "Produk" },
  { href: "/cara-order", label: "Cara Order" },
  { href: "/#cek-ongkir", label: "Cek Ongkir" },
  { href: "/#lacak-pesanan", label: "Lacak Pesanan" },
  { href: "/#kontak", label: "Kontak" }
];

export function SiteHeader() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/?q=${encodeURIComponent(term)}#produk`);
  }

  // Hide global header on admin routes (admin has its own shell).
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="site-header">
      <Container>
        <Link href="/" className="brand" aria-label={config.brand.name}>
          <span className="brand-mark" aria-hidden="true">
            <CheckCircle2 size={18} strokeWidth={2.5} />
          </span>
          <span>{config.brand.name}</span>
        </Link>

        <nav className="nav-main" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>

        <form className="header-search" role="search" onSubmit={onSubmit}>
          <div className="search-input">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Cari produk..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Cari produk"
            />
          </div>
        </form>

        <div className="header-tools">
          <ThemeToggle />
          <button type="button" className="icon-btn" aria-label="Keranjang" title="Keranjang (segera)">
            <ShoppingCart size={18} />
            <span className="icon-btn-badge" aria-hidden="true">0</span>
          </button>
        </div>
      </Container>
    </header>
  );
}
