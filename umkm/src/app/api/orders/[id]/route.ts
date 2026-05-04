import { NextResponse } from "next/server";
import { getDataAdapter } from "@/services/data";
import type { UpdateOrderInput } from "@/adapters/types";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patch = (await req.json()) as UpdateOrderInput;
    const adapter = getDataAdapter();
    const updated = await adapter.updateOrder(params.id, patch);
    if (!updated) {
      return NextResponse.json(
        { ok: false, message: "Order tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, order: updated });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Gagal memperbarui pesanan" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adapter = getDataAdapter();
    const order = await adapter.getOrder(params.id);
    if (!order) {
      return NextResponse.json(
        { ok: false, message: "Order tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, order });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Gagal memuat pesanan" },
      { status: 500 }
    );
  }
}
