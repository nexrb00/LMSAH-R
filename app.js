const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const callbackRoutes = require("./callback");

// مهم: قبل الراوتات
app.use(express.json());

// استخدامه
app.use("/webhook", callbackRoutes);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/api/hello", (req, res) => {
 app.get("/", (req, res) => {
  res.redirect("https://marketing-agents-hub--rooozahmd4.replit.app/");
});;
});

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
