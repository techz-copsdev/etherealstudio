import { Router } from "express";
import { prisma } from "../lib/prisma";

export const portfolioRouter = Router();

portfolioRouter.get("/", async (_req, res, next) => {
  try {
    const cases = await prisma.portfolioCase.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: cases });
  } catch (err) {
    next(err);
  }
});

portfolioRouter.get("/:slug", async (req, res, next) => {
  try {
    const item = await prisma.portfolioCase.findUnique({ where: { slug: req.params.slug } });
    if (!item || !item.published) {
      return res.status(404).json({ error: "Case study not found" });
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});
