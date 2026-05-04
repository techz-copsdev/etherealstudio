"use client";

import { useState } from "react";
import { recommendSellingPrice } from "@/modules/pricing/recommend";
import { formatCurrency } from "@/modules/order/invoice";

export function AdminPriceCalculator() {
  const [modal, setModal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [margin, setMargin] = useState<number>(30);

  const result = recommendSellingPrice({
    modalCost: modal,
    shippingCost: shipping,
    marginPercent: margin
  });

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3>Input</h3>
        <div className="stack-tight">
          <label htmlFor="modal">Modal cost (HPP)</label>
          <input
            id="modal"
            type="number"
            min={0}
            value={modal}
            onChange={(e) => setModal(Number(e.target.value))}
          />
          <label htmlFor="ship">Ongkir per unit</label>
          <input
            id="ship"
            type="number"
            min={0}
            value={shipping}
            onChange={(e) => setShipping(Number(e.target.value))}
          />
          <label htmlFor="margin">Margin (%)</label>
          <input
            id="margin"
            type="number"
            min={0}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="card">
        <h3>Rekomendasi</h3>
        <div className="stack-tight">
          <div className="row-between">
            <span className="muted">Total cost</span>
            <span className="tabular">{formatCurrency(result.totalCost)}</span>
          </div>
          <div className="row-between">
            <span className="muted">Margin</span>
            <span className="tabular">{formatCurrency(result.marginAmount)}</span>
          </div>
          <hr className="divider" />
          <div className="row-between">
            <strong>Harga jual rekomendasi</strong>
            <strong className="tabular" style={{ fontSize: 22, color: "var(--primary-dark)" }}>
              {formatCurrency(result.recommendedPrice)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
