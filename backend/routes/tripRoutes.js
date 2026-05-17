const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const { sampleTrips } = require("../data/sampleData");

// ===== VALIDATION HELPER =====
const validateTrip = (body) => {
  const errors = [];
  const { userId, destination, startDate, endDate } = body;

  if (!userId || typeof userId !== "string" || !userId.trim())
    errors.push("userId is required");
  if (!destination || typeof destination !== "string" || !destination.trim())
    errors.push("destination is required");
  if (!startDate) errors.push("startDate is required");
  if (!endDate) errors.push("endDate is required");

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime())) errors.push("startDate is not a valid date");
    if (isNaN(end.getTime())) errors.push("endDate is not a valid date");
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end < start)
      errors.push("endDate must be on or after startDate");
  }

  return errors;
};

// Add trip
router.post("/add", async (req, res) => {
  const errors = validateTrip(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }

  // Sanitize
  const tripData = {
    userId: req.body.userId.trim(),
    destination: req.body.destination.trim(),
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    notes: req.body.notes ? req.body.notes.trim().slice(0, 500) : "",
  };

  try {
    const trip = await prisma.trip.create({ data: tripData });
    return res.status(201).json(trip);
  } catch (err) {
    // If PostgreSQL fails, store in memory as fallback
    const name = tripData.destination.toLowerCase();
    const newTrip = { _id: "t" + Date.now(), ...tripData };
    if (!sampleTrips[name]) sampleTrips[name] = [];
    sampleTrips[name].push(newTrip);
    return res.status(201).json(newTrip);
  }
});

// Get all trips
router.get("/", async (req, res) => {
  try {
    const dbTrips = await prisma.trip.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbTrips && dbTrips.length > 0) return res.json(dbTrips);
  } catch (err) {
    // Fall through to sample data
  }
  const allTrips = Object.values(sampleTrips).flat();
  res.json(allTrips);
});

// Get trips by destination
router.get("/:destination", async (req, res) => {
  const dest = req.params.destination.trim().toLowerCase();
  if (!dest) return res.status(400).json({ error: "destination is required" });

  try {
    const dbTrips = await prisma.trip.findMany({
      where: {
        destination: { equals: dest, mode: "insensitive" },
      },
      orderBy: { startDate: "asc" },
    });
    if (dbTrips && dbTrips.length > 0) return res.json(dbTrips);
  } catch (err) {
    // Fall through
  }

  const trips = sampleTrips[dest] || [];
  res.json(trips);
});

module.exports = router;