import { Router, type IRouter } from "express";
import { CreateLeadBody, ListLeadsResponse } from "@workspace/api-zod";
import { db, leadsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body", details: parsed.error.issues });
    return;
  }

  const start = new Date();
  const end = new Date(start.getTime() + 15 * 24 * 60 * 60 * 1000);

  const [row] = await db
    .insert(leadsTable)
    .values({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      storeName: parsed.data.storeName,
      storeUrl: parsed.data.storeUrl ?? null,
      planId: parsed.data.planId,
      serviceId: parsed.data.serviceId ?? null,
      notes: parsed.data.notes ?? null,
      startDate: start,
      endDate: end,
      status: "trial",
    })
    .returning();

  if (!row) {
    res.status(500).json({ error: "insert_failed" });
    return;
  }

  res.status(201).json({
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    storeName: row.storeName,
    storeUrl: row.storeUrl,
    planId: row.planId,
    serviceId: row.serviceId,
    notes: row.notes,
    startDate: row.startDate.toISOString(),
    endDate: row.endDate.toISOString(),
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  });
});

router.get("/leads", async (_req, res) => {
  const rows = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt))
    .limit(100);

  const data = ListLeadsResponse.parse(
    rows.map((r) => ({
      id: r.id,
      fullName: r.fullName,
      email: r.email,
      phone: r.phone,
      storeName: r.storeName,
      storeUrl: r.storeUrl,
      planId: r.planId,
      serviceId: r.serviceId,
      notes: r.notes,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      status: r.status,
      createdAt: r.createdAt.toISOString(),
    })),
  );

  res.json(data);
});

export default router;
