const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const { sampleTrips } = require("../data/sampleData");

// Add trip
router.post("/add", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.json(trip);
  } catch (err) {
    // If MongoDB fails, store in memory
    const name = req.body.destination?.toLowerCase();
    const newTrip = {
      _id: "t" + Date.now(),
      ...req.body,
    };
    if (!sampleTrips[name]) {
      sampleTrips[name] = [];
    }
    sampleTrips[name].push(newTrip);
    res.json(newTrip);
  }
});

// Get all trips
router.get("/", async (req, res) => {
  try {
    const dbTrips = await Trip.find().maxTimeMS(3000);
    if (dbTrips && dbTrips.length > 0) {
      return res.json(dbTrips);
    }
  } catch (err) {
    // Fall through
  }

  // Return all sample trips flattened
  const allTrips = Object.values(sampleTrips).flat();
  res.json(allTrips);
});

// Get trips by destination
router.get("/:destination", async (req, res) => {
  const dest = req.params.destination.toLowerCase();

  try {
    const dbTrips = await Trip.find({
      destination: new RegExp(`^${dest}$`, "i"),
    }).maxTimeMS(3000);

    if (dbTrips && dbTrips.length > 0) {
      return res.json(dbTrips);
    }
  } catch (err) {
    // Fall through
  }

  // Return sample trips
  const trips = sampleTrips[dest] || [];
  res.json(trips);
});

module.exports = router;