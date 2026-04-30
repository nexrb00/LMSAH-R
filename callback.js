const express = require("express");
const router = express.Router();

// Webhook endpoint من سلة
router.post("/salla/callback", (req, res) => {
  const data = req.body;

  console.log("📦 Salla Callback Received:");
  console.log(JSON.stringify(data, null, 2));

  // مثال: التعامل مع طلب جديد
  if (data.event === "order.created") {
    console.log("🛒 New Order:", data.data.id);
  }

  if (data.event === "order.paid") {
    console.log("💰 Order Paid:", data.data.id);
  }

  // مهم جداً ترجع 200
  res.status(200).json({ success: true });
});

module.exports = router;
