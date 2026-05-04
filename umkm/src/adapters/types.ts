import type { Order, OrderStatus } from "@/modules/order/invoice";
import type { Product } from "@/modules/product/types";

export interface UpdateOrderInput {
  status?: OrderStatus;
  resi?: string;
  courier?: Order["courier"];
}

export interface DataAdapter {
  /** Returns all active products. Implementations must never throw. */
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  upsertProduct(product: Product): Promise<Product>;
  deleteProduct(id: string): Promise<void>;

  createOrder(order: Order): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | null>;
  /** Lookup by either invoice id or normalized WA number. */
  findOrder(query: string): Promise<Order | null>;
  updateOrder(id: string, patch: UpdateOrderInput): Promise<Order | null>;
}
