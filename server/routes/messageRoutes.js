const express = require("express");
const {
  getMessages,
  updateMessage,
  send,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, send);
router.get("/:chatId", protect, getMessages);
router.put("/", protect, updateMessage);

module.exports = router;
