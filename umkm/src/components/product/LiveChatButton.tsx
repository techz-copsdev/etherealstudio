"use client";

import { MessageSquare } from "lucide-react";
import { config } from "@/config/app.config";
import type { Product } from "@/modules/product/types";
import { buildWaMeLink, formatProductInquiry } from "@/modules/whatsapp/format";

interface Props {
  product: Product;
  size?: "sm" | "md";
}

export function LiveChatButton({ product, size = "md" }: Props) {
  if (!config.enableLiveChat) return null;
  const message = formatProductInquiry(product, config.brand.name);
  const href = buildWaMeLink(config.whatsappNumber, message);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (!win) {
      window.location.href = href;
    }
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={`btn btn-secondary ${size === "sm" ? "btn-sm" : ""}`}
    >
      <MessageSquare size={size === "sm" ? 14 : 16} />
      Tanya Produk Ini
    </a>
  );
}
