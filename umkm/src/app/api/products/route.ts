import { NextResponse } from "next/server";
import { getDataAdapter } from "@/services/data";
import type { Product } from "@/modules/product/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const adapter = getDataAdapter();
    const products = await adapter.getProducts();
    return NextResponse.json({ ok: true, products });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to load products", products: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Product;
    if (!body || !body.id || !body.name) {
      return NextResponse.json(
        { ok: false, message: "Invalid product payload" },
        { status: 400 }
      );
    }
    const adapter = getDataAdapter();
    const saved = await adapter.upsertProduct(body);
    return NextResponse.json({ ok: true, product: saved });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to save product" },
      { status: 500 }
    );
  }
}
