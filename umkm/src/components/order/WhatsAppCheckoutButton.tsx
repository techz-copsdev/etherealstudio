"use client";

import { useState } from "react";
import { config } from "@/config/app.config";
import type { Product } from "@/modules/product/types";
import {
  generateOrderId,
  type Order
} from "@/modules/order/invoice";
import {
  buildWaMeLink,
  formatOrderMessage,
  normalizeWhatsAppNumber
} from "@/modules/whatsapp/format";
import type { ShippingResult } from "@/modules/shipping/calculator";

interface Props {
  product: Product;
  qty: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  shipping: ShippingResult;
  customer: { name: string; wa: string; address: string; notes?: string };
  disabled?: boolean;
}

export function WhatsAppCheckoutButton({
  product,
  qty,
  unitPrice,
  subtotal,
  discount,
  shipping,
  customer,
  disabled
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (disabled || submitting) return;
    setSubmitting(true);
    setError(null);

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customerName: customer.name.trim(),
      customerWa: normalizeWhatsAppNumber(customer.wa),
      customerAddress: customer.address.trim(),
      regionId: shipping.regionId,
      regionName: shipping.regionName,
      items: [
        {
          productId: product.id,
          productName: product.name,
          qty,
          unitPrice,
          subtotal
        }
      ],
      subtotal,
      discount,
      shipping: shipping.cost,
      total: subtotal + shipping.cost,
      status: "pending",
      notes: customer.notes?.trim() || undefined,
      courier: null
    };

    // Best-effort persistence — never block WhatsApp redirect on this.
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
    } catch {
      // Ignore — invoice is still generated locally and sent via WA.
    }

    const message = formatOrderMessage(order, config.brand.name);
    const link = buildWaMeLink(config.whatsappNumber, message);

    try {
      const win = window.open(link, "_blank", "noopener,noreferrer");
      if (!win) throw new Error("Popup blocked");
    } catch {
      // Final fallback: same-tab navigation so the order is never lost.
      try {
        window.location.href = link;
      } catch {
        setError(
          "Tidak bisa membuka WhatsApp otomatis. Salin nomor invoice & hubungi admin."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="stack-tight">
      <button
        type="button"
        className="btn btn-lg btn-block"
        onClick={handleClick}
        disabled={disabled || submitting}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        {submitting ? "Membuka WhatsApp..." : "Pesan via WhatsApp"}
      </button>
      {error && (
        <div className="small" style={{ color: "#B91C1C" }}>
          {error}
        </div>
      )}
      <span className="small muted" style={{ textAlign: "center" }}>
        Pembayaran transfer manual. Tidak perlu login.
      </span>
    </div>
  );
}
