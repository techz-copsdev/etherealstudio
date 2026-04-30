# Asset Katalog Produk

Folder ini berisi placeholder SVG untuk setiap produk di katalog. Ganti file di sini dengan foto produk asli kamu.

## Struktur

Setiap produk punya **slug**, lihat `assets/js/common.js` → `OBR.catalog[].id` (mis. `linea-01`, `studio-02`, dst).

Untuk satu produk, kamu bisa upload sampai 4 angle berbeda untuk fitur 3D-view:

```
assets/catalog/
├── linea-01-front.jpg     # tampak depan (wajib)
├── linea-01-side.jpg      # tampak samping (opsional, untuk 3D-view)
├── linea-01-quarter.jpg   # tampak ¾ (opsional)
├── linea-01-detail.jpg    # close-up detail (opsional)
├── studio-02-front.jpg
├── studio-02-side.jpg
└── ...
```

Kalau hanya satu file (misal `linea-01-front.jpg`), 3D-view akan render layered SVG simulation dari front photo.

## Spesifikasi disarankan

- **Format:** JPG (compress 80%) atau PNG transparent (untuk bg fleksibel)
- **Ukuran grid:** 800×800 px (square crop)
- **Ukuran modal:** 1600×1200 px (16:9 atau lebih lebar)
- **Background:** putih bersih atau abu-abu lembut, atau transparent PNG
- **Lighting:** soft, frontal, hindari hard shadow

## Override mechanism

JS akan auto-detect file lokal dengan urutan:

1. `assets/catalog/{slug}-front.{jpg|png}` ← prioritas tertinggi
2. `assets/catalog/{slug}.{jpg|png}` ← single-image fallback
3. CDN URL dari `OBR.catalog[].image` ← fallback terakhir kalau file lokal tidak ada

## Naming convention

Jangan ubah `slug` di common.js. Cukup pakai nama file yang sama:

| Slug | File yang diharapkan |
|---|---|
| `linea-01` | `linea-01-front.jpg` |
| `studio-02` | `studio-02-front.jpg` |
| `aero-03` | `aero-03-front.jpg` |
| `cinta-04` | `cinta-04-front.jpg` |
| `klub-05` | `klub-05-front.jpg` |
| `wave-06` | `wave-06-front.jpg` |
| `mini-07` | `mini-07-front.jpg` |
| `panel-08` | `panel-08-front.jpg` |
| `halo-09` | `halo-09-front.jpg` |
| `linear-10` | `linear-10-front.jpg` |
| `tora-11` | `tora-11-front.jpg` |
| `riku-12` | `riku-12-front.jpg` |
| `nova-13` | `nova-13-front.jpg` |
| `azure-14` | `azure-14-front.jpg` |
| `hexa-15` | `hexa-15-front.jpg` |
| `oslo-16` | `oslo-16-front.jpg` |
| `polar-17` | `polar-17-front.jpg` |
| `bento-18` | `bento-18-front.jpg` |

## Saat ini

Folder ini berisi 18 file SVG placeholder (`.svg`) buatan kami sebagai default. Ganti dengan foto asli kapan saja — JS akan otomatis pakai yang ada di lokal kalau ditemukan.
