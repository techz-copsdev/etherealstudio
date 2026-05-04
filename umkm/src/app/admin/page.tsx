import Link from "next/link";
import { getDataAdapter } from "@/services/data";
import { formatCurrency } from "@/modules/order/invoice";
import { OrderStatusBadge } from "@/components/order/OrderStatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const adapter = getDataAdapter();
  let orders = await adapter.getOrders().catch(() => []);
  let products = await adapter.getProducts().catch(() => []);

  const totalRevenue = orders
    .filter((o) => o.status === "paid" || o.status === "process" || o.status === "done")
    .reduce((sum, o) => sum + o.total, 0);

  const recent = orders.slice(0, 5);
  const counts = {
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    process: orders.filter((o) => o.status === "process").length,
    done: orders.filter((o) => o.status === "done").length
  };

  return (
    <div className="stack">
      <h1 style={{ marginBottom: 0 }}>Dashboard</h1>
      <div className="grid grid-products">
        <div className="card">
          <div className="muted small">Produk aktif</div>
          <div style={{ fontSize: 26, fontWeight: 700 }} className="tabular">
            {products.length}
          </div>
        </div>
        <div className="card">
          <div className="muted small">Total pesanan</div>
          <div style={{ fontSize: 26, fontWeight: 700 }} className="tabular">
            {orders.length}
          </div>
        </div>
        <div className="card">
          <div className="muted small">Pendapatan (dibayar+)</div>
          <div style={{ fontSize: 26, fontWeight: 700 }} className="tabular">
            {formatCurrency(totalRevenue)}
          </div>
        </div>
        <div className="card">
          <div className="muted small">Pending</div>
          <div style={{ fontSize: 26, fontWeight: 700 }} className="tabular">
            {counts.pending}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="row-between" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Pesanan Terbaru</h2>
          <Link className="btn btn-secondary small" href="/admin/orders">Lihat semua</Link>
        </div>
        {recent.length === 0 ? (
          <div className="empty">Belum ada pesanan.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id}>
                    <td className="tabular">{o.id}</td>
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
