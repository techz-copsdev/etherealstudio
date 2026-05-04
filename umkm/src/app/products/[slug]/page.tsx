import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { QuantityCalculator } from "@/components/product/QuantityCalculator";
import { LiveChatButton } from "@/components/product/LiveChatButton";
import { getDataAdapter } from "@/services/data";
import { formatCurrency } from "@/modules/order/invoice";

export const dynamic = "force-dynamic";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const adapter = getDataAdapter();
    const product = await adapter.getProduct(params.slug);
    if (!product) return { title: "Produk tidak ditemukan" };
    return {
      title: product.name,
      description: product.description
    };
  } catch {
    return { title: "Produk" };
  }
}

export default async function ProductDetailPage({ params }: Params) {
  const adapter = getDataAdapter();
  let product = null as Awaited<ReturnType<typeof adapter.getProduct>>;
  try {
    product = await adapter.getProduct(params.slug);
  } catch {
    product = null;
  }
  if (!product) notFound();

  const lowestTier = [...(product.tiers ?? [])].sort(
    (a, b) => a.pricePerUnit - b.pricePerUnit
  )[0];
  const startsFrom = lowestTier?.pricePerUnit ?? product.basePrice;

  return (
    <section className="section">
      <Container>
        <div className="small muted" style={{ marginBottom: 16 }}>
          <Link href="/">← Kembali ke katalog</Link>
        </div>
        <div className="pd-grid">
          <div className="pd-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="stack">
            <div className="row">
              <span className="badge badge-muted">{product.category}</span>
              <span className="badge badge-primary">Grosir</span>
            </div>
            <h1 style={{ marginBottom: 4 }}>{product.name}</h1>
            <div className="row-between">
              <div>
                <div className="small muted">Mulai dari</div>
                <div
                  className="tabular"
                  style={{ fontSize: 22, fontWeight: 700, color: "var(--primary-dark)" }}
                >
                  {formatCurrency(startsFrom)} <span className="muted small">/ {product.unit}</span>
                </div>
              </div>
              <LiveChatButton product={product} />
            </div>
            <p className="muted">{product.description}</p>
            <hr className="divider" />
            <QuantityCalculator product={product} />
          </div>
        </div>
      </Container>
    </section>
  );
}
