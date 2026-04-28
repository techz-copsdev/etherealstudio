import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not found", path: req.path });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation failed", issues: err.flatten().fieldErrors });
  }

  // eslint-disable-next-line no-console
  console.error("[error]", err);
  const status = typeof err?.status === "number" ? err.status : 500;
  res.status(status).json({ error: err?.message ?? "Internal server error" });
};
