"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/modules/order/invoice";
import { formatCurrency } from "@/modules/order/invoice";
import { OrderStatusBadge } from "@/components/order/OrderStatusBadge";
import { COURIERS } from "@/modules/tracking";
import type { Courier } from "@/modules/tracking";

const STATUSES: OrderStatus[] = ["pending", "paid", "process", "done", "archived"];

interface Props {
  initial: Order[];
}

export function AdminOrderList({ initial }: Props) {
  const [orders, setOrders] = useState<Order[]>(initial);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [editing, setEditing] = useState<Order | null>(null);
  const [resi, setResi] = useState("");
  const [courier, setCourier] = useState<Courier>("jne");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const visible = orders.filter((o) => filter === "all" || o.status === filter);

  async function patchOrder(id: string, patch: Partial<Order>) {
    const res = await fetch(`/api/orders/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    if (!res.ok) throw new Error("update failed");
    const data = (await res.json()) as { ok: boolean; order: Order };
    return data.order;
  }

  async function changeStatus(o: Order, status: OrderStatus) {
    try {
      const updated = await patchOrder(o.id, { status });
      setOrders((prev) => prev.map((p) => (p.id === o.id ? updated : p)));
    } catch {
      setErr("Gagal memperbarui status.");
    }
  }

  function openResi(o: Order) {
    setEditing(o);
    setResi(o.resi ?? "");
    setCourier((o.courier as Courier) ?? "jne");
    setErr(null);
  }

  async function saveResi() {
    if (!editing) return;
    setSaving(true);
    setErr(null);
    try {
      const updated = await patchOrder(editing.id, { resi: resi.trim(), courier });
      setOrders((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
      setEditing(null);
    } catch {
      setErr("Gagal menyimpan resi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="stack">
      <div className="row">
        <label htmlFor="filter" style={{ margin: 0 }}>Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as OrderStatus | "all")}
          style={{ width: "auto", minWidth: 160 }}
        >
          <option value="all">Semua</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="muted small">{visible.length} pesanan</span>
      </div>

      {err && <div className="card" style={{ borderColor: "#FCA5A5", color: "#B91C1C" }}>{err}</div>}

      {visible.length === 0 ? (
        <div className="empty">Tidak ada pesanan untuk filter ini.</div>
      ) : (
        <div className="card card-flush" style={{ overflowX: "auto" }}>
          <table className="data">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Tanggal</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Resi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => (
                <tr key={o.id}>
                  <td className="tabular">{o.id}</td>
                  <td className="small muted">
                    {new Date(o.createdAt).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <div>{o.customerName}</div>
                    <div className="small muted tabular">{o.customerWa}</div>
                  </td>
                  <td className="tabular">{formatCurrency(o.total)}</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o, e.target.value as OrderStatus)}
                      style={{ width: "auto", minWidth: 110 }}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {o.resi ? (
                      <div className="small">
                        <span className="tabular">{o.resi}</span>{" "}
                        <span className="muted">({o.courier})</span>
                      </div>
                    ) : (
                      <span className="muted small">—</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-secondary small" onClick={() => openResi(o)}>
                      {o.resi ? "Edit" : "Input"} resi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 50
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <div className="card" style={{ maxWidth: 480, width: "100%" }}>
            <h3>Input Resi · {editing.id}</h3>
            <div className="stack-tight">
              <label htmlFor="courier-sel">Kurir</label>
              <select
                id="courier-sel"
                value={courier}
                onChange={(e) => setCourier(e.target.value as Courier)}
              >
                {COURIERS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <label htmlFor="resi">No. Resi</label>
              <input
                id="resi"
                value={resi}
                onChange={(e) => setResi(e.target.value)}
                placeholder="cth. 1234567890"
              />
              {err && <div className="small" style={{ color: "#B91C1C" }}>{err}</div>}
              <div className="row" style={{ justifyContent: "flex-end", marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => setEditing(null)} disabled={saving}>
                  Batal
                </button>
                <button className="btn" onClick={saveResi} disabled={saving || !resi.trim()}>
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
