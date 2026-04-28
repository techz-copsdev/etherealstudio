import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const inquiriesRouter = Router();

const inquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(32).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  topic: z.enum(["TEMPLATE", "CUSTOM_WEBSITE", "AUTOMATION", "GENERAL"]).default("GENERAL"),
  templateId: z.string().optional(),
  budget: z.string().max(64).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  source: z.string().max(120).optional(),
});

const inquiryLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again in a minute." },
});

inquiriesRouter.post("/", inquiryLimiter, async (req, res, next) => {
  try {
    const data = inquirySchema.parse(req.body);
    const created = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        topic: data.topic,
        templateId: data.templateId || null,
        budget: data.budget || null,
        message: data.message,
        source: data.source || null,
      },
    });
    res.status(201).json({ data: { id: created.id, createdAt: created.createdAt } });
  } catch (err) {
    next(err);
  }
});
