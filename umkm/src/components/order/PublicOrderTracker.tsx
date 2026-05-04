"use client";

import { useState } from "react";
import { Package, Search, CheckCircle2, Circle } from "lucide-react";
import type { Order } from "@/modules/order/invoice";
import type { TrackingResult } from "@/modules/tracking/types";
import { formatCurrency } from "@/modules/order/invoice";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { config } from "@/config/app.config";
import { buildWaMeLink } from "@/modules/whatsapp/format";

interface OrderLookupResponse {
  ok: boolean;
  order?: Order;
  tracking?: TrackingResult | null;
  message?: string;
}

const DEMO_TIMELINE: { label: string; ts: string; done: boolean }[] = [
  { label: "Pesanan Dibuat", ts: "01 Mei 2025, 10:30", done: true },
  { label: "Sedang Diproses", ts: "02 Mei 2025, 09:15", done: true },
  { label: "Dikirim", ts: "03 Mei 2025, 14:20", done: true },
  { label: "Selesai", ts: "Menunggu konfirmasi", done: false }
];

export function PublicOrderTracker() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OrderLookupResponse | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/orders/lookup?q=${encodeURIComponent(query.trim())}`, {
        cache: "no-store"
      });
      const data = (await res.json()) as OrderLookupResponse;
      setResult(data);
    } catch {
      setResult({ ok: false, message: "Gagal terhubung ke server." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-2" style={{ alignItems: "stretch" }}>
      <div className="card card-loose">
        <h3>Lacak Pesanan</h3>
        <p className="muted small" style={{ marginBottom: 16 }}>
          Masukkan ID pesanan atau nomor WhatsApp Anda untuk cek status.
        </p>
        <form onSubmit={onSubmit} className="stack">
          <div>
            <label htmlFor="track-q">ID Pesanan / No. WhatsApp</label>
            <input
              id="track-q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: INV-20250501-001 / 6281234567890"
            />
          </div>
          <button className="btn" type="submit" disabled={loading || !query.trim()}>
            <Search size={16} /> {loading ? "Mencari..." : "Lacak"}
          </button>
        </form>
        {result && !result.ok && (
          <div className="suggest" style={{ marginTop: 16, background: "#FEE2E2", color: "#991B1B", borderColor: "#FECACA" }}>
            {result.message ?? "Pesanan tidak ditemukan. Silakan cek lagi."}
          </div>
        )}
      </div>

      <div className="card card-loose">
        <div className="row" style={{ marginBottom: 16, gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "var(--primary-light)",
              color: "var(--primary-dark)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Package size={28} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>{result?.order?.id ?? "INV-20250501-001"}</h3>
            <span className="muted small">
              {result?.order
                ? `Total ${formatCurrency(result.order.total)}`
                : "Contoh hasil pelacakan"}
            </span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            {result?.order ? (
              <OrderStatusBadge status={result.order.status} />
            ) : (
              <span className="badge badge-info">Dikirim</span>
            )}
          </div>
        </div>

        {result?.ok && result.order ? (
          <RealTimeline order={result.order} tracking={result.tracking ?? null} />
        ) : (
          <ul className="timeline">
            {DEMO_TIMELINE.map((step, i) => (
              <li key={i} className="timeline-item">
                <span className={`timeline-dot ${step.done ? "" : "pending"}`}>
                  {step.done ? <CheckCircle2 size={16} /> : <Circle size={14} />}
                </span>
                <div className="timeline-content">
                  <div className={`label ${step.done ? "" : "pending-label"}`}>{step.label}</div>
                  <div className="ts">{step.ts}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RealTimeline({ order, tracking }: { order: Order; tracking: TrackingResult | null }) {
  if (!order.resi || !order.courier) {
    return (
      <div className="suggest" style={{ background: "var(--bg)", color: "var(--text-muted)", borderColor: "var(--border)" }}>
        Resi belum tersedia. Setelah pembayaran dikonfirmasi, admin akan menambahkan
        nomor resi dan kurir.
      </div>
    );
  }
  if (tracking?.ok && tracking.events.length > 0) {
    return (
      <ul className="timeline">
        {tracking.events.map((ev, i) => (
          <li key={i} className="timeline-item">
            <span className="timeline-dot">
              <CheckCircle2 size={16} />
            </span>
            <div className="timeline-content">
              <div className="label">{ev.status}</div>
              <div className="ts">
                {ev.date}
                {ev.location ? ` · ${ev.location}` : ""}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="stack-tight">
      <div className="suggest" style={{ background: "var(--bg)", color: "var(--text-muted)", borderColor: "var(--border)" }}>
        Status tidak tersedia, hubungi admin.
      </div>
      <a
        className="btn btn-secondary"
        target="_blank"
        rel="noopener noreferrer"
        href={buildWaMeLink(
          config.whatsappNumber,
          `Halo admin, saya mau cek status resi pesanan ${order.id}.`
        )}
      >
        Hubungi admin via WhatsApp
      </a>
    </div>
  );
}
