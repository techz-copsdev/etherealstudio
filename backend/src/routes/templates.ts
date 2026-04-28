import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const templatesRouter = Router();

const listQuery = z.object({
  niche: z.string().optional(),
  featured: z.enum(["true", "false"]).optional(),
});

templatesRouter.get("/", async (req, res, next) => {
  try {
    const { niche, featured } = listQuery.parse(req.query);
    const templates = await prisma.template.findMany({
      where: {
        published: true,
        ...(niche ? { niche: niche.toUpperCase() } : {}),
        ...(featured ? { isFeatured: featured === "true" } : {}),
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    res.json({
      data: templates.map((t) => ({
        ...t,
        features: safeParseJson<string[]>(t.features) ?? [],
      })),
    });
  } catch (err) {
    next(err);
  }
});

templatesRouter.get("/:slug", async (req, res, next) => {
  try {
    const template = await prisma.template.findUnique({ where: { slug: req.params.slug } });
    if (!template || !template.published) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json({
      data: {
        ...template,
        features: safeParseJson<string[]>(template.features) ?? [],
      },
    });
  } catch (err) {
    next(err);
  }
});

function safeParseJson<T>(value: string | null | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
