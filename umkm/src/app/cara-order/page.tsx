import Link from "next/link";
import { Search, Calculator, MessageCircle, CheckCircle2, Truck } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { config } from "@/config/app.config";
import { buildWaMeLink } from "@/modules/whatsapp/format";

export const metadata: Metadata = {
  title: "Cara Order"
};

const STEPS = [
  {
    Icon: Search,
    title: "1. Pilih Produk",
    desc: "Telusuri katalog atau gunakan pencarian untuk menemukan barang yang Anda butuhkan."
  },
  {
    Icon: Calculator,
    title: "2. Atur Jumlah",
    desc: "Tentukan jumlah pesanan. Sistem otomatis menghitung harga grosir, diskon, & ongkir."
  },
  {
    Icon: MessageCircle,
    title: "3. Checkout via WhatsApp",
    desc: "Tekan tombol Order via WhatsApp. Detail pesanan otomatis terisi di chat ke admin."
  },
  {
    Icon: CheckCircle2,
    title: "4. Konfirmasi & Bayar",
    desc: "Admin akan konfirmasi stok & total bayar. Transfer manual ke rekening yang diinformasikan."
  },
  {
    Icon: Truck,
    title: "5. Pengiriman",
    desc: "Pesanan dikemas dan dikirim. Anda bisa lacak status via halaman Lacak Pesanan."
  }
];

export default function CaraOrderPage() {
  const wa = buildWaMeLink(
    config.whatsappNumber,
    `Halo ${config.brand.name}, saya mau bertanya cara order.`
  );
  return (
    <section className="section">
      <Container>
        <div style={{ maxWidth: 720, marginBottom: 24 }}>
          <h1>Cara Order</h1>
          <p className="muted">
            Belanja grosir di {config.brand.name} cepat dan tanpa ribet.
            Tidak perlu daftar, cukup ikuti 5 langkah berikut.
          </p>
        </div>

        <div className="grid grid-3">
          {STEPS.map(({ Icon, title, desc }) => (
            <div className="card card-loose" key={title}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--primary-light)",
                  color: "var(--primary-dark)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12
                }}
              >
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p className="muted" style={{ margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="card card-loose" style={{ marginTop: 32, textAlign: "center" }}>
          <h3>Masih bingung?</h3>
          <p className="muted">Tanya admin langsung lewat WhatsApp, kami siap bantu.</p>
          <a className="btn btn-lg" href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} /> Chat Admin
          </a>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="/#produk">← Kembali ke katalog</Link>
        </div>
      </Container>
    </section>
  );
}
