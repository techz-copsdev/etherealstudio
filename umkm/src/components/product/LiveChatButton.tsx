"use client";

import { config } from "@/config/app.config";
import type { Product } from "@/modules/product/types";
import { buildWaMeLink, formatProductInquiry } from "@/modules/whatsapp/format";

interface Props {
  product: Product;
}

export function LiveChatButton({ product }: Props) {
  if (!config.enableLiveChat) return null;
  const message = formatProductInquiry(product, config.brand.name);
  const href = buildWaMeLink(config.whatsappNumber, message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-secondary"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      Tanya Produk Ini
    </a>
  );
}
