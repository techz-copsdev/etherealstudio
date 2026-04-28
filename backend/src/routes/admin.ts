import { Router } from "express";
import { z } from "zod";
import { requireAdmin } from "../middleware/auth";
import { prisma } from "../lib/prisma";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

// ---- Inquiries ----

adminRouter.get("/inquiries", async (req, res, next) => {
  try {
    const status = typeof req.query.status === "string" ? req.query.status.toUpperCase() : undefined;
    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: inquiries });
  } catch (err) {
    next(err);
  }
});

const updateInquirySchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]).optional(),
});

adminRouter.patch("/inquiries/:id", async (req, res, next) => {
  try {
    const body = updateInquirySchema.parse(req.body);
    const updated = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: body,
    });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
});

// ---- Templates ----

const templateInput = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(160),
  tagline: z.string().min(1).max(240),
  description: z.string().min(1).max(4000),
  niche: z.enum([
    "UMKM",
    "KLINIK",
    "KONTRAKTOR",
    "PROPERTI",
    "CATERING",
    "TRAVEL",
    "WEDDING",
    "GYM",
    "SKINCARE",
    "CORPORATE",
    "OTHER",
  ]),
  thumbnail: z.string().min(1),
  previewUrl: z.string().url().optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  isFeatured: z.boolean().optional(),
  published: z.boolean().optional(),
});

adminRouter.post("/templates", async (req, res, next) => {
  try {
    const body = templateInput.parse(req.body);
    const created = await prisma.template.create({
      data: {
        ...body,
        previewUrl: body.previewUrl || null,
        features: JSON.stringify(body.features),
      },
    });
    res.status(201).json({ data: created });
  } catch (err) {
    next(err);
  }
});

adminRouter.patch("/templates/:id", async (req, res, next) => {
  try {
    const body = templateInput.partial().parse(req.body);
    const updated = await prisma.template.update({
      where: { id: req.params.id },
      data: {
        ...body,
        previewUrl: body.previewUrl === "" ? null : body.previewUrl,
        features: body.features ? JSON.stringify(body.features) : undefined,
      },
    });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/templates/:id", async (req, res, next) => {
  try {
    await prisma.template.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
