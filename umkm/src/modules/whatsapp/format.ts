import type { Order } from "@/modules/order/invoice";
import { formatCurrency } from "@/modules/order/invoice";
import type { Product } from "@/modules/product/types";

/**
 * Sanitize a phone number for use with wa.me. Strips non-digits and leading
 * zero or '+'. If the number already starts with country code 62 it's left
 * alone; otherwise a leading '0' is replaced with '62'.
 */
export function normalizeWhatsAppNumber(raw: string): string {
  const digits = (raw || "").replace(/\D+/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return digits;
}

export function buildWaMeLink(number: string, message: string): string {
  const n = normalizeWhatsAppNumber(number);
  const text = encodeURIComponent(message);
  return `https://wa.me/${n}?text=${text}`;
}

export function formatOrderMessage(order: Order, brand: string): string {
  const lines: string[] = [];
  lines.push(`*Pesanan ${brand}*`);
  lines.push(`No. Invoice: ${order.id}`);
  lines.push("");
  lines.push("*Detail Pesanan:*");
  for (const item of order.items) {
    lines.push(
      `• ${item.productName} — ${item.qty} pcs × ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.subtotal)}`
    );
  }
  lines.push("");
  lines.push(`Subtotal: ${formatCurrency(order.subtotal)}`);
  if (order.discount > 0) lines.push(`Diskon: -${formatCurrency(order.discount)}`);
  lines.push(`Ongkir (${order.regionName}): ${formatCurrency(order.shipping)}`);
  lines.push(`*Total: ${formatCurrency(order.total)}*`);
  lines.push("");
  lines.push("*Data Pengiriman:*");
  lines.push(`Nama: ${order.customerName}`);
  lines.push(`No. WA: ${order.customerWa}`);
  lines.push(`Alamat: ${order.customerAddress}`);
  if (order.notes) {
    lines.push("");
    lines.push(`Catatan: ${order.notes}`);
  }
  lines.push("");
  lines.push("Mohon konfirmasi & info pembayaran. Terima kasih 🙏");
  return lines.join("\n");
}

export function formatProductInquiry(product: Product, brand: string): string {
  return [
    `Halo ${brand},`,
    "",
    `Saya tertarik dengan produk:`,
    `*${product.name}* (${product.id})`,
    "",
    `Boleh minta info lebih lanjut?`
  ].join("\n");
}
