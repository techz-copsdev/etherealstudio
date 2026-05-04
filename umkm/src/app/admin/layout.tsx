import Link from "next/link";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Produk</Link>
          <Link href="/admin/orders">Pesanan</Link>
          <Link href="/admin/price-calculator">Kalkulator Harga</Link>
          <Link href="/admin/shipping-calculator">Kalkulator Ongkir</Link>
        </aside>
        <div className="admin-main">{children}</div>
      </div>
    </AdminAuthGate>
  );
}
