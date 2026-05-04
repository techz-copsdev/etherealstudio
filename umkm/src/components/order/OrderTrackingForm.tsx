"use client";

import { useState } from "react";
import { config } from "@/config/app.config";
import type { Order } from "@/modules/order/invoice";
import type { TrackingResult } from "@/modules/tracking/types";
import { formatCurrency } from "@/modules/order/invoice";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { buildWaMeLink } from "@/modules/whatsapp/format";

interface OrderLookupResponse {
  ok: boolean;
  order?: Order;
  tracking?: TrackingResult | null;
  message?: string;
}

export function OrderTrackingForm() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OrderLookupResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `/api/orders/lookup?q=${encodeURIComponent(query.trim())}`,
        { cache: "no-store" }
      );
      const data = (await res.json()) as OrderLookupResponse;
      setResult(data);
    } catch {
      setResult({ ok: false, message: "Gagal terhubung ke server." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <form onSubmit={handleSubmit} className="stack-tight">
        <label htmlFor="track-q">No. Invoice atau No. WhatsApp</label>
        <div className="row">
          <input
            id="track-q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="cth. INV-241201-AB12CD atau 08xxxxxxxxxx"
            style={{ flex: 1, minWidth: 200 }}
          />
          <button className="btn" type="submit" disabled={loading || !query.trim()}>
            {loading ? "Mencari..." : "Lacak"}
          </button>
        </div>
      </form>

      {result && !result.ok && (
        <div className="card">
          <h3>Pesanan tidak ditemukan</h3>
          <p className="muted">
            {result.message ?? "Pastikan no. invoice atau no. WhatsApp benar."}
          </p>
          <a
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            href={buildWaMeLink(
              config.whatsappNumber,
              `Halo admin, saya mau cek status pesanan dengan kata kunci: ${query}`
            )}
          >
            Hubungi admin via WhatsApp
          </a>
        </div>
      )}

      {result && result.ok && result.order && (
        <OrderResult order={result.order} tracking={result.tracking ?? null} />
      )}
    </div>
  );
}

function OrderResult({
  order,
  tracking
}: {
  order: Order;
  tracking: TrackingResult | null;
}) {
  return (
    <div className="stack">
      <div className="card">
        <div className="row-between">
          <div>
            <div className="small muted">No. Invoice</div>
            <h3 style={{ marginBottom: 4 }}>{order.id}</h3>
            <div className="muted small">
              {new Date(order.createdAt).toLocaleString("id-ID")}
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        <hr className="divider" />
        <div className="stack-tight">
          {order.items.map((item) => (
            <div key={item.productId} className="row-between">
              <span>{item.productName} × {item.qty}</span>
              <span className="tabular">{formatCurrency(item.subtotal)}</span>
            </div>
          ))}
          <div className="row-between">
            <span className="muted">Ongkir ({order.regionName})</span>
            <span className="tabular">{formatCurrency(order.shipping)}</span>
          </div>
          <div className="row-between">
            <strong>Total</strong>
            <strong className="tabular">{formatCurrency(order.total)}</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Status Pengiriman</h3>
        {!order.resi || !order.courier ? (
          <p className="muted">
            Resi belum tersedia. Setelah dibayar, admin akan menambahkan
            nomor resi & kurir.
          </p>
        ) : (
          <div className="stack-tight">
            <div className="row-between">
              <span className="muted">Kurir</span>
              <span className="tabular" style={{ textTransform: "uppercase" }}>{order.courier}</span>
            </div>
            <div className="row-between">
              <span className="muted">No. Resi</span>
              <span className="tabular">{order.resi}</span>
            </div>
            {tracking && tracking.ok && tracking.events.length > 0 ? (
              <ul className="timeline" style={{ marginTop: 12 }}>
                {tracking.events.map((e, i) => (
                  <li key={i}>
                    <div className="ts">{e.date}{e.location ? ` · ${e.location}` : ""}</div>
                    <div>{e.status}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <TrackingFallback />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TrackingFallback() {
  return (
    <div className="stack-tight">
      <p className="muted small">Status tidak tersedia, hubungi admin.</p>
      <a
        className="btn btn-secondary"
        target="_blank"
        rel="noopener noreferrer"
        href={buildWaMeLink(
          config.whatsappNumber,
          "Halo admin, saya mau cek status resi pesanan saya."
        )}
      >
        Hubungi admin via WhatsApp
      </a>
    </div>
  );
}
