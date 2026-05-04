import type { Product } from "@/modules/product/types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  if (!products.length) {
    return (
      <div className="empty">
        Belum ada produk. Tambahkan di halaman admin.
      </div>
    );
  }
  return (
    <div className="grid grid-products">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
