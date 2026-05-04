import { calculateBreakdown } from "@/modules/product/helpers";
import type { Product } from "@/modules/product/types";

export interface OrderTotals {
  qty: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export function calculateOrderTotals(
  product: Product,
  qty: number,
  shipping: number
): OrderTotals {
  const breakdown = calculateBreakdown(product, qty);
  const safeShipping = Math.max(0, shipping || 0);
  return {
    qty: breakdown.qty,
    unitPrice: breakdown.unitPrice,
    subtotal: breakdown.subtotal,
    discount: breakdown.discount,
    shipping: safeShipping,
    total: breakdown.subtotal + safeShipping
  };
}
