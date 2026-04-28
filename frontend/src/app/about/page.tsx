import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABand } from "@/components/CTABand";
import { Award, ShieldCheck, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Premium digital service provider untuk bisnis yang serius bertumbuh.",
};

const values = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Outcome-driven",
    description:
      "Kami diukur dari hasil bisnis klien — bukan jumlah pixel atau jumlah feature.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Trust over hype",
    description:
      "Kami tidak menjanjikan hasil ajaib. Yang kami sampaikan, kami pertanggungjawabkan.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Premium craft",
    description:
      "Standar pengerjaan setara high-end agency. Bukan template generik atau output massal.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Long-term partnership",
    description:
      "Kami berinvestasi pada hubungan jangka panjang. Banyak klien kami sudah berjalan 3+ tahun.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide">
          <p className="eyebrow">About</p>
          <h1 className="display mt-6 max-w-4xl text-4xl leading-[1.05] text-ink md:text-6xl">
            Studio kecil. Standar tinggi. Untuk bisnis yang serius.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">
            Kami bukan agency murahan, bukan freelance kerjaan tambahan, dan bukan template generator.
            Kami digital service provider yang berkomitmen pada kualitas eksekusi.
          </p>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Positioning"
              title="Kami memilih sedikit klien, dilayani penuh."
              description="Pendekatan boutique — tiap project mendapat perhatian penuh dari tim, bukan dilempar ke junior tanpa supervisi."
            />
          </div>
          <div className="lg:col-span-7 space-y-5 text-[15.5px] leading-relaxed text-ink-700">
            <p>
              Kami percaya bahwa website dan automation system adalah investasi, bukan biaya. Karena
              itu, setiap project kami mulai dari pertanyaan sederhana: <em>apa hasil bisnis yang
              ingin Anda capai?</em> Dari sana baru kami pikirkan struktur, copy, desain, dan stack.
            </p>
            <p>
              Kami secara sengaja memilih untuk tidak melayani volume tinggi. Lebih baik mengerjakan
              10 project dengan output luar biasa, daripada 100 project yang hasilnya seragam.
            </p>
            <p>
              Klien kami berasal dari beragam industri — UMKM kuliner hingga klinik multi-cabang,
              kontraktor B2B hingga corporate small business. Yang menyatukan mereka: keseriusan
              memandang website & automation sebagai bagian dari operasional bisnis, bukan hiasan.
            </p>
          </div>
        </div>
      </Section>

      <Section pad="lg" bordered>
        <div className="container-wide">
          <SectionHeader eyebrow="Nilai" title="Empat hal yang kami pegang dalam setiap project." />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5 rounded-2xl border border-ink-100 bg-white p-7">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-100 bg-paper text-ink">
                  {v.icon}
                </div>
                <div>
                  <h4 className="display text-lg text-ink">{v.title}</h4>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section pad="lg">
        <CTABand title="Mari bicara serius tentang bisnis Anda." />
      </Section>
    </>
  );
}
