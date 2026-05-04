import type { PricingTier } from "@/modules/product/types";
import { formatCurrency } from "@/modules/order/invoice";

interface Props {
  tiers: PricingTier[];
  unit: string;
  qty: number;
}

export function TierTable({ tiers, unit, qty }: Props) {
  if (!tiers || tiers.length === 0) return null;
  const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
  const activeIdx = sorted.reduce(
    (acc, t, i) => (qty >= t.minQty ? i : acc),
    -1
  );
  return (
    <table className="tier-table">
      <thead>
        <tr>
          <th>Kuantitas</th>
          <th>Harga / {unit}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((t, i) => (
          <tr key={t.minQty} className={i === activeIdx ? "active" : ""}>
            <td className="tabular">{t.minQty}+ {unit}</td>
            <td className="tabular">{formatCurrency(t.pricePerUnit)}</td>
            <td className="muted small">{t.label ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
