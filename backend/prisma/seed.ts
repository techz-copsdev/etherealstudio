import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = [
  {
    slug: "klinik-arsa",
    name: "Arsa — Klinik & Healthcare",
    tagline: "Landing page klinik dengan booking janji temu langsung ke WhatsApp.",
    description:
      "Template profesional untuk klinik kesehatan, dokter spesialis, dan praktik mandiri. Fokus pada trust building, jadwal layanan, profil dokter, dan CTA booking via WhatsApp.",
    niche: "KLINIK",
    thumbnail: "/templates/arsa.svg",
    previewUrl: "/preview/klinik-arsa" as string | null,
    features: [
      "Booking janji temu via WhatsApp",
      "Profil dokter & spesialisasi",
      "Daftar layanan & tarif transparan",
      "Testimoni pasien",
      "Lokasi & peta cabang",
    ],
    isFeatured: true,
  },
  {
    slug: "kontraktor-batas",
    name: "Batas — Kontraktor & Konstruksi",
    tagline: "Showcase project kontraktor dengan kalkulator estimasi cepat.",
    description:
      "Untuk kontraktor, jasa renovasi, dan general builder. Menonjolkan portofolio project, sertifikasi, dan formulir RAB cepat yang diteruskan ke WhatsApp owner.",
    niche: "KONTRAKTOR",
    thumbnail: "/templates/batas.svg",
    previewUrl: "/preview/kontraktor-batas",
    features: [
      "Galeri project before/after",
      "Estimator biaya cepat",
      "Sertifikasi & legalitas",
      "Studi kasus klien korporat",
      "Form konsultasi terstruktur",
    ],
    isFeatured: true,
  },
  {
    slug: "properti-citra",
    name: "Citra — Properti & Real Estate",
    tagline: "Landing page properti dengan listing unit & simulasi KPR.",
    description:
      "Untuk developer, agen properti, dan project marketing. Listing unit dengan filter, simulasi KPR ringan, dan CTA jadwal site visit ke WhatsApp marketing.",
    niche: "PROPERTI",
    thumbnail: "/templates/citra.svg",
    previewUrl: "/preview/properti-citra",
    features: [
      "Listing unit dengan filter",
      "Simulasi KPR sederhana",
      "Galeri foto interior/eksterior",
      "Jadwal site visit",
      "Brosur PDF download",
    ],
  },
  {
    slug: "catering-dapur",
    name: "Dapur — Catering & Kuliner",
    tagline: "Menu paket catering dengan order langsung via WhatsApp.",
    description:
      "Untuk catering harian, prasmanan, hingga catering corporate event. Menampilkan paket menu, gallery hidangan, dan formulir pemesanan terstruktur.",
    niche: "CATERING",
    thumbnail: "/templates/dapur.svg",
    previewUrl: "/preview/catering-dapur",
    features: [
      "Paket menu prasmanan / nasi box",
      "Galeri hidangan",
      "Form pemesanan event",
      "Testimoni klien event",
      "Area pengantaran",
    ],
  },
  {
    slug: "travel-elara",
    name: "Elara — Travel & Tour",
    tagline: "Paket wisata dengan booking via WhatsApp travel consultant.",
    description:
      "Untuk biro perjalanan wisata, open trip, dan honeymoon package. Menonjolkan itinerary, harga per pax, dan CTA chat travel consultant.",
    niche: "TRAVEL",
    thumbnail: "/templates/elara.svg",
    previewUrl: "/preview/travel-elara",
    features: [
      "Detail itinerary per hari",
      "Harga per pax transparan",
      "Galeri destinasi",
      "Tanggal keberangkatan",
      "Chat travel consultant",
    ],
  },
  {
    slug: "wedding-fajar",
    name: "Fajar — Wedding Organizer",
    tagline: "Showcase paket pernikahan, vendor, dan dokumentasi.",
    description:
      "Untuk wedding organizer, MUA, dan vendor pernikahan. Fokus pada gallery dokumentasi, paket all-in, dan booking konsultasi via WhatsApp.",
    niche: "WEDDING",
    thumbnail: "/templates/fajar.svg",
    previewUrl: "/preview/wedding-fajar",
    features: [
      "Galeri dokumentasi",
      "Paket all-in transparan",
      "Vendor partners",
      "Form konsultasi wedding",
      "Studi tema dekorasi",
    ],
  },
  {
    slug: "gym-grit",
    name: "Grit — Gym & Fitness",
    tagline: "Membership gym dengan trial class via WhatsApp coach.",
    description:
      "Untuk gym, studio fitness, personal trainer, dan martial arts. Tampilkan jadwal kelas, profil coach, paket membership, dan trial class registration.",
    niche: "GYM",
    thumbnail: "/templates/grit.svg",
    previewUrl: "/preview/gym-grit",
    features: [
      "Jadwal kelas mingguan",
      "Profil coach & sertifikasi",
      "Paket membership",
      "Trial class booking",
      "Transformasi member",
    ],
  },
  {
    slug: "skincare-halia",
    name: "Halia — Skincare & Beauty",
    tagline: "Konsultasi skincare & pre-order produk via WhatsApp.",
    description:
      "Untuk brand skincare, klinik kecantikan, dan beauty retailer. Highlight komposisi produk, before/after, dan booking konsultasi kulit.",
    niche: "SKINCARE",
    thumbnail: "/templates/halia.svg",
    previewUrl: "/preview/skincare-halia",
    features: [
      "Katalog produk dengan ingredient",
      "Konsultasi tipe kulit",
      "Before/after treatment",
      "Pre-order via WhatsApp",
      "Testimoni klien",
    ],
  },
  {
    slug: "umkm-inara",
    name: "Inara — UMKM Multi-Produk",
    tagline: "Etalase produk UMKM dengan order WhatsApp instan.",
    description:
      "Cocok untuk UMKM kuliner, fashion, kerajinan tangan, dan toko offline. Menampilkan katalog ringkas, lokasi, dan tombol order WhatsApp di setiap produk.",
    niche: "UMKM",
    thumbnail: "/templates/inara.svg",
    previewUrl: "/preview/umkm-inara",
    features: [
      "Katalog produk grid",
      "Order WhatsApp per produk",
      "Lokasi & jam operasional",
      "Promo & paket bundling",
      "Tombol Google Maps",
    ],
    isFeatured: true,
  },
  {
    slug: "corporate-jaya",
    name: "Jaya — Corporate Profile",
    tagline: "Company profile premium untuk B2B & corporate.",
    description:
      "Untuk perusahaan B2B, konsultan, dan corporate small business yang ingin tampil premium. Struktur company profile lengkap dengan layanan, klien, dan request proposal.",
    niche: "CORPORATE",
    thumbnail: "/templates/jaya.svg",
    previewUrl: "/preview/corporate-jaya",
    features: [
      "Halaman About komprehensif",
      "Daftar layanan & lini bisnis",
      "Logo klien & partner",
      "Studi kasus B2B",
      "Form request proposal",
    ],
    isFeatured: true,
  },
];

