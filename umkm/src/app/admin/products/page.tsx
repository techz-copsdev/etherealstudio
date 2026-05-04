import { getDataAdapter } from "@/services/data";
import { AdminProductList } from "@/components/admin/AdminProductList";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const adapter = getDataAdapter();
  const products = await adapter.getProducts().catch(() => []);
  return (
    <div className="stack">
      <h1 style={{ marginBottom: 0 }}>Produk</h1>
      <p className="muted small">
        Tambah, edit, dan hapus produk grosir. Tier harga dapat dikonfigurasi
        per produk.
      </p>
      <AdminProductList initial={products} />
    </div>
  );
}
