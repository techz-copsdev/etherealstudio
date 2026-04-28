import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export const analyticsRouter = Router();

const eventSchema = z.object({
  type: z.string().min(1).max(80),
  path: z.string().max(240).optional(),
  meta: z.record(z.any()).optional(),
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

analyticsRouter.post("/events", limiter, async (req, res, next) => {
  try {
    const { type, path, meta } = eventSchema.parse(req.body);
    await prisma.analyticsEvent.create({
      data: {
        type,
        path: path ?? null,
        meta: meta ? JSON.stringify(meta) : null,
      },
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
