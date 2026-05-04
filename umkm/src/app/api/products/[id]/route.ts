import { NextResponse } from "next/server";
import { getDataAdapter } from "@/services/data";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adapter = getDataAdapter();
    await adapter.deleteProduct(params.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
