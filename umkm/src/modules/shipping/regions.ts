export interface ShippingRegion {
  id: string;
  name: string;
  cost: number;
  /** Optional ETA hint shown in UI, e.g. "1-2 hari". */
  eta?: string;
}

/**
 * Region-based base shipping table. Override per-order via admin shipping
 * calculator. Costs are in IDR.
 */
export const SHIPPING_REGIONS: ShippingRegion[] = [
  { id: "jabodetabek", name: "Jabodetabek", cost: 15000, eta: "1-2 hari" },
  { id: "jawa-barat", name: "Jawa Barat", cost: 18000, eta: "2-3 hari" },
  { id: "jawa-tengah", name: "Jawa Tengah", cost: 22000, eta: "2-4 hari" },
  { id: "jawa-timur", name: "Jawa Timur", cost: 25000, eta: "3-4 hari" },
  { id: "bali-nusra", name: "Bali & Nusa Tenggara", cost: 35000, eta: "3-5 hari" },
  { id: "sumatera", name: "Sumatera", cost: 32000, eta: "3-5 hari" },
  { id: "kalimantan", name: "Kalimantan", cost: 38000, eta: "4-6 hari" },
  { id: "sulawesi", name: "Sulawesi", cost: 40000, eta: "4-6 hari" },
  { id: "maluku-papua", name: "Maluku & Papua", cost: 60000, eta: "5-8 hari" }
];

export function findRegion(id: string): ShippingRegion | undefined {
  return SHIPPING_REGIONS.find((r) => r.id === id);
}