const portfolio = [
  {
    slug: "klinik-amana-conversion-uplift",
    client: "Klinik Amana",
    industry: "Healthcare",
    summary:
      "Membangun ulang landing page klinik dengan booking WhatsApp terstruktur. Hasilnya, konsultasi masuk meningkat hampir 3x dalam 60 hari.",
    challenge:
      "Klinik mendapatkan banyak traffic dari iklan namun tingkat konversi ke booking sangat rendah. Form lama panjang dan tidak terhubung WhatsApp.",
    solution:
      "Redesign landing page dengan struktur trust-first, CTA WhatsApp pada setiap section, dan form booking ringkas dengan auto-routing ke admin via WhatsApp.",
    outcome: "+187% booking masuk dalam 60 hari",
    thumbnail: "/portfolio/case-amana.svg",
    niche: "KLINIK",
  },
  {
    slug: "kontraktor-bumi-rab-instan",
    client: "Bumi Konstruksi",
    industry: "Konstruksi",
    summary:
      "Sales funnel kontraktor dengan kalkulator RAB ringkas. Lead masuk lebih kualifikasi karena prospek sudah submit estimasi awal.",
    challenge:
      "Tim sales menghabiskan waktu untuk lead yang tidak siap. Banyak chat masuk hanya tanya harga tanpa data project.",
    solution:
      "Membangun kalkulator estimasi singkat (luas, tipe bangunan, lokasi) yang langsung mengirim ringkasan ke WhatsApp tim sales saat user submit.",
    outcome: "+62% closing rate dari lead web",
    thumbnail: "/portfolio/case-bumi.svg",
    niche: "KONTRAKTOR",
  },
  {
    slug: "skincare-cendra-automation",
    client: "Cendra Skin",
    industry: "Skincare",
    summary:
      "Automation system untuk customer service skincare. Mengurangi beban CS hingga 50% dengan auto-reply terstruktur dan handover ke human.",
    challenge:
      "Volume chat CS sangat tinggi terutama saat campaign. Banyak pertanyaan repetitif yang menghabiskan waktu CS.",
    solution:
      "Implementasi WhatsApp automation dengan flow konsultasi awal otomatis, klasifikasi intent, dan handover ke CS untuk pertanyaan kompleks.",
    outcome: "−51% beban CS, +24% repeat order",
    thumbnail: "/portfolio/case-cendra.svg",
    niche: "SKINCARE",
  },
];

async function main() {
  // eslint-disable-next-line no-console
  console.log("Seeding templates...");
  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      create: { ...t, features: JSON.stringify(t.features) },
      update: { ...t, features: JSON.stringify(t.features) },
    });
  }

  // eslint-disable-next-line no-console
  console.log("Seeding portfolio cases...");
  for (const p of portfolio) {
    await prisma.portfolioCase.upsert({
      where: { slug: p.slug },
      create: p,
      update: p,
    });
  }

  // eslint-disable-next-line no-console
  console.log("Seed completed.");
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    void prisma.$disconnect();
  });
