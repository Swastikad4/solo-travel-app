const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// In-memory fallback for messages if MongoDB is unavailable
const sampleMessages = [];

// Get conversation between two users
router.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const u1 = user1.toLowerCase();
  const u2 = user2.toLowerCase();

  try {
    const dbMessages = await Message.find({
      $or: [
        { senderId: new RegExp(`^${u1}$`, "i"), receiverId: new RegExp(`^${u2}$`, "i") },
        { senderId: new RegExp(`^${u2}$`, "i"), receiverId: new RegExp(`^${u1}$`, "i") }
      ]
    }).sort({ timestamp: 1 }).maxTimeMS(3000);

    if (dbMessages && dbMessages.length > 0) {
      return res.json(dbMessages);
    }
  } catch (err) {
    // Fall through to sample data
  }

  // Return from in-memory fallback
  const conversation = sampleMessages.filter(msg => 
    (msg.senderId.toLowerCase() === u1 && msg.receiverId.toLowerCase() === u2) ||
    (msg.senderId.toLowerCase() === u2 && msg.receiverId.toLowerCase() === u1)
  );
  
  res.json(conversation);
});

// Send a new message
router.post("/send", async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  
  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newMsgData = {
    senderId,
    receiverId,
    content,
    timestamp: new Date()
  };

  try {
    const message = new Message(newMsgData);
    await message.save();
    return res.json(message);
  } catch (err) {
    // If MongoDB fails, store in memory
    const newMsg = {
      _id: "m" + Date.now(),
      ...newMsgData
    };
    sampleMessages.push(newMsg);
    res.json(newMsg);
  }
});

module.exports = router;
