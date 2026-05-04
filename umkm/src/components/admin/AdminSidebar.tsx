"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  Receipt,
  Calculator,
  MessageCircle,
  Settings,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { config } from "@/config/app.config";

const ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", section: "Utama" },
  { href: "/admin/products", icon: Package, label: "Produk", section: "Utama" },
  { href: "/admin/orders", icon: ShoppingBag, label: "Pesanan", section: "Utama" },
  { href: "/admin/orders?tab=resi", icon: Receipt, label: "Resi", section: "Pengiriman" },
  { href: "/admin/shipping-calculator", icon: Truck, label: "Ongkir", section: "Pengiriman" },
  { href: "/admin/price-calculator", icon: Calculator, label: "Kalkulator", section: "Tools" },
  { href: "/admin/chat", icon: MessageCircle, label: "Chat", section: "Tools" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan", section: "Tools" }
];

export function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const grouped = ITEMS.reduce<Record<string, typeof ITEMS>>((acc, it) => {
    (acc[it.section] ||= []).push(it);
    return acc;
  }, {});

  return (
    <aside className="admin-sidebar">
      <Link
        href="/"
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          padding: "8px 14px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 8
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            background: "var(--primary)",
            borderRadius: 6
          }}
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
        </span>
        {config.brand.name}
      </Link>

      {Object.entries(grouped).map(([section, list]) => (
        <div key={section}>
          <div className="sidebar-section">{section}</div>
          {list.map((item) => {
            const path = item.href.split("?")[0];
            const isActive =
              pathname === path ||
              (path !== "/admin" && pathname.startsWith(path));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : ""}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      <div style={{ marginTop: "auto", paddingTop: 12 }}>
        <Link href="/" style={{ fontSize: 13, color: "#94A3B8" }}>
          <ArrowLeft size={14} />
          <span>Ke Storefront</span>
        </Link>
      </div>
    </aside>
  );
}
