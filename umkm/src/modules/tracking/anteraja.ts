import type { TrackingResult } from "./types";

const ANTERAJA_API = process.env.ANTERAJA_API_URL;
const ANTERAJA_TOKEN = process.env.ANTERAJA_API_TOKEN;

export async function trackAnterAja(resi: string): Promise<TrackingResult> {
  if (!resi) {
    return {
      ok: false,
      courier: "anteraja",
      resi,
      events: [],
      fallback: true,
      message: "Nomor resi kosong"
    };
  }
  if (!ANTERAJA_API) {
    return {
      ok: false,
      courier: "anteraja",
      resi,
      events: [],
      fallback: true,
      message: "Layanan tracking tidak dikonfigurasi"
    };
  }
  try {
    const res = await fetch(`${ANTERAJA_API}?awb=${encodeURIComponent(resi)}`, {
      headers: ANTERAJA_TOKEN ? { Authorization: `Bearer ${ANTERAJA_TOKEN}` } : {},
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`AnterAja status ${res.status}`);
    const data = (await res.json()) as {
      status?: string;
      receiver?: string;
      history?: Array<{ date: string; desc: string; city?: string }>;
    };
    return {
      ok: true,
      courier: "anteraja",
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
      courier: "anteraja",
      resi,
      events: [],
      fallback: true,
      message: "Status tidak tersedia, hubungi admin"
    };
  }
}
