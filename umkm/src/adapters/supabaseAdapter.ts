import type { DataAdapter, UpdateOrderInput } from "./types";
import type { Order } from "@/modules/order/invoice";
import type { Product } from "@/modules/product/types";
import { localAdapter } from "./localAdapter";
import { normalizeWhatsAppNumber } from "@/modules/whatsapp/format";
import { getServerSupabase } from "@/services/supabaseClient";

/**
 * Supabase-backed data adapter.
 *
 * Required env (server-only):
 *   SUPABASE_URL              (or NEXT_PUBLIC_SUPABASE_URL)
 *   SUPABASE_SERVICE_KEY      (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *
 * On any failure (network, missing env, schema mismatch), falls back to
 * {@link localAdapter} so the UI never breaks.
 *
 * Schema: see `schema.sql` in repo root.
 *   table products (id text pk, payload jsonb)
 *   table orders   (id text pk, created_at timestamptz, payload jsonb)
 */

interface ProductRow {
  id: string;
  payload: Product;
}

interface OrderRow {
  id: string;
  created_at: string;
  payload: Order;
}

export const supabaseAdapter: DataAdapter = {
  async getProducts(): Promise<Product[]> {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.getProducts();
    try {
      const { data, error } = await sb.from("products").select("payload").order("id");
      if (error || !Array.isArray(data)) throw error ?? new Error("no data");
      return (data as { payload: Product }[])
        .map((r) => r.payload)
        .filter((p) => p && p.active);
    } catch {
      return localAdapter.getProducts();
    }
  },

  async getProduct(idOrSlug) {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.getProduct(idOrSlug);
    try {
      const { data, error } = await sb.from("products").select("payload");
      if (error || !Array.isArray(data)) throw error ?? new Error("no data");
      const products = (data as { payload: Product }[]).map((r) => r.payload);
      return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug) ?? null;
    } catch {
      return localAdapter.getProduct(idOrSlug);
    }
  },

  async upsertProduct(product) {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.upsertProduct(product);
    try {
      const row: ProductRow = { id: product.id, payload: product };
      const { error } = await sb.from("products").upsert(row, { onConflict: "id" });
      if (error) throw error;
      // Mirror locally for offline reads
      await localAdapter.upsertProduct(product).catch(() => undefined);
      return product;
    } catch {
      return localAdapter.upsertProduct(product);
    }
  },

  async deleteProduct(id) {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.deleteProduct(id);
    try {
      const { error } = await sb.from("products").delete().eq("id", id);
      if (error) throw error;
      await localAdapter.deleteProduct(id).catch(() => undefined);
    } catch {
      await localAdapter.deleteProduct(id);
    }
  },

  async createOrder(order: Order): Promise<Order> {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.createOrder(order);
    try {
      const row: OrderRow = {
        id: order.id,
        created_at: order.createdAt,
        payload: order
      };
      const { error } = await sb.from("orders").insert(row);
      if (error) throw error;
      await localAdapter.createOrder(order).catch(() => undefined);
      return order;
    } catch {
      return localAdapter.createOrder(order);
    }
  },

  async getOrders(): Promise<Order[]> {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.getOrders();
    try {
      const { data, error } = await sb
        .from("orders")
        .select("payload")
        .order("created_at", { ascending: false });
      if (error || !Array.isArray(data)) throw error ?? new Error("no data");
      return (data as { payload: Order }[]).map((r) => r.payload);
    } catch {
      return localAdapter.getOrders();
    }
  },

  async getOrder(id) {
    const orders = await this.getOrders();
    return orders.find((o) => o.id === id) ?? null;
  },

  async findOrder(query) {
    if (!query) return null;
    const trimmed = query.trim();
    if (!trimmed) return null;
    const orders = await this.getOrders();
    const byId = orders.find((o) => o.id.toLowerCase() === trimmed.toLowerCase());
    if (byId) return byId;
    const wa = normalizeWhatsAppNumber(trimmed);
    if (!wa) return null;
    return orders.find((o) => normalizeWhatsAppNumber(o.customerWa) === wa) ?? null;
  },

  async updateOrder(id, patch: UpdateOrderInput) {
    const sb = getServerSupabase();
    if (!sb) return localAdapter.updateOrder(id, patch);
    try {
      const existing = await this.getOrder(id);
      if (!existing) return null;
      const updated: Order = {
        ...existing,
        ...patch,
        status: patch.status ?? existing.status,
        resi: patch.resi ?? existing.resi,
        courier: patch.courier ?? existing.courier
      };
      const { error } = await sb
        .from("orders")
        .update({ payload: updated })
        .eq("id", id);
      if (error) throw error;
      await localAdapter.updateOrder(id, patch).catch(() => undefined);
      return updated;
    } catch {
      return localAdapter.updateOrder(id, patch);
    }
  }
};
