import { Router, type IRouter } from "express";
import { CreateContactMessageBody } from "@workspace/api-zod";
import { db, contactMessagesTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = CreateContactMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_body", details: parsed.error.issues });
    return;
  }

  const [row] = await db
    .insert(contactMessagesTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      subject: parsed.data.subject,
      message: parsed.data.message,
      kind: parsed.data.kind,
    })
    .returning();

  if (!row) {
    res.status(500).json({ error: "insert_failed" });
    return;
  }

  res.status(201).json({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    kind: row.kind,
    createdAt: row.createdAt.toISOString(),
  });
});

export default router;
