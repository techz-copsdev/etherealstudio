import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

/**
 * Bearer-token guard for admin endpoints.
 * Header: `Authorization: Bearer <ADMIN_TOKEN>`
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  const token = header.slice("Bearer ".length).trim();
  if (token !== env.ADMIN_TOKEN) {
    return res.status(403).json({ error: "Invalid admin token" });
  }

  return next();
}
