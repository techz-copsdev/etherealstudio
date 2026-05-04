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
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="img" aria-label={product.name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="body">
        <Link href={`/products/${product.slug}`} className="name" style={{ color: "inherit" }}>
          {product.name}
        </Link>
        <span className="min">Min. Order {product.minOrder} {product.unit}</span>
        <div className="price tabular">{formatCurrency(startsFrom)}</div>
        <div className="actions">
          <Link href={`/products/${product.slug}`} className="btn btn-sm btn-block">
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
