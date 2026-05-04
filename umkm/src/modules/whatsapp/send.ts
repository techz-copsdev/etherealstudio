import { buildWaMeLink } from "./format";

export interface WhatsAppSendOptions {
  number: string;
  message: string;
  /** When true, attempts the optional WA Business API layer first. */
  useApi?: boolean;
}

export interface WhatsAppSendResult {
  link: string;
  via: "wa.me" | "api";
  ok: boolean;
}

/**
 * Generate a WhatsApp link / dispatch a message.
 *
 * Primary path is `wa.me/<number>?text=...`. An optional API layer is wired
 * via `WHATSAPP_API_URL` (server-only). Any failure in the API layer falls
 * back to wa.me — never throws.
 */
export async function sendWhatsApp(
  opts: WhatsAppSendOptions
): Promise<WhatsAppSendResult> {
  const link = buildWaMeLink(opts.number, opts.message);

  if (!opts.useApi) {
    return { link, via: "wa.me", ok: true };
  }

  const apiUrl =
    typeof process !== "undefined" ? process.env.WHATSAPP_API_URL : undefined;
  const apiToken =
    typeof process !== "undefined" ? process.env.WHATSAPP_API_TOKEN : undefined;
  if (!apiUrl) return { link, via: "wa.me", ok: true };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {})
      },
      body: JSON.stringify({ to: opts.number, message: opts.message })
    });
    if (!res.ok) throw new Error(`WhatsApp API status ${res.status}`);
    return { link, via: "api", ok: true };
  } catch {
    // Always fall back to wa.me — never throw.
    return { link, via: "wa.me", ok: true };
  }
}
