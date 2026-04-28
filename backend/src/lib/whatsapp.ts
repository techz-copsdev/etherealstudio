import { env } from "../config/env";

/**
 * Build a wa.me deep link with a prefilled message.
 * The frontend also generates these client-side; this helper exists so
 * backend handlers (e.g. notification webhooks) can produce identical links.
 */
export function buildWhatsAppLink(message: string, number: string = env.WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
