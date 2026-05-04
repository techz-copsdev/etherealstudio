import { NextResponse } from "next/server";
import { getServerSupabase } from "@/services/supabaseClient";
import { config } from "@/config/app.config";

/**
 * POST /api/upload
 *
 * multipart/form-data field: `file`
 *
 * Strategy:
 *   1. If Supabase configured → upload to storage bucket, return public URL.
 *   2. Otherwise → return data URL (works locally for demo without cloud).
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { ok: false, message: "Field 'file' wajib di-upload." },
        { status: 400 }
      );
    }

    const ab = await file.arrayBuffer();
    const buffer = new Uint8Array(ab);
    const filename =
      "name" in file && typeof file.name === "string" && file.name
        ? file.name
        : `image-${Date.now()}.webp`;
    const ext = filename.split(".").pop()?.toLowerCase() || "webp";
    const contentType = file.type || `image/${ext}`;
    const storagePath = `products/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    const sb = getServerSupabase();
    if (sb) {
      const bucket = config.supabase.bucket || "products";
      const { error } = await sb.storage
        .from(bucket)
        .upload(storagePath, buffer, {
          contentType,
          upsert: true,
          cacheControl: "31536000"
        });
      if (!error) {
        const { data } = sb.storage.from(bucket).getPublicUrl(storagePath);
        if (data?.publicUrl) {
          return NextResponse.json({ ok: true, url: data.publicUrl });
        }
      }
      // fall through to data URL on storage failure
    }

    // Fallback: base64 data URL (works without Supabase)
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;
    return NextResponse.json({ ok: true, url: dataUrl });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        message: e instanceof Error ? e.message : "Upload error"
      },
      { status: 500 }
    );
  }
}
