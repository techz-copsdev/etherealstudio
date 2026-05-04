import { trackJNE } from "./jne";
import { trackJNT } from "./jnt";
import { trackAnterAja } from "./anteraja";
import type { Courier, TrackingResult } from "./types";

export const COURIERS: Array<{ id: Courier; label: string }> = [
  { id: "jne", label: "JNE" },
  { id: "jnt", label: "J&T" },
  { id: "anteraja", label: "AnterAja" }
];

export async function trackByCourier(
  courier: Courier,
  resi: string
): Promise<TrackingResult> {
  switch (courier) {
    case "jne":
      return trackJNE(resi);
    case "jnt":
      return trackJNT(resi);
    case "anteraja":
      return trackAnterAja(resi);
    default:
      return {
        ok: false,
        courier,
        resi,
        events: [],
        fallback: true,
        message: "Kurir tidak dikenal"
      };
  }
}

export { trackJNE, trackJNT, trackAnterAja };
export type { Courier, TrackingResult } from "./types";
