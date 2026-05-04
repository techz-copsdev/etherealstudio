import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { OrderTrackingForm } from "@/components/order/OrderTrackingForm";

export const metadata: Metadata = {
  title: "Lacak Pesanan",
  description: "Cek status pesanan dengan no. invoice atau no. WhatsApp."
};

export default function TrackPage() {
  return (
    <section className="section">
      <Container>
        <div style={{ maxWidth: 720 }}>
          <h1>Lacak Pesanan</h1>
          <p className="muted">
            Masukkan no. invoice (cth. <span className="tabular">INV-241201-AB12CD</span>)
            atau no. WhatsApp yang digunakan saat memesan.
          </p>
          <div style={{ marginTop: 16 }}>
            <OrderTrackingForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
