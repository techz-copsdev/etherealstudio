import type { TrackingResult } from "./types";

const JNT_API = process.env.JNT_API_URL;
const JNT_TOKEN = process.env.JNT_API_TOKEN;

export async function trackJNT(resi: string): Promise<TrackingResult> {
  if (!resi) {
    return {
      ok: false,
      courier: "jnt",
      resi,
      events: [],
      fallback: true,
      message: "Nomor resi kosong"
    };
  }
  if (!JNT_API) {
    return {
      ok: false,
      courier: "jnt",
      resi,
      events: [],
      fallback: true,
      message: "Layanan tracking tidak dikonfigurasi"
    };
  }
  try {
    const res = await fetch(`${JNT_API}?awb=${encodeURIComponent(resi)}`, {
      headers: JNT_TOKEN ? { Authorization: `Bearer ${JNT_TOKEN}` } : {},
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`JNT status ${res.status}`);
    const data = (await res.json()) as {
      status?: string;
      receiver?: string;
      history?: Array<{ date: string; desc: string; city?: string }>;
    };
    return {
      ok: true,
      courier: "jnt",
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
      courier: "jnt",
      resi,
      events: [],
      fallback: true,
      message: "Status tidak tersedia, hubungi admin"
    };
  }
}
