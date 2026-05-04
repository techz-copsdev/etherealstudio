import { config } from "@/config/app.config";
import { findRegion } from "./regions";

export interface ShippingResult {
  regionId: string | null;
  regionName: string;
  cost: number;
  eta?: string;
  fallback: boolean;
}

/**
 * Resolve shipping cost for a region, falling back to config default when the
 * region is unknown or missing.
 */
export function calculateShipping(
  regionId: string | null | undefined,
  override?: number
): ShippingResult {
  if (typeof override === "number" && override >= 0) {
    const region = regionId ? findRegion(regionId) : undefined;
    return {
      regionId: regionId ?? null,
      regionName: region?.name ?? "Custom",
      cost: override,
      eta: region?.eta,
      fallback: false
    };
  }
  const region = regionId ? findRegion(regionId) : undefined;
  if (!region) {
    return {
      regionId: regionId ?? null,
      regionName: "Default",
      cost: config.shipping.defaultCost,
      fallback: true
    };
  }
  return {
    regionId: region.id,
    regionName: region.name,
    cost: region.cost,
    eta: region.eta,
    fallback: false
  };
}
