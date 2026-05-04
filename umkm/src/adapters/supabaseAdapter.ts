import type { DataAdapter, UpdateOrderInput } from "./types";
import type { Order } from "@/modules/order/invoice";
import type { Product } from "@/modules/product/types";
import { localAdapter } from "./localAdapter";
import { normalizeWhatsAppNumber } from "@/modules/whatsapp/format";

/**
 * Supabase-backed data adapter.
 *
 * The actual `@supabase/supabase-js` client is loaded lazily so the package
 * stays optional. Any failure (missing env, network, schema) silently falls
 * back to {@link localAdapter} so the UI never breaks.
 *
 * Required env (server-only):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_KEY
 *
 * Schema (suggested):
 *   table products (id text primary key, slug text, name text, ...)
 *   table orders   (id text primary key, created_at timestamptz, payload jsonb)
 */

interface MinimalSupabaseClient {
  from(table: string): {
    select(cols?: string): Promise<{ data: unknown; error: unknown }>;
    insert(row: unknown): Promise<{ data: unknown; error: unknown }>;
    update(row: unknown): {
      eq(col: string, val: unknown): Promise<{ data: unknown; error: unknown }>;
    };
    delete(): {
      eq(col: string, val: unknown): Promise<{ data: unknown; error: unknown }>;
    };
  };
}

let cachedClient: MinimalSupabaseClient | null | undefined;

async function getClient(): Promise<MinimalSupabaseClient | null> {
  if (cachedClient !== undefined) return cachedClient;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    cachedClient = null;
    return cachedClient;
  }
  try {
    // Dynamic import keeps @supabase/supabase-js optional. The package may
    // not be installed in lean deployments — typecheck shouldn't require it.
    const moduleName = "@supabase/supabase-js";
    const dyn: (s: string) => Promise<unknown> = new Function(
      "s",
      "return import(s)"
    ) as (s: string) => Promise<unknown>;
    const mod: unknown = await dyn(moduleName).catch(() => null);
    if (!mod || typeof mod !== "object") {
      cachedClient = null;
      return cachedClient;
    }
    const factory = (mod as { createClient?: (u: string, k: string) => MinimalSupabaseClient })
      .createClient;
    if (!factory) {
      cachedClient = null;
      return cachedClient;
    }
    cachedClient = factory(url, key);
    return cachedClient;
  } catch {
    cachedClient = null;
    return cachedClient;
  }
}

export const supabaseAdapter: DataAdapter = {
  async getProducts(): Promise<Product[]> {
    const client = await getClient();
    if (!client) return localAdapter.getProducts();
    try {
      const { data, error } = await client.from("products").select("*");
      if (error || !Array.isArray(data)) throw error;
      return (data as Product[]).filter((p) => p.active);
    } catch {
      return localAdapter.getProducts();
    }
  },
  async getProduct(id) {
    const client = await getClient();
    if (!client) return localAdapter.getProduct(id);
    try {
      const { data, error } = await client.from("products").select("*");
      if (error || !Array.isArray(data)) throw error;
      const all = data as Product[];
      return all.find((p) => p.id === id || p.slug === id) ?? null;
    } catch {
      return localAdapter.getProduct(id);
    }
  },
  async upsertProduct(product) {
    const client = await getClient();
    if (!client) return localAdapter.upsertProduct(product);
    try {
      await client.from("products").insert(product);
      return product;
    } catch {
      return localAdapter.upsertProduct(product);
    }
  },
  async deleteProduct(id) {
    const client = await getClient();
    if (!client) return localAdapter.deleteProduct(id);
    try {
      await client.from("products").delete().eq("id", id);
    } catch {
      return localAdapter.deleteProduct(id);
    }
  },

  async createOrder(order: Order) {
    const client = await getClient();
    if (!client) return localAdapter.createOrder(order);
    try {
      await client.from("orders").insert(order);
      return order;
    } catch {
      return localAdapter.createOrder(order);
    }
  },
  async getOrders() {
    const client = await getClient();
    if (!client) return localAdapter.getOrders();
    try {
      const { data, error } = await client.from("orders").select("*");
      if (error || !Array.isArray(data)) throw error;
      return data as Order[];
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
    const client = await getClient();
    if (!client) return localAdapter.updateOrder(id, patch);
    try {
      await client.from("orders").update(patch).eq("id", id);
      return localAdapter.updateOrder(id, patch);
    } catch {
      return localAdapter.updateOrder(id, patch);
    }
  }
};
