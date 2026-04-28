import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section pad="lg">
      <div className="container-tight text-center">
        <p className="eyebrow !mx-auto !inline-flex">404</p>
        <h1 className="display mt-6 text-4xl text-ink md:text-5xl">Halaman tidak ditemukan.</h1>
        <p className="mx-auto mt-5 max-w-md text-ink-500">
          Mungkin halaman dipindahkan atau tautan sudah tidak berlaku. Silakan kembali ke beranda
          atau hubungi kami.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" variant="primary" size="md">Beranda</Button>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-full border border-ink-200 px-5 text-[15px] text-ink hover:border-ink"
          >
            Hubungi kami
          </Link>
        </div>
      </div>
    </Section>
  );
}
