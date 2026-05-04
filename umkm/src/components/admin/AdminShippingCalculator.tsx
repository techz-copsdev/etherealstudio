"use client";

import { useMemo, useState } from "react";
import { SHIPPING_REGIONS } from "@/modules/shipping/regions";
import { calculateShipping } from "@/modules/shipping/calculator";
import { formatCurrency } from "@/modules/order/invoice";

export function AdminShippingCalculator() {
  const [regionId, setRegionId] = useState<string>(SHIPPING_REGIONS[0]?.id ?? "");
  const [override, setOverride] = useState<string>("");
  const [weight, setWeight] = useState<number>(1);

  const overrideNum = override === "" ? undefined : Number(override);
  const base = useMemo(
    () => calculateShipping(regionId, Number.isFinite(overrideNum) ? overrideNum : undefined),
    [regionId, overrideNum]
  );
  const total = base.cost * Math.max(1, Math.ceil(weight || 1));

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3>Input</h3>
        <div className="stack-tight">
          <label htmlFor="region">Wilayah</label>
          <select
            id="region"
            value={regionId}
            onChange={(e) => setRegionId(e.target.value)}
          >
            {SHIPPING_REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          <label htmlFor="weight">Berat (kg)</label>
          <input
            id="weight"
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <label htmlFor="override">Override per kg (opsional)</label>
          <input
            id="override"
            type="number"
            min={0}
            value={override}
            onChange={(e) => setOverride(e.target.value)}
            placeholder="Kosongkan untuk tarif default"
          />
        </div>
      </div>
      <div className="card">
        <h3>Estimasi</h3>
        <div className="stack-tight">
          <div className="row-between">
            <span className="muted">Wilayah</span>
            <span>{base.regionName}</span>
          </div>
          {base.eta && (
            <div className="row-between">
              <span className="muted">Estimasi tiba</span>
              <span>{base.eta}</span>
            </div>
          )}
          <div className="row-between">
            <span className="muted">Tarif per kg</span>
            <span className="tabular">{formatCurrency(base.cost)}</span>
          </div>
          <div className="row-between">
            <span className="muted">Berat</span>
            <span className="tabular">{Math.max(1, Math.ceil(weight || 1))} kg</span>
          </div>
          <hr className="divider" />
          <div className="row-between">
            <strong>Total ongkir</strong>
            <strong className="tabular" style={{ fontSize: 22, color: "var(--primary-dark)" }}>
              {formatCurrency(total)}
            </strong>
          </div>
          {base.fallback && (
            <div className="small muted">
              ⚠ Wilayah tidak ditemukan, menggunakan tarif default.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
