"use client";

import { useRef, useState } from "react";
import { Upload, ImagePlus, Loader2 } from "lucide-react";
import { compressImage, formatBytes } from "@/modules/image/compress";

interface Props {
  /** Current image URL (preview). */
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

interface UploadResponse {
  ok: boolean;
  url?: string;
  message?: string;
}

export function ImageUploader({ value, onChange, label = "Gambar Produk" }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleFile(file: File) {
    setError("");
    setBusy(true);
    try {
      // 1. Compress in-browser
      const c = await compressImage(file);
      setInfo(
        `Kompresi: ${formatBytes(c.originalSize)} → ${formatBytes(c.compressedSize)} (${Math.round(c.ratio * 100)}%)`
      );

      // 2. Upload to /api/upload (server proxies to Supabase Storage with fallback to data URL)
      const fd = new FormData();
      fd.append("file", c.blob, c.filename);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as UploadResponse;
      if (!res.ok || !data.ok || !data.url) {
        throw new Error(data.message ?? "Upload gagal");
      }
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="stack-tight">
      <label>{label}</label>
      <div className="row" style={{ alignItems: "flex-start", gap: 16 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 12,
            border: "1px dashed var(--border)",
            background: "var(--bg)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ImagePlus size={32} style={{ color: "var(--text-muted)" }} />
          )}
        </div>

        <div className="stack-tight" style={{ flex: 1 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
          <div className="row" style={{ gap: 8 }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
            >
              {busy ? <Loader2 size={14} className="spin" /> : <Upload size={14} />}
              {busy ? "Mengompres..." : "Pilih Gambar"}
            </button>
          </div>

          <div>
            <label htmlFor="img-url" className="small muted">URL gambar</label>
            <input
              id="img-url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {info && <div className="small muted">{info}</div>}
          {error && (
            <div className="small" style={{ color: "#B91C1C" }}>
              {error}
            </div>
          )}
          <div className="small muted">
            Otomatis kompresi ke ≤250KB & WebP (kualitas tetap bagus). Disarankan ukuran 1:1.
          </div>
        </div>
      </div>
    </div>
  );
}
