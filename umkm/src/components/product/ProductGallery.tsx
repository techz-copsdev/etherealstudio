"use client";

import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const safeImages = images.length ? images : ["/images/placeholder.svg"];
  const current = safeImages[active] ?? safeImages[0];

  return (
    <div>
      <div className="pd-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current} alt={alt} />
      </div>
      {safeImages.length > 1 && (
        <div className="pd-thumbs" role="tablist" aria-label="Gambar produk">
          {safeImages.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`pd-thumb ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
