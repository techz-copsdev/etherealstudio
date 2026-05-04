"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { config } from "@/config/app.config";
import { buildWaMeLink } from "@/modules/whatsapp/format";

/**
 * Floating "Tanya Admin" button visible on all public pages.
 * Falls back to manual phone display if `enableLiveChat` is false.
 */
export function FloatingChatButton() {
  const pathname = usePathname();
  if (!config.enableLiveChat) return null;
  if (pathname?.startsWith("/admin")) return null;

  const href = buildWaMeLink(
    config.whatsappNumber,
    `Halo ${config.brand.name}, saya mau bertanya.`
  );

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (!win) {
      // Popup blocked → fallback to direct navigation, then manual contact.
      window.location.href = href;
    }
  }

  return (
    <a className="fab-chat" href={href} onClick={onClick} aria-label="Tanya Admin via WhatsApp">
      <span className="fab-chat-icon" aria-hidden="true">
        <MessageCircle size={16} />
      </span>
      Tanya Admin
    </a>
  );
}
