import type { TrackingResult } from "./types";

const JNE_API = process.env.JNE_API_URL;
const JNE_TOKEN = process.env.JNE_API_TOKEN;

/**
 * Track a JNE shipment. Returns a structured result with `fallback=true` when
 * the upstream service is unavailable. Never throws.
 */
export async function trackJNE(resi: string): Promise<TrackingResult> {
  if (!resi) {
    return {
      ok: false,
      courier: "jne",
      resi,
      events: [],
      fallback: true,
      message: "Nomor resi kosong"
    };
  }
  if (!JNE_API) {
    return {
      ok: false,
      courier: "jne",
      resi,
      events: [],
      fallback: true,
      message: "Layanan tracking tidak dikonfigurasi"
    };
  }
  try {
    const res = await fetch(`${JNE_API}?awb=${encodeURIComponent(resi)}`, {
      headers: JNE_TOKEN ? { Authorization: `Bearer ${JNE_TOKEN}` } : {},
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`JNE status ${res.status}`);
    const data = (await res.json()) as {
      status?: string;
      receiver?: string;
      history?: Array<{ date: string; desc: string; city?: string }>;
    };
    return {
      ok: true,
      courier: "jne",
      resi,
      status: data.status,
      receiver: data.receiver,
      events: (data.history ?? []).map((h) => ({
        date: h.date,
        status: h.desc,
        location: h.city
      })),
      fallback: false
    };
  } catch {
    return {
      ok: false,
      courier: "jne",
      resi,
      events: [],
      fallback: true,
      message: "Status tidak tersedia, hubungi admin"
    };
  }
}
