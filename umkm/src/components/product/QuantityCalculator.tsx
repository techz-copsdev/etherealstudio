"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/modules/product/types";
import { calculateBreakdown, suggestTierUpgrade } from "@/modules/product/helpers";
import { formatCurrency } from "@/modules/order/invoice";
import { SHIPPING_REGIONS } from "@/modules/shipping/regions";
import { calculateShipping } from "@/modules/shipping/calculator";
import { TierTable } from "./TierTable";
import { WhatsAppCheckoutButton } from "@/components/order/WhatsAppCheckoutButton";

interface Props {
  product: Product;
}

export function QuantityCalculator({ product }: Props) {
  const [qty, setQty] = useState<number>(product.minOrder);
  const [regionId, setRegionId] = useState<string>(SHIPPING_REGIONS[0]?.id ?? "");
  const [customer, setCustomer] = useState({ name: "", wa: "", address: "", notes: "" });

  const breakdown = useMemo(() => calculateBreakdown(product, qty), [product, qty]);
  const shipping = useMemo(() => calculateShipping(regionId), [regionId]);
  const suggest = useMemo(() => suggestTierUpgrade(product, qty), [product, qty]);
  const total = breakdown.subtotal + shipping.cost;

  const belowMin = qty < product.minOrder;
  const invalidQty = qty <= 0;

  function setQtySafe(v: number) {
    if (Number.isNaN(v)) v = 0;
    setQty(Math.max(0, Math.floor(v)));
  }

  return (
    <div className="stack">
      <div className="stack-tight">
        <label htmlFor="qty">Jumlah pesanan</label>
        <div className="row">
          <div className="qty-control" role="group" aria-label="Quantity selector">
            <button
              type="button"
              onClick={() => setQtySafe(qty - 1)}
              aria-label="Kurangi jumlah"
            >
              −
            </button>
            <input
              id="qty"
              type="number"
              min={0}
              value={qty}
              onChange={(e) => setQtySafe(Number(e.target.value))}
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={() => setQtySafe(qty + 1)}
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
          <span className="muted small">{product.unit} · min. {product.minOrder}</span>
        </div>
        {belowMin && !invalidQty && (
          <div className="small" style={{ color: "#B45309" }}>
            Jumlah di bawah minimum order ({product.minOrder} {product.unit}).
          </div>
        )}
        {invalidQty && (
          <div className="small" style={{ color: "#B91C1C" }}>
            Masukkan jumlah yang valid.
          </div>
        )}
      </div>

      <TierTable tiers={product.tiers} unit={product.unit} qty={qty} />

      {suggest && (
        <div className="suggest">
          Tambah {suggest.addQty} {product.unit} untuk hemat hingga{" "}
          {formatCurrency(suggest.potentialSavings)}{" "}
          ({suggest.nextTier.label ?? `tier ${suggest.nextTier.minQty}+`}).
        </div>
      )}

      <div className="stack-tight">
        <label htmlFor="region">Wilayah pengiriman</label>
        <select
          id="region"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
        >
          {SHIPPING_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} — {formatCurrency(r.cost)}
              {r.eta ? ` · ${r.eta}` : ""}
            </option>
          ))}
        </select>
        {shipping.fallback && (
          <div className="small muted">
            Wilayah tidak ditemukan, menggunakan tarif default.
          </div>
        )}
      </div>

      <div className="card card-tight">
        <div className="row-between">
          <span className="muted">Harga / {product.unit}</span>
          <span className="tabular">{formatCurrency(breakdown.unitPrice)}</span>
        </div>
        <div className="row-between">
          <span className="muted">Subtotal</span>
          <span className="tabular">{formatCurrency(breakdown.subtotal)}</span>
        </div>
        {breakdown.discount > 0 && (
          <div className="row-between">
            <span className="muted">Diskon kuantitas</span>
            <span className="tabular" style={{ color: "var(--primary-dark)" }}>
              −{formatCurrency(breakdown.discount)}
            </span>
          </div>
        )}
        <div className="row-between">
          <span className="muted">Ongkir ({shipping.regionName})</span>
          <span className="tabular">{formatCurrency(shipping.cost)}</span>
        </div>
        <hr className="divider" />
        <div className="row-between">
          <strong>Total</strong>
          <strong className="tabular" style={{ fontSize: 18 }}>
            {formatCurrency(total)}
          </strong>
        </div>
      </div>

      <div className="stack-tight">
        <h3 style={{ marginTop: 8 }}>Data pengiriman</h3>
        <label htmlFor="cname">Nama lengkap</label>
        <input
          id="cname"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          placeholder="cth. Budi Santoso"
        />
        <label htmlFor="cwa">No. WhatsApp</label>
        <input
          id="cwa"
          value={customer.wa}
          onChange={(e) => setCustomer({ ...customer, wa: e.target.value })}
          placeholder="08xxxxxxxxxx"
          inputMode="tel"
        />
        <label htmlFor="caddr">Alamat lengkap</label>
        <textarea
          id="caddr"
          rows={3}
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          placeholder="Jalan, kelurahan, kecamatan, kota, kode pos"
        />
        <label htmlFor="cnotes">Catatan (opsional)</label>
        <input
          id="cnotes"
          value={customer.notes}
          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
          placeholder="cth. warna, ukuran, custom logo"
        />
      </div>

      <WhatsAppCheckoutButton
        product={product}
        qty={breakdown.qty}
        unitPrice={breakdown.unitPrice}
        subtotal={breakdown.subtotal}
        discount={breakdown.discount}
        shipping={shipping}
        customer={customer}
        disabled={invalidQty || belowMin || !customer.name || !customer.wa || !customer.address}
      />
    </div>
  );
}
