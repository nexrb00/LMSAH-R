const express = require("express");
const router = express.Router();
const { users, orders } = require("../db");

// webhook dynamic
router.post("/salla/:userId", (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  console.log("📦 Callback for:", userId);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // حفظ الطلب
  if (data.event === "order.created") {
    const order = {
      userId,
      orderId: data.data?.id,
      status: "created",
      createdAt: new Date()
    };

    orders.push(order);

    console.log("🛒 Order saved:", order);
  }

  if (data.event === "order.paid") {
    console.log("💰 Paid:", data.data?.id);
  }

  res.status(200).json({ success: true });
});

module.exports = router;
