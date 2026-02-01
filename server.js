// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import reportRoutes from "./routes/reportRoutes.js";
import sosRoutes from "./routes/sosRoutes.js"; // 👈 IMPORTED CORRECTLY

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// Ensure /uploads exists
// --------------------
const uploadsPath = path.join(__dirname, "uploads");
try {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("📂 uploads directory ready");
} catch (err) {
  console.error("❌ Failed to create uploads directory:", err);
}

// --------------------
// Core Middleware
// --------------------
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(uploadsPath));

// --------------------
// Health Check
// --------------------
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "CrimeCam Backend",
    time: new Date().toISOString(),
  });
});

// --------------------
// API ROUTES
// --------------------
app.use("/api", reportRoutes);         // example → POST /api/report-crime
app.use("/api/sos", sosRoutes);       // example → POST /api/sos/start
//                                       example → POST /api/sos/:id/snapshot
//                                       example → POST /api/sos/:id/ping

// --------------------
// Handle Unknown Routes
// --------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --------------------
// MongoDB Connection
// --------------------
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://crimecamuser:crimecam2025@cluster0.bjcdfhw.mongodb.net/crimecam?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("🚀 MongoDB Connected...");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🔥 CrimeCam API running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
