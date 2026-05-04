import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getDataAdapter } from "@/services/data";
import { formatCurrency } from "@/modules/order/invoice";
import { OrderStatusBadge } from "@/components/order/OrderStatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const adapter = getDataAdapter();
  const orders = await adapter.getOrders().catch(() => []);
  const products = await adapter.getProducts().catch(() => []);

  const counts = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    process: orders.filter((o) => o.status === "process" || o.status === "paid").length,
    done: orders.filter((o) => o.status === "done").length
  };

  const totalRevenue = orders
    .filter((o) => o.status === "paid" || o.status === "process" || o.status === "done")
    .reduce((sum, o) => sum + o.total, 0);

  const recent = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // Static demo deltas (no analytics backend wired). Real values would come from
  // a stats query comparing periods — left as a static visual aid.
  const KPIS = [
    { label: "Total Pesanan", value: counts.total, delta: "+12%", up: true },
    { label: "Pending", value: counts.pending, delta: "-5%", up: false },
    { label: "Diproses", value: counts.process, delta: "+8%", up: true },
    { label: "Selesai", value: counts.done, delta: "+15%", up: true }
  ];

  return (
    <div className="stack-loose">
      <div className="row-between">
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <span className="muted small">Ringkasan toko Anda hari ini</span>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Link href="/admin/products" className="btn btn-secondary btn-sm">+ Produk</Link>
          <Link href="/admin/orders" className="btn btn-sm">Lihat Pesanan</Link>
        </div>
      </div>

      <div className="grid grid-4">
        {KPIS.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value tabular">{k.value}</div>
            <div className={`kpi-delta ${k.up ? "up" : "down"}`}>
              {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {k.delta} vs periode lalu
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-3">
        <div className="kpi-card">
          <div className="kpi-label">Pendapatan (dibayar)</div>
          <div className="kpi-value tabular" style={{ fontSize: 22 }}>
            {formatCurrency(totalRevenue)}
          </div>
          <div className="kpi-delta up">
            <ArrowUpRight size={12} />Dari pesanan paid/process/done
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Produk Aktif</div>
          <div className="kpi-value tabular">{products.length}</div>
          <div className="muted small" style={{ marginTop: 6 }}>
            <Link href="/admin/products">Kelola katalog →</Link>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Resi Belum Diisi</div>
          <div className="kpi-value tabular">
            {orders.filter((o) => (o.status === "paid" || o.status === "process") && !o.resi).length}
          </div>
          <div className="muted small" style={{ marginTop: 6 }}>
            <Link href="/admin/orders">Input resi →</Link>
          </div>
        </div>
      </div>

      <div className="card card-flush">
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h2 style={{ margin: 0 }}>Order Terbaru</h2>
          <Link className="small" href="/admin/orders">Lihat semua →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="empty">Belum ada pesanan.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Tanggal</th>
                  <th>Nama</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id}>
                    <td className="tabular">{o.id}</td>
                    <td className="muted">
                      {new Date(o.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td>{o.customerName}</td>
                    <td className="tabular">{formatCurrency(o.total)}</td>
                    <td><OrderStatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
