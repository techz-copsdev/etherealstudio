import type { PricingTier } from "@/modules/product/types";
import { formatCurrency } from "@/modules/order/invoice";

interface Props {
  tiers: PricingTier[];
  unit: string;
  qty: number;
}

/**
 * Tier price table styled to match the product detail reference design:
 * "Tier Harga | Harga Satuan | Subtotal" with the active tier highlighted.
 */
export function TierTable({ tiers, unit, qty }: Props) {
  if (!tiers || tiers.length === 0) return null;
  const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
  const activeIdx = sorted.reduce(
    (acc, t, i) => (qty >= t.minQty ? i : acc),
    -1
  );
  return (
    <table className="tier-table bordered">
      <thead>
        <tr>
          <th>Tier Harga</th>
          <th>Harga Satuan</th>
          <th style={{ textAlign: "right" }}>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((t, i) => {
          const isActive = i === activeIdx;
          const subtotal = isActive ? qty * t.pricePerUnit : null;
          return (
            <tr key={t.minQty} className={isActive ? "active" : ""}>
              <td>{t.label ?? `${t.minQty}+ ${unit}`}</td>
              <td className="tabular">{formatCurrency(t.pricePerUnit)}</td>
              <td className="tabular" style={{ textAlign: "right" }}>
                {subtotal !== null ? formatCurrency(subtotal) : "—"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
