const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");
const { destinations } = require("../data/sampleData");

// Get all destinations (names only)
router.get("/", async (req, res) => {
  try {
    // Try MongoDB first
    const dbData = await Destination.find().maxTimeMS(3000);
    if (dbData && dbData.length > 0) {
      return res.json(dbData);
    }
  } catch (err) {
    // Fall through to sample data
  }

  // Return sample data
  const allDestinations = Object.values(destinations);
  res.json(allDestinations);
});

// Get destination details by name
router.get("/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();

  try {
    // Try MongoDB first
    const dbData = await Destination.findOne({
      name: new RegExp(`^${name}$`, "i"),
    }).maxTimeMS(3000);

    if (dbData) {
      return res.json(dbData);
    }
  } catch (err) {
    // Fall through to sample data
  }

  // Return sample data
  const sampleDest = destinations[name];
  if (sampleDest) {
    return res.json(sampleDest);
  }

  // Try partial match
  const match = Object.keys(destinations).find(key =>
    key.includes(name) || name.includes(key)
  );
  if (match) {
    return res.json(destinations[match]);
  }

  res.status(404).json({ message: "Destination not found" });
});

module.exports = router;