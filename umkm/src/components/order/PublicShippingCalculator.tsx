"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { SHIPPING_REGIONS } from "@/modules/shipping/regions";
import { calculateShipping } from "@/modules/shipping/calculator";
import { formatCurrency } from "@/modules/order/invoice";

const COURIERS = [
  { name: "JNE", eta: "1–2 hari", multiplier: 1.0 },
  { name: "J&T", eta: "1–2 hari", multiplier: 0.8 },
  { name: "AnterAja", eta: "1–3 hari", multiplier: 0.72 }
];

export function PublicShippingCalculator() {
  const [origin, setOrigin] = useState("Jakarta");
  const [dest, setDest] = useState(SHIPPING_REGIONS[0]?.id ?? "");
  const [weight, setWeight] = useState<number>(10);
  const [calculated, setCalculated] = useState<boolean>(false);

  const shipping = calculateShipping(dest);
  const baseCost = shipping.cost;

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setCalculated(true);
  }

  return (
    <div className="grid grid-2" style={{ alignItems: "stretch" }}>
      <div className="card card-loose">
        <h3>Cek Ongkos Kirim</h3>
        <p className="muted small" style={{ marginBottom: 16 }}>
          Estimasi tarif berdasarkan wilayah tujuan & berat paket.
        </p>
        <form onSubmit={handleCheck} className="stack">
          <div>
            <label htmlFor="origin">Kota Asal</label>
            <input
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="cth. Jakarta"
            />
          </div>
          <div>
            <label htmlFor="dest">Kota Tujuan</label>
            <select id="dest" value={dest} onChange={(e) => setDest(e.target.value)}>
              {SHIPPING_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="w">Berat (kg)</label>
            <input
              id="w"
              type="number"
              min={1}
              value={weight}
              onChange={(e) => setWeight(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
          <button className="btn" type="submit">
            <Calculator size={16} /> Cek Ongkir
          </button>
        </form>
      </div>

      <div className="card card-flush" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ margin: 0 }}>Hasil Estimasi</h3>
          <span className="muted small">Per paket {weight} kg</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Ekspedisi</th>
              <th>Estimasi</th>
              <th style={{ textAlign: "right" }}>Harga</th>
            </tr>
          </thead>
          <tbody>
            {COURIERS.map((c) => {
              const cost = calculated ? Math.round((baseCost * c.multiplier * weight) / 10) * 10 : baseCost * c.multiplier;
              return (
                <tr key={c.name}>
                  <td><strong>{c.name}</strong></td>
                  <td className="muted">{c.eta}</td>
                  <td style={{ textAlign: "right" }} className="tabular">
                    {formatCurrency(Math.round(cost))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!calculated && (
          <div style={{ padding: "12px 24px", color: "var(--text-muted)", fontSize: 13 }}>
            Tekan <strong>Cek Ongkir</strong> untuk hitung berdasarkan berat paket.
          </div>
        )}
      </div>
    </div>
  );
}
