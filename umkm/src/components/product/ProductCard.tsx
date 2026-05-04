import Link from "next/link";
import type { Product } from "@/modules/product/types";
import { formatCurrency } from "@/modules/order/invoice";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const lowestTier = [...(product.tiers ?? [])].sort(
    (a, b) => a.pricePerUnit - b.pricePerUnit
  )[0];
  const startsFrom = lowestTier?.pricePerUnit ?? product.basePrice;
  return (
    <Link href={`/products/${product.slug}`} className="product-card" aria-label={product.name}>
      <div className="img">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="body">
        <span className="badge badge-muted">{product.category}</span>
        <span className="name">{product.name}</span>
        <span className="muted small">Min. order {product.minOrder} {product.unit}</span>
        <div className="row-between" style={{ marginTop: 4 }}>
          <span className="muted small">Mulai dari</span>
          <span className="price tabular">{formatCurrency(startsFrom)}</span>
        </div>
      </div>
    </Link>
  );
}
