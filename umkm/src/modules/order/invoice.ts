import { config } from "@/config/app.config";

export type OrderStatus = "pending" | "paid" | "process" | "done" | "archived";

export interface OrderItem {
  productId: string;
  productName: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerWa: string;
  customerAddress: string;
  regionId: string | null;
  regionName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  resi?: string;
  courier?: "jne" | "jnt" | "anteraja" | null;
  notes?: string;
}

const ID_PREFIX = "INV";

/**
 * Generate a sortable, human-readable order ID. Falls back to Math.random when
 * crypto is unavailable.
 */
export function generateOrderId(): string {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  let suffix = "";
  try {
    const arr = new Uint8Array(3);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(arr);
      suffix = Array.from(arr)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
    }
  } catch {
    suffix = "";
  }
  if (!suffix) {
    suffix = Math.random().toString(16).slice(2, 8).toUpperCase();
  }
  return `${ID_PREFIX}-${yy}${mm}${dd}-${suffix}`;
}

export function formatCurrency(value: number): string {
  try {
    return new Intl.NumberFormat(config.currency.locale, {
      style: "currency",
      currency: config.currency.code,
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `${config.currency.symbol} ${value.toLocaleString("id-ID")}`;
  }
}
