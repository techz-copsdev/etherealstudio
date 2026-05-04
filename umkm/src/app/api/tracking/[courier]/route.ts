import { NextResponse } from "next/server";
import { trackByCourier, type Courier } from "@/modules/tracking";

export const dynamic = "force-dynamic";

const VALID: Courier[] = ["jne", "jnt", "anteraja"];

export async function GET(
  req: Request,
  { params }: { params: { courier: string } }
) {
  const { searchParams } = new URL(req.url);
  const resi = searchParams.get("resi") ?? "";
  const courier = params.courier as Courier;
  if (!VALID.includes(courier)) {
    return NextResponse.json(
      {
        ok: false,
        events: [],
        fallback: true,
        message: "Kurir tidak dikenal"
      },
      { status: 400 }
    );
  }
  const result = await trackByCourier(courier, resi);
  return NextResponse.json(result);
}
