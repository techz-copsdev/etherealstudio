import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { QuantityCalculator } from "@/components/product/QuantityCalculator";
import { LiveChatButton } from "@/components/product/LiveChatButton";
import { getDataAdapter } from "@/services/data";
import { formatCurrency } from "@/modules/order/invoice";
import categories from "@/data/categories.json";

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
  const cat = categories.find((c) => c.slug === product.category);
  const gallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  return (
    <section className="section">
      <Container>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Beranda</Link>
          <span className="sep">›</span>
          <Link href={`/?category=${product.category}#produk`}>
            {cat?.name ?? product.category}
          </Link>
          <span className="sep">›</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="pd-grid">
          <ProductGallery images={gallery} alt={product.name} />

          <div className="stack-loose">
            <div>
              <h1 style={{ marginBottom: 6 }}>{product.name}</h1>
              <div className="muted small">Min. Order {product.minOrder} {product.unit}</div>
            </div>

            <div className="row" style={{ gap: 12 }}>
              <div
                className="tabular"
                style={{ fontSize: 28, fontWeight: 800, color: "var(--primary-dark)" }}
              >
                {formatCurrency(startsFrom)}
              </div>
              <span className="muted">/ {product.unit}</span>
              <div style={{ marginLeft: "auto" }}>
                <LiveChatButton product={product} size="sm" />
              </div>
            </div>

            <p className="muted" style={{ margin: 0 }}>{product.description}</p>

            <hr className="divider" />

            <QuantityCalculator product={product} />
          </div>
        </div>
      </Container>
    </section>
  );
}
