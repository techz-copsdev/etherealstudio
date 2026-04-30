# Optik B Risky — Web Konsultasi & Live Chat

Prototype frontend (clickable, **belum ada backend**) untuk web order/konsultasi
online Optik B Risky di Krian, Sidoarjo.

## Yang sudah ada di prototype ini

- **`/`** — Landing page buyer
  - Hero + value proposition
  - Section layanan (4 layanan utama)
  - **Branch finder** dengan map Leaflet/OpenStreetMap (no API key)
    - Tombol "Gunakan Lokasi Saya" — auto-sort cabang berdasarkan jarak (Haversine)
    - Klik cabang → map fly to & popup
  - Pricing (3 paket) + footer kontak
  - **Chat widget** (FAB pojok kanan bawah)
    - Form gate wajib: nama + email + pilih cabang
    - Validasi email
    - Mock antrian (counter mundur)
    - Mock chat dengan staff (auto-reply demo)
- **`/login`** — Halaman login admin (URL ini yang dipakai admin masuk; tidak diekspos ke buyer)
- **`/admin`** — Console admin
  - Sidebar: Inbox, Riwayat, Cabang, Quick Replies, Profil, Pengaturan
  - **Toggle Online / Offline** di header
  - **Antrian** (5 chat mock) + search
  - **Conversation panel** dengan quick-reply chips
  - **Side panel**: detail pelanggan, catatan internal, kelola cabang, statistik
- Dark / light mode toggle (preference disimpan di `localStorage`)
- Mobile-friendly (responsive sampai ~360px)

## Stack

Murni statik — **HTML + CSS + vanilla JS**. Tidak pakai framework, tidak pakai
Tailwind, tidak pakai utility CDN. Setiap warna / spacing / icon dibuat manual
agar bisa di-tweak tanpa cari `class="px-4 py-2 ..."` di sana-sini.

| File                          | Isi                                  |
| ----------------------------- | ------------------------------------ |
| `index.html`                  | Landing buyer + chat widget          |
| `login/index.html`            | Login admin (route `/login`)         |
| `admin/index.html`            | Console admin (route `/admin`)       |
| `assets/css/style.css`        | Design system: tokens, layout, komponen |
| `assets/js/common.js`         | Theme toggle, helpers, data cabang   |
| `assets/js/icons.js`          | Loader sprite SVG (data-icon)        |
| `assets/icons/sprite.svg`     | Set ikon custom (28 ikon)            |

Eksternal yang dipakai (semua bebas API key):

- Google Fonts: **Fraunces** (display serif) + **Manrope** (body) + **JetBrains Mono**
- **Leaflet 1.9** + tile **OpenStreetMap** untuk map cabang

## Cara menjalankan lokal

```bash
cd projects/optik-b-risky
python3 -m http.server 8000
# atau npx serve .
```

Buka:

- http://localhost:8000/         — buyer
- http://localhost:8000/login/   — login admin
- http://localhost:8000/admin/   — admin console

## Kredensial demo

Form login menerima email + password apa pun (non-kosong). Setelah login
disimpan ke `sessionStorage` (`obr-admin`).

## Yang belum (akan dibangun saat backend full system di-ACC)

- Backend real-time (WebSocket / Socket.io)
- Persistensi chat & user di database
- Sistem antrian server-side + assignment ke admin online
- Notifikasi push (suara / desktop)
- Upload lampiran (foto resep, foto frame)
- Multi-staff per cabang + handover chat
- CRM ringan: history pelanggan, follow-up
- Auth admin yang nyata (JWT / session, role per cabang)
- Domain `mydomain.com/login` real (hanya admin yang tahu)

## Catatan desain

Palet, tipografi, layout, dan ikon dibuat dari nol — bukan template Tailwind
generik. Tujuannya rasa "hand-crafted" yang konsisten:

- **Palette**: `--ink` (almost-black warm), `--bone` (parchment), `--rust`
  (terracotta accent), `--sage` (muted green), `--paper` (off-white)
- **Typography**: Fraunces 400/500 (italic untuk akses emosional) +
  Manrope 400/600 untuk body
- **Layout**: editorial, asymmetric, generous whitespace, full-bleed sections
  (tidak dibatasi container 1200px)
- **Icons**: 28 ikon SVG digambar manual di sprite, gunakan `<span data-icon="…">`
