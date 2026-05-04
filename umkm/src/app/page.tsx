import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getDataAdapter } from "@/services/data";
import { config } from "@/config/app.config";
import { buildWaMeLink } from "@/modules/whatsapp/format";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const adapter = getDataAdapter();
  let products = [] as Awaited<ReturnType<typeof adapter.getProducts>>;
  try {
    products = await adapter.getProducts();
  } catch {
    products = [];
  }

  return (
    <>
      <section className="hero">
        <Container>
          <div className="stack" style={{ maxWidth: 720 }}>
            <span className="badge badge-primary">UMKM Bulk Order</span>
            <h1>{config.brand.tagline}</h1>
            <p className="muted" style={{ fontSize: 16 }}>
              Pilih produk, atur jumlah, lalu checkout langsung via WhatsApp.
              Tanpa login. Tanpa ribet.
            </p>
            <div className="hero-actions">
              <a href="#produk" className="btn btn-lg">Lihat Katalog</a>
              <a
                className="btn btn-lg btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                href={buildWaMeLink(
                  config.whatsappNumber,
                  `Halo ${config.brand.name}, saya mau tanya katalog grosir.`
                )}
              >
                Chat WhatsApp
              </a>
              {config.enableTracking && (
                <Link className="btn btn-lg btn-ghost" href="/track">
                  Lacak Pesanan →
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="section" id="produk">
        <Container>
          <div className="row-between" style={{ marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>Produk Grosir</h2>
            <span className="muted small">{products.length} produk</span>
          </div>
          <ProductGrid products={products} />
        </Container>
      </section>
    </>
  );
}
