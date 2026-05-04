import { NextResponse } from "next/server";
import { getDataAdapter } from "@/services/data";
import type { Order } from "@/modules/order/invoice";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Order;
    if (!body || !body.id || !Array.isArray(body.items)) {
      return NextResponse.json(
        { ok: false, message: "Invalid order payload" },
        { status: 400 }
      );
    }
    const adapter = getDataAdapter();
    const created = await adapter.createOrder(body);
    return NextResponse.json({ ok: true, order: created });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const adapter = getDataAdapter();
    const orders = await adapter.getOrders();
    return NextResponse.json({ ok: true, orders });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to load orders", orders: [] },
      { status: 500 }
    );
  }
}
