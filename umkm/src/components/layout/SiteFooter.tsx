import Link from "next/link";
import { CheckCircle2, MessageCircle, Mail, MapPin } from "lucide-react";
import { config } from "@/config/app.config";
import { Container } from "./Container";
import { buildWaMeLink } from "@/modules/whatsapp/format";

export function SiteFooter() {
  const wa = buildWaMeLink(config.whatsappNumber, `Halo ${config.brand.name}, saya mau bertanya.`);
  return (
    <footer className="site-footer" id="kontak">
      <Container>
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 12 }}>
              <span className="brand-mark"><CheckCircle2 size={18} strokeWidth={2.5} /></span>
              <span>{config.brand.name}</span>
            </Link>
            <p className="muted" style={{ maxWidth: 320 }}>
              {config.brand.tagline}. Belanja grosir tanpa ribet, langsung terhubung
              ke admin via WhatsApp.
            </p>
          </div>
          <div>
            <h4>Belanja</h4>
            <Link href="/#produk">Produk</Link>
            <Link href="/cara-order">Cara Order</Link>
            <Link href="/#cek-ongkir">Cek Ongkir</Link>
            <Link href="/#lacak-pesanan">Lacak Pesanan</Link>
          </div>
          <div>
            <h4>Layanan</h4>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 6 }} />
              Chat WhatsApp
            </a>
            <Link href="/admin">Admin</Link>
          </div>
          <div>
            <h4>Kontak</h4>
            <span>
              <Mail size={14} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 6 }} />
              admin@bulkorder.id
            </span>
            <span>
              <MapPin size={14} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 6 }} />
              Jakarta, Indonesia
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {config.brand.name}. All rights reserved.</span>
          <span className="muted">
            Mode: {config.mode === "cloud" ? "Cloud (Supabase)" : "Local"}
          </span>
        </div>
      </Container>
    </footer>
  );
}
