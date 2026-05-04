import type { PricingTier, Product } from "./types";

/**
 * Resolve the effective per-unit price for a given quantity.
 * Falls back to `basePrice` when the product has no tiers or quantity is
 * below the lowest tier.
 */
export function resolveUnitPrice(product: Product, qty: number): number {
  if (!product.tiers || product.tiers.length === 0) return product.basePrice;
  const sorted = [...product.tiers].sort((a, b) => a.minQty - b.minQty);
  let price = product.basePrice;
  for (const tier of sorted) {
    if (qty >= tier.minQty) price = tier.pricePerUnit;
  }
  return price;
}

export interface PriceBreakdown {
  qty: number;
  unitPrice: number;
  baseSubtotal: number;
  subtotal: number;
  discount: number;
  appliedTier: PricingTier | null;
}

export function calculateBreakdown(product: Product, qty: number): PriceBreakdown {
  const safeQty = Math.max(0, Math.floor(qty || 0));
  const unitPrice = resolveUnitPrice(product, safeQty);
  const baseSubtotal = product.basePrice * safeQty;
  const subtotal = unitPrice * safeQty;
  const discount = Math.max(0, baseSubtotal - subtotal);
  const sorted = [...(product.tiers || [])].sort((a, b) => a.minQty - b.minQty);
  const appliedTier = sorted.reduce<PricingTier | null>((acc, tier) => {
    return safeQty >= tier.minQty ? tier : acc;
  }, null);
  return { qty: safeQty, unitPrice, baseSubtotal, subtotal, discount, appliedTier };
}

/**
 * Suggest topping up to the next tier when the user is close to a discount.
 * Returns null if no upgrade exists or the user is already at the top tier.
 */
export function suggestTierUpgrade(
  product: Product,
  qty: number
): { addQty: number; nextTier: PricingTier; potentialSavings: number } | null {
  if (!product.tiers || product.tiers.length === 0) return null;
  const sorted = [...product.tiers].sort((a, b) => a.minQty - b.minQty);
  const next = sorted.find((t) => t.minQty > qty);
  if (!next) return null;
  const addQty = next.minQty - qty;
  const currentUnit = resolveUnitPrice(product, qty);
  const projectedUnit = next.pricePerUnit;
  const potentialSavings = (currentUnit - projectedUnit) * next.minQty;
  if (potentialSavings <= 0) return null;
  return { addQty, nextTier: next, potentialSavings };
}
