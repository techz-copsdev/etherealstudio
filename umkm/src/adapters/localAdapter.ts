import { promises as fs } from "fs";
import path from "path";
import type { DataAdapter, UpdateOrderInput } from "./types";
import type { Order } from "@/modules/order/invoice";
import type { Product } from "@/modules/product/types";
import { normalizeWhatsAppNumber } from "@/modules/whatsapp/format";
import productsSeed from "@/data/products.json";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.runtime.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

let memProducts: Product[] | null = null;
let memOrders: Order[] | null = null;

async function ensureDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  try {
    await ensureDir();
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Read-only filesystems (e.g. Vercel) — keep in-memory copy only.
  }
}

async function loadProducts(): Promise<Product[]> {
  if (memProducts) return memProducts;
  const fromDisk = await readJson<Product[] | null>(PRODUCTS_FILE, null);
  memProducts = fromDisk ?? (productsSeed as Product[]);
  return memProducts;
}

async function persistProducts(): Promise<void> {
  if (!memProducts) return;
  await writeJson(PRODUCTS_FILE, memProducts);
}

async function loadOrders(): Promise<Order[]> {
  if (memOrders) return memOrders;
  memOrders = await readJson<Order[]>(ORDERS_FILE, []);
  return memOrders;
}

async function persistOrders(): Promise<void> {
  if (!memOrders) return;
  await writeJson(ORDERS_FILE, memOrders);
}

export const localAdapter: DataAdapter = {
  async getProducts() {
    const all = await loadProducts();
    return all.filter((p) => p.active);
  },
  async getProduct(id) {
    const all = await loadProducts();
    return all.find((p) => p.id === id || p.slug === id) ?? null;
  },
  async upsertProduct(product) {
    const all = await loadProducts();
    const idx = all.findIndex((p) => p.id === product.id);
    if (idx >= 0) all[idx] = product;
    else all.push(product);
    memProducts = all;
    await persistProducts();
    return product;
  },
  async deleteProduct(id) {
    const all = await loadProducts();
    memProducts = all.filter((p) => p.id !== id);
    await persistProducts();
  },

  async createOrder(order) {
    const all = await loadOrders();
    all.unshift(order);
    memOrders = all;
    await persistOrders();
    return order;
  },
  async getOrders() {
    return loadOrders();
  },
  async getOrder(id) {
    const all = await loadOrders();
    return all.find((o) => o.id === id) ?? null;
  },
  async findOrder(query) {
    if (!query) return null;
    const trimmed = query.trim();
    if (!trimmed) return null;
    const all = await loadOrders();
    const byId = all.find((o) => o.id.toLowerCase() === trimmed.toLowerCase());
    if (byId) return byId;
    const wa = normalizeWhatsAppNumber(trimmed);
    if (!wa) return null;
    return all.find((o) => normalizeWhatsAppNumber(o.customerWa) === wa) ?? null;
  },
  async updateOrder(id, patch: UpdateOrderInput) {
    const all = await loadOrders();
    const idx = all.findIndex((o) => o.id === id);
    if (idx < 0) return null;
    const next = { ...all[idx], ...patch };
    all[idx] = next;
    memOrders = all;
    await persistOrders();
    return next;
  }
};
