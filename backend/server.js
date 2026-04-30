const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Track MongoDB connection status
let mongoConnected = false;

// Routes
app.get("/", (req, res) => {
  res.json({
    status: "API Running",
    mongoConnected,
    message: mongoConnected
      ? "Connected to MongoDB Atlas"
      : "Using sample data (MongoDB not connected)"
  });
});

// Import routes
const tripRoutes = require("./routes/tripRoutes");
const destinationRoutes = require("./routes/destinationRoutes");

// Use routes
app.use("/api/trips", tripRoutes);
app.use("/api/destinations", destinationRoutes);

// MongoDB connect (non-blocking with fallback)
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    mongoConnected = true;
    console.log("✅ MongoDB Connected");
  })
  .catch(err => {
    console.log("⚠️  MongoDB connection failed — using sample data fallback");
    console.log("   To fix: whitelist your IP at https://cloud.mongodb.com");
  });

// Export connection status for routes
app.set("mongoConnected", () => mongoConnected);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});