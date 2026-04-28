import type { MetadataRoute } from "next";
import { fetchTemplates } from "@/lib/api";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/templates",
    "/services/website",
    "/services/automation",
    "/pricing",
    "/portfolio",
    "/about",
    "/contact",
  ];

  let templates: Array<{ slug: string; updatedAt: string }> = [];
  try {
    templates = await fetchTemplates();
  } catch {
    /* ignore — backend may be unreachable at build time */
  }

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.7,
    })),
    ...templates.map((t) => ({
      url: `${base}/templates/${t.slug}`,
      lastModified: new Date(t.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
