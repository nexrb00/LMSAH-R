const express = require("express");
const path = require("path");
require("dotenv").config();

// مهم للـ proxy
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// ======================
// Middleware
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Salla Webhook
// ======================
app.post("/webhook/salla/callback", (req, res) => {
  const data = req.body;

  console.log("📦 Salla Callback:");
  console.log(JSON.stringify(data, null, 2));

  if (data.event === "order.created") {
    console.log("🛒 New Order:", data.data?.id);
  }

  if (data.event === "order.paid") {
    console.log("💰 Order Paid:", data.data?.id);
  }

  res.status(200).json({ success: true });
});

// ======================
// API Test
// ======================
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from LMSAH 🚀" });
});

// ======================
// PROXY (المهم 🔥)
// ======================
app.use(
  "/",
  createProxyMiddleware({
    target: "https://marketing-agents-hub--rooozahmd4.replit.app/",
    changeOrigin: true,
  })
);

// ======================
// Export
// ======================
module.exports = app;
