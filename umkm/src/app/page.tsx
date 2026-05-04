import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/layout/Hero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { CategoryGrid } from "@/components/product/CategoryGrid";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PublicShippingCalculator } from "@/components/order/PublicShippingCalculator";
import { PublicOrderTracker } from "@/components/order/PublicOrderTracker";
import { getDataAdapter } from "@/services/data";
import categories from "@/data/categories.json";
import type { Product } from "@/modules/product/types";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: { q?: string; category?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const adapter = getDataAdapter();
  let products: Product[] = [];
  try {
    products = await adapter.getProducts();
  } catch {
    products = [];
  }

  const q = (searchParams?.q ?? "").trim().toLowerCase();
  const cat = (searchParams?.category ?? "").trim().toLowerCase();
  const filtered = products.filter((p) => {
    if (cat && p.category.toLowerCase() !== cat) return false;
    if (q) {
      const hay = `${p.name} ${p.description} ${p.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const popular = filtered.slice(0, 4);
  const others = filtered.slice(4);

  return (
    <>
      <Hero />
      <FeatureRow />

      <section className="section" id="kategori">
        <Container>
          <div className="section-head">
            <h2>Kategori Produk</h2>
            <Link href="/#produk">Lihat semua →</Link>
          </div>
          <CategoryGrid categories={categories} />
        </Container>
      </section>

      <section className="section" id="produk" style={{ paddingTop: 0 }}>
        <Container>
          <div className="section-head">
            <h2>{cat || q ? "Hasil Pencarian" : "Produk Terlaris"}</h2>
            <Link href="/#produk">Lihat semua →</Link>
          </div>
          <ProductGrid products={popular} emptyMessage="Tidak ada produk yang cocok." />
        </Container>
      </section>

      {others.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <Container>
            <div className="section-head">
              <h2>Produk Lainnya</h2>
            </div>
            <ProductGrid products={others} />
          </Container>
        </section>
      )}

      <section className="section" id="cek-ongkir" style={{ background: "var(--bg)", paddingTop: 48 }}>
        <Container>
          <div className="section-head">
            <h2>Cek Ongkir</h2>
            <span className="muted small">Estimasi cepat sebelum order</span>
          </div>
          <PublicShippingCalculator />
        </Container>
      </section>

      <section className="section" id="lacak-pesanan">
        <Container>
          <div className="section-head">
            <h2>Lacak Pesanan</h2>
            <span className="muted small">Tanpa login. Pakai ID atau no. WhatsApp.</span>
          </div>
          <PublicOrderTracker />
        </Container>
      </section>
    </>
  );
}
