const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const { destinations } = require("../data/sampleData");

// Get all destinations (names only)
router.get("/", async (req, res) => {
  try {
    const dbData = await prisma.destination.findMany({
      orderBy: { name: "asc" },
    });
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
    const dbData = await prisma.destination.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
      },
    });

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