"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { submitInquiry, type InquiryInput } from "@/lib/api";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const TOPICS: Array<{ value: NonNullable<InquiryInput["topic"]>; label: string }> = [
  { value: "GENERAL", label: "Konsultasi umum" },
  { value: "TEMPLATE", label: "Pakai template" },
  { value: "CUSTOM_WEBSITE", label: "Custom website" },
  { value: "AUTOMATION", label: "IT automation" },
];

const BUDGETS = ["< 5 jt", "5–15 jt", "15–30 jt", "> 30 jt", "Belum tahu"];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [waLink, setWaLink] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload: InquiryInput = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || undefined,
      company: String(formData.get("company") ?? "").trim() || undefined,
      topic: (formData.get("topic") as InquiryInput["topic"]) ?? "GENERAL",
      budget: String(formData.get("budget") ?? "").trim() || undefined,
      message: String(formData.get("message") ?? "").trim(),
      source: "contact_page",
    };

    try {
      await submitInquiry(payload);
      const summary = [
        `Halo ${site.brand}, saya baru saja submit form di website.`,
        `Nama: ${payload.name}`,
        payload.company ? `Perusahaan: ${payload.company}` : null,
        `Topik: ${TOPICS.find((t) => t.value === payload.topic)?.label ?? payload.topic}`,
        payload.budget ? `Budget: ${payload.budget}` : null,
        ``,
        payload.message,
      ]
        .filter(Boolean)
        .join("\n");
      setWaLink(whatsappLink(summary));
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan, silakan coba lagi.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50/60 p-7">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-600 text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <h3 className="display mt-5 text-2xl text-ink">Terima kasih, pesan Anda terkirim.</h3>
        <p className="mt-3 text-[14.5px] text-ink-700">
          Tim kami akan menghubungi dalam 1–2 jam kerja. Anda juga bisa langsung lanjut chat di
          WhatsApp untuk respons lebih cepat.
        </p>
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-paper hover:bg-ink-800"
          >
            <MessageCircle className="h-4 w-4" />
            Lanjut chat di WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Nama lengkap" name="name" required placeholder="Nama Anda" />
        <Field label="Email" name="email" type="email" required placeholder="anda@perusahaan.com" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Nomor WhatsApp" name="phone" placeholder="08xxxxxxxxxx" />
        <Field label="Nama bisnis / perusahaan" name="company" placeholder="Opsional" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <SelectField label="Topik konsultasi" name="topic" defaultValue="GENERAL">
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </SelectField>
        <SelectField label="Estimasi budget" name="budget" defaultValue="">
          <option value="">— Pilih estimasi —</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </SelectField>
      </div>

      <TextareaField
        label="Ceritakan kebutuhan Anda"
        name="message"
        required
        placeholder="Jenis bisnis, target audience, dan masalah utama yang ingin diselesaikan."
        minLength={10}
      />

      {status === "error" && error ? (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-300 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
            status === "loading" && "opacity-70",
          )}
        >
          {status === "loading" ? "Mengirim..." : "Kirim & lanjut diskusi"}
        </button>
        <p className="text-[12.5px] text-ink-500 sm:ml-2">
          Setelah submit, Anda dapat lanjut chat di WhatsApp dengan ringkasan otomatis.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-500">
        {label}
        {required ? <span className="ml-1 text-accent-600">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 text-[15px] text-ink placeholder:text-ink-300 focus:border-ink focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-500">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full rounded-lg border border-ink-200 bg-white px-3 text-[15px] text-ink focus:border-ink focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  required,
  minLength,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-500">
        {label}
        {required ? <span className="ml-1 text-accent-600">*</span> : null}
      </span>
      <textarea
        name={name}
        rows={5}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-300 focus:border-ink focus:outline-none"
      />
    </label>
  );
}
