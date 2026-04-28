import { Router } from "express";
import { templatesRouter } from "./templates";
import { portfolioRouter } from "./portfolio";
import { inquiriesRouter } from "./inquiries";
import { adminRouter } from "./admin";
import { analyticsRouter } from "./analytics";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

apiRouter.use("/templates", templatesRouter);
apiRouter.use("/portfolio", portfolioRouter);
apiRouter.use("/inquiries", inquiriesRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/admin", adminRouter);
