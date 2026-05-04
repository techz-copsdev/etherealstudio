import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="section">
      <Container>
        <div className="empty">
          <h1>Produk tidak ditemukan</h1>
          <p className="muted">Mungkin sudah dihapus atau salah link.</p>
          <Link className="btn" href="/">Kembali ke katalog</Link>
        </div>
      </Container>
    </section>
  );
}
