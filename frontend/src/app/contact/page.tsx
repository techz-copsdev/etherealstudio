import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { whatsappLink, PRESETS } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact — Diskusi Kebutuhan Anda",
  description: "Chat customer service, WhatsApp owner, atau kirim formulir konsultasi.",
};

export default function ContactPage() {
  return (
    <>
      <Section pad="md" className="border-b border-ink-100">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-6 text-4xl leading-[1.05] text-ink md:text-5xl">
              Diskusikan kebutuhan website & automation Anda.
            </h1>
            <p className="mt-6 max-w-prose text-[15.5px] leading-relaxed text-ink-500">
              Pilih jalur yang paling nyaman. Kami merespons di jam kerja (Senin–Jumat, 09.00–18.00 WIB)
              dan biasanya membalas dalam 1–2 jam.
            </p>

            <div className="mt-10 space-y-4">
              <ContactRow
                icon={<MessageCircle className="h-5 w-5" />}
                title="WhatsApp Customer Service"
                description="Respons cepat untuk pertanyaan umum, demo, dan konsultasi awal."
                cta="Buka WhatsApp"
                href={whatsappLink(PRESETS.general())}
                external
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                title={site.email}
                description="Untuk diskusi formal, NDA, RFP, atau dokumen lampiran."
                cta="Kirim email"
                href={`mailto:${site.email}`}
              />
              <ContactRow
                icon={<Clock className="h-5 w-5" />}
                title="Jam operasional"
                description="Senin–Jumat 09.00–18.00 WIB · Sabtu 09.00–13.00 WIB"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-ink-100 bg-white p-7 shadow-soft md:p-9">
              <h2 className="display text-2xl text-ink">Formulir konsultasi</h2>
              <p className="mt-2 text-[14.5px] text-ink-500">
                Isi sekilas tentang bisnis Anda — kami siapkan rekomendasi awal sebelum chat lanjutan.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  title,
  description,
  cta,
  href,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta?: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-100 bg-paper text-ink">
        {icon}
      </div>
      <div className="flex-1">
        <div className="display text-[17px] text-ink">{title}</div>
        <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{description}</p>
      </div>
      {href && cta ? (
        <div className="self-center">
          <Button href={href} external={external} variant="outline" size="sm">
            {cta}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
