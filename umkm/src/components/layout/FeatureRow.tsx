import { Tags, MessageSquare, UserCircle2, Truck } from "lucide-react";
import { Container } from "./Container";

const FEATURES = [
  {
    Icon: Tags,
    title: "Harga Grosir",
    sub: "Lebih Hemat"
  },
  {
    Icon: MessageSquare,
    title: "Order Mudah",
    sub: "via WhatsApp"
  },
  {
    Icon: UserCircle2,
    title: "Tanpa Akun",
    sub: "Langsung Order"
  },
  {
    Icon: Truck,
    title: "Pengiriman Cepat",
    sub: "Seluruh Indonesia"
  }
];

export function FeatureRow() {
  return (
    <section className="features">
      <Container>
        <div className="features-grid">
          {FEATURES.map(({ Icon, title, sub }) => (
            <div className="feature" key={title}>
              <div className="feature-icon">
                <Icon size={22} strokeWidth={2} />
              </div>
              <div className="feature-text">
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
