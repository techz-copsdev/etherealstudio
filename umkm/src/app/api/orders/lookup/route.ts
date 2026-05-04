import { NextResponse } from "next/server";
import { getDataAdapter } from "@/services/data";
import { trackByCourier } from "@/modules/tracking";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  if (!q.trim()) {
    return NextResponse.json(
      { ok: false, message: "Query kosong" },
      { status: 400 }
    );
  }
  try {
    const adapter = getDataAdapter();
    const order = await adapter.findOrder(q.trim());
    if (!order) {
      return NextResponse.json({
        ok: false,
        message: "Pesanan tidak ditemukan."
      });
    }
    let tracking = null;
    if (order.resi && order.courier) {
      tracking = await trackByCourier(order.courier, order.resi);
    }
    return NextResponse.json({ ok: true, order, tracking });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Gagal melakukan pencarian." },
      { status: 500 }
    );
  }
}
