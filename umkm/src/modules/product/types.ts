export interface PricingTier {
  /** Inclusive minimum quantity that triggers this tier. */
  minQty: number;
  /** Per-unit price at this tier. */
  pricePerUnit: number;
  /** Optional human label e.g. "Hemat 10%". */
  label?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  unit: string;
  basePrice: number;
  minOrder: number;
  /** Sorted ascending by minQty. May be empty — falls back to basePrice. */
  tiers: PricingTier[];
  active: boolean;
}
