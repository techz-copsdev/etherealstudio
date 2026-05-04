import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { config } from "@/config/app.config";
import { Container } from "./Container";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80";

export function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero-grid">
          <div>
            <h1>{config.brand.tagline}</h1>
            <p>
              Produk berkualitas dengan harga terbaik untuk bisnis Anda.
              Tanpa ribet, langsung terhubung via WhatsApp.
            </p>
            <div className="hero-actions">
              <Link href="#produk" className="btn btn-lg">
                Lihat Produk <ArrowRight size={16} />
              </Link>
              <Link href="/cara-order" className="btn btn-lg btn-outline">
                <BookOpen size={16} /> Cara Order
              </Link>
            </div>
          </div>
          <div className="hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGE}
              alt="Tumpukan kardus pesanan grosir"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
