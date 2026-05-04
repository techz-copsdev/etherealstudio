"use client";

import { useState } from "react";
import type { Product } from "@/modules/product/types";
import { formatCurrency } from "@/modules/order/invoice";
import { AdminProductForm } from "./AdminProductForm";

interface Props {
  initial: Product[];
}

export function AdminProductList({ initial }: Props) {
  const [products, setProducts] = useState<Product[]>(initial);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function onSaved(p: Product) {
    setProducts((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = p;
        return next;
      }
      return [p, ...prev];
    });
    setAdding(false);
    setEditing(null);
  }

  async function deleteProduct(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setErr("Gagal menghapus produk.");
    }
  }

  if (adding) {
    return <AdminProductForm onSaved={onSaved} onCancel={() => setAdding(false)} />;
  }
  if (editing) {
    return (
      <AdminProductForm
        initial={editing}
        onSaved={onSaved}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="stack">
      <div className="row-between">
        <span className="muted small">{products.length} produk</span>
        <button className="btn" onClick={() => setAdding(true)}>+ Tambah Produk</button>
      </div>

      {err && <div className="card" style={{ borderColor: "#FCA5A5", color: "#B91C1C" }}>{err}</div>}

      {products.length === 0 ? (
        <div className="empty">Belum ada produk.</div>
      ) : (
        <div className="card card-flush" style={{ overflowX: "auto" }}>
          <table className="data">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Harga dasar</th>
                <th>Min</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="tabular">{p.id}</td>
                  <td>{p.name}</td>
                  <td className="muted">{p.category}</td>
                  <td className="tabular">{formatCurrency(p.basePrice)}</td>
                  <td className="tabular">{p.minOrder} {p.unit}</td>
                  <td>
                    <span className={`badge ${p.active ? "badge-success" : "badge-muted"}`}>
                      {p.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td>
                    <div className="row">
                      <button className="btn btn-secondary small" onClick={() => setEditing(p)}>
                        Edit
                      </button>
                      <button className="btn btn-ghost small" onClick={() => deleteProduct(p.id)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
