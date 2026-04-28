/**
 * Frontend API client. Targets the separate backend service (see backend/).
 *
 * All fetch calls go through this module so that swapping the backend or
 * redesigning the UI does not require touching component code.
 */

import { site } from "./site";

export type Niche =
  | "UMKM"
  | "KLINIK"
  | "KONTRAKTOR"
  | "PROPERTI"
  | "CATERING"
  | "TRAVEL"
  | "WEDDING"
  | "GYM"
  | "SKINCARE"
  | "CORPORATE"
  | "OTHER";

export type Template = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  niche: Niche;
  thumbnail: string;
  previewUrl: string | null;
  features: string[];
  isFeatured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioCase = {
  id: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  thumbnail: string;
  niche: Niche;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: "TEMPLATE" | "CUSTOM_WEBSITE" | "AUTOMATION" | "GENERAL";
  templateId?: string;
  budget?: string;
  message: string;
  source?: string;
};

async function request<T>(path: string, init?: RequestInit & { revalidate?: number }): Promise<T> {
  const url = `${site.apiUrl}${path}`;
  const { revalidate, ...rest } = init ?? {};
  const res = await fetch(url, {
    ...rest,
    headers: { "Content-Type": "application/json", ...(rest.headers ?? {}) },
    next: typeof revalidate === "number" ? { revalidate } : undefined,
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`API ${path} failed (${res.status}): ${errBody}`);
  }
  return (await res.json()) as T;
}

export async function fetchTemplates(opts?: { niche?: string; featured?: boolean }): Promise<Template[]> {
  const params = new URLSearchParams();
  if (opts?.niche) params.set("niche", opts.niche);
  if (opts?.featured !== undefined) params.set("featured", String(opts.featured));
  const qs = params.toString() ? `?${params.toString()}` : "";

  const json = await request<{ data: Template[] }>(`/api/templates${qs}`, { revalidate: 60 });
  return json.data;
}

export async function fetchTemplate(slug: string): Promise<Template | null> {
  try {
    const json = await request<{ data: Template }>(`/api/templates/${slug}`, { revalidate: 60 });
    return json.data;
  } catch {
    return null;
  }
}

export async function fetchPortfolio(): Promise<PortfolioCase[]> {
  const json = await request<{ data: PortfolioCase[] }>("/api/portfolio", { revalidate: 60 });
  return json.data;
}

export async function submitInquiry(input: InquiryInput): Promise<{ id: string }> {
  const json = await request<{ data: { id: string } }>("/api/inquiries", {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
  });
  return json.data;
}
