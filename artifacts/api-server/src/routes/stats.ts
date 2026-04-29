import { Router, type IRouter } from "express";
import { GetStatsResponse } from "@workspace/api-zod";
import { db, leadsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { services } from "../data/catalog";

const router: IRouter = Router();

router.get("/stats", async (_req, res) => {
  const [{ count: totalLeads }] = (await db
    .select({ count: sql<number>`count(*)::int` })
    .from(leadsTable)) as Array<{ count: number }>;

  const data = GetStatsResponse.parse({
    totalServices: services.length,
    activeAgents: services.length,
    totalLeads: Number(totalLeads ?? 0),
    merchantsServed: 1280 + Number(totalLeads ?? 0),
    avgResponseSeconds: 4,
    uptime: "99.97%",
  });

  res.json(data);
});

export default router;
