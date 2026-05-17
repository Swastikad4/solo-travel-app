const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// ===== SECURITY =====
// Helmet security headers — disable CSP since this is a REST API (JSON only, not HTML)
app.use(helmet({ contentSecurityPolicy: false }));
app.disable("x-powered-by");

// CORS — allow specific origins in production, wildcard in dev
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : [];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, etc.)
            if (!origin) return callback(null, true);
            if (allowedOrigins.length === 0) return callback(null, true); // dev: allow all
            if (allowedOrigins.includes(origin)) return callback(null, true);
            callback(new Error(`CORS: origin ${origin} not allowed`));
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

app.use(express.json({ limit: "10kb" })); // Prevent large payload attacks

// ===== MONGODB =====
let mongoConnected = false;

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
        mongoConnected = true;
        console.log("✅ MongoDB Connected");
    })
    .catch(() => {
        console.log("⚠️  MongoDB connection failed — using sample data fallback");
        console.log("   To fix: whitelist your IP at https://cloud.mongodb.com");
    });

app.set("mongoConnected", () => mongoConnected);

// ===== ROUTES =====
const tripRoutes = require("./routes/tripRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Health check endpoint (for Render/uptime monitoring)
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        mongoConnected,
        timestamp: new Date().toISOString(),
    });
});

app.get("/", (req, res) => {
    res.json({
        name: "SoloTravel API",
        version: "1.0.0",
        status: "running",
        mongoConnected,
        message: mongoConnected
            ? "Connected to MongoDB Atlas"
            : "Using sample data (MongoDB not connected)",
    });
});

app.use("/api/trips", tripRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/chat", chatRoutes);

// ===== 404 HANDLER =====
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    const status = err.status || 500;
    res.status(status).json({
        error:
            process.env.NODE_ENV === "production"
                ? "Internal server error"
                : err.message,
    });
});

module.exports = app;