const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  name: String,
  famousPlaces: [String],
  thingsToDo: [String],
  bestTime: String,
});

module.exports = mongoose.model("Destination", DestinationSchema);