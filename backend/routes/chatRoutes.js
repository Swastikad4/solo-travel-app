const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// In-memory fallback for messages if MongoDB is unavailable
const sampleMessages = [];

// ===== VALIDATION HELPER =====
const validateMessage = (body) => {
  const errors = [];
  const { senderId, receiverId, content } = body;

  if (!senderId || typeof senderId !== "string" || !senderId.trim())
    errors.push("senderId is required");
  if (!receiverId || typeof receiverId !== "string" || !receiverId.trim())
    errors.push("receiverId is required");
  if (!content || typeof content !== "string" || !content.trim())
    errors.push("content is required");
  if (content && content.trim().length > 1000)
    errors.push("content must be 1000 characters or fewer");

  if (
    senderId &&
    receiverId &&
    senderId.trim().toLowerCase() === receiverId.trim().toLowerCase()
  )
    errors.push("Cannot send a message to yourself");

  return errors;
};

// Get conversation between two users
router.get("/:user1/:user2", async (req, res) => {
  const u1 = req.params.user1.trim().toLowerCase();
  const u2 = req.params.user2.trim().toLowerCase();

  if (!u1 || !u2)
    return res.status(400).json({ error: "Both user IDs are required" });

  try {
    const dbMessages = await Message.find({
      $or: [
        {
          senderId: new RegExp(`^${u1}$`, "i"),
          receiverId: new RegExp(`^${u2}$`, "i"),
        },
        {
          senderId: new RegExp(`^${u2}$`, "i"),
          receiverId: new RegExp(`^${u1}$`, "i"),
        },
      ],
    })
      .sort({ timestamp: 1 })
      .limit(200)
      .maxTimeMS(3000);

    if (dbMessages && dbMessages.length > 0) return res.json(dbMessages);
  } catch (err) {
    // Fall through to in-memory fallback
  }

  const conversation = sampleMessages.filter(
    (msg) =>
      (msg.senderId.toLowerCase() === u1 &&
        msg.receiverId.toLowerCase() === u2) ||
      (msg.senderId.toLowerCase() === u2 && msg.receiverId.toLowerCase() === u1)
  );
  res.json(conversation);
});

// Send a new message
router.post("/send", async (req, res) => {
  const errors = validateMessage(req.body);
  if (errors.length > 0)
    return res.status(400).json({ error: errors.join("; ") });

  const newMsgData = {
    senderId: req.body.senderId.trim(),
    receiverId: req.body.receiverId.trim(),
    content: req.body.content.trim(),
    timestamp: new Date(),
  };

  try {
    const message = new Message(newMsgData);
    await message.save();
    return res.status(201).json(message);
  } catch (err) {
    // If MongoDB fails, store in memory
    const newMsg = { _id: "m" + Date.now(), ...newMsgData };
    sampleMessages.push(newMsg);
    return res.status(201).json(newMsg);
  }
});

module.exports = router;
