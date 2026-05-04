import type { Product } from "@/modules/product/types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage }: Props) {
  if (!products.length) {
    return (
      <div className="empty">
        {emptyMessage ?? "Belum ada produk. Tambahkan di halaman admin."}
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
