const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  userId: String,
  destination: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Trip", TripSchema);