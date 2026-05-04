import { getDataAdapter } from "@/services/data";
import { AdminOrderList } from "@/components/admin/AdminOrderList";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const adapter = getDataAdapter();
  const orders = await adapter.getOrders().catch(() => []);
  return (
    <div className="stack">
      <h1 style={{ marginBottom: 0 }}>Pesanan</h1>
      <p className="muted small">
        Kelola pesanan, ubah status, dan input resi pengiriman.
      </p>
      <AdminOrderList initial={orders} />
    </div>
  );
}
