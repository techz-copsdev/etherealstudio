"use client";

import { useState } from "react";
import type { PricingTier, Product } from "@/modules/product/types";

interface Props {
  initial?: Product;
  onSaved: (p: Product) => void;
  onCancel: () => void;
}

function blankProduct(): Product {
  return {
    id: "",
    slug: "",
    name: "",
    description: "",
    image: "/images/product-tshirt.svg",
    category: "",
    unit: "pcs",
    basePrice: 0,
    minOrder: 1,
    tiers: [],
    active: true
  };
}

export function AdminProductForm({ initial, onSaved, onCancel }: Props) {
  const [product, setProduct] = useState<Product>(initial ?? blankProduct());
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setProduct((p) => ({ ...p, [key]: value }));
  }

  function setTier(i: number, patch: Partial<PricingTier>) {
    setProduct((p) => {
      const tiers = [...(p.tiers ?? [])];
      tiers[i] = { ...tiers[i], ...patch } as PricingTier;
      return { ...p, tiers };
    });
  }

  function addTier() {
    setProduct((p) => ({
      ...p,
      tiers: [...(p.tiers ?? []), { minQty: 0, pricePerUnit: 0 }]
    }));
  }

  function removeTier(i: number) {
    setProduct((p) => ({
      ...p,
      tiers: (p.tiers ?? []).filter((_, idx) => idx !== i)
    }));
  }

  async function save() {
    if (!product.id || !product.name || !product.slug) {
      setErr("ID, nama, dan slug wajib diisi.");
      return;
    }
    if (product.basePrice <= 0) {
      setErr("Harga dasar harus lebih dari 0.");
      return;
    }
    if (product.minOrder < 1) {
      setErr("Min. order minimal 1.");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { ok: boolean; product: Product };
      onSaved(data.product);
    } catch {
      setErr("Gagal menyimpan produk.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <h3>{initial ? "Edit Produk" : "Tambah Produk"}</h3>
      <div className="stack-tight">
        <div className="grid grid-2">
          <div>
            <label htmlFor="p-id">ID</label>
            <input
              id="p-id"
              value={product.id}
              onChange={(e) => update("id", e.target.value)}
              placeholder="P001"
              disabled={!!initial}
            />
          </div>
          <div>
            <label htmlFor="p-slug">Slug</label>
            <input
              id="p-slug"
              value={product.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="kaos-polos"
            />
          </div>
        </div>
        <label htmlFor="p-name">Nama</label>
        <input
          id="p-name"
          value={product.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <label htmlFor="p-desc">Deskripsi</label>
        <textarea
          id="p-desc"
          rows={3}
          value={product.description}
          onChange={(e) => update("description", e.target.value)}
        />
        <div className="grid grid-2">
          <div>
            <label htmlFor="p-cat">Kategori</label>
            <input
              id="p-cat"
              value={product.category}
              onChange={(e) => update("category", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="p-unit">Satuan</label>
            <input
              id="p-unit"
              value={product.unit}
              onChange={(e) => update("unit", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-2">
          <div>
            <label htmlFor="p-price">Harga dasar (IDR)</label>
            <input
              id="p-price"
              type="number"
              min={0}
              value={product.basePrice}
              onChange={(e) => update("basePrice", Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="p-min">Min. order</label>
            <input
              id="p-min"
              type="number"
              min={1}
              value={product.minOrder}
              onChange={(e) => update("minOrder", Number(e.target.value))}
            />
          </div>
        </div>
        <label htmlFor="p-img">URL Gambar</label>
        <input
          id="p-img"
          value={product.image}
          onChange={(e) => update("image", e.target.value)}
        />

        <div className="row-between" style={{ marginTop: 12 }}>
          <strong>Tier Harga</strong>
          <button className="btn btn-secondary small" onClick={addTier}>+ Tambah tier</button>
        </div>
        {(product.tiers ?? []).length === 0 && (
          <div className="muted small">
            Tidak ada tier — produk akan menggunakan harga dasar.
          </div>
        )}
        {(product.tiers ?? []).map((t, i) => (
          <div key={i} className="row" style={{ alignItems: "flex-end" }}>
            <div style={{ flex: 1, minWidth: 100 }}>
              <label>Min Qty</label>
              <input
                type="number"
                min={0}
                value={t.minQty}
                onChange={(e) => setTier(i, { minQty: Number(e.target.value) })}
              />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label>Harga / unit</label>
              <input
                type="number"
                min={0}
                value={t.pricePerUnit}
                onChange={(e) => setTier(i, { pricePerUnit: Number(e.target.value) })}
              />
            </div>
            <div style={{ flex: 1, minWidth: 100 }}>
              <label>Label</label>
              <input
                value={t.label ?? ""}
                onChange={(e) => setTier(i, { label: e.target.value })}
              />
            </div>
            <button className="btn btn-ghost" onClick={() => removeTier(i)} aria-label="Hapus tier">
              ✕
            </button>
          </div>
        ))}

        <div className="row" style={{ marginTop: 12 }}>
          <input
            id="p-active"
            type="checkbox"
            checked={product.active}
            onChange={(e) => update("active", e.target.checked)}
            style={{ width: "auto" }}
          />
          <label htmlFor="p-active" style={{ margin: 0 }}>Aktif (tampil di katalog)</label>
        </div>

        {err && <div className="small" style={{ color: "#B91C1C" }}>{err}</div>}

        <div className="row" style={{ justifyContent: "flex-end", marginTop: 12 }}>
          <button className="btn btn-secondary" onClick={onCancel} disabled={saving}>Batal</button>
          <button className="btn" onClick={save} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
