/**
 * Browser-side image compression utility.
 *
 * Goals:
 *   • Shrink to ≤ ~250 KB while keeping visual quality (q≈80, max 1600px).
 *   • Convert to WebP when supported, fall back to JPEG.
 *   • Never throw — always returns a usable Blob.
 */

import imageCompression from "browser-image-compression";

export interface CompressOptions {
  maxSizeKB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  preferWebP?: boolean;
}

export interface CompressResult {
  blob: Blob;
  filename: string;
  contentType: string;
  originalSize: number;
  compressedSize: number;
  /** Compression ratio 0..1 (lower = more compression). */
  ratio: number;
}

const DEFAULTS: Required<CompressOptions> = {
  maxSizeKB: 250,
  maxWidthOrHeight: 1600,
  quality: 0.82,
  preferWebP: true
};

function pickExt(file: File): string {
  const name = file.name || "image";
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "jpg";
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const opts = { ...DEFAULTS, ...options };
  const useWebP = opts.preferWebP && typeof document !== "undefined";

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: opts.maxSizeKB / 1024,
      maxWidthOrHeight: opts.maxWidthOrHeight,
      useWebWorker: true,
      initialQuality: opts.quality,
      fileType: useWebP ? "image/webp" : "image/jpeg"
    });
    const ext = useWebP ? "webp" : "jpg";
    const baseName = (file.name || "image").replace(/\.[^.]+$/, "");
    return {
      blob: compressed,
      filename: `${baseName}.${ext}`,
      contentType: compressed.type || (useWebP ? "image/webp" : "image/jpeg"),
      originalSize: file.size,
      compressedSize: compressed.size,
      ratio: file.size > 0 ? compressed.size / file.size : 1
    };
  } catch {
    // Fall back to original — never break the caller.
    return {
      blob: file,
      filename: file.name || `image.${pickExt(file)}`,
      contentType: file.type || "application/octet-stream",
      originalSize: file.size,
      compressedSize: file.size,
      ratio: 1
    };
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
